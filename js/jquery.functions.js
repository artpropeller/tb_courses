var resize_folders_list_container = true;
var api3;
var show_file_name_popup = false;
$(document).ready(function (e) {

    setTimeout(function () {
//		resizeFilesListContainer();
    }, 1000);

    // ------- Создание новой папки -------
    $('.add-new-folder-link').click(function () {
        var offset = $(this).offset();
        var width = $('.new-folder-popup').width();
        $('.new-folder-popup').css({'top':offset.top + 28, 'left':offset.left - width / 2 + 10}).show();
    });

    $('.new-folder-popup .create-new-folder-link').click(function () {
        var folder_name = $('.new-folder-popup input[name="folder_name"]').val();
        $('.new-folder-popup').hide();
        alert('Создать папку с названием "' + folder_name + '"');
        $('.new-folder-popup input[name="folder_name"]').val('');
    });

    $('*').mousedown(function (e) {
        if (!$(e.target).closest('.new-folder-popup').length) {
            $('.new-folder-popup').hide();
            $('.new-folder-popup input[name="folder_name"]').val('');
        }

        if (!$(e.target).closest('.file-line').length) {
            $('.file-list-inner ul li div.file-line').removeClass('do-edit');
        }
    });
    // ------- .Создание новой папки -------

    // ------- Редактирование папки -------
    $('.file-line input').keypress(function (e) {
        _this = $(this);
        if (e.which == 13) {
            var text = _this.val();
            _this.closest('.file-line').find('.section-name').text(text);
            _this.closest('.file-line').removeClass('do-edit');
        }
    });
    // ------- /Редактирование папки -------

    // ------- Кнопка "Загрузить" -------
    $('.btn-download').mouseover(function () {
        var parent = $(this).parents(".download-container");
        parent.find('.upload-options').show();
    });

    $('.download-container').bind('mouseleave', function () {
        $('.upload-options').hide();
    });
    // ------- .Кнопка "Загрузить" -------

    // ------- Типы загруженных файлов -------
    $('.file-type-dropdown-container .selected-item').mouseover(function () {
        $('.file-type-dropdown-container .file-type-dropdown').show();
    });
    $('.file-type-dropdown-container').bind('mouseleave', function () {
        $('.file-type-dropdown-container .file-type-dropdown').hide();
    });
    $('.file-type-dropdown-container .file-type-dropdown li a').click(function () {
        var _this = $(this);
        var img = _this.closest('li').find('div').html();
        $('.file-type-dropdown-container .selected-item span').html(img);
        $('.file-type-dropdown-container .file-type-dropdown li a').removeClass('selected');
        _this.addClass('selected');
    });
    // ------- .Типы загруженных файлов -------

    // ------- Наведение мышкой на строки в таблице файлов -------
    $('.files-list table tr').hover(function () {
        $(this).addClass('hover');
    }, function () {
        $(this).removeClass('hover');
    });
    // ------- .Наведение мышкой на строки в таблице файлов -------

    $('.files-list .buttons .personal-link').click(function () {
        $(this).closest('td').toggleClass('personal');
    });

    $('.files-list td.file-name').mouseover(function () {
        var window_height = $(window).height();
        var full_name = $(this).data('fullName');
        var show_popup = $(this).data('showPopup');
        $('.files-list .file-name-popup .content').html(full_name);
        var offset1 = $(this).offset();
        var offset2 = $('.files-list').offset();
        var h1 = $(this).height();
        var h2 = $('.files-list .file-name-popup').height();
        var t = parseInt($('.files-list .jspPane').css('top'));
        if (full_name && full_name.length && show_popup == 1) {
            show_file_name_popup = true;
            // определим, где выводит попап - сверху или снизу
            if (offset1.top <= window_height / 2) {
                // сверху
                $('.files-list .file-name-popup').css({'top':offset1.top - offset2.top + h1 + 15 - t}).removeClass('bottom').addClass('top');
            }
            else {
                // снизу
                $('.files-list .file-name-popup').css({'top':offset1.top - offset2.top - h2 - t - 4}).removeClass('top').addClass('bottom');
            }
            showFileNamePopup();
        }
    });

    $('.files-list td.file-name').mouseout(function () {
        show_file_name_popup = false;
        $('.files-list .file-name-popup').hide();
    });

    if ($('.progress-block-admin').size()) {
        $('.progress-block-admin').each(function (index, element) {
            b = Number($(element).find('b.progress-total').text());
            bb = new Array();
            aa = new Array();
            for (i = 0; i < 3; i++) {
                sp = $(element).find('span').eq(i);
                n = Number(sp.text());
                sp.width(n * 100 / b + '%').html('');
                bb[i] = n;
                aa[i] = n * 56 / b;
            }


            $(element).append('<div class="progress-detail"><i class="top-info"/><strong>' + b + ' слушателей</strong><table><tr><td>Не начали</td><td style="width:56px;"><span class="progress-unbegin" style="width:' + aa[0] + 'px;"></span></td><td>' + bb[0] + '</td></tr><tr><td>Начали</td><td><span class="progress-begin" style="width:' + aa[1] + 'px;"></span></td><td>' + bb[1] + '</td></tr><tr><td>Закончили</td><td><span class="progress-end" style="width:' + aa[2] + 'px;"></span></td><td>' + bb[2] + '</td></tr></table></div>');
        });
    }


    $('.search-animate input[type=text]').focus(function (e) {
        $(this).parents('.search-animate').addClass('focused');
        $(this).parents('.search-animate').stop(true, false).animate({width:175}).addClass('focus');
    }).blur(function (e) {
            $(this).parents('.search-animate').removeClass('focused');
            $(this).parents('.search-animate').stop(true, false).animate({width:119}).removeClass('focus');
        });
    $('.inner-search input[type=text]').focus(function (e) {
        $(this).parents('.content-block').addClass('hover');
    }).blur(function (e) {
            $(this).parents('.content-block').removeClass('hover');
        });

    /*.blur(function(e){
     $('.search-animate').animate({width:119}).removeClass('focus');
     if($(this).val()=='Поиск по сайту...')$(this).val('');
     });*/


    $('.progress-block').each(function (index, element) {
        $(element).prepend('<b style="width:' + $(element).text() + '"/>');
    });


    if ($('.content-wrapper-column').size()) {
        resHome();
        $(window).resize(function (e) {
            resHome();
        });
    }
    if ($('.file-list').size()) {
        var api;
        var api2;
        var intLoad = setTimeout(function () {
        }, 0);
        setTimeout(function () {
            $('.file-list-inner').jScrollPane();
            api = $('.file-list-inner').data('jsp');
            $('.folders-list').jScrollPane();
            api2 = $('.folders-list').data('jsp');
            resInner(intLoad, api, api2);
        }, 101);
        $(window).resize(function (e) {
            resInner(intLoad, api, api2);
        });
    }


    if ($('.dashed-container').size()) {
        $('.events-list').jScrollPane();
        aa = $('.events-list').data('jsp');
        resOther('.dashed-container', '.events-list');
        if ($('.scrollTo').size()) {
            aa.scrollTo(0, $('.scrollTo').offset().top - 175)
        }
        $(window).resize(function (e) {
            resOther('.dashed-container', '.events-list');
        });
    }

    if ($('.over-left').size()) {
        var ap;
        var ap2;
        var intLoad2 = setTimeout(function () {
        }, 0);
        setTimeout(function () {
            $('.over-left').jScrollPane();
            ap = $('.over-left').data('jsp');
            $('.over-right-inner').jScrollPane();
            ap2 = $('.over-right-inner').data('jsp');
            resInner2(intLoad2, ap, ap2);
        }, 101);
        $(window).resize(function (e) {
            resInner2(intLoad2, ap, ap2);
        });
    }


    if ($('.message-body').size()) {
        $('.message-list').show();
        $('.message-body').jScrollPane();
        $('.message-list').hide();
        apMess = $('.message-body').data('jsp');
        $('.message-body li').click(function (e) {
            if (!$(this).hasClass('active')) {
                $(this).addClass('active').parents('.message-list').addClass('one-mess');
                apMess.reinitialise();
            }
        });
        $('.back-mess').click(function (e) {
            $(this).parents('.message-list').removeClass('one-mess').find('li.active').removeClass('active');
            apMess.reinitialise();
            return false;
        });
        $('.listener').click(function (e) {
            $(this).toggleClass('active');
            if (!$(this).hasClass('active')) {
                $('.message-list').hide();
            }
            else {
                $('.message-list').show();
            }
            l = $(this).offset().left - 150;
            t = $(this).offset().top + 28;
            if (t + 400 > $('#main').height()) {
                $('.message-list').addClass('bott').css('left', l).css('top', 'auto').css('bottom', $('#main').height() - t + 38);
            }
            else {
                $('.message-list').css('left', l).css('top', t).removeClass('bott');
            }
            return false;
        });
    }
    $('.new-styles .file-list-inner ul li ul').each(function (index, element) {
        $(this).before('<i class="marked"/>');
    });
    $('.new-styles .file-list-inner ul li .marked').click(function (e) {
        $(this).parent().toggleClass('active');
        return false;
    });
    $('.file-list-inner ul li a').click(function (e) {
        $('.file-list-inner ul li div.file-line').removeClass('do-edit');
        if ($(this).closest('.file-line').hasClass('active'))
            return false;

        $('.file-list-inner ul li .file-line').removeClass('active');
        $(this).closest('.file-line').addClass('active')
        return false;
    });
    $('.file-list-inner ul li a.edit-section').click(function () {
        $('.file-list-inner ul li div.file-line').removeClass('do-edit');
        $(this).closest('.file-line').addClass('do-edit');
    });
    $('.file-list-inner .delete-section').click(function () {
        $(this).closest('.file-line').removeClass('do-edit');
        alert('Удалить папку');
    });

    // USER PROFILE
    var user_pr = $(".user-pr");
    // margin-top pop-up
    var user_pr_height = user_pr.height();
    var window_height = $(window).height();

    var user_pr_top = (window_height / 2) - (user_pr_height / 2);
    if (user_pr_top < 7) user_pr_top = 7;

    user_pr.css("top", user_pr_top);

    // close pop-up
    user_pr.find(".close").click(function () {
        userPrHideShow("close");
    });

    // open edit pop-up
    user_pr.find(".edit-pr").click(function () {
        user_pr.find(".user-pr-edit").show();
        user_pr.find(".user-pr-preview").hide();
    });

    // show/hide password
    $(".password-eye").click(function () {
        var parent = $(this).parents(".input"),
            el_preview = parent.find(".preview"),
            el_password = parent.find("input[type=password]");

        if (el_preview.is(":visible")) {
            var pass = el_preview.val();
            el_password.val(pass).show();
            el_preview.hide();
            $(this).removeClass("active");
        }
        else {
            var pass = el_password.val();
            el_password.hide();
            el_preview.val(pass).show();
            $(this).addClass("active");
        }
    });

    $(".password input.preview").keypress(function () {
        var parent = $(this).parents(".input"),
            el_password = parent.find("input[type=password]"),
            pass = $(this).val();
        el_password.val(pass);
    });

    $(".type-dropdown .dropdown-list p").click(function () {
        var text = $.trim($(this).text()),
            parent = $(this).parents(".type-dropdown");

        parent.find(".text span").text(text);
    });

    // group list select
    var group_list_hover = false;
    $(".select-group .arrow, .select-group-text").live('click', function () {
//        $(".select-group-list").hide();
//        if (!$(this).is('.active')) {
//            $(".select-group-list").slideUp(500);
        var parent = $(this).parents(".select-group");
        if (parent.find(".select-group-list").is(":visible"))
            parent.find(".select-group-list").slideUp(500);
        else {
            if ($(".select-group-list:visible").size() > 0) {
                $(".select-group-list").slideUp(250, function(){
                parent.find(".select-group-list").slideDown(250);
            });}
            else {
                parent.find(".select-group-list").slideDown(500);
            }
            }
        setTimeout(function () {
            parent.find('.select-group-scroll').jScrollPane({animateScroll:true});

            $('.scroll').addClass('ex');
            $('.scroll').jScrollPane({animateScroll:true});
            scr = $('.scroll.ex').data('jsp');

            var pad = ($('.select-group-list:visible').parents('.user').position().top - scr.getContentPositionY() + ($('.select-group-list:visible').innerHeight() + 34)) - 285;
            if (pad > 0) {
                scr.scrollToY(scr.getContentPositionY() + pad + 20);
            }
        }, 550);
//    }
    });


    $(".select-group").live({'mouseover':function () {
        group_list_hover = true;
    }, 'mouseout':function () {
        group_list_hover = false;
    }});

    $("*").click(function () {
        if (!group_list_hover) {
            $(".select-group-list").slideUp(500);
            setTimeout(function(){
                $('.scroll').removeClass('ex');
                $('.scroll').jScrollPane();
            },550);

        }

    });

    // create new li
    $(".select-group-list .create a").live('click', function () {
        var parent = $(this).parents(".select-group-list"),
            list = parent.find("ul"),
            count = list.find("li").size() + 1;

        var html = '' +
            '<li>' +
            '<a class="edit" href="#"></a><a class="del" href="#"></a>' +
            '<input type="checkbox"/>' +
            '<label class="hidden"><input type="text" class="new_text" /></label>' +
            '</li>';
        list.append(html);
        list.find('input').autoGrowInput({
            comfortZone: 10,
            minWidth: 130,
            maxWidth: 240
        });

        parent.find(".select-group-scroll").jScrollPane({animateScroll:true});
        api_sroll_select = parent.find(".select-group-scroll").data('jsp');
        api_sroll_select.scrollToPercentY("100");
        $(".select-group-list .new_text").focus();
    });

    // save or remove li
    $(".select-group-list .new_text").live("focusout", function () {
        var parent = $(this).parents(".select-group-list li"),
            val = $.trim($(this).val());

        if (val != "") {
            parent.find(".hidden").text(val).removeClass("hidden");
            $(this).remove();
        }
        else
            parent.remove();
        var v = $(this).parents('.select-group-list').find('.select-group-scroll').jScrollPane({animateScroll:true});
        v1 = v.data('jsp');
        v1.scrollToPercentY("100");
    });

    // on press "enter"
    $(".select-group-list .new_text").live("keypress", function (e) {
        if (e.which == 13) {
            var parent = $(this).parents(".select-group-list li"),
                val = $.trim($(this).val());

            if (val != "") {
                parent.find(".hidden").text(val).removeClass("hidden");
                $(this).remove();
            }
            else
                parent.remove();

            var v = $(this).parents('.select-group-list').find('.select-group-scroll').jScrollPane({animateScroll:true});
            v1 = v.data('jsp');
            v1.scrollToPercentY("100");


        }
    });


    // on click "save" btn
    $(".select-group-list .white_btn").live('click', function () {
        var parent = $(this).parents(".select-group-list"),
            select_group = parent.parents(".select-group"),
            list = parent.find("ul"),
            size = list.find("input:checked").size();

        if (size == 1) {
            var text = list.find("input:checked").parents("li").text();
        }
        else if (size > 1) {
            var text = "Находится в " + size + " группах";
        }
        else
            var text = "Группа не выбрана";

        select_group.find(".select-group-text").text(text);
        $(".select-group-list").slideUp(500);
        setTimeout(function(){
            $('.scroll').removeClass('ex');
            $('.scroll').jScrollPane();
        }, 550);
    });
    // --end-- group list select
    //  --END-- USER PROFILE
});

