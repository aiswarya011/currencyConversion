import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  key = '797372eb36b5f44cde7b98e4'
  constructor(private http: HttpClient) { }

  getAllCurrency(): Observable<any> {
    return this.http.get(`https://v6.exchangerate-api.com/v6/${this.key}/latest/PLN`)
  }

  getConversionRates(from: string, to: string): Observable<any> {
    return this.http.get(`https://v6.exchangerate-api.com/v6/${this.key}/pair/${from}/${to}`)
  }

  register(body: any): Observable<any> {
    return this.http.post('http://localhost:3000/user', body)
  }

  checkUserExists(email: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/user?email=${email}`);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(`http://localhost:3000/user?email=${email}&password=${password}`)
  }

  getUserHistory(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/history?userId=${userId}`);
  }

  addToHistory(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/history', data);
  }
}
