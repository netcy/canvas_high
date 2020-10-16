var canvas,ctx,
  palette;
function init() {
    canvas = document.getElementById('can');
    ctx = canvas.getContext('2d');
    // drawGradients();
    // drawPalette();
    heatmap();


}

function drawGradients(){
  drawGradient(100,100,20,50);
  drawGradient(100, 120, 20, 50);
}

function drawGradient(x,y,r1,r2) {
  var grd = ctx.createRadialGradient(x,y,r1,x,y,r2);
  grd.addColorStop(0,'red');
  grd.addColorStop(0.25, 'rgba(0,255,255,0.75)');
  grd.addColorStop(0.5, 'rgba(0,0,255,0.5)');
  grd.addColorStop(1, 'rgba(0,0,255,0.1)');
  ctx.fillStyle = grd;
  ctx.arc(x,y,r2,0,Math.PI * 2);
  ctx.fill();
}

function drawPalette(){
  if (!palette){
    palette = initPalette();
  }
  ctx.drawImage(palette,0,0,256,20);
}


function heatmap() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   drawRadialGradient(ctx, 10, 50, 500, 200, Math.random() * 0.5 + 0.5);
   drawRadialGradient(ctx, 20, 50, 550, 200, Math.random() * 0.5 + 0.5);
   drawShadowBlur(ctx, 30, 60, 200, 200 , Math.random()* 0.5 + 0.5);
   drawShadowBlur(ctx, 30, 60, 250, 200, Math.random() * 0.5 + 0.5);
   drawShadowBlur(ctx, 30, 60, 300, 300, Math.random() * 0.5 + 0.5);

   drawShadowBlur(ctx, 30, 60, 300, 200, Math.random() * 0.5 + 0.5);
   drawShadowBlur(ctx, 75, 150, 400, 400, Math.random() * 0.5 + 0.5);

  if (!palette) {
    palette = initPalette();
  }
   var paletteCtx = palette.getContext('2d');
   var paletteData = paletteCtx.getImageData(0, 0, 256, 1).data;

   var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
   var length = imageData.data.length;

   for (var i = 0; i < length; i += 4) {
     var alpha = imageData.data[i + 3];
     if (alpha > 0) {
       var offset = alpha * 4;
       imageData.data[i + 0] = paletteData[offset + 0];
       imageData.data[i + 1] = paletteData[offset + 1];
       imageData.data[i + 2] = paletteData[offset + 2];
       imageData.data[i + 3] *= 3;
     }

   }
   ctx.putImageData(imageData, 0, 0);
   drawPalette();
   setTimeout(heatmap,1000);
}

function drawRadialGradient(ctx, r1, r2, x, y,value) {
    var gradient = ctx.createRadialGradient(x, y, r1, x, y, r2);
    gradient.addColorStop(0, `rgba(0,0,0,${value})`);
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(x - r2, y - r2, 2 * r2, 2 * r2);
}

function drawShadowBlur(ctx, r1, r2, x, y, value) {
    ctx.shadowColor = 'rgba(0,0,0,' + value + ')';
    var temp = 15000;
    ctx.shadowOffsetX = temp;
    ctx.shadowOffsetY = temp;
    ctx.shadowBlur = r2 - r1; //r2 - r1;
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(x - temp, y - temp, r1, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

function initPalette() {
    var canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 1;
    var ctx = canvas.getContext('2d');
    var lgrd = ctx.createLinearGradient(0, 0, 256, 1);
    var gradient = {
        // "0": "rgba(0,0,0,1)",
        "0.0": "rgba(0,0,255,1)",
        "0.25": "rgba(0,255,0,1)",
        "0.5": "rgba(255,255,0,1)",
        "1": "rgba(255,0,0,1.0)",
    }
    for (var key in gradient) {
        lgrd.addColorStop(parseFloat(key), gradient[key]);
    }
    ctx.fillStyle = lgrd;
    ctx.fillRect(0, 0, 256, 1);
    return canvas;
}