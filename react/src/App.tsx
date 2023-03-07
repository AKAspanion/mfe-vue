// App.tsx
import React, { useCallback, useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import {
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";

import {
  applyMiddleware,
  createStore,
  compose,
  combineReducers,
  StoreEnhancer,
} from "redux";
import thunk from "redux-thunk";
import { HistoryStrategy } from "../@types/route";
import { StoreShape } from "../@types/store";
import { Page1 } from "./pages/Page1";
import { Page2 } from "./pages/Page2";
import { changeAppNameAction, reducers } from "./reducer";

const remoteAppScope = "react";

export declare type AppProps = {
  history: HistoryStrategy;
  children?: React.ReactNode;
};

const AppDefault: React.FC<AppProps> = (props) => {
  return <AppWithRoute {...props} />;
};

const AppWithRoute: React.FC<AppProps> = (props) => {
  const { history } = props;

  useEffect(() => {
    const unlistenHistoryChanges = history.listen(
      ({ location: { pathname } }) => {
        window.dispatchEvent(
          new CustomEvent("[react] navigated", { detail: pathname })
        );
      }
    );

    const vue3NavigationHandler = (event: Event) => {
      const pathname = (event as CustomEvent<string>).detail;
      const { pathname: currentPathname } = history.location;
      if (currentPathname === pathname) {
        return;
      }
      history.push(pathname);
    };

    window.addEventListener("[vue3] navigated", vue3NavigationHandler);

    return () => {
      window.removeEventListener("[vue3] navigated", vue3NavigationHandler);
    };
  }, [history]);

  return (
    <AppWithStore {...props}>
      <HistoryRouter history={history}>
        <Routes>
          <Route index element={<Page1 />} />
          <Route path="page-1" element={<Page1 />} />
          <Route path="page-2" element={<Page2 />} />
        </Routes>
      </HistoryRouter>
    </AppWithStore>
  );
};

const AppWithStore: React.FC<AppProps> = (props) => {
  const { children } = props;

  const getLocalStore = useCallback(
    () =>
      createStore(
        combineReducers({ ...reducers }),
        undefined,
        compose(
          applyMiddleware(thunk),
          window.__REDUX_DEVTOOLS_EXTENSION__
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : (f: unknown) => f
        ) as StoreEnhancer<unknown>
      ),
    []
  );

  return (
    <Provider store={getLocalStore()}>
      <App>{children}</App>
    </Provider>
  );
};

const App: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const state = useSelector((state: StoreShape) => state[remoteAppScope]);
  const [remoteAppInput, setRemoteAppInput] = useState("");

  return (
    <div style={{ border: "1px solid #61dbfb", margin: 16 }}>
      <div style={{ padding: 16 }}>
        <h1>Hello from React</h1>
        <div style={{ marginBottom: "10px" }}>
          RemoteApp's name from the redux store :{" "}
          <strong>{state && state?.appName}</strong>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <input
            style={{ marginRight: "10px", padding: 4 }}
            type="text"
            onChange={(e) => {
              setRemoteAppInput(e.target.value);
            }}
          />
          <button
            style={{ padding: 4 }}
            onClick={() => dispatch(changeAppNameAction(remoteAppInput))}
          >
            Dispatch react new name
          </button>
        </div>
      </div>
      {children}
    </div>
  );
};

export default AppDefault;

AppDefault.displayName = "React";
