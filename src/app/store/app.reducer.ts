import { ActionReducerMap } from '@ngrx/store';
import * as UI from '@shared/ui.reducer';

// Aplication state
export interface AppState {
  ui: UI.State
}


// Reducers
export const appReducers: ActionReducerMap<AppState> = {
  ui: UI.uiReducer,
}

