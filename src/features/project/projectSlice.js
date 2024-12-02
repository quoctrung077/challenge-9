import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import ProjectData from "../../_mock/data/projects.json";
import store from '../../store/Store';

const storedProjects = localStorage.getItem("PROJECTS");
const initialState = {
    ProjectData: storedProjects ? JSON.parse(storedProjects) : ProjectData.map((project) => ({ ...project, _id: uuidv4() })) || [],
};

const ProjectSlice = createSlice({

    name: "project",
    initialState,
    reducers: {
        //add project
        addProject: (state, action) => {
            const newProject = {
                _id: uuidv4(),
                ...action.payload,
            };
            state.ProjectData.push(newProject);
            localStorage.setItem("PROJECTS", JSON.stringify(state.ProjectData));
        },
        removeProject: (state, action) => {
            state.ProjectData = state.ProjectData.filter(
                (project) => project._id !== action.payload
            );
            localStorage.setItem("PROJECTS", JSON.stringify(state.ProjectData));
        },
        toggleFavorite: (state, action) => {
            const project = state.ProjectData.find(
                (project) => project._id === action.payload
            );
            if (project) {
                project.favourite = !project.favourite;
                localStorage.setItem("PROJECTS", JSON.stringify(state.ProjectData));
            }
        },
        synchronizeProjects: (state) => {
            const storeProjects = localStorage.getItem("PROJECTS");
            if (storeProjects) {
                state.ProjectData = JSON.parse(storeProjects);
            }
        },
    },

});

// Listen for changes in localStorage and update state accordingly
window.addEventListener("storage", () => {
    const storeProjects = localStorage.getItem("PROJECTS");
    if (storeProjects) {
        store.dispatch(ProjectSlice.actions.synchronizeProjects());
    }
});

export const { addProject, removeProject, toggleFavorite, synchronizeProjects } = ProjectSlice.actions;
export const SelectProjects = (state) => state.project.ProjectData;


export default ProjectSlice.reducer;    