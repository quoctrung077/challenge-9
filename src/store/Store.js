import { configureStore } from "@reduxjs/toolkit";
import teamReducer from "../Slice/TeamSlice";

const store = configureStore({
    reducer: {
        team: teamReducer,
    },
});

export default store;
