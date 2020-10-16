var code = '',
  canvas = null,
  ctx = null,
  img = null;
var drawFunctions = {
  '反色': function () {
    ctx.save();
    ctx.drawImage(img,0,0);
    var imageData = ctx.getImageData(0,0,img.width,img.height);
    
    for(let i = 0;i < imageData.data.length; i +=4){
       imageData.data[i] = 255 - imageData.data[i];
       imageData.data[i + 1] = 255 - imageData.data[i + 1];
       imageData.data[i + 2] = 255 - imageData.data[i + 2];
    }
    ctx.putImageData(imageData,img.width,0)
    ctx.restore();
  },
  'gray': function (ctx) {
    ctx.save();
    ctx.drawImage(img, 0, 0);
    var imageData = ctx.getImageData(0, 0, img.width, img.height);

    for (let i = 0; i < imageData.data.length; i += 4) {
      var r = imageData.data[i],
        g = imageData.data[i + 1], 
        b = imageData.data[i + 2];
      var gray = r * 0.3 + g * 0.59 + b * 0.11; // 人眼感觉的加权平均数
      imageData.data[i] = gray;
      imageData.data[i + 1] = gray;
      imageData.data[i + 2] = gray;
    }
    ctx.putImageData(imageData, img.width, 0)
    ctx.restore();
  },
  '单色': function (ctx) {
    // 单颜色效果原理就是将当前像素的其他色值去除。
    // 假设我们要实现的单颜色效果是红色， 那么实现的代码如下：
    ctx.save();
    ctx.drawImage(img, 0, 0);
    var imageData = ctx.getImageData(0, 0, img.width, img.height);

    for (let i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i + 1] = 0;
      imageData.data[i + 2] = 0;
    }
    ctx.putImageData(imageData, img.width, 0)
    ctx.restore();
  },
  '黑白':function (ctx,threshold = 126) {
     ctx.save();
     ctx.drawImage(img, 0, 0);
     var imageData = ctx.getImageData(0, 0, img.width, img.height);

     for (let i = 0; i < imageData.data.length; i += 4) {
       var r = imageData.data[i],
         g = imageData.data[i + 1],
         b = imageData.data[i + 2];
         var gray = (r + g + b) / 3; // 平均值法
       if(gray < threshold){
        imageData.data[i] = 0;
        imageData.data[i + 1] = 0;
        imageData.data[i + 2] = 0;
       }else{
        imageData.data[i] = 255;
        imageData.data[i + 1] = 255;
        imageData.data[i + 2] = 255;
       }
     }
     ctx.putImageData(imageData, img.width, 0)
     ctx.restore();
  },
  '模糊':function (ctx) {
      ctx.save();
      ctx.drawImage(img, 0, 0);
      //临时保存样板
      var tmpData = ctx.getImageData(0, 0, img.width, img.height);
      var tmpPixelData = tmpData.data;

      var imageData = ctx.getImageData(0, 0, img.width, img.height);
      var pixelData = imageData.data;

      var blurR = 4; //模糊半径
      var totalnum = (2 * blurR + 1) * (2 * blurR + 1); //参考的像素点
      for (var i = blurR; i < img.height - blurR; i++) {
        for (var j = blurR; j < img.width - blurR; j++) {

          var totalr = 0,
            totalg = 0,
            totalb = 0;
          for (var dx = -blurR; dx <= blurR; dx++) {
            for (var dy = -blurR; dy <= blurR; dy++) {
              var x = i + dx;
              var y = j + dy;

              var p = x * img.width + y;
              totalr += tmpPixelData[p * 4 + 0];
              totalg += tmpPixelData[p * 4 + 1];
              totalb += tmpPixelData[p * 4 + 2];
            }
          }
          var index = i * img.width + j;
          pixelData[4 * index + 0] = totalr / totalnum;
          pixelData[4 * index + 1] = totalg / totalnum;
          pixelData[4 * index + 2] = totalb / totalnum;
        }
      }
      ctx.putImageData(imageData, img.width, 0);
      ctx.restore();
  },
  '浮雕':function (ctx) {
    // https: //www.cnblogs.com/st-leslie/p/8317850.html
    ctx.save();
    ctx.drawImage(img, 0, 0);
    
    var imageData = ctx.getImageData(0, 0, img.width, img.height);
    var tmpData = ctx.getImageData(0, 0, img.width, img.height);

    for (var x = 0; x < tmpData.width - 1; x++) {
      for (var y = 0; y < tmpData.height - 1; y++) {

        // Index of the pixel in the array    
        var idx = (x + y * tmpData.width) * 4;
        var bidx = ((x - 1) + y * tmpData.width) * 4;
        var aidx = ((x + 1) + y * tmpData.width) * 4;

        // calculate new RGB value
        var nr = tmpData.data[aidx + 0] - tmpData.data[bidx + 0] + 128;
        var ng = tmpData.data[aidx + 1] - tmpData.data[bidx + 1] + 128;
        var nb = tmpData.data[aidx + 2] - tmpData.data[bidx + 2] + 128;
        nr = (nr < 0) ? 0 : ((nr > 255) ? 255 : nr);
        ng = (ng < 0) ? 0 : ((ng > 255) ? 255 : ng);
        nb = (nb < 0) ? 0 : ((nb > 255) ? 255 : nb);

        // assign new pixel value    
        imageData.data[idx + 0] = nr; // Red channel    
        imageData.data[idx + 1] = ng; // Green channel    
        imageData.data[idx + 2] = nb; // Blue channel    
        imageData.data[idx + 3] = 255; // Alpha channel    
      }
     }
     ctx.putImageData(imageData, img.width, 0);
     ctx.restore();
  },
  'roberts算子':function (ctx) {
    ctx.save();
    ctx.drawImage(img, 0, 0);
    //获取像素点阵
    var imageData = ctx.getImageData(0, 0, img.width, img.height);
    var pixelData = imageData.data;

    //算法核心
    for (var i = 0; i < img.height - 1; i++) {
      for (var j = 0; j < img.width - 1; j++) {
        //获取需要像素下标
        var target = 4 * (i * img.width + j); //左上
        var member1 = 4 * (i * img.width + j + 1); //右上
        var member2 = 4 * ((i + 1) * img.width + j); //左下
        var member3 = 4 * ((i + 1) * img.width + j + 1); //右下

        for (var k = 0; k < 3; k++) {
          var gx = pixelData[target + k] - pixelData[member3 + k];
          var gy = pixelData[member1 + k] - pixelData[member2 + k];
          var vc = Math.abs(gx) + Math.abs(gy);
          pixelData[target + k] = vc;
        }

      }
    }
    ctx.putImageData(imageData, img.width,0);
    ctx.restore();
  },
  'sobel算子':function (ctx) {
    ctx.save();
    ctx.drawImage(img, 0, 0);
    sobel(ctx);
    ctx.restore();
  }
};

 function sobel(ctx) {
   //获取像素点阵
   var imageData = ctx.getImageData(0, 0, img.width, img.height);
   var pixelData = imageData.data;

   var fImageData = ctx.getImageData(0, 0, img.width, img.height);
   var fData = fImageData.data; //拷贝pixelData
   //旋转后的卷积核
   var gxData = [
     [1, 0, -1],
     [2, 0, -2],
     [1, 0, -1]
   ];
   var gyData = [
     [1, 2, 1],
     [0, 0, 0],
     [-1, -2, -1]
   ];
   //算法核心
   for (var i = 1; i < img.height - 1; i++) {
     for (var j = 1; j < img.width - 1; j++) {
       //获取需要像素下标
       var target = 4 * (i * img.width + j);

       var gx = [0, 0, 0]; //r,g,b
       var gy = [0, 0, 0];

       for (var dx = -1; dx <= 1; dx++) {
         for (var dy = -1; dy <= 1; dy++) {
           var x = i + dx;
           var y = j + dy;
           var p = 4 * (x * img.width + y);
           //rgb分别计算
           for (var k = 0; k < 3; k++) {
             gx[k] += (fData[p + k] * gxData[dx + 1][dy + 1]);
             gy[k] += (fData[p + k] * gyData[dx + 1][dy + 1]);
           }
         }
       }

       for (var k = 0; k < 3; k++) {
         var vc = Math.abs(gx[k]) + Math.abs(gy[k]);
         pixelData[target + k] = vc;
       }

     }
   }

   ctx.putImageData(imageData, img.width, 0);
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
    if(img && img.width){
      draw();
    }
    
  }
  img = new Image();
  img.src = './g.jpg';
  img.onload = draw;
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
