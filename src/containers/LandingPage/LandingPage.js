import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Slider from '../Slider/Slider';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../store/actions';
import classes from './LandingPage.module.scss';

class LandingPage extends Component {

    componentDidMount() {
        this.props.setDiscover(this.props.apiKey, this.props.page);
    }

    resetHandler = () => {
        this.props.resetMovies();
        this.props.resetPage();
    }

    render() {
        let styleMovie = null;
        let styleSerie = null;
        let page = <Spinner />
        
        if (this.props.discoverMovies && this.props.discoverSeries) {
            styleMovie = { backgroundImage: `url(https://image.tmdb.org/t/p/original/${this.props.discoverMovies[0].backdrop_path}` }
            styleSerie = { backgroundImage: `url(https://image.tmdb.org/t/p/original/${this.props.discoverSeries[0].backdrop_path}` }
            page = (
                <div className={classes.Container}>
                    <div>
                        <Slider data={this.props.discoverMovies} />
                    </div>
                    <div className={classes.Bottom}>
                        <div style={styleMovie} className={classes.Bottom__box}>
                            <div className={classes.Links}>
                                <Link
                                    onClick={this.resetHandler}
                                    className={classes.Link}
                                    to='/movie/popular'
                                >
                                    Popular
                            </Link>
                                <Link
                                    onClick={this.resetHandler}
                                    className={classes.Link}
                                    to='/movie/top_rated'
                                >
                                    Top Rated
                            </Link>
                                <Link
                                    onClick={this.resetHandler}
                                    className={classes.Link}
                                    to='/movie/now_playing'
                                >
                                    Now Playing
                            </Link>
                            </div>
                            <div>
                                <h1 className={classes.Text}>Movies</h1>
                            </div>
                        </div>
                        <div style={styleSerie} className={classes.Bottom__box}>
                            <div>
                                <h1 className={classes.Text}>Series</h1>
                            </div>
                            <div className={classes.Links}>
                                <Link
                                    onClick={this.resetHandler}
                                    className={classes.Link}
                                    to='/tv/popular'
                                >
                                    Popular
                            </Link>
                                <Link
                                    onClick={this.resetHandler}
                                    className={classes.Link}
                                    to='/tv/top_rated'
                                >
                                    Top Rated
                            </Link>
                                <Link
                                    onClick={this.resetHandler}
                                    className={classes.Link}
                                    to='/tv/on_the_air'
                                >
                                    On tv
                            </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return page
    }
}

const mapStateToPros = state => {
    return {
        discoverMovies: state.discoverMovies.discoverMovies,
        discoverSeries: state.discoverMovies.discoverSeries,
        apiKey: state.movies.apiKey,
        page: state.movies.page,
        loading: state.discoverMovies.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetMovies: () => dispatch(actions.resetMovies()),
        resetPage: () => dispatch(actions.resetPage()),
        setDiscover: (key, page) => dispatch(actions.setDiscover(key, page))
    }
}


export default connect(mapStateToPros, mapDispatchToProps)(LandingPage);
