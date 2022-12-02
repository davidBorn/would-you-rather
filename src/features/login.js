import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: "login",
    initialState: {
        authedUser: null,
        loggedIn: "false",
    },
    reducers: {
        login: (state, action) => {
            state.authedUser = action.payload;
            state.loggedIn = "true";
        },
        logout: (state) => {
            state.authedUser = null;
            state.loggedIn = "false";
        },
    },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
