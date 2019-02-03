import * as actionTypes from './actionTypes';
import axios from '../../axiosBase';

export const searchMovieSuccess = (movies, total) => {
    return {
        type: actionTypes.SEARCH_MOVIE_SUCCESS,
        payload: {
            movies,
            total
        }
    }
}

export const searchMovieFail = () => {
    return {
        type: actionTypes.SEARCH_MOVIE_FAIL
    }
}

export const resetMovies = () => {
    return {
        type: actionTypes.RESET_MOVIES
    }
}

export const resetError = () => {
    return {
        type: actionTypes.RESET_ERROR
    }
}

export const setName = (name) => {
    return {
        type: actionTypes.SET_NAME,
        payload: name
    }
}

export const actionSearchMovies = (key, name) => {
    return dispatch => {
        axios.get(`/search/movie?api_key=${key}&language=en-US&query=${name}&include_adult=false`)
        .then(res => {
           if(res.data.results.length > 0) {
                dispatch(searchMovieSuccess(res.data.results, res.data.total_results))
                
            } else {
                searchMovieFail();
            }
        })
        .catch(e => {
            dispatch(searchMovieFail());
        })
    }
}
export const actionSearchMoviesPage = (key, name, page) => {
    return dispatch => {
        axios.get(`/search/movie?api_key=${key}&language=en-US&query=${name}&page=${page}&include_adult=false`)
        .then(res => {
           if(res.data.results.length > 0) {
                dispatch(searchMovieSuccess(res.data.results, res.data.total_results))
                
            } else {
                // searchMovieFail();
                // history.push('/movie/found')
            }
        })
        .catch(e => {
            dispatch(searchMovieFail());
        })
    }
}