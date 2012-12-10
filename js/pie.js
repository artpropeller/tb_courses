Raphael.fn.pieChart = function (cx, cy, r, values, labels, gradients, stroke) {
    var paper = this,
        rad = Math.PI / 180,
        chart = this.set();

    function sector(cx, cy, r, startAngle, endAngle, params) {
        var x1 = cx + r * Math.cos(-startAngle * rad),
            x2 = cx + r * Math.cos(-endAngle * rad),
            y1 = cy + r * Math.sin(-startAngle * rad),
            y2 = cy + r * Math.sin(-endAngle * rad);
        return paper.path(["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]).attr(params);
    }

    var angle = 90,
        total = 0,
        start = 0,
        process = function (j) {
            var value = values[j],
                angleplus = 360 * value / total,
                popangle = angle + (angleplus / 2),
                color = Raphael.hsb(start, .75, 1),
                ms = 500,
                delta = 24,
                bcolor = Raphael.hsb(start, 1, 1),
                p = sector(cx, cy, r, angle, angle + angleplus, {fill:gradients[j], stroke:stroke, "stroke-width":0}),
                txt = paper.text(cx + (r + delta) * Math.cos(-popangle * rad), cy + (r + delta) * Math.sin(-popangle * rad), labels[j]).attr({fill:'#767676', stroke:"none", opacity:1, "font-size":18});
            p.mouseover(function () {
                p.stop().animate({transform:"s1.1 1.1 " + cx + " " + cy}, ms, "bounce");

            }).mouseout(function () {
                    p.stop().animate({transform:""}, ms, "bounce");

                });
            angle += angleplus;
            chart.push(p);
            chart.push(txt);
            start += .1;
        };
    for (var i = 0, ii = values.length; i < ii; i++) {
        total += values[i];
    }
    for (i = 0; i < ii; i++) {
        process(i);
    }
    return chart;
};

$(function () {
    var values = [76, 37, 13, 10],
        labels = [76, 37, 13, 10],
        gradients = ['270-#fefffd-#e6e6e6', '270-#f3637c-#e02d4b', '270-#70d3f3-#2bb6df', '270-#f8cd5d-#eead13'];
    Raphael("piechart-users", 270, 230).pieChart(136, 120, 85, values, labels, gradients, "#fff");
});
