using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GoodtimesWeb.Controllers
{
    public class WhatWeDoController : Controller
    {
        /*
        /WhatWeDo - what we do summary page. Show Camps partial, Events partial & Scholarships partial
        /WhatWeDo/Camps/Goodtimes - Goodtimes details
        /WhatWeDo/Camps/Kayak - Kayak camp details
        /WhatWeDo/Camps/Ski - Ski camp details
        /WhatWeDo/Events?id=<eventName> details for an event
        /WhatWeDo/Scholorships details for Scholorships
         */


        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Camps(string campName)
        {
            if (!string.IsNullOrWhiteSpace(campName))
            {
                if (campName.Equals("GoodTimes", StringComparison.OrdinalIgnoreCase))
                {
                    return View("Goodtimes");
                }
                else if (campName.Equals("Kayak", StringComparison.OrdinalIgnoreCase))
                {
                    return View("Kayak");
                }
                else if (campName.Equals("Ski", StringComparison.OrdinalIgnoreCase))
                {
                    return View("Ski");
                }
            }

            return RedirectToAction("Index", "WhatWeDo");
        }

        public ActionResult Events(string id)
        {
            return RedirectToAction("Index", "WhatWeDo");
        }

        public ActionResult Scholorships()
        {
            return RedirectToAction("Index", "WhatWeDo");
        }
        
    }
}
