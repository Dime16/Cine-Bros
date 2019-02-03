import React from 'react';
import movieLogo from '../../../../img/Logo.png'
import classes from './Logo.module.scss';
import { Link } from 'react-router-dom';

const Logo = props => (
    <Link onClick={props.clicked} className={classes.Box} to='/'>
        <div className={classes.Box} >
        <img className={classes.Logo} src={movieLogo} alt='Logo' />
        <h3 className={classes.text}>Cine-Bros</h3>
        </div>
    </Link>
)

export default Logo;