import React, { useState } from 'react';
import { connect } from "react-redux"
import actionsVisual from "../../PanelPreview/duck/actions"
import availableWarnings from "./availableWarnings"


import Minimalize from "../../../../assets/side/minimalize.svg"

import "./Warning.scss"

const Warning = ({ warnings, updateWarnings }) => {

  const [moveRight, setMoveRight] = useState(0)
  const [moveDown, setMoveDown] = useState(0)

  const handleMinimalize = (index) => {
    setMoveRight(document.querySelector(`.minimalize-${index}`).parentElement.parentElement.offsetWidth - document.querySelector(`.minimalize-${index}`).offsetLeft - (0.25 * document.querySelector(`.minimalize-${index}`).offsetWidth))
    setMoveDown(document.querySelector(`.minimalize-${index}`).parentElement.parentElement.offsetHeight - document.querySelector(`.minimalize-${index}`).offsetTop - (0.5 * document.querySelector(`.minimalize-${index}`).offsetHeight))
    const copyWarnings = warnings
    copyWarnings[index].hide = true
    updateWarnings(copyWarnings)
    const warningTimeout = setTimeout(() => {
      const copyWarnings = warnings
      copyWarnings[index].show = false
      updateWarnings(copyWarnings)
    }, 700);
    return () => clearTimeout(warningTimeout);
  }

  return (
    <div className="warning_container">
      {warnings.map((warning, index) =>
        <div key={index} style={{ zIndex: "9999999" }} >
          {
            warning.show &&
            <div className={`warning_box minimalize-${index}`}
              style={warning.hide ? { transform: `translate(${moveRight}px, ${moveDown}px) scale(0.25)` } : {}}
            >
              <div className="warning_header">
                <span>UWAGA!</span>
                <img src={Minimalize} alt="minimalize" className="minimalize_icon"
                  onClick={() => handleMinimalize(index)}
                />
              </div>
              <p className="warning_text">{availableWarnings.find(element => element.code === warning.code).text}</p>
            </div>
          }
        </div>
      )
      }




      {/* <div className="warning_header">
          <span>UWAGA!</span>
          <img src={Minimalize} alt="minimalize" className="minimalize_icon"></img>
        </div>
        <p className="warning_text">Ewentualny brak widoczności elementów panelu wynika z ustawień monitora. Elementy będą widoczne na gotowym panelu.</p>
      </div >

  <div className="warning_box">
    <div className="warning_header">
      <span>UWAGA!</span>
      <img src={Minimalize} alt="minimalize" className="minimalize_icon"></img>
    </div>
    <p className="warning_text">Ewentualny brak widoczności elementów panelu wynika z ustawień monitora. Elementy będą widoczne na gotowym panelu.</p>
  </div> */}

    </div >
  );
};

const mapStateToProps = state => ({
  warnings: state.frontEndData.visual.warnings,
  warningsReRender: state.frontEndData.visual.warningsReRender,
})

const mapDispatchToProps = dispatch => ({
  updateWarnings: (income) => dispatch(actionsVisual.updateWarnings(income)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Warning)