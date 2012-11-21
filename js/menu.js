/**
 * Created by JetBrains WebStorm.
 * User: Ivan
 * Date: 13.08.12
 * Time: 0:59
 * To change this template use File | Settings | File Templates.
 */

$(function () {

    elementsScroll = true;

    $('#course-view .elemets_course').hover(function () {
        var pop = $(this);
        pop.find('.elements').fadeIn(0);
        pop.find('.scroll').jScrollPane();
        v = pop.find('.scroll .jspContainer');
        pop.find('.scroll .jspContainer').css('height', pop.find('ol').height());
    }, function () {
        $(this).find('.elements').fadeOut(0);
    });

    $('#course-view .elemets_course .close').click(function(){
        $(this).parent().fadeOut(0);

    });


    $('#course-view .navigate .expand>a').click(function () {
        if (!$(this).is('.active')) {
            $(this).addClass('active');
            $(this).parent().children('ul').slideDown(300, function () {
                $('#course-view .navigate .scroll').jScrollPane();
            });
        }
        else {
            $(this).parent().find('ul').slideUp(350, function () {
                $('#course-view .navigate .scroll').jScrollPane();
            });
            $(this).parent().find('.expand>a').removeClass('active');
            $(this).parent().find('ul .file').removeClass('active');
            $(this).parent().find('ul .files').slideUp(300);
            $(this).parent().find('ul .files ul').slideDown(300);
            $(this).removeClass('active');
        }
        return false;
    });
    $('#course-view .navigate .file').click(function () {
        if (!$(this).is('.active')) {
            $(this).addClass('active');
            $(this).parent().children('.files').slideDown(300, function () {
                $('#course-view .navigate .scroll').jScrollPane();
            });
        }
        else {
            $(this).parent().children('.files').slideUp(300, function () {
                $('#course-view .navigate .scroll').jScrollPane();
            });
            $(this).removeClass('active');
        }
        $('#course-view .navigate .scroll').jScrollPane();
        return false;
    });

    $('#course-view .navigate .scroll').jScrollPane();

    $('#course-results .users .scroll').jScrollPane();

    $('#audience .scroll').jScrollPane();

    $('#audience .user').live('click', function () {
        $(this).toggleClass('active');
        if ($('#audience .user.active').size()) {
            $('#audience .head .del').fadeIn(150);
        }
        else {
            $('#audience .head .del').fadeOut(150);
        }

    });

    $('.messages #audience .user').live('click', function () {
        $(this).removeClass('active');

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


    $('#course-settings .option label').click(function () {

        if ($(this).find('input').attr('checked') == 'checked') {

            $(this).addClass('active');
        }
        else {
            $(this).removeClass('active');
        }
    });

    $('#deadline').change(function () {
        if ($(this).attr('checked') == 'checked') {
            $('#date-deadline').fadeIn(300);
        }
        else {
            $('#date-deadline').fadeOut(300);
        }
    });


    $('#course-settings .parameters .radio label').click(function () {
        if (!$(this).is('.active')) {
            $('#course-settings .parameters .radio label').removeClass('active');
            $(this).addClass('active');
        }
    });

    $('.course-users .head .status .choice').click(function () {
        $(this).toggleClass('active');
        $(this).next().fadeToggle(0);
    });

    $('.course-users .head .status .choices li').click(function () {
        $('.course-users .head .status .choices li').removeClass('active');
        var st = $(this).attr('class');
        $(this).addClass('active');
        $(this).parent().fadeToggle(0);
        $('.course-users .head .status .choice span').attr('class', st);
        $('.course-users .head .status .choice').removeClass('active');
    });

    $('.selectbox').selectbox({
        onOpen:function (inst) {

            $('#course_assign').prepend('<div class="a-hover"></div>');
        },
        onClose:function (inst) {
            $('.a-hover').remove();
        }
    });

    $('#course-settings .parameters.post li li').click(function () {
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

    $('#course-settings .parameters input').change(function () {
        $('#course-settings a.save').addClass('active');
    });


    $('#audience .user.messages .ac_bg').click(function () {
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
                $('.user-group .user').hide(0);
                $('.user-group .user').each(function () {
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

    $('.yet').click(function () {
        $(this).parent().find('.expand').fadeToggle(0);
        return false;
    });

    $('.cover').live('click', function () {
        $(this).parent().find('.expand').fadeOut(0);
        $(this).parent().find('.pops').fadeOut(0);
        $('.cover').remove();
    });

//    $('.pops .scroll').jScrollPane();

    $('#course_assign h2 span a').click(function () {
        var pop = $(this).parent().find('.pops');
        $('.pops').fadeOut(0);
        if (pop.css('display') == 'none') {
            pop.fadeIn(0);
            $('#course_assign').prepend('<div class="cover"></div>');

            var max = pop.find('ul').outerWidth();
            pop.css('width', (max + 40) + 'px');
            if (pop.find('ul').height() < 210) {
                pop.find('.scroll').css('height', (pop.find('ul').height()) + 'px');
            }
            $('.pops .scroll').jScrollPane();

        }
        else {
            pop.fadeOut(0);
        }
        return false;
    });


    $('.fancy').fancybox();
});

