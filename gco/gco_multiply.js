var code = 'rect1',
  canvas = null,
  ctx = null;


function init() {
  canvas = document.getElementById('can');
  ctx = canvas.getContext('2d');
  // ctx.fillStyle = 'rgba(255,0,0,1)';
  // ctx.fillRect(100,100,200,200);

  ctx.fillStyle = 'rgba(255,0,0,0.1)';
  ctx.fillRect(300, 300, 200, 200);
  
  ctx.globalCompositeOperation = 'multiply';
  ctx.fillStyle = 'rgba(0,0,255,1)';;
  ctx.fillRect(200, 200, 200, 200);

  var imageData = ctx.getImageData(301,301,1,1);
  console.log(imageData.data);

}


