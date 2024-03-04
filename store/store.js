import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../app/login/phoneNumber.slice";
import projectsReducers from "../app/projects/projectSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            authReducer,
            projectsReducers,
        },
    })
}
