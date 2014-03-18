using System.Web;
using System.Web.Optimization;

namespace GoodtimesWeb
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/external/jquery").Include(
                        "~/Scripts/external/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/external/jqueryui").Include(
                        "~/Scripts/external/jquery-ui{version}.js"));

            bundles.Add(new StyleBundle("~/Content/CSS/SiteMain").Include(
                "~/Content/CSS/site.css",
                "~/Content/CSS/pageheader.css",
                "~/Content/CSS/pagefooter.css"));
        }
    }
}