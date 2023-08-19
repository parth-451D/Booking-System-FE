import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define a type for the user state
interface CurrentBookingType {
  currentBooking: {
    theaterData: any;
    movieData: any;
    slotData: any;
  };
}

// Define the initial state using that type
const initialState: CurrentBookingType = {
  currentBooking: {
    theaterData: {},
    movieData: {},
    slotData: {},
  },
};

export const seatSlice = createSlice({
  name: "currentBooking",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setTheaterData: (state, action: PayloadAction<any>) => {
      state.currentBooking.theaterData = action.payload;
    },
    setMovieData: (state, action: PayloadAction<any>) => {
      state.currentBooking.movieData = action.payload;
    },
    setSlotData: (state, action: PayloadAction<any>) => {
      state.currentBooking.slotData = action.payload;
    },
  },
});

export const { setTheaterData, setMovieData, setSlotData } = seatSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTheaterData = (state: RootState) =>
  state?.currentBooking?.currentBooking?.theaterData;

export const selectMovieData = (state: RootState) =>
  state?.currentBooking?.currentBooking?.movieData;

export const selectSlotData = (state: RootState) =>
  state?.currentBooking?.currentBooking?.slotData;

export default seatSlice.reducer;
