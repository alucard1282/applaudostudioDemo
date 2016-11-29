using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace applaudoDEMO.Models
{
    public class clperson {

        [Required]
        [JsonProperty(PropertyName ="id")]
        public int Id { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 1)]
        [JsonProperty(PropertyName = "first")]
        public string FirstName { get; set; }

        [Required]
        [StringLength(100, MinimumLength =1)]
        [JsonProperty(PropertyName = "last")]
        public string LastName { get; set; }

        public clperson(){
        }

        public clperson(int idparam, string firstparam, string lastparam) {
            this.Id = idparam;
            this.FirstName = firstparam;
            this.LastName = lastparam;
        }
    }
}
