import React from 'react';
import { Link } from 'react-router-dom';
import classes from './MPCard.module.scss';

const MPCard = props => {
  let crew = null
  if (props.crew) {
    crew = props.crew.map(actor => {
      return (
        <Link  to={`/people/movie/${actor.id}`} key={actor.id}>
          <div className={classes.wrapper}>
            <div className={classes.card}>
              <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name} />
              <div className={classes.info}>
                <h1>{actor.name}</h1>
                <p>{actor.character}</p>
              </div>
            </div>
          </div>
        </Link>
      )
    })
  } else if (props.data) {
    crew = props.data.map(actor => {
      return (
        <Link  to={`/people/movie/${actor.id}`} key={actor.id}>
          <div className={classes.wrapper}>
            <div className={classes.card}>
              <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name} />
              <div className={classes.info}>
                <h1>{actor.name}</h1>
                <p>{actor.character}</p>
              </div>
            </div>
          </div>
        </Link>
      )
    })
  }
  const style = props.data ? classes.Flex : classes.Box;
  return (
    <div className={style}>
      {crew}
    </div>
  );
};

export default MPCard;
