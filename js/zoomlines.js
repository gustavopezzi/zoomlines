document.addEventListener("DOMContentLoaded", function(event) {
    function Point(x, y, color) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.color = color;
        this.lineX = 0;
        this.lineY = 0;
    }

    Point.prototype.draw = function(ctx, mouse) {
        this.lineX = (this.x - mouse.x) * 30;
        this.lineY = (this.y - mouse.y) * 30;

        ctx.save();
        
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.lineX, this.lineY);
        ctx.closePath();
        ctx.stroke();

        ctx.restore();
    }

    var canvas, ctx, points, width, height, mouse, colors;

    init();
    
    function init() {
        colors = ['#553FFF'];
        canvas = document.querySelector('canvas');
        ctx = canvas.getContext('2d');
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        points = [];
        mouse = getMousePos(canvas);

        generatePoints();

        drawFrame();
    }

    function getMousePos(element) {
        var mouse = {x: 0, y: 0};
        element.addEventListener('mousemove', function(event) {
            mouse.x = event.pageX;
            mouse.y = event.pageY;
        }, false);
        return mouse;
    }

    function generatePoints() {
        var step = 60;

        for (var x = 0; x <= width; x += step) {
            for (var y = 0; y <= height; y += step) {
                points.push(new Point(x, y, colors[Math.round(Math.random() * (colors.length - 1))]));
            }
        }
    }

    function drawFrame() {
        window.requestAnimationFrame(drawFrame, canvas);
        ctx.fillStyle = '#212121';
        ctx.fillRect(0, 0, width, height);
        points.forEach(renderPoint);
    }

    function renderPoint(point) {
        point.draw(ctx, mouse);
    } 
});