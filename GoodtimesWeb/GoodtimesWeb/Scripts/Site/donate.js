// donate.js
// copyright 2014, mikedice417@hotmail.com

var DonateController = (function () {

    function ShowDonateMonetary() {
        $("#donate-content").html($("#Monetary").html());
    }

    function ShowDonateInKind() {
        $("#donate-content").html($("#InKind").html());
    }

    // public interface
    return {
        // initialize the donate page
        Initialize: function () {
            // initialize tabbuttons and set the callback
            TabButtons.Initialize(this);

            // set first tab to display
            ShowDonateMonetary();

            // click handler for the 'Donate' button
            $("#donate-online-action-button").click(function () {
                window.open("https://goodtmsp.ejoinme.org/MyPages/DonationPage/tabid/485111/Default.aspx", "_blank");

            })
        },

        // Callback from tabButtons.js indicating the ID of the tab button that was selected
        ButtonSelected: function (buttonId) {
            if (buttonId == "donate-monetary") {
                ShowDonateMonetary();
            }
            else if (buttonId == "donate-inkind") {
                ShowDonateInKind();
            }
        },
    };
}());

$(document).ready(function () {

    DonateController.Initialize();
});