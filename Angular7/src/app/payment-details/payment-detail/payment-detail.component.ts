import { Component, OnInit, ViewChild } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html'
})
export class PaymentDetailComponent implements OnInit {
  @ViewChild('formDirective', {static: false}) public myNgForm: NgForm;
  PaymentDetailForm: FormGroup;
  constructor(private paymentService: PaymentDetailService, private fb: FormBuilder, private toastr: ToastrService) {
    this.PaymentDetailForm = fb.group({
      CardOwnerName: fb.control('', Validators.required),
      CardNumber: fb.control('', [Validators.maxLength(16), Validators.minLength(16), Validators.required]),
      ExpirationDate: fb.control('', [Validators.maxLength(5),Validators.minLength(5), Validators.required]),
      CVV: fb.control('', [Validators.maxLength(3), Validators.minLength(3), Validators.required])
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

  submit(formDirective: NgForm){
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
