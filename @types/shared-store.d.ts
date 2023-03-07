import { compose, Store, Reducer } from "redux";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: typeof compose;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
  }
}

export type ReduxAction = {
  type: string;
  payload?: unknown;
};

export type ReactState = {
  appName: string;
};

export type ReducerMap = {
  react?: Reducer;
};

export type StoreShape = {
  react?: ReactState;
};
