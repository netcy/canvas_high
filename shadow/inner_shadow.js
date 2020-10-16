var code = '',
  canvas = null,
  ctx = null;

function init() {
  canvas = document.getElementById('can');
  ctx = canvas.getContext('2d');

  ctx.shadowColor = 'rgba(255,0,0,1)';
  ctx.shadowBlur = 10;

  ctx.fillStyle = 'rgba(0,0,255,1.0)';
  ctx.arc(100, 100, 20, 0, Math.PI * 2,false);
  ctx.arc(100, 100, 60, 0, Math.PI * 2, true);
  ctx.fill();
}
