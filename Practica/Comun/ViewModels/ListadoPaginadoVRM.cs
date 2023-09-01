using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Comun.ViewModels
{
    public class ListadoPaginadoVRM<T>
    {
        public int cantidadTotal { get; set; }
        public IEnumerable<T> elemento { get; set; }

        public ListadoPaginadoVRM()
        {
            elemento = new List<T>();
            cantidadTotal = 0;
        }

    }
}
