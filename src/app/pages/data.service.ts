import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly dataUrl = 'assets/data/data.json'; 

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>(this.dataUrl);
  }

  getDataById(id: any): Observable<any> {
    return this.http.get<any[]>(this.dataUrl).pipe(
      map((data: any) => data.find((item:any) => item.id === id))
    );
  }
}
