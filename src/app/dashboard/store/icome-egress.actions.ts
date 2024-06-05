import { IcomeEgress } from '@models/ingreso-egreso.model';
import { createAction, props } from '@ngrx/store';

export const unSetItems = createAction('[IcomeEgress] Set Items');
export const setItems = createAction('[IcomeEgress] Unset Items',
  props<{ items: IcomeEgress[] }>()
);


