
// 百度地图API功能
var oMap = {
    sTemplate: '',
    sTemplate2:'',
    sTemplate3:'',
	map:null,
    color:['red','blue','green', 'yellow', 'purple','black', '#626262'],

	init:function(){
		this.map = new BMap.Map("j-allmap");
		//添加标注
		this.sTemplate ="<div class='clearfix m-unit'><div class='m-detail'>"+
                "<h3>{sname}<span class='price'>价格：{price} 元</span></h3> "+
                "<p class='intro'>{moreDesc}</p><h4>酒店</h4>";
        this.sTemplate2 ="<p><span>{hotelName}</span><span>价格：{price} 元</span></p><p><span>电话：{phone}</span></p>";
        this.sTemplate3 ="</div><img style='float:right;margin:4px' id='imgDemo' src='http://127.0.0.1/travel/index.php/Index/readImg?url={fullUrl}'/></div>";
		//启用滚轮放大缩小
		this.map.enableScrollWheelZoom();    
		this.map.enableContinuousZoom();
        var topLeftNavigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
        this.map.addControl(topLeftNavigation);
    },

    setCenter: function(point){
        this.map.centerAndZoom(point, 11);
    },

    /**
     * 添加标记
     * @param marker
     * @param sContent
     * @param isBounced
     */
    addMarker: function (marker, sContent, isBounced) {
        var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象
        this.map.addOverlay(marker);
        //跳跃点
        if(isBounced){
            marker.setAnimation(BMAP_ANIMATION_BOUNCE);
        }
        marker.addEventListener("click", function () {
            this.openInfoWindow(infoWindow);
            //图片加载完毕重绘infowindow
            document.getElementById('imgDemo').onload = function () {
                infoWindow.redraw();   //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
            }
        });
    },
    /**
     *
     * @param pointArr
     * @param color eg:red
     */
	addPoint:function(pointArr, color){
		var polyline = new BMap.Polyline(
		pointArr,
		{strokeColor:color, strokeWeight:4, strokeOpacity:1});
		this.map.addOverlay(polyline);		
	},
	addLabel:function(pointArr,sContent, isBounced){
		for(var i = 0;i<pointArr.length;i++){
			this.addMarker(new BMap.Marker(pointArr[i]),sContent[i], isBounced);
		}
	},
    removeOverlays: function(){
        this.map.clearOverlays()
    }
};

function getMap2(url){
    // url: "/travel/traveldata/panyu_0_33a24682e1775bc6d5a81ae33834721.json", 
    $.ajax({
         type: "GET",
         url:url,
         dataType: "json",
         error:function(data){
            debug(3333333333333);
         },
         success: function(data){
            var pointArr = [];
            var scontent = [];
            var len = data.sceneryList.length;
            var mid = parseInt(len/2);
            var midPoint =  new BMap.Point(data.sceneryList[mid].lng,data.sceneryList[mid].lat);
            oMap.init(midPoint);
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





