// sitecontroller.js
// copyright 2014, mikedice417@hotmail.com

var SiteController = (function(){

    var currentGalleryImageList = null;
    var myTumblrApiKey = "8MWvCeFxkM3y1VY2WdfISKfrD5cNN06QCeiYhHTMZpTvtcgJbr";
    //var myTumblrBlogUri = "inthecompanyofwolvess.tumblr.com";
    var myTumblrBlogUri = null;
    
    function BlogJsonLoaded(blogJson) {

        // enumerate blogJson.response.posts. See tumblr api docs for format
        // if there are articles to show then $("#blog-feed-container").show();
    }

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
            $.getJSON("Home/GetMikeDiceTestFeed")
                .done(function (result) {
                    PopulateBlogListFromJsonObject(result);
                })
                .error(function (error) {
                    alert(error);
                });
            

            // hide blog feed unless there are articles to display
            $("#blog-feed-container").hide();
            
            if (myTumblrBlogUri != null) {
                
                // try to load blog list. use jsonp
                $.ajax({
                    url: "http://api.tumblr.com/v2/blog/" + myTumblrBlogUri + "/posts",
                    data: {
                        "api_key": myTumblrApiKey
                    },
                    dataType: "jsonp",
                    jsonp: "jsonp"
                 }).success(BlogJsonLoaded);
            }

            // Load the gallery list
            $.getJSON("images/galleryIndex.json")
            .done(function(result){
                var list = result;
                GalleryMenuSlider.Initialize(list);
                SiteView.Initialize(list);        
            }).error(function(result){
                
            });
        },
        
        ShowGallery: function(galleryJsonUrl)
        {
            // download gallery JSON
            $.getJSON(galleryJsonUrl)
                .done(function(result){

                currentGalleryImageList = result;

            }).error(function(result){
                // todo: handle error            
            });
        },
        
        ShowThumbnails: function(galleryJsonUrl)
        {
            // download gallery JSON
            $.getJSON(galleryJsonUrl)
                .done(function(result){

                currentGalleryImageList = result;

                // download partial view for gallery and tell the site view
                // to switch the splash screen
                $.ajax({
                    url: "gallery-thumbnail.html"
                }).done(function(result){
                    SiteView.SetThumbnailView(result, currentGalleryImageList);    
                }).error(function(result){
                    // todo: handle error            
                });
            });
        },
        HomeLinkClicked: function()
        {
            SiteView.ShowHomePage();
        },
        ContactUsLinkClicked: function()
        {
            alert("Created Jan 11, 2014 - mikedice417@hotmail.com");
        }
    };
}());


// ViewController will load data, populate the model 
// and render the view  after the doc is loaded.
$(document).ready(function(){
    
    SiteController.Initialize();
});