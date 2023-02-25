import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';


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

  private refreshRequired = new Subject<void>();
  get RefreshRequired() {
    return this.refreshRequired;
  }
  constructor(private http: HttpClient) { }

  getData(field: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${field}`);
  }

  getItemById(field: string, id: number): Observable<any> {
    const url = `${this.apiUrl}/${field}/${id}`;
    return this.http.get<any>(url);
  }

  addItem(item: any, field: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${field}`, item, httpOptions);
  }

  deleteItem(item: any, field: string): Observable<any> {
    const url = `${this.apiUrl}/${field}/${item.id}`;
    return this.http.delete<any>(url);
  }

  updateItem(item: any, field: string): Observable<any> {
    const url: string = `${this.apiUrl}/${field}/${item.id}`;
    return this.http.put<any>(url, item, httpOptions);
  }

  patchItem(item: any, field: string): Observable<any> {
    const url: string = `${this.apiUrl}/${field}`;
    return this.http.patch<any>(url, item, httpOptions).pipe(
      tap(() => this.refreshRequired.next())
    );
  }
}


