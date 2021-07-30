import React from 'react';
import "./CreatorHeader.scss"
import { connect } from "react-redux"

import AmpioLogo from "../../../assets/ampio_logo.svg"

const CreatorHeader = ({ version }) => {
  return (
    <div className="header_container">
      <div className="nav_container">
        <a href="https://ampio.pl/" className="nav_brand">
          <img src={AmpioLogo} alt="Ampio logo" className="nav_logo" />
        </a>
        <h1 className="nav_header">KREATOR PANELI</h1>
      </div>
      <p className="version">ver {version}</p>
    </div >
  );
};

const mapStateToProps = state => ({
  version: state.frontEndData.visual.version,
})

export default connect(mapStateToProps, null)(CreatorHeader)