import React, { useState } from 'react';
import { connect } from "react-redux"
import actions from "./duck/actions"
import actionsVisual from "../../PanelPreview/duck/actions"

import "./FrameEditor.scss"
import Roundframe from "../../../../assets/frame/roundframe.svg"
import Sharpframe from "../../../../assets/frame/sharpframe.svg"
import Remove from "../../../../assets/preview/remove.svg"
import Locked from "../../../../assets/preview/lock.svg"
import Unlocked from "../../../../assets/preview/unlock.svg"


const FrameEditor = ({
  frameTitle,
  allowFrameTitle,
  allowFrameTitleFlag,
  frameTitleFlag,
  chosenModel,
  changeFrameFont,
  changeFrameShape,
  addNewFrame,
  removeFrame,
  overFrame,
  chosenFrameFont,
  chosenFrameShape,
  frameHolders,
  frameHoldersTemp,
  visual,
  toggleVisual,
  changeFrameText,
}) => {


  const [unlock, setUnlock] = useState(false)


  const handleAddNewFrame = () => {
    if (frameHoldersTemp) {
      frameTitle(false)
      allowFrameTitle(false)
      addNewFrame(true)
    }

  }

  const toggleTitle = () => {
    frameTitle(!frameTitleFlag)
    changeFrameText("")
  }

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
      <div className="frame_container">
        <h2 className="frame_header">Dodaj ramki (opcjonalne)</h2>
        <div className="frame_content">
          <p className="instruction_bold">Zaznacz pola, aby dodać je do obszaru tworzonej ramki. Ramka musi mieć kształt prostokąta. Dodaj ramkę przyciskiem "Zatwierdź". Zatwierdzone ramki wyświetlą się na liście na dole strony.</p>
          <p className="instruction_normal">Wybierz rodzaj narożników:</p>

          <div className="frame_choosing_box">

            <div className="frame_shape_link" style={(chosenFrameShape === "sharp") ? { border: "3px solid #EC695C", borderRadius: "0" } : { borderRadius: "0" }}
              onClick={() => { changeFrameShape("sharp") }} >
              {(chosenFrameShape === "sharp") && <div className="frame_chosen" />}
              < p className="shape_name">Proste<br />narożniki</p>
              <img src={Sharpframe} alt="sharpframe" className="shape_image" />
            </div>

            <div className="frame_shape_link" style={chosenFrameShape === "round" ? { border: "3px solid #EC695C" } : {}}
              onClick={() => { changeFrameShape("round") }} >
              {chosenFrameShape === "round" && <div className="frame_chosen" />}
              < p className="shape_name">Zaokrąglone<br />narożniki</p>
              <img src={Roundframe} alt="roundframe" className="shape_image" />
            </div>
          </div>


          {/* {chosenModel.type !== "MDOT-18 poziomy" && */}
          {!chosenModel.panelRotation &&
            <>
              <p className="instruction_normal">Wybierz font tytułu ramki. Aby dodać tytuł ramka musi mieć szerokość co najmniej 2 kolumn.</p>
              <div className="frame_choosing_box">

                <div className="frame_link" style={(chosenFrameFont === "Calibri-bold") ? { border: "3px solid #EC695C", fontFamily: "Calibri-bold" }
                  : { fontFamily: "Calibri-bold" }}
                  onClick={() => { changeFrameFont("Calibri-bold") }} >
                  {(chosenFrameFont === "Calibri-bold") && <div className="frame_chosen" />}
                  < p className="font_name" style={{ fontSize: "18px" }}>Calibri bold</p>
                  < p className="font_example" style={{ fontSize: "12px" }}>Przykładowy tekst napisany fontem Calibri-bold</p>
                </div>

                <div className="frame_link" style={chosenFrameFont === "Calibri" ? { border: "3px solid #EC695C", fontFamily: "Calibri" }
                  : { fontFamily: "Calibri" }}
                  onClick={() => { changeFrameFont("Calibri") }} >
                  {chosenFrameFont === "Calibri" && <div className="frame_chosen" />}
                  < p className="font_name" style={{ fontSize: "18px" }}>Calibri</p>
                  < p className="font_example" style={{ fontSize: "12px" }}>Przykładowy tekst napisany fontem Calibri</p>
                </div>

                <div className="frame_link" style={chosenFrameFont === "Helvetica-bold" ? { border: "3px solid #EC695C", fontFamily: "Helvetica-bold" }
                  : { fontFamily: "Helvetica-bold" }}
                  onClick={() => { changeFrameFont("Helvetica-bold") }} >
                  {chosenFrameFont === "Helvetica-bold" && <div className="frame_chosen" />}
                  < p className="font_name" style={{ fontSize: "18px" }}>Helvetica bold</p>
                  < p className="font_example" style={{ fontSize: "12px" }}>Przykładowy tekst napisany fontem Helvetica Bold</p>
                </div>

                <div className="frame_link" style={chosenFrameFont === "Helvetica" ? { border: "3px solid #EC695C", fontFamily: "Helvetica" }
                  : { fontFamily: "Helvetica" }}
                  onClick={() => { changeFrameFont("Helvetica") }} >
                  {chosenFrameFont === "Helvetica" && <div className="frame_chosen" />}
                  < p className="font_name" style={{ fontSize: "18px" }}>Helvetica</p>
                  < p className="font_example" style={{ fontSize: "12px" }}>Przykładowy tekst napisany fontem Helvetica</p>
                </div>

                <div className="frame_link" style={chosenFrameFont === "Arial" ? { border: "3px solid #EC695C", fontFamily: "Arial" }
                  : { fontFamily: "Arial" }}
                  onClick={() => { changeFrameFont("Arial") }} >
                  {chosenFrameFont === "Arial" && <div className="frame_chosen" />}
                  < p className="font_name" style={{ fontSize: "18px" }}>Arial</p>
                  < p className="font_example" style={{ fontSize: "12px" }}>Przykładowy tekst napisany fontem Arial</p>
                </div>
              </div>

              <div className="add_title_button"
                onClick={!allowFrameTitleFlag ? null : toggleTitle}
                style={!allowFrameTitleFlag ? { cursor: "not-allowed" } : { cursor: "pointer" }}>
                {frameTitleFlag ? "Usuń tytuł" : "Dodaj tytuł"}
                <div className="button_arrows" />
              </div>
            </>
          }
          {chosenModel.panelRotation === 90 &&
            <p className="instruction_normal">W wybranym modelu nie ma możliośći dodawania tytułów ramek.</p>
          }

          <div className="add_frame_button"
            onClick={handleAddNewFrame} >
            ZATWIERDŹ
            <div className="button_arrows" />
          </div>

          {frameHolders.length > 0 &&
            <>
              <p className="instruction_bold" style={{ marginTop: "0" }}>Lista dodanych ramek:</p>

              <ol className="frame_list" >
                {frameHolders.map((frame, index) =>
                  < li key={index} className="frame_list_element"
                    onMouseOver={() => { overFrame({ index: index, flag: true }) }}
                    onMouseLeave={() => { overFrame({ index: index, flag: false }) }}
                  >
                    Pole startowe (rząd, kolumna): {frame.frameInfo.startRow}, {frame.frameInfo.startColumn} ; Szerokość: {frame.frameInfo.columns}; Wysokość: {frame.frameInfo.rows};
                    Narożniki: {frame.frameInfo.shape === "sharp" ? "proste" : "zaokrąglone"}{frame.framePrint.text && `, Tytuł: ${frame.framePrint.text}; Font: ${frame.framePrint.frameFont}`}
                    <div className="frame_list_button" onClick={() => { removeFrame(index) }}>
                      <img className="frame_list_img" src={Remove} alt="removeframe" />
                    </div>
                  </li>
                )}
              </ol>
            </>
          }
        </div>
      </div>
    </div>

  );
};

