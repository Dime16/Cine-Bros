import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import CircularProgressbar from 'react-circular-progressbar';
import { IoIosPlayCircle } from 'react-icons/io';
import { connect } from 'react-redux';
import { getTrailer, resetPage, resetPerson } from '../../store/actions'

import classes from './MovieCard.module.scss';


class MovieCard extends Component {

    clickHandler = () => {
        this.props.open()
        this.props.getTrailer(this.props.id, this.props.apiKey, this.props.match.params.type);
    }

    resetHandler = () => {
        this.props.resetPage();
        this.props.resetPerson()
    }

    render() {

        let Background = null;
        if (this.props.backdrop) {
            Background = `https:/image.tmdb.org/t/p/w500${this.props.backdrop}`
        }
        let color = null;
        let trail = null;
        if (+this.props.averageVote <= 4) {
            color = '#990000'
            trail = '#8f5258'
        } else if (+this.props.averageVote < 7 && +this.props.averageVote > 4) {
            color = '#FFFC33'
            trail = '#d2c799'
        } else {
            color = '#006600'
            trail = '#5ca078'
        }

        let movies = null
        if (this.props.backdrop) {
            movies = (
                <div className={classes.card} >
                    <div className={classes.clip} style={{ backgroundImage: `url(${Background})` }} >

                    </div>
                    <div className={classes.card__inner}>
                        <div className={classes.card__left}>
                            <div onClick={this.clickHandler} className={classes.card__left__play} >
                                <IoIosPlayCircle className={classes.card__left__icon} />
                            </div>
                            <img className={classes.card__img} src={`https://image.tmdb.org/t/p/w500/${this.props.poster}`} alt={`${this.props.title} title`} />
                        </div>

                        <div className={classes.card__right}>
                            <div className={classes.right}>
                                <div className={classes.right__top}>
                                    <Link onClick={this.resetHandler} className={classes.Link} key={this.props.id} to={`/title/${this.props.match.params.type ? this.props.match.params.type : 'movie'}/${this.props.id}`}>
                                        <h3 className={classes.card__right__title}>{this.props.title ? this.props.title : this.props.name}</h3>
                                        <div className={classes.card__wrap}>
                                            <div className={classes.card__rating}>
                                                <CircularProgressbar
                                                    styles={{
                                                        background: { fill: '#454545' },
                                                        trail: { stroke: `${trail}` },
                                                        path: { stroke: `${color}` },
                                                        text: { fill: '#fff', fontSize: '24px', fontWeight: '700' },
                                                    }}
                                                    backgroundPadding={8}
                                                    background
                                                    initialAnimation
                                                    percentage={this.props.averageVote * 10}
                                                    text={`${this.props.averageVote * 10}%`}
                                                />

                                            </div>
                                            <p className={classes.card__voters}>from {this.props.voteCount} voters</p>
                                        </div>
                                    </Link>
                                </div>
                                <div className={classes.right__bottom}>
                                    <Link onClick={this.resetHandler} className={classes.Link} key={this.props.id} to={`/title/${this.props.match.params.type ? this.props.match.params.type : 'movie'}/${this.props.id}`}>
                                        <p className={classes.card__right__overview}>Movie plot: <span> {this.props.overview}</span></p><span className={classes.card__right__dots}>... read more</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className={classes.box}>
                {movies}
            </div>
        )
    }
}

const mapStatetoProps = state => {
    return {
        apiKey: state.movies.apiKey
    }
}


export default connect(mapStatetoProps, { getTrailer, resetPage, resetPerson })(withRouter(MovieCard));
