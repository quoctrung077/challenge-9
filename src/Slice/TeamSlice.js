import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
const initialState = {
    teamData: [
        {
            _id: uuidv4(),
            name: "Nancy Martino",
            designation: "Team Leader & HR",
            favourite: true,
            projects: 225,
            tasks: 197,
            profileImage: "https://via.placeholder.com/100",
            backgroundImage: "https://via.placeholder.com/600x400",
        },
        {
            _id: uuidv4(),
            name: "Henry Baird",
            designation: "Full Stack Developer",
            favourite: true,
            projects: 352,
            tasks: 376,
            profileImage: "",
            backgroundImage: "https://via.placeholder.com/600x400",
        },
        {
            _id: uuidv4(),
            name: "Frank Hook",
            designation: "Project Manager",
            favourite: true,
            projects: 164,
            tasks: 182,
            profileImage: "https://via.placeholder.com/100",
            backgroundImage: "https://via.placeholder.com/600x400",
        },
        {
            _id: uuidv4(),
            name: "Jennifer Carter",
            designation: "UI/UX Designer",
            favourite: true,
            projects: 241,
            tasks: 204,
            profileImage: "https://via.placeholder.com/100",
            backgroundImage: "https://via.placeholder.com/600x400",
        },
        {
            _id: uuidv4(),
            name: "Jennifer Carter",
            designation: "UI/UX Designer",
            favourite: true,
            projects: 241,
            tasks: 204,
            profileImage: "https://via.placeholder.com/100",
            backgroundImage: "https://via.placeholder.com/600x400",
        },
        {
            _id: uuidv4(),
            name: "Jennifer Carter",
            designation: "UI/UX Designer",
            favourite: true,
            projects: 241,
            tasks: 204,
            profileImage: "https://via.placeholder.com/100",
            backgroundImage: "https://via.placeholder.com/600x400",
        },
        {
            _id: uuidv4(),
            name: "Jennifer Carter",
            designation: "UI/UX Designer",
            favourite: true,
            projects: 241,
            tasks: 204,
            profileImage: "https://via.placeholder.com/100",
            backgroundImage: "https://via.placeholder.com/600x400",
        },
        {
            _id: uuidv4(),
            name: "Jennifer Carter",
            designation: "UI/UX Designer",
            favourite: true,
            projects: 241,
            tasks: 204,
            profileImage: "https://via.placeholder.com/100",
            backgroundImage: "https://via.placeholder.com/600x400",
        },
        {
            _id: uuidv4(),
            name: "Trung",
            designation: "UI/UX Designer",
            favourite: true,
            projects: 241,
            tasks: 204,
            profileImage: "https://via.placeholder.com/100",
            backgroundImage: "https://via.placeholder.com/600x400",
        },
        {
            _id: uuidv4(),
            name: "Vo Thao",
            designation: "UI/UX Designer",
            favourite: true,
            projects: 241,
            tasks: 204,
            profileImage: "https://via.placeholder.com/100",
            backgroundImage: "https://via.placeholder.com/600x400",
        },
    ],
};

const teamSlice = createSlice({
    name: "team",
    initialState,
    reducers: {
        addMember: (state, action) => {
            state.teamData.push(action.payload);
        },
        removeMember: (state, action) => {
            state.teamData = state.teamData.filter((member, index) => index !== action.payload);
        },
        updateMember: (state, action) => {
            const { index, updatedData } = action.payload;
            state.teamData[index] = updatedData;
        },
    },
});

export const { addMember, removeMember, updateMember } = teamSlice.actions;

export default teamSlice.reducer;
