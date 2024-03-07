import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../app/login/phoneNumber.slice";
import projectsReducers from "../app/projects/projectSlice";
import formDataReducers from "../app/projects/components/fieldDataComponents/formDataSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            authReducer,
            projectsReducers,
            formDataReducers,
        },
    })
}
