import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
texto = '';
mostrar = false;
suscripcion: Subscription;

constructor(private _imagenImagen: ImagenService){
 this.suscripcion = this._imagenImagen.getError().subscribe(data =>{
  this.mostrarMensaje();
  this.texto = data;  
 });
 }

 ngOnDestroy():void{
  this.suscripcion.unsubscribe;
 }

 mostrarMensaje(){
  this.mostrar = true;
  setTimeout(() =>{
  this.mostrar = false;
  },2000)
 }
}
