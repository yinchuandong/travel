function debug(info){
	console.log(info);
}


(function($, window, document){
    
    var $window = $(window);
    $.fn.lazyload = function(options){
        var settings = $.extend({}, $.fn.lazyload.defaults, options);
        var elements = this;//所有调用元素的集合
        var lazyFun = new lazy(settings,elements);
        
        
	    this.each(function(index, val) {
            var self = this;
            var $self = $(self);

            self.loaded = false;
            //没有图片的给个默认图片
            if ($self.attr("src") === undefined || $self.attr("src") === false) {
                if ($self.is("img")) {
                    $self.attr("src", settings.placeholder);
                }
            }
            //当图片第一次出现

            $self.one("appear",function(){
                if(!this.loaded){
                    $self.one("load",function(){
                        var original = $self.attr("data-original");
                        $self.hide();
                        if($self.is("img")){
                            $self.attr("src",original);
                        }else{
                            $self.css("background-image", "url('" + original + "')");
                        }
                        //自定义图片出现方式///////////////
                        $self[settings.effect](settings.effect_speed);
                        self.loaded = true;
                        var temp = $.grep(elements,function(element){
                            return !element.loaded;
                        });
                        elements = $(temp);
                        if(elements.length==0){
                            destroy();
                        }
                    });
                    $self.attr("src", $self.attr("data-original"));
                }
            });
        });
    

        
        init();
        
        function destroy(){
            var $container = (settings.container === undefined ||
                  settings.container === window) ? $window : $(settings.container);            
            if (0 === settings.event.indexOf("scroll")) {
                $container.unbind("scroll");
            }else{
                 $container.bind(settings.event);               
            }
            
            //窗口调整后是否有新图片出现
            $window.unbind("resize");
         
        }
        
        function init(){
            var $container = (settings.container === undefined ||
                  settings.container === window) ? $window : $(settings.container);            
            if (0 === settings.event.indexOf("scroll")) {
                $container.bind("scroll",function(){lazyFun.update()});
                ////$container.bind(settings.event,lazyFun.update());  
            }else{
                 $container.bind(settings.event,function(){lazyFun.update()});               
            }
            
            if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) { 
                $window.bind("pageshow", function(event) {
                    if (event.originalEvent && event.originalEvent.persisted) {
                        elements.each(function() {
                            $(this).trigger("appear");
                        });
                    }
                });
            }
            
            //窗口调整后是否有新图片出现
            $window.bind("resize",function() {lazyFun.update();});
            
            //刷新后检查是否有新图片出现
            $(document).ready(function() {
                lazyFun.update();
            });
        }


        
        return this;
    }
})(jQuery, window, document)

$.fn.lazyload.defaults = {
            threshold       : 0,
            failure_limit   : 0,
            effect          : "fadeIn",
            container       : window,
            appear          : null,
            load            : null,
            event           : "scroll",
            effect_speed    : 1000,
            placeholder     : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"   
}

var lazy = function(settings,elements){
    this.settings = settings;
    this.elements = elements;
    this.inviewport = function(element){
        var settings = this.settings;
        return !abovethetop(element)&&!belowthefold(element);
    }  
    
    this.abovethetop = function(element){
        var settings = this.settings;
        var fold;
        if (settings.container === undefined || settings.container == window) {
            fold = $(window).scrollTop();
        } else {
            fold = $(settings.container).offset().top;
        }
        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
    }
    
    this.belowthefold = function(element){
        var settings = this.settings;
        var fold;
        if(settings.container==undefined||settings.container===window){
            fold = (window.innerHeight?window.innerHeight:$(window).height())+$(window).scrollTop();
        }else{
            fold = $(settings.container).height()+$(settings.container).offset().top;
        }
        return fold <= $(element).offset().top - settings.threshold;
    }
    
    this.update = function() { 
        var settings = this.settings;
        var counter = 0;
        var _this = this;
        this.elements.each(function(index,cont) {
            var $this = $(this);
            if (_this.abovethetop(this)) {//滚过去消失了
                    
            } else if (!_this.belowthefold(this)) {//图片出现
                    $this.trigger("appear");
            }
        });
    }

    
}



