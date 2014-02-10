// whatwedo.js
// copyright 2014, mikedice417@hotmail.com

var WhatWeDoController = (function () {

    function ShowCamps() {
        ShowLoadingIndicator();
        Get("/WhatWeDo/CampsPartial", ShowCampsComplete);
    }

    function ShowCampsComplete(result) {
        $("#whatwedo-content").html(result);
        InitializeCampButtons();
    }

    function ShowEvents() {
        ShowLoadingIndicator();
        Get("/WhatWeDo/EventsPartial", ShowEventsComplete);
    }

    function ShowEventsComplete(result)
    {
        $("#whatwedo-content").html(result);
    }

    function ShowScholorships() {
        ShowLoadingIndicator();
        Get("/WhatWeDo/ScholarshipsPartial", ShowScholarshipsComplete);
    }

    function ShowScholarshipsComplete(result) {
        $("#whatwedo-content").html(result);
    }

    function Get(url, completionFunc) {
        $.get(url)
        .done(function (result) {
            HideLoadingIndicator();
            completionFunc(result);
        })
        .error(function (error) {
            HideLoadingIndicator();
            alert(error);
        });
    }


    function ShowLoadingIndicator() {
        $("#whatwedo-content").empty();
        $("#whatwedo-content").append($("<div>")
                                .attr("id", "whatwedo-loading-content")
                                .append($("<div>")
                                            .attr("id", "whatwedo-loading-content-title")
                                            .html("Loading content. Please wait...")
                                        )
                                .append($("<img>")
                                            .attr("src", "/Content/images/layout/goodtimes-loading.gif")
                                        )


            );
        $("#whatwedo-loading-content").show();
    }

    function HideLoadingIndicator() {
        $("#whatwedo-loading-content").hide();
        $("#whatwedo-content").empty();
    }


    function InitializeCampButtons() {
        
        $(".camps-learn-more-button").click(function (ev) {

            var val = $(ev.target).attr("data-learn-more");
            if (val != null)
                {
                window.location = "/WhatWeDo/Camps/" + val;
                }



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