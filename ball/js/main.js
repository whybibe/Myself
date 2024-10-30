// 设置画布

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// 生成随机数的函数

function random(min,max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

// 生成随机颜色值的函数

function randomColor() {
  const color = 'rgb(' +
                random(0, 255) + ',' +
                random(0, 255) + ',' +
                random(0, 255) + ')';
  return color;
}

// 定义 Ball 构造器

function Shape(x, y, velX, velY, exists) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists = exists;
}

function Ball(x, y, velX, velY, exists, color, size) {
  Shape.call(this, x, y, velX, velY, exists); // 继承 Shape 的属性
  this.color = color;
  this.size = size;
}

//“恶魔圈”
function EvilCircle(x, y, velX, velY, exists){
  Shape.call(this, x, y, 20, 20, exists);
  this.color = "black";
  this.size = 10;
}

EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;

EvilCircle.prototype.draw = function (){
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
}

EvilCircle.prototype.checkBounds = function (){
  if((this.x + this.size) >= width) {
    this.x = width - this.size;
  }

  else if((this.x - this.size) <= 0) {
    this.x = this.size;
  }

  if((this.y + this.size) >= height) {
    this.y = height - this.size;
  }

  else if((this.y - this.size) <= 0) {
    this.y = this.size;
  }
};

EvilCircle.prototype.setControls = function (){
  window.onmousemove = (e) => {
    this.x = e.clientX;
    this.y = e.clientY;
  };
}


EvilCircle.prototype.collisionDetect = function() {
  for(let j = 0; j < balls.length; j++) {
    if(balls[j].exists) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].exists = false;
      }
    }
  }
};


// 设置 Ball 的 prototype 和 constructor
Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;

// 定义彩球绘制函数

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};

// 定义彩球更新函数

Ball.prototype.update = function() {
  if((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
};

// 定义碰撞检测函数

Ball.prototype.collisionDetect = function() {
  for(let j = 0; j < balls.length; j++) {
    if(this !== balls[j]) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = randomColor();
      }
    }
  }
};

// 定义一个数组，生成并保存所有的球

let balls = [];

while(balls.length < 25) {
  const size = random(10,20);
  let ball = new Ball(
    // 为避免绘制错误，球至少离画布边缘球本身一倍宽度的距离
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    true,
    randomColor(),
    size
  );
  balls.push(ball);
}

// 定义一个循环来不停地播放

// 创建一个新的恶魔圈对象实例
const evilCircle = new EvilCircle(
    random(10, width - 10),
    random(10, height - 10),
    true
);
evilCircle.setControls();

// 获取 <p> 元素，用于显示剩余球数
const para = document.querySelector('p');

// 修改 loop 函数，以更新屏幕上显示的球数
function loop() {
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0, 0, width, height);

  // 仅对存在的小球调用 draw(), update(), 和 collisionDetect()
  for (let i = balls.length - 1; i >= 0; i--) {
    if (balls[i].exists) {
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
    } else {
      // 移除不存在的小球并更新球数
      balls.splice(i, 1);
      para.textContent = '剩余球数: ' + balls.length;
    }
  }

  // 调用恶魔圈实例的方法
  evilCircle.draw();
  evilCircle.checkBounds();
  evilCircle.collisionDetect();

  // 更新球数显示
  para.textContent = '剩余球数: ' + balls.length;

  requestAnimationFrame(loop);
}

// 在创建球时更新球数显示
while(balls.length < 25) {
  const size = random(10,20);
  let ball = new Ball(
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(-7, 7),
      random(-7, 7),
      true,
      randomColor(),
      size
  );
  balls.push(ball);
  para.textContent = '剩余球数: ' + balls.length; // 更新球数显示
}

loop();
