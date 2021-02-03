import React from 'react';
import "./CreatorHeader.scss"

import AmpioLogo from "../../assets/ampio_logo.png"

const CreatorHeader = () => {
    return (
        <div className="header_container">
            <img src={AmpioLogo} alt="Ampio logo" className="ampio_logo"/>
            <h1>Kreator Paneli  </h1>
        </div>
    );
};

export default CreatorHeader;