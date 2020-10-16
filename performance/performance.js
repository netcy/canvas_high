var code = 'rect1',
  canvas = null,
  ctx = null;

function init() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  // draw1();
  // localDraw(true);
  // drawManyRects();
  // drawAtFloatPosition();
  drawCache();
}

function draw1() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  console.time('a');
  for(var i = 0;i < 100000;i ++){
    ctx.fillStyle = i % 2 == 0 ? 'red' : 'blue';
    ctx.fillRect(100,100,100,100);
  }
  console.timeEnd('a');

  console.time('b');
  for (var i = 0; i < 100000; i++) {
    ctx.fillStyle = 'blue';
    ctx.fillRect(100, 100, 100, 100);
  }
  console.timeEnd('b');

  console.time('c');
  ctx.fillStyle = 'blue';
  for (var i = 0; i < 100000; i++) {
    ctx.fillRect(100, 100, 100, 100);
  }
  console.timeEnd('c');
}

// 局部刷新
function localDraw(first = false) {
   if(first){
     console.time('isFirst');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < 100000; i++) {
      ctx.fillStyle = i % 2 == 0 ? 'red' : 'blue';
      ctx.fillRect(100, 100, 100, 100);
    }

    ctx.fillRect(220 + Math.random() * 10, 220 + Math.random() * 10, 100, 100);
    console.timeEnd('isFirst');
  }else{
    console.time('other');
    ctx.clearRect(220,220,110,110);
    ctx.fillRect(220 + Math.random() * 10, 220 + Math.random() * 10, 100, 100);
    console.timeEnd('other');
  }
  // requestAnimationFrame(localDraw);
  setTimeout(() => {
    localDraw(false);
  }, 1000);
}

function drawManyRects(){
  console.time('no_batch');
  for(var i = 0;i < 100;i ++){
    for(var j = 0;j < 100; j ++){
      ctx.beginPath();
      ctx.rect(i * 10+5,j * 10+5, 5,5);
      ctx.fill();
    }
  }
  console.timeEnd('no_batch');

  console.time('batch');
  ctx.beginPath();
  for (var i = 0; i < 100; i++) {
    for (var j = 0; j < 100; j++) {
      ctx.rect(i * 10 + 5, j * 10 + 5, 5, 5);
    }
  }
  ctx.fill();
  console.timeEnd('batch');
}

function drawAtFloatPosition() {
  var image = new Image();
  image.src = './d.png';
  image.onload = function () {
    console.time('float');
    for (var i = 0; i < 100000; i++) {
      ctx.drawImage(image,100.2,100.2);
    }
    console.timeEnd('float');

     console.time('interger');
     for (var i = 0; i < 100000; i++) {
      ctx.drawImage(image, 100, 100);
     }
     console.timeEnd('interger');
  }
  
}

function drawCache () {
  console.time('text');
   for (var i = 0; i < 100000; i++) {
     ctx.fillText('text', 100,100);
     ctx.fillText('text1', 120, 120);
     ctx.fillText('text2', 130, 130);
   }
  console.timeEnd('text');

  var offsetCanvas = document.createElement('canvas');
  var offsetCtx = offsetCanvas.getContext('2d');
  offsetCanvas.width = 50;
  offsetCanvas.height = 50;

  offsetCtx.fillText('text',10,10);
  offsetCtx.fillText('text1', 30, 30);
  offsetCtx.fillText('text2', 40, 40);

  console.time('image');
  for (var i = 0; i < 100000; i++) {
     ctx.drawImage(offsetCanvas,200,200);
  }
  console.timeEnd('image');
}