// show/hide user profile pop-up
function userPrHideShow(action) {
    if (action == "close") {
        // если открыто окно редактирования, то закрываем его и показываем окно с информацией
        if ($(".user-pr .user-pr-edit").is(":visible")) {
            $(".user-pr .user-pr-edit").hide();
            $(".user-pr .user-pr-preview").show();
        }
        else
            $(".user-pr, .body-fill").hide();
    }
    else
        $(".user-pr, .body-fill").show();
}

function showFileNamePopup() {
    setTimeout(function () {
        if (show_file_name_popup) {
            $('.files-list .file-name-popup').show();
        }
    }, 500);

}

function recountFileNames() {
    $('.files-list table .file-name').not('.is-loading').each(function () {
        var _this = $(this);
        var name = _this.data('fullName');
        var w = _this.width();
        // примем в среднем, что один символ по ширине занимает 5 пикселей.
        // тогда посмотрим, сколько символов влезет в ячейку при данной ширине
        var count = Math.floor(w / 4);
        var name_to_show = '';
        if (name.length <= count) {
            name_to_show = name;
            _this.data('showPopup', '0').attr('data-show-popup', '0');
        }
        else {
            name_to_show = name.substring(0, count) + '...' + name.substring(name.length - 4, name.length);
            _this.data('showPopup', '1').attr('data-show-popup', '1');
        }
        _this.text(name_to_show);
    });
}

