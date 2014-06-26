<?php
class IndexAction extends Action {
    public function index(){
    	import("ORG.HttpUtil");
    	$this->display("Home:Index:index");
    	
    }
    
    public function search(){
    	$key = $this->_get("key");
    	$httpUtil = new HttpUtil("http://127.0.0.1:8080/Traveljsp/search.jsp?key=".$key);
    	$result = $httpUtil->getContent();
    	//第二个参数指定为true可以返回一个数组
    	$result = json_decode($result, true);
    	$data = $result["data"];
    	$sidArr = array();
    	foreach ($data as $row){
    		$sidArr[] = $row["sid"];
    	}
    	$model = new SceneryModel();
    	$arr = $model->getSceneryList($sidArr);
    	$this->assign("resultArr", $arr);
    	
    	$this->display("Home:Index:search");
    }

    public function suggest(){
    	$key = $this->_get("key");
    	$httpUtil = new HttpUtil("http://127.0.0.1:8080/Traveljsp/suggest.jsp?key=".$key);
    	$data = $httpUtil->getContent();
		echo $data;
    }
    
    /**
     * 城市详情页
     */
    public function place(){
    	$sid = $this->_get("sid");
    	$city = D('Scenery')->where()->find();
    	$this->assign('city',$city);
    	var_dump($city);
//     	$this->display("Home:Index:place");
    }
    
    public function searchRoute(){
    	$city = $this->_get("city");
    	$price = $this->_get("price");
    	$day = $this->get("day");
    	
    }
    
    public function readImg(){
    	$url = $this->_get("url");
//         $url = 'http://t11.baidu.com/it/u=2426557693,2933321208&fm=22';
        // $url = 'http://t10.baidu.com/it/u=3402970269,3148529503&fm=22';
//     	$url = "http://e.hiphotos.baidu.com/lvpics/w%3D300/sign=a3787158a9ec8a13141a51e0c7029157/242dd42a2834349bf76f3b32c9ea15ce36d3be18.jpg";
// 		$url = "http://127.0.0.1/travel/Public/images/1.jpg";
//     	ob_clean();
		header("Content-Type:image/jpeg");
    	$hander = curl_init($url);
//     	curl_setopt($hander,CURLOPT_HEADER,1);
		// curl_setopt($hander, CURLOPT_REFERER, "http://lvyou.baidu.com");
        curl_setopt($hander, CURLOPT_REFERER, "http://lvyou.baidu.com/scene/poi/hotel?surl=guangzhoubaiyunshan&place_uid=7e59d0e671c8e823ca1b955a");
    	curl_setopt($hander, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36");
    	curl_setopt($hander, CURLOPT_FOLLOWLOCATION,1);
    	curl_setopt($hander, CURLOPT_RETURNTRANSFER,false);//以数据流的方式返回数据,当为false是直接显示出来
    	curl_setopt($hander, CURLOPT_TIMEOUT,60);
    	$content = curl_exec($hander);
//     	var_dump($content);
    	curl_close($hander);
    }
    
    
    
    
    
    
    
    
    
}