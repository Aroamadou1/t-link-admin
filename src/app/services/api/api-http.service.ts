import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient,  } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiHttpService {
  headers = new HttpHeaders();
   options: any;

  constructor(
    private http: HttpClient
  ) {
    this.headers.append('enctype', 'multipart/form-data');
    this.headers.append('Content-Type', 'Application/json');
    this.headers.append('X-Request-With', 'XMLHttpRequest');

    this.options = { headers: this.headers };
  }

/**
 * 
 * @param path 
 */
   get(path: string) {
    return this.http.get<any>(environment.apiUrl + path, this.options).toPromise().then(
      (res: any) => {
        // console.log(path+ ': '+ JSON.stringify(res));
        return res;
      }
    );
  }


  /**
   * 
   * @param path 
   * @param data 
   */
   post(path: string, data: any) {
    return this.http.post<any>(environment.apiUrl + path, data, this.options).toPromise();
  }

  /**
   * 
   * @param path 
   * @param data 
   */
   put (path: string, data: any) {
    return this.http.put<any>(environment.apiUrl + path, data, this.options).toPromise();
  }


  /**
   * 
   * @param path 
   * @param id 
   */
   delete(path: string, id: number) {
    return this.http.delete<any>(environment.apiUrl + path +'/'+ id, this.options).toPromise();
  }


}



