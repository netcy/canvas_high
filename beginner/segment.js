var code = 'segment1',
    canvas = null,
    ctx = null;
drawFunctions = {
  segment1:function (ctx) {
      ctx.moveTo(100,100);
      ctx.lineTo(500,500);
  },
  segment2:function (ctx) {
    ctx.moveTo(100, 100);
    ctx.lineTo(500, 500);
    ctx.stroke();
  },
  segment3: function (ctx) {
    ctx.moveTo(100, 100);
    ctx.lineTo(500, 500);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 5;
    ctx.stroke();
  },
  segment4:function (ctx) {
    ctx.moveTo(100, 100);
    ctx.lineTo(500, 500);
    ctx.lineTo(500, 100);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round'; // 
    ctx.lineJoin = 'round'; // 
    ctx.stroke();
  }
}
function init() {
  canvas = document.getElementById('can');
  ctx = canvas.getContext('2d');
  draw();

  var select = document.getElementById('select');
  Object.keys(drawFunctions).forEach(function (key) {
    createOptoin(key,select);
  });
  select.onchange = function () {
    code = select.value;
    draw();
  }
}

function createOptoin(value,select) {
  var option = document.createElement('option');
  option.innerText = value;
  option.setAttribute('value', value);
  select && (select.appendChild(option));
}

function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  var drawFunction = drawFunctions[code];
  if (drawFunction){
    drawFunction(ctx);
  }
}
