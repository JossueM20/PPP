import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from 'src/app/services/http.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { FormComponent } from '../form/form.component';
import { Datos } from 'src/app/interfaces/datos';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  displayedColumns: string[] = ['cedula', 'nombre', 'apellido', 'email', 'accion'];
  dataSource = new MatTableDataSource<any>([]);

  cantidadTotal = 0;
  cantidadPorPagina = 10;
  numeroDePagina = 0;
  opcionesDePaginado = [1, 5, 10, 25, 50 ,100];
  textoBusqueda = '';

  constructor(
    private httpService: HttpService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
    this.LeerTodo();
  }

  LeerTodo(){
    this.httpService.LeerTodo(this.cantidadPorPagina, this.numeroDePagina, this.textoBusqueda)
    .subscribe((respuesta: any) => {
      this.dataSource.data = respuesta.datos.elemento;
      this.cantidadTotal = respuesta.datos.cantidadTotal;
    });
  }

  cambiarPagina(event: any){
    this.cantidadPorPagina = event.pageSize;
    this.numeroDePagina = event.pageIndex
    this.LeerTodo();
  }

  Eliminar(id: number, even: Event){
    event?.stopPropagation();
    let confirmacion = confirm('¿Está seguro/a de eliminar este elemento?');
    if (confirmacion) {
      let ids = [id];
      this.httpService.Eliminar(ids)
      .subscribe((resuesta) => {
        this.toastr.success('Elemento eliminado satisfactoriamente', 'Confirmación')
        this.LeerTodo();
      });
    }

  }

  crearDialog() {
    this.dialog.open(FormComponent, {
      disableClose: true,
      width: "450px"
    }).afterClosed().subscribe(resultado =>{
      if(resultado === "creado"){
        this.LeerTodo();
      }
    })
  }

  editarDialog(modelo: Datos) {
    this.dialog.open(FormComponent, {
      disableClose: true,
      width: "450px",
      data: modelo
    }).afterClosed().subscribe(resultado =>{
      if(resultado === "editado"){
        this.LeerTodo();
      }
    })
  }
  
}
