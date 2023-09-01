import { Routes } from "@angular/router";
import { IndexComponent } from "./components/index/index.component";


export const datosRoutes: Routes =  [ 
    {
        path: 'datos/index',
        component: IndexComponent,
        loadChildren: () => import('./datos.module').then(m => m.DatosModule)
    }
];