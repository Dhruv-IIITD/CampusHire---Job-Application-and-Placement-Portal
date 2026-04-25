import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("userDetail")
  ? JSON.parse(localStorage.getItem("userDetail"))
  : null;

const userSlice = createSlice({
  name: "userDetail",
  initialState: {
    id: storedUser?.id || null,
    accountType: storedUser?.accountType || null,
    email: storedUser?.email || null,
    name: storedUser?.name || null,
    jwtToken: storedUser?.jwtToken || null,
    createdAt: storedUser?.createdAt || null,
  },
  reducers: {
    login(state, action) {
      state.id = action.payload?.id;
      state.accountType = action.payload?.accountType;
      state.email = action.payload?.email;
      state.name = action.payload?.name;
      state.jwtToken = action.payload?.jwtToken;
      state.createdAt = action.payload?.createdAt || null;

      localStorage.setItem(
        "userDetail",
        JSON.stringify({
          id: state.id,
          accountType: state.accountType,
          email: state.email,
          name: state.name,
          jwtToken: state.jwtToken,
          createdAt: state.createdAt,
        })
      );
    },

    logout(state) {
      state.id = null;
      state.accountType = null;
      state.email = null;
      state.name = null;
      state.jwtToken = null;
      state.createdAt = null;
      localStorage.removeItem("userDetail");
    },

    updateProfile(state, action) {
      state.name = action.payload?.name || state.name;
      state.email = action.payload?.email || state.email;

      localStorage.setItem(
        "userDetail",
        JSON.stringify({
          id: state.id,
          accountType: state.accountType,
          email: state.email,
          name: state.name,
          jwtToken: state.jwtToken,
          createdAt: state.createdAt,
        })
      );
    },
  },
});

export const { login, logout, updateProfile } = userSlice.actions;
export default userSlice.reducer;
