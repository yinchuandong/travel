<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html><html><head><title>景点详情</title><meta http-equiv="Content-Type" content="text/html; charset=gbk" /><link rel="stylesheet" href="__CSS__/reset.css" /><link rel="stylesheet" href="__CSS__/layout.css" /><link rel="stylesheet" href="__CSS__/skitter.styles.css" /><script type="text/javascript" src="__JS__/jquery.js"></script><script type="text/javascript" src="__JS__/util.js"></script><script type="text/javascript" src="__JS__/jquery.easing.1.3.js"></script><script type="text/javascript" src="__JS__/jquery.skitter.js"></script><script type="text/javascript" src="__JS__/lazyload.js"></script><script type="text/javascript" language="javascript">            $(document).ready(function() {
                $('.box_skitter_large').skitter({
                    theme: 'clean',
                    numbers_align: 'center',
                    progressbar: true, 
                    dots: true, 
                    preview: true
                });
            });
        </script></head><body><div class="wrapper"><header><div class="container"><h1><?php echo ($city["data"]["sname"]); ?></h1><p><?php echo ($city["data"]["ext"]["more_desc"]); ?></p></div></header><div class="main"><div class="container"><div class="box_skitter box_skitter_large"><ul><li><a href="#cube"><img src="__IMG__/example/001.jpg" class="cube" /></a><div class="label_text"><p>cube</p></div></li><li><a href="#cubeRandom"><img src="__IMG__//example/002.jpg" class="cubeRandom" /></a><div class="label_text"><p>cubeRandom</p></div></li><li><a href="#block"><img src="__IMG__//example/003.jpg" class="block" /></a><div class="label_text"><p>block</p></div></li><li><a href="#cubeStop"><img src="__IMG__//example/004.jpg" class="cubeStop" /></a><div class="label_text"><p>cubeStop</p></div></li></ul></div><h2>1、交通</h2><div class="unit"><!--                desc--><p><?php echo ($city["data"]["content"]["traffic"]["desc"]); ?></p></div><h2>2、饮食</h2><p><?php echo ($city["data"]["content"]["dining"]["desc"]); ?></p><h2>3、娱乐</h2><p><?php echo ($city["data"]["content"]["entertainment"]["desc"]); ?></p><h2>4、购物</h2><p><?php echo ($city["data"]["content"]["shopping"]["desc"]); ?></p></div></div></div></body></html>