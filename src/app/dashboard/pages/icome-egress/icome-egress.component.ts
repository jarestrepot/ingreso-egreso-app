import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthError } from '@auth/services/errorSevrice.class';
import { IcomeEgressService } from '@dashboard/services/icome-egress.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';
import { IcomeEgressInterface } from 'src/app/utils/interfaces/icomeEgress.interface';
import { ValidatorsCustom } from 'src/app/utils/validators/ValidatorsClass';
import { TypeIcomeEgrees } from 'src/app/utils/validators/enumTypes';
import * as uiStore from '@shared/ui.actions';

@Component({
  selector: 'app-icome-egress',
  templateUrl: './icome-egress.component.html',
  styleUrls: ['./icome-egress.component.css']
})
export class IcomeEgressComponent implements OnInit, OnDestroy {
  icomeEgressForm!: FormGroup;
  enumKeys:Array<string> = Object.keys(TypeIcomeEgrees);
  isLoading:boolean = false;
  #unSubscribed: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private icomeEgressService: IcomeEgressService,
    private store: Store<AppState>
  ){
    this.icomeEgressForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(5)]],
      amount: ['', [Validators.required, Validators.min(0.111)]],
      type: ['', [Validators.required, ValidatorsCustom.hasType()]]
    });
  }


  ngOnInit(): void {
    const subUi = this.store.select('ui').subscribe({
      next: ({ isLoading }) => {
        this.isLoading = isLoading
      }
    });

    this.#unSubscribed.push( subUi );
  }

  ngOnDestroy(): void {
    this.#unSubscribed.forEach( sub => sub.unsubscribe() );
  }


  async saveIcomeEgress(){
    if( this.icomeEgressForm.invalid ) {
      this.icomeEgressForm.markAllAsTouched();
      this.icomeEgressForm.reset()
      return;
    };

    this.store.dispatch( uiStore.isLoading() );

    let { description, amount, type } = this.icomeEgressForm.value;
    const model:IcomeEgressInterface = {
      description: description,
      amount: amount,
      type: type
    };

    if( await this.icomeEgressService.createIcomeEgress(model) ) {
      AuthError.getSwalSuccessMessage('Created sucessfull', 'Success');
    }else {
      // Cambiar a función statica
      const error = new AuthError('Error', 'Error creating Icome/Egress');
      // await error.getSwalModalError();
      this.icomeEgressForm.markAllAsTouched();
    }

    this.icomeEgressForm.reset();

    // setTimeout(() => {
    //   this.store.dispatch( uiStore.stopLoading() );
    // }, 4000);

    this.store.dispatch(uiStore.stopLoading());
  }
}
