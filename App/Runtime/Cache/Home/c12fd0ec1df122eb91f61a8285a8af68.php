<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><link rel="stylesheet" type="text/css" href="__CSS__/reset.css"><link rel="stylesheet" href="__CSS__/layout.css"><script src="__JS__/jquery.js"></script><title>搜索路线</title></head><body><div class="wrapper"><div class="container"><div class="topSearch"><input type="text" class="inputText"/><a href="#" class="btn">搜景点</a><a href="#" class="btn">搜路线</a><div class="clear"></div></div><div id="condition"><h3>筛选条件</h3><p><span>天数： </span><a href="#">3天</a><a href="#">4天</a><a href="#">5天</a></p><p><span>价格： </span><a href="#">0-300</a><a href="#">300-600</a><a href="#">600-900</a><a href="#">900-1200</a><a href="#">1200以上</a></p></div><div class="place"><h2>搜索结果</h2><p class='sort'><span>排序：</span><a href="#">热度</a><a href="#">价格</a><a href="#">距离</a></p><?php if(is_array($routeList)): $i = 0; $__LIST__ = $routeList;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$row): $mod = ($i % 2 );++$i;?><div class="unit"><div class="title"><?php echo ($row["sname"]); ?></div><img src="__IMG__/1.jpg" alt=""><div class="detail"><p><a href="#" class='route'><span><?php echo ($row["route_desc"]); ?></span></a></p><p>天数：<span><?php echo ($row["visit_day"]); ?>天</span></p><p>价格：<span><?php echo ($row["sum_price"]); ?>元</span></p><p>距离：<span><?php echo $row['sum_price']/1000; ?>km</span></p></div><div class="clear"></div></div><?php endforeach; endif; else: echo "" ;endif; ?></div></div></div></body></html>