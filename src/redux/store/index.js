/** @format */

import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { encryptTransform } from "redux-persist-transform-encrypt"
import { persistStore, persistReducer } from "redux-persist"
import { searchReducer } from "../reducers/searchReducer"
import storage from "redux-persist/lib/storage"
import userReducer from "../reducers/userReducer"
import { selectedTicketReducer } from "../reducers/selectedTicketReducer"
import { passengerDetailsReducer } from "../reducers/passengerDetailsReducer"

const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      onError: (error) => {
        console.log(error)
      },
      secretKey: "Sidath",
    }),
  ],
}

const combinedReducer = combineReducers({
  searchReducer: searchReducer,
  userReducer: userReducer,
  selectedTicketReducer: selectedTicketReducer,
  passengerDetailsReducer: passengerDetailsReducer,
})
const persistedReducer = persistReducer(persistConfig, combinedReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
const persistor = persistStore(store)

export { store, persistor }