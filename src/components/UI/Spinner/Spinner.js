import React from 'react';
import classes from './Spinner.module.css'
import { BounceLoader } from 'react-spinners';

const SpinnerC = () => (
    <div className={classes.spinner}>
           <BounceLoader color={'#CCC20E'} loading={true} size={90} />
    </div>
)

export default SpinnerC;