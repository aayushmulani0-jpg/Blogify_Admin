
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null, 
  profile: null,  
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      if (typeof action.payload.data === "string") {
        state.token = action.payload.data;
      } else if (typeof action.payload.data === "object") {
        state.profile = action.payload.data;
      }

      state.error = null;
      state.loading = false;
    },
    clearUserDetails: (state) => {
      state.token = null;
      state.profile = null;
      state.error = null;
    },
  },
});

export const { setUserDetails, clearUserDetails } = userSlice.actions;
export default userSlice.reducer;