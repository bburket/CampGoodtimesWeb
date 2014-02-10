// camps.js
// copyright 2014, mikedice417@hotmail.com

var CampsController = (function () {

    function ShowCampDetails() {
        $("#camp-content").html($("#camp-partial-details").html());
        $(".camp-camper-signup").click(function (ev) {
            window.alert("todo: hook up camper signup for " + $(ev.target).attr("data-camp-signup"));
        });

    }

    function ShowCampVolunteer() {
        $("#camp-content").html($("#camp-volunteer-details").html());
        $(".camp-volunteer-stack-mebutton").click(function (ev) {
            window.alert("todo: volunteer page for " + ev.target.id);
        });
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
            if (buttonId == "camps-details-button") {
                ShowCampDetails();
            }
            else if (buttonId == "camps-volunteer-button") {
                ShowCampVolunteer();
            }
        },


    };

}());

$(document).ready(function () {

    CampsController.Initialize();
});