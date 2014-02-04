using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using io = System.IO;
using vb = Microsoft.VisualBasic.FileIO;
using GoodtimesWeb.Models.Donate;
namespace GoodtimesWeb.Controllers
{
    public class DonateController : Controller
    {
        //
        // GET: /Donate/
        public ActionResult Index()
        {
            List<DonorElement> donorsList = new List<DonorElement>();

            string path = Server.MapPath("/Content/DonationsData/Donations.csv");
            if (!io.File.Exists(path))
            {
                return View();
            }

            using (io.StreamReader reader = new io.StreamReader(path))
            {
                vb.TextFieldParser parser = new vb.TextFieldParser(reader);
                parser.SetDelimiters(new string[] { "," });
                string[] fields = null;

                do
                {
                    fields = parser.ReadFields();
                    if (fields != null)
                    {
                        if (fields.Any())
                        {
                            if (fields[0].Equals("Date", StringComparison.OrdinalIgnoreCase))
                            {
                                // skip headers
                                continue;
                            }
                            DateTime date = default(DateTime);
                            DateTime.TryParse(fields[0].Trim(), out date);
                            donorsList.Add(new DonorElement()
                            {
                                Date = date,
                                Donor = fields[1].Trim(),
                                InHonorOf = fields[2].Trim()
                            });

                        }
                        else
                        {
                            fields = null;
                        }
                    }
                } while (fields != null);

            }
            donorsList.OrderByDescending(el => el.Date);

            return View(donorsList);
        }

    }
}
