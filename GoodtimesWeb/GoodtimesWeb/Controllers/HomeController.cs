using GoodtimesWeb.Services;
using Newtonsoft.Json;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace GoodtimesWeb.Controllers
{
    public class HomeController : AsyncController
    {
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
