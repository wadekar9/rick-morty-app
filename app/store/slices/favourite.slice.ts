import { createSlice } from "@reduxjs/toolkit";

const favouriteSlice = createSlice({
    name: 'favourite',
    initialState: [],
    reducers: {
        toggleFavourite: (state, action) => {

        }
    }
});

export const favouriteReducer = favouriteSlice.reducer;
export const favouriteActions = favouriteSlice.actions;
