import { createSlice } from "@reduxjs/toolkit";
import { ICharacter } from "$types/data.types";
import { loadFavourites, toggleFavourite } from "$store/actions/favourite.actions";

const favouriteSlice = createSlice({
    name: 'favourite',
    initialState: [] as ICharacter[],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loadFavourites.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(toggleFavourite.fulfilled, (state, action) => {
            const { type, character } = action.payload;
            if (type === 'removed') {
                return state.filter(fav => fav.id !== character.id);
            } else {
                state.push(character);
            }
        });
    }
});

export const favouriteReducer = favouriteSlice.reducer;
export const favouriteActions = favouriteSlice.actions;
