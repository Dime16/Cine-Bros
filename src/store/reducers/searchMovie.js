import * as actiontypes from '../actions/actionTypes';

const INITIAL_STATE = {
    movies: null,
    error: false,
    name: '',
    total: null
};



const searchMovieReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case actiontypes.SEARCH_MOVIE_SUCCESS:
            return {
                ...state,
                movies: action.payload.movies,
                total: action.payload.total,
                error: false
            }
        case actiontypes.SEARCH_MOVIE_FAIL:
            return {
                ...state,
                error: true
            }
        case actiontypes.RESET_MOVIES:
            return {
                ...state,
                movies: null
            }
        case actiontypes.RESET_ERROR:
                return {
                    ...state,
                    error: false
            }
        case actiontypes.SET_NAME:
            return {
                ...state,
                name: action.payload
        }
        default: 
            return state;
    }
}

export default searchMovieReducer;