// joinus.js
// copyright 2014, mikedice417@hotmail.com

var JoinUsController = (function () {


    // public interface
    return {
        Initialize: function () {
            $("#join-us-camps-and-events-button").click(function () {
                document.location = "/WhatWeDo";
            });
        },
    };
}());

// ViewController will load data, populate the model 
// and render the view  after the doc is loaded.
$(document).ready(function () {

    JoinUsController.Initialize();
});