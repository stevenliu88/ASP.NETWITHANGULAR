import { Component, OnInit, ViewChild } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html'
})
export class PaymentDetailComponent implements OnInit {
  @ViewChild('formDirective', {static: false}) public myNgForm: NgForm;
  PaymentDetailForm: FormGroup;
  paymentDetail: PaymentDetail;
  constructor(private paymentService: PaymentDetailService, private fb: FormBuilder, private toastr: ToastrService) {
    this.PaymentDetailForm = fb.group({
      CardOwnerName: fb.control('', Validators.required),
      CardNumber: fb.control('', [Validators.maxLength(16), Validators.minLength(16), Validators.required]),
      ExpirationDate: fb.control('', [Validators.maxLength(5), Validators.minLength(5), Validators.required]),
      CVV: fb.control('', [Validators.maxLength(3), Validators.minLength(3), Validators.required])
    });
   }

  ngOnInit() {
      this.prefillPaymentDetail();
  }

  get CardOwnerName(): AbstractControl {
    return this.PaymentDetailForm.get('CardOwnerName');
  }

  get CardNumber(): AbstractControl {
    return this.PaymentDetailForm.get('CardNumber');
  }

  get ExpirationDate(): AbstractControl {
    return this.PaymentDetailForm.get('ExpirationDate');
  }

  get CVV(): AbstractControl {
    return this.PaymentDetailForm.get('CVV');
  }

  get paymentDetailFormValidation() {
    return this.PaymentDetailForm.invalid;
  }

  prefillPaymentDetail() {
    this.paymentService.currentPaymentDetail.subscribe(paymentDetail => {
      if (paymentDetail !== null && Object.keys(paymentDetail).length > 0) {
        this.PaymentDetailForm.setValue({
          CardOwnerName: paymentDetail.cardOwnerName,
          CardNumber: paymentDetail.cardNumber,
          ExpirationDate: paymentDetail.expirationDate,
          CVV: paymentDetail.cvv
        });
      }
    });

  }
  submit(formDirective: NgForm) {
    this.paymentService.postPaymentDetail(this.PaymentDetailForm.value).subscribe(
      res => {
        this.myNgForm.resetForm();
        this.toastr.success('Submitted successfully', 'Payment Detail Register');
      },
      err => {
        this.toastr.error('Unsuccessfully Submit', 'Error Occurred');
      }
    );
  }
}
