// news.js
// copyright 2014, mikedice417@hotmail.com

var NewsController = (function () {

    function BeginLoadNewsArticles()
    {
        // async request to get the Sharepoint list from the camp director
        addLoadingNewsArticleIndicator();

        $.getJSON("/News/GetCampDirectorNewsFeed")
            .done(function (result) {
                removeLoadingNewsArticleIndicator();
                FinishLoadNewsArticles(result);
            })
            .error(function (error) {
                removeLoadingNewsArticleIndicator();
                alert(error);
            });
    }

    function FinishLoadNewsArticles(result)
    {
        $("#news-page-container").empty();
        for (i = 0; i < result.length; i++) {

            if (result[i].IsVisible) {
                
                $("#news-page-container").append(
                    $("<div>")
                        .append($("<h2>").html(result[i].Title).addClass("news-page-article-title"))
                        .append($("<h4>").html(result[i].EventDate).addClass("news-page-article-date"))
                        .append($("<p>").html(result[i].Description).addClass("news-page-aricle-description"))
                    );
                }
        }

    }

    function addLoadingNewsArticleIndicator()
    {
        $("#news-page-container").append(
                            $("<div>")
                                .addClass("news-page-loading-box")
                                .attr("id", "news-page-loading-box")
                                .append($("<div>")
                                            .addClass("news-apge-loading-title")
                                            .html("Loading news articles...")
                                        )
                                .append($("<img>")
                                            .attr("src", "/Content/images/layout/goodtimes-loading.gif")
                                        ));
    }

    function removeLoadingNewsArticleIndicator()
    {
        $("#news-page-loading-box").remove();
    }

    // public interface
    return {
        Initialize: function () {
            BeginLoadNewsArticles();
        },
    };
}());

// ViewController will load data, populate the model 
// and render the view  after the doc is loaded.
$(document).ready(function () {

    NewsController.Initialize();
});

