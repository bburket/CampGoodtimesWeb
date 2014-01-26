// sitecontroller.js
// copyright 2014, mikedice417@hotmail.com

var SiteController = (function(){

    function ConfigureDonateMenu() {
        // Configuration and operations for the Donate menu
        $("#donate-menu").menu({
            select: function (event, ui) {
                $("#donate-menu").hide();
                if (ui.item.attr("id") == "donate-menu-item-inkind") { window.location = "/Home/InKind"; }
                else if (ui.item.attr("id") == "donate-menu-item-inhonorof") { window.location = "/Home/InHonorOf"; }
                else if (ui.item.attr("id") == "donate-menu-item-donatenow") { window.location = "/Home/DonateNow"; }
            }});

        var collapseDonateMenu = true;

        // show the menu on mouseenter, on mouseleave we want to set a timer
        $("#donate-menu-link").hover(
            function () { $("#donate-menu").show(); },
            function () {
                setTimeout(function () {
                    if (collapseDonateMenu) {
                        $("#donate-menu").hide();
                    }
                }, 1000);
            });

        $("#donate-menu").hover(
            function () { collapseDonateMenu = false; },
            function () {
                collapseDonateMenu = true;
                $("#donate-menu").hide();
            });
    }

    function PopulateBlogListFromJsonObject(jsonObject) {
        for (i = 0; i < jsonObject.length; i++) {
            $("#feed-list").append(
                    $("<div>")
                        .html(jsonObject[i].Title + " " + jsonObject[i].PublishedOnGmt)
                        .append(
                            $("<div>")
                            .html(jsonObject[i].Description))
                        );
        }

    }
    
    // public interface
    return {
        Initialize: function(){

            // Configure the Donate jquery menu
            ConfigureDonateMenu();

            // Initialize the Nivo Slider
            $('#slider').nivoSlider();

            // async request to get the Sharepoint list from the camp director
            // todo: spinner??
            $.getJSON("Home/GetCampDirectorNewsFeed")
                .done(function (result) {
                    PopulateBlogListFromJsonObject(result);
                })
                .error(function (error) {
                    alert(error);
                });

        },
    };
}());


// ViewController will load data, populate the model 
// and render the view  after the doc is loaded.
$(document).ready(function(){
    
    SiteController.Initialize();
});