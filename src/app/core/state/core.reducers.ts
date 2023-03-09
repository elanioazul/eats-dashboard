import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { State } from "./core.state";
import * as MenusReducer from "./menus/menus.reducer";

export const reducers: ActionReducerMap<State> = {
  menus: MenusReducer.reducer,
};

export const metaReducers: MetaReducer<State>[] = [];