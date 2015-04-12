/**
 * Created by yinchuandong on 15/4/9.
 */

var Route = {
    adjustMapPos: function(){
        var $main = $("#j-main");
        var mapLeft = $main.offset().left + $main.width();
        $("#j-cont-allmap").attr({left:mapLeft});
    }
};

$(document).ready(function () {
    Route.adjustMapPos();
});