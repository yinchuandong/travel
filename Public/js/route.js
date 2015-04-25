/**
 * Created by yinchuandong on 15/4/9.
 */

var Route = {
    baseUrl: gl_baseUrl,
    $processguide: $("#processguide"),
    $items: $("#items"),
    guideTpl: [
        '<h3> <%= item.ambiguitySname  %><%= item.maxDay  %>日游  </h3>',
        '<% for(var i = 0;i<item.arrange.length;i++){ %>',
        '<a href="#" class="current-day" alt="<%= i %>"><%= item.arrange[i].curDay %></a>',
        '<% } %>'
    ].join(''),
    //时间轴路线
    routeTpl: [
        '<% for(var i = 0;i<item.length;i++){ %>',
            '<% for(var j = 0;j<item[i].list.length;j++){ %>',
                '<div class="timeitem clearfix" id="day<%= i %><%= j %>">',
                '<img class="time_icon" src="<%= url %>/Public/images/timeline_side.png" alt=""><span class="time_title"><%= item[i].curDay %>:<%= item[i].list[j].ambiguitySname %></span>',
                '<div class="timeitem_content timeitemControl">',
                //'<img src="<%= url %>/Public/images/1.jpg" alt="" class="time_img">',
                '<img src="<%= url %>/index.php/Index/readImg?url=<%= item[i].list[j].fullUrl %>" alt="" class="time_img">',
                '<div class="timeitem_descrition">',
                '<p><%= item[i].list[j].moreDesc %></p>',
                '</div>',
                '</div>',
                '</div>',
            '<% } %>',
            '<div class="timeitem clearfix" id="hotel<%= i %>">',
            '<img class="time_icon" src="<%= url %>/Public/images/timeline_side.png" alt=""><span class="time_title">酒店：<%= item[i].hotel.hotelName %> </span></p>',
            '<p><span class="time_title time_title2">价格：<%= item[i].hotel.price %></span>',
            '<div class="timeitem_content timeitemControl">',
            '<p><span class="comment">评分：</span><div class="star"><i class="star-gold star<%= item[i].hotel.commentScore*2 %>"></i></div> <span class="commentScore"><%= item[i].hotel.commentScore %></span> </p>',
            '<img src="<%= url %>/index.php/Index/readImg?url=<%= item[i].hotel.pic %>" alt="" class="time_img">',
            '<div class="timeitem_descrition">',
            '<p><%= item[i].hotel.hotelAddress %></p>',
            '</div>',
            '</div>',
            '</div>',
        '<% } %>'
    ].join(''),
    //添加景点标注
    mapSceneTpl: ['<div class="clearfix m-unit"><div class="m-detail">',
        '<h3><%= sname %><span class="price">价格：<%= price %></span></h3> ',
        '<h5><div class="r-love"><i class="love"></i><span class="price"><%= viewCount %></span></div></h5>',
        '<p class="intro"><%= moreDesc %></p>',
        '</div><img id="coverImg" style="float:right;margin:4px"  src="<%= gl_baseUrl %>/index.php/Index/readImg?url=<%= fullUrl %>"/></div>'
    ].join(''),

    //添加酒店标注
    mapHotelTpl: ['<div class="clearfix m-unit"><div class="m-detail">',
        '<h3><%= hotelName %><span class="price"> ￥<%= price %> 元</span></h3> ',
        '<p class="intro"><%= hotelAddress %></p>',
        '<p class="intro">电话：<%= phone %></p>',
        '</div><img id="coverImg" style="float:right;margin:4px"  src="<%= gl_baseUrl %>/index.php/Index/readImg?url=<%= pic %>"/></div>'
    ].join(''),

    routeData: null, //ajax请求的异步数据
    init: function (url, $processguide, $items) {
        oMap.init();
        this.$processguide = $processguide;
        this.$items = $items;
        this.adjustMapPos();
        this.getRouteJson(url);
    },

    /**
     * step1:请求route的json文件
     * @param url
     */
    getRouteJson: function (url) {
        var self = this;
        var requestUrl = this.baseUrl  + "/" + url;
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
        $("#processguide").find("a.current-day").bind("click", function (ev) {
            ev.preventDefault();
            //console.log($(this).attr("alt"))
            var curDay = parseInt($(this).attr("alt"));
            oMap.removeOverlays();
            self.arrange(self.routeData, curDay);
            $(window).scrollTo("#day"+curDay+"0", 1000);
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
                var div = tmpl(this.mapSceneTpl, sceneList[j]);
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

            var pt = new BMap.Point(hotel.lng, hotel.lat);
            var hotelIcon = new BMap.Icon(this.baseUrl+"/Public/images/hotel-icon.png", new BMap.Size(32,32));
            var hotelMarker = new BMap.Marker(pt,{icon:hotelIcon});  // 创建标注
            var hotelTpl = tmpl(this.mapHotelTpl, hotel);
            oMap.addMarker(hotelMarker, hotelTpl);
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
