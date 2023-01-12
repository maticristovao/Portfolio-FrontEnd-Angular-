import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../Person';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class PersonalInfoService {
  private apiUrl = 'http://localhost:5000/user';


  constructor(private http:HttpClient) { }

  getData():Observable<any>{
    return this.http.get(this.apiUrl);
  }
}
