import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";

// Define a type for the user state
interface UserType {
  user: any;
  isLogin: boolean;
}

// Define the initial state using that type
const initialState: UserType = {
  user: null,
  isLogin: false,
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setIsLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    setProfileData: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  },
});

export const { setIsLogin, setProfileData } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUserProfileData = (state: RootState) => state.user.user;

export const selectIsLogin = (state: RootState) => state.user.isLogin;

export default userSlice.reducer;
