import React, { useState } from 'react';
import { connect } from "react-redux"
import actions from "./duck/actions"
import actionsVisual from "../../PanelPreview/duck/actions"
import actionsIcon from "../../PanelEditor/IconEditor/duck/actions"

import "./TextEditor.scss"
import { t } from "../../../../i18n";

import Locked from "../../../../assets/preview/lock.svg"
import Unlocked from "../../../../assets/preview/unlock.svg"

import RfidDefault from "../../../../assets/rfid/rfid_default.svg"
import RfidLogo from "../../../../assets/rfid/rfid_logo.svg"
import RfidTekst from "../../../../assets/rfid/rfid_tekst.svg"

const TextEditor = ({ chosenTextFont,
  changeTextWeight,
  changeTextFont,
  chosenTextWeight,
  visual,
  toggleVisual,
  chosenModel,



  showAlert,
  ownLogo,
  updateOwnLogo,
  rfidType,
  setRfidType


}) => {

  const [unlock, setUnlock] = useState(false)
  // eslint-disable-next-line

  const onSelectFile = (e) => {
    const fileToUpload = e.target.files[0]
    const fileName = e.target.files[0].name
    if (e.target.files[0].type !== "image/svg+xml") {
      showAlert(11);
    } else if (e.target.files[0].size > 100000) {
      showAlert(12);
    } else {
      const data = { public_key: "project_public_13a58c660ab0dec8d9d1244523fba194_JKpK5260dfc02c0b59b34f4fd247d31dcddcf" }

      fetch("https://api.ilovepdf.com/v1/auth", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*",
        }
      })
        .then(response => response.json())
        .then(json => {
          const token = json.token
          fetch("https://api.iloveimg.com/v1/start/resizeimage", {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })
            .then(response => response.json())
            .then(json => {
              const uploadServer = `https://${json.server}/v1/upload`
              const processServer = `https://${json.server}/v1/process`
              const downloadServer = `https://${json.server}/v1/download/${json.task}`
              const task = json.task
              const formData = new FormData();
              formData.append('task', task);
              formData.append('file', fileToUpload);

              fetch(uploadServer, {
                method: "POST",
                body: formData,
                headers: {
                  "Authorization": `Bearer ${token}`
                }
              })
                .then(response => response.json())
                .then(json => {
                  const serverFileName = json.server_filename
                  const dataToProcess = {
                    "task": task,
                    "tool": "resizeimage",
                    "pixels_width": 40,
                    "pixels_height": 20,
                    "files": [
                      {
                        "server_filename": serverFileName,
                        "filename": fileName
                      }
                    ]
                  }
                  fetch(processServer, {
                    method: "POST",
                    body: JSON.stringify(dataToProcess),
                    headers: {
                      "Authorization": `Bearer ${token}`,
                      "Content-Type": "application/json"
                    }
                  })
                    .then(response => {
                      fetch(downloadServer, {
                        method: "GET",
                        headers: {
                          "Authorization": `Bearer ${token}`,
                        }
                      })
                        .then(response => response.text())
                        .then(function (svgDisplay) {
                          var svgB64 = 'data:image/svg+xml;base64,' + btoa(svgDisplay);
                          updateOwnLogo(svgB64)
                        })
                        .catch(error => {
                          console.log(error)
                          showAlert(16);
                        })
                    })
                    .catch(error => {
                      console.log(error)
                      showAlert(16);
                    })
                })
                .catch(error => {
                  console.log(error)
                  showAlert(16);
                })
            })
            .catch(error => {
              console.log(error)
              showAlert(16);
            })
        })
        .catch(error => {
          console.log(error)
          showAlert(16);
        })
      document.getElementById("inputUploadIcon").value = null
    }
  };





  return (
    <div className="scroll_container">
      <div className="visual_background" style={(visual && chosenModel.type !== "MDOT_M6+_UNIVERSAL") ? { opacity: "1", zIndex: "999" } : { opacity: "0", zIndex: "-1" }}>
        <div className="visual_container">
          <div className="visual_info_box">
            {unlock ?
              <img src={Unlocked} alt="unlocked" className="visual_image" />
              :
              <img src={Locked} alt="locked" className="visual_image" />
            }
            <h2 className="visual_info">{t("NOT_AVALIBLE_IN_VISUALIZATION_MODE")}</h2>
          </div>
          <div className="visual_button"
            onClick={() => toggleVisual(!visual)}
            onMouseOver={() => setUnlock(true)}
            onMouseLeave={() => setUnlock(false)}
          >
            {t("EDIT_MODE")}
            <div className="button_arrows" />
          </div>
        </div>
      </div>
      <div className="visual_background" style={chosenModel.type === "MDOT_M6+_UNIVERSAL" ? { opacity: "1", zIndex: "999" } : { opacity: "0", zIndex: "-1" }}>
        <div className="visual_container">
          <div className="visual_info_box">
            <img src={Locked} alt="locked" className="visual_image" />
            <h2 className="visual_info">{t("NOT_AVALIBLE_IN_SELECTED_MODEL")}</h2>
          </div>
        </div>
      </div>

      <div className="text_container">
        {chosenModel.type === "M_DOT_R14" &&
          <div className="rfidContainer">

            <h2 className="text_header">{t("RFID_READER")}</h2>
            <div className="text_content">
              <div className="instruction_box">
                <>
                  <p className="instruction_bold">{t("RFID_INSTRUCTION_NORMAL_1")}</p>
                  <div className="rfid_box">
                    <div className="rfid_type_link" style={rfidType === 0 ? { border: "3px solid #EC695C" } : {}}
                      onClick={() => setRfidType(0)} >
                      <img src={RfidDefault} alt="rfid_default" className="rfid_type_img" />
                      < p className="rfid_name" style={rfidType === 0 ? { fontWeight: "700" } : {}}>{t("RFID_LOGO")}</p>
                    </div>

                    <div className="rfid_type_link" style={rfidType === 1 ? { border: "3px solid #EC695C" } : {}}
                      onClick={() => setRfidType(1)} >
                      <img src={RfidLogo} alt="rfid_logo" className="rfid_type_img" />
                      < p className="rfid_name" style={rfidType === 1 ? { fontWeight: "700" } : {}}>{t("OWN_LOGO")}</p>
                    </div>

                    <div className="rfid_type_link" style={rfidType === 2 ? { border: "3px solid #EC695C" } : {}}
                      onClick={() => setRfidType(2)} >
                      <img src={RfidTekst} alt="rfid_tekst" className="rfid_type_img" />
                      < p className="rfid_name" style={rfidType === 2 ? { fontWeight: "700" } : {}}>{t("RFID_TEXT")}</p>
                    </div>
                  </div>
                </>





                {rfidType === 1 &&
                  <>
                    <p className="instruction_bold">{t("OWN_LOGO_INSTRUCTION_BOLD_1")}</p>
                    <p className="instruction">{t("OWN_LOGO_INSTRUCTION_NORMAL_1")}</p>
                    <p className="instruction">{t("OWN_LOGO_INSTRUCTION_NORMAL_2")}</p>
                    <label htmlFor="inputUploadIcon" className="rfid_logo_input_button">
                      <div className="select_button">
                        {ownLogo ? t("REPLACE") : t("SELECT_FILE")}
                        <div className="button_arrows" />
                      </div>
                    </label>
                    <input type="file" id="inputUploadIcon" style={{ display: "none" }} onChange={onSelectFile} />
                    {/* 
                    // tutaj ewenntualnie dodąć podgląd 
                    
                    {ownLogo && < img src={ownLogo} alt="rfid" className="rfid_icon"
                    // style={{
                    //   ...universalIconStyle,
                    //   ...rfidIconStyle,
                    //   ...ownLogoStyle,
                    //   top: "50%"
                    // }}
                    />
                    } */}



                  </>}






                {rfidType === 2 &&
                  <>
                    <p className="instruction_bold">{t("RFID_FONT_INSTRUCTION_BOLD")}</p>
                    <p className="instruction">{t("RFID_FONT_INSTRUCTION_NORMAL")}</p>
                  </>
                }
              </div>
            </div>


          </div>
        }



        <h2 className="text_header">{t("TITLE_HEADER")}</h2>
        <div className="textContainer">
          <p className="instruction_bold">{t("TITLE_INSTRUCTION_BOLD")}</p>
          <p className="instruction">{t("TITLE_INSTRUCTION_NORMAL")}</p>
        </div>


        <h2 className="text_header">{t("FONT_HEADER")}</h2>
        <div className="text_content">
          <p className="instruction_bold">{t("FONT_INSTRUCTION_BOLD")}</p>


          <div className="font_link" style={chosenTextFont === "Calibri-bold" && chosenTextWeight === "700" ? { border: "3px solid #EC695C", fontFamily: "Calibri-bold", fontWeight: "700" }
            : { fontFamily: "Calibri-bold", fontWeight: "700" }}
            onClick={() => { changeTextFont("Calibri-bold"); changeTextWeight("700") }} >
            {chosenTextFont === "Calibri-bold" && chosenTextWeight === "700" && <div className="font_chosen" />}
            < p className="font_name" style={{ fontSize: "20px" }}>Calibri bold</p>
            < p className="font_example" style={{ fontSize: "14px" }}>{t("SAMPLE_TEXT")}Calibri bold</p>
          </div>

          <div className="font_link" style={chosenTextFont === "Calibri" && chosenTextWeight === "400" ? { border: "3px solid #EC695C", fontFamily: "Calibri", fontWeight: "400" }
            : { fontFamily: "Calibri", fontWeight: "400" }}
            onClick={() => { changeTextFont("Calibri"); changeTextWeight("400") }} >
            {chosenTextFont === "Calibri" && chosenTextWeight === "400" && <div className="font_chosen" />}
            < p className="font_name" style={{ fontSize: "20px" }}>Calibri</p>
            < p className="font_example" style={{ fontSize: "14px" }}>{t("SAMPLE_TEXT")}Calibri</p>
          </div>

          <div className="font_link" style={chosenTextFont === "Montserrat" && chosenTextWeight === "700" ? { border: "3px solid #EC695C", fontFamily: "Montserrat", fontWeight: "700" }
            : { fontFamily: "Montserrat", fontWeight: "700" }}
            onClick={() => { changeTextFont("Montserrat"); changeTextWeight("700") }} >
            {chosenTextFont === "Montserrat" && chosenTextWeight === "700" && <div className="font_chosen" />}
            < p className="font_name" style={{ fontSize: "20px" }}>Montserrat bold</p>
            < p className="font_example" style={{ fontSize: "14px" }}>{t("SAMPLE_TEXT")}Montserrat bold</p>
          </div>

          <div className="font_link" style={chosenTextFont === "Montserrat" && chosenTextWeight === "400" ? { border: "3px solid #EC695C", fontFamily: "Montserrat", fontWeight: "400" }
            : { fontFamily: "Montserrat", fontWeight: "400" }}
            onClick={() => { changeTextFont("Montserrat"); changeTextWeight("400") }} >
            {chosenTextFont === "Montserrat" && chosenTextWeight === "400" && <div className="font_chosen" />}

            < p className="font_name" style={{ fontSize: "20px" }}>Montserrat</p>
            < p className="font_example" style={{ fontSize: "14px" }}>{t("SAMPLE_TEXT")}Montserrat</p>
          </div>

          <div className="font_link" style={chosenTextFont === "Poppins" && chosenTextWeight === "700" ? { border: "3px solid #EC695C", fontFamily: "Poppins", fontWeight: "700" }
            : { fontFamily: "Poppins", fontWeight: "700" }}
            onClick={() => { changeTextFont("Poppins"); changeTextWeight("700") }} >
            {chosenTextFont === "Poppins" && chosenTextWeight === "700" && <div className="font_chosen" />}
            < p className="font_name" style={{ fontSize: "20px" }}>Poppins bold</p>
            < p className="font_example" style={{ fontSize: "14px" }}>{t("SAMPLE_TEXT")}Poppins bold</p>
          </div>

          <div className="font_link" style={chosenTextFont === "Poppins" && chosenTextWeight === "400" ? { border: "3px solid #EC695C", fontFamily: "Poppins", fontWeight: "400" }
            : { fontFamily: "Poppins", fontWeight: "400" }}
            onClick={() => { changeTextFont("Poppins"); changeTextWeight("400") }} >
            {chosenTextFont === "Poppins" && chosenTextWeight === "400" && <div className="font_chosen" />}
            < p className="font_name" style={{ fontSize: "20px" }}>Poppins</p>
            < p className="font_example" style={{ fontSize: "14px" }}>{t("SAMPLE_TEXT")}Poppins</p>
          </div>

          <div className="font_link" style={chosenTextFont === "Roboto" && chosenTextWeight === "700" ? { border: "3px solid #EC695C", fontFamily: "Roboto", fontWeight: "700" }
            : { fontFamily: "Roboto", fontWeight: "700" }}
            onClick={() => { changeTextFont("Roboto"); changeTextWeight("700") }} >
            {chosenTextFont === "Roboto" && chosenTextWeight === "700" && <div className="font_chosen" />}
            < p className="font_name" style={{ fontSize: "20px" }}>Roboto bold</p>
            < p className="font_example" style={{ fontSize: "14px" }}>{t("SAMPLE_TEXT")}Roboto bold</p>
          </div>

          <div className="font_link" style={chosenTextFont === "Roboto" && chosenTextWeight === "400" ? { border: "3px solid #EC695C", fontFamily: "Roboto", fontWeight: "400" }
            : { fontFamily: "Roboto", fontWeight: "400" }}
            onClick={() => { changeTextFont("Roboto"); changeTextWeight("400") }} >
            {chosenTextFont === "Roboto" && chosenTextWeight === "400" && <div className="font_chosen" />}
            < p className="font_name" style={{ fontSize: "20px" }}>Roboto</p>
            < p className="font_example" style={{ fontSize: "14px" }}>{t("SAMPLE_TEXT")}Roboto</p>
          </div>

          <div className="font_link" style={chosenTextFont === "Rubik" && chosenTextWeight === "700" ? { border: "3px solid #EC695C", fontFamily: "Rubik", fontWeight: "700" }
            : { fontFamily: "Rubik", fontWeight: "700" }}
            onClick={() => { changeTextFont("Rubik"); changeTextWeight("700") }} >
            {chosenTextFont === "Rubik" && chosenTextWeight === "700" && <div className="font_chosen" />}
            < p className="font_name" style={{ fontSize: "20px" }}>Rubik bold</p>
            < p className="font_example" style={{ fontSize: "14px" }}>{t("SAMPLE_TEXT")}Rubik bold</p>
          </div>

          <div className="font_link" style={chosenTextFont === "Rubik" && chosenTextWeight === "400" ? { border: "3px solid #EC695C", fontFamily: "Rubik", fontWeight: "400" }
            : { fontFamily: "Rubik", fontWeight: "400" }}
            onClick={() => { changeTextFont("Rubik"); changeTextWeight("400") }} >
            {chosenTextFont === "Rubik" && chosenTextWeight === "400" && <div className="font_chosen" />}
            < p className="font_name" style={{ fontSize: "20px" }}>Rubik</p>
            < p className="font_example" style={{ fontSize: "14px" }}>{t("SAMPLE_TEXT")}Rubik</p>
          </div>

        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  visual: state.frontEndData.visual.visual,
  chosenTextFont: state.frontEndData.text.chosenTextFont,
  chosenTextWeight: state.frontEndData.text.chosenTextWeight,
  languageRender: state.frontEndData.visual.languageRender,
  chosenModel: state.frontEndData.model.chosenModel,
  ownLogo: state.frontEndData.icon.ownLogo,
  rfidType: state.frontEndData.icon.rfidType,

})

const mapDispatchToProps = dispatch => ({
  toggleVisual: (income) => dispatch(actionsVisual.toggleVisual(income)),
  changeTextFont: font => dispatch(actions.changeTextFont(font)),
  changeTextWeight: weight => dispatch(actions.changeTextWeight(weight)),
  showAlert: (income) => dispatch(actionsVisual.showAlert(income)),
  updateOwnLogo: (income) => dispatch(actionsIcon.updateOwnLogo(income)),
  setRfidType: (income) => dispatch(actionsIcon.setRfidType(income)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TextEditor)