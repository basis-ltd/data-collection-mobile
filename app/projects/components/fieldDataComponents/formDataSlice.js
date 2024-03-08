import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    formValues: [],
    showPreview: false,
}
const formSataSlices = createSlice({
    name: "formDataStates",
    initialState,
    reducers: {
        setFormValues: (state, action) => {
            state.formValues = action.payload;
        },
        setShowPreview: (state, action) => {
            state.showPreview = action.payload;
        },
    }
})
export const { setFormValues, setShowPreview } = formSataSlices.actions;

const formDataReducers = formSataSlices.reducer;
export default formDataReducers;
