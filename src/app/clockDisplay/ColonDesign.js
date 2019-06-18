import React from 'react';
import './ColonDesign.css';

export const Colon = props => {    
    return (
        <div className="colon-container">                   
            {createTable()}
        </div>
    )    
}

function createTable() {
    let cellArray = [];
    for (let y = 1; y <= 9; y++) {
        for (let x = 1; x <= 3; x++) {        
            const cName = 'c' + y + '-' + x;
            cellArray.push(<div key={cName} className={cName}></div>);        
        }
    }
    return cellArray;
}