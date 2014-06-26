<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html><html><head><title>搜索引擎</title><meta http-equiv="Content-Type" content="text/html; charset=gbk" /><meta name="viewport"  content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0" /><link rel="stylesheet" href="__CSS__/reset.css" /><link rel="stylesheet" href="__CSS__/layout.css" /><script type="text/javascript" src="__JS__/jquery.js"></script><script type="text/javascript" src="__JS__/util.js"></script><script type="text/javascript" src="__JS__/lazyload.js"></script></head><script type="text/javascript">$(document).ready(function(){
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
</script><body><div class="wrapper"><div class="container"><form id="search-form" action="<?php echo U('Index/search');?>" method="get"><div class="search"><input type="text" id="search-text" name="key"  laceholder="示例" autocomplete="off" class="inputText"/><a href="#" class="btn">搜景点</a><a href="#" class="btn">搜路线</a><ul id="tips-ul" class="tips-dialog"></ul></div></form></div></div><div class="serch"></body></html>