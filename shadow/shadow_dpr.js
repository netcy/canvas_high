var code = '',
  canvas = null,
  ctx = null;

function init() {
  canvas = document.getElementById('can');
  ctx = canvas.getContext('2d');
  
  // dpr(canvas);
  ctx.shadowColor = 'rgba(255,0,0,1)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 10;

  ctx.fillStyle = 'rgba(0,0,255,1.0)';
  ctx.fillRect(100,100,100,100);
}

function dpr(canvas) {
  let width = canvas.width,
    height = canvas.height;
  if (window.devicePixelRatio) {
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    canvas.height = height * window.devicePixelRatio;
    canvas.width = width * window.devicePixelRatio;
    ctx = canvas.getContext('2d');
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }
}