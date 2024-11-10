import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { CausaBenefica } from '../models/CausaBenefica';

@Injectable({
  providedIn: 'root'
})
export class CausaBeneficaService {

  private http = inject(HttpClient);
  private apiUrl:string = appsettings.apiUrl;

  constructor() { }

  getCausasBeneficas() {
    return this.http.get<CausaBenefica[]>(`${this.apiUrl}/causas`);
  }

  saveCausaBenefica(causaBenefica:CausaBenefica) {
    return this.http.post<void>(`${this.apiUrl}`, causaBenefica);
  }

  donar(causaBenefica:CausaBenefica) {    
    return this.http.post<void>(`${this.apiUrl}/donate`, causaBenefica);
  }

  getCausasDonadas(direccionDonante:string) {
    return this.http.get<string[]>(`${this.apiUrl}/causas-donadas?wallet=${direccionDonante}`);
  }

  getBalance() {
    return this.http.get<number>(`${this.apiUrl}/balance`);
  }

  distribuirFondos() {
    return this.http.post<void>(`${this.apiUrl}/distribute`, null);
  }
}
