import { ReactState, ReduxAction } from "../@types/store";

const initialState: ReactState = {
  appName: "ReactApp",
};

const CHANGE_HOME_APP_NAME = "CHANGE_HOME_APP_NAME";

const changeAppNameAction = (appName: string) => {
  return { type: CHANGE_HOME_APP_NAME, payload: appName };
};

const reducer = (state = initialState, action: ReduxAction) => {
  switch (action.type) {
    case CHANGE_HOME_APP_NAME: {
      return {
        ...state,
        appName: action.payload,
      };
    }
  }
  return state;
};

export { changeAppNameAction };
export const reducers = { react: reducer };
