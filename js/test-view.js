$(function(){
    resizeTableAnswers();
    $(window).resize(resizeTableAnswers);

    addTooltipClass('.pop-up .user-list li a', 95);

    tooltip();


    $('.dialog-assign.test-dialog .quest-info a.quest-name').click(function(){
        $('.pop-up').after('<div class="popcover"></div>');
        $('.quest-info .pop-up').toggle(0);
//        $(this).toggleClass('active').next().slideToggle(0, function(){
//            resizeTableAnswers();
//            $('body').css('overflow', 'auto');
//        });
        return false;
    });



    $('.popcover').live('click', function(){
        $('.pop-up').hide(0);
        $(this).remove();
    });

    $('.answer-info .change-ball .ars .up').click(function(){
        changeAnswerBall(1, parseInt($(this).parents('.change-ball').find('input').attr('max')),$(this).parents('.change-ball').find('input'));
    });

    $('.answer-info .change-ball .ars .down').click(function(){
        changeAnswerBall(-1, parseInt($(this).parents('.change-ball').find('input').attr('max')),$(this).parents('.change-ball').find('input'));
    });

    $('.answer-quest .name-user, .answer-quest .name-answer').click(function(){
        $(this).parents('.answer-quest').toggleClass('active');
        $(this).parents('.answer-quest').find('.answer-info').toggle(0);
        $('.type-quest.imagefind .panel').each(function(){
            $(this).css('margin-left',-($(this).width()/2 + 8) + 'px');
        });
        checkOpened();
    });

    $('.dialog-assign .table-quests .head-quests .show-all-quest a').click(function(){
        if ($(this).text() == 'раскрыть все') {
            $(this).text('свернуть все');
            $('.answer-quest').addClass('active');
            $('.answer-quest .answer-info').show(0);
            $('.type-quest.imagefind .panel').each(function(){
                $(this).css('margin-left',-($(this).width()/2 + 8) + 'px');
            });
        }
        else {
            $(this).text('раскрыть все');
            $('.answer-quest').removeClass('active');
            $('.answer-quest .answer-info').hide(0);
        }
    });


    $('.change-ball input').keydown(function (event) {
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
            // Allow: Ctrl+A
            (event.keyCode == 65 && event.ctrlKey === true) ||
            // Allow: home, end, left, right
            (event.keyCode >= 35 && event.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        else {
            // Ensure that it is a number and stop the keypress
            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                event.preventDefault();
            }
        }
    });

    $('.change-ball input').keyup(function (e) {
        if (parseInt($(this).val()) > parseInt($(this).attr('max'))) {
            $(this).val($(this).attr('max'));
        }
        changeAnswerBall(0, parseInt($(this).attr('max')), $(this));
    });

    $('.save-ball').click(function(){
        saveBall($(this).parents('.answer-info').find('input').val(), $(this).parents('.answer-quest').find('.result-user div'));
        return false;
    });

    $('.dialog-assign .head-quests .search-quest input').keydown(function (event) {
        var text;
        setTimeout(function () {
            text = $('.dialog-assign .head-quests .search-quest input').val();
        }, 50);
        setTimeout(function () {
            if (text.length) {
                $('.dialog-assign .table-quests .answer-quest').hide(0);
                $('.dialog-assign .table-quests .answer-quest').each(function () {
                    if ($(this).find('.name-user').text().toLowerCase().indexOf(text.toLowerCase()) + 1 || $(this).find('.email-user').text().toLowerCase().indexOf(text.toLowerCase()) + 1) {
                        $(this).show(0);
                    }
                });
            }
            else {
                $('.dialog-assign .table-quests .answer-quest').show(0);
            }
        }, 150);
    });

    $('#questSearch').keydown(function (event) {
        var text;
        setTimeout(function () {
            text = $('#questSearch').val();
        }, 50);
        setTimeout(function () {
            if (text.length) {
                $('.dialog-assign .table-quests .answer-quest').hide(0);
                $('.dialog-assign .table-quests .answer-quest').each(function () {
                    if ($(this).find('.name-answer').text().toLowerCase().indexOf(text.toLowerCase()) + 1 ) {
                        $(this).show(0);
                    }
                });
            }
            else {
                $('.dialog-assign .table-quests .answer-quest').show(0);
            }
        }, 150);


    });

    $('#allUserSearch').keydown(function (event) {
        var text;
        setTimeout(function () {
            text = $('#allUserSearch').val();
        }, 50);
        setTimeout(function () {
            if (text.length) {
                $('.pop-up .user-list li').hide(0);
                $('.pop-up .user-list li').each(function () {
                    if ($(this).find('a').text().toLowerCase().indexOf(text.toLowerCase()) + 1 ) {
                        $(this).show(0);
                    }
                });
            }
            else {
                $('.pop-up .user-list li').show(0);
            }
        }, 150);


    });



    $('.dialog-assign.test-dialog .quest-info.quest-search .pop-up input').keydown(function (event) {
        var text;
        setTimeout(function () {
            text = $('.dialog-assign.test-dialog .quest-info.quest-search .pop-up input').val();
        }, 50);
        setTimeout(function () {
            if (text.length) {
                $('.dialog-assign.test-dialog .quest-info.quest-search .user-list li').hide(0);
                $('.dialog-assign.test-dialog .quest-info.quest-search .user-list li').each(function () {
                    if ($(this).find('a').text().toLowerCase().indexOf(text.toLowerCase()) + 1 ) {
                        $(this).show(0);
                    }
                });
            }
            else {
                $('.dialog-assign.test-dialog .quest-info.quest-search .user-list li').show(0);
            }
        }, 150);


    });


    /* Placeholder for IE */
    if ($.browser.msie) { // Условие для вызова только в IE
        $(".placeholding").find("input[type='text']").each(function () {
            var tp = $(this).attr("placeholder");
            $(this).addClass('.place');
            $(this).attr('value', tp);
            $(this).css('color', '#999');
        }).focusin(function () {
                var val = $(this).attr('placeholder');
                if ($(this).val() == val) {
                    $(this).attr('value', '');
                    $(this).css('color', '#000');
                }
            }).focusout(function () {
                var val = $(this).attr('placeholder');
                if ($(this).val() == "") {
                    $(this).attr('value', val);
                    $(this).css('color', '#999');
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

    $('.dialog-assign .table-quests .scroll').jScrollPane({
        autoReinitialise:true,
        autoReinitialiseDelay:10
    });


    $('.quest-info .pop-up .scroll').jScrollPane({
        autoReinitialise:true,
        autoReinitialiseDelay:10
    });


});

function changeAnswerBall(val, max, input){
    var n = parseInt(input.val())+val;
    if (n >= 0 && n <= max) {
        input.val(n);
        n == max ? input.parent().find('.up').addClass('noactive') : input.parent().find('.up').removeClass('noactive');
        n == 0 ? input.parent().find('.down').addClass('noactive') : input.parent().find('.down').removeClass('noactive');
    }
}

function saveBall(ball, result) {
    if (parseInt(ball)>0){
        result.attr('class','').addClass('number').text(ball);
    }
    else {
        result.attr('class','').addClass('null').text(ball);
    }
}

function resizeTableAnswers(){
//    var hw = $(window).height();
//    var s = hw - 50 - 40 - 35 -90 - $('.quest-info').height() - 10 -40;
//    $('.table-quests .scroll, .table-quests .scroll .jspContainer').css('height','auto');
//    $('.table-quests .scroll .jspPane').css('position','static');
//    if ($('.table-quests .scroll').height() > s) {
//    $('.table-quests .scroll').height(s); }

//
//    $('.table-quests .scroll .jspContainer').height($('.table-quests .scroll').height());
//    $('.table-quests .scroll .jspPane').css('position','absolute');



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


function checkOpened(){
    if ($('.answer-quest.active').size() > 0) {
        $('.show-all-quest a').text('свернуть все');
    }
    else {
        $('.show-all-quest a').text('раскрыть все');
    }
}