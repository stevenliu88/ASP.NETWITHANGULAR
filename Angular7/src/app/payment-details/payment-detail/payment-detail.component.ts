import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styles:  ['./payment-detail.component.css']
})
export class PaymentDetailComponent implements OnInit {
  PaymentDetailForm :FormGroup;
  constructor(private paymentService: PaymentDetailService, private fb: FormBuilder) {
    this.PaymentDetailForm = fb.group({
      CardOwnerName: fb.control('', Validators.required),
      CardNumber: fb.control('', [Validators.maxLength(16),Validators.minLength(16),Validators.required]),
      ExpirationDate: fb.control('',[Validators.maxLength(5),Validators.minLength(5),Validators.required]),
      CVV: fb.control('',[Validators.maxLength(3),Validators.minLength(3),Validators.required])
    });
   }

  ngOnInit() {
  }

  get CardOwnerName(): AbstractControl{
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

  submit(){
    this.paymentService.postPaymentDetail(this.PaymentDetailForm.value).subscribe(
      res => {
        console.log(res);
      },
      err => {
      }
    )
  }
}
