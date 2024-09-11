import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState, CartStorageKeys } from "../Interfaces/cart.interface";
import { getStorageState } from "../helpers/Storage";

const initialState: CartState = getStorageState<CartState>(
  CartStorageKeys.CartData
) ?? {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<number>) => {
      const existed = state.items?.find((i) => i.id === action.payload);
      if (!existed) {
        state.items?.push({ id: action.payload, count: 1 });
      } else {
        state.items?.map((i) => {
          if (i.id === action.payload) {
            i.count += 1;
          }
        });
      }
    },
    remove: (state, action: PayloadAction<number>) => {
      state.items?.map((i) => {
        if (i.id === action.payload && i.count !== 1) {
          i.count -= 1;
        } else {
          return;
        }
      });
    },
    delete: (state, action: PayloadAction<number>) => {
      if (state.items) {
        state.items = state.items?.filter((item) => item.id !== action.payload);
      }
      return;
    },
    clear: (state) => {
      state.items = [];
    },
  },
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
