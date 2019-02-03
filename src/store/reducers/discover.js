import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
    discoverMovies: null,
    discoverSeries: null,
    id: null,
    loading: true
}

const discoverMovieReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {

        case actionTypes.INIT_DISCOVER:
        return {
            ...state,
            loading: true
        }
        case actionTypes.DISCOVER_MOVIES_SUCCESS:
            return {
                ...state,
                discoverMovies: action.payload,
                id: action.payload.id,
                loading: false
            }
        case actionTypes.DISCOVER_SERIES_SUCCESS:
            return {
                ...state,
                discoverSeries: action.payload.series,
                id: action.payload.id,
                loading: false
            }
        
        default: 
            return state;
    }
} 

export default discoverMovieReducer;