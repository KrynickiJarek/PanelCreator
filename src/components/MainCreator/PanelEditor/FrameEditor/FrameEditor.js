

import React, { useState } from 'react';
import { connect } from "react-redux"
import actions from "./duck/actions"
import actionsVisual from "../../PanelPreview/duck/actions"
import actionsBackEnd from "../../duck/actions"

import "./FrameEditor.scss"
import { t } from "../../../../i18n";

import Roundframe from "../../../../assets/frame/roundframe.svg"
import Sharpframe from "../../../../assets/frame/sharpframe.svg"
import Remove from "../../../../assets/preview/remove.svg"
import Edit from "../../../../assets/preview/edit.svg"
import Locked from "../../../../assets/preview/lock.svg"
import Unlocked from "../../../../assets/preview/unlock.svg"
import Submitinput from "../../../../assets/preview/submitinput.svg"
import Clearinput from "../../../../assets/preview/clearinput.svg"

import ReactTooltip from "react-tooltip";


const FrameEditor = ({
  frameTitle,
  allowFrameTitle,
  allowFrameTitleFlag,
  frameTitleFlag,
  chosenModel,
  changeFrameFont,
  changeFrameFontWeight,
  changeFrameFontInfo,
  changeFrameShape,
  changeRfidShape,
  addNewFrame,
  removeFrame,
  overFrame,
  chosenFrameFont,
  chosenFrameFontWeight,
  chosenFrameShape,
  chosenRfidShape,
  frameHolders,
  frameHoldersTemp,
  visual,
  toggleVisual,
  changeFrameText,
  warnings,
  editFrameText,
  editFrameTextBackEnd,
  chosenColor,
  changeRfidBackEnd,
  rfidBackEnd
}) => {
  const [unlock, setUnlock] = useState(false)
  const [confirmWait, setConfirmWait] = useState(true)
  const [showChoosingBox, setShowChoosingBox] = useState(false)
  const [overflowSize, setOverflowSize] = useState(0)

  const [frameText, setFrameText] = useState("")
  const [indexFrameToEdit, setIndexFrameToEdit] = useState(null)


  const handleEditFrameText = (text, index) => {
    setFrameText(text)
    setIndexFrameToEdit(index)
  }

  const handleChangeTextFrame = (text) => {
    setFrameText(text.target.value.toUpperCase())
  }

  const handleSubmit = (e, index) => {
    e.preventDefault();
    editFrameText(frameText, index)
    editFrameTextBackEnd(frameText, index)
    setFrameText("")
    setIndexFrameToEdit(null)
  }

  const handleAbort = () => {
    setFrameText("")
    setIndexFrameToEdit(null)
  }



  const handleAddNewFrame = () => {
    setConfirmWait(false)
    setShowChoosingBox(false)
    if (frameHoldersTemp) {
      frameTitle(false)
      allowFrameTitle(false)
      addNewFrame(true)
    }
    const confirmTimeout = setTimeout(() => {
      setConfirmWait(true)
    }, 1000);
    return () => clearTimeout(confirmTimeout);
  }
  const toggleTitle = () => {
    setOverflowSize(document.getElementById("overflow_frame").clientHeight)
    frameTitle(!frameTitleFlag)
    changeFrameText("")
    setShowChoosingBox(!frameTitleFlag)
    const scrollTimeout = setTimeout(() => {
      if (!frameTitleFlag && document.querySelector(".frame_container").scrollTop < document.querySelector(".editor_box").clientHeight - document.querySelector(".add_title_button").offsetTop + 70) {
        document.querySelector(".frame_container").scroll({
          top: document.querySelector(".editor_box").clientHeight - document.querySelector(".add_title_button").offsetTop + 70,
          behavior: 'smooth'
        })
      }
    }, 300);
    return () => clearTimeout(scrollTimeout);
  }
  const handleChangeRfidShape = (typefrontend, typeBackend) => {
    changeRfidShape(typefrontend)
    const rfidBackendCopy = rfidBackEnd
    rfidBackendCopy[0].cornerRadious = typeBackend
    changeRfidBackEnd(rfidBackendCopy)
  }


  return (
    <div className="scroll_container">
      {/* <div className="visual_background" style={(visual && chosenModel.type !== "MDOT_M6+_UNIVERSAL") ? { opacity: "1", zIndex: "999" } : { opacity: "0", zIndex: "-1" }}> */}
      <div className="visual_background" style={(visual && chosenColor.RAL !== "SMOKED_GLASS") ? { opacity: "1", zIndex: "999" } : { opacity: "0", zIndex: "-1" }}>
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
      {/* <div className="visual_background" style={chosenModel.type === "MDOT_M6+_UNIVERSAL" ? { opacity: "1", zIndex: "999" } : { opacity: "0", zIndex: "-1" }}>
        <div className="visual_container">
          <div className="visual_info_box">
            <img src={Locked} alt="locked" className="visual_image" />
            <h2 className="visual_info">{t("NOT_AVALIBLE_IN_SELECTED_MODEL")}</h2>
          </div>
        </div>
      </div> */}
      <div className="visual_background" style={chosenColor.RAL === "SMOKED_GLASS" ? { opacity: "1", zIndex: "999" } : { opacity: "0", zIndex: "-1" }}>
        <div className="visual_container">
          <div className="visual_info_box">
            <img src={Locked} alt="locked" className="visual_image" />
            <h2 className="visual_info">{t("NOT_AVALIBLE_IN_SELECTED_COLOR")}</h2>
          </div>
        </div>
      </div>
      <div className="frame_container">
        {chosenModel.type === "M_DOT_R14" &&
          <>


            <h2 className="frame_header">{t("FRAMES_HEADER_RFID")}</h2>
            <div className="rfid_content">
              <p className="instruction_bold">{t("FRAMES_RFID_INSTRUCTION_BOLD")}</p>

              <div className="frame_choosing_box">

                <div className="frame_shape_link" style={(chosenRfidShape === "sharp") ? { border: "3px solid #EC695C", borderRadius: "0" } : { borderRadius: "0" }}
                  // onClick={() => { changeRfidShape("sharp") }} >
                  onClick={() => { handleChangeRfidShape("sharp", 1) }} >
                  {(chosenRfidShape === "sharp") && <div className="frame_chosen" />}
                  < p className="shape_name">{t("STRAIGHT")}</p>
                  <img src={Sharpframe} alt="sharpframe" className="shape_image" />
                </div>

                <div className="frame_shape_link" style={chosenRfidShape === "round" ? { border: "3px solid #EC695C" } : {}}
                  // onClick={() => { changeRfidShape("round") }} >
                  onClick={() => { handleChangeRfidShape("round", 0) }} >
                  {chosenRfidShape === "round" && <div className="frame_chosen" />}
                  < p className="shape_name">{t("ROUNDED")}</p>
                  <img src={Roundframe} alt="roundframe" className="shape_image" />
                </div>
              </div>
            </div>
          </>

        }





        <h2 className="frame_header">{t("FRAMES_HEADER")}</h2>
        <div className="frame_content">
          <p className="instruction_bold">{t("FRAMES_INSTRUCTION_BOLD")}</p>
          <p className="instruction_normal">{t("FRAMES_INSTRUCTION_NORMAL_1")}</p>

          <div className="frame_choosing_box">

            <div className="frame_shape_link" style={(chosenFrameShape === "sharp") ? { border: "3px solid #EC695C", borderRadius: "0" } : { borderRadius: "0" }}
              onClick={() => { changeFrameShape("sharp") }} >
              {(chosenFrameShape === "sharp") && <div className="frame_chosen" />}
              < p className="shape_name">{t("STRAIGHT")}</p>
              <img src={Sharpframe} alt="sharpframe" className="shape_image" />
            </div>

            <div className="frame_shape_link" style={chosenFrameShape === "round" ? { border: "3px solid #EC695C" } : {}}
              onClick={() => { changeFrameShape("round") }} >
              {chosenFrameShape === "round" && <div className="frame_chosen" />}
              < p className="shape_name">{t("ROUNDED")}</p>
              <img src={Roundframe} alt="roundframe" className="shape_image" />
            </div>
          </div>


          {!chosenModel.panelRotation &&
            <>
              <p className="instruction_normal">{t("FRAMES_INSTRUCTION_NORMAL_2")}</p>
              <div className="overflow_frame_choosing_box"
                style={warnings.filter(element => element.code === 4).length !== 0 ? { height: "100%" } :
                  (frameTitleFlag && showChoosingBox) || warnings.filter(element => element.code === 4).length !== 0 ? { height: `${overflowSize + 18}px` } : { height: "0" }}>
                <div className="hide_frame_choosing_box" id="overflow_frame" style={(frameTitleFlag && showChoosingBox) || warnings.filter(element => element.code === 4).length !== 0 ? { transform: "translateY(0%)" } : { transform: "translateY(-120%)" }}>
                  <p className="instruction_normal">{t("FRAMES_INSTRUCTION_NORMAL_3")}</p>
                  {warnings.filter(element => element.code === 4).length !== 0 && <p className="instruction_normal" style={{ color: "rgb(179, 135, 4)" }}>{t("FRAMES_INSTRUCTION_NORMAL_4")}</p>}
                  <div className="frame_choosing_box">

                    <div className="frame_link" style={chosenFrameFont === "Calibri-bold" && chosenFrameFontWeight === "700" ? { border: "3px solid #EC695C", fontFamily: "Calibri-bold", fontWeight: "700" }
                      : { fontFamily: "Calibri-bold", fontWeight: "700" }}
                      onClick={() => { changeFrameFont("Calibri-bold"); changeFrameFontWeight("700"); changeFrameFontInfo("Calibri-bold") }} >
                      {chosenFrameFont === "Calibri-bold" && chosenFrameFontWeight === "700" && <div className="frame_chosen" />}
                      < p className="font_name" style={{ fontSize: "15px" }}>Calibri bold</p>
                      < p className="font_example" style={{ fontSize: "12px" }}>{t("SAMPLE_TEXT")}Calibri bold</p>
                    </div>

                    <div className="frame_link" style={chosenFrameFont === "Calibri" && chosenFrameFontWeight === "400" ? { border: "3px solid #EC695C", fontFamily: "Calibri", fontWeight: "400" }
                      : { fontFamily: "Calibri", fontWeight: "400" }}
                      onClick={() => { changeFrameFont("Calibri"); changeFrameFontWeight("400"); changeFrameFontInfo("Calibri") }} >
                      {chosenFrameFont === "Calibri" && chosenFrameFontWeight === "400" && <div className="frame_chosen" />}
                      < p className="font_name" style={{ fontSize: "15px" }}>Calibri</p>
                      < p className="font_example" style={{ fontSize: "12px" }}>{t("SAMPLE_TEXT")}Calibri</p>
                    </div>

                    <div className="frame_link" style={chosenFrameFont === "Montserrat" && chosenFrameFontWeight === "700" ? { border: "3px solid #EC695C", fontFamily: "Montserrat", fontWeight: "700" }
                      : { fontFamily: "Montserrat", fontWeight: "700" }}
                      onClick={() => { changeFrameFont("Montserrat"); changeFrameFontWeight("700"); changeFrameFontInfo("Montserrat-bold") }} >
                      {chosenFrameFont === "Montserrat" && chosenFrameFontWeight === "700" && <div className="frame_chosen" />}
                      < p className="font_name" style={{ fontSize: "15px" }}>Montserrat bold</p>
                      < p className="font_example" style={{ fontSize: "12px" }}>{t("SAMPLE_TEXT")}Montserrat bold</p>
                    </div>

                    <div className="frame_link" style={chosenFrameFont === "Montserrat" && chosenFrameFontWeight === "400" ? { border: "3px solid #EC695C", fontFamily: "Montserrat", fontWeight: "400" }
                      : { fontFamily: "Montserrat", fontWeight: "400" }}
                      onClick={() => { changeFrameFont("Montserrat"); changeFrameFontWeight("400"); changeFrameFontInfo("Montserrat") }} >
                      {chosenFrameFont === "Montserrat" && chosenFrameFontWeight === "400" && <div className="frame_chosen" />}

                      < p className="font_name" style={{ fontSize: "15px" }}>Montserrat</p>
                      < p className="font_example" style={{ fontSize: "12px" }}>{t("SAMPLE_TEXT")}Montserrat</p>
                    </div>

                    <div className="frame_link" style={chosenFrameFont === "Poppins" && chosenFrameFontWeight === "700" ? { border: "3px solid #EC695C", fontFamily: "Poppins", fontWeight: "700" }
                      : { fontFamily: "Poppins", fontWeight: "700" }}
                      onClick={() => { changeFrameFont("Poppins"); changeFrameFontWeight("700"); changeFrameFontInfo("Poppins-bold") }} >
                      {chosenFrameFont === "Poppins" && chosenFrameFontWeight === "700" && <div className="frame_chosen" />}
                      < p className="font_name" style={{ fontSize: "15px" }}>Poppins bold</p>
                      < p className="font_example" style={{ fontSize: "12px" }}>{t("SAMPLE_TEXT")}Poppins bold</p>
                    </div>

                    <div className="frame_link" style={chosenFrameFont === "Poppins" && chosenFrameFontWeight === "400" ? { border: "3px solid #EC695C", fontFamily: "Poppins", fontWeight: "400" }
                      : { fontFamily: "Poppins", fontWeight: "400" }}
                      onClick={() => { changeFrameFont("Poppins"); changeFrameFontWeight("400"); changeFrameFontInfo("Poppins") }} >
                      {chosenFrameFont === "Poppins" && chosenFrameFontWeight === "400" && <div className="frame_chosen" />}
                      < p className="font_name" style={{ fontSize: "15px" }}>Poppins</p>
                      < p className="font_example" style={{ fontSize: "12px" }}>{t("SAMPLE_TEXT")}Poppins</p>
                    </div>

                    <div className="frame_link" style={chosenFrameFont === "Roboto" && chosenFrameFontWeight === "700" ? { border: "3px solid #EC695C", fontFamily: "Roboto", fontWeight: "700" }
                      : { fontFamily: "Roboto", fontWeight: "700" }}
                      onClick={() => { changeFrameFont("Roboto"); changeFrameFontWeight("700"); changeFrameFontInfo("Roboto-bold") }} >
                      {chosenFrameFont === "Roboto" && chosenFrameFontWeight === "700" && <div className="frame_chosen" />}
                      < p className="font_name" style={{ fontSize: "15px" }}>Roboto bold</p>
                      < p className="font_example" style={{ fontSize: "12px" }}>{t("SAMPLE_TEXT")}Roboto bold</p>
                    </div>

                    <div className="frame_link" style={chosenFrameFont === "Roboto" && chosenFrameFontWeight === "400" ? { border: "3px solid #EC695C", fontFamily: "Roboto", fontWeight: "400" }
                      : { fontFamily: "Roboto", fontWeight: "400" }}
                      onClick={() => { changeFrameFont("Roboto"); changeFrameFontWeight("400"); changeFrameFontInfo("Roboto") }} >
                      {chosenFrameFont === "Roboto" && chosenFrameFontWeight === "400" && <div className="frame_chosen" />}
                      < p className="font_name" style={{ fontSize: "15px" }}>Roboto</p>
                      < p className="font_example" style={{ fontSize: "12px" }}>{t("SAMPLE_TEXT")}Roboto</p>
                    </div>

                    <div className="frame_link" style={chosenFrameFont === "Rubik" && chosenFrameFontWeight === "700" ? { border: "3px solid #EC695C", fontFamily: "Rubik", fontWeight: "700" }
                      : { fontFamily: "Rubik", fontWeight: "700" }}
                      onClick={() => { changeFrameFont("Rubik"); changeFrameFontWeight("700"); changeFrameFontInfo("Rubik-bold") }} >
                      {chosenFrameFont === "Rubik" && chosenFrameFontWeight === "700" && <div className="frame_chosen" />}
                      < p className="font_name" style={{ fontSize: "15px" }}>Rubik bold</p>
                      < p className="font_example" style={{ fontSize: "12px" }}>{t("SAMPLE_TEXT")}Rubik bold</p>
                    </div>

                    <div className="frame_link" style={chosenFrameFont === "Rubik" && chosenFrameFontWeight === "400" ? { border: "3px solid #EC695C", fontFamily: "Rubik", fontWeight: "400" }
                      : { fontFamily: "Rubik", fontWeight: "400" }}
                      onClick={() => { changeFrameFont("Rubik"); changeFrameFontWeight("400"); changeFrameFontInfo("Rubik") }} >
                      {chosenFrameFont === "Rubik" && chosenFrameFontWeight === "400" && <div className="frame_chosen" />}
                      < p className="font_name" style={{ fontSize: "15px" }}>Rubik</p>
                      < p className="font_example" style={{ fontSize: "12px" }}>{t("SAMPLE_TEXT")}Rubik</p>
                    </div>
                  </div>
                </div>
              </div>



              {allowFrameTitleFlag ?
                <div className="add_title_button"
                  onClick={toggleTitle}
                  style={{ cursor: "pointer" }}>
                  {frameTitleFlag ? t("REMOVE_TITLE") : t("ADD_TITLE")}
                  <div className="button_arrows" />
                </div>
                :
                <div className="add_title_button"
                  style={{ cursor: "not-allowed" }} data-tip data-for='addtitle'>
                  {frameTitleFlag ? t("REMOVE_TITLE") : t("ADD_TITLE")}
                  <div className="button_arrows" />
                </div>
              }
              {!allowFrameTitleFlag &&
                <ReactTooltip className='tooltip_custom' id='addtitle' place="top" type="error" effect="float" delayShow={200}>
                  <span>{t("FRAME_TITLE_TOOLTIP_1")}<br />{t("FRAME_TITLE_TOOLTIP_2")}<br />{t("FRAME_TITLE_TOOLTIP_3")}</span>
                </ReactTooltip>
              }








            </>
          }
          {chosenModel.panelRotation === 90 &&
            <p className="instruction_normal">{t("NO_TITLE_IN_CHOSEN_MODEL")}</p>
          }

          {frameHoldersTemp ?
            <div className="add_frame_button"
              style={{ cursor: "pointer" }}
              onClick={handleAddNewFrame}
            >
              {t("CONFIRM_UPPERCASE")}
              <div className="button_arrows" />
            </div>
            :
            <div className="add_frame_button"
              style={!confirmWait ? { cursor: "pointer" } : { cursor: "not-allowed" }}
              data-tip data-for='confirm_button'
            >
              {t("CONFIRM_UPPERCASE")}
              <div className="button_arrows" />
            </div>
          }



          <div style={(!frameHoldersTemp && confirmWait) ? { opacity: "1" } : { opacity: "0" }}>
            <ReactTooltip className='tooltip_custom' id='confirm_button' place="top" type="error" effect="float" delayShow={200}>
              <span>{t("FRAME_CONFIRM_TOOLTIP")}</span>
            </ReactTooltip>
          </div>

          {frameHolders.length > 0 &&
            <>
              <p className="instruction_bold" style={{ marginTop: "0" }}>{t("FRAME_LIST")}</p>

              <ol className="frame_list" >
                {frameHolders.map((frame, index) =>
                  < li key={index} className="frame_list_element"
                    onMouseOver={() => { overFrame({ index: index, flag: true }) }}
                    onMouseLeave={() => { overFrame({ index: index, flag: false }) }}
                  >
                    {t("FRAME_LIST_START_AREA")} <span>{frame.frameInfo.startRow}</span>, <span>{frame.frameInfo.startColumn}</span> ; {t("FRAME_LIST_WIDTH")}<span>{frame.frameInfo.columns}</span> ;
                    {t("FRAME_LIST_HEIGHT")}<span>{frame.frameInfo.rows}</span> ;
                    {t("FRAME_LIST_CORNERS")}<span>{frame.frameInfo.shape === "sharp" ? t("STRAIGHT_LOWERCASE") : t("ROUNDED_LOWERCASE")}</span>
                    {frame.framePrint.text && t("FRAME_LIST_TITLE")}
                    {frame.framePrint.text &&
                      <>
                        {indexFrameToEdit === index ?
                          <form
                            onSubmit={(e) => { handleSubmit(e, index) }}
                            className="input_box" >
                            < input
                              className="text_input"
                              type="text"
                              autoComplete="off"
                              maxLength="16"
                              value={frameText}
                              onChange={(text) => handleChangeTextFrame(text)}
                            />

                            <input type="image" src={Submitinput} alt="submitinput" className="panel_name_image" />
                            <img src={Clearinput} alt="clearinput" className="panel_name_image"
                              onClick={handleAbort}
                            />
                          </form>
                          :
                          <>
                            <span className="frame_title">{frame.framePrint.text}</span>
                            <div className="frame_list_button" onClick={() => { handleEditFrameText(frame.framePrint.text, index) }}>
                              <img className="frame_list_img" src={Edit} alt="editframe" />
                            </div>
                          </>
                        }
                      </>
                    }
                    {frame.framePrint.text &&
                      <div className="no_break_div">
                        <span className="coma">&nbsp;,&nbsp;</span>
                        {t("FRAME_LIST_FONT")}<span>&nbsp;{frame.framePrint.frameFontInfo}</span>
                        <div className="frame_list_button" onClick={() => { removeFrame(index) }}>
                          <img className="frame_list_img" src={Remove} alt="removeframe" />
                        </div>
                      </div>
                    }
                    {!frame.framePrint.text &&
                      <div className="frame_list_button" onClick={() => { removeFrame(index) }}>
                        <img className="frame_list_img" src={Remove} alt="removeframe" />
                      </div>
                    }

                    {/* {frame.framePrint.text && t("FRAME_LIST_FONT")}
                    {frame.framePrint.text && <span>{frame.framePrint.frameFontInfo}</span>} */}


                  </li>
                )}
              </ol>
            </>
          }
        </div>
      </div>
    </div >

  );
};


