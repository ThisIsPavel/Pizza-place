import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user.slice";
import { setStorageState } from "../helpers/Storage";
import cartSlice from "./cart.slice";
import { UserStorageKeys } from "../Interfaces/auth.interface";
import { CartStorageKeys } from "../Interfaces/cart.interface";

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: { user: userSlice, cart: cartSlice },
});

store.subscribe(() => {
  setStorageState({ jwt: store.getState().user.jwt }, UserStorageKeys.UserData);
  setStorageState(store.getState().cart, CartStorageKeys.CartData);
});
