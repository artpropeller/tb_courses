var movedFolder =false;
var movedCurrent=false;
var isCtrl = false;

//---------------------- Функция запрета выделения текста --------------------//
function DisableSelection(){
	// Функция очистки выбора
	function RemoveSelection(){
		if (window.getSelection) {
			window.getSelection().removeAllRanges();
		}
		else if (document.selection && document.selection.clear) {
			document.selection.clear();
		};
	};

	// Запрещаем выделять мышкой
	$("*").bind('mousemove', function(){
		RemoveSelection();
	});
	$("*").bind('mouseup', function(){
		RemoveSelection();
	});
	$("*").bind('mousedown', function(){
		RemoveSelection();
	});
	// Запрещаем выделять клавишами
	$("*").bind('keydown', function(){
		RemoveSelection();
	});
	$("*").bind('keyup', function(){
		RemoveSelection();
	});
}

function EnableSelection()
{
	$("*").unbind('mousemove');
	$("*").unbind('mouseup');
	$("*").unbind('mousedown');
	$("*").unbind('keydown');
	$("*").unbind('keyup');
}

function mouseLayerXY(e)
{
	if (!e) {e = window.event; e.target = e.srcElement}
	var x = 0;
	var y = 0;
	
	if (e.layerX) // Gecko
	{
		x = e.layerX - parseInt(getElementComputedStyle(e.target, "border-left-width"));
		y = e.layerY - parseInt(getElementComputedStyle(e.target, "border-top-width"));
	}
	else if (e.offsetX) // IE, Opera
	{
		x = e.offsetX;
		y = e.offsetY;
	}
	
	return {"x": x, "y": y};
}


function getElementComputedStyle(elem, prop)
{
  if (typeof elem!="object") elem = document.getElementById(elem);
  
  // external stylesheet for Mozilla, Opera 7+ and Safari 1.3+
  if (document.defaultView && document.defaultView.getComputedStyle)
  {
    if (prop.match(/[A-Z]/)) {
        prop = prop.replace(/([A-Z])/g, "-$1").toLowerCase();
    }
    return 
        document.defaultView.getComputedStyle(elem, "").getPropertyValue(prop);
  }
  
  // external stylesheet for Explorer and Opera 9
  if (elem.currentStyle)
  {
    var i;
    while ((i=prop.indexOf("-"))!=-1) {
        prop = prop.substr(0, i) + 
            prop.substr(i+1,1).toUpperCase() + 
            prop.substr(i+2);
    return elem.currentStyle[prop];
  }
  
  return "";
}
}

