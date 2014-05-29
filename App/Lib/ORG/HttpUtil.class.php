<?php

class HttpUtil {
	
	private $url = "";
	
	public function __construct($url){
		$this->url = $url;
	}
	
	public function getContent(){
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $this->url);
		
		ob_start();
		curl_exec($ch);
		$content = ob_get_contents();
		ob_end_clean();
		curl_close($ch);
		return $content;
	}
}

?>