const width = document.getElementById("canvas").width = screen.availWidth;
const height = document.getElementById("canvas").height = screen.availHeight;
const ctx = document.getElementById("canvas").getContext("2d");
const arr = Array(Math.ceil(width / 10)).fill(0);
const str = "010101010101010101010101010101" + "1010101010101010101010101010".split("");
ctx.font = "10px 优设标题黑";
function rain() {
    ctx.fillStyle = "rgba(0,0,20,0.05)";
    ctx.fillRect(0,0,width,height);
    ctx.fillStyle = '#00c8aa';
    arr.forEach(function (value, index){
        ctx.fillText(str[Math.floor(Math.random()*str.length)], index * 10, value + 10);
        arr[index] = value >= height || value > 8888 * Math.random() ? 0 : value + 10;
    });
}
setInterval(rain, 30);