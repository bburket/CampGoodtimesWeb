using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GoodtimesWeb.Services;
using GoodtimesWeb.Models.Sharepoint.Feeds;
using System.Configuration;
using System.Threading.Tasks;
using GoodtimesWeb.Models.WhatWeDo;

namespace GoodtimesWeb.Controllers
{
    public class WhatWeDoController : Controller
    {
        /*
        /WhatWeDo - what we do summary page. Show Camps partial, Events partial & Scholarships partial
        /WhatWeDo/Camps/Goodtimes - Goodtimes details
        /WhatWeDo/Camps/Kayak - Kayak camp details
        /WhatWeDo/Camps/Ski - Ski camp details
        /WhatWeDo/Events/EventName details for an event
        /WhatWeDo/Scholorships details for Scholorships
         */
        ISharepointService sharepointService;

        public WhatWeDoController(ISharepointService sharepointService)
        {
            this.sharepointService = sharepointService;
        }

        public ActionResult Index()
        {
            return View();
        }
        public ActionResult CampsPartial()
        {
            return PartialView("Camps/CampsPartial");
        }

        public ActionResult Camps(string campName)
        {
            if (!string.IsNullOrWhiteSpace(campName))
            {
                // TODO: need to get these camp dates from somewhere else
                if (campName.Equals("GoodTimes", StringComparison.OrdinalIgnoreCase))
                {
                    return View("Camps/Index", new CampsIndexViewModel()
                    {
                        SelectedCamp = "Goodtimes",
                        CampTitle = "Camp Goodtimes",
                        CampDate = "June 2014"
                    });
                }
                else if (campName.Equals("Kayak", StringComparison.OrdinalIgnoreCase))
                {
                    return View("Camps/Index", new CampsIndexViewModel()
                    {
                        SelectedCamp = "Kayak",
                        CampTitle = "Kayak Camp",
                        CampDate = "July 2014"

                    });
                }
                else if (campName.Equals("Ski", StringComparison.OrdinalIgnoreCase))
                {
                    return View("Camps/Index", new CampsIndexViewModel()
                    {
                        SelectedCamp = "Ski",
                        CampTitle = "Ski Camp",
                        CampDate = "Feb 2014"

                    });
                }

            }

            return View("Camps/Index");
        }

        public async Task<ActionResult> EventsPartial()
        {
            string url = ConfigurationManager.AppSettings["CampEventsRssFeed"];
            var result = await this.sharepointService.GetCampeEventsAsync(url);
            var selection = from d in result where d.ShowOnWebsite select d;
            return PartialView("Events/EventsPartial", new EventsViewModel() { EventsList = selection });
        }

        public async Task<ActionResult> Events(string eventName)
        {
            string url = ConfigurationManager.AppSettings["CampEventsRssFeed"];

            // We check the RSS feed first. The event has to be 'enabled' in order to display it.            
            var result = await this.sharepointService.GetCampeEventsAsync(url);
            var selection = from d in result where d.DetailsPageName.Equals(eventName, StringComparison.OrdinalIgnoreCase) select d;

            if (selection.Any())
            {
                return View("Events/Index", new EventsViewModel() { SelectedEvent = eventName });
            }

            return View("Events/Index", new EventsViewModel() { EventsList = result });
        }

        public ActionResult ScholarshipsPartial()
        {
            return PartialView("Scholarships/ScholarshipsPartial");
        }

        public ActionResult Scholarships()
        {
            return RedirectToAction("Index", "WhatWeDo");
        }
    }
}
