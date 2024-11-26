
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import MemberData from "../../_mock/data/members.json";

const initialState = {
    // gán id cho data mẫu để xử lý action
    MemberData: MemberData.map((member) => ({ ...member, _id: uuidv4() })) || [],

    // MemberData: MemberData || [],
};

const MemberSlice = createSlice({
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
            state.MemberData.push(newMember);
        },

        // delete member by id
        removeMember: (state, action) => {
            state.MemberData = state.MemberData.filter(
                (member) => member._id !== action.payload
            );
        },

        // update member
        updateMember: (state, action) => {
            const { _id, updatedData } = action.payload;
            const memberIndex = state.MemberData.findIndex(
                (member) => member._id === _id
            );

            if (memberIndex !== -1) {
                state.MemberData[memberIndex] = {
                    ...state.MemberData[memberIndex],
                    ...updatedData,
                };
            }
        },
    },
});

export const { addMember, removeMember, updateMember } = MemberSlice.actions;

export default MemberSlice.reducer;
