import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
    phone: "",
    loggedIn: false,
}
const slice = createSlice({
    name: "phoneNumber",
    initialState,
    reducers: {
        setPhone: (state, action) => {
            state.phone = action.payload;
        },
        setLoggedIn: (state, action) => {
            state.loggedIn = action.payload;
        },
    }
})
export const { setPhone, setLoggedIn } = slice.actions;
// create selectors
// export const getAuthState = createSelector((state) => state, (authState) => authState)

export default slice.reducer;