
import React, { useEffect, useState } from 'react';
import './hole.scss';


const Hole = (props) => {

    return (
    <div className="Hole" key={props.id}>        
        {
            props.molPos !== props.id ? null : 
                <div className="mole" onClick={props.Addhit}></div>
        }
    </div>);
}

export default Hole;