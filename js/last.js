function summShareFields(n) {
    var sm = 0;
    $('.share input').each(function(){
        sm = sm + parseInt($(this).val());
    });
    if (sm + n > 100) {
        return false
    }
    return true;
}

$(function () {
    $('.parameters .inparr .up').live('click', function () {
        var inp = $(this).parent().find('input');
        var val = parseInt(inp.val()) + 1;
        if (!$(this).parent().is('.share')) {
        if (val <= parseInt(inp.attr('max'))) {
            inp.val(parseInt(inp.val()) + 1);
        }
        if ($(this).parent().find('input').is('#percent')) {
            changeBall();
        } else {
            changePercent();
        }
        }
        else {

            if (summShareFields(1)) {
                inp.val(parseInt(inp.val()) + 1);
            }

        }
        return false;
    });

    $('.parameters .inparr input').change(function () {
        if (parseInt($(this).val()) > parseInt($(this).attr('max'))) {
            $(this).val($(this).attr('max'));
        }
    });

    $('.parameters #percent').bind('change keyup', function () {
        changeBall();
    });

    $('.parameters #ball').bind('change keyup', function () {
        changePercent();
    });

    function changeBall() {
        var i = parseFloat($('#ball').attr('max')) / 100;
        $('#ball').val(parseInt(Math.ceil(i * parseInt($('#percent').val()))));
    }

    function changePercent() {
        var i = parseFloat($('#ball').val() / $('#ball').attr('max')) * 100;
        $('#percent').val(parseInt(Math.ceil(i)));
    }

    $('.parameters .inparr input').live('keyup', function (e) {
        if (parseInt($(this).val()) > parseInt($(this).attr('max'))) {
            $(this).val($(this).attr('max'));
        }
        if ($(this).is('#percent')) {
            changeBall();
        } else {
            changePercent();
        }
        if (!$(this).parent().is('.share') && !summShareFields(0)) {
            var sm = 0;
            var cur = $(this);
            $.each($('.share input'), function(){
                sm = sm + parseInt($(this).val());
            });
            sm = sm - $(this).val();
            $(this).val(100-sm);
        }
    });

    $('.parameters .inparr input').live('keydown',function (event) {
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

    $('.parameters .inparr .down').live('click', function () {
        if (($(this).parent().find('input').val()) - 1 > 0) {
            $(this).parent().find('input').val(parseInt($(this).parent().find('input').val()) - 1);
            if ($(this).parent().find('input').is('#percent')) {
                changeBall();
            } else {
                changePercent();
            }
        }
        return false;

    });
});


$(function(){
    var api = $('.dialog-assign .table-quests .scroll');
    api.jScrollPane({
        autoReinitialise:true,
        autoReinitialiseDelay:10
    });
    api = api.data('jsp');
    $('#new-group').click(function(){
        $('#template-group-questions').find('.num').text($('.jspPane .blocks').size()+1+'.');
        var ht = $('#template-group-questions').html();
        $('#report .jspPane').append(ht);
        setTimeout(function(){api.scrollToPercentY(100,400)}, 200);
    });

    $('.remove-row').live('click', function(){
        $(this).parents('.blocks').remove();
        $('.jspPane .blocks').each(function(i,e){
            $(this).find('.num').text((i+1)+'.');
        });
        return false;
    });



});
