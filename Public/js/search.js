/**
 * Created by yinchuandong on 15/4/9.
 */

var Search = {
    $minPrice: null,
    $maxPrice: null,
    $condition: null,
    init: function () {
        this.$minPrice = $("#j-min-price");
        this.$maxPrice = $("#j-max-price");
        this.$condition = $("#condition");
        this.initParams();
        this.bindEvent();
    },
    initParams: function () {
        var self = this;
        var params = getQuery();
        var key = params["key"];
        var day = params["day"];
        var price = params["price"];
        var orderby = params["orderby"];
        var sort = params["sorted"];

        //$("#condition li").removeClass('active');
        var $condition = self.$condition;

        if (day != null && day != "") {
            $condition.find(".condition-day li").removeClass('active');
            $condition.find("[day=" + day + "]").parent().addClass('active');
        }
        if (price != null && price != "") {
            $condition.find(".condition-price li").removeClass('active');
            $condition.find("[price=" + price + "]").parent().addClass('active');
            var tmpArr = price.split("-");
            if(tmpArr.length == 2 && !isNaN(parseInt(tmpArr[0]))){
                self.$minPrice.val(tmpArr[0]);
                self.$maxPrice.val(tmpArr[1]);
            }
        }
        if (orderby != null && orderby != "") {
            $condition.find(".condition-orderby .order li").removeClass('active');
            $condition.find("[orderby=" + orderby + "]").parent().addClass('active');
        }
        if (sort != null && sort != "") {
            $condition.find(".condition-orderby .sort li").removeClass('active');
            $condition.find("[sort=" + sort + "]").parent().addClass('active');
        }

        $("#search-text").val(key);
        $("#search-day").val(day);
        $('#search-price').val(price);
        $("#search-orderby").val(orderby);
        $("#search-sort").val(sort);
    },
    bindEvent: function () {
        var self = this;
        var $condition = self.$condition;
        $condition.on("click", ".condition-day a", function () {
            var day = $(this).attr("day");
            $("#search-day").val(day);
            $("#search-route").trigger("click");

        }).on("click", ".condition-price a", function () {
            var price = $(this).attr("price");
            $('#search-price').val(price);
            $("#search-form").submit();

        }).on("click", ".condition-orderby .order a", function () {
            var sort = $(this).attr("orderby");
            $("#search-orderby").val(sort);
            $("#search-route").trigger("click");

        }).on("click", ".condition-orderby .sort a", function () {
            var sort = $(this).attr("sort");
            $("#search-sort").val(sort);
            $("#search-route").trigger("click");

        });

        //搜索按钮事件
        $("#search-route").click(function (ev) {
            var minPrice = parseInt(self.$minPrice.val());
            var maxPrice = parseInt(self.$maxPrice.val());
            if(!isNaN(minPrice) && !isNaN(maxPrice)){
                if(minPrice < 0){
                    alert("最小价格不能小于0元");
                    return;
                }
                if(maxPrice > 100000){
                    alert("最大价格不能大于100000元");
                    return;
                }
                if(minPrice > maxPrice){
                    alert("最小价格不能大于最大价格");
                    return;
                }
                $('#search-price').val(minPrice + "-" + maxPrice);
            }
            $("#search-form").submit();
        });

        //搜索框输入事件
        $("#search-text").keyup(function (e) {
            var keyword = $(this).val().trim();
            self.suggest(keyword);
        });

        $(document).click(function () {
            var tipsDlg = $("#tips-dialog");
            if (tipsDlg.attr("display") != "none") {
                tipsDlg.hide();
            }
        });

        $("#tips-dialog").on("click", "li", function () {
            var val = $(this).text();
            $("#search-text").val(val);
            $("#search-form").submit();
        });
    },

    suggest: function (keyword) {
        var $tipsDlg = $("#tips-dialog");
        $.ajax({
            url: gl_baseUrl + "/index.php/Index/suggest",
            method: 'get',
            data: {key: keyword},
            dataType: 'json',
            success: function (res) {
                if (res.status == 1) {
                    var data = res.data;
                    var tpl = replaceTpl('<li class="tips-item">{name}</li>', data);
                    $tipsDlg.empty();
                    $tipsDlg.append(tpl);
                    $tipsDlg.show();
                } else {
                    $tipsDlg.empty();
                    $tipsDlg.hide();
                }

            }

        });
    }

};
$(document).ready(function () {
    Search.init();
    $(".route-cover").lazyload();
});