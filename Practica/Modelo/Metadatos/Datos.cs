using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modelo.Modelos
{
    [MetadataType(typeof(DatosMetadata))]
    public partial class Datos
    {

    }

    public class DatosMetadata
    {
        [Required]
        [StringLength(10)]
        public string cedula { get; set; }
        [Required]
        [StringLength(50)]
        public string nombre { get; set; }
        [Required]
        [StringLength(50)]
        public string apellido { get; set; }
        [Required]
        [StringLength(50)]
        [EmailAddress]
        public string email { get; set; }
    }
}
