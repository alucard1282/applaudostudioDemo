﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.Net.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using System.Web.Http.ModelBinding;

namespace applaudoDEMO.Filters
{
    public class ModelFilter : ActionFilterAttribute {

        public override void OnActionExecuting(HttpActionContext actionContext) {
            if (!actionContext.ModelState.IsValid) {
                actionContext.Response = actionContext.Request.CreateErrorResponse(HttpStatusCode.BadRequest,actionContext.ModelState);
            }
        }
    }
}