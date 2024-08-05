import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AppDataState {
  totalAmountSpent: number;
  monthlyIncome: number;
  resetListEmitter: boolean;
}

const initialState = {
  totalAmountSpent: 0,
  monthlyIncome: 0,
  resetListEmitter: false,
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
    setResetEmitter(state) {
      state.resetListEmitter = !state.resetListEmitter;
    },
  },
});

export const { setTotalAmountSpent, setMonthlyIncome, setResetEmitter } =
  appDataSlice.actions;
export default appDataSlice.reducer;
