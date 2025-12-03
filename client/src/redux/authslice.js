import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetAuth: state => {
      state.user = null;
      state.loading = false;
    }
  },
  extraReducers: builder => {
    builder.addCase('persist/REHYDRATE', (state, action) => {
      if (!action.payload || !action.payload.auth) return;
      state.user = action.payload.auth.user;
      state.loading = false; // <== Force loading off after rehydration
    });
  }
});

export const { setLoading, setUser, resetAuth } = authSlice.actions;
export default authSlice.reducer;
