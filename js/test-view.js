$(function(){
    resizeTableAnswers();
    $(window).resize(resizeTableAnswers);


    $('.dialog-assign.test-dialog .quest-info a.quest-name:not(".user")').click(function(){
        $('body').css('overflow', 'hidden');
        $(this).toggleClass('active').next().slideToggle(0, function(){
            resizeTableAnswers();
            $('body').css('overflow', 'auto');
        });

        return false;
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
    });

    $('.dialog-assign .table-quests .head-quests .show-all-quest a').click(function(){
        if ($(this).text() == 'раскрыть все') {
            $(this).text('свернуть все');
            $('.answer-quest').addClass('active');
            $('.answer-quest .answer-info').show(0);
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

    $('#all-answers .quest-info input').keydown(function (event) {
        var text;
        setTimeout(function () {
            text = $('#all-answers .quest-info input').val();
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
    var hw = $(window).height();
    var s = hw - 50 - 40 - 35 -90 - $('.quest-info').height() - 10 -40;
    $('.table-quests .scroll').height(s);
    $('.dialog-assign .table-quests .scroll').jScrollPane({
        autoReinitialise:true,
        autoReinitialiseDelay:10
    });
}