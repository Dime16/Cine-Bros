import React from 'react';
import classes from './Input.module.scss';

const Input = props => (
    <React.Fragment>
        <input value={props.value} className={classes.Input} onChange={props.onChange} />
    </React.Fragment>   
)

export default Input