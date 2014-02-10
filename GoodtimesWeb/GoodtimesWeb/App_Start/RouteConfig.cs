using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace GoodtimesWeb
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Camps",
                url: "WhatWeDo/Camps/{campName}",
                defaults: new { controller = "WhatWeDo", action = "Camps" }
            );

            routes.MapRoute(
                name: "Events",
                url: "WhatWeDo/Events/{eventName}",
                defaults: new { controller = "WhatWeDo", action = "Events" }
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}