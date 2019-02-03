import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
    movies: null,
    loading: false,
    apiKey: 'deb4dde81f32dc9c3d2e506f488dcdc3',
    term: '',
    type: '',
    total: null,
    page: 1,
    trailer: '',
    playtrailer: false,
    movie: {},
    crew: {}
}


const movieReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {

        case actionTypes.SET_MOVIES_INIT:
            return {
                ...state,
                loading: true
            }
        case actionTypes.RESET:
            return {
                ...state,
                movie: {},
                movies: null
            }
        case actionTypes.SET_MOVIES_SUCCESS:
            return {
                ...state,
                movies: action.payload.movies,
                total: action.payload.total

            }
        case actionTypes.CHANGE_API:
            return {
                ...state,
                term: action.payload
            }
        case actionTypes.GET_MOVIE:
            return {
                ...state,
                movie: {...action.payload}
            }
        case actionTypes.GET_CREW: {
            return {
                ...state,
                crew: {...action.payload}
            }
        }
        case actionTypes.STORE_TRAILER:
            return {
                ...state,
                trailer: action.payload
            }
        case actionTypes.RESET_TRAILER: 
            return {
                ...state,
                trailer: ''
            }
        case actionTypes.PAGE_PLUS: 
            return {
                ...state,
                page: state.page + 1
            }
        case actionTypes.PAGE_MINUS: 
            return {
                ...state,
                page: state.page - 1
            }
        case actionTypes.RESET_PAGE:
            return {
                ...state,
                page: 1
            }
        default:
            return state;
    }
}

export default movieReducer;