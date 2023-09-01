import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { globalRoutes } from './modules/global/global.routing';
import { datosRoutes } from './modules/datos/datos.routing';


@NgModule({
  imports: [
    RouterModule.forChild([
      ...globalRoutes,
      ...datosRoutes
    ])],
    exports: [RouterModule]
    
})
export class RutasModule { }
