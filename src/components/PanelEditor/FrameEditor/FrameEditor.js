import React, { useState, useEffect } from 'react';
// import React, { useState } from 'react';
import "./FrameEditor.scss"
import Roundframe from "../../../assets/frame/roundframe.svg"
import Sharpframe from "../../../assets/frame/sharpframe.svg"
import Remove from "../../../assets/preview/remove.svg"


const FrameEditor = ({ chosenModel, onFrameFontSet, onFrameShapeSet, onAddNewFrame, frameList, onRemoveFrame, onOverFrame, onToggleFrameTitle, allowTextFrame }) => {



  const [frameFont, setFrameFont] = useState("Calibri-bold")
  const [frameShape, setFrameShape] = useState("sharp")
  const [title, setTitle] = useState(false)
  const [hideSize, setHideSize] = useState(false)
  const [transition, setTranistion] = useState("0s")
  const [frameListState, setFrameListState] = useState(frameList)


  const addNewFrame = () => {
    setTitle(false)
    onAddNewFrame()
    onToggleFrameTitle(false)
  }
  const toggleTitle = () => {
    setTitle(prev => !prev)
    onToggleFrameTitle(!title)
    setTranistion("400ms ease")
  }

  const handleRemoveFrame = (index) => {
    const copyFrameListState = frameListState
    copyFrameListState.splice(index, 1)
    setFrameListState(copyFrameListState)
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


  // console.log(frameListState)
  // console.log(frameList.length)


  useEffect(() => {
    setFrameListState(frameList)
  }, [frameList])

  return (
    <>
      <div className="scroll_container">
        <div className="frame_container">
          <h2 className="frame_header">Dodaj ramki (opcjonalne)</h2>
          <div className="frame_content">
            <p className="instruction_bold">Zaznacz pola, aby dodać je do obszaru tworzonej ramki. Ramka musi mieć kształt prostokąta. Dodaj ramkę przyciskiem Zatwierdź.</p>
            <p className="instruction_normal">Wybierz rodzaj narożników</p>

            <div className="frame_choosing_box">

              <div className="frame_shape_link" style={((frameShape === "sharp") || !frameShape) ? { border: "3px solid #EC695C", borderRadius: "0" } : { borderRadius: "0" }}
                onClick={() => { setFrameShape("sharp"); onFrameShapeSet("sharp") }} >
                {((frameShape === "sharp") || !frameShape) && <div className="frame_chosen" />}
                < p className="shape_name">Ostre<br />narożniki</p>
                <img src={Sharpframe} alt="sharpframe" className="shape_image" />
              </div>

              <div className="frame_shape_link" style={frameShape === "round" ? { border: "3px solid #EC695C" } : {}}
                onClick={() => { setFrameShape("round"); onFrameShapeSet("round") }} >
                {frameShape === "round" && <div className="frame_chosen" />}
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
              <div className="title_box" style={title ? { transition: `${transition}`, } : { transition: `${transition}`, transform: `translateY(-${hideSize}px)` }}>
                <div className="title_box_content" >
                  <p className="instruction_normal">Wybierz font, a następnie wpisz tytuł na tworzonej ramce.</p>

                  <div className="frame_choosing_box">

                    <div className="frame_link" style={((frameFont === "Calibri-bold") || !frameFont) ? { border: "3px solid #EC695C", fontFamily: "Calibri-bold" }
                      : { fontFamily: "Calibri-bold" }}
                      onClick={() => { setFrameFont("Calibri-bold"); onFrameFontSet("Calibri-bold") }} >
                      {((frameFont === "Calibri-bold") || !frameFont) && <div className="frame_chosen" />}
                      < p className="font_name" style={{ fontSize: "18px" }}>Calibri bold</p>
                      < p className="font_example" style={{ fontSize: "12px" }}>Przykładowy tekst napisany fontem Calibri-bold</p>
                    </div>

                    <div className="frame_link" style={frameFont === "Calibri" ? { border: "3px solid #EC695C", fontFamily: "Calibri" }
                      : { fontFamily: "Calibri" }}
                      onClick={() => { setFrameFont("Calibri"); onFrameFontSet("Calibri") }} >
                      {frameFont === "Calibri" && <div className="frame_chosen" />}
                      < p className="font_name" style={{ fontSize: "18px" }}>Calibri</p>
                      < p className="font_example" style={{ fontSize: "12px" }}>Przykładowy tekst napisany fontem Calibri</p>
                    </div>

                    <div className="frame_link" style={frameFont === "Helvetica-bold" ? { border: "3px solid #EC695C", fontFamily: "Helvetica-bold" }
                      : { fontFamily: "Helvetica-bold" }}
                      onClick={() => { setFrameFont("Helvetica-bold"); onFrameFontSet("Helvetica-bold") }} >
                      {frameFont === "Helvetica-bold" && <div className="frame_chosen" />}
                      < p className="font_name" style={{ fontSize: "18px" }}>Helvetica bold</p>
                      < p className="font_example" style={{ fontSize: "12px" }}>Przykładowy tekst napisany fontem Helvetica Bold</p>
                    </div>

                    <div className="frame_link" style={frameFont === "Helvetica" ? { border: "3px solid #EC695C", fontFamily: "Helvetica" }
                      : { fontFamily: "Helvetica" }}
                      onClick={() => { setFrameFont("Helvetica"); onFrameFontSet("Helvetica") }} >
                      {frameFont === "Helvetica" && <div className="frame_chosen" />}
                      < p className="font_name" style={{ fontSize: "18px" }}>Helvetica</p>
                      < p className="font_example" style={{ fontSize: "12px" }}>Przykładowy tekst napisany fontem Helvetica</p>
                    </div>

                    <div className="frame_link" style={frameFont === "Arial" ? { border: "3px solid #EC695C", fontFamily: "Arial" }
                      : { fontFamily: "Arial" }}
                      onClick={() => { setFrameFont("Arial"); onFrameFontSet("Arial") }} >
                      {frameFont === "Arial" && <div className="frame_chosen" />}
                      < p className="font_name" style={{ fontSize: "18px" }}>Arial</p>
                      < p className="font_example" style={{ fontSize: "12px" }}>Przykładowy tekst napisany fontem Arial</p>
                    </div>
                  </div>
                </div>



                <div className="add_frame_button"
                  onClick={addNewFrame} >
                  ZATWIERDŹ
                  <div className="button_arrows" />
                </div>

                {frameListState.length > 0 &&
                  <>
                    <p className="instruction_bold">Lista dodanych ramek:</p>

                    <ol className="frame_list" >
                      {frameListState.map((frame, index) =>
                        <li key={index} className="frame_list_element"
                          onMouseOver={() => { onOverFrame(frame.type, frame.id) }}
                          onMouseLeave={() => { onOverFrame(frame.type, null) }}
                        >Pole startowe (rząd, kolumna): {frame.startRow}, {frame.startColumn} ; Szerokość: {frame.columns}; Wysokość: {frame.rows}; Narożniki: {frame.shape === "sharp" ? "proste" : "zaokrąglone"}{frame.text && `, Tytuł: ${frame.text}; Font: ${frame.frameFont}`}
                          <div className="frame_list_button" onClick={() => { handleRemoveFrame(index); onRemoveFrame(frame.type, frame.id) }}>
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
    </>
  );
};

export default FrameEditor;