// whatwedo.js
// copyright 2014, mikedice417@hotmail.com

var WhatWeDoController = (function () {

    function ShowCamps() {
        $("#whatwedo-content").html();
    }

    function ShowEvents() {
        $("#whatwedo-content").html();
    }

    function ShowScholorships() {
        $("#whatwedo-content").html();
    }

   // public interface
    return {
        // initialize the volunteer page
        Initialize: function () {
            // initialize tabbuttons and set the callback
            TabButtons.Initialize(this);
        },

        // Callback from tabButtons.js indicating the ID of the tab button that was selected
        ButtonSelected: function (buttonId) {
            if (buttonId == "whatwedo-camps") {
                ShowCamps();
            }
            else if (buttonId == "whatwedo-events") {
                ShowEvents();
            }
            else if (buttonId == "whatwedo-scholorships") {
                ShowScholorships();
            }
        },

    };

}());

$(document).ready(function () {

    WhatWeDoController.Initialize();
});