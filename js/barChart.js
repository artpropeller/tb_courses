/**
 * Created with JetBrains PhpStorm.
 * User: Ivan
 * Date: 23.12.12
 * Time: 13:28
 * To change this template use File | Settings | File Templates.
 */


function createBarChart(data, area, fill) {


    area.html('');

    var max = 1;

    area.addClass('barChart');

    if (!fill) {
        $.each(data, function (i, e) {
            var el = e.time.split(':');
            max = (max <= parseInt(el[0])) ? parseInt(el[0]) + 1 : max;
        });

        if (max > 5) {
            while (max % 5 != 0) {
                max = max + 1;
            }
        }

    }
    else {
        area.addClass('fill');
    }

    var step = max / 10;
    var maxGrid = step < 0.5 ? max + 1 : 10;
    step = maxGrid == 10 ? step : 1;
    var s = 0;

    maxGrid = fill == true ? 10 : maxGrid;
    var percent = 100;

    var axis = area.append('<div class="container-axis"><div class="axis"></div></div>');

    for (var i = 0; i < maxGrid; i++) {
        var gridHtml = '<div class="grid"><div class="label"></div><div class="line"></div></div>';
        var grid = $(gridHtml);

        if (!fill) {
            if (i % 2 == 0 || maxGrid < 10) {
                grid.find('.label').text(Math.ceil(max - s) + ':00');
            }

            if (maxGrid < 10) {
                grid.css({'top':(100 / (maxGrid - 1) * i) + '%'});
            }
            else {
                grid.css({'top':(100 / (maxGrid) * i) + '%'});
            }


            if (i % 2 == 0 || maxGrid < 10) {
                axis.find('.axis').append(grid);
            }

            if (i + 1 != maxGrid && maxGrid < 10) {
                grid.after($(gridHtml).css({'top':(100 / ((maxGrid - 1) * 2)) + (100 / (maxGrid - 1) * i) + '%'}));
            }

            if (i + 1 != maxGrid && maxGrid == 10) {
                grid.after($(gridHtml).css({'top':(10 * (i + 1)) + '%'}));
            }
        }
        else {
            grid.find('.label').text(i % 2 == 0 ? percent + '%' : '');
            grid.css('top', (100 - percent) + '%');
            axis.find('.axis').append(grid);

        }
        percent -= 10;
        s = s + step;
    }
    if (maxGrid == 10) {
        var l = fill == true ? '0%' : '0:00';
        axis.find('.axis').append('<div style="top: 100%;" class="grid"><div class="label">' + l + '</div><div class="line"></div></div>');
    }

    var bars = area.append('<div class="container-bar"><ul></ul></div>');

    area.append('<div class="navBar" rel="1"><div class="prev"></div><div class="sliding"><ul></ul></div><div class="next"></div></div>');


    $.each(data, function (i, e) {
        var lab = fill == true ? e.percent + '%' : e.time;
        var bar = $('<li><div class="bar"><div class="label">' + lab + '</div><div class="quest">' + e.quest + '</div></div></li>');
        if (!fill) {
            var el = e.time.split(':');
            var pr = (parseInt(el[0]) * 60) + parseInt(el[1]);
            var height = pr;
            bar.find('.bar').css({'height':((height / (max * 60)) * 100) + '%'});
            if (maxGrid == 10) {
                bar.find('.bar').css({'height':((height / (max * 6)) * 18.9) + 'px'});
            }
        }
        else {
            bar.find('.bar').css({'height':e.percent+'%'});
            bar.append('<div class="red-fill"></div>');
            bar.find('.red-fill').css({'height':(100 - e.percent)+'%'});
        }
        area.find('.navBar ul').append('<li><span>' + (i + 1) + '</span></li>');
        area.find('.container-bar ul').append(bar);
        if (bar.find('.bar').height() < bar.find('.label').height()) {
            bar.find('.label').css('margin-top', '-15px');
        }


    });


    area.find('.bar').hover(
        function (e) {
            $('body').append('<div id="tooltip-quest">' + $(this).find('.quest').text() + '</div>');
            var l = $(this).offset().left;
            if (($(window).width() / 2) < l) {
                $('#tooltip-quest').addClass('lorient');
                l = l - 360;
            }
            $('#tooltip-quest').css({
                top:$(this).offset().top,
                'margin-top':-($('#tooltip-quest').height() + 39),
                left:l
            });
        },
        function () {
            $('#tooltip-quest').remove();
        });


    area.find('.next').click(function () {
        area.find('ul').animate({left:'-=70'}, 300);
        area.find('.navBar').attr('rel', parseInt(area.find('.navBar').attr('rel')) + 1);
        checkArs();
    });

    area.find('.prev').click(function () {
        area.find('ul').animate({left:'+=70'}, 300);
        area.find('.navBar').attr('rel', parseInt(area.find('.navBar').attr('rel')) - 1);
        checkArs();
    });

    function checkArs() {
        if (parseInt(area.find('.navBar').attr('rel')) > 1) {
            area.find('.prev').show(0);
        }
        else {
            area.find('.prev').hide(0);
        }
        if (parseInt(area.find('.navBar').attr('rel')) + 10 < data.length) {
            area.find('.next').show(0);
        }
        else {
            area.find('.next').hide(0);
        }
    }

    checkArs();

    area.find('ul').css('width', (data.length * 70 + 10) + 'px');

}

