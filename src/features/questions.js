import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _getQuestions, _saveQuestionAnswer } from "../utils/_DATA";

export const getQuestionsAsync = createAsyncThunk(
    "questions/getQuestionsAsync",
    async (dispatch, getState) => {
        return await _getQuestions();
    }
);

export const questionsSlice = createSlice({
    name: "questions",
    initialState: {
        questions: [],
        status: null,
        loadingQuestions: true,
        submittingAnswer: true,
    },
    reducers: {
        setQuestions: (state, action) => {
            state.questions = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: {
        [getQuestionsAsync.pending]: (state, action) => {
            state.status = "loading";
            state.loadingQuestions = true;
        },
        [getQuestionsAsync.fulfilled]: (state, action) => {
            state.questions = Object.values(action.payload);
            state.status = "success";
            state.loadingQuestions = false;
        },
        [getQuestionsAsync.rejected]: (state, action) => {
            state.status = "failed";
            state.loadingQuestions = false;
        },
    },
});

export const { setQuestions, setLoading, setError } = questionsSlice.actions;
export default questionsSlice.reducer;
