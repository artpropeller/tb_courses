/**
 * Created by JetBrains WebStorm.
 * User: Ivan
 * Date: 13.08.12
 * Time: 0:59
 * To change this template use File | Settings | File Templates.
 */
$(function () {

    $('.selecting-assign .scroll-assign-wb.active').jScrollPane();

    $('.panel-accordeon-assign').click(function(){
        if (!$(this).is('.active')) {
            var panel = $(this);
            $('.selecting-assign .scroll-assign-wb.active').data('jsp').destroy();
            $('.panel-accordeon-assign').removeClass('active');
            panel.addClass('active');
            $('#webinar-assign .selecting-assign .scroll-assign-wb:visible').slideUp(500, function(){

            });

            panel.next().slideDown(500, function(){
                $('.selecting-assign .scroll-assign-wb, .selecting-assign .user-group-assign').removeClass('active');
                panel.next().addClass('active');
                panel.next().find('.user-group-assign').addClass('active')
                $('.selecting-assign .scroll-assign-wb.active').jScrollPane();
            });


        }
    });

    $('.web-assign .select-user-assign').click(function () {
        var select = $('.groups-assign .user-group-assign.active .user-assign.active').css('display','block').clone();
        $('.groups-assign .user-group-assign.active .user-assign.active').remove();
        var parent = '#' + $('.user-group-assign.active').attr('id');
        $('.selecting-assign .user-group-assign.active').append(select.removeClass('active').attr('parent', parent));
        $('.selecting-assign .scroll-assign-wb.active').data('jsp').destroy();
        $('.dialog-assign .users-assign .scroll-assign-wb.active').jScrollPane();


        checkSelectWebinar();
        tooltip();
        return false;
    });

    $('.web-assign .remove-user-assign').click(function () {
        var select = $('.selecting-assign .user-group-assign.active .user-assign.active').clone();
        $('.selecting-assign .user-group-assign.active .user-assign.active').remove();
        select.removeClass('active').each(function () {
            $('.groups-assign').find($(this).attr('parent')).append($(this));
        });
        $('.selecting-assign .scroll-assign-wb.active').data('jsp').destroy();
        $('.dialog-assign .users-assign .scroll-assign-wb.active').jScrollPane();
        tooltip();
        checkSelectWebinar();
        return false;
    });


    $('#webinar-assign .radio-assign label').click(function () {
        if (!$(this).is('.active')) {
            $('#webinar-assign .radio-assign label').removeClass('active');
            $(this).addClass('active');
        }
    });

    $('.select-all-assign.webin').click(function () {
        if (!$(this).is('.active')) {
            $(this).addClass('active').html('Снять выделение');
            $(this).parent().next().find('.user-group-assign .user-assign').removeClass('active').addClass('active');
        }
        else {
            $(this).removeClass('active').html('Выделить всех');
            $(this).parent().next().find('.user-group-assign .user-assign').removeClass('active').addClass('active');
        }

        return false;
    });

    function checkSelectWebinar() {
        $('.user-group-assign.active').each(function () {

            var sa = $(this).find('.user-assign.active').size();
            var se = $(this).parents('.users-assign').find('.select-all-assign:not(".webin")');
            if (sa == 0) {
                se.removeClass('active').html('Выделить всех');
            }
            else {
                se.addClass('active').html('Снять выделение');
            }
        });

        $('.scroll-assign-wb').each(function () {

            var sa = $(this).find('.user-assign.active').size();
            var se = $(this).prev().find('.select-all-assign.webin');
            if (sa == 0) {
                se.removeClass('active').html('Выделить всех');
            }
            else {
                se.addClass('active').html('Снять выделение');
            }
        });
    }


});