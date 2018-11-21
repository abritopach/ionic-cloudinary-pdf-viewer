import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Cloudinary } from '@cloudinary/angular-5.x';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryApiService {


  constructor(private http: HttpClient, private cloudinary: Cloudinary) { }

  fetchPDFs(): Observable<any[]> {
    // instead of maintaining the list of images, we rely on the 'pdf' tag
    // and simply retrieve a list of all images with that tag.
    const url = this.cloudinary.url('pdf', {
        format: 'json',
        type: 'list',
        // cache bust (lists are cached by the CDN for 1 minute)
        // *************************************************************************
        // Note that this is practice is DISCOURAGED in production code and is here
        // for demonstration purposes only
        // *************************************************************************
        version: Math.ceil(new Date().getTime() / 1000)
    });

    return this.http
        .get<any[]>(url)
        .pipe(map((data: any) => data.resources ));
  }
}
