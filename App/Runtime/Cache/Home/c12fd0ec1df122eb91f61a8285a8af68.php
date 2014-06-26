<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><link rel="stylesheet" type="text/css" href="__CSS__/reset.css"><link rel="stylesheet" href="__CSS__/layout.css"><script src="__JS__/jquery.js"></script><script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=dDRFWXdUXMKF0UL0UGoD2aeu"></script><script type="text/javascript" src='__JS__/map.js'></script><title>搜索路线</title><script type="text/javascript">$(document).ready(function(){
	$('#search-text').keyup(function(){
		var key = $(this).val();
		if (key == null || key == "") {
			$("#tips-ul").hide();
			return ;
		};
		$("#tips-ul").slideDown();
		console.log(key);
		ajaxGet(key);
	});

	$('#search-city').click(function(e){
		var form = $("#search-form");
		form.attr('action', "<?php echo U('Index/search');?>");
		form.submit();
	});
	
	$('#search-route').click(function(e){
		var form = $("#search-form");
		form.attr('action', "<?php echo U('Index/searchRoute');?>");
		form.submit();
	});

	$(document).keydown(function(e){
		if (e.keyCode == 13) {
			$("#search-form").submit();
		};
	});
});

function ajaxGet(key){
	$.ajax({
		async:false,
		method:'get',
		data:{'key': key},
		url:'<?php echo U("Index/suggest");?>',
		dataType:'json',
		success:function(result){
			console.log(result);
			var data = result.data;
			// console.log(result.info);
			if (data.length > 0) {
				var elemStr = replaceTpl("<li>{word}</li>",data);
				$("#tips-ul").empty();
				$("#tips-ul").append(elemStr);
				bindUlEvent();
			}
		}
	});
}


function bindUlEvent(){
	$("#tips-ul li").unbind("click");
	$("#tips-ul li").bind("click", function(e){
		var key = $(this).text();
		$("#search-text").val(key);
		$("#search-form").submit();
	});
	
}
</script></head><body><div class="wrapper"><div class='block j-block'></div><div class="container"><div class="topSearch"><form id="search-form" action="<?php echo U('Index/search');?>" method="get"><input type="text" id="search-text" name="key" placeholder="示例" autocomplete="off" class="inputText"/><input type="hidden" id="search-day" name="day" value="3" /><input type="hidden" id="search-price" name="price" value="300-600" /><a href="#" id="search-city" class="btn">搜景点</a><a href="#" id="search-route" class="btn">搜路线</a><ul id="tips-ul" class="tips-dialog"></ul></form><div class="clear"></div></div><div id="condition"><h3>筛选条件</h3><p class='j-day'><span>天数： </span><a href="#">3天</a><a href="#">4天</a><a href="#">5天</a></p><p class='j-price'><span>价格： </span><a href="#">0-300</a><a href="#">300-600</a><a href="#">600-900</a><a href="#">900-1200</a><a href="#">1200以上</a></p></div><div class="routediv"><h2>搜索结果</h2><p class='sort'><span>排序：</span><a href="#">热度</a><a href="#">价格</a><a href="#">距离</a></p><?php if(is_array($routeList)): $i = 0; $__LIST__ = $routeList;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$row): $mod = ($i % 2 );++$i;?><div class="r-unit clearfix j-unit" sid="<?php echo ($row["uid"]); ?>" surl="<?php echo ($row["surl"]); ?>"><div class="title"><?php echo ($row["sname"]); ?></div><img src="__IMG__/1.jpg" alt="" class='pic'><div class="detail"><p><?php $desc = $row['route_desc']; $lastIndex = strripos($desc, '|'); $len = mb_strlen($desc); if($lastIndex == $len - 1){ $desc = mb_substr($desc, 0, $len - 1); } $destination = split('[,|]', $desc); $destination = array_unique($destination); ?><a href="#" class='route  j-route' alt="<?php echo ($row["route_desc"]); ?>"><?php if(is_array($destination)): $i = 0; $__LIST__ = $destination;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$dest): $mod = ($i % 2 );++$i;?><span><?php echo ($dest); ?></span>--><?php endforeach; endif; else: echo "" ;endif; ?></a></p><p>天数：<span><?php echo ($row["visit_day"]); ?>天</span></p><p>价格：<span><?php echo ($row["sum_price"]); ?>元</span></p><p>距离：<span><?php echo $row['distance'] / 1000; ?>km</span></p><p>热度：<span><?php echo ($row["view_count"]); ?></span></p></div><div class="clear"></div></div><?php endforeach; endif; else: echo "" ;endif; ?><div class='map j-map'><p><img src="__IMG__/delete_on.png" class='j-delete'></p><div id="j-allmap" style='width: 960px;height: 700px;overflow: hidden;'></div></div></div></div></div></body></html>