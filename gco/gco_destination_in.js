var code = 'rect1',
  canvas = null,
  ctx = null;


function init() {
  canvas = document.getElementById('can');
  ctx = canvas.getContext('2d');
  // draw();
  draw1();
  // draw2();
}

function draw() {
  ctx.fillStyle = 'rgba(255,0,0,1)';
  ctx.fillRect(100, 100, 200, 200);

  ctx.fillStyle = 'rgba(0,0,255,1)';;
  ctx.fillRect(200, 200, 200, 200);
}

function draw1 (){
  ctx.fillStyle = 'rgba(255,0,0,1)';
  ctx.fillRect(100, 100, 200, 200);

  // ctx.globalCompositeOperation = 'destination-atop';
  // ctx.globalCompositeOperation = 'destination-out';
  ctx.globalCompositeOperation = 'destination-in';
  ctx.fillStyle = 'rgba(0,0,255,0.5)';;
  ctx.fillRect(200, 200, 200, 200);
}

function draw2() {
  ctx.fillStyle = 'rgba(255,0,0,0.2)';
  ctx.fillRect(100, 100, 200, 200);

  // ctx.globalCompositeOperation = 'source-atop';
  // ctx.globalCompositeOperation = 'source-in';
  ctx.fillStyle = 'rgba(0,0,255,1)';;
  ctx.fillRect(200, 200, 200, 200);
}
