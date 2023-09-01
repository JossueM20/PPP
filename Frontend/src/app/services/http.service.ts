import { Injectable } from '@angular/core';
import { Datos } from '../interfaces/datos';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class HttpService {

  constructor(
    private httpCliente: HttpClient
  ) { }

  LeerTodo(cantidad: number, pagina: number, textoBusqueda: string){
    let parametros = new HttpParams();
    parametros = parametros.append('cantidad', cantidad);
    parametros = parametros.append('pagina', pagina);
    parametros = parametros.append('textoBusqueda', textoBusqueda);

    return this.httpCliente.get('http://localhost:65334/api/datos', {params: parametros});
  }

  Crear(modelo: Datos){
    return this.httpCliente.post('http://localhost:65334/api/datos', modelo)
  }

  Actualizar(id: number, modelo: Datos) {
    return this.httpCliente.put('http://localhost:65334/api/datos' + `/${id}`, modelo)
  }

  Eliminar(ids: number[]){
    const option = {
      Headers: new HttpHeaders({
        'Content-Type': 'aplication/json'
      }),
      body: ids
    }
    return this.httpCliente.delete('http://localhost:65334/api/datos', option)
  }

}