var data_new = new Array(
    {time:'4:20', quest:'В каком предложении придаточную часть сложноподчинённого предложения заменить обособленным определением, выраженным причастным оборотом?'},
    {time:'2:30', quest:'В каком предложении придаточную часть сложноподчинённого предложения?'},
    {time:'1:30', quest:'В каком предложении придаточную часть?'},
    {time:'2:55', quest:'В каком предложении?'},
    {time:'4:20', quest:'В каком предложении придаточную часть сложноподчинённого предложения заменить?'},
    {time:'1:40', quest:'В каком предложении придаточную часть сложноподчинённого предложения заменить обособленным определением, выраженным причастным оборотом?'},
    {time:'4:20', quest:'В каком предложении придаточную часть сложноподчинённого предложения заменить обособленным определением, выраженным причастным оборотом?'},
    {time:'2:30', quest:'В каком предложении придаточную часть сложноподчинённого предложения?'},
    {time:'1:30', quest:'В каком предложении придаточную часть?'},
    {time:'2:55', quest:'В каком предложении?'},
    {time:'4:20', quest:'В каком предложении придаточную часть сложноподчинённого предложения заменить?'},
    {time:'1:40', quest:'В каком предложении придаточную часть сложноподчинённого предложения заменить обособленным определением, выраженным причастным оборотом?'}
);

var data_answer = new Array(
    {percent:'20', quest:'В каком предложении придаточную часть сложноподчинённого предложения заменить обособленным определением, выраженным причастным оборотом?'},
    {percent:'45', quest:'В каком предложении придаточную часть сложноподчинённого предложения?'},
    {percent:'50', quest:'В каком предложении придаточную часть?'},
    {percent:'55', quest:'В каком предложении?'},
    {percent:'10', quest:'В каком предложении придаточную часть сложноподчинённого предложения заменить?'},
    {percent:'5', quest:'В каком предложении придаточную часть сложноподчинённого предложения заменить обособленным определением, выраженным причастным оборотом?'},
    {percent:'17', quest:'В каком предложении придаточную часть сложноподчинённого предложения заменить обособленным определением, выраженным причастным оборотом?'},
    {percent:'53', quest:'В каком предложении придаточную часть сложноподчинённого предложения?'},
    {percent:'66', quest:'В каком предложении придаточную часть?'},
    {percent:'98', quest:'В каком предложении?'},
    {percent:'77', quest:'В каком предложении придаточную часть сложноподчинённого предложения заменить?'},
    {percent:'12', quest:'В каком предложении придаточную часть сложноподчинённого предложения заменить обособленным определением, выраженным причастным оборотом?'}
);

createBarChart(data_new, $('#barChart'), false);
createBarChart(data_answer, $('#barChartFill'), true);
