import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../app/login/phoneNumber.slice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            authReducer,
        },
    })
}
