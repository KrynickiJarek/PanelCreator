import React from 'react';
import "./CreatorHeader.scss"
import { connect } from "react-redux"
import { t } from "../../../i18n";
import { useTranslation } from 'react-i18next';

import AmpioLogo from "../../../assets/ampio_logo.svg"
import actionsVisual from "../../MainCreator/PanelPreview/duck/actions"

const CreatorHeader = ({ version, changeLanguage }) => {

  const { i18n } = useTranslation();

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
        <button className="languale_button" style={{ fontWeight: i18n.language === "pl" ? 'bold' : 'normal' }} type="submit" onClick={() => { i18n.changeLanguage("pl"); rerenderAll() }}>
          PL
        </button>
        <span className="languale_slash">/</span>
        <button className="languale_button" style={{ fontWeight: i18n.language === "en" ? 'bold' : 'normal' }} type="submit" onClick={() => { i18n.changeLanguage("en"); rerenderAll() }}>
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