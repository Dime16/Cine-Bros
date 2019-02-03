import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import classes from './Pages.module.scss';


class  Pages extends Component {

    render () {
        const buttonBack = <Button  onClick={() => this.props.pageMinus()} disabled={this.props.page <= 1} labelPosition='left' color='green' icon='left chevron' content='Back' /> 
        const button = <Button color='green'>{this.props.page}</Button>
        const buttonNext = <Button onClick={() => this.props.pagePlus()} labelPosition='right' color='green' icon='right chevron' content='Next' />


        return (
            <div className={classes.buttons}>
                {buttonBack}
                {button}
                {buttonNext}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        page: state.movies.page
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        pagePlus: () => dispatch(actions.pagePlus()),
        pageMinus: () => dispatch(actions.pageMinus())
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(Pages);