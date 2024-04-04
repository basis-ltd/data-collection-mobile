import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    formValues: [],
    formErrors: [],//will be updated any time there is a formik error in the form
    formId: ''
}
const formSataSlices = createSlice({
    name: "formDataStates",
    initialState,
    reducers: {
        setFormValues: (state, action) => {
            state.formValues = action.payload;
        },
        setFormErrors: (state, action) => {
            state.formErrors = action.payload;
        },
        setFormId: (state, action) => {
            state.formId = action.payload;
        },
    }
})
export const { setFormValues, setFormId, setFormErrors } = formSataSlices.actions;

const formDataReducers = formSataSlices.reducer;
export default formDataReducers;
