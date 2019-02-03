import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel';
import Spinner  from '../../components/UI/Spinner/Spinner';
import classes from './Slider.module.scss';


class Slider extends Component {

    render() {
        let percent = 33.5;
        if(window.innerWidth <= 1800 && window.innerWidth > 1500) {
            percent = 40
        } else if (window.innerWidth <= 1500 && window.innerWidth > 1250) {
            percent = 50
        } else if (window.innerWidth <= 1250 && window.innerWidth > 1000) {
            percent = 60
        } 
        else if (window.innerWidth <= 1000 && window.innerWidth > 900) {
            percent = 50
        }
         else if (window.innerWidth <= 900 && window.innerWidth > 600) {
            percent = 60
        }
        else if (window.innerWidth <= 600 ) {
            percent = 80
        }


        let style = { width: '45%', height: '40vh' };
        if(window.innerWidth < 1000 && window.innerWidth > 900) {
            style = { width: '75%', height: '40vh' };
        } else if (window.innerWidth <= 900 && window.innerWidth > 650) {
            style = { width: '75%', height: '40vh' }
        }
        else if (window.innerWidth <= 650 && window.innerWidth > 500) {
            style = { width: '75%', height: '30vh' }
        }
        else if (window.innerWidth <= 500) {
            style = { width: '80%', height: '30vh' }
        }
        let slicks = null;
        let carousel = <Spinner />
        if(this.props.data){
            slicks = this.props.data.map(slick => {
                return (
                    <Link key={slick.id} to={`/title/movie/${slick.id}`}>
                        <div className={classes.Box}>
                            <img style={style} src={`https://image.tmdb.org/t/p/w500/${slick.poster_path}`} alt='Poster' />
                            <p className="legend">{slick.title}</p>
                        </div>
                    </Link>
                )
            })
            carousel = (
                <Carousel
                showStatus={false}
                autoPlay={true}
                infiniteLoop={true}
                interval={4000}
                selectedItem={1}
                centerSlidePercentage={percent}
                centerMode={true}
                showIndicators={false}
                showArrows={true}
                showThumbs={false}
            >
                {slicks}
            </Carousel>
            )
        }

        return (
            <div className={classes.Container}>
                {carousel}
            </div>
        );
    }
};

export default Slider;