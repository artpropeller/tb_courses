var tt = document.createElement('div'),
    leftOffset = -(~~$('html').css('padding-left').replace('px', '') + ~~$('body').css('margin-left').replace('px', '')),
    topOffset = -32;
tt.className = 'chart-tooltip';
document.body.appendChild(tt);

var data = {
    "xScale":"time",
    "yScale":"linear",
    "main":[
        {
            "className":".visits",
            "type":"line-dotted",
            "data":[
                {
                    "x":"2012-11-05",
                    "y":62
                },
                {
                    "x":"2012-11-06",
                    "y":63
                },
                {
                    "x":"2012-11-07",
                    "y":55
                },
                {
                    "x":"2012-11-08",
                    "y":53
                },
                {
                    "x":"2012-11-09",
                    "y":42
                },
                {
                    "x":"2012-11-10",
                    "y":45
                },
                {
                    "x":"2012-11-11",
                    "y":66
                },
                {
                    "x":"2012-11-12",
                    "y":44
                },
                {
                    "x":"2012-11-13",
                    "y":43
                },
                {
                    "x":"2012-11-14",
                    "y":56
                },
                {
                    "x":"2012-11-15",
                    "y":56
                }
            ]
        }
//        {
//            "className":".visits",
//            "type":"line-dotted",
//            "data":[
//                {
//                    "x":"2012-11-05",
//                    "y":3
//                },
//                {
//                    "x":"2012-11-06",
//                    "y":13
//                },
//                {
//                    "x":"2012-11-07",
//                    "y":0
//                },
//                {
//                    "x":"2012-11-08",
//                    "y":11
//                },
//                {
//                    "x":"2012-11-09",
//                    "y":12
//                },
//                {
//                    "x":"2012-11-10",
//                    "y":35
//                },
//                {
//                    "x":"2012-11-11",
//                    "y":16
//                },
//                {
//                    "x":"2012-11-12",
//                    "y":4
//                },
//                {
//                    "x":"2012-11-13",
//                    "y":13
//                },
//                {
//                    "x":"2012-11-14",
//                    "y":26
//                },
//                {
//                    "x":"2012-11-15",
//                    "y":16
//                }
//            ]
//        }
    ]


};

var data2 = {
    "xScale":"time",
    "yScale":"linear",
    "main":[
        {
            "className":".visits",
            "data":[
                {
                    "x":"2012-11-05",
                    "y":12
                },
                {
                    "x":"2012-11-06",
                    "y":13
                },
                {
                    "x":"2012-11-07",
                    "y":35
                },
                {
                    "x":"2012-11-08",
                    "y":23
                },
                {
                    "x":"2012-11-09",
                    "y":22
                },
                {
                    "x":"2012-11-10",
                    "y":15
                },
                {
                    "x":"2012-11-11",
                    "y":16
                },
                {
                    "x":"2012-11-12",
                    "y":14
                },
                {
                    "x":"2012-11-13",
                    "y":13
                },
                {
                    "x":"2012-11-14",
                    "y":26
                },
                {
                    "x":"2012-11-15",
                    "y":36
                }
            ]
        }
    ]
};

var opts = {
    "axisPaddingBottom":0,
    "axisPaddingTop":10,
    "axisPaddingLeft":20,
    "axisPaddingRight":20,
    "paddingBottom":20,
    "paddingLeft":20,
    "paddingRight":0,
    "tickHintX":11,
    "tickHintY":2,
    "dataFormatX":function (x) {
        return d3.time.format('%Y-%m-%d').parse(x);
    },
    "tickFormatX":function (x) {
        return d3.time.format('%e %b')(x);
    },
    "mouseover":function (d, i) {
        var days = {
            "Sunday":"Воскресенье",
            "Monday":"Понедельник",
            "Tuesday":"Вторник",
            "Wednesday":"Среда",
            "Thursday":"Четверг",
            "Friday":"Пятница",
            "Saturday":"Суббота"
        };
        var pos = $(this).offset();
        $(tt).html(days[d3.time.format('%A')(d.x)] + d3.time.format(', %e %B, %Y')(d.x) + '<br><strong>Посещений: ' + d.y + '</strong>')
            .css({top:topOffset + pos.top - 26, left:pos.left + 3 + leftOffset})
            .show(0);
        $(tt).css({'margin-left':-tt.offsetWidth / 2 + 'px'});
    },
    "mouseout":function (x) {
        $(tt).hide();
    }
};

var line = xChart.getVis('line-dotted');
var visitChartView = {
    enter:function (self, storage, className, data, callbacks) {
        var circles;

        line.enter(self, storage, className, data, callbacks);

        circles = storage.lineContainers.selectAll('circle')
            .data(function (d) {
                return d.data;
            }, function (d) {
                return d.x;
            });

        $.each(circles,  function(i,e){
            if (i>0){
                var c = $(e[0]).offset();
                $('body').append('<div class="user-line color'+i+'"><img src="images/ava_1.jpg" width="20" height="20"></div>');
                $('.user-line.color'+i).css({top:c.top-11, left:c.left-36});
            }
        });

//        console.log($(circles[0][0]).offset());

        circles.enter().append('circle')
            .style('opacity', 0)
            .attr('cx', storage.lineX)
            .attr('cy', storage.lineY)
            .attr('r', 3)
            .on('mouseover', callbacks.mouseover)
            .on('mouseout', callbacks.mouseout)
            .on('click', callbacks.click);

        storage.lineCircles = circles;
    },

    update:function (self, storage, timing) {
        line.update.apply(null, _.toArray(arguments));

        storage.lineCircles.transition().duration(timing)
            .style('opacity', 1)
            .attr('cx', storage.lineX)
            .attr('cy', storage.lineY);
    },

    exit:function (self, storage) {
        storage.lineCircles.exit()
            .remove();
        line.exit.apply(null, _.toArray(arguments));
    },

    destroy:function (self, storage, timing) {
        line.destroy.apply(null, _.toArray(arguments));
        if (!storage.lineCircles) {
            return;
        }
        storage.lineCircles.transition().duration(timing)
            .style('opacity', 0);
    }
};


xChart.setVis('visits', visitChartView);


var myChart = new xChart('visits', data, '#chart_div', opts);


