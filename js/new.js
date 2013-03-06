$(function () {
    $('.tab_bar a').click(function () {
        $('.tab_bar li').removeClass('active');
        $(this).parent().addClass('active');
        $('.notify .gray').hide(0);
        $($(this).attr('href')).show(0);
        return false;
    });

    $('#course-view-new-user .gray .scroll').jScrollPane({
        autoReinitialise: true,
        autoReinitialiseDelay: 10
    });

    $('.hovers .del').click(function(){
       $(this).parents('li').remove();
        return false

    });
});