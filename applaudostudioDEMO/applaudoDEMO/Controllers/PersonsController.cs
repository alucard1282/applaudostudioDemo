using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using applaudoDEMO.Models;

namespace applaudoDEMO.Controllers
{
    [EnableCors(origins: "http://localhost:56712", headers:"*", methods:"*"), RoutePrefix("api/persons")]
    public class PersonsController : ApiController
    {
        private static List<clperson> personList = new List<clperson>() {
            new clperson() { Id = 1, FirstName = "juan", LastName = "Fernandez" },
            new clperson() { Id = 2, FirstName = "Christ", LastName = "Fernandez" },
            new clperson() { Id = 3, FirstName = "nelson", LastName = "Fernandez" },
            new clperson() { Id = 4, FirstName = "Christian", LastName = "Caraballo" }
        };

        [HttpGet]
        public List<clperson> Getperson() {
            return personList;
        }

        [HttpGet]
        public clperson Getperson(int id) {
            return personList.Where(x => x.Id == id).FirstOrDefault();
        }

        [HttpPost]
        public HttpResponseMessage Postperson(clperson person) {
            clperson personAUX;
            person.Id = personList.Count + 1;
            personList.Add(person);

            return Request.CreateResponse(HttpStatusCode.OK,person);
        }

        [HttpPut]
        public HttpResponseMessage Putperson(int id, clperson person) {
            clperson personAUX;

            personAUX = personList.Where(x => x.Id == id).FirstOrDefault();

            if (personAUX != null)
            {
                personAUX.FirstName = person.FirstName;
                personAUX.LastName = person.LastName;
            }
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpDelete]
        public bool Deleteperson(int id) {
            return personList.Remove(personList.Where(x => x.Id == id).FirstOrDefault());
        }
    }
}
