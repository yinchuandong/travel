/**
 * Created by yinchuandong on 15/4/9.
 */

var Route = {
    baseUrl:'http://127.0.0.1/travel/',
    $processguide:$("#processguide"),
    $items:$("#items"),
    guideTpl:
        [
        '<h3> <%= item.ambiguitySname  %><%= item.maxDay  %>日游  </h3>',
        '<% for(var i = 0;i<item.arrange.length;i++){ %>',
        '<a href="#day<%= i %>0"><%= item.arrange[i].curDay %></a>',
        '<% } %>'
        ].join(''),
    routeTpl:[
        '<% for(var i = 0;i<item.length;i++){ %>',
            '<% for(var j = 0;j<item[i].list.length;j++){ %>',
                '<div class="timeitem clearfix" id="day<%= i %><%= j %>">',
                    '<img class="time_icon" src="<%= url %>/Public/images/timeline_side.png" alt=""><span class="time_title"><%= item[i].curDay %>:<%= item[i].list[j].ambiguitySname %></span>',
                    '<div class="timeitem_content timeitemControl">',
                        '<img src="<%= item[i].list[j].fullUrl %>" alt="" class="time_img">',
                            '<div class="timeitem_descrition">',
                               '<p>前期制作历经两个月的EDDY自导 自演的轻松爆米花剧终于结束了前期 拍摄.在吸取了第零集的失败经验后,初 次拍摄的小团队在前期拍摄中仍然遇到许多困难，庆幸的是他们取得了长足的发展，片源效果也相当不错。</p>',
                            '</div>',
                    '</div>',
                '</div>',
            '<% } %>',
        '<% } %>'
    ].join(''),
    adjustMapPos: function(){
        var mapLeft = ($(window).width() - 1020) / 2;
        $("#j-cont-allmap").css({left:mapLeft,top:0});
    },
    getData:function(url){
        var self = this;
        var url = this.baseUrl+url;
        $.ajax({
            url:url,
            dataType:"json",
            type:"POST",
            success:function(data){
                self.renderPage(data);
            }

        });
    },

    renderPage:function(data){
        this.$processguide.append(tmpl(this.guideTpl,{item:data}));
        this.$items.append(tmpl(this.routeTpl,{item:data.arrange,url:this.baseUrl}))
    },
    bindEvent:function(){

    },
    init:function(url,$processguide,$items){
        this.$processguide=$processguide;
        this.$items = $items;
        this.adjustMapPos();
        this.getData(url);
        this.bindEvent();
    }

};

$(document).ready(function () {
    var url = 'routes/guangzhou/'+"3_0_96f564316ba8ffd5edcbf6fdd8fc5d3.json";
    Route.init(url,$("#processguide"),$("#items"));
});