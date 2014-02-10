using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GoodtimesWeb.Models.Sharepoint.Feeds;

namespace GoodtimesWeb.Models.WhatWeDo
{
    public class EventsViewModel
    {
        public IEnumerable<CampEventElement> EventsList;
        public string SelectedEvent { get; set; }
    }
}