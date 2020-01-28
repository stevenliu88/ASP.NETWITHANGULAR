import { Injectable } from '@angular/core';
import { PaymentDetail } from './payment-detail.model';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {
  formData: PaymentDetail;
  readonly rootURL = 'http://localhost:1340/api';
  constructor(private httpClient: HttpClient) { }

  postPaymentDetail(formData: PaymentDetail) {
    return this.httpClient.post( this.rootURL + '/PaymentDetail' , formData);
  }
}
