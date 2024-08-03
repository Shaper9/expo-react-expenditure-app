import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AppDataState {
  value: number;
  totalAmountSpent: number;
  monthlyIncome: number;
}

const initialState = {
  value: 0,
  totalAmountSpent: 0,
  monthlyIncome: 0,
} satisfies AppDataState as AppDataState;

const appDataSlice = createSlice({
  name: "appData",
  initialState,
  reducers: {
    setTotalAmountSpent(state, action: PayloadAction<number>) {
      state.totalAmountSpent = action.payload;
    },
    setMonthlyIncome(state, action: PayloadAction<number>) {
      state.monthlyIncome = action.payload;
    },
    increment(state) {
      state.value++;
    },
    decrement(state) {
      state.value--;
    },
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  setTotalAmountSpent,
  setMonthlyIncome,
} = appDataSlice.actions;
export default appDataSlice.reducer;
