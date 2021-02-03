import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import * as actions from './actions';

const beersInitialState = {
    beers: [],
    errorMessage: null,
    loading: false
};

const favoritesInitialState = {
    favorites: [],
};

const beersReducer = handleActions(
    {
        [actions.getBeersRequest]: (state, action) => ({
            ...state,
            errorMessage: "",
        }),
        [actions.getBeersSuccess]: (state, action) => ({
            ...state,
            beers: action.payload,
            errorMessage: "",
        }),
        [actions.getBeersFailure]: (state, action) => ({
            ...state,
            errorMessage: action.payload,
        }),
    },
    beersInitialState
);

const favoritesReducer = handleActions(
    {
        [actions.addFavorite]: (state, action) => {
            let favorites = [...state.favorites];
            favorites.push(action.payload);
            return {
                favorites
            };
        },
        [actions.removeFavorite]: (state, action) => {
            let favorites = [...state.favorites];
            favorites = favorites.filter((beer) => beer.id !== action.payload);
            return {
                favorites
            }
        },
        [actions.removeAllFavorites]: (state, action) => {
            let favorites = [];
            return {
                favorites
            }
        },
        [actions.changeRank]: (state, action) => {
            let favorites = [...state.favorites];
            for (let favorite of favorites) {
                if (favorite.id === action.payload.id) {
                    favorite.rank = action.payload.rank
                }
            }
            return {
                favorites
            }
        },
    },
    favoritesInitialState
);

export const rootReducer = combineReducers({
    beers: beersReducer,
    favorites: favoritesReducer
});