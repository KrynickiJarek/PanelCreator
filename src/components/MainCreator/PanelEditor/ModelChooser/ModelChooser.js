import React from 'react';
import { useState, useEffect } from 'react';
import { connect } from "react-redux"
import actions from "./duck/actions"
import actionsBackEnd from "../../duck/actions"

import "./ModelChooser.scss"
import availableModels from "./availableModels"


const ModelChooser = ({ panelModel, change, changePanelTypeBackEnd, chosenTab, resetAllAfterModelChange }) => {

  const [zoomId, setZoomId] = useState(null)
  const [resize, setResize] = useState(0)
  const [onTop, setOnTop] = useState(null)
  const [onBack, setOnBack] = useState(null)
  const [isChanging, setIsChanging] = useState(false)


  const handlePanelChange = (type) => {
    change(availableModels.find(panel => panel.type === type))
    resetAllAfterModelChange(true)
    changePanelTypeBackEnd(availableModels.find(panel => panel.type === type).backEndPanelType)
    setZoomId(null)
  };



  const handleZoom = (id) => {
    setIsChanging(true)

    if (!isChanging) {
      setResize(document.querySelector(`.resieze-${id}`).clientHeight)
      document.querySelector(".model_container").scroll({
        top: (document.querySelector(`.resieze-${id}`).parentElement.parentElement.offsetTop) - 180,
        behavior: 'smooth'
      });

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
    window.open(`${link}`)
  };

  useEffect(() => {
    if (chosenTab !== "model") {
      setZoomId(null)
    }
  }, [chosenTab]);



  return (
    <div className="model_container">
      <h2 className="model_header">Wybierz model panelu</h2>
      <p className="instruction_bold">Kliknij na model, a następnie zatwierdź go przyciskiem "Wybierz". Wybranie modelu spowoduje <span style={{ textDecoration: "underline" }}>zresetowanie</span> aktualnego panelu.</p>
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


                <div style={{ cursor: "pointer", zIndex: "10", backgroundColor: "white", margin: "0 auto" }} onClick={() => handleZoom(id)} >
                  <div className="model_box">
                    <img src={panel.picture} alt="panelpicture" className="model_img" />
                  </div>
                  <p className="model_name" style={panelModel.type === panel.type ? { fontWeight: "700", margin: "0 5px" } : {}}>{panel.type}</p>
                </div>



                <div className={`resieze-${id}`} style={zoomId === id ? { transition: "0.5s ease", opacity: "1" } : { transform: "translateY(-100%)", transition: "0.5s ease", opacity: "0.5" }}>
                  <p className="model_info" onClick={() => handleZoom(id)} >{panel.info}</p>
                  <div className="button_box">
                    <div className="more_info_button"
                      onClick={() => handleLink(panel.link)}
                    >
                      Więcej
                      <div className="button_arrows" />
                    </div>
                    <div className="select_button"
                      onClick={() => { handlePanelChange(panel.type) }}
                    >
                      WYBIERZ
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
  chosenTab: state.frontEndData.tab
})

const mapDispatchToProps = dispatch => ({
  change: panelModel => dispatch(actions.change(panelModel)),
  resetAllAfterModelChange: panelModel => dispatch(actions.resetAllAfterModelChange(panelModel)),
  changePanelTypeBackEnd: panelModel => dispatch(actionsBackEnd.changePanelType(panelModel))
})

export default connect(mapStateToProps, mapDispatchToProps)(ModelChooser)

