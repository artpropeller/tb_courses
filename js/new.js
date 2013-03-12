$(function () {

    addTooltipClass('#course-view-new-user #course-results .name', 25);
    addTooltipClass('#course-view-new-user #course-results .email', 25);

    tooltip();



    $('.tab_bar a').click(function () {
        $('.tab_bar li').removeClass('active');
        $(this).parent().addClass('active');
        $('.notify .gray').hide(0);
        $($(this).attr('href')).show(0);
        return false;
    });

    $('#course-view-new-user .gray .scroll, #course-view-new-user #course-results .users .scroll').jScrollPane({
        autoReinitialise: true,
        autoReinitialiseDelay: 10
    });

    $('.hovers .del').click(function(){
       $(this).parents('li').remove();
        return false

    });

    $(window).resize(function(){
        $('#course-view-new-user #course-results .users .scroll').height($(window).height()-400)
    });


    $('#course-view-new-user #course-results .users .scroll').height($(window).height()-400);

    $('#course-view-new-user #course-results .notify li a').click(function(){
        $('#course-view-new-user #course-results .notify li').removeClass('active');
        $(this).parent().addClass('active');
        filterProgress($(this).attr('rel'));
        return false;
    });

    $('#course-view-new-user #course-results .user .check span').click(function(){
        $(this).parents('.user').toggleClass('active');
        checkAll();
    });

    $('#course-view-new-user #course-results .head .check').click(function(){
        if ($(this).is('.active')) {
            $('#course-view-new-user #course-results .user').removeClass('active');
        }
        else {
            $('#course-view-new-user #course-results .user').addClass('active');
        }
        checkAll();

    });


});


function filterProgress(label){
    if (label != 'all') {
        $('#course-view-new-user #course-results .user').hide(0);
        $('#course-view-new-user #course-results .user[rel='+label+']').show(0);
    }
    else {
        $('#course-view-new-user #course-results .user').show(0);
    }
}

function checkAll() {
    if ($('#course-view-new-user #course-results .user').size() == $('#course-view-new-user #course-results .user.active').size()) {
        $('#course-view-new-user #course-results .head .check').addClass('active');
    }
    else {
        $('#course-view-new-user #course-results .head .check').removeClass('active');
    }
    checkRemember();
}

function checkRemember() {
    if ($('#course-view-new-user #course-results .user.active').size() > 0) {
        $('#course-view-new-user #course-results .remember').show(0);
    }
    else {
        $('#course-view-new-user #course-results .remember').hide(0);
    }
}

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