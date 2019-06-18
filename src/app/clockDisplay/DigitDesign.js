import React from 'react';
import { digitsDesignMap } from './DigitsDesignMap';
import './DigitDesign.css';

/*
digits are designed in pixel-like 5 X 9 bit array in DigitsDesignMap.js file
the cells background is set black or red according to 0 / 1 in the bit map
*/

export const Digit = props => {
    const digitMap = digitsDesignMap.filter(d => d.digit === props.digit)[0];
    return (
        <div className="digit-container">                   
            {createTable(digitMap.designMap)}
        </div>
    )    
}

function createTable(digitMap) {
    let cellArray = [];
    for (let y = 1; y <= 9; y++) {
        for (let x = 1; x <= 5; x++) {        
            const cellOnOff = digitMap[(y-1) * 5 + x - 1];
            cellArray.push(renderCell(y, x, cellOnOff));        
        }
    }
    return cellArray;
}

function renderCell(y, x, on) {
    const cName = 'd' + y + '-' + x;
    const cellStyle = {  backgroundColor: on === 1 ? 'red' : 'black' }; 
    return (<div key={cName} className={cName} style={cellStyle}></div>
    )
}
