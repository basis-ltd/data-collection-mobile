import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    formValues: [],
}
const formSataSlices = createSlice({
    name: "formDataStates",
    initialState,
    reducers: {
        setFormValues: (state, action) => {
            state.formValues = action.payload;
        },
    }
})
export const { setFormValues } = formSataSlices.actions;

const formDataReducers = formSataSlices.reducer;
export default formDataReducers;
