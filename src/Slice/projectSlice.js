import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import projectData from "../Data/projects.json";

const initialState = {
    projectData: projectData?.map((project) => ({ ...project, _id: uuidv4() })) || [],
};

const projectSlice = createSlice({

    name: "project",
    initialState,
    reducers: {
        //add project
        addProject: (state, action) => {
            const { projectTitle, thumbnailImage, projectDescription, priority, status, deadline, startDate, favourite, attachedFiles, privacy, tags, members } = action.payload;
            const newProject = {
                _id: uuidv4(),
                projectTitle,
                thumbnailImage,
                projectDescription,
                priority,
                status,
                deadline,
                startDate,
                favourite,
                attachedFiles,
                privacy,
                tags,
                members,
            };
            state.projectData.push(newProject);
        }
    },

});

export const selectProjects = (state) => state.project.projectData;


export default projectSlice.reducer;    