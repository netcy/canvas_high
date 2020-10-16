 

 function drawArrow(ctx, start, end) {
   var theta = Math.PI / 6;
   var d = 10;
   var angle = Math.atan2(start[1] - end[1], start[0] - end[0]);
   ctx.beginPath();
   ctx.moveTo(start[0], start[1]);
   ctx.lineTo(end[0], end[1]);
   ctx.moveTo(
     end[0] + d * Math.cos(angle + theta),
     end[1] + d * Math.sin(angle + theta));
   ctx.lineTo(end[0], end[1]);
   ctx.lineTo(
     end[0] + d * Math.cos(angle - theta),
     end[1] + d * Math.sin(angle - theta));
   ctx.stroke();
 }

 var angle = 0;

 var input = document.getElementById('range');
 var angleLabel = document.getElementById('angle');
 var valueLabel = document.getElementById('value');

 var directionalLight = {
   direction: [0, 0, -1], // 从屏幕外垂直照向屏幕
   color: {r:255,g:0,b:0}
 }

 var image = new Image();
 image.onload = function () {
   image._loaded = true;
 };
 image.src = "diffuse.png";

 input.addEventListener('input', function (e) {
   angleLabel.textContent = e.target.value;

   angle = e.target.value / 180 * Math.PI;

   draw();
 }, false)


 var canvas = document.getElementById('canvas');
 var ctx = canvas.getContext('2d');

 function draw() {

   ctx.clearRect(0, 0, 1200, 800);

   // draw arrow
   var arrowLength = 100;

   var x = arrowLength / 2 * Math.sin(angle);
   var y = arrowLength / 2 * Math.cos(angle);

   var offset = [500, 100];

   for (var i = 0; i < 7; i++) {
     drawArrow(
       ctx,
       [x + i * 40 + offset[0], -y + offset[1]],
       [-x + i * 40 + offset[0], y + offset[1]]);
   }

   ctx.moveTo(offset[0] - 40, offset[1] + 100)
   ctx.lineTo(offset[0] + 300, offset[1] + 100);
   ctx.stroke();

   if(image._loaded){
     ctx.drawImage(image, 50, 100, 250, 250);
   }
   drawLight2(x,y);
 }

 function drawLight1(x, y) {
   var reverseLightDirection = normalize([-x, 0, y]);
   var intensity = dot(reverseLightDirection, [0, 0, 1]);
   valueLabel.textContent = intensity.toFixed(2);
   var imageData = ctx.getImageData(50, 100, 250,250);
   for (var x = 0; x < imageData.width; x++) {
     for (var y = 0; y < imageData.height; y++) {
       var index = y * imageData.width + x;
       var light = intensity;
       var r = imageData.data[index * 4];
       var g = imageData.data[index * 4 + 1];
       var b = imageData.data[index * 4 + 2];
       var a = imageData.data[index * 4 + 3];

       // imageData.data[ index * 4 ] = Math.min( 255, ( pointLight.color.r + r ) * light );
       // imageData.data[ index * 4 + 1 ] =  Math.min( 255, ( pointLight.color.g + g ) * light );
       // imageData.data[ index * 4 + 2 ] =  Math.min( 255, ( pointLight.color.b + b ) * light );
       // imageData.data[ index * 4 + 3 ] = 255;

       imageData.data[index * 4] = Math.min(255, (directionalLight.color.r * r) / 255 * light);
       imageData.data[index * 4 + 1] = Math.min(255, (directionalLight.color.g * g) / 255 * light);
       imageData.data[index * 4 + 2] = Math.min(255, (directionalLight.color.b * b) / 255 * light);
       imageData.data[index * 4 + 3] = 255;
     }
   }
   ctx.putImageData(imageData, 50, 100);
 }

 function drawLight2(x,y){
    ctx.globalCompositeOperation = "multiply";
    var reverseLightDirection = normalize([-x, 0, y]);
    var intensity = dot(reverseLightDirection, [0, 0, 1]);
    valueLabel.textContent = intensity.toFixed(2);
    ctx.fillStyle = 'rgb(' + (intensity * 255 >> 0) + ', 0, 0)';
    ctx.beginPath();
    ctx.rect(50, 100, 250, 250);
    ctx.fill();
 }

 draw();


 function sub(v1, v2) {
   return [
     v1[0] - v2[0],
     v1[1] - v2[1],
     v1[2] - v2[2]
   ]
 }

 function dot(v1, v2) {
   return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
 }

 function length(v) {
    var len = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
    return len;
 }

 function normalize(v) {
   var len = length(v);
   return [
     v[0] / len,
     v[1] / len,
     v[2] / len
   ]
 }