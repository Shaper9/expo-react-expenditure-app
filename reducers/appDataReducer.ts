import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface AppDataState {
  value: number
}

const initialState = { value: 0 } satisfies AppDataState as AppDataState

const appDataSlice = createSlice({
  name: 'appData',
  initialState,
  reducers: {
    increment(state) {
      state.value++
    },
    decrement(state) {
      state.value--
    },
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = appDataSlice.actions
export default appDataSlice.reducer