import { configureStore } from "@reduxjs/toolkit";
import teamReducer from "../Slice/TeamSlice";
import projectReducer from "../Slice/projectSlice";

const store = configureStore({
    reducer: {
        team: teamReducer,
        project: projectReducer,
    },
});

export default store;
