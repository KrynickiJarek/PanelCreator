import React from 'react';
import { connect } from "react-redux"
import actions from "./duck/actions"
import actionsBackEnd from "../../duck/actions"
import { t } from "../../../../i18n";

import "./ColorEditor.scss"
import availableColors from "./availableColors"
import ReactTooltip from "react-tooltip";



const ColorEditor = ({ color, change, chosenModel, changePanelColorBackEnd }) => {

  const handleChangeColor = (el) => {
    change(el)
    changePanelColorBackEnd(el.RAL, el.hex)
  }

  const smokedGlass = {
    RAL: "SMOKED_GLASS",
    name: "BLACK",
    hex: "#060707",
    iconColor: "white"
  }


  return (
    <div className="color_container">
      <h2 className="color_header">{t("SELECT_COLOR")}</h2>
      <div className="color_content">
        {availableColors.map((el, id) => {
          return (
            <div className="color_link" key={id} style={color.RAL === el.RAL ? { border: "3px solid #EC695C" } : {}}
              onClick={() => { handleChangeColor(el) }} >
              <div style={{ backgroundColor: el.hex }} className="color_box" />
              < p className="color_name" style={color.RAL === el.RAL ? { fontWeight: "700", margin: "0 5px" } : {}}>{t(el.name)}</p>
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
              < p className="color_name" style={color.RAL === smokedGlass.RAL ? { fontWeight: "700", margin: "0 5px" } : {}}>{t(smokedGlass.name)}</p>
              <p className="color_ral">{t(smokedGlass.RAL)}</p>
            </div>
            <ReactTooltip className='tooltip_custom' id='smokedGlass' place="top" type="error" effect="float" >
              <span>{t("SMOKED_GLASS_TOOLTIP_1")}<br />{t("SMOKED_GLASS_TOOLTIP_2")}</span>
            </ReactTooltip>
          </>
        }
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  color: state.frontEndData.color,
  chosenModel: state.frontEndData.model.chosenModel,
  languageRender: state.frontEndData.visual.languageRender,
})

const mapDispatchToProps = dispatch => ({
  change: color => dispatch(actions.change(color)),
  changePanelColorBackEnd: (ral, hex) => dispatch(actionsBackEnd.changePanelColor(ral, hex))
})

export default connect(mapStateToProps, mapDispatchToProps)(ColorEditor)


