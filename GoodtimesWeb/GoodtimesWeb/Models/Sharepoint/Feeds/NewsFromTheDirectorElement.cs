using System;

namespace GoodtimesWeb.Models.Sharepoint.Feeds
{
    public class NewsFromTheDirectorElement
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public string Description { get; set; }
        public bool IsVisible { get; set; }
        public DateTime PublishedOnGmt { get; set; }
    }
}