// tabButtons.js
// copyright 2014, mikedice417@hotmail.com

var TabButtons = (function () {
    var callbackObject;

    // public interface
    return {
        Initialize: function (cb) {
            callbackObject = cb;
            $(".tabButtons:first").addClass("tabButtons-selected");
            $(".tabButtons:first > .tabButtonsImage").css("display", "block");
            callbackObject.ButtonSelected($(".tabButtons:first").attr("id"));

            $(".tabButtons").click(function () {

                $(".tabButtons-selected > .tabButtonsImage").css("display", "none");
                $(".tabButtons-selected").removeClass("tabButtons-selected");


                $(this).addClass("tabButtons-selected");
                $(this).children(".tabButtonsImage").css("display", "block");
                callbackObject.ButtonSelected($(this).attr("id"));

            });
        },
    };
}());