$(document).ready(function(event) {
	
	//DisableSelection();
	
	$(document).keyup(function(e){if(e.which == 17) isCtrl=false; })
	.keydown(function (e) {if(e.which == 17) isCtrl=true;});
	
/*	$('.folders-list ul li').each(function(i, item){
		var offset = $(item).offset();
		if (offset.top > 300)
			$(item).addClass('current');
	});
*/
	/*$('.folders-list, .folders-list ul li').mousedown(function(e){
		alert($(this).hasClass('folders-list'));
	});
	$('.folders-list, .folders-list ul li').mouseup(function(e){
		alert($(this).hasClass('folders-list'));
	});*/
	
	
	$('#main').mousemove(function(event) {
		$("#movedFolderCursor").css({
			top: event.pageY-60,
			left: event.pageX+20
		});
	}).mousedown(function(e) {
		movedFolder =false; movedCurrent=false;
		$('#main').removeClass('movedNow').removeClass('movedFolder');
		$('.drop-page .folders-list ul > li.current').removeClass('current');
		$('#movedFolderCursor em').remove();
	}).mouseup(function(e) {
		movedCurrent=false;
		$('#main').removeClass('movedNow');
	});
	
	$('.drop-page .folders-list ul > li:not(.no-selectable)').mousedown(function(event) {
		event.stopPropagation();
		if(movedFolder)
			movedCurrent = true;
		
		return false;
	}).mousemove(function(event) {
		if(movedCurrent){$('#main').addClass('movedNow');}
	}).mouseup(function(event) {
		movedCurrent=false;
		$('#main').removeClass('movedNow');
		// зажат ctrl и не первый раз
		if(!movedFolder || isCtrl){
			$(this).toggleClass('current');
			
			dn=$('.drop-page .folders-list ul > li.current').size();
			$("#currentFolders").text(dn);
			type = $(this).find('.folder-im span').data('type');
			// достанем картинку перетаскиваемого изображения
			var background = '';
			if (type != 'img-music' && type != 'img-folder')
			{
				background = $(this).find('.folder-im .img-to-bg').css('background-image');
				background = background.replace(/"/g, '');
				var reg = /url\((.+)\)/;
				matches = background.match(reg);
				background = matches[1];
			}
			else if(type == 'img-music')
			{
				background = $(this).find('.folder-im img').attr('src');	
			}
			if(dn){
				movedFolder=true;
				$('#main').addClass('movedFolder');
				//есть уже с таким классом ? 
				/*
				if($('#movedFolderCursor em.'+type).size()){
					if(!$('.drop-page .folders-list ul > li.current span.'+type).size()){
						$('#movedFolderCursor em.'+type).remove();
						$('#movedFolderCursor em').each(function(index, element) {$(element).css('top',10*index).css('left',10*index);});
					}
				}
				//есть нет с таким классом
				else{*/
					nEm=$('#movedFolderCursor em').size()*10;
					//$('#movedFolderCursor').append('<em class="'+type+'" style="top:'+nEm+'px; left:'+nEm+'px"/>');
					$('#movedFolderCursor').append('<em class="'+type+'" style="top:'+nEm+'px; left:'+nEm+'px"><span class="image"><img src="' + background + '" width="28" height="28" /></span><span class="bg"></span></em>');
				//}

		}
			else{
				movedFolder=false;
				$('#main').removeClass('movedFolder');
			}
		}
		else{
			// без контрола
			$(this).addClass('temp');
			$('.drop-page .folders-list ul > li.current:not(.temp)').removeClass('current');
			$(this).toggleClass('current').removeClass('temp');
					
			dn=1;
			$('#movedFolderCursor em').remove();
			if($(this).hasClass('current')){			
				$("#currentFolders").text(dn);
				type = $(this).find('.folder-im span').data('type');
				var background = '';
				if (type != 'img-music' && type != 'img-folder')
				{
					background = $(this).find('.folder-im .img-to-bg').css('background-image');
					background = background.replace(/"/g, '');
					var reg = /url\((.+)\)/;
					matches = background.match(reg);
					background = matches[1];
				}
				else if(type == 'img-music')
				{
					background = $(this).find('.folder-im img').attr('src');	
				}
				movedFolder=true;
				//$('#movedFolderCursor').append('<em class="'+type+'" style="top:0; left:0;"/>');
				$('#movedFolderCursor').append('<em class="'+type+'" style="top:0; left:0;"><span class="image"><img src="' + background + '" width="28" height="28" /></span><span class="bg"></span></em>');
			}
			else{
				movedFolder =false;

				$('#main').removeClass('movedFolder');
				$('.drop-page .folders-list ul > li.current').removeClass('current');
				$('#movedFolderCursor em').remove();
			}
		}
	});
	
	$('.drop-page .folders-list ul > li:not(.no-selectable) .folder-navi a').mousedown(function(event) {
		event.stopPropagation();
		if(movedFolder) return false;
	});
	$('.file-list-inner ul.no_mark li a').mouseup(function(event) {
		if(movedCurrent){
			$('.drop-page .folders-list ul > li.current').fadeOut(150);
			setTimeout(function(){
				$('.drop-page .folders-list ul > li.current').remove();
				$('#movedFolderCursor em').remove();
				movedCurrent=false;
				movedFolder=false;
				$('#main').removeClass('movedFolder').removeClass('movedNow');
			},100);
		}
	});
	
	
});