import { Injectable } from '@angular/core';
import { PaymentDetail } from './payment-detail.model';
import { HttpClient } from '@angular/common/http';
import {Observable, of, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {
  formData: PaymentDetail;
  private paymentDetailSource = new BehaviorSubject<PaymentDetail>(new PaymentDetail());
  currentPaymentDetail = this.paymentDetailSource.asObservable();
  readonly rootURL = 'http://localhost:1340/api';
  constructor(private httpClient: HttpClient) { }

  postPaymentDetail(formData: PaymentDetail) {
    return this.httpClient.post( this.rootURL + '/PaymentDetail' , formData);
  }
  getPaymentDetails(): Observable<PaymentDetail[]> {
    return this.httpClient.get<PaymentDetail[]>(this.rootURL + '/PaymentDetail');
  }
  changePaymentDetail(paymentDetail: PaymentDetail) {
    this.paymentDetailSource.next(paymentDetail);
  }
}
