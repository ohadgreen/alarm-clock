import React from 'react';
import { Digit } from './DigitDesign';
import { Colon } from './ColonDesign';
import './ClockDisplay.css';
import './ColonDesign.css';

export const ClockDisplay = props => {
    if (!props.time || props.time == null || props.time === 'undefined') {
        return null;
    }

    else {
    const time = props.time.toString();
    const H1 = time.charAt(0);
    const H2 = time.charAt(1);
    const M1 = time.charAt(3);
    const M2 = time.charAt(4);
    const S1 = time.charAt(6);
    const S2 = time.charAt(7);

    return (
        <div className="clock-container">                   
            <div className="H1"><Digit digit={H1}/></div>
            <div className="H2"><Digit digit={H2}/></div>
            <div className="col1"><Colon /></div>
            <div className="M1"><Digit digit={M1}/></div>
            <div className="M2"><Digit digit={M2}/></div>
            <div className="col2"><Colon /></div>
            <div className="S1"><Digit digit={S1}/></div>
            <div className="S2"><Digit digit={S2}/></div>
        </div>
    )
    }
}