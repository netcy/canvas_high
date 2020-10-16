var code = '',
  canvas = null,
  ctx = null;

function init() {
  canvas = document.getElementById('can');
  ctx = canvas.getContext('2d');

  ctx.shadowColor = 'rgba(255,255,0,1)';
  ctx.shadowBlur = 20;
  ctx.shadowOffsetX = 10100;
  ctx.shadowOffsetY = 10100;

  ctx.beginPath();
  ctx.fillStyle = 'rgba(0,0,255,1.0)';
  ctx.arc(-10000, -10000, 50, 0, Math.PI * 2);
  ctx.fill();

  ctx.shadowColor = 'rgba(255,0,0,1)';
  ctx.shadowBlur = 20;
  ctx.shadowOffsetX = 10100;
  ctx.shadowOffsetY = 10100;

  ctx.beginPath();
  ctx.fillStyle = 'rgba(0,0,255,1.0)';
  ctx.arc(-10000, -10000, 30, 0, Math.PI * 2);
  ctx.fill();
}
