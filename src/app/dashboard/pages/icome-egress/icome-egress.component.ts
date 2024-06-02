import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthError } from '@auth/services/errorSevrice.class';
import { IcomeEgressService } from '@dashboard/services/icome-egress.service';
import { IcomeEgressInterface } from 'src/app/utils/interfaces/icomeEgress.interface';
import { ValidatorsClass } from 'src/app/utils/validators/ValidatorsClass';
import { TypeIcomeEgrees } from 'src/app/utils/validators/enumTypes';

@Component({
  selector: 'app-icome-egress',
  templateUrl: './icome-egress.component.html',
  styleUrls: ['./icome-egress.component.css']
})
export class IcomeEgressComponent {
  icomeEgressForm!: FormGroup;
  enumKeys:Array<string> = Object.keys(TypeIcomeEgrees);

  constructor(private fb: FormBuilder, private icomeEgressService: IcomeEgressService){
    this.icomeEgressForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(5)]],
      amount: ['', [Validators.required, Validators.min(0.111)]],
      type: ['', [Validators.required, ValidatorsClass.hasType()]]
    });
  }


  async saveIcomeEgress(){

    if( this.icomeEgressForm.invalid ) {
      this.icomeEgressForm.markAllAsTouched();
      this.icomeEgressForm.reset()
      return;
    };

    let { description, amount, type } = this.icomeEgressForm.value;
    const model:IcomeEgressInterface = {
      description: description,
      amount: amount,
      type: type
    };

    if( await this.icomeEgressService.createIcomeEgress(model) ) {
      AuthError.getSwalSuccessMessage('Created sucessfull', 'Success');
    }else {
      const error = new AuthError('Error', 'Error creating Icome/Egress');
      error.getSwalModalError();
      this.icomeEgressForm.markAllAsTouched();
    }

    this.icomeEgressForm.reset();

  }
}
