// https://developer.mozilla.org/zh-CN/docs/Web/API/OffscreenCanvas
// https: //developers.google.com/web/updates/2018/08/offscreen-canvas
var worker2 = null,canvasBitmap, ctxBitmap;
// function init() {
//     canvasBitmap = document.getElementById('canvas-bitmap');
//     ctxBitmap = canvasBitmap.getContext('2d');
//     worker2 = new Worker('./bitmap_worker.js');
//     worker2.postMessage({msg:'init'});
//     worker2.onmessage = function (e) {
//       ctxBitmap.drawImage(e.data.imageBitmap,0,0);
//     }
// }

function init() {
  canvasBitmap = document.getElementById('canvas-bitmap');
  ctxBitmap = canvasBitmap.getContext('bitmaprenderer');
  worker2 = new Worker('./bitmap_worker.js');
  worker2.postMessage({
    msg: 'init'
  });
  worker2.onmessage = function (e) {
    ctxBitmap.transferFromImageBitmap(e.data.imageBitmap);
  }
}

function redraw() {
  // ctxBitmap.clearRect(0, 0, canvasBitmap.width, canvasBitmap.height)
  worker2.postMessage({msg:'draw'});
}
