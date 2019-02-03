import React, { Component } from 'react';
import { connect } from 'react-redux'

import ErrorModal from '../UI/Modal/Modal';
import MovieCard from '../MovieCard/MovieCard';
import Spinner from '../UI/Spinner/Spinner';
import classes from './DisplayMovies.module.scss';
import Pages from '../../components/Pages/Pages';


class DisplayMovies extends Component {
    render() {
        let movies = <Spinner />
        let pages =  null
        if (this.props.data) {
            pages =  this.props.totalSecond > 20 ? <Pages /> : null
            movies = this.props.data.filter(val => {
                return val.backdrop_path
            })
            .map(movie => {
                return (
                    <MovieCard
                        key={movie.id}
                        title={movie.title}
                        release={movie.release_date}
                        tv_premiere={movie.tv_premiere}
                        overview={movie.overview}
                        averageVote={movie.vote_average}
                        voteCount={movie.vote_count}
                        poster={movie.poster_path}
                        backdrop={movie.backdrop_path}
                        id={movie.id}
                        name={movie.name}
                        trailerClick={this.props.trailerClick}
                        open={this.props.open}
                    />
                )
            })
        } 
        else if(this.props.movies) {
            pages =  this.props.total > 20 || !this.props.person ? <Pages /> : null
            movies = this.props.movies.filter(val => {
                return val.backdrop_path
            }).map(movie => {
                return (
                    <MovieCard
                        key={movie.id}
                        title={movie.title}
                        release={movie.release_date}
                        tv_premiere={movie.tv_premiere}
                        overview={movie.overview}
                        averageVote={movie.vote_average}
                        voteCount={movie.vote_count}
                        poster={movie.poster_path}
                        backdrop={movie.backdrop_path}
                        id={movie.id}
                        name={movie.name}
                        trailerClick={this.props.trailerClick}
                        open={this.props.open}
                    />
                )
            })
        }else if(this.props.match.params.not_found === 'not_found') {
            movies = <ErrorModal />
        }
        
        return (
            <div className={classes.container}>
                {pages}
            <div className={classes.box}>
                {movies}
            </div>
                {pages}
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        movies: state.searchMovie.movies,
        total: state.searchMovie.total,
        totalSecond: state.movies.total
    }
}


export default connect(mapStateToProps)(DisplayMovies);