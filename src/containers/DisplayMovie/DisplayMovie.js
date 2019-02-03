import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axiosBase';

import { FaImdb } from 'react-icons/fa';
import { FaPlay } from 'react-icons/fa';
import { FaExternalLinkSquareAlt } from 'react-icons/fa';
import CircularProgressbar from 'react-circular-progressbar';

import VideoModal from '../../components/UI/VideoModal/VideoModal';
import MPCard from '../../components/UI/MPCard/MPCard';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../store/actions';
import 'react-circular-progressbar/dist/styles.css';
import classes from './DisplayMovie.module.scss';


class DisplayMovie extends Component {
    state = {
        open: false
    }

    componentWillMount () {
        const params = this.props.match.params.type ? this.props.match.params.type : this.props.term
        axios.get(`${params}/${this.props.match.params.id}?api_key=${this.props.apiKey}&language=en-US&append_to_response=videos`)
        .then(res => {
            this.props.getMovie(res.data)
        })
        .catch(e => {
        })
    axios.get(`${params}/${this.props.match.params.id}/credits?api_key=${this.props.apiKey}`)
        .then(res => {
            
            this.props.getCrew(res.data.cast.slice(0, 6), res.data.crew.slice(0, 6))
        })
    }

    componentWillUnmount () {
        this.props.reset()
    }

    openModalHandler = () => {
        this.setState(prevState =>({open: !prevState.open}))
    }

