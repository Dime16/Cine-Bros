import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import axios from '../../axiosBase';
import Modal from '../../components/UI/Modal/Modal';
import DisplayMovies from '../../components/DisplayMovies/DisplayMovies';
import VideoModal from '../../components/UI/VideoModal/VideoModal';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions'

class MovieList extends Component {

    state = {
        open: false
    }

    componentDidMount() {
        if(this.props.person) {
            this.props.actionPerson(this.props.match.params.id, this.props.apiKey)
        } else if (this.props.match.params.true === "true") {
            this.props.actionSearchMovies(this.props.apiKey, this.props.match.params.name)
            this.setState({
                movieSearched: ''
            })
        }
        else if (this.props.match.params.true !== "true") {

            this.props.actionMovies(this.props.match.params.type,
                                    this.props.match.params.id, 
                                    this.props.apiKey, 
                                    this.props.page)

        }

    }
    componentDidUpdate(prevProps) {
        if(this.props.match.params.name && (this.props.match.params.name !== prevProps.match.params.name || this.props.page !== prevProps.page)) {
            this.props.resetSearchMovies()

            this.props.actionSearchMoviesPage(this.props.apiKey, this.props.match.params.name, this.props.page)
        } else if (this.props.match.params.true !== "true" && (this.props.match.params.type === 'movie' || this.props.match.params.type === 'tv' || this.props.page !== prevProps.page)) {
            axios.get(`${this.props.match.params.type}/${this.props.match.params.id}?api_key=${this.props.apiKey}&language=en-US&append_to_response=videos&page=${this.props.page}`)
            .then(res => {
                if (+this.props.total !== +res.data.total_results || prevProps.page !== this.props.page) {
                    this.props.setMovies(res.data.results, res.data.total_results)
                }
            })
            .catch(e => {
                // console.log('error from component did update', e )
            })
    }
}


    openModalHandler = () => {
        this.setState(prevState =>({open: !prevState.open}))
        this.props.resetTrailer();
    }
    trailerOpenHandler = () => {
        this.setState({open:true})
    }



    render () {
       
        let modal = null;
        if(this.props.trailer && this.state.open) {
            modal =  <VideoModal
                        open={this.state.open}
                        onClick={this.openModalHandler}
                        link= {this.props.trailer}
                    /> 
        }
         let displayMovies = <Spinner />;
        if(this.props.movies) {
            displayMovies =  <DisplayMovies data={this.props.movies} open={this.trailerOpenHandler} />
        } else if (this.props.personMovies) {
            displayMovies =  <DisplayMovies person={true} data={this.props.personMovies} open={this.trailerOpenHandler} />
        } else if (this.props.searchMovie) {
            displayMovies =  <DisplayMovies data={this.props.searchMovie} open={this.trailerOpenHandler} />
        } else {
            displayMovies = <Modal />
            
        }
        return (
            <React.Fragment>
                {displayMovies}
                {modal}
            </React.Fragment>
        ) 
    }
}

const mapStateToProps = state => {
    return {
        movies: state.movies.movies,
        searchMovie: state.searchMovie.movies,
        apiKey: state.movies.apiKey,
        page: state.movies.page,
        total: state.movies.total,
        trailer: state.movies.trailer,
        personMovies: state.people.movies
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setMovies: (movies, total) => dispatch(actions.setMovies(movies, total)),
        resetTrailer: () => dispatch(actions.resetTrailer()),
        resetSearchMovies: () => dispatch(actions.resetMovies()),
        actionPerson: (id, key) => dispatch(actions.actionPerson(id, key)),
        actionSearchMovies: (key, name) => dispatch(actions.actionSearchMovies(key, name)),
        actionMovies: (type, id, key, page) => dispatch(actions.actionMovies(type, id, key, page)),
        actionSearchMoviesPage: (key, name, page) => dispatch(actions.actionSearchMoviesPage(key, name, page)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MovieList));