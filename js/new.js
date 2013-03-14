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

    $('#course-view-new-user .gray .scroll, #course-view-new-user #course-results .users .scroll, #course-view-new-user #audience .scroll').jScrollPane({
        autoReinitialise: true,
        autoReinitialiseDelay: 10
    });


    $('#course-view-new-user #audience .rightContainer:not(".last") .scroll').bind(
        'jsp-scroll-y',
        function(event, scrollPositionY, isAtTop, isAtBottom)
        {
            if (isAtBottom) {
                $('#course-view-new-user #audience .sub').hide(0);
            }
            else {
                $('#course-view-new-user #audience .sub').show(0);
            }

        }
    );


    $('.hovers .del').click(function(){
       $(this).parents('li').remove();
        return false

    });

    $(window).resize(function(){
        $('#course-view-new-user #course-results .users .scroll').height($(window).height()-400);
        $('#course-view-new-user #audience .rightContainer.resize-1 .scroll').height($(window).height()-300);
        $('#course-view-new-user #audience .rightContainer.resize-2 .scroll').height($(window).height()-350);
        $('#course-view-new-user #audience .rightContainer.resize-3 .scroll').height($(window).height()-450);
    });


    $('#course-view-new-user #course-results .users .scroll').height($(window).height()-400);
    $('#course-view-new-user #audience .rightContainer.resize-1 .scroll').height($(window).height()-300);
    $('#course-view-new-user #audience .rightContainer.resize-2 .scroll').height($(window).height()-350);
    $('#course-view-new-user #audience .rightContainer.resize-3 .scroll').height($(window).height()-450);

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


    $('#course-view-new-user #course-results .search').keydown(function (event) {
        var text;
        var m = $('#course-view-new-user #course-results .user');
        var par = $('#course-view-new-user #course-results .notify li.active a').attr('rel');
        setTimeout(function () {
            text = $('#course-view-new-user #course-results .search').val();
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
                filterProgress(par)
            }
        }, 150);
    });

    $('#audience .rightContainer:not(".last") .user.messages .ac_bg').click(function () {
        if (!$(this).is('.active')) {
            $('#audience .user.messages .ac_bg').removeClass('active');
            $(this).addClass('active');
            $('#audience .rightContainer.last .user-group').fadeOut(0);
            $($(this).parent().attr('rel')).fadeIn(100);
            $('#audience .rightContainer.last .scroll').jScrollPane();
        }
        else {
            $(this).removeClass('active');
            $('#audience .rightContainer.last .user-group').fadeOut(0);
        }
        return false;
    });

    $('#SearchMessage').keydown(function (event) {
        var text;
        setTimeout(function () {
            text = $('#SearchMessage').val();
            console.log(text);
        }, 50);
        setTimeout(function () {
            if (text.length) {
                $('.rightContainer.resize-1 .user-group .user, .rightContainer.resize-2 .user-group .user').hide(0);
                $('.rightContainer.resize-1 .user-group .user, .rightContainer.resize-2 .user-group .user').each(function () {
                    if ($(this).find('.name').text().toLowerCase().indexOf(text.toLowerCase()) + 1 || $(this).find('.mes').text().toLowerCase().indexOf(text.toLowerCase()) + 1 || $(this).find('em').text().toLowerCase().indexOf(text.toLowerCase()) + 1) {
                        $(this).show(0);
                    }
                });
//            $('.groups .user-group .user .name:contains("'+text+'")').each(function(){
//                $(this).parents('.user').show(0);
//            });
            }
            else {
                $('.user-group .user').show(0);
            }
        }, 150);
    });

    /* Placeholder for IE */
    if ($.browser.msie) { // Условие для вызова только в IE
        $(".placeholding").find("input,textarea").each(function () {
            var tp = $(this).attr("placeholder");
            $(this).addClass('.place');
            if ($(this).is('textarea')) {$(this).text('value', tp).css('color', '#999');}
            $(this).attr('value', tp).css('color', '#999');
        }).focusin(function () {
                var val = $(this).attr('placeholder');
                if ($(this).val() == val || $(this).text() == val) {
                    $(this).attr('value', '').css('color', '#000').text('');
                }
            }).focusout(function () {
                var val = $(this).attr('placeholder');
                if ($(this).val() == "" || $(this).text() == val) {
                    $(this).attr('value', val).css('color', '#999').text(val);
                }
            });

        /* Protected send form */
        $("form").submit(function () {
            $(this).find("input[type='text']").each(function () {
                var val = $(this).attr('placeholder');
                if ($(this).val() == val) {
                    $(this).attr('value', '');
                }
            })
        });
    }


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