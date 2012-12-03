/**
 * Created by JetBrains WebStorm.
 * User: Ivan
 * Date: 13.08.12
 * Time: 0:59
 * To change this template use File | Settings | File Templates.
 */
seti = '';
$(function () {

    $('.scroll-assign').jScrollPane({animateScroll:true});

    $('.dialog-assign .option-assign label').click(function () {

        if ($(this).find('input').attr('checked') == 'checked') {

            $(this).addClass('active');
        }
        else {
            $(this).removeClass('active');
        }
    });

    $('#deadline-assign').change(function () {
        if ($(this).attr('checked') == 'checked') {
            $('#date-deadline-assign').slideDown(300);
        }
        else {
            $('#date-deadline-assign').slideUp(300);
        }
    });

    $('#timedead-assign').change(function () {
        if ($(this).attr('checked') == 'checked') {
            $('#time-deadline-assign').fadeIn(300);
        }
        else {
            $('#time-deadline-assign').fadeOut(300);
        }
    });

    $('.parameters-assign .inparr-assign .up-assign').click(function () {
        var inp = $(this).parent().find('input');
        var val = parseInt(inp.val()) + 1;
        if (val <= parseInt(inp.attr('max'))) {
            inp.val(parseInt(inp.val()) + 1);
        }
        if ($(this).parent().find('input').is('#percent')) {
            changeBall();
        } else {
            changePercent();
        }
        return false;
    });

    $('.parameters-assign .inparr-assign input').change(function () {
        if (parseInt($(this).val()) > parseInt($(this).attr('max'))) {
            $(this).val($(this).attr('max'));
        }
    });

    $('.parameters-assign #percent-assign').bind('change keyup', function () {
        changeBall();
    });

    $('.parameters-assign #ball-assign').bind('change keyup', function () {
        changePercent();
    });

    function changeBall() {
        var i = parseFloat($('#ball-assign').attr('max')) / 100;
        $('#ball-assign').val(parseInt(i * parseInt($('#percent-assign').val())));
    }

    function changePercent() {
        var i = parseFloat($('#ball-assign').val() / $('#ball-assign').attr('max')) * 100;
        $('#percent-assign').val(parseInt(i));
    }

    $('.parameters-assign .inparr-assign input').keyup(function (e) {
        if (parseInt($(this).val()) > parseInt($(this).attr('max'))) {
            $(this).val($(this).attr('max'));
        }
        if ($(this).is('#percent-assign')) {
            changeBall();
        } else {
            changePercent();
        }
    });

    $('.parameters-assign .inparr-assign input').keydown(function (event) {
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

    $('.parameters-assign .inparr-assign .down-assign').click(function () {
        $(this).parent().find('input').val(parseInt($(this).parent().find('input').val()) - 1);
        if ($(this).parent().find('input').is('#percent-assign')) {
            changeBall();
        } else {
            changePercent();
        }
        return false;

    });

    $('.user-assign').live('click', function () {
        if (!$(this).is('.addnew-assign')) {
            $(this).toggleClass('active');
            showcor();
        }
    });

    $('.cas-assign .select-user-assign').click(function () {
        var select = $('.groups-assign .user-group-assign.active .user-assign.active').css('display','block').clone();
        $('.groups-assign .user-group-assign.active .user-assign.active').remove();
        var parent = '#' + $('.user-group-assign.active').attr('id');
        $('.selecting-assign .user-group-assign').append(select.removeClass('active').attr('parent', parent));
        $('.dialog-assign .users-assign .scroll-assign').jScrollPane({animateScroll:true});


        checkSelect();
        tooltip();
        return false;
    });

    $('.emu-assign .select-user-assign').click(function () {
        var select = $('#selecting-assign .scroll-assign .user-assign.active').clone();
        $('#selecting-assign .scroll-assign .user-assign.active').remove();
        var parent = '#' + $('.user-group-assign.active').attr('id');
        select.each(function () {
            $(this).find('.info').prepend('<span class="name-assign">Новый пользователь</span>');
            $(this).find('.info').before('<img class="avatar-assign" src="images/new_ava.jpg" alt="">');
        });
        $('#selecto-assign .user-group-assign').append(select.removeClass('active'));
        $('.dialog-assign .users-assign .scroll-assign').jScrollPane({animateScroll:true});
        if ($('#selecting-assign .scroll-assign .user-assign:not(.addnew,.empty)').size() == 0) {
            $('.all-mail-assign').removeClass('active');
        }
        showcor();
        addTooltipClass('#selecto-assign .user-assign .mail-assign', 19);
        tooltip();
        return false;
    });

    $('.emi-assign .select-user-assign').click(function () {
        var select = $('#selecting-assign .scroll-assign .user-assign.active').clone();
        $('#selecting-assign .scroll-assign .user-assign.active').remove();
        var parent = '#' + $('.user-group-assign.active').attr('id');
        select.each(function () {
            if ($(this).find('input').val() && !$(this).is('.empty-assign')) {
                $(this).find('.mail-assign').html($(this).find('input').val());
                $(this).find('.info-assign').prepend('<span class="name-assign">Новый пользователь</span>');
                $(this).find('.info-assign').before('<img class="avatar-assign" src="images/new_ava.jpg" alt="">');
            }
            else {
                $(this).addClass('empty');
            }
        });
        $('#selecto-assign .user-group-assign').append(select.removeClass('active'));
        $('#selecto-assign .user-assign.empty-assign').remove();
        $('#course_assign-assign .users-assign .scroll-assign').jScrollPane({animateScroll:true});
        if ($('#selecting-assign .scroll-assign .user-assign:not(.addnew-assign,.empty-assign)').size() < 1) {

            $('.all-mail-assign').removeClass('active');
        }
        showcor();
        rpAddNew();
        addTooltipClass('#selecto-assign .user-assign .name-assign', 19);
        addTooltipClass('#selecto-assign .user-assign .mail-assign', 19);
        tooltip();
        return false;
    });

    $('.emi-assign .remove-user-assign').click(function () {
        var select = $('#selecto-assign .user-group-assign .user-assign.active').clone();
        $('#selecto-assign .user-group-assign .user-assign.active').remove();
        select.each(function () {
            $(this).find('.mail-assign').html('<input type="text" value="' + $(this).find('.mail-assign').html() + '">');
            $(this).find('.name-assign').remove();
            $(this).find('.avatar-assign').remove();
        });
        $('#selecting-assign .user-group-assign .addnew-assign').before(select.removeClass('active'));
        $('#course_assign-assign .users-assign .scroll-assign').jScrollPane({animateScroll:true});
        showcor();
        rpAddNew();
        return false;
    });

    $('.emu-assign .remove-user-assign').click(function () {
        var select = $('#selecto-assign .user-group-assign .user-assign.active').clone();
        $('#selecto-assign .user-group-assign .user-assign.active').remove();
        select.each(function () {
            $(this).find('.name-assign').remove();
            $(this).find('.avatar-assign').remove();
        });
        $('#selecting-assign .user-group-assign').prepend(select.removeClass('active'));
        $('#course_assign-assign .users-assign .scroll-assign').jScrollPane({animateScroll:true});
        showcor();
        checkSelect();
        tooltip();
        return false;
    });

    $('.select-all-assign:not(".webin")').click(function () {
        if (!$(this).is('.active')) {
            $(this).addClass('active').html('Снять выделение');
            $(this).parents('.users-assign').find('.user-group-assign.active .user-assign').removeClass('active').addClass('active');
        }
        else {
            $(this).removeClass('active').html('Выделить всех');
            $(this).parents('.users-assign').find('.user-group-assign.active .user-assign').removeClass('active');
        }

        return false;
    });

    $('.all-mail-assign').click(function () {
        if (!$(this).is('.active')) {
            $(this).addClass('active');
            $('.cor-assign').show(0);
            $(this).parent().find('.scroll-assign .user-assign').removeClass('active').addClass('active');
            $(this).parent().find('.scroll-assign .user-assign.addnew-assign, .scroll-assign .user-assign.empty-assign').removeClass('active');
        }
        else {
            $('.cor-assign').hide(0);
            $(this).removeClass('active');
            $(this).parent().find('.scroll-assign .user-assign').removeClass('active');
        }
        return false;
    });

    $('.messages-assign .select-all-assign').click(function () {
        if (!$(this).is('.active')) {
            $(this).addClass('active').html('Снять выделение');
            $(this).parent().find('.user-assign').removeClass('active').addClass('active');
        }
        else {
            $(this).removeClass('active').html('Выделить всех');
            $(this).parent().find('.user-assign').removeClass('active');
        }
        return false;
    });


    $('.group-menu-assign a').click(function () {
        if (!$(this).parent().is('.active')) {
            $('.group-menu-assign li').removeClass('active');
            $(this).parent().addClass('active');
            $('.groups-assign .user-group-assign').removeClass('active');
//            $('.groups .user').removeClass('active');
            $($(this).attr('href')).addClass('active');
            $($(this).attr('href')).find('.user-assign').show(0);
            $('.dialog-assign input.search-assign').val('');
            $('.dialog-assign .users-assign .scroll-assign').jScrollPane({animateScroll:true});
        }
        checkSelect();
        return false;
    });

    $('.cas-assign .remove-user-assign').click(function () {
        var select = $('.selecting-assign .user-group-assign .user-assign.active').clone();
        $('.selecting-assign .user-group-assign .user-assign.active').remove();
        select.removeClass('active').each(function () {
            $('.groups-assign').find($(this).attr('parent')).append($(this));
        });
        $('.dialog-assign .users-assign .scroll-assign').jScrollPane({animateScroll:true});
        tooltip();
        checkSelect();
        return false;
    });

    $('.dialog-assign input.search-assign').keydown(function (event) {
        var text;
        setTimeout(function () {
            text = $('.dialog-assign input.search-assign').val();
        }, 50);
        setTimeout(function () {
            if (text.length) {
                $('.groups-assign .user-group-assign .user-assign').hide(0);
                $('.groups-assign .user-group-assign .user-assign').each(function () {
                    if ($(this).find('.name-assign').text().toLowerCase().indexOf(text.toLowerCase()) + 1 || $(this).find('.mail-assign').text().toLowerCase().indexOf(text.toLowerCase()) + 1) {
                        $(this).show(0);
                    }
                });
//            $('.groups .user-group .user .name:contains("'+text+'")').each(function(){
//                $(this).parents('.user').show(0);
//            });
            }
            else {
                $('.groups-assign .user-group-assign .user-assign').show(0);
            }
        }, 150);
    });


    $('.dialog-assign .letter-assign textarea').keydown(function (event) {
        setTimeout(function () {
            var val = $('.dialog-assign .letter-assign textarea').val();
            if (val.length > 700) {
                $('.dialog-assign .letter-assign textarea').val(val.substring(0, 700));
            }
        }, 50);
    });

    $('.dialog-assign .group-menu-assign .scroll-assign').jScrollPane({animateScroll:true});


    $('.dialog-assign.messages-assign .scroll-assign').jScrollPane({animateScroll:true});


    $('.dialog-assign .parameters-assign .radio-assign label').click(function () {
        if (!$(this).is('.active')) {
            $('.dialog-assign .parameters-assign .radio-assign label').removeClass('active');
            $(this).addClass('active');
        }
    });

//    $('.selectbox').selectbox({
//        onOpen:function (inst) {
//
//            $('#course_assign').prepend('<div class="a-hover"></div>');
//        },
//        onClose:function (inst) {
//            $('.a-hover').remove();
//        }
//    });

    $('.dialog-assign .parameters-assign li .edit-letter-assign').click(function () {
        if (!$(this).is('.active')) {
            $('.dialog-assign .parameters-assign li .edit-letter-assign').removeClass('active');
            $(this).addClass('active');
            var link = $(this);
            $('.dialog-assign .parameters-assign li .textletter-assign').slideUp(500, function () {

            });
            link.next().slideDown(500);
        }
        else {
            $(this).removeClass('active');
            $(this).next().slideUp(500);
        }
        return false;
    });

    $('.dialog-assign .parameters-assign li .name-assign').click(function () {
        if (!$(this).next().is('.active')) {
            $('.dialog-assign .parameters-assign li .edit-letter-assign').removeClass('active');
            $(this).next().addClass('active');
            var link = $(this);
            $('.dialog-assign .parameters-assign li .textletter-assign').slideUp(500, function () {

            });
            link.next().next().slideDown(500);
        }
        else {
            $(this).next().removeClass('active');
            $(this).next().next().slideUp(500);
        }
        return false;
    });

    $('.hide-settings-assign a').click(function () {
        $(this).next().slideToggle(300);
        return false;
    });

    $('.table-add-assign .add-new-assign').click(function () {
        var nu = $('.user-assign.clear-assign').clone().removeClass('clear-assign');
        $(this).before(nu);
        $('.selectbox-assign').selectbox("detach");
        $('.selectbox-assign').selectbox({
            onOpen:function (inst) {
                $('.dialog-assign').prepend('<div class="a-hover-assign"></div>');
            },
            onClose:function (inst) {
                $('.a-hover-assign').remove();
            }
        });
        $('.clear-assign .selectbox-assign').selectbox("detach");
        nu.find('.select-group-scroll-assign').jScrollPane({animateScroll:true});

        st = $('.scroll-assign').jScrollPane({animateScroll:true});
        st.data('jsp').scrollToPercentY("100");
        return false;
    });


    $('.clear-assign .selectbox-assign').selectbox("detach");


    $('.table-add-assign .check-assign').live('click', function () {
        $(this).parents('.ac_bg-assign').toggleClass('active');
        checkAddUsers();
    });

    $('.sendnoti-assign, .send-assign label').live('click', function () {
        $(this).toggleClass('active');
    });

    $('.table-add-assign .selectall-assign').live('click', function () {
        if ($(this).is('.active')) {
            $('.table-add-assign .ac_bg-assign').removeClass('active');
            $(this).removeClass('active');
        }
        else {
            $(this).addClass('active');
            $('.table-add-assign .ac_bg-assign').removeClass('active');
            $('.table-add-assign .ac_bg-assign').addClass('active');
        }
        checkAddUsers();

    });


    $('.table-add-assign .select-group-assign label').live('click', function () {
        $(this).toggleClass('active');
        if ($(this).is('.active')) {
            $(this).prev().attr('checked', 'checked');
        }
        else {
            $(this).prev().attr('checked', false);
        }
    });


    $('.table-add-assign .select-group-assign li .edit-assign').live('click', function (e) {
        var label = $(this).parent().find('label');
        $(this).parent().addClass('active');
        $(this).parent().find('.del-assign').show(0);
        $(this).hide(50);
        var t = label.text();
        label.html('<input class="edit-label-assign" maxlength="30" type="text" value="' + t + '">');
        label.find('input').autoGrowInput({
            comfortZone: 10,
            minWidth: 130,
            maxWidth: 240
        });
        if (!$.browser.msie) {
            label.find('input').focus();
        }
        else {
            setTimeout(function () {
                label.find('input').focus();
            }, 550);
        }
        e.preventDefault();
        return false;
    });

    $('.table-add-assign .select-group-assign li .del-assign').live('click', function () {
        $(this).parent().remove();
        return false;
    });

    $('.table-add-assign .select-group-assign li').hover(function () {
        if (!$(this).is('.active')) {
        $(this).find('.edit-assign').show(0);}
    }, function () {
        $(this).find('.edit-assign').hide(0);
    });

    $(".select-group-list-assign .edit-label-assign").live("focusout", function () {
        var parent = $(this).parent();
        setTimeout(function () {
            parent.parents('li').find('.del-assign').fadeOut(150);
        }, 50);
        parent.parents('li').removeClass('active');

        if ($(this).val() != "") {
            parent.html($(this).val());
        }
        else {
            parent.remove();
            var v = $(this).parents('.select-group-list-assign').find('.select-group-scroll-assign').jScrollPane({animateScroll:true});
            v1 = v.data('jsp');
            v1.scrollToPercentY("100");
        }

    });


    $(".select-group-list-assign .edit-label-assign").live("keypress", function (e) {
        if (e.which == 13) {
            $(this).parents('li').removeClass('active');
            $(this).parents('li').find('.del-assign').hide();
            var parent = $(this).parent();

            if ($(this).val() != "") {
                parent.html($(this).val());
            }
            else {
                parent.remove();
                var v = $(this).parents('.select-group-list-assign').find('.select-group-scroll-assign').jScrollPane({animateScroll:true});
                v1 = v.data('jsp');
                v1.scrollToPercentY("100");
            }


        }
    });

    $('.selecting-assign.exel-assign .users-assign .scroll-assign').jScrollPane({animateScroll:true});

    $('.addnew-assign').click(function () {
        $(this).removeClass('active');
        var n = $('.user-assign.empty-assign').clone().removeClass('empty-assign');
        if ($('#selecting-assign .user-group-assign .user-assign').size() >= 7) {
            $('#selecting-assign .user-group-assign .addnew-assign').hide();
            $('.spin-assign').addClass('fix-assign');
            $('.addnew-assign.out-assign').show(0);
        }
        $('#selecting-assign .user-group-assign .addnew-assign').before(n);
        $('#selecting-assign .scroll-assign').jScrollPane({animateScroll:true});
        var vv = $('#selecting-assign .scroll-assign').data('jsp');
        vv.scrollToPercentY("100");
    });

    $('.cor-assign').click(function () {
        $('#selecting-assign .user-group-assign .user-assign.active').remove();
        if ($('#selecting-assign .scroll-assign .user-assign:not(.addnew-assign,.empty-assign)').size() == 0) {
            $('.all-mail-assign').removeClass('active');
        }
        showcor();
        return false;
    })

});

function rpAddNew() {
    var s = $('#selecting-assign .user-group-assign .user-assign').size();
    if (s >= 8) {
        $('#selecting-assign .user-group-assign .addnew-assign').hide();
        $('.spin-assign').removeClass('fix-assign').addClass('fix-assign');
        $('.addnew-assign.out-assign').show(0);
    }
    else {
        $('#selecting-assign .user-group-assign .addnew-assign').show();
        $('.spin-assign').removeClass('fix-assign');
        $('.addnew-assign.out-assign').hide(0);
    }
    $('#selecting-assign .scroll-assign').jScrollPane({animateScroll:true});
    var vv = $('#selecting-assign .scroll-assign').data('jsp');
    vv.scrollToPercentY("100");
}


function checkAddUsers() {
    if ($('.table-add-assign .ac_bg-assign.active').size()) {
        $('.actions-assign ul').show(0);
    }
    else {
        $('.actions-assign ul').hide(0);
    }
}

function showcor() {
    if ($('#selecting-assign .scroll-assign .user-assign.active').size()) {
        $('.cor-assign').show(0);
    }
    else {
        $('.cor-assign').hide(0);
    }
}

function checkSelect() {
    $('.user-group-assign.active:not(".webin-aasign")').each(function () {

        var sa = $(this).find('.user-assign.active').size();
        var se = $(this).parents('.users-assign').find('.select-all-assign');
        if (sa == 0) {
            se.removeClass('active').html('Выделить всех');
        }
        else {
            se.addClass('active').html('Снять выделение');
        }
    });
}


this.tooltip = function(){
    /* CONFIG */
    xOffset = -23;
    yOffset = 13;
    // these 2 variable determine popup's distance from the cursor
    // you might want to adjust to get the right result
    /* END CONFIG */
    $(".tooltip").hover(function(e){
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
    $(".tooltip").mousemove(function(e){
        $("#tooltip")
            .css("top",(e.pageY - xOffset) + "px")
            .css("left",(e.pageX + yOffset) + "px");
    });
};



// starting the script on page load
$(document).ready(function(){

    addTooltipClass('.group-menu-assign ul li a', 15);
    addTooltipClass('.tooltips .user-assign .name-assign', 19);
    addTooltipClass('.tooltips .user-assign .mail-assign', 19);

    tooltip();
});


$(function(){
    $('#course_assign-assign .removing-assign').click(function(){
        $('.table-add-assign .user-assign.active').remove();
        checkAddUsers();
        return false;
    });

    $('.a-hover-assign').live('click', function () {
        $(".selectbox-assign").selectbox('close');
    });
});

function addTooltipClass(elements, length){
    $(elements).each(function(){
        if ($(this).text().length > length) {
            $(this).addClass('tooltip');
        }
    });
}