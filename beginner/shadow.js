var code = null,
  canvas = null,
  ctx = null,
  img = null;
drawFunctions = {
  rect_shadow: function (ctx) {
    ctx.shadowColor = 'red';
    ctx.shadowBlur = 10;
    ctx.fillStyle = 'blue';
    ctx.fillRect(100, 100, 200, 100);
  },
  text_shadow: function (ctx) {
    ctx.shadowColor = 'red';
    ctx.shadowBlur = 10;
    ctx.font = "40px Arial";
    ctx.fillText("Hello world", 200, 200);
  },
  image_shadow:function (ctx) {
     ctx.shadowColor = 'red';
     ctx.shadowBlur = 10;
     if (img && img.loaded){
       ctx.drawImage(img,100,100,300,300);
     }
     
  }
}

function init() {
  canvas = document.getElementById('can');
  ctx = canvas.getContext('2d');
  var select = document.getElementById('select');
  Object.keys(drawFunctions).forEach(function (key) {
    code = code || key;
    createOptoin(key, select);
  });
  select.onchange = function () {
    code = select.value;
    draw();
  }
  img = new Image();
  img.src = './images/bg.jpg';
  img.onload = function (params) {
    img.loaded = true;
  }
  draw();
}

function createOptoin(value, select) {
  var option = document.createElement('option');
  option.innerText = value;
  option.setAttribute('value', value);
  select && (select.appendChild(option));
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var drawFunction = drawFunctions[code];
  if (drawFunction) {
    drawFunction(ctx);
  }
}
