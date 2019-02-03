import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import * as actions from '../../store/actions';
import classes from './MovieSearch.module.scss';

class MovieSearch extends Component {
    state = {
        movieSearched: '',
        find: false,
        fromSearch: true
    }


    onChangeHandler = (e) => {
        this.setState({
            movieSearched: e.target.value
        })
        this.props.setName(e.target.value)
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        if(this.state.movieSearched.trim().length > 0) {
            this.props.resetPage();
            this.props.resetMovies();
            this.props.reset();
            this.props.resetPerson();
            this.setState({
                movieSearched: ''
            })
            this.props.history.push(`/search/movie/${this.state.fromSearch}/${this.props.name}`)
        } else {
            return;
        }
    }

    RedirectHandler = () => {
        if(this.props.movies){
            this.setState({
                find: true
            })
        }
         else {
            this.props.searchMovieFail();
        }
    }

    render() {
        // console.log(this.props.movies && !this.props.error)
        // let redirect = null
        // if (this.props.movies) {
        //     redirect = <Redirect to={`/movie/found`} />
        // }
        //  else if(this.props.error) {
        //     redirect = <Redirect to={`/movie/search/not_found`} />
        // }

        return (
            <div >
                <form className={classes.Box} onSubmit={this.onSubmitHandler}>
                    <Input value={this.state.movieSearched} onChange={this.onChangeHandler}/>
                    <Button  text="find movie" color='white' clicked={this.RedirectHandler} />
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        movies: state.searchMovie.movies,
        error: state.searchMovie.error,
        apiKey: state.movies.apiKey,
        page: state.movies.page,
        name: state.searchMovie.name
    }
}

const mapDispatchToProps = dispatch => {
    return {
        searchMovieFail: () => dispatch(actions.searchMovieFail()),
        resetMovies: () => dispatch(actions.resetMovies()),
        resetPage: () => dispatch(actions.resetPage()),
        reset: () => dispatch(actions.reset()),
        setName: (name) => dispatch(actions.setName(name)),
        resetPerson: () => dispatch(actions.resetPerson())
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MovieSearch));