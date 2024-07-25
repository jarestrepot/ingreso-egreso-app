import { ActionReducerMap } from '@ngrx/store';
import * as UI from '@shared/ui.reducer';
import * as authUser from '@auth/authStore/auth.reducer';


// Aplication state
export interface AppState {
  ui: UI.State,
  user: authUser.StateUser,

}


// Reducers
export const appReducers: ActionReducerMap<AppState> = {
  ui: UI.uiReducer,
  user: authUser.userReducer,
}

