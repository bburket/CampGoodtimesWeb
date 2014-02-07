// whoweare.js
// copyright 2014, mikedice417@hotmail.com

var WhoWeAreController = (function () {

    function ShowHistory() {
         $("#whoweare-content").html($("#HistoryContent").html());
    }

    function ShowStaffAndBoard() {
        $("#whoweare-content").html($("#StaffAndBoardContent").html());
    }

    function ShowDonors() {
        $("#whoweare-content").html($("#DonorsContent").html());
    }


    function StaffAndBoardBeginInitialize() {
        $.getJSON("/WhoWeAre/GetStaffJson")
        .done(function (result) {
            StaffAndBoardFinishInitialize(result);
        })
        .error(function (error) {
            alert(error.status);
        });

    }

    function StaffAndBoardFinishInitialize(jsonResult) {

        var maxRowCount = 4;
        var curRowCount = 0;
        var rows = 0;
        var curRow = null;
        $(jsonResult).each(function (i, el) {

            if (curRowCount == 0)
            {
                var newRowId = "board-table-row-" + rows;
                
                $("#board-table").append($("<div>").attr("id", newRowId).addClass("board-table-row"));
                curRow = $("#board-table").children("#" + newRowId);
                rows++;
            }

            if (el.position == "board")
            {
                $(curRow).append($("<div>")
                    .addClass("board-table-row-cell")
                    .append($("<h4>").addClass("cell-title").html(el.name))
                    .append($("<img>").addClass("cell-image").attr("src", "/Content/images/staff/" + el.image))
                    .append($("<p>").addClass("cell-bio").html(el.bio))
                    
                    );
                curRowCount++;
            }

            if (curRowCount >= maxRowCount)
            {
                curRowCount = 0;
            }
        });


        curRowCount = 0;
        rows = 0;
        curRow = null;
        $(jsonResult).each(function (i, el) {

            if (curRowCount == 0) {
                var newRowId = "staff-table-row-" + rows;

                $("#staff-table").append($("<div>").attr("id", newRowId).addClass("staff-table-row"));
                curRow = $("#staff-table").children("#" + newRowId);
                rows++;
            }

            if (el.position == "staff") {
                $(curRow).append($("<div>")
                    .addClass("staff-table-row-cell")
                    .append($("<h4>").addClass("cell-title").html(el.name))
                    .append($("<img>").addClass("cell-image").attr("src", "/Content/images/staff/" + el.image))
                    .append($("<p>").addClass("cell-bio").html(el.bio))

                    );
                curRowCount++;
            }

            if (curRowCount >= maxRowCount) {
                curRowCount = 0;
            }
        });


        }

    
    // public interface
    return {
        // initialize the volunteer page
        Initialize: function () {
            // initialize tabbuttons and set the callback
            TabButtons.Initialize(this);

            // Staff and Board initialize
            StaffAndBoardBeginInitialize();
        },

        // Callback from tabButtons.js indicating the ID of the tab button that was selected
        ButtonSelected: function (buttonId) {
            if (buttonId == "whoweare-historybutton") {
                ShowHistory();
            }
            else if (buttonId == "whoweare-staffandboardbutton") {
                ShowStaffAndBoard();
            }
            else if (buttonId == "volunteer-donorsbutton") {
                ShowDonors();
            }
        },

    };

}());

$(document).ready(function () {

    WhoWeAreController.Initialize();
});