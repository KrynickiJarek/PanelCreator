import React, { useState } from 'react';
import { connect } from "react-redux"
import actions from "./duck/actions"
import actionsVisual from "../../PanelPreview/duck/actions"

import "./FrameEditor.scss"
import { t } from "../../../../i18n";

import Roundframe from "../../../../assets/frame/roundframe.svg"
import Sharpframe from "../../../../assets/frame/sharpframe.svg"
import Remove from "../../../../assets/preview/remove.svg"
import Locked from "../../../../assets/preview/lock.svg"
import Unlocked from "../../../../assets/preview/unlock.svg"

import ReactTooltip from "react-tooltip";

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
  const [confirmWait, setConfirmWait] = useState(true)


  const handleAddNewFrame = () => {
    setConfirmWait(false)
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
      <div className="frame_container">
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
              <div className="frame_choosing_box">

                <div className="frame_link" style={(chosenFrameFont === "Calibri-bold") ? { border: "3px solid #EC695C", fontFamily: "Calibri-bold" }
                  : { fontFamily: "Calibri-bold" }}
                  onClick={() => { changeFrameFont("Calibri-bold") }} >
                  {(chosenFrameFont === "Calibri-bold") && <div className="frame_chosen" />}
                  < p className="font_name" style={{ fontSize: "18px" }}>Calibri bold</p>
                  < p className="font_example" style={{ fontSize: "12px" }}>{t("SAMPLE_TEXT")}Calibri-bold</p>
                </div>

                <div className="frame_link" style={chosenFrameFont === "Calibri" ? { border: "3px solid #EC695C", fontFamily: "Calibri" }
                  : { fontFamily: "Calibri" }}
                  onClick={() => { changeFrameFont("Calibri") }} >
                  {chosenFrameFont === "Calibri" && <div className="frame_chosen" />}
                  < p className="font_name" style={{ fontSize: "18px" }}>Calibri</p>
                  < p className="font_example" style={{ fontSize: "12px" }}>{t("SAMPLE_TEXT")}Calibri</p>
                </div>

                <div className="frame_link" style={chosenFrameFont === "Helvetica_bold" ? { border: "3px solid #EC695C", fontFamily: "Helvetica_bold" }
                  : { fontFamily: "Helvetica_bold" }}
                  onClick={() => { changeFrameFont("Helvetica_bold") }} >
                  {chosenFrameFont === "Helvetica_bold" && <div className="frame_chosen" />}
                  < p className="font_name" style={{ fontSize: "18px" }}>Helvetica bold</p>
                  < p className="font_example" style={{ fontSize: "12px" }}>{t("SAMPLE_TEXT")}Helvetica Bold</p>
                </div>

                <div className="frame_link" style={chosenFrameFont === "Helvetica" ? { border: "3px solid #EC695C", fontFamily: "Helvetica" }
                  : { fontFamily: "Helvetica" }}
                  onClick={() => { changeFrameFont("Helvetica") }} >
                  {chosenFrameFont === "Helvetica" && <div className="frame_chosen" />}
                  < p className="font_name" style={{ fontSize: "18px" }}>Helvetica</p>
                  < p className="font_example" style={{ fontSize: "12px" }}>{t("SAMPLE_TEXT")}Helvetica</p>
                </div>

                <div className="frame_link" style={chosenFrameFont === "Arial" ? { border: "3px solid #EC695C", fontFamily: "Arial" }
                  : { fontFamily: "Arial" }}
                  onClick={() => { changeFrameFont("Arial") }} >
                  {chosenFrameFont === "Arial" && <div className="frame_chosen" />}
                  < p className="font_name" style={{ fontSize: "18px" }}>Arial</p>
                  < p className="font_example" style={{ fontSize: "12px" }}>{t("SAMPLE_TEXT")}Arial</p>
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


          {/* <div className="add_frame_button"
            style={frameHoldersTemp && confirmWait ? { cursor: "pointer" } : { cursor: "not-allowed" }}
            onClick={handleAddNewFrame}
            data-tip data-for='confirm_button'
          >
            {t("CONFIRM_UPPERCASE")}
            <div className="button_arrows" />
          </div> */}





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
                    {frame.framePrint.text && <span>{frame.framePrint.text}</span>}
                    {frame.framePrint.text && t("FRAME_LIST_FONT")}
                    {frame.framePrint.text && <span>{frame.framePrint.frameFont}</span>}
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
  languageRender: state.frontEndData.visual.languageRender,
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



