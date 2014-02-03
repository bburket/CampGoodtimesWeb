// sitecontroller.js
// copyright 2014, mikedice417@hotmail.com

var SiteController = (function(){

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
                                            .attr("href", "/Home/News")
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

    function addLoadingNewsArticleIndicator()
    {
        $("#news-article-container").append(
                            $("<div>")
                                .addClass("news-article-loading-box")
                                .attr("id", "news-article-loading-box")
                                .append($("<div>")
                                            .addClass("news-article-loading-title")
                                            .html("Loading news articles...")
                                        )
                                .append($("<img>")
                                            .attr("src", "/Content/images/layout/goodtimes-loading.gif")
                                        ));
    }

    function removeLoadingNewsArticleIndicator()
    {
        $("#news-article-loading-box").remove();
    }


    function InitiateNewsFetch() {

        // async request to get the Sharepoint list from the camp director
        addLoadingNewsArticleIndicator();

        $.getJSON("/Home/GetCampDirectorNewsFeed")
            .done(function (result) {
                removeLoadingNewsArticleIndicator();
                PopulateBlogListFromJsonObject(result);
            })
            .error(function (error) {
                removeLoadingNewsArticleIndicator();
                alert(error);
            });
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
                window.location = "/Home/JoinUs";
            }
            else if (ev.target.id == "slideshow-action-menuitem-volunteer") {
                window.location = "/Home/Volunteer";
            }
            else if (ev.target.id == "slideshow-action-menuitem-donate") {
                window.location = "/Home/Donate";
            }
        });
    }
    
    // public interface
    return {
        Initialize: function(){

            // Initialize the Nivo Slider
            $('#slider').nivoSlider();

            // Initialize slider action menu
            InitializeSlideractionMenu();

            InitiateNewsFetch();
        },
    };
}());


// ViewController will load data, populate the model 
// and render the view  after the doc is loaded.
$(document).ready(function(){
    
    SiteController.Initialize();
});