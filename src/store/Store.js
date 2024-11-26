import { configureStore } from "@reduxjs/toolkit";
import MemberReducer from "../features/member/memberSlice";
import ProjectReducer from "../features/project/projectSlice";

const store = configureStore({
    reducer: {
        team: MemberReducer,
        project: ProjectReducer,
    },
});

export default store;
