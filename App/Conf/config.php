<?php
return array(
	//'配置项'=>'配置值'	
 	// 'APP_DEBUG'             => true,        // 开启调试模式
 	// 'APP_STATUS'			=> 'debug',
	'DB_TYPE'               => 'mysql',     // 数据库类型
	'DB_HOST'               => '127.0.0.1', // 服务器地址
	'DB_NAME'               => 'traveldata',      // 数据库名
	'DB_USER'               => '123',      // 用户名
	'DB_PWD'                => '123',          // 密码
	'DB_PORT'               => '3306',        // 端口
	'DB_PREFIX'             => 't_',
	'SESSION_AUTO_START' =>true,
    'APP_AUTOLOAD_PATH'=>'@.TagLib,@.ORG',
    'TOKEN_ON'  => false,
    'URL_ROUTER_ON' => true,
    'SHOW_PAGE_TRACE'=>false,

	'OUTPUT_ENCODE'=>false,	//导出excel表格时避免错误
	
    'APP_GROUP_LIST'        => 'Home',      // 项目分组设定,多个组之间用逗号分隔,例如'Home,Admin'
	'DEFAULT_GROUP'         => 'Home',  // 默认分组
	
 	/* 资源路径 */
    'TMPL_PARSE_STRING'     => array(   
        '__CSS__' => __ROOT__.'/Public/css',         // css路径
        '__IMG__' => __ROOT__.'/Public/images',      // 图片路径
        '__JS__' => __ROOT__.'/Public/js',           // js路径
		'__KIND__' => __ROOT__.'/Public/Kindeditor',
        '__UPLOAD__' => __ROOT__.'/Public/uploads',  // 上传文件路径
		'__PLUGIN__' => __ROOT__.'/Public/plugin'
    ),
    
      
    /*文件上传的地址*/
    'UPLOADS_ADDR' => str_replace('\\', '/', dirname((dirname(dirname(__FILE__))))) . '/Public/uploads/',
    // 上传文件目录网站绝对路径
    'UPLOADS' => __ROOT__.'/Public/uploads/',

	/*缓存*/
    'TMPL_CACHE_ON'    => false,
    'HTML_CACHE_ON'   => false,
    'ACTION_CACHE_ON'  => false,
    /*
     * 模板的输出格式
     */
    'TMPL_CONTENT_TYPE'     => 'text/html',
);
?>
