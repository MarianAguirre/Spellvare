import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  private apiKey = '53032896-1317699b5d952d3579ac8a253'; // 🔑 Tu clave de Pixabay
  private apiUrl = 'https://pixabay.com/api/';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene una imagen aleatoria simple y descriptiva desde Pixabay
   */
  getRandomImage(query: string): Observable<any> {
    // Pixabay usa estos parámetros
    const params = new HttpParams()
      .set('key', this.apiKey)
      .set('q', query)
      .set('image_type', 'vector')
      .set('orientation', 'horizontal')
      .set('safesearch', 'true')
      .set('lang', 'es')
      .set('per_page', 10); // 🔹 Traemos hasta 10 para elegir una aleatoria

    return this.http.get(this.apiUrl, { params });
  }
}
