import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import ProjectData from "../../_mock/data/projects.json";


const initialState = {
    ProjectData: ProjectData?.map((project) => ({ ...project, _id: uuidv4() })) || [],
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
        },
        removeProject: (state, action) => {
            state.ProjectData = state.ProjectData.filter(
                (project) => project._id !== action.payload
            );
        },
    },

});

export const { addProject, removeProject } = ProjectSlice.actions;
export const SelectProjects = (state) => state.project.ProjectData;


export default ProjectSlice.reducer;    