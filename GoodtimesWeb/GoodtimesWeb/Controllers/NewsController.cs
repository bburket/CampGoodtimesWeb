using GoodtimesWeb.Services;
using Newtonsoft.Json;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;


namespace GoodtimesWeb.Controllers
{
    public class NewsController : Controller
    {
        ISharepointService sharepointService;

        public NewsController(ISharepointService sharepointService)
        {
            this.sharepointService = sharepointService;
        }

        //
        // GET: /News/
        public async Task<ActionResult> Index()
        {
            return View();
        }

        public async Task<ActionResult> GetCampDirectorNewsFeed()
        {
            string url = ConfigurationManager.AppSettings["CampDirectorNewsItemsRssFeed"];

            var feeds = await this.sharepointService.GetDirectorNewsFeedAsync(url);
            feeds.OrderByDescending(article => article.PublishedOnGmt);
            var content = JsonConvert.SerializeObject(feeds);
            return Content(content);
        }
    }
}
