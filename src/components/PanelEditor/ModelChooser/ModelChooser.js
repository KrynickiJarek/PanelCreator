import React from 'react';
import { connect } from "react-redux"
import actions from "./duck/actions"
import actionsBackEnd from "../../../components/duck/actions"

import "./ModelChooser.scss"
import availableModels from "./availableModels"
import { Select } from "antd"


const ModelChooser = ({ panelModel, change, changePanelTypeBackEnd }) => {



  const { Option } = Select;


  const handlePanelChange = (value) => {
    change(availableModels.find(panel => panel.type === value))
    changePanelTypeBackEnd(availableModels.find(panel => panel.type === value).backEndPanelType)
  };


  return (
    <div className="model_container">
      <h2 className="model_header">Wybierz model panelu</h2>
      <div className="model_content">
        <p>(wersja robocza)</p>
        <form className="panel_form">
          <label>Wybierz model:</label>
          <Select defaultValue={panelModel.type} style={{ width: 200 }} value={availableModels.type} onChange={handlePanelChange}>
            {availableModels.map((panel) => <Option key={panel.type}>{panel.type}</Option>)}
          </Select>
        </form>

      </div>
    </div >
  );
};

const mapStateToProps = state => ({
  panelModel: state.frontEndData.model
})

const mapDispatchToProps = dispatch => ({
  change: panelModel => dispatch(actions.change(panelModel)),
  changePanelTypeBackEnd: panelModel => dispatch(actionsBackEnd.changePanelType(panelModel))
})

export default connect(mapStateToProps, mapDispatchToProps)(ModelChooser)


