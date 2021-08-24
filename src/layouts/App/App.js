import React from 'react';
import './App.scss';
import { connect } from "react-redux";
import { t } from "../../i18n";

import {
  BrowserView,
  MobileView,
} from "react-device-detect";

import Dashboard from "../../components/Dashboard/Dashboard"
import MobileComponent from "../../components/MobileComponent/MobileComponent"

import actionsVisual from "../../components/MainCreator/PanelPreview/duck/actions";
import actionsDashboard from "../../components/Dashboard/duck/actions";


import actionsBackEnd from "../../components/MainCreator/duck/actions";
import actionsColor from "../../components/MainCreator/PanelEditor/ColorEditor/duck/actions";
import actionsTab from "../../components/MainCreator/PanelEditor/duck/actions";
import actionsFrame from "../../components/MainCreator/PanelEditor/FrameEditor/duck/actions";
import actionsIcon from "../../components/MainCreator/PanelEditor/IconEditor/duck/actions";
import actionsModel from "../../components/MainCreator/PanelEditor/ModelChooser/duck/actions";
import actionsText from "../../components/MainCreator/PanelEditor/TextEditor/duck/actions";

import emergencyInitialState from './emergencyInitialState';







const App = ({
  showAlert,
  updatePanels,
  showDashboard,
  dashboardSmoothEnter,
  hideCreator,
  changeIndexOfLastPanel,
  resetAllAfterModelChange,
  setBackEndReducers,
  setFrontEndReducerColor,
  setFrontEndReducerTab,
  setFrontEndReducerModel,
  setFrontEndReducerFrame,
  setFrontEndReducerIcon,
  setFrontEndReducerText,
  setFrontEndReducerVisual

}) => {





  class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
      return { hasError: true };
    }


    render() {

      const backEndData = {
        panelName: '',
        panelType: 0,
        panelColorRal: 'RAL 9005',
        panelColorHex: '#060707',
        icons: [],
        panelText: [],
        frames: []
      }


      if (this.state.hasError) {

        const handleEmergencyReset = () => {

          console.log("dziala error")
          updatePanels([])
          showDashboard(true)
          dashboardSmoothEnter(true)
          hideCreator(true)
          changeIndexOfLastPanel(-1)
          setBackEndReducers(backEndData)
          resetAllAfterModelChange(true)
          setFrontEndReducerColor(emergencyInitialState.color)
          setFrontEndReducerTab(emergencyInitialState.tab)
          setFrontEndReducerModel(emergencyInitialState.model.chosenModel)
          setFrontEndReducerFrame(emergencyInitialState.frame)
          setFrontEndReducerIcon(emergencyInitialState.icon)
          setFrontEndReducerText(emergencyInitialState.text)
          setFrontEndReducerVisual(emergencyInitialState.visual)
          // showAlert(16)
          // return this.props.children;
          window.location.reload()
        }


        // Możesz wyrenderować dowolny interfejs zastępczy.
        return (
          <>
            <h1>{t("CRITICAL_ERROR_ALERT")}</h1>
            <button onClick={handleEmergencyReset}>{t("REFRESH")}</button>
          </>
        )
      } else {
        return this.props.children;
      }
    }
  }


  return (
    <ErrorBoundary>
      <BrowserView>
        <div className="App">
          <Dashboard />
        </div>
      </BrowserView>
      <MobileView>
        <MobileComponent />
      </MobileView>
    </ErrorBoundary>
  );
};


// const mapStateToProps = state => ({
//   panels: state.panels.panels,
//   dashboard: state.panels.dashboard,
//   dashboardEnter: state.panels.dashboardEnter,
//   alert: state.frontEndData.visual.alert,
//   alertAnswer: state.frontEndData.visual.alertAnswer,
// })

const mapDispatchToProps = dispatch => ({

  setBackEndReducers: (income) => dispatch(actionsBackEnd.setBackEndReducers(income)),
  setFrontEndReducerColor: (income) => dispatch(actionsColor.setFrontEndReducerColor(income)),
  setFrontEndReducerTab: (income) => dispatch(actionsTab.change(income)),
  setFrontEndReducerModel: (income) => dispatch(actionsModel.change(income)),
  setFrontEndReducerFrame: (income) => dispatch(actionsFrame.setFrontEndReducerFrame(income)),
  setFrontEndReducerIcon: (income) => dispatch(actionsIcon.setFrontEndReducerIcon(income)),
  setFrontEndReducerText: (income) => dispatch(actionsText.setFrontEndReducerText(income)),
  setFrontEndReducerVisual: (income) => dispatch(actionsVisual.setFrontEndReducerVisual(income)),

  resetAllAfterModelChange: (income) => dispatch(actionsModel.resetAllAfterModelChange(income)),
  updatePanels: (income) => dispatch(actionsDashboard.updatePanels(income)),
  showDashboard: (income) => dispatch(actionsDashboard.showDashboard(income)),
  dashboardSmoothEnter: (income) => dispatch(actionsDashboard.dashboardSmoothEnter(income)),
  hideCreator: (income) => dispatch(actionsDashboard.hideCreator(income)),
  changeIndexOfLastPanel: (income) => dispatch(actionsDashboard.changeIndexOfLastPanel(income)),
  showAlert: (income) => dispatch(actionsVisual.showAlert(income)),

})

export default connect(null, mapDispatchToProps)(App)







// import React from 'react';
// // import { Provider } from 'react-redux';
// // import { PersistGate } from 'redux-persist/lib/integration/react';
// import './App.scss';

// import {
//   BrowserView,
//   MobileView,
// } from "react-device-detect";

// // import { persistor, store } from './store';
// import Dashboard from "../../components/Dashboard/Dashboard"
// import MobileComponent from "../../components/MobileComponent/MobileComponent"
// // import LoadingView from '../LoadingView/LoadingView';



// const App = () => {
//   return (
//     <>
//       <BrowserView>
//         {/* <Provider store={store}> */}
//           {/* <PersistGate loading={<LoadingView />} persistor={persistor}> */}
//             <div className="App">
//               <Dashboard />
//             </div>
//           {/* </PersistGate> */}
//         {/* </Provider> */}
//       </BrowserView>
//       <MobileView>
//         <MobileComponent />
//       </MobileView>
//     </>
//   );
// };

// export default App;


