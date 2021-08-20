import React, { useState } from 'react';
import { connect } from "react-redux"
import actions from "./duck/actions"
import actionsVisual from "../../PanelPreview/duck/actions"

import "./TextEditor.scss"
import { t } from "../../../../i18n";

import Locked from "../../../../assets/preview/lock.svg"
import Unlocked from "../../../../assets/preview/unlock.svg"

const TextEditor = ({ chosenTextFont, changeTextFont, visual, toggleVisual }) => {

  const [unlock, setUnlock] = useState(false)


  return (
    <div className="scroll_container">
      <div className="visual_background" style={visual ? { opacity: "1", zIndex: "999" } : { opacity: "0", zIndex: "-1" }}>
        <div className="visual_container">
          <div className="visual_info_box">
            {unlock ?
              <img src={Unlocked} alt="unlocked" className="visual_image" />
              :
              <img src={Locked} alt="locked" className="visual_image" />
            }
            <h2 className="visual_info">{t("NOT_AVALIBLE_IN_VISUALIZATION_MODE")}</h2>
          </div>
          <div className="visual_button"
            onClick={() => toggleVisual(!visual)}
            onMouseOver={() => setUnlock(true)}
            onMouseLeave={() => setUnlock(false)}
          >
            {t("EDIT_MODE")}
            <div className="button_arrows" />
          </div>
        </div>
      </div>
      <div className="text_container">
        <h2 className="text_header">{t("TITLE_HEADER")}</h2>
        <p className="instruction_bold">{t("TITLE_INSTRUCTION_BOLD")}</p>
        <p className="instruction">{t("TITLE_INSTRUCTION_NORMAL")}</p>
        <div className="text_content">


          <div className="font_link" style={chosenTextFont === "Calibri-bold" ? { border: "3px solid #EC695C", fontFamily: "Calibri-bold" }
            : { fontFamily: "Calibri-bold" }}
            onClick={() => { changeTextFont("Calibri-bold") }} >
            {chosenTextFont === "Calibri-bold" && <div className="font_chosen" />}
            < p className="font_name" style={{ fontSize: "24px" }}>Calibri bold</p>
            < p className="font_example" style={{ fontSize: "14px" }}>{t("SAMPLE_TEXT")}Calibri-bold</p>
          </div>

          <div className="font_link" style={chosenTextFont === "Calibri" ? { border: "3px solid #EC695C", fontFamily: "Calibri" }
            : { fontFamily: "Calibri" }}
            onClick={() => { changeTextFont("Calibri") }} >
            {chosenTextFont === "Calibri" && <div className="font_chosen" />}
            < p className="font_name" style={{ fontSize: "24px" }}>Calibri</p>
            < p className="font_example" style={{ fontSize: "14px" }}>{t("SAMPLE_TEXT")}Calibri</p>
          </div>

          <div className="font_link" style={chosenTextFont === "Helvetica_bold" ? { border: "3px solid #EC695C", fontFamily: "Helvetica_bold" }
            : { fontFamily: "Helvetica_bold" }}
            onClick={() => { changeTextFont("Helvetica_bold") }} >
            {chosenTextFont === "Helvetica_bold" && <div className="font_chosen" />}
            < p className="font_name" style={{ fontSize: "24px" }}>Helvetica bold</p>
            < p className="font_example" style={{ fontSize: "14px" }}>{t("SAMPLE_TEXT")}Helvetica Bold</p>
          </div>

          <div className="font_link" style={chosenTextFont === "Helvetica" ? { border: "3px solid #EC695C", fontFamily: "Helvetica" }
            : { fontFamily: "Helvetica" }}
            onClick={() => { changeTextFont("Helvetica") }} >
            {chosenTextFont === "Helvetica" && <div className="font_chosen" />}
            < p className="font_name" style={{ fontSize: "24px" }}>Helvetica</p>
            < p className="font_example" style={{ fontSize: "14px" }}>{t("SAMPLE_TEXT")}Helvetica</p>
          </div>

          <div className="font_link" style={chosenTextFont === "Arial" ? { border: "3px solid #EC695C", fontFamily: "Arial" }
            : { fontFamily: "Arial" }}
            onClick={() => { changeTextFont("Arial") }} >
            {chosenTextFont === "Arial" && <div className="font_chosen" />}
            < p className="font_name" style={{ fontSize: "24px" }}>Arial</p>
            < p className="font_example" style={{ fontSize: "14px" }}>{t("SAMPLE_TEXT")}Arial</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  visual: state.frontEndData.visual.visual,
  chosenTextFont: state.frontEndData.text.chosenTextFont,
  languageRender: state.frontEndData.visual.languageRender,
})

const mapDispatchToProps = dispatch => ({
  toggleVisual: (income) => dispatch(actionsVisual.toggleVisual(income)),
  changeTextFont: font => dispatch(actions.changeTextFont(font)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TextEditor)