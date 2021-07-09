import React, { useState, useEffect } from 'react';
import { connect } from "react-redux"
import actions from "./duck/actions"
import actionsVisual from "../../PanelPreview/duck/actions"

import "./FrameEditor.scss"
import Roundframe from "../../../assets/frame/roundframe.svg"
import Sharpframe from "../../../assets/frame/sharpframe.svg"
import Remove from "../../../assets/preview/remove.svg"
import Locked from "../../../assets/preview/lock.svg"
import Unlocked from "../../../assets/preview/unlock.svg"


const FrameEditor = ({ onToggleFrameTitle, allowTextFrame,


  chosenModel,
  changeFrameFont,
  changeFrameShape,
  addNewFrame,
  removeFrame,
  overFrame,
  chosenFrameFont,
  chosenFrameShape,
  frameHolders,
  visual,
  toggleVisual

}) => {


  const [title, setTitle] = useState(false)
  const [hideSize, setHideSize] = useState(false)
  const [transition, setTranistion] = useState("0s")

  const [unlock, setUnlock] = useState(false)


  const handleAddNewFrame = () => {
    setTitle(false)
    onToggleFrameTitle(false)
    addNewFrame(true)
  }
  const toggleTitle = () => {
    setTitle(prev => !prev)
    onToggleFrameTitle(!title)
    setTranistion("400ms ease")
  }


  useEffect(() => {
    if (!allowTextFrame) {
      setTitle(false)
      onToggleFrameTitle(false)
    }
  }, [allowTextFrame, onToggleFrameTitle])

  useEffect(() => {
    setHideSize(document.querySelector(".title_box_content").clientHeight)
  }, [])


  const handleResize = () => {
    setHideSize(document.querySelector(".title_box_content").clientHeight)
  }
  window.addEventListener('resize', handleResize)

  // document.querySelector(".panelpreview_container").addEventListener('resize', handleResize)
  // console.log(document.querySelector(".panelpreview_container").clientWidth)





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
            <h2 className="visual_info">Niedostępne w trybie podglądu</h2>
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
          <p className="instruction_bold">Zaznacz pola, aby dodać je do obszaru tworzonej ramki. Ramka musi mieć kształt prostokąta. Dodaj ramkę przyciskiem Zatwierdź.</p>
          <p className="instruction_normal">Wybierz rodzaj narożników</p>

          <div className="frame_choosing_box">

            <div className="frame_shape_link" style={(chosenFrameShape === "sharp") ? { border: "3px solid #EC695C", borderRadius: "0" } : { borderRadius: "0" }}
              onClick={() => { changeFrameShape("sharp") }} >
              {(chosenFrameShape === "sharp") && <div className="frame_chosen" />}
              < p className="shape_name">Ostre<br />narożniki</p>
              <img src={Sharpframe} alt="sharpframe" className="shape_image" />
            </div>

            <div className="frame_shape_link" style={chosenFrameShape === "round" ? { border: "3px solid #EC695C" } : {}}
              onClick={() => { changeFrameShape("round") }} >
              {chosenFrameShape === "round" && <div className="frame_chosen" />}
              < p className="shape_name">Zaokrąglone<br />narożniki</p>
              <img src={Roundframe} alt="roundframe" className="shape_image" />
            </div>

          </div>


          {chosenModel.type !== "MDOT-18 poziomy" ?
            <p className="instruction_normal">Dodaj tytuł ramki (minimalna szerokość ramki aby umieścić tytuł to 2).</p>
            : <p className="instruction_normal">Włącz tytuł ramki (opcja niedostępna w wybranym modelu).</p>
          }

          <div className="add_title_button"
            onClick={(!allowTextFrame || chosenModel.type === "MDOT-18 poziomy") ? null : toggleTitle}
            style={(!allowTextFrame || chosenModel.type === "MDOT-18 poziomy") ? { cursor: "not-allowed" } : { cursor: "pointer" }}>
            {title ? "Usuń" : "Dodaj"}
            <div className="button_arrows" />
          </div>

          <div className="hide_box" >
            <div className="title_box" style={(title || chosenModel.type === "MDOT-18 poziomy") ? { transition: `${transition}` } : { transition: `${transition}`, transform: `translateY(-${hideSize}px)` }}>
              <div className="title_box_content" style={chosenModel.type !== "MDOT-18 poziomy" ? { visibility: "visible" } : { visibility: "hidden", height: "0px" }}>
                <p className="instruction_normal">Wybierz font, a następnie wpisz tytuł na tworzonej ramce.</p>

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
              </div>

              <div className="add_frame_button"
                onClick={handleAddNewFrame} >
                ZATWIERDŹ
                <div className="button_arrows" />
              </div>

              {frameHolders.length > 0 &&
                <>
                  <p className="instruction_bold">Lista dodanych ramek:</p>

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
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  chosenModel: state.model,
  chosenFrameFont: state.frame.chosenFrameFont,
  chosenFrameShape: state.frame.chosenFrameShape,
  frameList: state.frame.frameList,
  frameHolders: state.frame.frameHolders,
  visual: state.visual,
})

const mapDispatchToProps = dispatch => ({
  changeFrameFont: font => dispatch(actions.changeFrameFont(font)),
  changeFrameShape: shape => dispatch(actions.changeFrameShape(shape)),
  addNewFrame: (income) => dispatch(actions.addNewFrame(income)),
  removeFrame: (frame) => dispatch(actions.removeFrame(frame)),
  overFrame: (frame) => dispatch(actions.overFrame(frame)),
  toggleVisual: (income) => dispatch(actionsVisual.toggleVisual(income)),

})

export default connect(mapStateToProps, mapDispatchToProps)(FrameEditor)
