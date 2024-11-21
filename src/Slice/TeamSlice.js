
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import teamData from "../Data/teams.json";

const initialState = {
    // gán id cho data mẫu để xử lý action
    teamData: teamData.map((member) => ({ ...member, _id: uuidv4() })) || [],

    // teamData: teamData || [],
};

const teamSlice = createSlice({
    name: "team",
    initialState,
    reducers: {
        // add member 
        addMember: (state, action) => {
            const { name, designation, favourite, projects, tasks, profileImage, backgroundImage } = action.payload;
            const newMember = {
                _id: uuidv4(),
                name,
                designation,
                favourite: favourite || false,
                projects: projects || 0,
                tasks: tasks || 0,
                profileImage: profileImage || "https://via.placeholder.com/100",
                backgroundImage: backgroundImage || "https://via.placeholder.com/600x400",
            };
            state.teamData.push(newMember);
        },

        // delete member by id
        removeMember: (state, action) => {
            state.teamData = state.teamData.filter(
                (member) => member._id !== action.payload
            );
        },

        // update member
        updateMember: (state, action) => {
            const { _id, updatedData } = action.payload;
            const memberIndex = state.teamData.findIndex(
                (member) => member._id === _id
            );

            if (memberIndex !== -1) {
                state.teamData[memberIndex] = {
                    ...state.teamData[memberIndex],
                    ...updatedData,
                };
            }
        },
    },
});

export const { addMember, removeMember, updateMember } = teamSlice.actions;

export default teamSlice.reducer;
