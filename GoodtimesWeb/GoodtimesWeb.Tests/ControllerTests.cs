using System;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using GoodtimesWeb.Controllers;
using GoodtimesWeb.Services;
using GoodtimesWeb.Models.Sharepoint.Feeds;
using System.Threading.Tasks;
using System.Threading;
using Moq;
using System.Web.Mvc;
using Newtonsoft.Json;
using System.Linq;

namespace GoodtimesWeb.Tests
{
    [TestClass]
    public class ControllerTests
    {
        [TestMethod]
        public void TestGetCampeDirectorNewsFeed()
        {
            var homeController = CreateHomeController();
            var completedEvent = new AutoResetEvent(false);

            homeController.AsyncManager.Finished += (sender, ev) => completedEvent.Set();
            homeController.GetCampDirectorNewsFeedAsync();
            completedEvent.WaitOne();

            Assert.IsTrue(homeController.AsyncManager.Parameters.ContainsKey(HomeController.FeedsKey));
            Assert.IsNotNull(homeController.AsyncManager.Parameters[HomeController.FeedsKey]);
            var actionResult = homeController.GetCampDirectorNewsFeedCompleted(homeController.AsyncManager.Parameters[HomeController.FeedsKey] as IEnumerable<NewsFromTheDirectorElement>);
            Assert.IsNotNull(actionResult);
            Assert.IsTrue(actionResult is ContentResult);
            var contentResult = actionResult as ContentResult;
            
            
            Assert.IsNotNull(contentResult.Content);
            var list = JsonConvert.DeserializeObject<IEnumerable<NewsFromTheDirectorElement>>(contentResult.Content);
            Assert.IsNotNull(list);
            Assert.IsTrue(list.Any());
            Assert.IsTrue(list.First().Author.Equals("mike dice"));
        }


        private HomeController CreateHomeController()
        {
            var mockSharepointService = new Mock<ISharepointService>();

            List<NewsFromTheDirectorElement> testFeed = new List<NewsFromTheDirectorElement>()
            {
                new NewsFromTheDirectorElement()
                {
                    Author = "mike dice",
                    Title = "test feed item 1",
                    Description = "this is a test",
                    IsVisible = true,
                    PublishedOnGmt = DateTime.Now.ToUniversalTime()
                }
            };


            var tcs = new TaskCompletionSource<IEnumerable<NewsFromTheDirectorElement>>();
            tcs.SetResult(testFeed);
            
            mockSharepointService.Setup(m => m.GetDirectorNewsFeedAsync(It.IsAny<string>())).Returns(tcs.Task);

            return new HomeController(mockSharepointService.Object);
        }
    }
}
