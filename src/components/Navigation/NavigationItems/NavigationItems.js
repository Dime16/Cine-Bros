import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Logo from '../NavigationItem/Logo/Logo';
import classes from './NavigationItems.module.scss';
import MovieSearch from '../../../containers/MovieSearch/MovieSearch';

import { resetPage, resetError } from '../../../store/actions';



class NavigationItems extends Component {

    resetHandler = () => {
        this.props.resetError();
        this.props.resetPage();
    }

    render() {
        const multiClasses = [classes.ListLink, classes.btn, classes.first];

        return (
            <div className={classes.Navigation}>

                <nav className={classes.Inner}>
                    <Logo clicked={this.resetHandler } />
                    <ul className={classes.List}>
                        <li className={classes.Item}>
                            <Link onClick={this.resetHandler} className={multiClasses.join(' ')} to='/movie/popular'>MOVIES</Link>
                        </li>
                        <li className={classes.Item}>
                            <Link onClick={this.resetHandler} className={multiClasses.join(' ')} to='/tv/popular'>TV SHOWS</Link>
                        </li>
                        <li className={classes.Item}>
                            <Link onClick={this.resetHandler} className={multiClasses.join(' ')} to='/person/popular'>PEOPLE</Link>
                        </li>
                    </ul>
                    <div className={classes.Search}>
                    <MovieSearch />
                    </div>          
                </nav>
            </div>
        )
    }
}



export default connect(null, { resetError, resetPage })(NavigationItems);
