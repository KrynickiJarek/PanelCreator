import React, { useState } from 'react';
import { connect } from "react-redux"
import actions from "./duck/actions"
import actionsVisual from "../../PanelPreview/duck/actions"

import "./TextEditor.scss"
import { t } from "../../../../i18n";

import Locked from "../../../../assets/preview/lock.svg"
import Unlocked from "../../../../assets/preview/unlock.svg"

const TextEditor = ({ chosenTextFont, changeTextWeight, changeTextFont, chosenTextWeight, visual, toggleVisual, chosenModel }) => {

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


          <div className="font_link" style={chosenTextFont === "Calibri-bold" && chosenTextWeight === "700" ? { border: "3px solid #EC695C", fontFamily: "Calibri-bold", fontWeight: "700" }
            : { fontFamily: "Calibri-bold", fontWeight: "700" }}
            onClick={() => { changeTextFont("Calibri-bold"); changeTextWeight("700") }} >
            {chosenTextFont === "Calibri-bold" && chosenTextWeight === "700" && <div className="font_chosen" />}
            < p className="font_name" style={{ fontSize: "20px" }}>Calibri bold</p>
            < p className="font_example" style={{ fontSize: "14px" }}>{t("SAMPLE_TEXT")}Calibri bold</p>
          </div>

          <div className="font_link" style={chosenTextFont === "Calibri" && chosenTextWeight === "400" ? { border: "3px solid #EC695C", fontFamily: "Calibri", fontWeight: "400" }
            : { fontFamily: "Calibri", fontWeight: "400" }}
            onClick={() => { changeTextFont("Calibri"); changeTextWeight("400") }} >
            {chosenTextFont === "Calibri" && chosenTextWeight === "400" && <div className="font_chosen" />}
            < p className="font_name" style={{ fontSize: "20px" }}>Calibri</p>
            < p className="font_example" style={{ fontSize: "14px" }}>{t("SAMPLE_TEXT")}Calibri</p>
          </div>

          <div className="font_link" style={chosenTextFont === "Montserrat" && chosenTextWeight === "700" ? { border: "3px solid #EC695C", fontFamily: "Montserrat", fontWeight: "700" }
            : { fontFamily: "Montserrat", fontWeight: "700" }}
            onClick={() => { changeTextFont("Montserrat"); changeTextWeight("700") }} >
            {chosenTextFont === "Montserrat" && chosenTextWeight === "700" && <div className="font_chosen" />}
            < p className="font_name" style={{ fontSize: "20px" }}>Montserrat bold</p>
            < p className="font_example" style={{ fontSize: "14px" }}>{t("SAMPLE_TEXT")}Montserrat bold</p>
          </div>

          <div className="font_link" style={chosenTextFont === "Montserrat" && chosenTextWeight === "400" ? { border: "3px solid #EC695C", fontFamily: "Montserrat", fontWeight: "400" }
            : { fontFamily: "Montserrat", fontWeight: "400" }}
            onClick={() => { changeTextFont("Montserrat"); changeTextWeight("400") }} >
            {chosenTextFont === "Montserrat" && chosenTextWeight === "400" && <div className="font_chosen" />}

            < p className="font_name" style={{ fontSize: "20px" }}>Montserrat</p>
            < p className="font_example" style={{ fontSize: "14px" }}>{t("SAMPLE_TEXT")}Montserrat</p>
          </div>

          <div className="font_link" style={chosenTextFont === "Poppins" && chosenTextWeight === "700" ? { border: "3px solid #EC695C", fontFamily: "Poppins", fontWeight: "700" }
            : { fontFamily: "Poppins", fontWeight: "700" }}
            onClick={() => { changeTextFont("Poppins"); changeTextWeight("700") }} >
            {chosenTextFont === "Poppins" && chosenTextWeight === "700" && <div className="font_chosen" />}
            < p className="font_name" style={{ fontSize: "20px" }}>Poppins bold</p>
            < p className="font_example" style={{ fontSize: "14px" }}>{t("SAMPLE_TEXT")}Poppins bold</p>
          </div>

          <div className="font_link" style={chosenTextFont === "Poppins" && chosenTextWeight === "400" ? { border: "3px solid #EC695C", fontFamily: "Poppins", fontWeight: "400" }
            : { fontFamily: "Poppins", fontWeight: "400" }}
            onClick={() => { changeTextFont("Poppins"); changeTextWeight("400") }} >
            {chosenTextFont === "Poppins" && chosenTextWeight === "400" && <div className="font_chosen" />}
            < p className="font_name" style={{ fontSize: "20px" }}>Poppins</p>
            < p className="font_example" style={{ fontSize: "14px" }}>{t("SAMPLE_TEXT")}Poppins</p>
          </div>

          <div className="font_link" style={chosenTextFont === "Roboto" && chosenTextWeight === "700" ? { border: "3px solid #EC695C", fontFamily: "Roboto", fontWeight: "700" }
            : { fontFamily: "Roboto", fontWeight: "700" }}
            onClick={() => { changeTextFont("Roboto"); changeTextWeight("700") }} >
            {chosenTextFont === "Roboto" && chosenTextWeight === "700" && <div className="font_chosen" />}
            < p className="font_name" style={{ fontSize: "20px" }}>Roboto bold</p>
            < p className="font_example" style={{ fontSize: "14px" }}>{t("SAMPLE_TEXT")}Roboto bold</p>
          </div>

          <div className="font_link" style={chosenTextFont === "Roboto" && chosenTextWeight === "400" ? { border: "3px solid #EC695C", fontFamily: "Roboto", fontWeight: "400" }
            : { fontFamily: "Roboto", fontWeight: "400" }}
            onClick={() => { changeTextFont("Roboto"); changeTextWeight("400") }} >
            {chosenTextFont === "Roboto" && chosenTextWeight === "400" && <div className="font_chosen" />}
            < p className="font_name" style={{ fontSize: "20px" }}>Roboto</p>
            < p className="font_example" style={{ fontSize: "14px" }}>{t("SAMPLE_TEXT")}Roboto</p>
          </div>

          <div className="font_link" style={chosenTextFont === "Rubik" && chosenTextWeight === "700" ? { border: "3px solid #EC695C", fontFamily: "Rubik", fontWeight: "700" }
            : { fontFamily: "Rubik", fontWeight: "700" }}
            onClick={() => { changeTextFont("Rubik"); changeTextWeight("700") }} >
            {chosenTextFont === "Rubik" && chosenTextWeight === "700" && <div className="font_chosen" />}
            < p className="font_name" style={{ fontSize: "20px" }}>Rubik bold</p>
            < p className="font_example" style={{ fontSize: "14px" }}>{t("SAMPLE_TEXT")}Rubik bold</p>
          </div>

          <div className="font_link" style={chosenTextFont === "Rubik" && chosenTextWeight === "400" ? { border: "3px solid #EC695C", fontFamily: "Rubik", fontWeight: "400" }
            : { fontFamily: "Rubik", fontWeight: "400" }}
            onClick={() => { changeTextFont("Rubik"); changeTextWeight("400") }} >
            {chosenTextFont === "Rubik" && chosenTextWeight === "400" && <div className="font_chosen" />}
            < p className="font_name" style={{ fontSize: "20px" }}>Rubik</p>
            < p className="font_example" style={{ fontSize: "14px" }}>{t("SAMPLE_TEXT")}Rubik</p>
          </div>

          <div className="font_link" style={chosenTextFont === "Arial" && chosenTextWeight === "400" ? { border: "3px solid #EC695C", fontFamily: "Arial", fontWeight: "400" }
            : { fontFamily: "Arial", fontWeight: "400" }}
            onClick={() => { changeTextFont("Arial"); changeTextWeight("400") }} >
            {chosenTextFont === "Arial" && chosenTextWeight === "400" && <div className="font_chosen" />}
            < p className="font_name" style={{ fontSize: "20px" }}>Arial</p>
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
  chosenTextWeight: state.frontEndData.text.chosenTextWeight,
  languageRender: state.frontEndData.visual.languageRender,
  chosenModel: state.frontEndData.model.chosenModel,
})

const mapDispatchToProps = dispatch => ({
  toggleVisual: (income) => dispatch(actionsVisual.toggleVisual(income)),
  changeTextFont: font => dispatch(actions.changeTextFont(font)),
  changeTextWeight: weight => dispatch(actions.changeTextWeight(weight)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TextEditor)