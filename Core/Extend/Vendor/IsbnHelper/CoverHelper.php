<?php
class CoverHelper{
	
	/**
	 * 通过isbn获得封面
	 * @param String $isbn
	 */
	public function getBookByIsbn($isbn){
		
		$searchUrl = 'http://book.douban.com/subject_search?search_text='.$isbn.'&cat=1001';
		$content = file_get_contents($searchUrl);
		
		$pattern = '/<li class=\"subject-item\">(.|\n)*?<img(.)*src=\"(.*?)\"(.|\n)*?<a href=\"(.*?)\"(.|\n)*?<div class=\"(.*)\">(.|\n)*?\/(.*)/i';
		if(preg_match($pattern, $content, $match)){
			$info = explode('/', trim($match[9]));
			$info = array_reverse($info);
			$result = array(
					'cover'=>$match[3],
					'url'=>$match[5],
					'price'=>$info[0],
					'publishYear'=>$info[1],
					'publisher'=>$info[2]	
			);
			
			return $result;
		}else{
			return null;
		}
		
	}
	
	/**
	 * 通过title获得封面
	 * @param String $isbn
	 */
	public function getBookByTitle($title){
	
		$searchUrl = 'http://book.douban.com/subject_search?search_text='.$title.'&cat=1001';
		$content = file_get_contents($searchUrl);
	
		$pattern = '/<li class=\"subject-item\">(.|\n)*?<img(.)*src=\"(.*?)\"(.|\n)*?<a href=\"(.*?)\"(.|\n)*?<div class=\"(.*)\">(.|\n)*?\/(.*)/i';
		if(preg_match($pattern, $content, $match)){
			$info = explode('/', trim($match[9]));
			$info = array_reverse($info);
			$result = array(
					'cover'=>$match[3],
					'url'=>$match[5],
					'price'=>$info[0],
					'publishYear'=>$info[1],
					'publisher'=>$info[2]
			);
				
			return $result;
		}else{
			return null;
		}
	
	}

}