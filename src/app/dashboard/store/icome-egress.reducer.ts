import { createReducer, on } from '@ngrx/store';
import * as ActinosIE from './icome-egress.actions';
import { IcomeEgress } from '@models/ingreso-egreso.model';
import { AppState } from 'src/app/store/app.reducer';

export interface StateIcomeEgress {
  icomeEgress: IcomeEgress[];
}


export const initialState: StateIcomeEgress = {
  icomeEgress: []
}

export const icomeEgressReducer = createReducer(initialState,
  on(ActinosIE.setItems, (state, { items }) => ({ ...state, icomeEgress: [...items] })),
  on(ActinosIE.unSetItems, (state) => ({ ...state, icomeEgress: [] })),
);

