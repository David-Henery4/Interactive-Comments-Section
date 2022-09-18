import { configureStore } from "@reduxjs/toolkit";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage"; // LocalStorage
import thunk from "redux-thunk";
import generalReducer from "./features/general/generalSlice";

// (without-persist)
// export const store = configureStore({
//   reducer:{
//     general: generalReducer,
//   },
// });

const persistConfig = {
  key: "root",
  storage,
}

const persistedReducer = persistReducer(persistConfig, generalReducer)

let store = configureStore({
  reducer: {
    general: persistedReducer,
  },
  middleware: [thunk], // needed for non-serialized values.
});

let persistor = persistStore(store)
export {
  store,
  persistor
}
