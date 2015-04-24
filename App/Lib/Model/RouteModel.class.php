<?php
class RouteModel extends Model{
	
	
	public function __construct(){
		parent::__construct();
	}
	
	public function getRoute($city, $minPrice, $maxPrice, $day, $orderBy='hotness', $sort='desc'){
		$where = array(
			'sname' => $city,
			'sumPrice' => array(array('EGT',$minPrice), array('ELT', $maxPrice)),
		);
		if($day != '-1'){
			$where['maxDay'] = $day;
		}
		return $this->where($where)->order($orderBy.' '.$sort)->select();
	}
	
} 

