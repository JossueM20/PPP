using AccesoDatos.DAL;
using Comun.ViewModels;
using Modelo.Modelos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logica.BLL
{
    public  class DatosBLL
    {
        public static ListadoPaginadoVRM<DatosVMR> LeerTodo(int cantidad, int pagina, string textoBusqueda)
        {
            return DatosDAL.LeerTodo(cantidad, pagina, textoBusqueda);
        }

        public static DatosVMR LeerUno(long id)
        {
            return DatosDAL.LeerUno(id);
        }

        public static long Crear(Datos item)
        {
            return DatosDAL.Crear(item);

        }

        public static void Actualizar(DatosVMR item)
        {
            DatosDAL.Actualizar(item);
        }

        public static void Eliminar(List<long> ids)
        {
            DatosDAL.Eliminar(ids);
        }


    }
}
