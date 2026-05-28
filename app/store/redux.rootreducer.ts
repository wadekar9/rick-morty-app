import { combineReducers } from "@reduxjs/toolkit";
import { favouriteReducer } from "./slices/favourite.slice";

const reducer = combineReducers({
    favourites: favouriteReducer,
});

export default reducer;
