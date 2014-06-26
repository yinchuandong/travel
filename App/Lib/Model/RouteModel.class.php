<?php
class RouteModel extends Model{
	
	
	public function __construct(){
		parent::__construct();
	}
	
	public function getRoute($city, $downPrice, $upPrice, $day){
		$where = array(
			"sname" => $city,
			"price" => array(array('EGT',$downPrice), array('ELT', $upPrice)),
			"upDay" => $day
		);
	}
	
} 

