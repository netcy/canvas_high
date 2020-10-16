
class Fisheye{
    constructor(radius,distortion){
        this.radius = radius;
        this.distortion = distortion;
        this.rescale();
    }
    radius(r){
        this.radius = r;
        return this.rescale();
    }
    setCenter(c){
        this.center = c;
        return this;
    }
    rescale() {
        var distortion = this.distortion,
            radius = this.radius;
        var k0 = Math.exp(distortion);
        k0 = k0 / (k0 - 1) * radius;
        var k1 = distortion / radius;
        this.k0 = k0;
        this.k1 = k1;
        return this;
    }
    distort(v){
        var c = this.center;
        var dx = v.x - c.x,
            dy = v.y - c.y,
            dd = Math.sqrt(dx * dx + dy * dy);
        if(!dd || dd >= this.radius) return {x:v.x,y:v.y,z:1};
        var k0 = this.k0,
            k1 = this.k1;
        var k = k0 * (1 - Math.exp(-dd * k1)) / dd * .75 + .25;
        return {x: c.x + dx / k, y: c.y + dy / k, z: Math.min(k, 10)};
    }

    distort2(v){
        var c = this.center;
        var dx = v.x - c.x,
            dy = v.y - c.y,
            dd = Math.sqrt(dx * dx + dy * dy);
        if(!dd || dd >= this.radius) return {x:v.x,y:v.y,z:1};

        var k = Math.log(dd);
         return {x: c.x + dx * k, y: c.y + dy * k, z: Math.min(k, 10)};
    }

    distortion(d){
        this.distortion = d;
        return this.rescale();
    }
    // https://prideout.net/barrel-distortion
    distort3(v){
        var c = this.center;
        var dx = v.x - c.x,
            dy = v.y - c.y,
            dd = Math.sqrt(dx * dx + dy * dy);
         if(!dd || dd >= this.radius) return {x:v.x,y:v.y,z:1};
        var theta = Math.atan2(dy,dx);
        dd =  2 * Math.asin(dd / this.radius ) / (Math.PI) * dd ;

        return {
            x: dd * Math.cos(theta) + c.x,
            y: dd * Math.sin(theta) + c.y
        }
    }

}
// 各种算法介绍
// https://blog.csdn.net/grafx/article/details/57086741
// https://bost.ocks.org/mike/fisheye/#cartesian

// 各种公式啊 
// http://paulbourke.net/miscellaneous/imagewarp/
