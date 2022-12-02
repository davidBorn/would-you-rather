import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./login";
import usersReducer from "./users";
import questionReducer from "./questions";

export default configureStore({
    reducer: {
        login: loginReducer,
        users: usersReducer,
        questions: questionReducer,
    },
});
