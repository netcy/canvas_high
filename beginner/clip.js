var code = '',
  canvas = null,
  ctx = null,
  img = null;
drawFunctions = {
  clip: function (ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(200,200,100,0,Math.PI * 2);
    ctx.clip();
    ctx.drawImage(img, 0, 0, 400, 400);
    ctx.restore();
  },
  noclip: function (ctx) {
    ctx.drawImage(img,0,0,400,400);
  },
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
    draw();
  }
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
