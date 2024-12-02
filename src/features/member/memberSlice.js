import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import MemberData from "../../_mock/data/members.json";
import store from '../../store/Store';

const storedMembers = localStorage.getItem("MEMBERS");
const initialState = {
    MemberData: storedMembers ? JSON.parse(storedMembers) : MemberData.map((member) => ({ ...member, _id: uuidv4() })) || [],
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
            localStorage.setItem("MEMBERS", JSON.stringify(state.MemberData));
        },

        // delete member by id
        removeMember: (state, action) => {
            state.MemberData = state.MemberData.filter(
                (member) => member._id !== action.payload
            );
            localStorage.setItem("MEMBERS", JSON.stringify(state.MemberData));
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
                localStorage.setItem("MEMBERS", JSON.stringify(state.MemberData));
            }
        },

        toggleFavorite: (state, action) => {
            const member = state.MemberData.find(
                (member) => member._id === action.payload
            );
            if (member) {
                member.favourite = !member.favourite;
                localStorage.setItem("MEMBERS", JSON.stringify(state.MemberData));
            }
        },
        synchronizeMembers: (state) => {
            const storedMembers = localStorage.getItem("MEMBERS");
            if (storedMembers) {
                state.MemberData = JSON.parse(storedMembers);
            }
        },

    },
});

// Listen for changes in localStorage and update state accordingly
window.addEventListener("storage", () => {
    const storedMembers = localStorage.getItem("MEMBERS");
    if (storedMembers) {
        store.dispatch(MemberSlice.actions.synchronizeMembers());
    }
});

export const { addMember, removeMember, updateMember, toggleFavorite, synchronizeMembers } = MemberSlice.actions;

export default MemberSlice.reducer;
