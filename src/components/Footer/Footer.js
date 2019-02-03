import React from 'react';

import camera from '../../img/popcorn.png';
import classes from './Footer.module.scss';
import { FaFacebook } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaMailchimp } from 'react-icons/fa';

const Footer = () => (
    <div className={classes.footer} >
        <div className={classes.copy}>
           <span className={classes.copy__year}>&#9400; 2019</span> Dime Najdovski
        </div>
        <div>
        <img className={classes.image} src={camera} alt='Logo' />
        </div>
        <div className={classes.contact}>
           <a className={classes.contact__icon} href="https://www.facebook.com/profile.php?id=1245482540" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
           <a className={classes.contact__icon} href="https://www.instagram.com/dimenajdovski/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
           <div className={classes.contact__icon}>
            <FaMailchimp className={classes.contact__hover}/>
           </div>
        </div>
    </div>
)

export default Footer;