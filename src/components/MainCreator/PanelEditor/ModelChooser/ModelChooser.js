import React from 'react';
import { useState, useEffect } from 'react';
import { connect } from "react-redux"
import actions from "./duck/actions"
import actionsBackEnd from "../../duck/actions"
import actionsVisual from "../../PanelPreview/duck/actions"
import { t } from "../../../../i18n";

import "./ModelChooser.scss"
import availableModels from "./availableModels"


const ModelChooser = ({
  panelModel,
  change,
  changePanelTypeBackEnd,
  chosenTab,
  resetAllAfterModelChange,
  showAlert,
  panelTextBackEnd,
  iconsBackEnd,
  framesBackEnd,
  alertAnswer,
  setAlertAnswer
}) => {

  const [zoomId, setZoomId] = useState(null)
  const [resize, setResize] = useState(0)
  const [onTop, setOnTop] = useState(null)
  const [onBack, setOnBack] = useState(null)
  const [isChanging, setIsChanging] = useState(false)
  const [panelTypeToSet, setPanelTypeToSet] = useState("MDOT_2")

  useEffect(() => {
    if (alertAnswer === 7) {
      panelChange(panelTypeToSet)
    }
    // eslint-disable-next-line 
  }, [alertAnswer])


  const handlePanelChange = (type) => {
    if (panelTextBackEnd.length !== 0 || iconsBackEnd.length !== 0 || framesBackEnd.length !== 0) {
      showAlert(7)
      setPanelTypeToSet(type)
    } else {
      panelChange(type)
    }
  };

  const panelChange = (type) => {
    resetAllAfterModelChange(true)
    change(availableModels.find(panel => panel.type === type))
    changePanelTypeBackEnd(availableModels.find(panel => panel.type === type).backEndPanelType)
    setZoomId(null)
    setAlertAnswer(null)
  };



  const handleZoom = (id) => {
    setIsChanging(true)
    if (!isChanging) {
      setResize(document.querySelector(`.resize-${id}`).clientHeight)
      let editorBoxSize = (document.querySelector(".editor_box").clientHeight)
      let modelLinkSize = (((document.querySelector(`.resize-${id}`).parentElement.parentElement.clientHeight) + (document.querySelector(`.resize-${id}`).clientHeight)))
      let checkPosition = (document.querySelector(`.resize-${id}`).parentElement.parentElement.offsetTop) + (((document.querySelector(`.resize-${id}`).parentElement.parentElement.clientHeight) + (document.querySelector(`.resize-${id}`).clientHeight)) * 1.3) - 70 //było -10
      let currPosition = ((document.querySelector(".model_container").scrollTop) + editorBoxSize)

      let containerSctrollTop = document.querySelector(".model_container").scrollTop + 70
      let modelOffsetTop = document.querySelector(`.resize-${id}`).parentElement.parentElement.offsetTop


      if (currPosition < checkPosition || containerSctrollTop > modelOffsetTop) {
        document.querySelector(".model_container").scroll({
          top: (document.querySelector(`.resize-${id}`).parentElement.parentElement.offsetTop) + modelLinkSize - editorBoxSize + 60,
          behavior: 'smooth'
        });
      }


      if (id !== zoomId) {
        setOnBack(zoomId)
        setZoomId(id)
        setOnTop(id)
        const modeltimeout = setTimeout(() => {
          setOnBack(null)
          setIsChanging(false)
        }, 200);
        return () => clearTimeout(modeltimeout);
      } else {
        setZoomId(null)
        const modeltimeout = setTimeout(() => {
          setOnTop(null)
          setOnBack(null)
          setIsChanging(false)
        }, 400);
        return () => clearTimeout(modeltimeout);
      }
    }
  };

  const handleLink = (link) => {
    window.open(`${t(link)}`)
  };

  useEffect(() => {
    if (chosenTab !== "model") {
      setZoomId(null)
    }
  }, [chosenTab]);



  return (
    <div className="model_container">
      <h2 className="model_header">{t("SELECT_PANEL_MODEL")}</h2>
      <p className="instruction_bold">{t("MODEL_CHOOSER_INFO_BOLD_1")}<span style={{ textDecoration: "underline" }}>{t("MODEL_CHOOSER_INFO_BOLD_2")}</span>{t("MODEL_CHOOSER_INFO_BOLD_3")}</p>
      <div className="model_content">
        {availableModels.map((panel, id) => {
          return (
            <div className="model_section" key={id}>

              <div className="model_push"
                style={
                  zoomId === id ?
                    (onTop === id || onBack === id) ? { transform: "scale(1.3)", minHeight: `${300 + resize}px` } : { transform: "scale(1.3)", minHeight: `${300 + resize}px` }
                    : (onTop === id || onBack === id) ? { transform: "scale(1)", minHeight: "275px" } : { transform: "scale(1)", minHeight: "275px" }

                } />


              <div className="model_link"
                style={panelModel.type === panel.type ?
                  zoomId === id ?
                    (onTop === id || onBack === id) ? { transform: "scale(1.3)", zIndex: "999", border: "3px solid #EC695C", maxHeight: `${275 + resize}px` } : { transform: "scale(1.3)", border: "3px solid #EC695C", maxHeight: `${275 + resize}px` }
                    : (onTop === id || onBack === id) ? { zIndex: "999", transform: "scale(1)", border: "3px solid #EC695C", maxHeight: "275px" } : { transform: "scale(1)", border: "3px solid #EC695C", maxHeight: "275px" }


                  : zoomId === id ?
                    (onTop === id || onBack === id) ? { transform: "scale(1.3)", zIndex: "999", border: "3px solid #EC695C", maxHeight: `${275 + resize}px` } : { transform: "scale(1.3)", border: "3px solid #EC695C", maxHeight: `${275 + resize}px` }
                    : (onTop === id || onBack === id) ? { zIndex: "999", transform: "scale(1)", maxHeight: "275px" } : { transform: "scale(1)", maxHeight: "275px" }
                }
              >


                <div style={{ cursor: "pointer", zIndex: "10", backgroundColor: "white", margin: "0 auto" }}
                  onClick={() => handleZoom(id)}
                >
                  <div className="model_box">
                    <img src={panel.picture} alt="panelpicture" className="model_img" />
                  </div>
                  <p className="model_name" style={panelModel.type === panel.type ? { fontWeight: "700", margin: "0 5px" } : {}}>{t(panel.type)}</p>
                </div>

                <div className={`resize-${id}`} style={zoomId === id ? { transition: "0.5s ease", opacity: "1" } : { transform: "translateY(-100%)", transition: "0.5s ease", opacity: "0.5" }}>
                  <p className="model_info" onClick={() => handleZoom(id)}>{t(panel.info)}</p>
                  <div className="button_box">
                    <div className="more_info_button"
                      onClick={() => handleLink(panel.link)}
                    >
                      {t("MORE")}
                      <div className="button_arrows" />
                    </div>
                    <div className="select_button"
                      onClick={() => { handlePanelChange(panel.type) }}
                    >
                      {t("SELECT")}
                      <div className="button_arrows" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div >
    </div >
  );
};

const mapStateToProps = state => ({
  panelModel: state.frontEndData.model.chosenModel,
  chosenTab: state.frontEndData.tab,
  languageRender: state.frontEndData.visual.languageRender,
  panelTextBackEnd: state.backEndData.panelText,
  iconsBackEnd: state.backEndData.icons,
  framesBackEnd: state.backEndData.frames,
  alertAnswer: state.frontEndData.visual.alertAnswer,
})

const mapDispatchToProps = dispatch => ({
  change: panelModel => dispatch(actions.change(panelModel)),
  resetAllAfterModelChange: panelModel => dispatch(actions.resetAllAfterModelChange(panelModel)),
  changePanelTypeBackEnd: panelModel => dispatch(actionsBackEnd.changePanelType(panelModel)),
  showAlert: (income) => dispatch(actionsVisual.showAlert(income)),
  setAlertAnswer: (income) => dispatch(actionsVisual.setAlertAnswer(income))
})

export default connect(mapStateToProps, mapDispatchToProps)(ModelChooser)

