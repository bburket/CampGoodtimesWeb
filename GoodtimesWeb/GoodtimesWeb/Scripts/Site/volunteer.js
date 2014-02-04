// volunteer.js
// copyright 2014, mikedice417@hotmail.com

var VolunteerController = (function () {

    function ShowCampAndEvent() {
        $("#YearRoundContent").hide();
        $("#volunteer-content").html($("#CampAndEventContent").html());
        $("#CampAndEventContent").show();
    }

    function ShowYearRound() {
        $("#CampAndEventContent").hide();
        $("#volunteer-content").html($("#YearRoundContent").html());
        $("#YearRoundContent").show();
    }

    // public interface
    return {
        // initialize the volunteer page
        Initialize: function () {
            // initialize tabbuttons and set the callback
            TabButtons.Initialize(this);

            $(".volunteer-stack-mebutton").click(function (ev) {
                window.alert("todo: volunteer page for " + ev.target.id);
            });
        },

        // Callback from tabButtons.js indicating the ID of the tab button that was selected
        ButtonSelected: function (buttonId) {
            if (buttonId == "volunteer-campandevent") {
                ShowCampAndEvent();
            }
            else if (buttonId == "volunteer-yearround") {
                ShowYearRound();
            }
        },


    };

}());

$(document).ready(function () {

    VolunteerController.Initialize();
});