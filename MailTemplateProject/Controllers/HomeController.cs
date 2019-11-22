using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MailTemplateProject.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }


        public JsonResult setSendMail(MailModel postModel)
        {
            //postModel.Icerik = Server.HtmlDecode(postModel.Icerik);
            var islem = SendMail.Send(postModel);

            return Json(islem);
        }
    }
}