import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../../components/UI/Spinner/Spinner';
import MovieList from '../../MovieList/MovieList';
import axios from '../../../axiosBase';
import * as actions from '../../../store/actions';
import classes from './DisplayPerson.module.scss';
// import { Button, Segment, Icon } from 'semantic-ui-react'


class PersonCard extends Component {
    state = {
        show: 'movies'
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`person/${id}?api_key=${this.props.apiKey}&language=en-US`)
            .then(res => {
                this.props.setPerson(res.data);
            });
    }

    seriesHandler = () => {
        this.setState({
            show: 'series'
        })
    }

    moviesHandler = () => {
        this.setState({
            show: 'movies'
        })
    }


    render() {
        let person = <Spinner />

        if (this.props.image) {
            person = (
                <div className={classes.Container}>
                    <div className={classes.Box}>
                        <div className={classes.Box__left}>
 
                                <div className={classes.photo}>
                                    <h1 className={classes.title}>{this.props.name}</h1>
                                     <img src={`https://image.tmdb.org/t/p/w500/${this.props.image}`} alt={this.props.name} />
                                    <div className={classes.glow_wrap}>
                                        <i className={classes.glow}></i>
                                    </div>
                                </div>
                            <div>
                                <h5 className={classes.title}>Known for</h5>
                                <p className={classes.text}>{this.props.knownFor}</p>
                            </div>
                            <div>
                                <h5 className={classes.title}>Birthday</h5>
                                <p className={classes.text}>{this.props.birthDay}</p>
                            </div>
                            <div>
                                <h5 className={classes.title}>Place of Birth</h5>
                                <p>{this.props.placeOfBirth}</p>
                            </div>
                        </div>
                        <div className={classes.Box__right}>
                            <div>
                                <h3 className={classes.title}>{this.props.name}</h3>
                            </div>
                            <div>
                                <p className={classes.text}>{this.props.biography.length > 1 ? this.props.biography : 'We have no details for this person'}</p>
                            </div>
                            <div className={classes.known}>
                            <h3>Known For:</h3>
                            </div>
                        </div>
                    </div>
                    <div>
                        <MovieList person={true} />
                    </div>
                </div>
            )
        }
        return person;
    }
}

const mapStateToProps = state => {
    return {
        apiKey: state.movies.apiKey,
        id: state.people.personId,
        name: state.people.person.name,
        birthDay: state.people.person.birthDay,
        deathday: state.people.person.deathday,
        biography: state.people.person.biography,
        image: state.people.person.image,
        placeOfBirth: state.people.person.placeOfBirth,
        knownFor: state.people.person.knownFor,
        movies: state.people.movies
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setPerson: (person) => dispatch(actions.setPerson(person))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonCard)

