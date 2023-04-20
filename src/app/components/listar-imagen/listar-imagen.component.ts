import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-listar-imagen',
  templateUrl: './listar-imagen.component.html',
  styleUrls: ['./listar-imagen.component.css']
})
export class ListarImagenComponent {
  termino = '';
  suscription: Subscription;
  listImagen: any[] = [];
  loading = false;
  imagenesPorPagina = 30;
  paginaActual = 1;
  calcularTotalPaginas = 0;

  constructor(private _ImagenService: ImagenService){
    this.suscription = this._ImagenService.getTerminoBusqueda().subscribe(data =>{
      this.termino = data;
      this.paginaActual = 1;
      this.loading = true;
      this.obtenerImagen();
    })
  }

  obtenerImagen(){
    this._ImagenService.getImagenes(this.termino,this.imagenesPorPagina,this.paginaActual).subscribe(data =>{
      this.loading = false;
      

      if (data.hits.length === 0) {
        this._ImagenService.setError('Opss... No encontramos ningun resultado');
        return;
      }
       this.calcularTotalPaginas = Math.ceil(data.totalHits / this.imagenesPorPagina);


      this.listImagen = data.hits;
    },error =>{
      this._ImagenService.setError('Opss... Ocurrio un error');
      this.loading = false;
    });
  }

  paginaAnterior(){
    this.paginaActual --;
    this.loading = true;
    this.listImagen = [];
    this.obtenerImagen();
   }

   paginaSiguiente(){
    this.paginaActual ++;
    this.loading = true;
    this.listImagen = [];
    this.obtenerImagen();
   }

   paginaAnteriorClass(){
    if (this.paginaActual === 1) {    
      return false; 
    }else
    {
      return true;
    }
   }
   paginaSiguienteClass(){
    if (this.paginaActual === this.calcularTotalPaginas) {
      return false;
    }else{
      return true;
    }
   }
}
