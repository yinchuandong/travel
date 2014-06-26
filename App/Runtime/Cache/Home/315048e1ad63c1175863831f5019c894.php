<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html><html><head><title>搜索引擎</title><meta http-equiv="Content-Type" content="text/html; charset=gbk" /><meta name="viewport"  content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0" /><link rel="stylesheet" href="__CSS__/reset.css" /><link rel="stylesheet" href="__CSS__/layout.css" /><script type="text/javascript" src="__JS__/jquery.js"></script><script type="text/javascript" src="__JS__/util.js"></script><script type="text/javascript" src="__JS__/lazyload.js"></script></head><script type="text/javascript">window.onload = function(){
	$('.lazy').lazyload({"threshold":0});
}
$(document).ready(function(){
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
		$("#search-form").submit();
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
</script><div class="wrapper"><div class="container"><div class="topSearch"><form id="search-form" action="<?php echo U('Index/search');?>" method="get"><input type="text" id="search-text" name="key"  laceholder="示例" autocomplete="off" class="inputText"/><a href="#"  id="search-city" class="btn">搜景点</a><a href="#" class="btn">搜路线</a><ul id="tips-ul" class="tips-dialog"></ul><div class="clear"></div></form></div><div class="place"><h2>搜索结果</h2><?php if(is_array($resultArr)): $i = 0; $__LIST__ = $resultArr;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$row): $mod = ($i % 2 );++$i;?><div class="p-unit"><div class="p-title"><?php echo ($row["ambiguity_sname"]); ?></div><img data-original="<?php echo U('Index/readImg');?>?url=<?php echo ($row["full_url"]); ?>" alt="" class="lazy" src="__IMG__/grey.jpg" width="207" height="134"><div class="p-detail"><p><a href="#" class='p-intro'><?php echo ($row["more_desc"]); ?></a></p></div><div class="clear"></div></div><?php endforeach; endif; else: echo "" ;endif; ?></div></div></div><?php if(is_array($data)): $i = 0; $__LIST__ = $data;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$row): $mod = ($i % 2 );++$i;?><p><?php echo ($row["sid"]); ?>--<?php echo ($row["ambiguitySname"]); ?></p><?php endforeach; endif; else: echo "" ;endif; if(is_array($arr)): $i = 0; $__LIST__ = $arr;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$row): $mod = ($i % 2 );++$i;?><p><?php echo ($row["sid"]); ?>--<?php echo ($row["ambiguity_sname"]); ?>--<?php echo ($row["view_count"]); ?></p><?php endforeach; endif; else: echo "" ;endif; ?></body></html>