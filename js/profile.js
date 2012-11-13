/**
 * Created with JetBrains WebStorm.
 * User: Ivan
 * Date: 30.09.12
 * Time: 17:39
 * To change this template use File | Settings | File Templates.
 */

$(function () {

    $('.fancy').fancybox();

    $('*').click(function(){
        if (!$(this).parents('.choice').size()) {
            $('.choice ul').hide(0);
        }
    });

    $('.choice .selector, .choice .toggle').click(function () {
        $('.choice ul').hide(0);
        $(this).parents('.choice').find('ul').toggle(0);
        $('.choice.timezone ul').jScrollPane();
        return false;
    });

    $('.choice li').click(function () {
        var val = $(this).html();
        $(this).parents('.choice').find('.selector').html(val);
        $('.choice ul').hide(0);
        return false;
    });

    $('.set.timezone .check').click(function () {
        if ($(this).is('.active')) {
            $(this).removeClass('active');
            $('.set.timezone .choice').show();
        }
        else {
            $(this).addClass('active');
            $('.set.timezone .choice').hide();
        }
    });

    $('.notify .check label').click(function () {
        $(this).parents('.check').toggleClass('active');
    });

});
