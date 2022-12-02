import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _getAnswers } from "../utils/_DATA";

const getAnswersAsync = createAsyncThunk(
    "answers/getAnswersAsync",
    async (dispatch, getState) => {
        return await _getAnswers();
    }
);

export const answersSlice = createSlice({
    name: "answers",
    initialState: {
        answers: [],
        status: null,
        loading: true,
    },
    reducers: {
        setAnswers: (state, action) => {
            state.answers = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: {
        [getAnswersAsync.pending]: (state, action) => {
            state.status = "loading";
        },
        [getAnswersAsync.fulfilled]: (state, action) => {
            state.answers = Object.values(action.payload);
            state.status = "success";
        },
        [getAnswersAsync.rejected]: (state, action) => {
            state.status = "failed";
        },
    },
});

export const { setAnswers, setLoading, setError } = answersSlice.actions;
export default answersSlice.reducer;
