using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using io = System.IO;
using Newtonsoft;
namespace GoodtimesWeb.Controllers
{
    class Element
    {
        public string Name { get; set; }
        public int Age { get; set; }
    }
    public class WhoWeAreController : Controller
    {
        //
        // GET: /WhoWeAre/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetStaffJson()
        {
            var path = Server.MapPath("/Content/StaffData/staff.json");
            if (!io.File.Exists(path))
            {
                return View();
            }

            using (io.StreamReader reader = new io.StreamReader(path))
            {
                var result = reader.ReadToEnd();
                return Content(result, "text/json");
            }
       }
    }
}
