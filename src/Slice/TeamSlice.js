
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
            const newMember = {
                _id: uuidv4(),  // create unique id
                ...action.payload,
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
