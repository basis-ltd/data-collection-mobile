import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    formSubmitRef: null,
}
const formSataSlices = createSlice({
    name: "formDataStates",
    initialState,
    reducers: {
        setFormSubmitRef: (state, action) => {
            state.formSubmitRef = action.payload;
        },
    }
})
export const { setFormSubmitRef, } = formSataSlices.actions;

const formDataReducers = formSataSlices.reducer;
export default formDataReducers;