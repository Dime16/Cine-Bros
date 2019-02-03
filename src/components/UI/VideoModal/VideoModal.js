import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import classes from './VideoModal.module.scss';


const VideoModal = props => (
  
    props.open ? 
    <React.Fragment>
        <Backdrop show={props.open} />
        <div className={classes.Modal}>
            <button className={classes.Button} onClick={props.onClick}>&#10006;</button>
            <iframe title="Trailer" className={classes.Frame} src={`https://www.youtube.com/embed/${props.link}?autoplay=true`} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" frameBorder="0" allowFullScreen ></iframe>
        </div>
    </React.Fragment> :
    null
)
            
export default VideoModal;