<?php
class RouteModel extends Model{
	
	
	public function __construct(){
		parent::__construct();
	}
	
	public function getRoute($city, $downPrice, $upPrice, $day, $orderBy='hotness', $sort='desc'){
		$where = array(
			'sname' => $city,
			'sumPrice' => array(array('EGT',$downPrice), array('ELT', $upPrice)),
		);
		if($day != '-1'){
			$where['maxDay'] = $day;
		}
		return $this->where($where)->order($orderBy.' '.$sort)->select();
	}
	
} 

