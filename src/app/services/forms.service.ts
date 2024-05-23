import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http:HttpClient) { }
  private baseUrl = 'http://localhost:4300'; 
  saveFormStructure(formFields: string[]): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/saveFormStructure`, formFields);
  }

  deleteForm(formId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/deleteForm/${formId}`);
  }

  getFormStructure(formId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getFormStructure/${formId}`);
  }

  submitFormData(formId: string, formData: any): Observable<any> {
    console.log('Form Data:', formData);  // Debug log
    return this.http.post(`${this.baseUrl}/submitFormData/${formId}`, formData, {responseType: 'text'});
  }

  getAllForms(){
    return this.http.get(`${this.baseUrl}/getAllForms`);
  }

  getAllSubmissions(formId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAllSubmissions/${formId}`);
  }


}