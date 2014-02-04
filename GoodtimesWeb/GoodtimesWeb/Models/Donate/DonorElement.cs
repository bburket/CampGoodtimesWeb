using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GoodtimesWeb.Models.Donate
{
    public class DonorElement
    {
        public DateTime Date { get; set; }
        public string Donor { get; set; }
        public string InHonorOf { get; set; }
    }
}