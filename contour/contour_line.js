var canvas, ctx,w,h,grid_h = 5,grid_w = 5,data;
function init() {
  canvas = document.getElementById('can'),
      ctx = canvas.getContext('2d');
  w = canvas.width;
  h = canvas.height;
  data = initData(w,h,grid_w,grid_h);  
   var heightDots = geneateHeightDots(w,h);
   let xn = Math.floor(w / grid_w),
     yn = Math.floor(h / grid_h);
   for(var i = 0;i < xn; i ++){
     for(var j = 0; j < yn; j ++){
          var D = 0,
            DV = 0;
          var x = i * grid_w,
            y = j * grid_h;
          var value = 0;
          heightDots.forEach(function (dot) {
            if(dot.x == x && dot.y == y){
              value = dot.height;
            }
            d = 1.0 / ((dot.x - x) * (dot.x - x) + (dot.y - y) * (dot.y - y));
            D += d;
            DV += dot.height * d;
          })
          data[i][j] = value ||  DV / D;
     }
   }

  
   contour(.1,'rgba(0,0,125,0.9)');
   contour(1.0, 'rgba(0,255,0,0.9)');
   contour(4.0, '#84ff84');
   contour(4.5, 'orange');
   contour(5.0, '#ff8c00');
   contour(5.5,'rgb(160,0,0)');
   contour(6.0, 'rgb(180,0,0)');
   contour(7.0, 'rgb(200,0,0)');
   contour(8.0, 'red');

  // for(var i = 0;i < 10;i ++){
  //   contour(i, `rgba(${i*20+25},0,0,0.7)`);
  // }

   function contour(threshold,color) {
      var shapes = createMapData(threshold, data, xn, yn);
      shapes.forEach(function (points) {
        drawPoints(points, color);
      });
   }
    ctx.save();
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    heightDots.forEach(function (dot) {
      
      ctx.fillText(dot.height.toFixed(2), dot.x, dot.y);
    })
    ctx.restore();
}

function drawPoints(points,fillColor) {
  if(points == null && points.length <= 1){
    return;
  }
  ctx.beginPath();
  ctx.moveTo(points[0].x,points[0].y);
  for(var i = 1;i < points.length;i ++){
    ctx.lineTo(points[i].x,points[i].y);
  }
  ctx.closePath();
  ctx.strokeStyle = fillColor;
  ctx.stroke();
}

function arc(x, y,color) {
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.arc(x, y, 3, 0, Math.PI * 2);
  ctx.strokeStyle = color  || 'blue';
  ctx.stroke();
}

function arc2(x, y) {
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.arc(x, y, 5, 0, Math.PI * 2);
  ctx.strokeStyle = 'red';
  ctx.stroke();
}

function geneateHeightDots(w,h) {
   var heightDots = [];
   for (var i = 0; i < 10; i++) {
     var x = w * Math.random(),y = h * Math.random();
     height = 8 * Math.random() + 2;
     heightDots.push(new MeasureData(x, y, height));
   }
  // heightDots.push(new MeasureData(100, 200, 10));
  // heightDots.push(new MeasureData(100, 300, 2));
  // heightDots.push(new MeasureData(500, 200, 5));
  // heightDots.push(new MeasureData(400, 400, 2));
  // heightDots.push(new MeasureData(450, 450, 10));
  // heightDots.push(new MeasureData(300, 450, 3));
  // heightDots.push(new MeasureData(350, 450, 6));
  // heightDots.push(new MeasureData(300, 200, 10));
   return heightDots;
}

function initData(w,h,grid_w,grid_h) {
    let xn = Math.floor(w / grid_w),
       yn = Math.floor(h / grid_h);
    var data = new Array(xn);
    for(var i = 0; i < xn;i ++){
      var rowData  = new Array(yn);
      rowData.fill(0);
      data[i] = rowData;
    }
    return data;
}

class MeasureData {
  constructor(x,y,height){
    this.x = x;
    this.y = y;
    this.height = height;
  }
}

function interpolation(min,max,threshold) {
  var v =  (threshold - min) / (max - min);
  if(v < 0 && v > 1){
    console.log('v:',v);
  }
  return v;
}

function addLeft(points, i, j, threshold) {
    var x = (i - 1) * grid_w,
        y = ( j - 1 + interpolation(data[i-1][j-1],data[i-1][j],threshold ) ) * grid_h;
    if(y > j * grid_h){
      console.error('error');
    }
    points.push({x,y});
}

function addRight(points, i, j, threshold) {
  var x = i * grid_w,
      y = ( j - 1 + interpolation( data[i][j-1],data[i][j],threshold ) ) * grid_h;
      if (y > j * grid_h) {
          console.error('error');
      }
    points.push({x,y});
}

