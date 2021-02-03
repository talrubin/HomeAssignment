import { createAction } from "redux-actions";

export const getBeersRequest = createAction("FETCH_BEERS_REQUEST");
export const getBeersSuccess = createAction("FETCH_BEERS_SUCCESS");
export const getBeersFailure = createAction("FETCH_BEERS_FAILURE");

export const addFavorite = createAction("ADD_FAVORITES");
export const removeFavorite = createAction("REMOVE_FAVORITES");
export const removeAllFavorites = createAction("REMOVE_ALL_FAVORITES");
export const changeRank = createAction("CHANGE_RANK");