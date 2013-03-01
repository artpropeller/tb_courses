$(function () {
    $('.tab_bar a').click(function () {
        $('.tab_bar li').removeClass('active');
        $(this).parent().addClass('active');
        $('.notify .gray').hide(0);
        $($(this).attr('href')).show(0);
        return false;
    });

    $('#course-view-new-user .gray .scroll').jScrollPane();
});