import * as actionTypes from './actionTypes';
import axios from '../../axiosBase';
import Axios from 'axios';

export const setDiscover = (key, page) => {
    return dispatch => {
        dispatch(initDiscover())
        Axios.all([
            axios.get(`discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}`),
            axios.get(`discover/tv?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}`)
        ])
        .then(res => {
            dispatch(discoverMoviesSuccess(res[0].data.results))
            dispatch(discoverSeriesSuccess(res[1].data.results))
        })
    }
}

export const initDiscover = () => {
    return {
        type: actionTypes.INIT_DISCOVER
    }
}

export const discoverMoviesSuccess = (movies) => {
    return {
        type: actionTypes.DISCOVER_MOVIES_SUCCESS,
        payload: movies
    }
}

export const discoverSeriesSuccess = (series, id) => {
    return {
        type: actionTypes.DISCOVER_SERIES_SUCCESS,
        payload: {
            series: series,
            id: id
        }
    }
}