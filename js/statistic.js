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

$(function () {

    addTooltipClass('#usersTable.tasks td.name span, #usersTable.tasks td.author .sel, #usersTable.stat-test td.name span', 25);
    addTooltipClass('#usersTable.files td.name span', 30);
    addTooltipClass('#usersTable.files td.author span', 20);

    addTooltipClass('#usersTable.stat-test-answers td.name .sel span', 55);
    addTooltipClass('#usersTable.stat-test-answers td.type .sel', 16);

    addTooltipClass('.select.type .value', 21);

    tooltip();

    //переключение фильтра прогресса пользователей
    $('#stat-view .filter a').click(function () {
        $('#stat-view .filter li').removeClass('active');
        $(this).parent().addClass('active');
        progressFilter();
        return false;
    });


    //выбор типа статистики
    $('.select.type').click(function () {
        $(this).toggleClass('active');
        $('.click-zone').toggle(0);
        $(this).find('ul').slideToggle(300);
    });

    $('.select.type li').click(function () {
        $('.select.type li').removeClass('active');
        $(this).addClass('active');
        $(this).parents('.select').find('.value').text($(this).text());
        addTooltipClass('.select.type .value', 21);
        tooltip();
    });

    //выбор даты статистики
    $('.select.date .toggle, .select.date .value').click(function () {
        $(this).parents('.select').toggleClass('active');
        $('.click-zone').toggle(0);
        $(this).parents('.select').find('.picker').slideToggle(300);
    });

    $('.click-zone').click(function () {
        $('.click-zone').hide(0);
        $('.select').removeClass('active');
        $('.select').find('ul').slideUp(300);
        $('.select').find('.picker').slideUp(300);
    });


    //выбор пользователя
    $('#usersTable tbody .check span').click(function () {
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
        flat:true,
        date:['2012-12-01', '2012-12-21'],
        current:'2012-12-01',
        calendars:2,
        mode:'range',
        starts:1,
        onShow:clearTd,
        onChange:function (formated, dates) {
            var st = dates[0].getDate() + parseMonth[dates[0].getMonth()] + ' &ndash; ' + dates[1].getDate() + parseMonth[dates[1].getMonth()];
            if (dates[0].getDate() != dates[1].getDate()) {
                $('.select.date .value').html(st);
                $(this).parents('.select').toggleClass('active');
                $(this).parents('.select').find('.picker').slideToggle(300);
            }
            clearTd();
        }
    });

    $('.datepickerGoNext a:eq(0), .datepickerGoPrev a:eq(1)').remove();

    clearTd();

    // выбор шага
    $('#stat-view .step li').click(function () {
        $('#stat-view .step li').removeClass('active');
        $(this).addClass('active');
    });

    // тултипы на метриках

    $('#stat-view .metrics .name').hover(
        function () {
            $(this).next().fadeIn(300);
        },
        function () {
            $(this).next().fadeOut(300);
        }
    );

    //таблица
    $("#usersSortTable").stupidtable();
    $(".userstable").jScrollPane({
        autoReinitialise:true,
        autoReinitialiseDelay:50
    });

    //поиск по таблице
    $('#stat-view #search-table').keydown(function (event) {
        var text;
        var m = $('#usersTable tbody tr');
        var par = $('#stat-view .filter li.active').attr('rel');
        setTimeout(function () {
            text = $('#stat-view #search-table').val();
        }, 1);
        setTimeout(function () {
            if (text.length) {
                m.hide(0);
                m.each(function () {
                    if ($(this).find('.name span').text().toLowerCase().indexOf(text.toLowerCase()) + 1 || $(this).find('.author .sel').text().toLowerCase().indexOf(text.toLowerCase()) + 1) {
                        $(this).show(0);
                    }
                });
            }
            else {
                progressFilter()
            }
        }, 150);
    });


    /* Placeholder for IE */
    if ($.browser.msie) { // Условие для вызова только в IE
        $(".placeholding").find("input[type='text']").each(function () {
            var tp = $(this).attr("placeholder");
            $(this).attr('value', tp).css('color', '#000');
        }).focusin(function () {
                var val = $(this).attr('placeholder');
                if ($(this).val() == val) {
                    $(this).attr('value', '').css('color', '#000');
                }
            }).focusout(function () {
                var val = $(this).attr('placeholder');
                if ($(this).val() == "") {
                    $(this).attr('value', val).css('color', '#000');
                }
            });

        /* Protected send form */
        $("form").submit(function () {
            $(this).find("input[type='text']").each(function () {
                var val = $(this).attr('placeholder');
                if ($(this).val() == val) {
                    $(this).attr('value', '');
                }
            })
        });
    }


});
// удаление пустых ячеек
function clearTd() {
    $('.datepickerDays tr').each(function () {
        var tr = $(this);
        var cell = 0;
        $(this).find('td').each(function () {
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


this.tooltip = function () {
    /* CONFIG */
    xOffset = -13;
    yOffset = 13;
    // these 2 variable determine popup's distance from the cursor
    // you might want to adjust to get the right result
    /* END CONFIG */
    $(".tooltips").hover(function (e) {
            if ($(this).is('.tooltips')) {
                this.t = $(this).is('.question') ? $(this).attr('quest') : $(this).text();
                $("body").append("<p id='tooltip'>" + this.t + "</p>");
                $("#tooltip")
                    .css("top", (e.pageY - xOffset) + "px")
                    .css("left", (e.pageX + yOffset) + "px")
                    .fadeIn("fast");
            }
        },
        function () {
            $("#tooltip").remove();
        });
    $(".tooltips").mousemove(function (e) {
        $("#tooltip")
            .css("top", (e.pageY - xOffset) + "px")
            .css("left", (e.pageX + yOffset) + "px");
    });
};


function addTooltipClass(elements, length) {
    $(elements).each(function () {
        if ($(this).text().length > length) {
            $(this).addClass('tooltips');
        }
        else {
            $(this).removeClass('tooltips');
        }
    });
}

//фильтр по прогрессу
//function progressFilter(){
//    var par = $('#stat-view .filter li.active').attr('rel');
//    text = $('#stat-view #search-table').val();
//    if (par) {
//        var m = $('#sortData tr:visible');
//        m.hide(0);
//        m.each(function(){
//           if ($(this).attr('class') == par) {
//               $(this).show();
//           }
//        });
//    }
//}

function progressFilter() {
    if (!$('#stat-view #search-table').val() || $('#stat-view #search-table').val() == 'Поиск пользователей') {
    var par = $('#stat-view .filter li.active').attr('rel');
    if (par) {
        $('#sortData tr').hide(0);
        $('#sortData tr[class=' + par + ']').show(0);
    }
    else {
        $('#sortData tr').show(0);
    }
}}