/**
 * Created by yinchuandong on 15/4/9.
 */

var Route = {
    baseUrl: 'http://127.0.0.1/travel/',
    $processguide: $("#processguide"),
    $items: $("#items"),
    guideTpl: [
        '<h3> <%= item.ambiguitySname  %><%= item.maxDay  %>日游  </h3>',
        '<% for(var i = 0;i<item.arrange.length;i++){ %>',
        '<a href="#day<%= i %>0" class="current-day" alt="<%= i %>"><%= item.arrange[i].curDay %></a>',
        '<% } %>'
    ].join(''),
    routeTpl: [
        '<% for(var i = 0;i<item.length;i++){ %>',
            '<% for(var j = 0;j<item[i].list.length;j++){ %>',
                '<div class="timeitem clearfix" id="day<%= i %><%= j %>">',
                '<img class="time_icon" src="<%= url %>/Public/images/timeline_side.png" alt=""><span class="time_title"><%= item[i].curDay %>:<%= item[i].list[j].ambiguitySname %></span>',
                '<div class="timeitem_content timeitemControl">',
                //'<img src="<%= url %>/Public/images/1.jpg" alt="" class="time_img">',
                '<img src="<%= url %>/index.php/Index/readImg?url=<%= item[i].list[j].fullUrl %>" alt="" class="time_img">',
                '<div class="timeitem_descrition">',
                '<p>前期制作历经两个月的EDDY自导 自演的轻松爆米花剧终于结束了前期 拍摄.在吸取了第零集的失败经验后,初 次拍摄的小团队在前期拍摄中仍然遇到许多困难，庆幸的是他们取得了长足的发展，片源效果也相当不错。</p>',
                '</div>',
                '</div>',
                '</div>',
            '<% } %>',
        '<% } %>'
    ].join(''),
    routeData: null, //ajax请求的异步数据
    init: function (url, $processguide, $items) {
        oMap.init();
        this.$processguide = $processguide;
        this.$items = $items;
        this.adjustMapPos();
        this.getData(url);
    },

    getData: function (url) {
        var self = this;
        var requestUrl = this.baseUrl + url;
        $.ajax({
            url: requestUrl,
            dataType: "json",
            type: "POST",
            success: function (data) {
                self.routeData = data;
                self.renderPage(data);
                self.bindEvent();
                self.arrange(data, 0);
            }

        });
    },

    bindEvent: function () {
        var self = this;
        $("#processguide").find("a.current-day").bind("click", function (e) {
            //console.log($(this).attr("alt"))
            var curDay = parseInt($(this).attr("alt"));
            oMap.removeOverlays();
            self.arrange(self.routeData, curDay);
        })
    },

    arrange: function (data, curDay) {
        //initialize center position
        var clng = 0, clat = 0;
        for(var k = 0; k < data.sceneryList.length; k++){
            clng += data.sceneryList[k].lng;
            clat += data.sceneryList[k].lat;
        }
        clng /= data.sceneryList.length;
        clat /= data.sceneryList.length;
        var midPoint = new BMap.Point(clng, clat);
        oMap.setCenter(midPoint);

        //arrange routes
        var arrange = data.arrange;
        var lenDays = arrange.length;
        var lastPoint = null; //上一天的最后一个景点
        for (var i = 0; i < lenDays; i++) {
            var dayObj = arrange[i];
            var sceneList = dayObj.list;
            var hotel = dayObj.hotel;
            var pointArr = [];
            var markLabels = [];
            var lenScene = sceneList.length;

            //连接上一天的结束点和第二天的开始点
            if(i != 0){
                pointArr.push(lastPoint);
            }

            for (var j = 0; j < lenScene; j++) {
                var point = new BMap.Point(sceneList[j].lng, sceneList[j].lat);
                var content = replaceTpl(oMap.sTemplate, [sceneList[j]]);
                var img = replaceTpl(oMap.sTemplate3, [sceneList[j]]);
                var div = content + img;
                pointArr.push(point);
                markLabels.push(div);
            }

            //重新赋值上一天的结束点
            lastPoint = new BMap.Point(sceneList[lenScene-1].lng, sceneList[lenScene-1].lat);
            oMap.addPoint(pointArr, oMap.color[i]);

            //移除上一天的结束点，
            if(i != 0){
                pointArr.shift();
            }
            if(i == curDay){
                oMap.addLabel(pointArr, markLabels, true);
            }else{
                oMap.addLabel(pointArr, markLabels, false);
            }

            //设置marker图标为水滴
            var hotel = dayObj.hotel;
            //创建小狐狸
            var pt = new BMap.Point(hotel.lng,hotel.lat-0.03);
            var hotelMarker = new BMap.Marker(pt, {
                // 指定Marker的icon属性为Symbol
                icon: new BMap.Symbol(BMap_Symbol_SHAPE_POINT, {
                    scale: 2,//图标缩放大小
                    fillColor: "orange",//填充颜色
                    fillOpacity: 0.8//填充透明度
                })
            });

            var myIcon = new BMap.Icon("http://developer.baidu.com/map/jsdemo/img/fox.gif", new BMap.Size(300,157));
            var marker2 = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
            oMap.addMarker(marker2, markLabels[0]);
        }


    },

    renderPage: function (data) {
        this.$processguide.append(tmpl(this.guideTpl, {item: data}));
        this.$items.append(tmpl(this.routeTpl, {item: data.arrange, url: this.baseUrl}))
    },
    adjustMapPos: function () {
        var mapLeft = ($(window).width() - 1020) / 2;
        $("#j-cont-allmap").css({left: mapLeft, top: 0});
    }

};

$(document).ready(function () {
    var url = 'routes/guangzhou/' + "3_0_96f564316ba8ffd5edcbf6fdd8fc5d3.json";
    Route.init(url, $("#processguide"), $("#items"));
});