function addTop(points, i, j, threshold) {
  var x = (i - 1 + interpolation( data[i - 1][j - 1], data[i][j - 1], threshold) ) * grid_w,
        y = ( j - 1 ) * grid_h;
     if (x > i * grid_w) {
       console.error('error');
     }
    points.push({x,y});
}

function addBottom(points, i, j, threshold) {
  var x = (i - 1 + interpolation(data[i - 1][j], data[i][j], threshold)) * grid_w,
        y = ( j ) * grid_h;
    if (x > i * grid_w) {
      console.error('error');
    }
    points.push({x,y});
}

function addLeftTop(points, i, j) {
   points.push({
     x : (i - 1) * grid_w,
     y : (j - 1) * grid_h
   });
}

function addRightTop(points, i, j) {
  points.push({
    x: (i) * grid_w,
    y: (j - 1) * grid_h
  });
}

function addLeftBottom(points, i, j) {
  points.push({
    x: (i - 1) * grid_w,
    y: (j) * grid_h
  });
}

function addRightBottom(points, i, j) {
  points.push({
    x: (i) * grid_w,
    y: (j) * grid_h
  });
}



function createMapData(threshold, data,xn,yn) {
    var mapData = []; // 应该有个clone方法
    for(var i = 0;i < xn;i ++){
      var rowData = [];
      for (var j = 0; j < yn; j++) {
        rowData[j] = data[i][j] > threshold ? 1 : 0;
      }
      mapData.push(rowData);
        
    }
    var shapes = [];
    for(var i = 1;i < xn ;i ++){
      for(var j = 1; j < yn;j ++){ 
        var num = (mapData[i-1][j-1] << 3) + (mapData[i][j-1] << 2) + (mapData[i][j] << 1) + mapData[i-1][j];
        var points = [];
        switch (num) {
          case 0:
            break;
          case 1:
            addLeft(points, i, j, threshold);
            // addLeftBottom(points, i, j);
            addBottom(points, i, j, threshold);
            break;
          case 2:
            addRight(points, i, j, threshold);
            // addRightBottom(points, i, j);
            addBottom(points, i, j, threshold);
            break;
          case 3:
            addLeft(points, i, j, threshold);
            // addLeftBottom(points, i, j);
            // addRightBottom(points, i, j);
            addRight(points,i,j,threshold);
            break;
          case 4:
            addTop(points, i, j, threshold);
            // addRightTop(points, i, j);
            addRight(points,i,j,threshold);
            break;
          case 5:
            addTop(points, i, j, threshold);
            // addRightTop(points, i, j);
            addRight(points, i, j, threshold);
            addBottom(points, i, j, threshold);
            // addLeftBottom(points, i, j);
            addLeft(points, i, j, threshold);
            break;
          case 6:
            addTop(points, i, j, threshold);
            // addRightTop(points, i, j);
            // addRightBottom(points, i, j);
            addBottom(points, i, j, threshold);
            break;
          case 7:
            addTop(points, i, j, threshold);
            // addRightTop(points, i, j);
            // addRightBottom(points, i, j);
            // addLeftBottom(points, i, j);
            addLeft(points, i, j, threshold);
            break;
          case 8:
            addTop(points, i, j, threshold);
            // addLeftTop(points, i, j);
            addLeft(points, i, j, threshold);
            break;
          case 9:
            addTop(points, i, j, threshold);
            // addLeftTop(points, i, j);
            // addLeftBottom(points, i, j);
            addBottom(points, i, j, threshold);
            break;
          case 10:
            addTop(points, i, j, threshold);
            // addLeftTop(points, i, j);
            addLeft(points, i, j, threshold);
            addBottom(points, i, j, threshold);
            // addRightBottom(points, i, j);
            addRight(points, i, j, threshold);
            break;
          case 11:
            addTop(points, i, j, threshold);
            // addLeftTop(points, i, j);
            // addLeftBottom(points, i, j);
            // addRightBottom(points, i, j);
            addRight(points, i, j, threshold);
            break;
          case 12:
            addLeft(points, i, j, threshold);
            addRight(points, i, j, threshold);
            // addRightTop(points, i, j);
            // addLeftTop(points, i, j);
            break;
          case 13:
            addRight(points, i, j, threshold);
            // addRightTop(points, i, j);
            // addLeftTop(points, i, j);
            // addLeftBottom(points, i, j);
            addBottom(points, i, j, threshold);
            break;
          case 14:
            addLeft(points, i, j, threshold);
            addBottom(points, i, j, threshold);
            // addRightBottom(points, i, j);
            // addRightTop(points, i, j);
            // addLeftTop(points, i, j);
            break;
          case 15:
            // addLeftTop(points, i, j);
            // addRightTop(points, i, j);
            // addRightBottom(points, i, j);
            // addLeftBottom(points, i, j);
            break;
        
          default:
            break;
        }
        if(points.length > 0){
          shapes.push(points);
        }
      }
    }
    return shapes;
}

