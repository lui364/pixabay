import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {


  private error$ = new Subject<String>();
  private terminoBusqueda$ = new Subject<string>();

  constructor(private http: HttpClient) { }

  setError(mensaje:string){
    this.error$.next(mensaje);
  }

  getError():Observable<any>{
    return this.error$.asObservable();
  }

  enviarTerminoBusqueda(termino:string){
    this.terminoBusqueda$.next(termino);
  }

  getTerminoBusqueda():Observable<string>{
    return this.terminoBusqueda$.asObservable();
  }

  getImagenes(termino: string,imagenesPorPagina:number, paginaActual:number):Observable<any>{
    const KEY = '34189891-4a64cff8cb27f18801238b9b8';
    const URL = 'https://pixabay.com/api/?key='+ KEY +'&q=' + termino + '&per_page='+imagenesPorPagina + '&page='+paginaActual;
   return this.http.get(URL);
  }

}
