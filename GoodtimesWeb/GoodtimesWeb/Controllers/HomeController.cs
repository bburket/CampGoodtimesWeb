// Copyright 2014, mike@twopairadice.com

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

namespace GoodtimesWeb.Controllers
{
    public class HomeController : AsyncController
    {
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
        public void GetMikeDiceTestFeedAsync()
        {
            string url = ConfigurationManager.AppSettings["CampDirectorNewsItemsRssFeed"];

            AsyncManager.OutstandingOperations.Increment();
            try
            {
                WebClient wc = new WebClient();
                wc.DownloadStringCompleted += (sender, e) =>
                {

                    try
                    {
                        List<MikeDiceTestListElement> feed = new List<MikeDiceTestListElement>();
                        XDocument doc = XDocument.Parse(e.Result);
                        var items = doc.Root.XPathSelectElements("channel/item");

                        foreach (var item in items)
                        {
                            feed.Add(new MikeDiceTestListElement()
                            {
                                Title = item.Element("title").Value,
                                Author = item.Element("author").Value,
                                Description = item.Element("description").Value,
                                PublishedOnGmt = DateTime.Parse(item.Element("pubDate").Value)

                            });
                        }

                        AsyncManager.Parameters["feed"] = feed;
                    }
                    finally
                    {
                        AsyncManager.OutstandingOperations.Decrement();
                    }
                };

                wc.DownloadStringAsync(new Uri(url));
            }
            catch
            {
                AsyncManager.OutstandingOperations.Decrement();
            }
        }

        public ActionResult GetMikeDiceTestFeedCompleted(IEnumerable<MikeDiceTestListElement> feed)
        {
            var content = JsonConvert.SerializeObject(feed);
            return Content(content);
        }
    }
}
