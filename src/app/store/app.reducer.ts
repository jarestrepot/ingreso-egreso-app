import { ActionReducerMap } from '@ngrx/store';
import * as UI from '@shared/ui.reducer';
import * as authUser from '@auth/authStore/auth.reducer';
import * as icomeEgressReducer from '@dashboard/store/icome-egress.reducer';


// Aplication state
export interface AppState {
  ui: UI.State,
  user: authUser.StateUser,
  icomeEgress: icomeEgressReducer.StateIcomeEgress
}


// Reducers
export const appReducers: ActionReducerMap<AppState> = {
  ui: UI.uiReducer,
  user: authUser.userReducer,
  icomeEgress: icomeEgressReducer.icomeEgressReducer,
}

