import React from 'react';
import { connect } from "react-redux"
import actionsVisual from "../MainCreator/PanelPreview/duck/actions"
import availableAlerts from "./availableAlerts"



import "./AlertBox.scss"

const AlertBox = ({ alert, removeAlert, setAlertAnswer, showRemoveIcons }) => {

  const handleRemoveAlert = () => {
    if (alert !== 4) {
      removeAlert()
    } else {
      removeAlert()
      showRemoveIcons(false)
    }
  }

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
              {alert < 5 ?
                <>
                  <div className="alert_button_back"
                    onClick={handleRemoveAlert}
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
                <>
                  {alert !== 8 &&
                    <div className="alert_button_back"
                      onClick={() => removeAlert()}
                    >
                      <div className="button_arrows_back" />
                      Powrót
                    </div>
                  }
                  {alert === 8 &&
                    <a href="https://ampio.pl/" style={{ textDecoration: "none" }}>
                      <div className="alert_button_back"
                        onClick={() => removeAlert()}
                      >
                        <div className="button_arrows_back" />
                        Wróć do strony Ampio.pl
                      </div>
                    </a>
                  }
                </>
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
  showRemoveIcons: (income) => dispatch(actionsVisual.showRemoveIcons(income)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AlertBox)