const mapStateToProps = state => ({
  chosenModel: state.frontEndData.model.chosenModel,
  chosenFrameFont: state.frontEndData.frame.chosenFrameFont,
  chosenFrameFontWeight: state.frontEndData.frame.chosenFrameFontWeight,
  chosenFrameFontInfo: state.frontEndData.frame.chosenFrameFontInfo,
  chosenFrameShape: state.frontEndData.frame.chosenFrameShape,
  chosenRfidShape: state.frontEndData.frame.chosenRfidShape,
  frameList: state.frontEndData.frame.frameList,
  overFrameRender: state.frontEndData.frame.overFrameRender,
  frameHolders: state.frontEndData.frame.frameHolders,
  frameHoldersTemp: state.frontEndData.frame.frameHoldersTemp,
  frameTitleFlag: state.frontEndData.frame.frameTitleFlag,
  allowFrameTitleFlag: state.frontEndData.frame.allowFrameTitleFlag,
  visual: state.frontEndData.visual.visual,
  languageRender: state.frontEndData.visual.languageRender,
  warnings: state.frontEndData.visual.warnings,
  chosenColor: state.frontEndData.color.color,
  rfidBackEnd: state.backEndData.rfid,
})

const mapDispatchToProps = dispatch => ({
  changeFrameFont: font => dispatch(actions.changeFrameFont(font)),
  changeFrameFontWeight: weight => dispatch(actions.changeFrameFontWeight(weight)),
  changeFrameFontInfo: font => dispatch(actions.changeFrameFontInfo(font)),
  changeFrameShape: shape => dispatch(actions.changeFrameShape(shape)),
  changeRfidShape: shape => dispatch(actions.changeRfidShape(shape)),
  addNewFrame: (income) => dispatch(actions.addNewFrame(income)),
  removeFrame: (frame) => dispatch(actions.removeFrame(frame)),
  overFrame: (frame) => dispatch(actions.overFrame(frame)),
  frameTitle: (frame) => dispatch(actions.frameTitle(frame)),
  changeFrameText: (frame) => dispatch(actions.changeFrameText(frame)),
  editFrameText: (text, index) => dispatch(actions.editFrameText(text, index)),
  editFrameTextBackEnd: (text, index) => dispatch(actionsBackEnd.editFrameText(text, index)),
  changeRfidBackEnd: (income) => dispatch(actionsBackEnd.changeRfid(income)),
  allowFrameTitle: (frame) => dispatch(actions.allowFrameTitle(frame)),
  toggleVisual: (income) => dispatch(actionsVisual.toggleVisual(income)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FrameEditor)



