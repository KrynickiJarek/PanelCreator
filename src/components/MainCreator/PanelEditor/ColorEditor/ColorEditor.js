import React from 'react';
import { connect } from "react-redux"
import actions from "./duck/actions"
import actionsBackEnd from "../../duck/actions"

import "./ColorEditor.scss"
import availableColors from "./availableColors"



const ColorEditor = ({ color, change, changePanelColorBackEnd }) => {

  const handleChangeColor = (el) => {
    change(el)
    changePanelColorBackEnd(el.RAL, el.hex)
  }


  return (
    <div className="color_container">
      <h2 className="color_header">Wybierz kolor tła panelu</h2>
      <div className="color_content">
        {availableColors.map((el, id) => {
          return (
            <div className="color_link" key={id} style={color.hex === el.hex ? { border: "3px solid #EC695C" } : {}}
              onClick={() => { handleChangeColor(el) }} >
              <div style={{ backgroundColor: el.hex }} className="color_box" />
              < p className="color_name" style={color.hex === el.hex ? { fontWeight: "700", margin: "0 5px" } : {}}>{el.name}</p>
              <p className="color_ral">RAL: {el.RAL}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  color: state.frontEndData.color
})

const mapDispatchToProps = dispatch => ({
  change: color => dispatch(actions.change(color)),
  changePanelColorBackEnd: (ral, hex) => dispatch(actionsBackEnd.changePanelColor(ral, hex))
})

export default connect(mapStateToProps, mapDispatchToProps)(ColorEditor)


