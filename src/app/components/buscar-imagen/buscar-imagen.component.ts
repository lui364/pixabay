import { Component } from '@angular/core';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-buscar-imagen',
  templateUrl: './buscar-imagen.component.html',
  styleUrls: ['./buscar-imagen.component.css']
})
export class BuscarImagenComponent {
nombreImagen: string;

constructor(private _imagenservice:ImagenService){
  this.nombreImagen = '';
}

  buscarImagen(){

    if (this.nombreImagen === '') {
        this._imagenservice.setError('Agrega un texto de busqueda');
        return
    }
    this._imagenservice.enviarTerminoBusqueda(this.nombreImagen);
  }
}
