using Comun.ViewModels;
using Modelo.Modelos;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Metadata.Edm;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Datos.DAL
{
    public class DatosDAL
    {
        public static ListadoPaginadoVRM<DatosVMR> LeerTodo(int cantidad, int pagina, string textoBusqueda)
        {
            ListadoPaginadoVRM<DatosVMR> resultado = new ListadoPaginadoVRM<DatosVMR>();

            using (var db = DbConexion.Create())
            {
                var query = db.Datos.Where(x => !x.borrado).Select(x => new DatosVMR
                {
                    id = x.id,
                    cedula = x.cedula,
                    nombre = x.nombre,
                    apellido = x.apellido,
                    email = x.email,
                });

                if (!string.IsNullOrEmpty(textoBusqueda))
                {
                    query = query.Where(x => x.cedula.Contains(textoBusqueda) || x.nombre.Contains(textoBusqueda));
                }

                resultado.cantidadTotal = query.Count();
                resultado.elemento = query
                    .OrderBy(x => x.id)
                    .Skip(pagina * cantidad)
                    .Take(cantidad)
                    .ToList();
            }
            return resultado;
        }

        /*public static DatosVMR LeerUno(long id)
        {
            using (var db = DbConexion.Create())
            {
                var query = db.Datos.Where(x => !x.borrado && x.id == id).Select(x => new DatosVMR
                {
                    id = x.id,
                    cedula = x.cedula,
                    nombre = x.nombre,
                    apellido = x.apellido,
                    email = x.email,
                });
            }
        }*/

        public static long Crear(Datos item)
        {
            using (var db = DbConexion.Create())
            {
                item.borrado = false;
                db.Datos.Add(item);
                db.SaveChanges();
            }
            return item.id;
        }
    }
}
