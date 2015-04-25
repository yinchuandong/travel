<?php
class IndexAction extends Action {
	
	public function index(){
		header("Location:".U('Index/search').'?key=广州&day=3&price=500-1000');
    }
    
	public function search(){
    	$city = $this->_get('key');
    	$price = $this->_get('price');
    	$day = $this->_get('day');
    	$orderby = $this->_get('orderby');
    	$sort = $this->_get('sort');

    	if($city == ''){
    		$this->assign('title', '路线搜索');
    		$this->display('Home:Index:search');
    		return;
    	}
    	
    	if (empty($orderby)) {
    		$orderby = 'hotness';
    	}
    	if ($sort != 'asc') {
    		$sort = 'desc';
    	}
    	 
    	$minPrice = '0';
    	$maxPrice = '20000';
    	if($price != '-1'){
    		$priceArr = explode('-', $price);
    		if (count($priceArr) == 2){
    			$minPrice = $priceArr[0];
    			$maxPrice = $priceArr[1];
    		}
    	}
    	
    	if (empty($day)) {
    		$day = 3;
    	}
    	
    	$model = new RouteModel();
    	$routeList = $model->getRoute($city, $minPrice, $maxPrice, $day, $orderby, $sort);
    	
    	$len = count($routeList);
    	if($len > 0){
    		for($i = 0; $i < $len; $i++){
    			$routeList[$i]['arrange'] = json_decode($routeList[$i]['arrange'], true);
    		}
    	}else{
    		import('ORG.HttpUtil');
    		$url = "http://127.0.0.1:8080/Traveljsp/search.jsp?";
    		$url .= "key=$city&minPrice=$minPrice&maxPrice=$maxPrice&day=$day&orderby=$orderby&sort=$sort";
    		$util = new HttpUtil($url);
    		$resultJson = json_decode($util->getContent(), true);
    		$routeList = $resultJson['data'];
//     		var_dump($routeList);
//     		die;
    	}
    	
    	$this->assign('routeList', $routeList);
    	$this->assign('title', '路线搜索');   	
    	$this->display('Home:Index:search');
    }
    
    public function route(){
    	$routeFile = $this->_get("route");
    	if($routeFile == ''){
    		$routeFile = 'guangzhou/3_0_96f564316ba8ffd5edcbf6fdd8fc5d3.json';
    	}
    	$this->assign('title', '路线详情');
    	$this->assign('routeFile', $routeFile);
    	$this->display('Home:Index:route');
    }

    public function suggest(){
    	import('ORG.HttpUtil');
    	$key = $this->_get('key');
    	$key=urlencode($key);//将关键字编码
    	//去除输入法生成的标点符号
    	$key=preg_replace('/(%7E|%60|%21|%40|%23|%24|%25|%5E|%26|%27|%2A|%28|%29|%2B|%7C|%5C|%3D|\-|_|%5B|%5D|%7D|%7B|%3B|%22|%3A|%3F|%3E|%3C|%2C|\.|%2F|%A3%BF|%A1%B7|%A1%B6|%A1%A2|%A1%A3|%A3%AC|%7D|%A1%B0|%A3%BA|%A3%BB|%A1%AE|%A1%AF|%A1%B1|%A3%FC|%A3%BD|%A1%AA|%A3%A9|%A3%A8|%A1%AD|%A3%A4|%A1%A4|%A3%A1|%E3%80%82|%EF%BC%81|%EF%BC%8C|%EF%BC%9B|%EF%BC%9F|%EF%BC%9A|%E3%80%81|%E2%80%A6%E2%80%A6|%E2%80%9D|%E2%80%9C|%E2%80%98|%E2%80%99)+/','',$key);
    	$key=urldecode($key);//将过滤后的关键字解码
    	$httpUtil = new HttpUtil('http://127.0.0.1:8080/Traveljsp/suggest.jsp?key='.$key);
    	$data = $httpUtil->getContent();
		echo $data;
    }
    
    /**
     * 城市详情页
     */
    public function place(){
    	$surl = $_GET['surl'];
//     	$city = D('Scenery')->where()->find();
		$fileName = $surl.'-1.json';
		$city = file_get_contents('E:\\traveldata\\webAll-unicode\\'.$fileName);
		$city = json_decode($city, true);		
    	$this->assign('city',$city);
    	$this->display('Home:Index:place');
    }
        
    public function searchRoute(){
    	$city = $this->_get('key');
    	$price = $this->_get('price');
    	$day = $this->_get('day');
    	$orderby = $this->_get('orderby');
    	$sort = $this->_get('sort');
    	if (empty($orderby)) {
    		$orderby = 'hotness';
    	}
    	if ($sort != 'asc') {
    		$sort = 'desc';
    	}
    	
    	$priceArr = explode('-', $price);
    	if (count($priceArr) == 2){
    		$downPrice = $priceArr[0];
    		$upPrice = $priceArr[1];
    	}else{
    		$downPrice = 300;
    		$upPrice = 500;
    	}
    	
    	if (empty($day)) {
    		$day = 3;
    	}
    	$model = new RouteModel();
//     	$city='广州';
//     	$downPrice=200;
//     	$upPrice=300;
//     	$day=3;
    	$routeList = $model->getRoute($city, $downPrice, $upPrice, $day, $orderby, $sort);
    	var_dump($routeList);
    	die;
    	$this->assign('routeList', $routeList);
//     	var_dump($routeList);
    	$this->display('Home:Index:routeResult');
    }
    
    public function getJson(){
    	$upday = $this->_get('up_day');
    	$filename = $this->_get('json_name');
    	$content = file_get_contents('E:\\traveldata\\'.$filename);
    	echo $content;
    }
    
    public function readImg(){
    	$url = $this->_get('url');
//         $url = 'http://t11.baidu.com/it/u=2426557693,2933321208&fm=22';
        // $url = 'http://t10.baidu.com/it/u=3402970269,3148529503&fm=22';
//     	$url = 'http://e.hiphotos.baidu.com/lvpics/w%3D300/sign=a3787158a9ec8a13141a51e0c7029157/242dd42a2834349bf76f3b32c9ea15ce36d3be18.jpg';
// 		$url = 'http://127.0.0.1/travel/Public/images/1.jpg';
//     	ob_clean();
		header('Content-Type:image/jpeg');
    	$hander = curl_init($url);
//     	curl_setopt($hander,CURLOPT_HEADER,1);
		// curl_setopt($hander, CURLOPT_REFERER, 'http://lvyou.baidu.com');
        curl_setopt($hander, CURLOPT_REFERER, 'http://lvyou.baidu.com/scene/poi/hotel?surl=guangzhoubaiyunshan&place_uid=7e59d0e671c8e823ca1b955a');
    	curl_setopt($hander, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36');
    	curl_setopt($hander, CURLOPT_FOLLOWLOCATION,1);
    	curl_setopt($hander, CURLOPT_RETURNTRANSFER,false);//以数据流的方式返回数据,当为false是直接显示出来
    	curl_setopt($hander, CURLOPT_TIMEOUT,60);
    	$content = curl_exec($hander);
//     	var_dump($content);
    	curl_close($hander);
    }
    
    
    
    
    
    
    
    
    
}
