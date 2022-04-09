import React, { useEffect } from 'react';
import { connect } from "react-redux"
import actions from "./duck/actions"
import actionsBackEnd from "../../duck/actions"
import actionsVisual from "../../PanelPreview/duck/actions"
import actionsFrame from "../../PanelEditor/FrameEditor/duck/actions"
import { t } from "../../../../i18n";

import "./ColorEditor.scss"
import availableColors from "./availableColors"
import ReactTooltip from "react-tooltip";

import Cut0 from "../../../../assets/cuts/cut0.svg"
import Cut2 from "../../../../assets/cuts/cut2.svg"
import Cut5 from "../../../../assets/cuts/cut5.svg"


const ColorEditor = ({
  color,
  changeColor,
  cut,
  changeCut,
  chosenModel,
  changePanelColorBackEnd,
  changePanelCutBackEnd,
  frameHolders,
  showAlert,
  overFrameAll,
  alertAnswer
}) => {
  const smokedGlass = {
    RAL: "SMOKED_GLASS",
    name: "BLACK",
    hex: "#060707",
    iconColor: "white"
  }

  const handleChangeColor = (el) => {
    changeColor(el)
    changePanelColorBackEnd(el.RAL, el.hex)
  }
  useEffect(() => {
    if (alertAnswer === 105) {
      handleChangeColor(smokedGlass)
    }
    // eslint-disable-next-line 
  }, [alertAnswer])


  const handleChangeCut = (el) => {
    changeCut(el)
    changePanelCutBackEnd(el)
  }




  return (
    <div className="color_container">
      <h2 className="color_header">{t("SELECT_CUT_STYLE")}</h2>

      <div className="color_content" style={{ marginBottom: "40px" }}>
        <div className="color_link" style={cut === 0 ? { border: "3px solid #EC695C" } : {}}
          data-tip data-for='cut_type'
          onClick={() => { handleChangeCut(0) }} >
          <img src={Cut0} alt="sharpframe" className="cut_img" />
          < p className="color_name" style={cut === 0 ? { fontWeight: "700" } : {}}>{t("NO_CUT")}</p>
          <p className="color_ral">{t("CUT_INFO_NO_EXTENSION")}</p>
          <p className="color_ral">({chosenModel.width} mm x {chosenModel.height} mm)</p>
        </div>

        <div className="color_link" style={cut === 2 ? { border: "3px solid #EC695C" } : {}}
          data-tip data-for='cut_type'
          onClick={() => { handleChangeCut(2) }} >
          <img src={Cut2} alt="sharpframe" className="cut_img" />
          < p className="color_name" style={cut === 2 ? { fontWeight: "700" } : {}}>{t("CUT_2MM")}</p>
          <p className="color_ral">{t("CUT_INFO_NO_EXTENSION")}</p>
          <p className="color_ral">({chosenModel.width} mm x {chosenModel.height} mm)</p>
        </div>

        <div className="color_link" style={cut === 5 ? { border: "3px solid #EC695C" } : {}}
          data-tip data-for='cut_type'
          onClick={() => { handleChangeCut(5) }} >
          <img src={Cut5} alt="sharpframe" className="cut_img" />
          < p className="color_name" style={cut === 5 ? { fontWeight: "700" } : {}}>{t("CUT_5MM")}</p>
          <p className="color_ral">{t("CUT_INFO_EXTENSION")}</p>
          <p className="color_ral">({chosenModel.width + 5} mm x {chosenModel.height + 5} mm)</p>
        </div>

        <ReactTooltip className='tooltip_custom' id='cut_type' place="top" type="error" effect="float" >
          <span>{t("CUT_TOOLTIP")}</span>
        </ReactTooltip>
      </div>




      <h2 className="color_header">{t("SELECT_COLOR")}</h2>
      <p className="instruction_bold">{t("BASIC_COLORS")}</p>

      <div className="color_content">

        {(chosenModel.type === "MDOT_M18" || chosenModel.type === "MDOT_M18_UNIVERSAL") &&
          <>
            {frameHolders.length !== 0 ?
              <div className="color_link" style={color.RAL === smokedGlass.RAL ? { border: "3px solid #EC695C" } : {}}
                data-tip data-for='smokedGlass'
                onClick={() => showAlert(105)}
                onMouseOver={() => { overFrameAll(true) }}
                onMouseLeave={() => { overFrameAll(false) }}
              >
                <div style={{ backgroundColor: smokedGlass.hex }} className="color_box" />
                < p className="color_name" style={color.RAL === smokedGlass.RAL ? { fontWeight: "700" } : {}}>{t(smokedGlass.name)}</p>
                <p className="color_ral">{t(smokedGlass.RAL)}</p>
              </div>
              :
              <div className="color_link" style={color.RAL === smokedGlass.RAL ? { border: "3px solid #EC695C" } : {}}
                data-tip data-for='smokedGlass'
                onClick={() => { handleChangeColor(smokedGlass) }} >
                <div style={{ backgroundColor: smokedGlass.hex }} className="color_box" />
                < p className="color_name" style={color.RAL === smokedGlass.RAL ? { fontWeight: "700" } : {}}>{t(smokedGlass.name)}</p>
                <p className="color_ral">{t(smokedGlass.RAL)}</p>
              </div>
            }
            <ReactTooltip className='tooltip_custom' id='smokedGlass' place="top" type="error" effect="float" >
              <span>{t("SMOKED_GLASS_TOOLTIP_1")}<br />{t("SMOKED_GLASS_TOOLTIP_2")}<br />{t("SMOKED_GLASS_TOOLTIP_3")}</span>
            </ReactTooltip>
          </>
        }

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
  cut: state.frontEndData.color.cut,
  chosenModel: state.frontEndData.model.chosenModel,
  languageRender: state.frontEndData.visual.languageRender,
  frameHolders: state.frontEndData.frame.frameHolders,
  alertAnswer: state.frontEndData.visual.alertAnswer,
})

const mapDispatchToProps = dispatch => ({
  changeColor: color => dispatch(actions.changeColor(color)),
  changeCut: cut => dispatch(actions.changeCut(cut)),
  changePanelColorBackEnd: (ral, hex) => dispatch(actionsBackEnd.changePanelColor(ral, hex)),
  changePanelCutBackEnd: cut => dispatch(actionsBackEnd.changePanelCut(cut)),
  showAlert: (income) => dispatch(actionsVisual.showAlert(income)),
  overFrameAll: (income) => dispatch(actionsFrame.overFrameAll(income)),
  overFrameReRender: (income) => dispatch(actionsFrame.overFrameReRender(income)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ColorEditor)


