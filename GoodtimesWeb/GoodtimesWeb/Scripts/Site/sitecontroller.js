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

        var countToAdd = 0;
        for (i = 0; i < jsonObject.length; i++) {
            if (jsonObject[i].IsVisible) {
                countToAdd++;
                if (countToAdd >= 3) {
                    break;
                }
            }
        }

        if (countToAdd == 0)
        {
            return;
        }

        // set the right width for the container
        var containerLength = 25 * countToAdd;

        $("#news-article-container").css("width", containerLength + "%");
        var countAdded = 0;
        for (i = 0; i < jsonObject.length; i++) {

            if (jsonObject[i].IsVisible) {
                
                $("#news-box-positioner").append(
                            $("<div>")
                                .addClass("news-article-box")
                                .append($("<div>")
                                            .addClass("news-article-title")
                                            .html(jsonObject[i].Title)
                                        )
                                .append($("<div>")
                                            .addClass("news-article-date")
                                            .html(jsonObject[i].EventDate)
                                        )
                                .append($("<div>")
                                            .addClass("news-article-content")
                                            .html(jsonObject[i].Description)
                                        )

                                .append($("<a>")
                                            .addClass("news-article-more-link")
                                            .attr("href", "#")
                                            .html("More")
                                        )

                                  )

                    if (countAdded >= countToAdd) {
                        return;
                    }
            }
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