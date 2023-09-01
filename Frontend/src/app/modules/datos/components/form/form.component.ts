import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Datos } from 'src/app/interfaces/datos';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  formCrear: FormGroup;
  tituloAccion: string = "Nuevo Dato";
  botonAccion: string = "Guardar";


  constructor(
    private fb: FormBuilder,
    private dialogoCrear: MatDialogRef<FormComponent>,
    private HttpService: HttpService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: Datos

  ){
    this.formCrear = this.fb.group({
      cedula: ['', [Validators.required, Validators.maxLength(10)]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.required],
      })
  }

  CrearEditar(){
    const modelo: Datos = {
      id: 0,
      cedula: this.formCrear.value.cedula,
      nombre: this.formCrear.value.nombre,
      apellido: this.formCrear.value.apellido,
      email: this.formCrear.value.email
    }

    if(this.data == null){
      this.HttpService.Crear(modelo)
      .subscribe((respuesta: any) =>{
        this.toastr.success('Elemento creado satisfactoriamente', 'Confirmación')
        this.dialogoCrear.close("creado")
      })
    }
    else {
      this.HttpService.Actualizar(this.data.id, modelo)
      .subscribe((respuesta: any) => {
        this.toastr.success('Elemento editado satisfactoriamente', 'Confirmación')
        this.dialogoCrear.close("editado")
      })
    }
  }

  cargarDatos(){
    if(this.data){
      this.formCrear.patchValue({
        cedula: this.data.cedula,
        nombre: this.data.nombre,
        apellido: this.data.apellido,
        email: this.data.email
      })
      this.tituloAccion = "Editar dato";
    this.botonAccion = "Actualizar";
    }
    
  }


  ngOnInit(): void {
    this.cargarDatos();
  }
}
