import { combineReducers, configureStore, PreloadedState } from "@reduxjs/toolkit";
import { pixemaAPI } from "../api/PixemaAPI";
import { searchReducer } from "./reducers/search.slice";
import { loadReducer } from "./reducers/loadMore.slice";
import { filtersReducers } from "./reducers/filters.slice";
import { useMemo } from "react";

let store: AppStore;

export const setupStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      searchReducer,
      loadReducer,
      filtersReducers,
      [pixemaAPI.reducerPath]: pixemaAPI.reducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pixemaAPI.middleware),
  });
};

export const initializeStore = (preloadedState: PreloadedState<RootState>) => {
  let _store = store ?? setupStore(preloadedState);
  if (preloadedState && store) {
    _store = setupStore({ ...store.getState(), ...preloadedState });
  }
  if (typeof window === "undefined") return _store;
  if (!store) store = _store;
  return _store;
};

export function useStore(initialState: RootState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
};


const rootReducer = combineReducers({
    loadReducer,
    searchReducer,
    filtersReducers
});


// export const setupStore = ()=>{
//     return configureStore({
//         reducer: rootReducer
//     })
// }

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<typeof rootReducer>;