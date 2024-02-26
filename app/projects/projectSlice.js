import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showProjectsList: true,
    projectId: null,
}
const projectSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        setProjectLists: (state, action) => {
            state.showProjectsList = action.payload;
        },
        setProjectId: (state, action) => {
            state.projectId = action.payload;
        },
    }
})
export const { setProjectLists, setProjectId } = projectSlice.actions;

const projectsReducers = projectSlice.reducer;
export default projectsReducers;