import { combineReducers, createStore } from "redux";
import { snackbarReducer } from "./snackbarReducer";

const rootReducer = combineReducers({
  snackbar: snackbarReducer
});

export const storeData = createStore(rootReducer);