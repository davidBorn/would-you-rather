import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _getUsers } from "../utils/_DATA";

export const getUsersAsync = createAsyncThunk(
    "users/getUsersAsync",
    async (dispatch, getState) => {
        return await _getUsers();
    }
);

export const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        status: null,
        loading: true,
    },
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: {
        [getUsersAsync.pending]: (state, action) => {
            state.status = "loading";
            state.loading = true;
        },
        [getUsersAsync.fulfilled]: (state, action) => {
            state.users = Object.values(action.payload);
            state.status = "success";
            state.loading = false;
        },
        [getUsersAsync.rejected]: (state, action) => {
            state.status = "failed";
            state.loading = false;
        },
    },
});

export const { setUsers, setLoading, setError } = usersSlice.actions;
export default usersSlice.reducer;
