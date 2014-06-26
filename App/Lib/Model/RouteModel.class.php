<?php
class RouteModel extends Model{
	
	
	public function __construct(){
		parent::__construct();
	}
	
	public function getRoute($city, $downPrice, $upPrice, $day, $orderBy='hotness', $sort='desc'){
		$where = array(
			"sname" => $city,
			"price" => array(array('EGT',$downPrice), array('ELT', $upPrice)),
			"up_day" => $day
		);
		$table = $this->table("view_route");
		return $table->where($where)->order($orderBy.' '.$sort)->select();
	}
	
} 

