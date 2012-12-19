/**
 * Created with JetBrains PhpStorm.
 * User: Ivan
 * Date: 17.12.12
 * Time: 21:01
 * To change this template use File | Settings | File Templates.
 */

var parseMonth = {
    0:' января',
    1:' февраля',
    2:' марта',
    3:' апреля',
    4:' мая',
    5:' июня',
    6:' июля',
    7:' августа',
    8:' сентября',
    9:' октября',
    10:' ноября',
    11:' декабря'
};

$(function(){

    addTooltipClass('#usersTable.tasks td.name span', 25);

    tooltip();

    //выбор типа статистики
    $('.select.type').click(function(){
        $(this).toggleClass('active');
        $(this).find('ul').slideToggle(300);
    });

    $('.select.type li').click(function(){
        $('.select.type li').removeClass('active');
        $(this).addClass('active');
        $(this).parents('.select').find('.value').text($(this).text());
    });

    //выбор даты статистики
    $('.select.date .toggle, .select.date .value').click(function(){
        $(this).parents('.select').toggleClass('active');
        $(this).parents('.select').find('.picker').slideToggle(300);
    });


    //выбор пользователя
    $('#usersTable tbody .check span').click(function(){
        $(this).parents('tr').toggleClass('active');
        if ($('#usersTable tr.active').size() > 0) {
            $('#stat-view .show_but').show(0);
        }
        else {
            $('#stat-view .show_but').hide(0);
        }
    });



    //календарь
    $('#choosedate').DatePicker({
        flat: true,
        date: ['2012-12-01','2012-12-21'],
        current: '2012-12-01',
        calendars: 2,
        mode: 'range',
        starts: 1,
        onShow: clearTd,
        onChange: function(formated, dates){
            var st = dates[0].getDate() + parseMonth[dates[0].getMonth()] + ' &ndash; ' +  dates[1].getDate() + parseMonth[dates[1].getMonth()];
            if (dates[0].getDate() != dates[1].getDate()) {
                $('.select.date .value').html(st);
                $(this).parents('.select').toggleClass('active');
                $(this).parents('.select').find('.picker').slideToggle(300);
            }
            clearTd();
        }
    });

    clearTd();

    // выбор шага
    $('#stat-view .step li').click(function(){
        $('#stat-view .step li').removeClass('active');
        $(this).addClass('active');
    });

    // тултипы на метриках

    $('#stat-view .metrics .name').hover(
        function(){
            $(this).next().fadeIn(300);
        },
        function(){
            $(this).next().fadeOut(300);
        }
    );

    //таблица
    $("#usersSortTable").stupidtable();
    $(".userstable").jScrollPane({
        autoReinitialise: true,
        autoReinitialiseDelay: 50
    });

    //поиск по таблице
    $('#stat-view #search-table').keydown(function (event) {
        var text;
        setTimeout(function () {
            text = $('#stat-view #search-table').val();
        }, 50);
        setTimeout(function () {
            if (text.length) {
                $('#usersTable tbody tr').hide(0);
                $('#usersTable tbody tr').each(function () {
                    if ($(this).find('.name span').text().toLowerCase().indexOf(text.toLowerCase()) + 1) {
                        $(this).show(0);
                    }
                });
            }
            else {
                $('#usersTable tbody tr').show(0);
            }
        }, 150);
    });

});
// удаление пустых ячеек
function clearTd(){
    $('.datepickerDays tr').each(function(){
        var tr = $(this);
        var cell = 0;
        $(this).find('td').each(function(){
            if ($(this).is('.datepickerNotInMonth')) {
                cell++;
                $(this).html('');
            }
        });
        if (cell == 7) {
            tr.remove();
        }
    });
}


this.tooltip = function(){
    /* CONFIG */
    xOffset = -13;
    yOffset = 13;
    // these 2 variable determine popup's distance from the cursor
    // you might want to adjust to get the right result
    /* END CONFIG */
    $(".tooltips").hover(function(e){
            this.t = $(this).text();
            $("body").append("<p id='tooltip'>"+ this.t +"</p>");
            $("#tooltip")
                .css("top",(e.pageY - xOffset) + "px")
                .css("left",(e.pageX + yOffset) + "px")
                .fadeIn("fast");
        },
        function(){
            $("#tooltip").remove();
        });
    $(".tooltips").mousemove(function(e){
        $("#tooltip")
            .css("top",(e.pageY - xOffset) + "px")
            .css("left",(e.pageX + yOffset) + "px");
    });
};


function addTooltipClass(elements, length){
    $(elements).each(function(){
        if ($(this).text().length > length) {
            $(this).addClass('tooltips');
        }
    });
}