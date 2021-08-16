import React from 'react';
import "./CreatorHeader.scss"
import { connect } from "react-redux"
import i18n, { t } from "../../../i18n";

import AmpioLogo from "../../../assets/ampio_logo.svg"
import actionsVisual from "../../MainCreator/PanelPreview/duck/actions"

const CreatorHeader = ({ version, changeLanguage }) => {

  const rerenderAll = () => {
    changeLanguage()
  }


  return (
    <div className="header_container">
      <div className="nav_container">
        <a href="https://ampio.pl/" className="nav_brand">
          <img src={AmpioLogo} alt="Ampio logo" className="nav_logo" />
        </a>
        <h1 className="nav_header">{t("PANELS_CREATOR")}</h1>
      </div>
      <p className="version">ver {version}</p>


      <div className="languale_button_box">
        <button className="languale_button" style={{ fontWeight: i18n.language.split('-')[0] === "pl" ? 'bold' : 'normal' }} type="submit" onClick={() => { i18n.changeLanguage("pl"); rerenderAll() }}>
          PL
        </button>
        <span className="languale_slash">/</span>
        <button className="languale_button" style={{ fontWeight: i18n.language.split('-')[0] === "en" ? 'bold' : 'normal' }} type="submit" onClick={() => { i18n.changeLanguage("en"); rerenderAll() }}>
          ENG
        </button>
      </div>

    </div >
  );
};

const mapStateToProps = state => ({
  version: state.frontEndData.visual.version,
  languageRender: state.frontEndData.visual.languageRender,
})

const mapDispatchToProps = dispatch => ({
  changeLanguage: (income) => dispatch(actionsVisual.changeLanguage(income)),

})


export default connect(mapStateToProps, mapDispatchToProps)(CreatorHeader)