/**
 * Created by yinchuandong on 15/4/9.
 */

var Search = {
    init:function(){
        this.bindEvent();
    },
    bindEvent:function(){
        var self = this;
        var key = getQueryString("key");
        var day = getQueryString("day");
        var price = getQueryString("price");
        var orderby =  getQueryString("orderby");

        $("#condition li").removeClass('active');
        var $condition = $("#condition");

        $condition.find("[day="+day+"]").parent().addClass('active');
        $condition.find("[price="+price+"]").parent().addClass('active');
        $condition.find("[order="+orderby+"]").parent().addClass('active');
        $("#search-text").val(key);
        $("#search-day").val(day);
        $('#search-price').val(price);
        $("#search-orderby").val(orderby);
        $condition.on("click",".condition-day a",function(){
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

        $("#search-text").keyup(function (e) {
            var keyword = $(this).val().trim();
            self.suggest(keyword);
        });

        $(document).click(function () {
            var tipsDlg =  $("#tips-dialog");
            if(tipsDlg.attr("display") != "none"){
                tipsDlg.hide();
            }
        });

        $("#tips-dialog").on("click","li" ,function(){
            var val = $(this).text();
            $("#search-text").val(val);
        });
    },

    suggest: function (keyword) {
        var $tipsDlg = $("#tips-dialog");
        $.ajax({
            url: gl_baseUrl + "/index.php/Index/suggest",
            method:'get',
            data:{key:keyword},
            dataType: 'json',
            success: function (res) {
                if(res.status == 1){
                    var data = res.data;
                    var tpl = replaceTpl('<li class="tips-item">{name}</li>', data);
                    $tipsDlg.empty();
                    $tipsDlg.append(tpl);
                    $tipsDlg.show();
                }else{
                    $tipsDlg.empty();
                    $tipsDlg.hide();
                }

            }

        });
    }

};
$(document).ready(function(){
    Search.init();
});