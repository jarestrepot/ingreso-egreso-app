import { UserEntity } from '@models/usuario.model';
import { createAction, props } from '@ngrx/store';


export const setUser = createAction(
  '[Auth Component] setUser',
  props<{ userEntity: UserEntity }>()
);

export const getUser = createAction(
  '[Auth Component] getUser',
  props<{ uid: string }>()
);

export const unSetuser = createAction(
  '[Auth Component] unSetUser',
)