    render() {
        let Background = null
        if (this.props.backdrop) {
            Background = `https:/image.tmdb.org/t/p/original${this.props.backdrop}`
        }
        let color = null;
        let trail = null;
        if(+this.props.vote_average <= 4) {
            color = '#990000'
            trail = '#8f5258'
        } else if (+this.props.vote_average < 7 && +this.props.vote_average > 4){
            color = '#FFFC33'
            trail = '#d2c799'
        } else {
            color = '#006600'
            trail = '#5ca078'
        }
        let crew = null;
        if(this.props.crew) {
            crew = this.props.crew.map(worker => (
                <div key={worker.credit_id} className={classes.Worker}>
                    <h4>{worker.name}</h4>
                    <p>{worker.job}</p>
                </div>
            ))
        }
        let actors = null;
        if(this.props.actors) {
            // actors =  <CrewCard crew={this.props.actors} />
            actors =  <MPCard crew={this.props.actors} />
        }

        const hours = Math.floor(this.props.runtime / 60);
        const minutes = Math.round((((this.props.runtime / 60) - hours) * 60));
        let seasons = null;
        let episodes = null
        let first_air = null;
        let last_air = null;
        let tagline = null
        if(this.props.match.params.type !== 'movie'){
            seasons = <div className={classes.Icons__two}><p className={classes.time}>Number of seasons: {this.props.number_of_seasons}</p></div> 
            episodes = <div className={classes.Icons__two}><p className={classes.time}>Number of episodes: {this.props.number_of_episodes}</p></div> 
            first_air = <div className={classes.Icons__two}>
                    <p className={classes.time}>Fist episode played: {this.props.first_air_date}</p>
                </div>
            

            last_air = <div className={classes.Icons__two}>
                    <p className={classes.time}>Last episode played: {this.props.last_air_date}</p>
                </div>
        } else {
            seasons = <div className={classes.Icons__two}><p className={classes.time}>Play time: {hours}h {minutes}min</p></div> 
            tagline = <div className={classes.Icons__two}><h5 className={classes.tagline}>{this.props.tagline}</h5></div> 
            first_air = <div className={classes.Icons__two}>
                    <p className={classes.time}>Budget: {this.props.budget} $</p>
                </div>
            

            last_air = <div className={classes.Icons__two}>
                    <p className={classes.time}>Revenue: {this.props.revenue} $</p>
                </div>
        }

        let link = null;
        if(this.props.homepage) {
            link = <a href={this.props.homepage} target='blank' className={classes.homepage}>Go To Website <FaExternalLinkSquareAlt className={classes.homepage__icon}/></a>   
        }
        let movie = <Spinner />
        if(this.props.actors  && this.props.vote_average) {
            movie  = (
            <div className={classes.Bg} >
                <div style={{
                backgroundImage: `linear-gradient(to bottom, rgb(0,20,41, .8) 100%, rgb(0,20,41, .8) 100%), url(${Background})`,
                width: '100%',
                backgroundPosition: 'top',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }} className={classes.Movie}>
                    <div className={classes.Left}>
                        <img className={classes.Image} src={`https://image.tmdb.org/t/p/w500/${this.props.poster_path}`} alt="Movie Poster" />
                       {link}
                    </div>
                    <div className={classes.Right}>
                        <div className={classes.Name}>
                            <h2>{this.props.match.params.type === 'movie' ? this.props.title : this.props.name} <span>({this.props.match.params.type === 'movie' ? this.props.release_date : this.props.tv_premiere})</span></h2>
                        </div>
                        <div className={classes.IconBox}>
                                <div className={classes.Progress}>
                                    <CircularProgressbar
                                        styles={{
                                            background: { fill: '#454545' },
                                            trail: { stroke: `${trail}` },
                                            path: { stroke: `${color}` },
                                            text: { fill: '#fff', fontSize: '22px', fontWeight: '700' },
                                        }}
                                        backgroundPadding={8}
                                        background
                                        initialAnimation
                                        percentage={this.props.vote_average * 10}
                                        text={`${this.props.vote_average * 10}%`}
                                    />
                                    <span className={classes.ProgressText}>User Score</span>
                                </div>
                            <div  className={classes.Icons}>
                            <a target='blank' href={`https://www.imdb.com/title/${this.props.imdb}`}><FaImdb className={classes.Icon__imdb} /></a>
                            </div>
                            <div onClick={this.openModalHandler} className={classes.Trailer}>
                                <FaPlay className={classes.Icon} />
                                <span className={classes.ProgressText}>Play Trailer</span>
                            </div>
                        </div>
                        <div className={classes.IconBox}>
                            {seasons}
                            {tagline}
                            {episodes}
                    
                        </div>
                        <div className={classes.IconBox}>
                            {first_air}
                            {last_air}
                    
                        </div>
                        <div className={classes.Overview}>
                            <h3>Overview</h3>
                            <p>{this.props.overview}</p>
                        </div>

                        <div>
                            <div className={classes.WorkerBox}>
                                {crew}
                            </div>
                        </div>
                    </div>
                </div>
                <React.Fragment>
{actors}
                </React.Fragment>

                <VideoModal
                    open={this.state.open}
                    onClick={this.openModalHandler}
                    link= {this.props.trailer}
                />
            </div>
            )
        }
        return movie;
    }
}

const mapStateToProps = state => {
    return {
        apiKey: state.movies.apiKey,
        backdrop: state.movies.movie.backdrop,
        budget: state.movies.movie.budget,
        homepage: state.movies.movie.homepage,
        overview: state.movies.movie.overview,
        poster_path: state.movies.movie.poster_path,
        first_air_date: state.movies.movie.first_air_date,
        last_air_date: state.movies.movie.last_air_date,
        number_of_episodes: state.movies.movie.number_of_episodes,
        number_of_seasons: state.movies.movie.number_of_seasons,
        id: state.movies.movie.id,
        release_date: state.movies.movie.release_date,
        tv_premiere: state.movies.movie.tv_premiere,
        revenue: state.movies.movie.revenue,
        runtime: state.movies.movie.runtime,
        tagline: state.movies.movie.tagline,
        title: state.movies.movie.title,
        vote_average: state.movies.movie.vote_average,
        trailer: state.movies.movie.trailer,
        crew: state.movies.crew.director,
        actors: state.movies.crew.actors,
        name: state.movies.movie.name,
        imdb: state.movies.movie.imdb
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getMovie: (movie) => dispatch(actions.getMovie(movie)),
        getCrew: (actors, director) => dispatch(actions.getCrew(actors, director)),
        reset: () => dispatch(actions.reset())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayMovie);