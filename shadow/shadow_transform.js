var code = '',
  canvas = null,
  ctx = null;
function init() {
  canvas = document.getElementById('can');   
  ctx = canvas.getContext('2d');
  
  ctx.shadowColor = 'rgba(255,0,0,1)';
  ctx.shadowBlur =10;
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 10;
  
  ctx.fillStyle = 'rgba(0,0,255,1.0)';
  ctx.fillRect(100,100,200,100);

  ctx.scale(2,2);
  ctx.rotate(0.6)
  ctx.fillStyle = 'rgba(0,0,255,1.0)';
  ctx.fillRect(200,50,100,50);

}

