
// 百度地图API功能
var oMap = {
	map:null,
	addMarker:function(point,sContent){
		var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象
		var marker = new BMap.Marker(point);
		this.map.addOverlay(marker);
		marker.addEventListener("click", function(){          
		this.openInfoWindow(infoWindow);
		//图片加载完毕重绘infowindow
		document.getElementById('imgDemo').onload = function (){
		   infoWindow.redraw();   //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
		}
		});
	},
	init:function(){	
		this.map = new BMap.Map("j-allmap");
		//添加标注
		this.sTemplate ="<div class='clearfix unit'><div class='detail'>"+
                "<h3>{sname}<span class='price'>价格：{price} 元</span></h3> "+
                "<p class='intro'>{moreDesc}</p><h4>酒店</h4>";
        this.sTemplate2 ="<p><span>{hotelName}</span><span>价格：{price} 元</span></p><p><span>电话：{phone}</span></p>";
        this.sTemplate3 ="</div><img style='float:right;margin:4px' id='imgDemo' src='http://192.168.233.21/travel/index.php/Index/readImg?url={fullUrl}' title='天安门'/></div>";
		var point = new BMap.Point(113.981325,22.542315);
        
		this.map.centerAndZoom(point, 12);
		//启用滚轮放大缩小
		this.map.enableScrollWheelZoom();    
		this.map.enableContinuousZoom();
	},
	addPoint:function(pointArr){
		var polyline = new BMap.Polyline(
		pointArr,
		{strokeColor:"red", strokeWeight:6, strokeOpacity:1});
		this.map.addOverlay(polyline);		
	},
	addLabel:function(pointArr,sContent){
		var bounds = this.map.getBounds();
		for(var i = 0;i<pointArr.length;i++){
			this.addMarker(pointArr[i],sContent[i]);
		}
	}
}
function getMap(){
    $.ajax({
         type: "GET",
         url: "/travel/traveldata/panyu_0_33a24682e1775bc6d5a81ae33834721.json",
         dataType: "json",
         error:function(data){
            debug(3333333333333);
         },
         success: function(data){
            var pointArr = [];
            var scontent = [];
            var len = data.sceneryList.length;
             oMap.init();
            for(var i=0;i<len;i++){
                var point = new BMap.Point(data.sceneryList[i].lng,data.sceneryList[i].lat);
                var desc = data.sceneryList[i].moreDesc;
                desc = desc.substring(0,desc.indexOf("。") + 1);
                data.sceneryList[i].moreDesc = desc;
                var content = replaceTpl(oMap.sTemplate,[data.sceneryList[i]]);
                var hotel = replaceTpl(oMap.sTemplate2,data.sceneryList[i].recommendHotel);
                var img = replaceTpl(oMap.sTemplate3,[data.sceneryList[i]]);
                var div = content+hotel+img;
                pointArr.push(point);
                scontent.push(div);
            }
            oMap.addPoint(pointArr);
            oMap.addLabel(pointArr,scontent);
         }
     });
}
$(document).ready(function(){
    $('.j-unit').each(function(i,cont){
        $(cont).find('.j-route').click(function(event) {
            console.log(3);
            $('#j-allmap').show();
            getMap();
        });
    });
});


function replaceTpl (template, data) {
    var outPrint = "";
    for (var i = 0; i < data.length; i++) {
        var matchs = template.match(/\{[a-zA-Z0-9_]+\}/gi);
        var temp = "";
        for (var j = 0; j < matchs.length; j++) {
            if (temp == "") temp = template;                                                                                                        
            var re_match = matchs[j].replace(/[\{\}]/gi, "");
            temp = temp.replace(matchs[j], data[i][re_match]);
        }
        outPrint += temp;
    }
    return outPrint;
}
function debug(info){
    console.log(info);
}





