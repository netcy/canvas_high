var code = '',
  canvas = null,
  ctx = null;
function init() {
  canvas = document.getElementById('can');   
  ctx = canvas.getContext('2d');
  
  // console.log(ctx.shadowColor);
  // console.log(ctx.shadowBlur,ctx.shadowOffsetX,ctx.shadowOffsetX);
  ctx.shadowColor = 'rgba(255,0,0,1)';
  ctx.shadowBlur =10;
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 10;
  
  ctx.fillStyle = 'rgba(0,0,255,1.0)';
  ctx.fillRect(100,100,200,100);

  // ctx.shadowColor = undefined;
  // ctx.shadowColor = null;
  // console.log(ctx.shadowColor)
  cancelShadow(ctx);
  ctx.fillStyle = 'rgba(0,0,255,1.0)';
  ctx.fillRect(300,300,200,100);
}

function cancelShadow(ctx) {
  ctx.shadowColor = 'rgba(0,0,0,0)';
  ctx.shadowBlur =0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
}
