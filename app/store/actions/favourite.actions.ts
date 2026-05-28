import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFavourites, addFavourite, removeFavourite } from "$utils/database";
import { ICharacter } from "$types/data.types";
import { ApplicationStateType } from "$store/redux.store";

export const loadFavourites = createAsyncThunk('favourite/load', async () => {
    const chars = await getFavourites();
    return chars;
});

export const toggleFavourite = createAsyncThunk('favourite/toggle', async (character: ICharacter, thunkAPI) => {
    const state = thunkAPI.getState() as ApplicationStateType;
    const favourites: ICharacter[] = state.favourites || [];
    const exists = favourites.some((fav: ICharacter) => fav.id === character.id);

    if (exists) {
        await removeFavourite(character.id);
        return { type: 'removed', character };
    } else {
        await addFavourite(character);
        return { type: 'added', character };
    }
});
