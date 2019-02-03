import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import movieReducer from './store/reducers/movies';
import searchMoviereducer from './store/reducers/searchMovie';
import discoverMoviesReducer from './store/reducers/discover';
import peopleReducer from './store/reducers/people';
import thunk from 'redux-thunk';



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
    movies: movieReducer,
    searchMovie: searchMoviereducer,
    discoverMovies: discoverMoviesReducer,
    people: peopleReducer
})
const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
  );


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter basename='/cine_bros'>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
