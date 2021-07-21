import React from 'react';
import { useState } from 'react';
import { connect } from "react-redux"
import actions from "./duck/actions"
import actionsBackEnd from "../../../components/duck/actions"

import "./ModelChooser.scss"
import availableModels from "./availableModels"


const ModelChooser = ({ panelModel, change, changePanelTypeBackEnd }) => {

  const [zoomId, setZoomId] = useState(null)


  const handlePanelChange = (type) => {
    change(availableModels.find(panel => panel.type === type))
    changePanelTypeBackEnd(availableModels.find(panel => panel.type === type).backEndPanelType)
    setZoomId(null)
  };

  let zoomStyle = {}
  zoomStyle.transform = "scale(1.3)"


  const handleZoom = (id) => {
    if (id !== zoomId) {
      setZoomId(id)
    } else {
      setZoomId(null)
    }
  };

  const handleLink = (link) => {
    window.open(`${link}`)
  };

  return (
    <div className="model_container">
      <h2 className="model_header">Wybierz model panelu</h2>
      <div className="model_content">
        {availableModels.map((panel, id) => {
          return (
            <div className="model_link" key={id}
              style={panelModel.type === panel.type ?
                zoomId === id ? { ...zoomStyle, border: "3px solid #EC695C" } : { border: "3px solid #EC695C" }
                : zoomId === id ? { ...zoomStyle, border: "3px solid #EC695C" } : {}
              }
            >
              <div className="model_box" onClick={() => handleZoom(id)} >
                <img src={panel.picture} alt="panelpicture" className="model_img" />
              </div>

              <p className="model_name" style={panelModel.type === panel.type ? { fontWeight: "700", margin: "0 5px" } : {}}>{panel.type}</p>
              <div style={zoomId === id ? { height: "auto", transition: "0.3s ease", opacity: "1" } : { height: "0px", opacity: "0", transition: "0.3s ease" }}>
                <p className="model_info">{panel.info}</p>
                <div className="button_box">
                  <div className="more_info_button"
                    // onClick={window.open(`${panel.link}`)}
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
          )
        })}
      </div >
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













// import React from 'react';
// import { connect } from "react-redux"
// import actions from "./duck/actions"
// import actionsBackEnd from "../../../components/duck/actions"

// import "./ModelChooser.scss"
// import availableModels from "./availableModels"
// import { Select } from "antd"


// const ModelChooser = ({ panelModel, change, changePanelTypeBackEnd }) => {



//   const { Option } = Select;


//   const handlePanelChange = (value) => {
//     change(availableModels.find(panel => panel.type === value))
//     changePanelTypeBackEnd(availableModels.find(panel => panel.type === value).backEndPanelType)
//   };


//   return (
//     <div className="model_container">
//       <h2 className="model_header">Wybierz model panelu</h2>
//       <div className="model_content">
//         <p>(wersja robocza)</p>
//         <form className="panel_form">
//           <label>Wybierz model:</label>
//           <Select defaultValue={panelModel.type} style={{ width: 200 }} value={availableModels.type} onChange={handlePanelChange}>
//             {availableModels.map((panel) => <Option key={panel.type}>{panel.type}</Option>)}
//           </Select>
//         </form>

//       </div>
//     </div >
//   );
// };

// const mapStateToProps = state => ({
//   panelModel: state.frontEndData.model
// })

// const mapDispatchToProps = dispatch => ({
//   change: panelModel => dispatch(actions.change(panelModel)),
//   changePanelTypeBackEnd: panelModel => dispatch(actionsBackEnd.changePanelType(panelModel))
// })

// export default connect(mapStateToProps, mapDispatchToProps)(ModelChooser)


