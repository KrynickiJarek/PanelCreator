import React from 'react';
import { connect } from "react-redux"
import actionsVisual from "../MainCreator/PanelPreview/duck/actions"
import availableAlerts from "./availableAlerts"



import "./AlertBox.scss"

const AlertBox = ({ alert, removeAlert, setAlertAnswer }) => {



  return (

    <>
      {alert &&
        <div className="alert_container">
          <div className="alert_box">
            <div className="alert_header_box">
              <p className="alert_header">UWAGA!</p>
            </div>
            <p className="alert_text">{availableAlerts.find(element => element.code === alert).text}</p>
            <div className="alert_button_container">
              {alert < 4 ?
                <>
                  <div className="alert_button_back"
                    onClick={() => removeAlert()}
                  >
                    <div className="button_arrows_back" />
                    Anuluj
                  </div>
                  <div className="alert_button"
                    onClick={() => setAlertAnswer(alert)}
                  >
                    Zatwierdź
                    <div className="button_arrows" />
                  </div>
                </>
                :
                <div className="alert_button_back"
                  onClick={() => removeAlert()}
                >
                  <div className="button_arrows_back" />
                  Powrót
                </div>
              }
            </div>
          </div>
        </div>

      }

    </>


  );
};

const mapStateToProps = state => ({
  alert: state.frontEndData.visual.alert,
})

const mapDispatchToProps = dispatch => ({
  removeAlert: (income) => dispatch(actionsVisual.removeAlert(income)),
  setAlertAnswer: (income) => dispatch(actionsVisual.setAlertAnswer(income)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AlertBox)