function recountSearchFileNames() {
    $('.files-list .table-search-container table .file-name').each(function () {
        var _this = $(this);
        var name = _this.data('fullName');
        var w = _this.width();
        // примем в среднем, что один символ по ширине занимает 5 пикселей.
        // тогда посмотрим, сколько символов влезет в ячейку при данной ширине
        var count = Math.floor(w / 4);
        var name_to_show = '';
        if (name.length <= count) {
            name_to_show = name;
            _this.data('showPopup', '0').attr('data-show-popup', '0');
        }
        else {
            name_to_show = name.substring(0, count) + '...' + name.substring(name.length - 4, name.length);
            _this.data('showPopup', '1').attr('data-show-popup', '1');
        }
        _this.html(name_to_show);
    });
}

function resOther(d, e) {
    $(d).height($('#main').height() - 170);
    $(e).height($('#main').height() - 245);
    api = $(e).data('jsp');
    api.reinitialise();
}

function resHome() {
    $('#main').width() > 1400 ? $('#main').addClass('wide') : $('#main').removeClass('wide');
    h = $('#main').height();

    if (h > 500) {
        if ($('.wide').size()) {
            $('.content-wrapper-column').height(h - 130);
        }
        else if (!$('.video-home').size()) {
            $('.content-wrapper-column').height(h / 2 - 78);
            $('.first-column').height(h - 130);
        }
        else if ($('.video-home').size()) {
            $('.content-wrapper-column').eq(0).height(h - 130);
            $('.content-wrapper-column').eq(1).height(h * 0.76 - 124);
            $('.content-wrapper-column').eq(2).height(h * 0.20);

        }
    }
}
function resInner(intLoad, api, api2) {
    h = $('#main').height() - 130;
    if (h > 550) {
        $('.inner-content').height(h);
    }
    if (h > 350) {
        clearTimeout(intLoad);
        intLoad = setTimeout(function () {
            if ($('.file-list').size()) {
                t = $('.top-part').height();
                hh = h - $('.file-list').offset().top + 40;
                $('.file-list').height(hh);
                $('.folders-list').height(h - 35);

                if (resize_folders_list_container) {
                    var item_w = Math.floor(($('.content-part').width() - 16) / 181) * 181;
                    /*parseInt($('.folders-list .jspPane>ul>li').width()) +
                     parseInt($('.folders-list .jspPane>ul>li').css('margin-left')) +
                     parseInt($('.folders-list .jspPane>ul>li').css('padding-left')) +
                     parseInt($('.folders-list .jspPane>ul>li').css('padding-right')) + 6;
                     $('.folders-list-container').width(Math.floor($('.folders-list-container').parent().width()/item_w) * item_w);*/
                    $('.folders-list-container').width(item_w + 16)


                    $('.navi-header').width(item_w - 7);
                }
                //console.log(item_w);
                if (api)
                    api.reinitialise();
                if (api2)
                    api2.reinitialise();

                resizeFilesListContainer();
            }
        }, 50)

    }
}
function resInner2(intLoad2, ap, ap2) {
    h = $('#main').height() - 130;
    if (h > 550) {
        $('.inner-content').height(h);
    }
    if (h > 350) {
        clearTimeout(intLoad2);
        intLoad2 = setTimeout(function () {
            if ($('.over-left').size()) {
                t = $('.top-part').height();
                hh = h - $('.over-left').offset().top + 40;
                $('.over-left').height(hh);
                $('.over-right').height(h - 35);
                $('.over-right-inner').height(h - 40);
                if (ap)
                    ap.reinitialise();
                if (ap2)
                    ap2.reinitialise();

                resizeFilesListContainer();
            }
        }, 100)

    }
}