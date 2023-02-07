import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class PersonalInfoService {
  private apiUrl = 'http://localhost:5000';


  constructor(private http:HttpClient) { }

  getData(field?:string):Observable<any>{
    return this.http.get(`${this.apiUrl}/${field}`);
  }

  addItem(item:any, field?:string):Observable<any>{
    console.log(item);
    return this.http.post<any>(`${this.apiUrl}/${field}`, item, httpOptions);
  }

  deleteItem(item:any, field?:string): Observable<any>{
    const url = `${this.apiUrl}/${field}/${item.id}`;
    return this.http.delete<any>(url);
  }
}
