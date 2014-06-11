using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OverOut.Controllers
{
    public class EmployeeController : Controller
    {
        //
        // GET: /Employee/

        [Authorize]
        public ActionResult Index()
        {
            return View();
        }

    }
}