const mapStateToProps = state => ({
  chosenModel: state.frontEndData.model.chosenModel,
  chosenFrameFont: state.frontEndData.frame.chosenFrameFont,
  chosenFrameShape: state.frontEndData.frame.chosenFrameShape,
  frameList: state.frontEndData.frame.frameList,
  overFrameRender: state.frontEndData.frame.overFrameRender,
  frameHolders: state.frontEndData.frame.frameHolders,
  frameHoldersTemp: state.frontEndData.frame.frameHoldersTemp,
  frameTitleFlag: state.frontEndData.frame.frameTitleFlag,
  allowFrameTitleFlag: state.frontEndData.frame.allowFrameTitleFlag,
  visual: state.frontEndData.visual.visual,
})

const mapDispatchToProps = dispatch => ({
  changeFrameFont: font => dispatch(actions.changeFrameFont(font)),
  changeFrameShape: shape => dispatch(actions.changeFrameShape(shape)),
  addNewFrame: (income) => dispatch(actions.addNewFrame(income)),
  removeFrame: (frame) => dispatch(actions.removeFrame(frame)),
  overFrame: (frame) => dispatch(actions.overFrame(frame)),
  frameTitle: (frame) => dispatch(actions.frameTitle(frame)),
  changeFrameText: (frame) => dispatch(actions.changeFrameText(frame)),
  allowFrameTitle: (frame) => dispatch(actions.allowFrameTitle(frame)),
  toggleVisual: (income) => dispatch(actionsVisual.toggleVisual(income)),

})

export default connect(mapStateToProps, mapDispatchToProps)(FrameEditor)



