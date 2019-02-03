import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getPeople = (people) => {
    return {
        type: actionTypes.GET_PEOPLE_SUCCESS,
        payload: people
    }
}

export const setPersonId = (id, movies) => {
    return {
        type: actionTypes.SET_PERSON_ID,
        payload: {
            id: id,
            movies: movies
        }
    }
}

export const setPerson = (person) => {
    return {
        type: actionTypes.SET_PERSON,
        payload: {
            knownFor: person.known_for_department,
            name: person.name,
            birthDay: person.birthday,
            placeOfBirth: person.place_of_birth,
            deathday: person.deathday,
            biography: person.biography,
            image: person.profile_path
        }
    }
}

export const setPersonMovies = (movies) => {
    return {
        type: actionTypes.SET_PERSON_MOVIES,
        payload: movies
    }
}

export const resetPerson = () => {
    return {
        type: actionTypes.RESET_PERSON
    }
}

export const actionPerson = (id, key) => {
    return dispatch => {
        axios.all([
            axios.get(`https://api.themoviedb.org/3/person/${id}/tv_credits?api_key=${key}&language=en-US`),
            axios.get(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${key}&language=en-US`)
          ])
          .then(res => {
            dispatch(setPersonMovies(res[1].data.cast));
        });
    }
}
