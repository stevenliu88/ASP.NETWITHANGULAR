import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { ReplaySubject } from 'rxjs';


@Component({
  selector: 'app-payment-detail-list',
  templateUrl: './payment-detail-list.component.html',
  styles: []
})
export class PaymentDetailListComponent implements OnInit {
  public paymentDetails: PaymentDetail[];
  paymentDetail: PaymentDetail;
  @Output() formDataValue: EventEmitter<string> = new EventEmitter<string>();
  // private _paymentDetailDataSource = new ReplaySubject<PaymentDetail>();
  // public paymentDetailValue$ = this._paymentDetailDataSource.asObservable();
  constructor(public paymentService: PaymentDetailService) { }

  ngOnInit() {
   this.getData();
   this.paymentService.currentPaymentDetail.subscribe(paymentDetail => this.paymentDetail = paymentDetail);
  }

  getData() {
    this.paymentService.getPaymentDetails().subscribe(
      res => {
        this.paymentDetails = res;
      }
      );
  }
  populateForm(pd: PaymentDetail) {
    this.paymentService.changePaymentDetail(pd);
  }
}
