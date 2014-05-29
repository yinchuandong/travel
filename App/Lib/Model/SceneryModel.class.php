<?php
class SceneryModel extends Model{
	
	
	public function __construct(){
		parent::__construct();
	}
	
	public function getSceneryList($sidArr){
		$result = array();
		foreach ($sidArr as $sid){
			$where = array('sid' => $sid);
			$row = $this->where($where)->find();
			$result[] = $row;
		}
		return $result;
	}
	
} 

