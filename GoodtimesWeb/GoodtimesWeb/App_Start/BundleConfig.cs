﻿using System.Web;
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

            bundles.Add(new ScriptBundle("~/bundles/external/jquery.slides").Include(
                "~/Scripts/external/jquery.slides{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/external/jquery.nivo.slider").Include(
                "~/Scripts/external/jquery.nivo.slider{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/Gallery").Include(
            "~/Scripts/Gallery/gallerycontroller.js",
            "~/Scripts/Gallery/galleryview.js"));

            bundles.Add(new ScriptBundle("~/bundles/HomePage").Include(
            "~/Scripts/Site/sitecontroller.js"));

            bundles.Add(new ScriptBundle("~/bundles/JoinUs").Include(
            "~/Scripts/Site/joinus.js"));

            bundles.Add(new ScriptBundle("~/bundles/Volunteer").Include(
            "~/Scripts/Site/volunteer.js",
            "~/Scripts/Site/tabButtons.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/site.css",
                "~/Content/slides2.css",
                "~/Content/gallery-menu-slides.css",
                "~/Content/jquery-ui.redmond.css"));

            bundles.Add(new StyleBundle("~/Content/SiteNewCss").Include(
                "~/Content/siteNew.css",
                "~/Content/JoinUs.css",
                "~/Content/tabButtons.css",
                "~/Content/volunteer.css"));

            bundles.Add(new StyleBundle("~/Content/css/nivo").Include(
                "~/Content/nivo/nivo-slider.css",
                "~/Content/nivo/themes/bar/bar.css",
                "~/Content/nivo/themes/dark/dark.css",
                "~/Content/nivo/themes/default/default.css",
                "~/Content/nivo/themes/light/light.css"));

        }
    }
}