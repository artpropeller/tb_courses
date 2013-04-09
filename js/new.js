$(function () {

    addTooltipClass('#course-view-new-user #course-results .name', 25);
    addTooltipClass('#course-view-new-user #course-results .email', 25);
    addTooltipClass('#course-view-new-user .questions.s70 .name span', 58);
    addTooltipClass('#course-view-new-user .questions.s80 .name span', 60);
    addTooltipClass('#course-view-new-user h1', 40);
    addTooltipClass('#course-view-new-user h1.s65', 65);

    tooltip();


    $('.parameters.post li li').click(function () {
        if (!$(this).is('.active')) {
            $('#course-settings .parameters.post li li').removeClass('active');
            $(this).addClass('active');
            var link = $(this);
            $('#course-settings .parameters li .textletter').slideUp(500, function () {

            });
            $(link.attr('rel')).slideDown(500);
        }
        else {
            $(this).removeClass('active');
            $($(this).attr('rel')).slideUp(500);
        }
        return false;
    });

    $('#deadline').change(function () {
        if ($(this).attr('checked') == 'checked') {
            $('#date-deadline').slideDown(300);
        }
        else {
            $('#date-deadline').slideUp(300);
        }
    });

    $('.selectbox').selectbox("detach");
    $('.selectbox').selectbox({
        onOpen: function (inst) {
            $('body').prepend('<div class="a-hover"></div>');
        },
        onClose: function (inst) {
            $('.a-hover').remove();
        }
    });

    $('.a-hover').live('click', function () {
        $(".selectbox").selectbox('close');
    });

    $('#course-settings .parameters input').change(function () {
        $('#course-settings a.save').addClass('active');
    });

    $('#course-view-new-user .option label').click(function () {

        if ($(this).find('input').attr('checked') == 'checked') {

            $(this).addClass('active');
        }
        else {
            $(this).removeClass('active');
        }
    });

    $('#course-view-new-user .parameters .radio label').click(function () {
        if (!$(this).is('.active')) {
            $('#course-view-new-user .parameters .radio label').removeClass('active');
            $(this).addClass('active');
        }
    });

    $('#audience .head .all').live('click', function () {

        if ($(this).is('.active')) {
            $(this).removeClass('active');
            $('#audience .user').removeClass('active');
            $('#audience .head .del').fadeOut(150);
        }
        else {
            $(this).addClass('active');
            $('#audience .user').addClass('active');
            $('#audience .head .del').fadeIn(150);
        }

    });

    $('#audience .user').live('click', function () {
        $(this).toggleClass('active');
        if ($('#audience .user.active').size()) {
            $('#audience .head .del').fadeIn(150);
        }
        else {
            $('#audience .head .del').fadeOut(150);
        }

    });


    $('.tab_bar a').click(function () {
        $('.tab_bar li').removeClass('active');
        $(this).parent().addClass('active');
        $('.notify .gray').hide(0);
        $($(this).attr('href')).show(0);
        return false;
    });

    $('#course-view-new-user .gray .scroll, .questions .scroll, #course-view-new-user #audience .scroll').jScrollPane({
        autoReinitialise: true,
        autoReinitialiseDelay: 10
    });


    $('#course-view-new-user #audience .rightContainer:not(".last") .scroll').bind(
        'jsp-scroll-y',
        function (event, scrollPositionY, isAtTop, isAtBottom) {
            if (isAtBottom) {
                $('#course-view-new-user #audience .sub').hide(0);
            }
            else {
                $('#course-view-new-user #audience .sub').show(0);
            }

        }
    );


    $('.hovers .del').click(function () {
        $(this).parents('li').remove();
        return false

    });

    $(window).resize(function () {
        $('#course-view-new-user #audience .rightContainer.resize-1 .scroll').height($(window).height() - 300);
        $('#course-view-new-user #audience .rightContainer.resize-2 .scroll').height($(window).height() - 350);
        $('#course-view-new-user #audience .rightContainer.resize-3 .scroll').height($(window).height() - 450);
            resizeTableStat(366, $('.resize-6 .scroll'));
        resizeTableStat(434, $('.resize-5 .scroll'));
        resizeTableStat(340, $('.questions.resize-1 .scroll'));
        resizeTableStat(360, $('.questions.resize-2 .scroll'));
        resizeTableStat(428, $('.resize-4 .scroll'));
    });


    $('#course-view-new-user #audience .rightContainer.resize-1 .scroll').height($(window).height() - 300);
    $('#course-view-new-user #audience .rightContainer.resize-2 .scroll').height($(window).height() - 350);
    $('#course-view-new-user #audience .rightContainer.resize-3 .scroll').height($(window).height() - 450);

    resizeTableStat(340, $('.questions.resize-1 .scroll'));
    resizeTableStat(360, $('.questions.resize-2 .scroll'));
    resizeTableStat(428, $('.resize-4 .scroll'));
        resizeTableStat(366, $('.resize-6 .scroll'));
    resizeTableStat(434, $('.resize-5 .scroll'));


    $('#course-view-new-user #course-results .notify li a').click(function () {
        $('#course-view-new-user #course-results .notify li').removeClass('active');
        $(this).parent().addClass('active');
        filterProgress($(this).attr('rel'));
        return false;
    });

    $('#course-view-new-user #course-results .user .check span').click(function () {
        $(this).parents('.user').toggleClass('active');
        checkAll();
    });

    $('#course-view-new-user #course-results .head .check').click(function () {
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
            if ($(this).is('textarea')) {
                $(this).text('value', tp).css('color', '#999');
            }
            $(this).attr('value', tp);
            $(this).css('color', '#999');
        }).focusin(function () {
                var val = $(this).attr('placeholder');
                if ($(this).val() == val || $(this).text() == val) {
                    $(this).val('');
                    if (!$(this).is('input')) {
                        $(this).text('');
                    }
                    $(this).css('color', '#000');
                }
            }).focusout(function () {
                var val = $(this).attr('placeholder');
                if ($(this).val() == "" || $(this).text() == val) {
                    $(this).val(val);
                    if (!$(this).is('input')) {
                        $(this).text(val);
                    }
                    $(this).css('color', '#999');
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


function filterProgress(label) {
    if (label != 'all') {
        $('#course-view-new-user #course-results .user').hide(0);
        $('#course-view-new-user #course-results .user[rel=' + label + ']').show(0);
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

$(function () {
    $('.questions .scroll').jScrollPane({
        autoReinitialiseDelay: 10,
        autoReinitialise: true
    });

});

$(function () {
    $('#SearchQuestStat').keydown(function (event) {
        var text;
        setTimeout(function () {
            text = $('#SearchQuestStat').val();
        }, 50);
        setTimeout(function () {
            if (text.length) {
                $('#course-view-new-user .quest').hide(0);
                $('#course-view-new-user .quest').each(function () {
                    if ($(this).find('.name span').text().toLowerCase().indexOf(text.toLowerCase()) + 1) {
                        $(this).show(0);
                    }
                });
            }
            else {
                $('#course-view-new-user .quest').show(0);
            }
        }, 150);
    });
});


$(function () {
    $('.quest-statistic .progressing').hover(function () {
        $(this).find('.popup').show(0);
        var pop = $(this).find('.popup');
        var newpop = pop.clone();
        newpop.attr('id', 'newpopup');
        var st = pop.find('.string').first();
        var wi = 20 + st.find('.hint').width() + st.find('.color').width() + st.find('.total').width();
//        console.log(pop.offset(), pop.offsetTop);
        newpop.css({'left': (pop.offset().left - wi + 15) + 'px', 'top': (pop.offset().top-64) + 'px', 'display': 'block', 'width': wi});
        if (pop.offset().top + 104 > $(window).height()) {
            newpop.css({'top': (pop.offset().top - 194) + 'px'});
            newpop.addClass('top');
        }
        $('.quest-statistic').append(newpop);
        $(this).find('.popup').hide(0);
    }, function () {
        $('#newpopup').remove();
    });
});

function resizeTableStat(diff, scroll) {
    var hw = $(window).height();
    var s = hw - diff;
    scroll.find('.jspContainer').css('height', 'auto');
    scroll.find('.jspPane').css('position', 'static');
    scroll.css('height', 'auto');
    if (scroll.height() > s) {
        scroll.height(s);
    }
    scroll.find('.jspContainer').height(scroll.height());
    scroll.find('.jspPane').css('position', 'absolute');

}


$(function () {
    $('#course-view-new-user .quest').click(
        function () {
        $('#container-1 .dialog-assign').css('top', '-5000px');
        $('#container-1').show(0,function(){
            setTimeout(function(){resizeTableStat(340, $('.resscroll-1 .scroll'));}, 100);
            $('#container-1 .dialog-assign').css('top',-$('#container-1 .dialog-assign').height()+'px');
            $('#container-1 .dialog-assign').animate({top:'-18px'}, 1000);
        });


    });

   $('#course-view-new-user #course-results .users .user .name').click(function(){

       $('#container-2 .dialog-assign').css('top', '-5000px');
       $('#container-2').show(0,function(){
           setTimeout(function(){resizeTableStat(290, $('.resscroll-2 .scroll'));}, 100);
           $('#container-2 .dialog-assign').css('top',-$('#container-2 .dialog-assign').height()+'px');
           $('#container-2 .dialog-assign').animate({top:'-18px'}, 1000);
       });

       return false;

   });


    $('.close-assign').click(function(){
        $('.container-aasign:visible .dialog-assign').animate({top:-($('.container-aasign:visible .dialog-assign').height()+140)+'px'}, 1000, function(){
            $('.container-aasign').hide();
        });
    });


    $('.tab-menu li a').click(function(){
        $(this).parents('.content.opros').find('.tabs').hide(0);
        $('.tab-menu li').removeClass('active') ;
        $(this).parent().addClass('active');
        $($(this).attr('rel')).show(0);
//        resizeTableStat(340, $('.questions.resize-1 .scroll'));
        setTimeout(function(){
            resizeTableStat(366, $('.resize-6 .scroll'));
            resizeTableStat(434, $('.resize-5 .scroll'));}, 1);

        resizeTableStat(360, $('.questions.resize-2 .scroll'));
        resizeTableStat(428, $('.resize-4 .scroll'));
        return false
    });


});


$(function(){
    $('#course-view-new-user.test-admin .parameters .faq').click(function(){
        $(this).find('.popup-info').show(0);
        $('#course-view-new-user.test-admin').after('<div class="info-cover"></div>');
    });
    $('.info-cover, #course-view-new-user.test-admin .parameters .faq .popup-info .close').live('click', function(){
        $('.info-cover').remove();
        $('.popup-info').hide(0);
        return false;
    });
});