var code = 'rect1',
  canvas = null,
  ctx = null;

var gcoTypes = [
  'source-over',
  'source-in',
  'source-atop',
  'source-out',
  'destination-over',
  'destination-in',
  'destination-atop',
  'destination-out',
  'lighter',
  'copy',
  'xor',
  'multiply',
  'color',
  'overlay',
  'screen',
  'darken',
  'lighten',
  'color-dodge',
  'color-burn',
  'hard-light',
  'soft-light',
  'difference',
  'exclusion',
  'hue',
  'saturation',
  'luminosity'
];

function init() {
  canvas = document.getElementById('can');
  ctx = canvas.getContext('2d');
  draw();

}

function drawItem(ctx, gcoType,col,row) {
  var offCanvas = document.createElement('canvas');
  offCanvas.width = offCanvas.height = 100;
  var offCtx = offCanvas.getContext('2d');
  
  offCtx.fillStyle = 'red';
  offCtx.fillRect(0, 0, 50, 50);
  offCtx.globalCompositeOperation = gcoType;
  offCtx.beginPath();
  offCtx.arc(50, 50, 30, 0, Math.PI * 2);
  offCtx.fillStyle = 'blue';
  offCtx.fill();
  offCtx.globalCompositeOperation = 'source-over';
  offCtx.textAlign = 'center'
  offCtx.fillText(gcoType, 45, 95);
  ctx.save();
  ctx.translate(col * 150 + 50, row * 150 + 50);
  // ctx.fillStyle = 'rgba(0,255,255,0.1)'
  // ctx.fillRect(0,0,100,100);
  ctx.drawImage(offCanvas,0, 0);
  ctx.restore();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for(let i = 0;i < gcoTypes.length;i ++){
    let col = i % 5,row = ~~ (i / 5) 
    drawItem(ctx,gcoTypes[i],col,row);
  }
}
