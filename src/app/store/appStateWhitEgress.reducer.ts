import { StateIcomeEgress } from "@dashboard/store/icome-egress.reducer";
import { AppState } from "./app.reducer";

export interface AppStateWhithEgress extends AppState {
  icomeEgress: StateIcomeEgress
}
