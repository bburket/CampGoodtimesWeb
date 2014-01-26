using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GoodtimesWeb.Services;
using System.Web.Mvc;
using Microsoft.Practices.Unity;

namespace GoodtimesWeb
{

    public class ServiceConfig
    {
        class SimpleDependencyResolver : IDependencyResolver
        {
            IUnityContainer container;
            IDependencyResolver current;
            public SimpleDependencyResolver(IUnityContainer container, IDependencyResolver current)
            {
                this.container = container;
                this.current = current;
            }

            public object GetService(Type serviceType)
            {
                object result = null;

                try 
                {
                    result = this.current.GetService(serviceType);
                }
                catch { }

                if (result == null)
                {
                    try
                    {
                        result = this.container.Resolve(serviceType);
                        if (result != null)
                        {
                            return result;
                        }
                    }
                    catch { }
                }
                return result;
            }

            public IEnumerable<object> GetServices(Type serviceType)
            {
                IEnumerable<object> result = null;
                try
                {
                    result = this.current.GetServices(serviceType);
                }
                catch { }

                if (result == null)
                {
                    try
                    {
                        result = this.container.ResolveAll(serviceType);
                        if (result != null)
                        {
                            return result;
                        }
                    }
                    catch { }
                }

                return result;
            }
        }

        public static void RegisterServices()
        {
            IUnityContainer container = new UnityContainer();
            
            container.RegisterType<ISharepointService, SharepointService>();
            
            System.Web.Mvc.DependencyResolver.SetResolver(new SimpleDependencyResolver(container, System.Web.Mvc.DependencyResolver.Current));
        }
    }
}