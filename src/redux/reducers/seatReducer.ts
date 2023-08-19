import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define a type for the user state
interface SeatType {
  selectedSeats: any;
}

// Define the initial state using that type
const initialState: SeatType = {
  selectedSeats: [],
};

export const seatSlice = createSlice({
  name: "seat",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSelectedSeats: (state, action: PayloadAction<any>) => {
      state.selectedSeats = action.payload;
    },
  },
});

export const { setSelectedSeats } = seatSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSelectedSeats = (state: RootState) =>
  state?.seat.selectedSeats;

export default seatSlice.reducer;
