import React from 'react';
import classes from './Button.module.css';

const Button = props => {
    const multiClasses = [classes.btn, classes.first];
    return (
        <div>
            <button onClick={props.clicked} className={multiClasses.join(' ')}>
                {props.text}
        </button>
        </div>
    )

}

export default Button;