/**
 * Created with JetBrains PhpStorm.
 * User: Ivan
 * Date: 25.01.13
 * Time: 0:01
 * To change this template use File | Settings | File Templates.
 */

function resizeUserList() {
    $('#user-list .dash_bottom').height($(document).height() - 122 - 10);
    $('#user-list .scroll').height($('#user-list .dash_bottom').height() - 45);
}

function showActionsUser() {
    if ($('#user-list .user.active').size()) {
        $('#user .buttons a').show(0);
    }
    else {
        $('#user .buttons a').hide(0);
    }
    checkSelect();
}

function selectAllUsers() {
    var u = $('#user-list .user:visible'),
        s = $('#user-list .select-all:visible');
    if (s.hasClass('active')) {
        u.removeClass('active');
        s.removeClass('active');
    }
    else {
        u.addClass('active');
        s.addClass('active');
    }
    showActionsUser();
    return false;
}

function checkSelect() {
    var s = $('#user-list .user:visible').size(),
        sa = $('#user-list .user.active:visible').size(),
        sl = $('#user-list .select-all');
    if (sa < s) sl.removeClass('active');
    if (sa == s) sl.addClass('active');
    if (s == 0) sl.removeClass('active');
}

function deleteUsers(user) {
    user.remove();
    showActionsUser();
}

function hideEditChoice() {
    $('#user .editor').removeClass('active').next().slideUp(300);
    $('.clicker').remove();
    return false;
}

$(function () {
    resizeUserList();
    $(window).resize(resizeUserList);
    $('#user-list .user').click(function () {
        $(this).toggleClass('active');
        showActionsUser();
    });

    $('#user-list .select-all').click(selectAllUsers);

    $('#user .buttons a.remove').click(function () {
        deleteUsers($('#user-list .user.active'));
        return false;
    });

    $('#user .groups li').click(function () {
        $('#user .groups li').removeClass('active');
        $(this).addClass('active');
    });

    $('#user-list .user .del').click(function () {
        deleteUsers($(this).parents('.user'));
        return false;
    });

    $('#user-list .scroll').jScrollPane({
        autoReinitialise:true,
        autoReinitialiseDelay:25
    });

    $('#user-list .scroll').bind(
        'jsp-scroll-y',
        function (event, scrollPositionY, isAtTop, isAtBottom) {
            if (isAtBottom) {
                $('#user-list .shadows').hide(0);
            }
            else {
                $('#user-list .shadows').show(0);
            }

        }
    );

    $('#user .editor').click(function(){
        $(this).addClass('active');
        $(this).next().slideDown(300);
        $('body').append('<div class="clicker"></div>');
        return false;
    });

    $('.clicker').live('click', hideEditChoice);

    $('#user .edit ul li').click(hideEditChoice);


    //поиск по таблице
    $('#search-list').keydown(function (event) {
        var text;
        var m = $('#user-list .user');
        setTimeout(function () {
            text = $('#search-list').val();
        }, 1);
        setTimeout(function () {
            if (text.length) {
                m.hide(0);
                m.each(function () {
                    if ($(this).find('.name').text().toLowerCase().indexOf(text.toLowerCase()) + 1 || $(this).find('.email').text().toLowerCase().indexOf(text.toLowerCase()) + 1) {
                        $(this).show(0);
                    }
                });
            }
            else {
                m.show(0);
            }
        }, 5);
    });



});