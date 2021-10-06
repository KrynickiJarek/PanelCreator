import React from 'react';
import { connect } from "react-redux"
import actions from "./duck/actions"
import actionsBackEnd from "../../duck/actions"
import { t } from "../../../../i18n";

import "./ColorEditor.scss"
import availableColors from "./availableColors"
import ReactTooltip from "react-tooltip";



const ColorEditor = ({ color, changeColor, rounding, changeRounding, chosenModel, changePanelColorBackEnd }) => {

  const handleChangeColor = (el) => {
    changeColor(el)
    changePanelColorBackEnd(el.RAL, el.hex)
  }

  const handleChangeRounding = (el) => {
    changeRounding(el)
    // changePanelColorBackEnd(el.RAL, el.hex)
  }

  const smokedGlass = {
    RAL: "SMOKED_GLASS",
    name: "BLACK",
    hex: "#060707",
    iconColor: "white"
  }


  return (
    <div className="color_container">
      <h2 className="color_header">{t("SELECT_ROUNDING")}</h2>

      <div className="color_content" style={{ marginBottom: "40px" }}>
        <div className="color_link" style={rounding === 0 ? { border: "3px solid #EC695C" } : {}}
          onClick={() => { handleChangeRounding(0) }} >
          <div style={{ backgroundColor: "white" }} className="color_box" />
          < p className="color_name" style={rounding === 0 ? { fontWeight: "700" } : {}}>{t("STANDARD_CUT")}</p>
        </div>

        <div className="color_link" style={rounding === 2 ? { border: "3px solid #EC695C" } : {}}
          onClick={() => { handleChangeRounding(2) }} >
          <div style={{ backgroundColor: "white" }} className="color_box" />
          < p className="color_name" style={rounding === 2 ? { fontWeight: "700" } : {}}>{t("ROUNDING_2MM")}</p>
        </div>

        <div className="color_link" style={rounding === 5 ? { border: "3px solid #EC695C" } : {}}
          onClick={() => { handleChangeRounding(5) }} >
          <div style={{ backgroundColor: "white" }} className="color_box" />
          < p className="color_name" style={rounding === 5 ? { fontWeight: "700" } : {}}>{t("ROUNDING_5MM")}</p>
          {/* <p className="color_ral">{t(smokedGlass.RAL)}</p> */}
          <p className="color_ral">Wymiary panelu zwiększone o 5mm z każdej strony</p>
        </div>
      </div>




      <h2 className="color_header">{t("SELECT_COLOR")}</h2>
      <p className="instruction_bold">{t("BASIC_COLORS")}</p>

      <div className="color_content">
        {availableColors.filter(element => element.type === "basic").map((el, id) => {
          return (
            <div className="color_link" key={id} style={color.RAL === el.RAL ? { border: "3px solid #EC695C" } : {}}
              onClick={() => { handleChangeColor(el) }} >
              <div style={{ backgroundColor: el.hex }} className="color_box" />
              < p className="color_name" style={color.RAL === el.RAL ? { fontWeight: "700" } : {}}>{t(el.name)}</p>
              <p className="color_ral">{el.RAL}</p>
            </div>

          )
        })}
        {(chosenModel.type === "MDOT_M18" || chosenModel.type === "MDOT_M18_UNIVERSAL") &&
          <>
            <div className="color_link" style={color.RAL === smokedGlass.RAL ? { border: "3px solid #EC695C" } : {}}
              data-tip data-for='smokedGlass'
              onClick={() => { handleChangeColor(smokedGlass) }} >
              <div style={{ backgroundColor: smokedGlass.hex }} className="color_box" />
              < p className="color_name" style={color.RAL === smokedGlass.RAL ? { fontWeight: "700" } : {}}>{t(smokedGlass.name)}</p>
              <p className="color_ral">{t(smokedGlass.RAL)}</p>
            </div>
            <ReactTooltip className='tooltip_custom' id='smokedGlass' place="top" type="error" effect="float" >
              <span>{t("SMOKED_GLASS_TOOLTIP_1")}<br />{t("SMOKED_GLASS_TOOLTIP_2")}</span>
            </ReactTooltip>
          </>
        }
      </div>


      <p className="instruction_bold">{t("SPECIAL_COLORS")}</p>
      <p className="instruction_normal">{t("WAITING_TIME")}</p>
      <div className="color_content">
        {availableColors.filter(element => element.type === "special").map((el, id) => {
          return (
            <div className="color_link" key={id} style={color.RAL === el.RAL ? { border: "3px solid #EC695C" } : {}}
              onClick={() => { handleChangeColor(el) }} >
              <div style={{ backgroundColor: el.hex }} className="color_box" />
              < p className="color_name" style={color.RAL === el.RAL ? { fontWeight: "700" } : {}}>{t(el.name)}</p>
              <p className="color_ral">{el.RAL}</p>
            </div>

          )
        })}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  color: state.frontEndData.color.color,
  rounding: state.frontEndData.color.rounding,
  chosenModel: state.frontEndData.model.chosenModel,
  languageRender: state.frontEndData.visual.languageRender,
})

const mapDispatchToProps = dispatch => ({
  changeColor: color => dispatch(actions.changeColor(color)),
  changeRounding: rounding => dispatch(actions.changeRounding(rounding)),
  changePanelColorBackEnd: (ral, hex) => dispatch(actionsBackEnd.changePanelColor(ral, hex))
  // changePanelRoundingBackEnd: (ral, hex) => dispatch(actionsBackEnd.changePanelColor(ral, hex))
})

export default connect(mapStateToProps, mapDispatchToProps)(ColorEditor)


