import { createReducer, on } from '@ngrx/store';
import * as ActionsUser from './auth.actions';
import { UserEntity } from '@models/usuario.model';

export interface StateUser {
  user: UserEntity | null;
}

export const initialStateUser: StateUser = {
  user: null,
}

export const userReducer = createReducer(initialStateUser,
  on(ActionsUser.setUser, (state, { userEntity }) => ({ ...state, user: userEntity })),
  on(ActionsUser.unSetuser, ( state ) => ({ ...state, user: null })),
);


