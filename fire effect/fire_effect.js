var templateMap = {},
    first = true,
    rectMap = null,
    lineRectMap = {};

function init() {
    var canvas = document.getElementById('can');
    dpr(canvas);
    var ctx = canvas.getContext('2d');
    function dpr(canvas) {
        let width = canvas.width,
            height = canvas.height;
        if (window.devicePixelRatio) {
            canvas.style.width = width + "px";
            canvas.style.height = height + "px";
            canvas.height = height * window.devicePixelRatio;
            canvas.width = width * window.devicePixelRatio;
            var ctx = canvas.getContext('2d');
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        }
    }
    var balls = [];

    for (let i = 0; i < 100; i++) {
        var scale = getRange(0.2,.5);
        var rx = getRange(-100,100),ry = getRange(0,50);
        var ball = new Ball(500 + rx,800 + ry,100,scale);
        ball._startX = ball.x;
        ball._startY = ball.y;
        ball._endX = 500 + getRange(-300,300);
        ball._endY = 200 + getRange(0,50);
        ball._startFrame = Math.random() * 100 -100;
        ball._frame = ball._startFrame;;
        balls.push(ball);
    }
    
    update();
    function update(){
        requestAnimationFrame(update);
        ctx.save();
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = '#000000';
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.globalCompositeOperation = 'lighter';
        updateLocation();
        balls.forEach(ball  => {
            if(ball._frame >= 0){
                ball.draw(ctx);
            }
        });
        ctx.restore();
    }
    var totalFrame = 300;
    function updateLocation() {
        balls.forEach(ball => {
            if(ball._frame >= 0){
                ball.x = (ball._startX * (totalFrame - ball._frame) + ball._endX * ball._frame)/ totalFrame;
                ball.y = (ball._startY * (totalFrame - ball._frame) + ball._endY * ball._frame)/ totalFrame;
            }
            ball._frame ++;

            if(ball._frame > totalFrame) {
                ball._frame = Math.random() * 100 -100;
            }
        });
    }

}

function getRange(min, max) {
	var scale = max - min;
	return Math.random()*scale + min;
}

class Ball{
    constructor(x,y,r,scale,props){
        this.x = x;
        this.y = y;
        this.r = r;
        this.scale = scale;
        this.props = props

        
    }
    draw(ctx){
        let {x,y,r,scale} = this;

        ctx.save();
        
        ctx.translate(x,y);
        ctx.scale(scale,scale);
        var grd = createGradient(ctx,0,0,r);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(0,0,r,0,2*Math.PI);
        ctx.fill();
        ctx.fill();
        ctx.fill();

        ctx.restore();
    }
    setLocation(x,y){
        this.x = x;
        this.y = y;
    }
}


function drawBall(ctx,x,y,r,scale) {
    ctx.save();
    ctx.translate(x,y);
    ctx.scale(scale,scale);
    var grd = createGradient(ctx,0,0,r);
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(0,0,r,0,2*Math.PI);
    ctx.fill();

    ctx.restore();
}

function createGradient(ctx,x,y,r) {
    // var _ball =  getParticle(100, "#F1d345", "rgba(143,0,0,0)");
    var grd = ctx.createRadialGradient(x, y, 0.000, x,y, r);
    // Add colors
    grd.addColorStop(0.000, "#F1d345");
    grd.addColorStop(1.000, "rgba(143,0,0,0)");
    return grd;
}