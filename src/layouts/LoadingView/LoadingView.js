import React from 'react';
import "./LoadingView.scss"
import AmpioLogo from "../../assets/ampio_logo.png"

const LoadingView = () => {

  return (
    <div className="loading_container">
      <img src={AmpioLogo} alt="Ampio logo" className="loading_logo" />
    </div>
  )
};


export default LoadingView