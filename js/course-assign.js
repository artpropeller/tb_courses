/**
 * Created by JetBrains WebStorm.
 * User: Ivan
 * Date: 13.08.12
 * Time: 0:59
 * To change this template use File | Settings | File Templates.
 */
seti = '';
$(function () {

    $('.scroll').jScrollPane();

    $('#course_assign .option label').click(function () {

        if ($(this).find('input').attr('checked') == 'checked') {

            $(this).addClass('active');
        }
        else {
            $(this).removeClass('active');
        }
    });

    $('#deadline').change(function () {
        if ($(this).attr('checked') == 'checked') {
            $('#date-deadline').slideDown(300);
        }
        else {
            $('#date-deadline').slideUp(300);
        }
    });

    $('#timedead').change(function () {
        if ($(this).attr('checked') == 'checked') {
            $('#time-deadline').fadeIn(300);
        }
        else {
            $('#time-deadline').fadeOut(300);
        }
    });

    $('.parameters .inparr .up').click(function () {
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
        $('#ball').val(parseInt(i * parseInt($('#percent').val())));
    }

    function changePercent() {
        var i = parseFloat($('#ball').val() / $('#ball').attr('max')) * 100;
        $('#percent').val(parseInt(i));
    }

    $('.parameters .inparr input').keyup(function (e) {
        if (parseInt($(this).val()) > parseInt($(this).attr('max'))) {
            $(this).val($(this).attr('max'));
        }
        if ($(this).is('#percent')) {
            changeBall();
        } else {
            changePercent();
        }
    });

    $('.parameters .inparr input').keydown(function (event) {
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

    $('.parameters .inparr .down').click(function () {
        $(this).parent().find('input').val(parseInt($(this).parent().find('input').val()) - 1);
        if ($(this).parent().find('input').is('#percent')) {
            changeBall();
        } else {
            changePercent();
        }
        return false;

    });

    $('.user').live('click', function () {
        if (!$(this).is('.addnew')) {
            $(this).toggleClass('active');
            showcor();
        }
    });

    $('.select-user').click(function () {
        var select = $('.groups .user-group.active .user.active').clone();
        $('.groups .user-group.active .user.active').remove();
        var parent = '#' + $('.user-group.active').attr('id');
        $('.selecting .user-group').append(select.removeClass('active').attr('parent', parent));
        $('#course_assign .users .scroll').jScrollPane();


        checkSelect();

        return false;
    });

    $('.emu .select-user').click(function () {
        var select = $('#selecting .scroll .user.active').clone();
        $('#selecting .scroll .user.active').remove();
        var parent = '#' + $('.user-group.active').attr('id');
        select.each(function () {
            $(this).find('.info').prepend('<span class="name">Новый пользователь</span>');
            $(this).find('.info').before('<img class="avatar" src="images/new_ava.jpg" alt="">');
        });
        $('#selecto .user-group').append(select.removeClass('active'));
        $('#course_assign .users .scroll').jScrollPane();
        if ($('#selecting .scroll .user:not(.addnew,.empty)').size() == 0) {
            $('.all-mail').removeClass('active');
        }
        showcor();
        return false;
    });

    $('.emi .select-user').click(function () {
        var select = $('#selecting .scroll .user.active').clone();
        $('#selecting .scroll .user.active').remove();
        var parent = '#' + $('.user-group.active').attr('id');
        select.each(function () {
            if ($(this).find('input').val() && !$(this).is('.empty')) {
                $(this).find('.mail').html($(this).find('input').val());
                $(this).find('.info').prepend('<span class="name">Новый пользователь</span>');
                $(this).find('.info').before('<img class="avatar" src="images/new_ava.jpg" alt="">');
            }
            else {
                $(this).addClass('empty');
            }
        });
        $('#selecto .user-group').append(select.removeClass('active'));
        $('#selecto .user.empty').remove();
        $('#course_assign .users .scroll').jScrollPane();
        if ($('#selecting .scroll .user:not(.addnew,.empty)').size() < 1) {

            $('.all-mail').removeClass('active');
        }
        showcor();
        rpAddNew();
        return false;
    });

    $('.emi .remove-user').click(function () {
        var select = $('#selecto .user-group .user.active').clone();
        $('#selecto .user-group .user.active').remove();
        select.each(function () {
            $(this).find('.mail').html('<input type="text" value="' + $(this).find('.mail').html() + '">');
            $(this).find('.name').remove();
            $(this).find('.avatar').remove();
        });
        $('#selecting .user-group .addnew').before(select.removeClass('active'));
        $('#course_assign .users .scroll').jScrollPane();
        showcor();
        rpAddNew();
        return false;
    });

    $('.emu .remove-user').click(function () {
        var select = $('#selecto .user-group .user.active').clone();
        $('#selecto .user-group .user.active').remove();
        select.each(function () {
            $(this).find('.name').remove();
            $(this).find('.avatar').remove();
        });
        $('#selecting .user-group').prepend(select.removeClass('active'));
        $('#course_assign .users .scroll').jScrollPane();
        showcor();
        checkSelect();
        return false;
    });

    $('.select-all').click(function () {
        if (!$(this).is('.active')) {
            $(this).addClass('active').html('Снять выделение');
            $(this).parent().find('.user-group.active .user').removeClass('active').addClass('active');
        }
        else {
            $(this).removeClass('active').html('Выделить всех');
            $(this).parent().find('.user-group.active .user').removeClass('active');
        }

        return false;
    });

    $('.all-mail').click(function () {
        if (!$(this).is('.active')) {
            $(this).addClass('active');
            $('.cor').show(0);
            $(this).parent().find('.scroll .user').removeClass('active').addClass('active');
            $(this).parent().find('.scroll .user.addnew, .scroll .user.empty').removeClass('active');
        }
        else {
            $('.cor').hide(0);
            $(this).removeClass('active');
            $(this).parent().find('.scroll .user').removeClass('active');
        }
        return false;
    });

    $('.messages .select-all').click(function () {
        if (!$(this).is('.active')) {
            $(this).addClass('active').html('Снять выделение');
            $(this).parent().find('.user').removeClass('active').addClass('active');
        }
        else {
            $(this).removeClass('active').html('Выделить всех');
            $(this).parent().find('.user').removeClass('active');
        }
        return false;
    });


    $('.group-menu a').click(function () {
        if (!$(this).parent().is('.active')) {
            $('.group-menu li').removeClass('active');
            $(this).parent().addClass('active');
            $('.groups .user-group').removeClass('active');
            $('.groups .user').removeClass('active');
            $($(this).attr('href')).addClass('active');
            $($(this).attr('href')).find('.user').show(0);
            $('#course_assign input.search').val('');
            $('#course_assign .users .scroll').jScrollPane();
        }
        return false;
    });

    $('.cas .remove-user').click(function () {
        var select = $('.selecting .user-group .user.active').clone();
        $('.selecting .user-group .user.active').remove();
        select.removeClass('active').each(function () {
            $('.groups').find($(this).attr('parent')).append($(this));
        });
        $('#course_assign .users .scroll').jScrollPane();
        checkSelect();
        return false;
    });

    $('#course_assign input.search').keydown(function (event) {
        var text;
        setTimeout(function () {
            text = $('#course_assign input.search').val();
        }, 50);
        setTimeout(function () {
            if (text.length) {
                $('.groups .user-group .user').hide(0);
                $('.groups .user-group .user').each(function () {
                    if ($(this).find('.name').text().toLowerCase().indexOf(text.toLowerCase()) + 1 || $(this).find('.mail').text().toLowerCase().indexOf(text.toLowerCase()) + 1) {
                        $(this).show(0);
                    }
                });
//            $('.groups .user-group .user .name:contains("'+text+'")').each(function(){
//                $(this).parents('.user').show(0);
//            });
            }
            else {
                $('.groups .user-group .user').show(0);
            }
        }, 150);
    });


    $('#course_assign .letter textarea').keydown(function (event) {
        setTimeout(function () {
            var val = $('#course_assign .letter textarea').val();
            if (val.length > 700) {
                $('#course_assign .letter textarea').val(val.substring(0, 700));
            }
        }, 50);
    });

    $('#course_assign .group-menu .scroll').jScrollPane();


    $('#course_assign.messages .scroll').jScrollPane();


    $('#course_assign .parameters .radio label').click(function () {
        if (!$(this).is('.active')) {
            $('#course_assign .parameters .radio label').removeClass('active');
            $(this).addClass('active');
        }
    });

    $('.selectbox').selectbox();

    $('#course_assign .parameters li .edit-letter').click(function () {
        if (!$(this).is('.active')) {
            $('#course_assign .parameters li .edit-letter').removeClass('active');
            $(this).addClass('active');
            var link = $(this);
            $('#course_assign .parameters li .textletter').slideUp(500, function () {

            });
            link.next().slideDown(500);
        }
        else {
            $(this).removeClass('active');
            $(this).next().slideUp(500);
        }
        return false;
    });

    $('#course_assign .parameters li .name').click(function () {
        if (!$(this).next().is('.active')) {
            $('#course_assign .parameters li .edit-letter').removeClass('active');
            $(this).next().addClass('active');
            var link = $(this);
            $('#course_assign .parameters li .textletter').slideUp(500, function () {

            });
            link.next().next().slideDown(500);
        }
        else {
            $(this).next().removeClass('active');
            $(this).next().next().slideUp(500);
        }
        return false;
    });

    $('.hide-settings a').click(function () {
        $(this).next().slideToggle(300);
        return false;
    });

    $('.table-add .add-new').click(function () {
        var nu = $('.user.clear').clone().removeClass('clear');
        $(this).before(nu);
        $('.selectbox').selectbox("detach");
        $('.selectbox').selectbox();
        $('.clear .selectbox').selectbox("detach");
        nu.find('.select-group-scroll').jScrollPane();

        $('.scroll').jScrollPane();
        return false;
    });


    $('.clear .selectbox').selectbox("detach");


    $('.table-add .check').live('click', function () {
        $(this).parents('.ac_bg').toggleClass('active');
        checkAddUsers();
    });

    $('.sendnoti, .send label').live('click', function () {
        $(this).toggleClass('active');
    });

    $('.table-add .selectall').live('click', function () {
        if ($(this).is('.active')) {
            $('.table-add .ac_bg').removeClass('active');
            $(this).removeClass('active');
        }
        else {
            $(this).addClass('active');
            $('.table-add .ac_bg').removeClass('active');
            $('.table-add .ac_bg').addClass('active');
        }
        checkAddUsers();

    });


    $('.table-add .select-group label').live('click', function () {
        $(this).toggleClass('active');
        if ($(this).is('.active')) {
            $(this).prev().attr('checked', 'checked');
        }
        else {
            $(this).prev().attr('checked', false);
        }
    });


    $('.table-add .select-group li .edit').live('click', function (e) {
        var label = $(this).parent().find('label');
        $(this).parent().addClass('active');
        $(this).parent().find('.del').show(0);
        $(this).hide(50);
        var t = label.text();
        label.html('<input class="edit-label" type="text" value="' + t + '">');
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

    $('.table-add .select-group li .del').live('click', function () {
        $(this).parent().remove();
        return false;
    });

    $('.table-add .select-group li').hover(function () {
        if (!$(this).is('.active')) {
        $(this).find('.edit').show(0);}
    }, function () {
        $(this).find('.edit').hide(0);
    });

    $(".select-group-list .edit-label").live("focusout", function () {
        var parent = $(this).parent();
        setTimeout(function () {
            parent.parents('li').find('.del').hide();
        }, 150);
        parent.parents('li').removeClass('active');

        if ($(this).val() != "") {
            parent.html($(this).val());
        }
        else {
            parent.remove();
            var v = $(this).parents('.select-group-list').find('.select-group-scroll').jScrollPane();
            v1 = v.data('jsp');
            v1.scrollToPercentY("100");
        }

    });


    $(".select-group-list .edit-label").live("keypress", function (e) {
        if (e.which == 13) {
            $(this).parents('li').removeClass('active');
            $(this).parents('li').find('.del').hide();
            var parent = $(this).parent();

            if ($(this).val() != "") {
                parent.html($(this).val());
            }
            else {
                parent.remove();
                var v = $(this).parents('.select-group-list').find('.select-group-scroll').jScrollPane();
                v1 = v.data('jsp');
                v1.scrollToPercentY("100");
            }


        }
    });

    $('.selecting.exel .users .scroll').jScrollPane();

    $('.addnew').click(function () {
        $(this).removeClass('active');
        var n = $('.user.empty').clone().removeClass('empty');
        if ($('#selecting .user-group .user').size() >= 8) {
            $('#selecting .user-group .addnew').hide();
            $('.spin').addClass('fix');
            $('.addnew.out').show(0);
        }
        $('#selecting .user-group .addnew').before(n);
        $('#selecting .scroll').jScrollPane();
        var vv = $('#selecting .scroll').data('jsp');
        vv.scrollToPercentY("100");
    });

    $('.cor').click(function () {
        $('#selecting .user-group .user.active').remove();
        if ($('#selecting .scroll .user:not(.addnew,.empty)').size() == 0) {
            $('.all-mail').removeClass('active');
        }
        showcor();
        return false;
    })

});

function rpAddNew() {
    var s = $('#selecting .user-group .user').size();
    if (s >= 8) {
        $('#selecting .user-group .addnew').hide();
        $('.spin').removeClass('fix').addClass('fix');
        $('.addnew.out').show(0);
    }
    else {
        $('#selecting .user-group .addnew').show();
        $('.spin').removeClass('fix');
        $('.addnew.out').hide(0);
    }
    $('#selecting .scroll').jScrollPane();
    var vv = $('#selecting .scroll').data('jsp');
    vv.scrollToPercentY("100");
}


function checkAddUsers() {
    if ($('.table-add .ac_bg.active').size()) {
        $('.actions ul').show(0);
    }
    else {
        $('.actions ul').hide(0);
    }
}
;

function showcor() {
    if ($('#selecting .scroll .user.active').size()) {
        $('.cor').show(0);
    }
    else {
        $('.cor').hide(0);
    }
}

function checkSelect() {
    $('.user-group.active').each(function () {

        var sa = $(this).find('.user.active').size();
        var se = $(this).parents('.users').find('.select-all');
        if (sa == 0) {
            se.removeClass('active').html('Выделить всех');
        }
        else {
            se.addClass('active').html('Снять выделение');
        }
    });
}

