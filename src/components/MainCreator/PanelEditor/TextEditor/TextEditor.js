import React, { useState } from 'react';
import { connect } from "react-redux"
import actions from "./duck/actions"
import actionsVisual from "../../PanelPreview/duck/actions"

import "./TextEditor.scss"
import { t } from "../../../../i18n";

import Locked from "../../../../assets/preview/lock.svg"
import Unlocked from "../../../../assets/preview/unlock.svg"

const TextEditor = ({ chosenTextFont, changeTextFont, visual, toggleVisual, chosenModel }) => {

  const [unlock, setUnlock] = useState(false)


  return (
    <div className="scroll_container">
      <div className="visual_background" style={(visual && chosenModel.type !== "MDOT_M6+_UNIVERSAL") ? { opacity: "1", zIndex: "999" } : { opacity: "0", zIndex: "-1" }}>
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
      <div className="visual_background" style={chosenModel.type === "MDOT_M6+_UNIVERSAL" ? { opacity: "1", zIndex: "999" } : { opacity: "0", zIndex: "-1" }}>
        <div className="visual_container">
          <div className="visual_info_box">
            <img src={Locked} alt="locked" className="visual_image" />
            <h2 className="visual_info">{t("NOT_AVALIBLE_IN_SELECTED_MODEL")}</h2>
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

          <div className="font_link" style={chosenTextFont === "Montserrat-bold" ? { border: "3px solid #EC695C", fontFamily: "Montserrat-bold" }
            : { fontFamily: "Montserrat-bold" }}
            onClick={() => { changeTextFont("Montserrat-bold") }} >
            {chosenTextFont === "Montserrat-bold" && <div className="font_chosen" />}
            < p className="font_name" style={{ fontSize: "24px" }}>Montserrat bold</p>
            < p className="font_example" style={{ fontSize: "14px" }}>{t("SAMPLE_TEXT")}Montserrat-bold</p>
          </div>

          <div className="font_link" style={chosenTextFont === "Montserrat" ? { border: "3px solid #EC695C", fontFamily: "Montserrat" }
            : { fontFamily: "Montserrat" }}
            onClick={() => { changeTextFont("Montserrat") }} >
            {chosenTextFont === "Montserrat" && <div className="font_chosen" />}
            < p className="font_name" style={{ fontSize: "24px" }}>Montserrat</p>
            < p className="font_example" style={{ fontSize: "14px" }}>{t("SAMPLE_TEXT")}Montserrat</p>
          </div>

          <div className="font_link" style={chosenTextFont === "Poppins-bold" ? { border: "3px solid #EC695C", fontFamily: "Poppins-bold" }
            : { fontFamily: "Poppins-bold" }}
            onClick={() => { changeTextFont("Poppins-bold") }} >
            {chosenTextFont === "Poppins-bold" && <div className="font_chosen" />}
            < p className="font_name" style={{ fontSize: "24px" }}>Poppins bold</p>
            < p className="font_example" style={{ fontSize: "14px" }}>{t("SAMPLE_TEXT")}Poppins-bold</p>
          </div>

          <div className="font_link" style={chosenTextFont === "Poppins" ? { border: "3px solid #EC695C", fontFamily: "Poppins" }
            : { fontFamily: "Poppins" }}
            onClick={() => { changeTextFont("Poppins") }} >
            {chosenTextFont === "Poppins" && <div className="font_chosen" />}
            < p className="font_name" style={{ fontSize: "24px" }}>Poppins</p>
            < p className="font_example" style={{ fontSize: "14px" }}>{t("SAMPLE_TEXT")}Poppins</p>
          </div>

          <div className="font_link" style={chosenTextFont === "Roboto-bold" ? { border: "3px solid #EC695C", fontFamily: "Roboto-bold" }
            : { fontFamily: "Roboto-bold" }}
            onClick={() => { changeTextFont("Roboto-bold") }} >
            {chosenTextFont === "Roboto-bold" && <div className="font_chosen" />}
            < p className="font_name" style={{ fontSize: "24px" }}>Roboto bold</p>
            < p className="font_example" style={{ fontSize: "14px" }}>{t("SAMPLE_TEXT")}Roboto-bold</p>
          </div>

          <div className="font_link" style={chosenTextFont === "Roboto" ? { border: "3px solid #EC695C", fontFamily: "Roboto" }
            : { fontFamily: "Roboto" }}
            onClick={() => { changeTextFont("Roboto") }} >
            {chosenTextFont === "Roboto" && <div className="font_chosen" />}
            < p className="font_name" style={{ fontSize: "24px" }}>Roboto</p>
            < p className="font_example" style={{ fontSize: "14px" }}>{t("SAMPLE_TEXT")}Roboto</p>
          </div>

          <div className="font_link" style={chosenTextFont === "Rubik" ? { border: "3px solid #EC695C", fontFamily: "Rubik" }
            : { fontFamily: "Rubik" }}
            onClick={() => { changeTextFont("Rubik") }} >
            {chosenTextFont === "Rubik" && <div className="font_chosen" />}
            < p className="font_name" style={{ fontSize: "24px" }}>Rubik</p>
            < p className="font_example" style={{ fontSize: "14px" }}>{t("SAMPLE_TEXT")}Rubik</p>
          </div>

          {/* <div className="font_link" style={chosenTextFont === "Helvetica_bold" ? { border: "3px solid #EC695C", fontFamily: "Helvetica_bold" }
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
          </div> */}

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
  chosenModel: state.frontEndData.model.chosenModel,
})

const mapDispatchToProps = dispatch => ({
  toggleVisual: (income) => dispatch(actionsVisual.toggleVisual(income)),
  changeTextFont: font => dispatch(actions.changeTextFont(font)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TextEditor)