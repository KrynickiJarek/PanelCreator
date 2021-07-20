import React, { useState } from 'react';
import { connect } from "react-redux"
import actions from "./duck/actions"
import actionsVisual from "../../PanelPreview/duck/actions"

import "./TextEditor.scss"
import Locked from "../../../assets/preview/lock.svg"
import Unlocked from "../../../assets/preview/unlock.svg"

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
            <h2 className="visual_info">Niedostępne w trybie wizualizacji</h2>
          </div>
          <div className="visual_button"
            onClick={() => toggleVisual(!visual)}
            onMouseOver={() => setUnlock(true)}
            onMouseLeave={() => setUnlock(false)}
          >
            Tryb edycji
            <div className="button_arrows" />
          </div>
        </div>
      </div>
      <div className="text_container">
        <h2 className="text_header">Dodaj podpisy do ikon (opcjonalne)</h2>
        <p className="instruction_bold">Wybierz font, a następnie dodaj opisy pod lub nad ikonami klikając w zaznaczone pola.</p>
        <div className="text_content">


          <div className="font_link" style={chosenTextFont === "Calibri-bold" ? { border: "3px solid #EC695C", fontFamily: "Calibri-bold" }
            : { fontFamily: "Calibri-bold" }}
            onClick={() => { changeTextFont("Calibri-bold") }} >
            {chosenTextFont === "Calibri-bold" && <div className="font_chosen" />}
            < p className="font_name" style={{ fontSize: "24px" }}>Calibri bold</p>
            < p className="font_example" style={{ fontSize: "14px" }}>Przykładowy tekst napisany fontem Calibri-bold</p>
          </div>

          <div className="font_link" style={chosenTextFont === "Calibri" ? { border: "3px solid #EC695C", fontFamily: "Calibri" }
            : { fontFamily: "Calibri" }}
            onClick={() => { changeTextFont("Calibri") }} >
            {chosenTextFont === "Calibri" && <div className="font_chosen" />}
            < p className="font_name" style={{ fontSize: "24px" }}>Calibri</p>
            < p className="font_example" style={{ fontSize: "14px" }}>Przykładowy tekst napisany fontem Calibri</p>
          </div>

          <div className="font_link" style={chosenTextFont === "Helvetica-bold" ? { border: "3px solid #EC695C", fontFamily: "Helvetica-bold" }
            : { fontFamily: "Helvetica-bold" }}
            onClick={() => { changeTextFont("Helvetica-bold") }} >
            {chosenTextFont === "Helvetica-bold" && <div className="font_chosen" />}
            < p className="font_name" style={{ fontSize: "24px" }}>Helvetica bold</p>
            < p className="font_example" style={{ fontSize: "14px" }}>Przykładowy tekst napisany fontem Helvetica Bold</p>
          </div>

          <div className="font_link" style={chosenTextFont === "Helvetica" ? { border: "3px solid #EC695C", fontFamily: "Helvetica" }
            : { fontFamily: "Helvetica" }}
            onClick={() => { changeTextFont("Helvetica") }} >
            {chosenTextFont === "Helvetica" && <div className="font_chosen" />}
            < p className="font_name" style={{ fontSize: "24px" }}>Helvetica</p>
            < p className="font_example" style={{ fontSize: "14px" }}>Przykładowy tekst napisany fontem Helvetica</p>
          </div>

          <div className="font_link" style={chosenTextFont === "Arial" ? { border: "3px solid #EC695C", fontFamily: "Arial" }
            : { fontFamily: "Arial" }}
            onClick={() => { changeTextFont("Arial") }} >
            {chosenTextFont === "Arial" && <div className="font_chosen" />}
            < p className="font_name" style={{ fontSize: "24px" }}>Arial</p>
            < p className="font_example" style={{ fontSize: "14px" }}>Przykładowy tekst napisany fontem Arial</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  visual: state.frontEndData.visual.visual,
  chosenTextFont: state.frontEndData.text.chosenTextFont,
})

const mapDispatchToProps = dispatch => ({
  toggleVisual: (income) => dispatch(actionsVisual.toggleVisual(income)),
  changeTextFont: font => dispatch(actions.changeTextFont(font)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TextEditor)