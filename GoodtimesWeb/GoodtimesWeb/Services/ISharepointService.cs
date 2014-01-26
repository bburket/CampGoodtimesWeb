using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using GoodtimesWeb.Models.Sharepoint.Feeds;
using System.Threading.Tasks;

namespace GoodtimesWeb.Services
{
    public interface ISharepointService
    {
        Task<IEnumerable<NewsFromTheDirectorElement>> GetDirectorNewsFeedAsync(string newsFeedUrl);
    }
}
