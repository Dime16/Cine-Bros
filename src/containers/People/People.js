import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axiosBase';
import * as actions from '../../store/actions';
// import DisplayPeople from '../../components/DisplayPeople/DisplayPeople';
import MPCard from '../../components/UI/MPCard/MPCard';
import classes from './People.module.scss';

class People extends Component {
    
    componentDidMount () {
        axios.get(`person/popular?api_key=${this.props.apiKey}&language=en-US&page=${this.props.page}`)
            .then(res => {
                this.props.setPeople(res.data.results)
            })
            .catch(e => {
                // console.log(e)
            })
    }

    render () {
 
        return (
            // <div><DisplayPeople data={this.props.people} /></div>
            <div className={classes.people}><MPCard data={this.props.people} /></div>
        )
    }
}

const mapStateToProps = state => {
    return {
        people: state.people.people,
        apiKey: state.movies.apiKey,
        term: state.movies.term,
        page: state.movies.page
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setPeople: (people) => dispatch(actions.getPeople(people))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(People);