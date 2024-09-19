const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// 设置画布的宽度和高度为视口的宽度和高度
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const arr = Array(Math.ceil(canvas.width / 10)).fill(0);
const str = "01010101010101010101010101010110101010101010101010101010101010".split("");

// 根据画布宽度动态设置字体大小
const fontSize = canvas.width / 100; 
ctx.font = `${fontSize}px 优设标题黑`;

function rain() {
  ctx.fillStyle = "rgba(0,0,20,0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00c8aa';

    arr.forEach(function (value, index){
        ctx.fillText(str[Math.floor(Math.random()*str.length)], index * 10, value + 10);
        arr[index] = value >= canvas.height || value > 8888 * Math.random() ? 0 : value + 10;
    });
}

setInterval(rain, 30);

document.addEventListener('DOMContentLoaded', function() {
  const thumbnails = document.querySelectorAll('.thumbnail');
  const mainImage = document.querySelector('.main-image');
  const fullscreenImageContainer = document.querySelector('.fullscreen-image-container');
  const fullscreenImage = document.querySelector('.fullscreen-image');
  const closeBtn = document.querySelector('.close-btn');
  let currentIndex = 0;

  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', function() {
      mainImage.src = this.getAttribute('data-full-image');
      currentIndex = index;
    });
  });

  document.querySelector('.left-arrow').addEventListener('click', function() {
    currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
    mainImage.src = thumbnails[currentIndex].getAttribute('data-full-image');
  });

  document.querySelector('.right-arrow').addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % thumbnails.length;
    mainImage.src = thumbnails[currentIndex].getAttribute('data-full-image');
  });

  mainImage.addEventListener('click', function() {
    fullscreenImage.src = mainImage.src;
    fullscreenImageContainer.style.display = 'block';
  });

  closeBtn.addEventListener('click', function() {
    fullscreenImageContainer.style.display = 'none';
  });
});
