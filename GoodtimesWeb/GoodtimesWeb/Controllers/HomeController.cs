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

        // GET: /Newsletter/
        public ActionResult Newsletter()
        {
            return View();
        }

        public ActionResult AboutUs()
        {
            return View();
        }

        public ActionResult ContactUs()
        {
            return View();
        }

        public ActionResult InKind()
        {
            return View();
        }

        public ActionResult InHonorOf()
        {
            return View();
        }

        public ActionResult DonateNow()
        {
            return View();
        }

        // Old school Async!
        public void GetCampDirectorNewsFeedAsync()
        {
            string url = ConfigurationManager.AppSettings["CampDirectorNewsItemsRssFeed"];

            AsyncManager.OutstandingOperations.Increment();

            try
            {
                this.sharepointService.GetDirectorNewsFeedAsync(url).ContinueWith((tc) => 
                {
                    if (tc.Status == TaskStatus.RanToCompletion)
                    {
                        AsyncManager.Parameters[FeedsKey] = tc.Result;
                    }
                    AsyncManager.OutstandingOperations.Decrement();
                });
            }
            catch
            {
                AsyncManager.Parameters[FeedsKey] = new List<NewsFromTheDirectorElement>();
            }
        }

        public ActionResult GetCampDirectorNewsFeedCompleted(IEnumerable<NewsFromTheDirectorElement> feeds)
        {
            if (feeds != null && feeds.Any())
            {
                var content = JsonConvert.SerializeObject(feeds);
                return Content(content);
            }
            else
            {
                return Content("");
            }
        }
    }
}
