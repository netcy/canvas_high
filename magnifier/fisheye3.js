// float2 fisheye(float2 uv)  
// {  
// float2  n_uv = (uv - 0.5) * 2.0;  
  
//     float2 r_uv;  
//     r_uv.x = (1 - n_uv.y * n_uv.y) * _Intensity_y * (n_uv.x);  
//     r_uv.y = (1 - n_uv.x * n_uv.x) * _Intensity_x * (n_uv.y);  
//     return(uv* _scale - r_uv);  
// }

class FishEye {
    constructor(radius, mapCanvas = null, intensity = 1) {
        if (mapCanvas == null) {
            mapCanvas = document.createElement('canvas');
        }
        this.mapCanvas = mapCanvas;
        this.radius = radius | 0;
        this.intensity = 1;
        this.generateMapCanvas();
        return mapCanvas;
    }
    generateMapCanvas() {
        var mapCanvas = this.mapCanvas,
            radius = this.radius,
            diameter = radius * 2,
            intensity = this.intensity;
        mapCanvas.width = mapCanvas.height = diameter;
        var ctx = mapCanvas.getContext('2d');
        ctx.clearRect(0, 0, diameter, diameter); //首先清空
        var imageData = ctx.getImageData(0, 0, diameter, diameter);

        for (var cy = 0; cy < diameter; cy++) {
            var newY = cy - radius;
            for (var cx = 0; cx < diameter; cx++) {
                var newX = cx - radius;
                var distance = Math.sqrt(newX * newX + newY * newY);
                if (distance < radius) {
                    var base = Math.sin(Math.PI / 2 * distance / radius);
                    var t = Math.pow(base, intensity);
                    // var dx = newX * (t - 1) / diameter;
                    // var dy = newY * (t - 1) / diameter;
                    var dx = newX / diameter;
                    var dy = newY / diameter;
                    var red = 0x80 + dx * 0xFF;
                    var green = 0x80 + dy * 0xFF;
                    var pos = (cy * diameter + cx) * 4;
                    imageData.data[pos + 0] = red;
                    imageData.data[pos + 1] = green;
                    imageData.data[pos + 2] = 0;
                    imageData.data[pos + 3] = 255;
                }

            }
        }
        ctx.putImageData(imageData, 0, 0);

    }
}


//         function createCircle(radius: Number): BitmapData {
//             var diameter: Number = radius * 2;
//             var circle: BitmapData = new BitmapData(diameter, diameter, false, 0xFF008080);
//             for (var cy: int = 0; cy < diameter; cy++) {
//                 var newY: int = cy - radius;
//                 for (var cx: int = 0; cx < diameter; cx++) {
//                     var newX: int = cx - radius;
//                     var distance: Number = Math.sqrt(newX * newX + newY * newY);
//                     if (distance < radius) {
//                         var base: Number = Math.sin(Math.PI / 2 * distance / radius);
//                         var t: Number = Math.pow(base, INTENSITY);
//                         var dx: Number = newX * (t - 1) / diameter;
//                         var dy: Number = newY * (t - 1) / diameter;
//                         var blue: uint = 0x80 + dx * 0xFF;
//                         var green: uint = 0x80 + dy * 0xFF;
//                         circle.setPixel(cx, cy, green << 8 | blue);
//                     }
//                 }
//             }
//             return circle;
//         }
//         private

//         function paint(event: Event = null): void {
//             origin.lock();
//             origin.draw(this.canvas);
//             dmFilter = new DisplacementMapFilter(circle,
//                 new Point(stage.mouseX - RADIUS, stage.mouseY - RADIUS),
//                 BitmapDataChannel.BLUE, BitmapDataChannel.GREEN, RADIUS * 2, RADIUS * 2,
//                 DisplacementMapFilterMode.CLAMP);
//             origin.applyFilter(origin, origin.rect, new Point, dmFilter);
//             origin.unlock();
//         }
//     }
// }