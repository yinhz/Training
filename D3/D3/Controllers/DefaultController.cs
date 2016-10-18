using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace D3.Controllers
{
    public class DefaultController : Controller
    {
        // GET: Default
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult SelectorDemo()
        {
            return View();
        }

        public ActionResult EnterUpdateExitDemo()
        {
            return View();
        }

        public ActionResult D3ArrayMethod()
        {
            return View();
        }
    }
}