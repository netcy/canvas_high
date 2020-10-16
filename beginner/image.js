
function init() {
  canvas = document.getElementById('can');
  ctx = canvas.getContext('2d');
  var img = new Image();
  img.onload = function () {
    ctx.drawImage(img, 100, 100,300,300)
  }
  img.src = './images/bg.jpg'
}
