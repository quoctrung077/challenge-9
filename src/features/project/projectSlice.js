import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import ProjectData from "../../_mock/data/projects.json";

const InitialState = {
    ProjectData: ProjectData?.map((project) => ({ ...project, _id: uuidv4() })) || [],
};

const ProjectSlice = createSlice({

    name: "project",
    InitialState,
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
            state.ProjectData.push(newProject);
        }
    },

});

export const SelectProjects = (state) => state.project.ProjectData;


export default ProjectSlice.reducer;    