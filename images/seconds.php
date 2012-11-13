<?
//echo 'path="'.$_SERVER['REQUEST_URI'].'"';
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ru">
	<head>
    <? print_meta(); ?>
    <base href="http://meropriyatia.ru/" />
		<link rel="stylesheet" href="/css/default.css" type="text/css" media="all" />
		<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
    <script src="http://code.jquery.com/jquery.min.js"></script>
    <script src="/javas.js" type="text/javascript" language="JavaScript"></script>

		<!--[if lt IE 7]><link rel="stylesheet" type="text/css" href="css/default-ie6.css"><![endif]-->

			<style>
			#smenu {padding-top:0px;}
			.стиль1 {
	font-size: 13px;
	font-weight: bold;
}
            </style>


<script type="text/javascript">
	var _gaq = _gaq || [];
	_gaq.push(['_setAccount', 'UA-7532325-64']);
	
	_gaq.push (['_addOrganic','nova.rambler.ru', 'query']);
	_gaq.push (['_addOrganic','a.ua', 's']);
	_gaq.push (['_addOrganic','akavita.by', 'z']);
	_gaq.push (['_addOrganic','all.by', 'query']);
	_gaq.push (['_addOrganic','aport.ru', 'r']);
	_gaq.push (['_addOrganic','bigmir.net', 'q']);
	_gaq.push (['_addOrganic','gde.ru', 'keywords']);
	_gaq.push (['_addOrganic','gogo.ru', 'q']);
	_gaq.push (['_addOrganic','i.ua', 'q']);
	_gaq.push (['_addOrganic','km.ru', 'sq']);
	_gaq.push (['_addOrganic','liveinternet.ru', 'ask']);
	_gaq.push (['_addOrganic','yandex.ru', 'query']);
	_gaq.push (['_addOrganic','images.yandex.ru', 'text']);
	_gaq.push (['_addOrganic','blogs.yandex.ru', 'text']);
	_gaq.push (['_addOrganic','video.yandex.ru', 'text']);
	_gaq.push (['_addOrganic','go.mail.ru', 'q']);
	_gaq.push (['_addOrganic','mail.ru', 'q']);
	_gaq.push (['_addOrganic','google.com.ua', 'q']);
	_gaq.push (['_addOrganic','images.google.ru', 'q']);
	_gaq.push(['_addOrganic', 'blogsearch.google.ru', 'q', true]);
	_gaq.push (['_addOrganic','meta.ua', 'q']);
	_gaq.push (['_addOrganic','nigma.ru', 's']);
	_gaq.push (['_addOrganic','online.ua', 'q']);
	_gaq.push (['_addOrganic','poisk.ru', 'text']);
	_gaq.push (['_addOrganic','quintura.ru', 'request']);
	_gaq.push (['_addOrganic','rambler.ru', 'words']);
	_gaq.push (['_addOrganic','search.com.ua', 'q']);
	_gaq.push (['_addOrganic','search.ua', 'query']);
	_gaq.push (['_addOrganic','tut.by', 'query']);
	_gaq.push (['_addOrganic','ukr.net', 'search_query']);
	_gaq.push (['_addOrganic','webalta.ru', 'q']);
	_gaq.push(['_addOrganic', 'ru.yahoo.com', 'p']);
	_gaq.push(['_addOrganic', 'search.ukr.net', 'search_query']);
	_gaq.push(['_addOrganic', 'search.qip.ru', 'query']);
	
	_gaq.push(['_trackPageview']);
	
	(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	})();
</script>
	
<meta http-equiv="Content-Type" content="text/html; charset=windows-1251" />
</head>
<body>

		<div id="wrapper">
			<div id="header" style="background: #EB4774 url(img/h/bg-index.jpg);"><img src="img/zaplatka.jpg" style="width:118px; height:16px; z-index:1000; position:absolute; margin-left:841px; top: 32px;" />
			  <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="992" height="83" id="1" align="middle">
                <param name="allowScriptAccess" value="sameDomain" />
                <param name="wmode" value="opaque" />
                <param name="movie" value="http://www.meropriyatie.ru/swf/header.swf" />
			    <param name="quality" value="high" />
			    <param name="bgcolor" value="#ffffff" />
			    <embed src="/swf/header.swf" quality="high" bgcolor="#ffffff" wmode="opaque" width="992" height="83" name="1" align="middle" allowscriptaccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />
