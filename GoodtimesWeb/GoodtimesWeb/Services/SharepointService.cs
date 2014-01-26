using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GoodtimesWeb.Models.Sharepoint.Feeds;
using System.Threading.Tasks;
using System.Net;
using System.Net.Http;
using System.Xml;
using System.Xml.Linq;
using System.Xml.XPath;
using HtmlAgilityPack;

namespace GoodtimesWeb.Services
{
    public class SharepointService : ISharepointService
    {
        public Task<IEnumerable<NewsFromTheDirectorElement>> GetDirectorNewsFeedAsync(string newsFeedUrl)
        {
            var tcs = new TaskCompletionSource<IEnumerable<NewsFromTheDirectorElement>> ();

            var wc = new WebClient();
            wc.DownloadStringCompleted += (sender, e) =>
            {
                try
                {
                    var feed = new List<NewsFromTheDirectorElement>();
                   
                    XDocument doc = XDocument.Parse(e.Result);
                    var items = doc.Root.XPathSelectElements("channel/item");
                    foreach (var item in items)
                    {
                        feed.Add(ParseNewsFromTheDirectorFeedItem(item));
                    }
                    tcs.SetResult(feed.AsReadOnly());
                }
                catch (Exception exception)
                {
                    tcs.SetException(exception);
                }
            };

            wc.DownloadStringAsync(new Uri(newsFeedUrl));
            return tcs.Task;
        }

        private NewsFromTheDirectorElement ParseNewsFromTheDirectorFeedItem(XElement feedXml)
        {
            var htmlDoc = new HtmlDocument();
            htmlDoc.LoadHtml(feedXml.Element("description").Value);
            var feedItem = new NewsFromTheDirectorElement();

            var result = htmlDoc.DocumentNode.SelectNodes("div/b[text()='Content:']");
            if (result.Any())
            {
                feedItem.Description = result.First().NextSibling.InnerText.Trim();
            }

            result = htmlDoc.DocumentNode.SelectNodes("div/b[text()='Visible on Website:']");
            if (result.Any())
            {
                feedItem.IsVisible = result.First().NextSibling.InnerText.Trim().ToLower().Equals("yes") ? true : false;
            }

            result = htmlDoc.DocumentNode.SelectNodes("div/b[text()='Created:']");
            if (result.Any())
            {
                feedItem.PublishedOnGmt = DateTime.Parse(result.First().NextSibling.InnerText.Trim());
            }

            result = htmlDoc.DocumentNode.SelectNodes("div/b[text()='Created By:']");
            if (result.Any())
            {
                feedItem.Author = result.First().NextSibling.InnerText.Trim();
            }

            result = htmlDoc.DocumentNode.SelectNodes("div/b[text()='Title:']");
            if (result.Any())
            {
                feedItem.Title = result.First().NextSibling.InnerText.Trim();
            }

            return feedItem;
        }
    }
}