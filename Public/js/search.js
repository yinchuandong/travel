/**
 * Created by yinchuandong on 15/4/9.
 */

var Search = {
    init:function(){
        this.bindEvent();
    },
    bindEvent:function(){
        var key = getQueryString("key");
        var day = getQueryString("day");
        var price = getQueryString("price");
        var orderby =  getQueryString("orderby");

        $("#condition li").removeClass('active');

        $("#condition").find("[day="+day+"]").parent().addClass('active');
        $("#condition").find("[price="+price+"]").parent().addClass('active');
        $("#condition").find("[order="+orderby+"]").parent().addClass('active');


        $("#condition").on("click",".condition-day a",function(){
            var day = $(this).attr("day");
            $("#search-day").val(day);
            $("#search-route").trigger("click");
        })
        .on("click",".condition-price a",function(){
            var price = $(this).attr("price");
            $('#search-price').val(price);
            $("#search-route").trigger("click");
        })
        .on("click",".condition-orderby a",function(){
            var sort = $(this).attr("order");
            $("#search-orderby").val(sort);
            $("#search-route").trigger("click");
        });

        $("#search-route").click(function(){
            $("#search-form").submit();
        });
    }
};
$(document).ready(function(){
    Search.init();
});