</object>
		    <img src="img/495.png" width="200" style="width:200px; height:25px; z-index:1000; position:absolute; margin-left:770px; top: 10px;" />		  </div>
		  <div id="mmenu" style="width: 100%; height: 2px;"></div>

			<div class="nav-container-outer">
			   <img src="img/h/nav-bg-l.png" alt="" class="float-left" />
			   <img src="img/h/nav-bg-r.png" alt="" class="float-right" />
         <? dpmenu(13,'','','cat'); ?>
      <script>
        $('.nav-container-outer ul').attr('id','nav-container').attr('class','nav-container');
        $('.nav-container-outer ul li').each(function(){$(this).find('li:last').addClass('redLine');});
      </script>
			</div>
      <table class="motivation">
        <tr>
         <?
          $cat13=query("SELECT * from catalog_cat_data where cat='1' and active=1 order by sort limit 0,8"); $i=0;
          foreach($cat13 as $key=>$ca){
           $i++;               // (($ca['field5'])?$ca['field5']:'/'.$ca['seo'].'.html')
           echo'<td><a href="http://'.$ca['seo'].'.meropriyatia.ru" style="color:#'.str_replace('#','',$ca['field6']).';"><img src="'.$ca['field4'].'"><span>'.$ca['field1'].'</span></a></td>'.(($i==4)?'</tr><tr>':'');
           }
         ?>
        </tr>
      </table>

<!-- 1232 -->
			<table border="0" id="content">
				<tr>
					<td id="sidebar">
					<!-- webim button generation date: 2011-04-21 version: 5.4.3 --> <a class="webim_button" href="http://meropriyatieru.pro-service.webim.ru/webim/client.php" target="_blank" rel="webim">
<img src="http://meropriyatieru.pro-service.webim.ru/webim/button.php" border="0"/></a>

<script type="text/javascript">
webim = {
accountName: "meropriyatieru",
domain: "meropriyatieru.pro-service.webim.ru"
};
(function () {
var s = document.createElement("script"); s.type = "text/javascript";
 s.src =
"http://meropriyatieru.pro-service.webim.ru/webim/js/button.js";
document.getElementsByTagName("head")[0].appendChild(s);
})();
 </script>
<!-- /webim button -->
						<h2 class="seo_h1">Меню</h2>
            <?
  $sm=$cat;//$row_dbcontent['cat'];
  while ($sm>0&&$sm!=13){
  // echo($sm.",");
  $pc=$sm;
  $sm=get_value('cat','parent','id',$sm);
  }
            if($pc>1){echo'<div class="cmenu">';dpmenu($pc,'','','cat');echo'</div>';} /**/ // message($pc);
            ?>
            <div class="smenu">
            <?
            //   style="background: white url(img/s/bg_smenu_round.jpg) no-repeat; margin-top:40px"    style="margin-top:10px

            dpmenu(53,'',$pc);
            if($cat==1){
            echo'<h2 class="seo_h1">Дополнительные услуги</h2>';
            dpmenu(54);
            }
            ?></div>
						<h1>Новости-репортажи</h1>
            <?
            $news=query("SELECT * from catalog_news_data where active='1' order by field3 DESC limit 0,5");
            foreach($news as $new) if($new['seo']){?>
						<div class="news">
								<span style="text-decoration:none;"><?=substr(smarty_modifier_dat2post($new['field3']),0,-2)?></span>
								<p>
									<a href=<?="/news/{$new['seo']}.html"?>><?="{$new['field1']}"?></a>
								</p>
            </div>
            <?}?>
              <a href="/news.html" id="allnews">Все новости</a>
					</td>
					<td id="main">
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="position:relative; z-index:1000;">
		<tr>
		<td width="190"><h1>Найди и Закажи</h1></td>
		<td><noindex><form name="search" method="GET" action="/searching.html"><span style="width:369px; display:block; background:url(img/search.png) left top no-repeat;">
		<input style="margin:0px; width:268px; padding:4px 5px 0 5px; height:29px; border:none; background:url(img/pole.jpg) left bottom no-repeat;" type="text" name='search' value="" />
		<input name="image" type="image" id="findButton" style=" position:absolute; cursor:pointer; height: 29px; margin-top:3px; margin-left:5px; width:80px;" src="img/ok.jpg" />

        </span>
        </form></noindex></td></tr></table>



