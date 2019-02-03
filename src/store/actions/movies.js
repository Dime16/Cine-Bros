import * as actionTypes from './actionTypes';
import axios from '../../axiosBase';

export const setMoviesInit = () => {
    return {
        type: actionTypes.SET_MOVIES_INIT
    }
}

export const reset = () => {
    return  {
        type: actionTypes.RESET
    }
}

export const setMovies = (movies, total) => {
    return {
        type: actionTypes.SET_MOVIES_SUCCESS,
        payload:{
            movies: movies,
            total: total
        }
    }
}

export const changeApi = (term) => {
    return {
        type: actionTypes.CHANGE_API,
        payload: term
    }
}

export const getMovie = (movie) => {
    return {
        type: actionTypes.GET_MOVIE,
        payload: {
            backdrop: movie.backdrop_path,
            budget: movie.budget,
            genres: movie.genres,
            homepage: movie.homepage,
            imdb: movie.imdb_id,
            id: movie.id,
            overview: movie.overview,
            poster_path: movie.poster_path,
            release_date: movie.release_date ? movie.release_date.slice(0, 4) : null,
            tv_premiere: movie.first_air_date ?  movie.first_air_date.slice(0, 4) : null,
            revenue: movie.revenue,
            runtime: movie.runtime,
            tagline: movie.tagline,
            title: movie.title,
            name: movie.name,
            vote_average: movie.vote_average,
            trailer: movie.videos.results[0].key,
            first_air_date: movie.first_air_date,
            last_air_date: movie.last_air_date,
            number_of_episodes: movie.number_of_episodes,
            number_of_seasons: movie.number_of_seasons,
        }
    }
}

export const actionMovies = (type, id, key, page) => {
    return dispatch => {
        // dispatch(reset())
        axios.get(`${type}/${id}?api_key=${key}&language=en-US&page=${page}`)
        .then(res => {
                dispatch(setMovies(res.data.results, res.data.total_results));
        })
        .catch(e => {
            // console.log('Error ActionMovies', e)
        })
    }
}

export const actionMoviesWithVideo = (type, id, key, page) => {
    return dispatch => {
        // dispatch(reset())
        axios.get(`${type}/${id}?api_key=${key}&language=en-US&append_to_response=videos&page=${page}`)
        .then(res => {
                dispatch(setMovies(res.data.results, res.data.total_results));
        })
        .catch(e => {
            // console.log('Error actionMoviesWithVideo', e)
        })
    }
}

export const getCrew = (actors, director) => {
    return {
        type: actionTypes.GET_CREW,
        payload: {
            director: director,
            actors: actors
        }
    }
}
export const getTrailer = (id, key, type) => {
   return dispatch => {
    axios.get(`${type}/${id}?api_key=${key}&language=en-US&append_to_response=videos`)
    .then(res => {
        if(res.data.videos.results.length > 0) {
            dispatch(storeTrailer(res.data.videos.results[0].key))  
        }
    })
   }
}

export const storeTrailer = (url) => {
    return {
        type: actionTypes.STORE_TRAILER,
        payload: url
    }
}

export const resetTrailer = () => {
    return {
        type: actionTypes.RESET_TRAILER
    }
}

export const pagePlus = () => {
    return {
        type: actionTypes.PAGE_PLUS
    }
}

export const pageMinus = () => {
    return {
        type: actionTypes.PAGE_MINUS
    }
}

export const resetPage = () => {
    return {
        type: actionTypes.RESET_PAGE
    }
}
