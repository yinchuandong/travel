/**
 * Created by yinchuandong on 15/4/9.
 */

var Route = {
    baseUrl: gl_baseUrl,
    $processguide: $("#processguide"),
    $items: $("#items"),
    plan: '1',
    guideTpl: [
        '<h3> <%= item.ambiguitySname  %><%= item.maxDay  %>日游&nbsp;&nbsp;方案<%= plan %>&nbsp;&nbsp;酒店花费:<%= parseInt(item.hotelPrice) %>元&nbsp;&nbsp;门票花费:<%= item.sceneTicket %>元</h3>',
        '<% for(var i = 0;i<item.arrange.length;i++){ %>',
        '<a href="#" class="current-day" alt="<%= i %>"><%= item.arrange[i].curDay %></a>',
        '<% } %>'
    ].join(''),
    //时间轴路线
    routeTpl: [
        '<% for(var i = 0;i<item.length;i++){ %>',
            '<% for(var j = 0;j<item[i].list.length;j++){ %>',
                '<div class="timeitem clearfix" id="day<%= i %><%= j %>">',
                '<img class="time_icon" src="<%= url %>/Public/images/timeline_side.png" alt=""><span class="time_title scene-font"><%= item[i].curDay %>:<%= item[i].list[j].ambiguitySname %></span>',
                '<div class="timeitem_content timeitemControl scene-item clearfix">',
                '<img src="<%= url %>/index.php/Index/readImg?url=<%= item[i].list[j].fullUrl %>" alt="" class="time_img">',
                '<p><div class="star"><i class="star-gold star<%= item[i].list[j].rating*2 %>"></i></div> <span class="commentScore scene-font"><%= item[i].list[j].rating %>分</span> </p>',
                '<div class="timeitem_descrition scene-font">',
                '<p>访问量:<%= item[i].list[j].viewCount %>&nbsp;想去:<%= item[i].list[j].goingCount %>人&nbsp;去过：<%= item[i].list[j].goneCount %>人</p>',
                '<p><%= item[i].list[j].moreDesc %></p>',
                '</div>',
                '</div>',
                '</div>',
            '<% } %>',
            '<% if(item[i].hotel != "-1"){ %>',
                '<div class="timeitem clearfix" id="hotel<%= i %>">',
                '<img class="time_icon" src="<%= url %>/Public/images/timeline_side.png" alt=""><span class="time_title hotel-font">酒店：<%= item[i].hotel.hotelName %> </span></span>',
                '<div class="timeitem_content timeitemControl hotel-item clearfix">',
                '<img src="<%= url %>/index.php/Index/readImg?url=<%= item[i].hotel.pic %>" alt="" class="time_img">',
                '<p><div class="star"><i class="star-gold star<%= item[i].hotel.commentScore*2 %>"></i></div> <span class="commentScore hotel-font"><%= item[i].hotel.commentScore %>分</span> </p>',
                '<div class="timeitem_descrition hotel-font">',
                '<p>价格：<%= item[i].hotel.price %>元</p>',
                '<p>电话：<%= item[i].hotel.phone %></p>',
                '<p>地址：<%= item[i].hotel.hotelAddress %></p>',
                '</div>',
                '</div>',
                '</div>',
            '<% } %>',
        '<% } %>'
    ].join(''),
    //添加景点标注
    mapSceneTpl: [
        '<div class="clearfix m-unit">',
        '<div class="m-detail">',
        '<h3><%= sname %><span class="price">&nbsp;&nbsp;<% if(price != 0) { %><%= price %>元 <% } else { %> 免费 <% } %></span>',
        '</h3> ',
        '<p class="intro"><%= moreDesc %></p>',
        '</div>',
        '<div class="m-unit-right">',
        '<p><div class="star"><i class="star-gold star<%= rating*2 %>"></i></div> <span class="commentScore scene-font"><%= rating %>分</span> </p>',
        '<p class="scene-font">访问量:<%= viewCount %>&nbsp;想去:<%= goingCount %>人&nbsp;去过:<%= goneCount %>人</p>',
        '<img id="coverImg" src="<%= gl_baseUrl %>/index.php/Index/readImg?url=<%= fullUrl %>"/>',
        '</div>',
        '</div>'
    ].join(''),

    //添加酒店标注
    mapHotelTpl: [
        '<div class="clearfix m-unit">',
        '<div class="m-detail">',
        '<h3><%= hotelName %><span class="price"> ￥<%= price %> 元</span></h3> ',
        '<p><div class="star"><i class="star-gold star<%= commentScore*2 %>"></i></div> <span class="commentScore scene-font"><%= commentScore %>分</span> </p>',
        '<p class="intro"><%= hotelAddress %></p>',
        '<p class="intro">电话：<%= phone %></p>',
        '</div>',
        '<div class="m-unit-right">',
        '<img id="coverImg" src="<%= gl_baseUrl %>/index.php/Index/readImg?url=<%= pic %>"/>',
        '</div>',
        '</div>'
    ].join(''),

    routeData: null, //ajax请求的异步数据
    /**
     *
     * @param url
     * @param $processguide
     * @param $items
     * @param plan
     */
    init: function (url, $processguide, $items, plan) {
        oMap.init();
        this.plan = plan;
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

            if(hotel != "-1"){
                var pt = new BMap.Point(hotel.lng, hotel.lat);
                var hotelIcon = new BMap.Icon(this.baseUrl+"/Public/images/hotel-icon.png", new BMap.Size(32,32));
                var hotelMarker = new BMap.Marker(pt,{icon:hotelIcon});  // 创建标注
                var hotelTpl = tmpl(this.mapHotelTpl, hotel);
                oMap.addMarker(hotelMarker, hotelTpl);
            }
        }


    },

    renderPage: function (data) {
        this.$processguide.append(tmpl(this.guideTpl, {item: data, plan: this.plan}));
        this.$items.append(tmpl(this.routeTpl, {item: data.arrange, url: this.baseUrl}))
    },
    adjustMapPos: function () {
        var mapLeft = ($(window).width() - 1020) / 2;
        $("#j-cont-allmap").css({left: mapLeft, top: 0});
    }

};
