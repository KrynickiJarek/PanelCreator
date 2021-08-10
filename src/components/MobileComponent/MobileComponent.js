import React from 'react';
import "./MobileComponent.scss"

import AmpioLogo from "../../assets/ampio_logo.svg"
import Mobile from "../../assets/mobile.svg"

const MobileComponent = () => {
  return (
    <div className="mobile_container">
      <div className="header_mobile_container">
        <div className="nav_mobile_container">
          <a href="https://ampio.pl/" className="nav_brand">
            <img src={AmpioLogo} alt="Ampio logo" className="nav_logo" />
          </a>
        </div >
      </div>
      <div className="content_mobile_container">
        <h1 className="mobile_header">Kreator Paneli</h1>
        <p className="mobile_instruction_normal">Strona nie działa na urządzeniach mobilnych. Do prawidłowego działania Kreatora Paneli wymagana jest przeglądarka Google Chrome w desktopowej wersji.</p>
        <img src={Mobile} alt="mobile" className="mobile_icon" />
      </div >
    </div >
  );
};


export default MobileComponent