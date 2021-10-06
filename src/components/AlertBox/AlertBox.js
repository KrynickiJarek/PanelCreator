import React from 'react';
import { connect } from "react-redux"
import actionsVisual from "../MainCreator/PanelPreview/duck/actions"
import availableAlerts from "./availableAlerts"
import { t } from "../../i18n";



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
          <div className="alert_box" style={alert === 100 ? { width: "650px" } : { width: "450px" }}>
            <div className="alert_header_box">
              <p className="alert_header">{t("CAUTION")}</p>
            </div>
            <p className="alert_text">{t(availableAlerts.find(element => element.code === alert).text)}</p>
            {alert === 100 &&
              <>
                <ol className="alert_order_list">
                  <li>{t(availableAlerts.find(element => element.code === alert).info1)}</li>
                  <li>{t(availableAlerts.find(element => element.code === alert).info2)}</li>
                  <ul className="alert_unorder_list">
                    <li>{t(availableAlerts.find(element => element.code === alert).info21)}</li>
                  </ul>
                </ol>
              </>
            }
            <div className="alert_button_container">
              {alert < 10 ?
                <>
                  <div className="alert_button_back"
                    onClick={handleRemoveAlert}
                  >
                    <div className="button_arrows_back" />
                    {t("CANCEL")}
                  </div>
                  <div className="alert_button"
                    onClick={() => setAlertAnswer(alert)}
                  >
                    {t("CONFIRM")}
                    <div className="button_arrows" />
                  </div>
                </>
                :
                <>
                  {alert < 20 &&
                    <div className="alert_button_back"
                      onClick={() => removeAlert()}
                    >
                      <div className="button_arrows_back" />
                      {t("BACK")}
                    </div>
                  }
                  {alert === 20 &&
                    <a href="https://ampio.pl/" style={{ textDecoration: "none" }}>
                      <div className="alert_button_back"
                        onClick={() => removeAlert()}
                      >
                        <div className="button_arrows_back" />
                        {t("BACK_TO_AMPIO")}
                      </div>
                    </a>
                  }
                  {alert === 99 &&
                    <div className="alert_button_back"
                      onClick={() => { window.location.reload(); removeAlert() }}
                    >
                      <div className="button_arrows_back" />
                      {t("REFRESH")}
                    </div>
                  }
                  {alert === 100 &&
                    <div className="alert_button"
                      onClick={() => removeAlert()}
                    >
                      <div className="button_arrows" />
                      OK
                    </div>
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
  languageRender: state.frontEndData.visual.languageRender,
})

const mapDispatchToProps = dispatch => ({
  removeAlert: (income) => dispatch(actionsVisual.removeAlert(income)),
  setAlertAnswer: (income) => dispatch(actionsVisual.setAlertAnswer(income)),
  showRemoveIcons: (income) => dispatch(actionsVisual.showRemoveIcons(income)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AlertBox)