<table height="133" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top: 0px;">
    <tbody>
        <tr>
            <td align="left" valign="top">
            <div class=broad></div>
            <?
              if($output_data['caption']) echo'<h1>'.$output_data['caption'].'</h1>';
              if(!$_GET['id']) echo $row_dbcontent['text'];
              if($cat==1&&!$_GET['id']) $row_dbcontent['kod']=false;
              if($row_dbcontent['kod']) include($_SERVER['DOCUMENT_ROOT'].'/'.get_value('modules','path','type',$row_dbcontent['kod']).'.php');
              if($_GET['mode']=='debug')print_r($row_dbcontent);
message($row_dbcontent['kod'].$row_dbcontent['cat']);
            echo'<script>';
            $kod=$row_dbcontent['kod']; $id=$_GET['id']; $op=$cat; $n=0;

            while($op>0){
              $n++;
              if($kod=='catalogcat'){
              $row_catalog=query("SELECT id,cat,seo,field1,field12 from catalog_cat_data where id='".$id."'","0");
                echo"\$('.broad').prepend('<a href=#>".$row_catalog['field1']."</a>');\n";
                //message($op);
                if($row_catalog['field12']){
                  $row_dbcontent['kod']='catalogcat';
                  $id=$row_catalog['field12'];
                }else{

                }
              }elseif($kod=='catalogartist'){
                $row_catalog=query("SELECT id,cat,seo,field1 from catalog_artist_data where id='".$id."'","0");
                echo"\$('.broad').prepend('<a href=#>".$row_catalog['field1']."</a>');\n";
              }
              if($n>10) break;
            }
echo'</script>';
            ?>
            </td>
				</tr>
			</table>


			<div id="footer">
				<div id="counters">

<noindex>

      <!-- Тут раньше всякие счётчики были -->

</noindex>

<p style="font-size: 8pt; font-weight:bold;">г. Москва, набережная Тараса Шевченко, д. 29/24, офис №4</p>
<p><b><u>Тел: (495) 77-161-87;</u></b> E-mail: <a title="Написать письмо" href="mailto:info@meropriyatie.ru">info@meropriyatie.ru</a></p>
				</div>

				<div id="copyright">
					<p>Мероприятие.ру - организация, проведение корпоративных и деловых мероприятий </p>

<p>Содержание этой и других страниц сайта www.meropriyatie.ru является интеллектуальной собственностью компании ООО &#171;Мероприятие.ру&#187; и охраняется Законом об авторском праве. Перепечатка, воспроизведение и распространение в любом объеме информации, размещенной на этой и других страницах, возможна только с согласия <nobr>ООО &#171;Мероприятия.ру&#187;</nobr>
<p><kostyl></p>
</p></p>
				<table cellspacing="0" cellspadding="0" width="100%" border="0" id="mtable" >
        <tr>
          <td align="left">
                    </td>

                    <td align="right">
           <noindex>Cоздание сайтов -   <a rel="nofollow" href="http://2masters.ru" title='Творческое Объединение "2 Мастера"' rel="nofollow">Творческое Объединение "2 Мастера"</a></noindex>
          </td>
                   </tr>
        </table>
				</div>
			</div>
		</div>

	</body>
</html>
