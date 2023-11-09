function Renderer(canvas) {
    var canvas = $(canvas).get(0);
    var ctx = canvas.getContext("2d");
    var particleSystem;

    var that = {
        init: function(system) {
            particleSystem = system;
            particleSystem.screenSize(canvas.width, canvas.height);
            particleSystem.screenPadding(80);
            $(window).resize(that.resize);
            that.resize();
        },
        resize: function() {
            canvas.width = $(window).width();
            canvas.height = $(window).height();
            particleSystem.screenSize(canvas.width, canvas.height);
        },
        redraw: function() {
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particleSystem.eachEdge(function(edge, pt1, pt2) {
                ctx.strokeStyle = "rgba(0,0,0, .333)";
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(pt1.x, pt1.y);
                ctx.lineTo(pt2.x, pt2.y);
                ctx.stroke();
            });

            particleSystem.eachNode(function(node, pt) {
                var label = node.data.label || "";
                ctx.fillStyle = "black";
                ctx.fillText(label, pt.x, pt.y);
            });
        }
    };

    return that;
}
