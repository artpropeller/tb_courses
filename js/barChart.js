/**
 * Created with JetBrains PhpStorm.
 * User: Ivan
 * Date: 23.12.12
 * Time: 13:28
 * To change this template use File | Settings | File Templates.
 */


function createBarChart(data, area) {

var max = 1;

area.addClass('barChart');

$.each(data, function (i, e) {
    var el = e.split(':');
    max = (max <= parseInt(el[0])) ? parseInt(el[0]) + 1 : max;
});

if (max > 5) {
while (max % 5 != 0) {
    max = max + 1;
}}

var step = max / 10;
var maxGrid = step < 0.5 ? max + 1 : 10;
step = maxGrid == 10 ? step : 1;
var s = 0;


var axis = area.append('<div class="container-axis"><div class="axis"></div></div>');

for (var i = 0; i < maxGrid; i++) {
    var gridHtml = '<div class="grid"><div class="label"></div><div class="line"></div></div>';
    var grid = $(gridHtml);
    if (i % 2 == 0 || maxGrid < 10) {
        grid.find('.label').text(Math.ceil(max - s) + ':00');
    }

    if (maxGrid<10) {
    grid.css({'top':(100 / (maxGrid-1) * i) + '%'});
    }
    else {
        grid.css({'top':(100 / (maxGrid) * i) + '%'});
    }



    if (i % 2 == 0 || maxGrid < 10) {
    axis.find('.axis').append(grid);
    }

    if (i+1 != maxGrid && maxGrid < 10) {
        grid.after($(gridHtml).css({'top':(100 / ((maxGrid-1)*2))+(100 / (maxGrid-1) * i) + '%'}));
    }

    if (i+1 != maxGrid && maxGrid == 10) {
        grid.after($(gridHtml).css({'top':(10 * (i+1)) + '%'}));
    }

    s = s + step;
}
if (maxGrid == 10) {
    axis.find('.axis').append('<div style="top: 100%;" class="grid"><div class="label">0:00</div><div class="line"></div></div>');
}

var bars = area.append('<div class="container-bar"><ul></ul></div>');

area.append('<div class="navBar" rel="1"><div class="prev"></div><div class="sliding"><ul></ul></div><div class="next"></div></div>');



$.each(data, function (i, e) {
    var bar = $('<li><div class="bar"><div class="label">'+e+'</div></div></li>');
    var el = e.split(':');
    var pr = (parseInt(el[0])*60)+parseInt(el[1]);
    var height = pr;
    bar.find('.bar').css({'height':((height/(max*60))*100)+'%'});
    if (maxGrid == 10) {
    bar.find('.bar').css({'height':((height/(max*6))*18.9)+'px'});}
    area.find('.navBar ul').append('<li><span>'+(i+1)+'</span></li>');
    area.find('.container-bar ul').append(bar);
    if (bar.find('.bar').height() <  bar.find('.label').height()) {
        bar.find('.label').css('margin-top','-15px');
    }
});

area.find('.next').click(function(){
    area.find('ul').animate({left:'-=70'}, 300);
    area.find('.navBar').attr('rel', parseInt(area.find('.navBar').attr('rel'))+1);
    checkArs();
});

area.find('.prev').click(function(){
    area.find('ul').animate({left:'+=70'}, 300);
    area.find('.navBar').attr('rel', parseInt(area.find('.navBar').attr('rel'))-1);
    checkArs();
});

function checkArs(){
    if (parseInt(area.find('.navBar').attr('rel')) > 1)  {
        area.find('.prev').show(0);
    }
    else {
        area.find('.prev').hide(0);
    }
    if (parseInt(area.find('.navBar').attr('rel'))+10 < data.length)  {
        area.find('.next').show(0);
    }
    else {
        area.find('.next').hide(0);
    }
}

checkArs();

area.find('ul').css('width',(data.length*70 + 10) + 'px');

}

var data3 = new Array('4:20', '2:30', '1:30', '2:55', '4:20', '1:40', '2:50', '3:38', '4:20', '2:30', '1:30', '2:55', '4:20', '1:40', '2:50', '3:38');
var data = new Array('5:20', '8:30', '6:30', '2:55', '1:20', '1:40', '7:20', '2:30');
var data2 = new Array('0:20', '2:30', '1:30', '2:00', '2:30', '1:30', '1:00', '2:00', '2:00', '2:30', '1:30', '1:00', '2:00', '2:00', '2:30');

createBarChart(data, $('#barChart'));
createBarChart(data2, $('#barChart2'));
createBarChart(data3, $('#barChart3'));