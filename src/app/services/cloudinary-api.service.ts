import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { timeout, retryWhen, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryApiService {

  private readonly API_KEY = 'API_KEY';
  private readonly API_SECRET = 'API_SECRET';
  private readonly CLOUD_NAME = 'CLOUD_NAME';
  private readonly URL_BASE = `https://api.cloudinary.com/v1_1/${this.CLOUD_NAME}/resources/image/` +
  `upload/?prefix=`;

  constructor(private http: HttpClient) { }

  // https://483922833893113:c53WJgl-X0wT50Zhd6fuY6i5JQ0@api.cloudinary.com/v1_1/salsapp/resources/image/upload/?prefix=pdf-viewer

  fetchResourcesFromFolder(folder: string): Observable<any> {

    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(this.API_KEY + ':' + this.API_SECRET));
    headers = headers.append('Content-Type', 'application/json; charset=utf-8');

    return this.http
    // Type-checking the response => .get<any>
    .get<any>(this.URL_BASE + folder, {headers: headers})
    .pipe(
      retryWhen(error => error.pipe(delay(500))),
      timeout(5000)
    );
  }
}
