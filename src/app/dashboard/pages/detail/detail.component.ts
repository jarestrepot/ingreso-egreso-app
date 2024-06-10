import { Component, OnDestroy, OnInit } from '@angular/core';
import { SwalHelpers } from '@auth/services/SwalHelpers';
import { IcomeEgressService } from '@dashboard/services/icome-egress.service';
import { IcomeEgress } from '@models/ingreso-egreso.model';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {

  icomeEgress:IcomeEgress[] = [];
  someProperty: keyof IcomeEgress = 'type';
  #unSubscribeItems!: Subscription;
  sortReverse:boolean = false;
  constructor(private store: Store<AppState>, private icomeEgressService: IcomeEgressService){}

  ngOnInit(): void {
    this.#unSubscribeItems = this.store.select('icomeEgress')
      .subscribe({
        next: ({ icomeEgress }) => this.icomeEgress = icomeEgress,
        error: ( error ) => console.error( error )// Lanzar error
      })
  }

  async deleteItem(id: string){
    const swal = new SwalHelpers();
    try {
      const itemDelete = this.icomeEgress.find( item => item.uid === id );
      await this.icomeEgressService.deleteIcomeEgress(id);
      // Llamar acción de mensaje
      swal.showAlert({
        icon: 'success',
        title: `Elemento eliminado`,
        text: `Elemento ${itemDelete?.type} con valor de ${itemDelete?.amount} eliminado correctamente`,
      })
    } catch (error) {
      // llamar acción de error
      swal.showAlert({
        icon: 'warning',
        title: 'Error',
        text: 'Error en la eliminación del elemento!'
      })
    }
  }

  ngOnDestroy(): void {
    this.#unSubscribeItems.unsubscribe();
  }

  sortProperty(property: keyof IcomeEgress ):void{
    if( this.someProperty === property ){
      this.sortReverse = !this.sortReverse;
    }else{
      this.someProperty = property;
      this.sortReverse = false;
    }
  }
}
