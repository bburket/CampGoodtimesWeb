using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Threading.Tasks;
using GoodtimesWeb.Models.Sharepoint.Feeds;
using System.Net;
using System.Net.Http;
using System.Xml;
using System.Xml.Linq;
using System.Xml.XPath;
using Newtonsoft.Json;
using System.Configuration;
using HtmlAgilityPack;
using GoodtimesWeb.Services;

namespace GoodtimesWeb.Controllers
{
    public class HomeController : AsyncController
    {
        public const string FeedsKey = "feeds";
        ISharepointService sharepointService;

        public HomeController(ISharepointService sharepointService)
        {
            this.sharepointService = sharepointService;
        }

        //
        // GET: /Home/
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult JoinUs()
        {
            return View();
        }

        public ActionResult Volunteer()
        {
            return View();
        }

        public ActionResult Donate()
        {
            return View();
        }

        public ActionResult WhoWeAre()
        {
            return View();
        }

        public ActionResult WhatWeDo()
        {
            return View();
        }
        
        public ActionResult News()
        {
            return View();
        }
        
        public ActionResult Connect()
        {
            return View();
        }

        public async Task<ActionResult> GetCampDirectorNewsFeedAsync()
        {
            string url = ConfigurationManager.AppSettings["CampDirectorNewsItemsRssFeed"];

            var feeds = await this.sharepointService.GetDirectorNewsFeedAsync(url);
            feeds.OrderByDescending(article => article.PublishedOnGmt);
            var content = JsonConvert.SerializeObject(feeds);
            return Content(content);
        }
    }
}
