import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    formValues: [],
    formId: ''
}
const formSataSlices = createSlice({
    name: "formDataStates",
    initialState,
    reducers: {
        setFormValues: (state, action) => {
            state.formValues = action.payload;
        },
        setFormId: (state, action) => {
            state.formId = action.payload;
        },
    }
})
export const { setFormValues, setFormId } = formSataSlices.actions;

const formDataReducers = formSataSlices.reducer;
export default formDataReducers;
