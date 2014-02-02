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


        var countAdded = 0;
        for (i = 0; i < jsonObject.length; i++) {

            if (jsonObject[i].IsVisible) {
                
                $("#news-article-container").append(
                            $("<div>")
                                .addClass("news-article-box-pre")
                                .append($("<div>")
                                            .addClass("news-article-title")
                                            .html(jsonObject[i].Title)
                                        )
                                .append($("<div>")
                                            .addClass("news-article-date")
                                            .html(jsonObject[i].EventDate)
                                        )
                                .append($("<div>")
                                            .addClass("news-article-content-spacer")
                                            .append($("<p>")
                                                .addClass("news-article-content")
                                                .html(jsonObject[i].Description)
                                                .wrap("<div>"))
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
        $("#news-article-container .news-article-box-pre").each(function (i, box) { elipsifyJqueryContentByHeight($(box).find(".news-article-content"), $(box), "news-article-box-pre", "news-article-box", 100) });

    }

    function elipsifyJqueryContentByHeight(elem, parent, preClass, postClass, overflowMaxHeight) {

        if (elem.height() > overflowMaxHeight) {
            var wordsTrimmed = 0;
            do {
                var text = elem.html();
                text = text.slice(0, text.lastIndexOf(" "));
                elem.html(text);
                wordsTrimmed++;

            } while (elem.height() > overflowMaxHeight);
            if (wordsTrimmed > 0) {
                var text = elem.html();
                text = text + " ...";
                elem.html(text);
            }
        }
        parent.removeClass(preClass).addClass(postClass);
    }

    function InitializeSlideractionMenu() {
        $(".slideshow-action-menu-container-menuitem").click(function (ev) {
            if (ev.target.id == "slideshow-action-menuitem-joinus") {
            }
            else if (ev.target.id == "slideshow-action-menuitem-volunteer") {
            }
            else if (ev.target.id == "slideshow-action-menuitem-donate") {
            }
        });
    }
    
    // public interface
    return {
        Initialize: function(){

            // Configure the Donate jquery menu
            ConfigureDonateMenu();

            // Initialize the Nivo Slider
            $('#slider').nivoSlider();

            // Initialize slider action menu
            InitializeSlideractionMenu();

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