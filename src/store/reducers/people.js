import * as actionTypes from '../actions/actionTypes'

const INITIAL_STATE = {
    people: null,
    personId: null,
    movies: null,
    person: {
        name: '',
        birthDay: null,
        deathday: null,
        biography: '',
        image: '',
        knownFor: '',
        placeOfBirth: ''
    }
}

const peopleReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case actionTypes.GET_PEOPLE_SUCCESS:
            return {
                ...state,
                people: action.payload
            }
        case actionTypes.SET_PERSON:
            return{
                ...state,
                person: {
                    ...action.payload
                }
            }
        case actionTypes.SET_PERSON_ID:
            return {
                ...state,
                personId: action.payload.id,
                movies: [...action.payload.movies]
            }
        case actionTypes.SET_PERSON_MOVIES:
            return {
                ...state,
                movies: [...action.payload]
            }

        case actionTypes.RESET_PERSON:
            return {
                ...state,
               person: {...INITIAL_STATE.person},
               movies: null
            }
        default: 
            return state
    }
}

export default peopleReducer;