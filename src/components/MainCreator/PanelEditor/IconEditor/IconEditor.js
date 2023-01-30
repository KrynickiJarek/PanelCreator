import React, { useState, useEffect } from 'react';
import { connect } from "react-redux"
import actionsVisual from "../../PanelPreview/duck/actions"
import actions from "../../PanelEditor/duck/actions.js"
import actionsIcon from "../../PanelEditor/IconEditor/duck/actions"
import actionsBackEnd from "../../duck/actions"
import "./IconEditor.scss"
import { t } from "../../../../i18n";

import Favorite from "../../../../assets/favorite.svg"
import Own from "../../../../assets/own.svg"
import Status_leds from "../../../../assets/status_leds.svg"
import Keyboards from "../../../../assets/keyboards.svg"
import Locked from "../../../../assets/preview/lock.svg"
import Unlocked from "../../../../assets/preview/unlock.svg"
import noDotUni from "../../../../assets/lcd/noDotUni.svg"

import IconToDrag from './IconToDrag';
import iconCategories from "./iconCategories"
import keyboardsSets from "./keyboardsSets"
import keyboardsSetsLabels from "./keyboardsSetsLabels"

import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'


import keyboardTop from "../../../../assets/keyboards/keyboard_top.svg"
import keyboardMiddle from "../../../../assets/keyboards/keyboard_middle.svg"
import keyboardBottom from "../../../../assets/keyboards/keyboard_bottom.svg"



export const IconEditor = ({
  changeSubtab,
  visual,
  toggleVisual,
  favoriteIcons,
  ownIcons,
  updateOwnIcons,
  panels,
  indexOfLastPanel,
  chosenColor,
  chosenModel,
  showAlert,
  alertAnswer,
  iconHolders,
  changeIconHolders,
  changeIconsBackEnd,
  iconsBackEnd
}) => {
  const [unlock, setUnlock] = useState(false)
  const [loadingIcon, setLoadingIcon] = useState(false)
  const [firstKeyboardIcon, setFirstKeyboardIcon] = useState()
  const [chosenSetNumber, setChosenSetNumber] = useState(null)

  useEffect(() => {
    if (alertAnswer === 300) {
      handleConfirmRecoverDots()
    }
    if (alertAnswer === 301) {
      handleConfirmAddKeyboard()
    }
    // eslint-disable-next-line 
  }, [alertAnswer])


  useEffect(() => {
    if (chosenModel.type === "MDOT_18") {
      setFirstKeyboardIcon(6)
    } else if (chosenModel.type === "MDOT_M18" ||
      chosenModel.type === "MDOT_M18_UNIVERSAL" ||
      chosenModel.type === "M_DOT_R14") {
      setFirstKeyboardIcon(9)
    }
    // eslint-disable-next-line
  }, [chosenModel]);

  let orangeStyle = {
    height: "20px",
    width: "20px",
    borderRadius: "50%",
    backgroundColor: "rgb(236, 105, 92)",
    display: "inline-block",
    transform: "translateY(4px)"
  }

  let greenStyle = {
    height: "20px",
    width: "20px",
    borderRadius: "50%",
    backgroundColor: "rgb(40, 167, 69)",
    display: "inline-block",
    transform: "translateY(4px)"
  }

  if (chosenColor.color.hex === "#30a32c") {
    greenStyle.backgroundColor = "rgb( 32, 114, 30)"
  }


  const onSelectFile = (e) => {
    const fileToUpload = e.target.files[0]
    const fileName = e.target.files[0].name
    if (e.target.files[0].type !== "image/svg+xml") {
      showAlert(11);
    } else if (e.target.files[0].size > 100000) {
      showAlert(12);
    } else {
      setLoadingIcon(true)
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
                    "pixels_width": 28,
                    "pixels_height": 28,
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
                          const image = {
                            default: svgB64
                          }
                          let copyOwnIcons = ownIcons
                          copyOwnIcons.push(image)
                          updateOwnIcons(copyOwnIcons)
                          setLoadingIcon(false)
                        })
                        .catch(error => {
                          setLoadingIcon(false)
                          console.log(error)
                          showAlert(16);
                        })
                    })
                    .catch(error => {
                      setLoadingIcon(false)
                      console.log(error)
                      showAlert(16);
                    })
                })
                .catch(error => {
                  setLoadingIcon(false)
                  console.log(error)
                  showAlert(16);
                })
            })
            .catch(error => {
              setLoadingIcon(false)
              console.log(error)
              showAlert(16);
            })
        })
        .catch(error => {
          setLoadingIcon(false)
          console.log(error)
          showAlert(16);
        })
      document.getElementById("inputUploadIcon").value = null
    }
  };

  const containFavorite = (icon) => {
    return !favoriteIcons.includes(icon)
  }

  const handleClickStatusIcons = (income) => {
    changeSubtab(income)
  }

  const handleClickIcons = () => {
    changeSubtab("default")
  }

  const handleAddKeyboardBackend = (keyboardArrayForBackend, copyIconsBackEnd) => {
    // ----------------------------------------------------------------------------------------------------------------BACKEND---------------------
    keyboardArrayForBackend.forEach(element => {
      const toDataURL = svg => fetch(svg)
        .then(response => response.blob())
        .then(blob => new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.onerror = reject
          reader.readAsDataURL(blob)
        }))

      toDataURL(element.icon)
        .then(svgBackEnd => {
          let recordIcon = {
            number: element.number,
            type: element.type,
            rotation: 0,
            svg: svgBackEnd,
            proportion: 0
          }
          copyIconsBackEnd.push(recordIcon)
        })
    })
    changeIconsBackEnd(copyIconsBackEnd)
  }


  const handleClickAddKeybard = (setNumber) => {
    setChosenSetNumber(setNumber)
    const copyArr = JSON.parse(JSON.stringify(iconHolders))
    let kyeboardKeyNumber = 0
    const keyboardArrayForBackend = []
    const statusLedsCheckArray = []
    const areThereAnyIcons = []
    // let numberWithStatusIcon = null //potrzebne tylko w handleConfirmRecoverDots?

    copyArr.forEach((element, idx) => {
      if (idx >= firstKeyboardIcon && idx < firstKeyboardIcon + 12) {
        if (element?.lastDroppedIcon
          || element?.lastDroppedDot
          || element?.lastDroppedSlashUp
          || element?.lastDroppedSlashDown) {
          areThereAnyIcons.push(idx)
        }
      }
    })

    if (areThereAnyIcons.length && chosenModel.type !== "M_DOT_R14") {
      showAlert(301);
    } else {
      copyArr.forEach((element, idx) => {
        if (element.statusIconExist && (idx < firstKeyboardIcon || idx > firstKeyboardIcon + 11)) {
          statusLedsCheckArray.push(idx)
        }

        // if (statusLedsCheckArray.length === 1 && element.lastDroppedDot && (idx < firstKeyboardIcon || idx > firstKeyboardIcon + 11)) {
        //   numberWithStatusIcon = idx + 1
        // } //potrzebne tylko w handleConfirmRecoverDots?
      })

      const beyondKeyboardArray = []

      copyArr.forEach((element, idx) => {
        if (element.flag && (idx < firstKeyboardIcon || idx > firstKeyboardIcon + 11)) {
          beyondKeyboardArray.push(idx)
        }
      })
      let copyIconsBackEnd = []
      // console.log('keyboardsSets', keyboardsSets[0]?.listOfIcons[kyeboardKeyNumber])
      // console.log('keyboardsSets', keyboardsSets)

      for (let i = firstKeyboardIcon; i < firstKeyboardIcon + 12; i++) {
        keyboardArrayForBackend.push(
          {
            // icon: keyboardsSets[setNumber].listOfIcons[kyeboardKeyNumber].default,
            icon: keyboardsSets[setNumber].listOfIcons[kyeboardKeyNumber],
            number: i + 1,
            type: 0
          },
          {
            icon: noDotUni,
            number: i + 1,
            type: 3
          }
        )
        copyArr[i].lastDroppedIcon = { image: keyboardsSets[setNumber].listOfIcons[kyeboardKeyNumber] }
        copyArr[i].statusIconExist = false;
        copyArr[i].cannotRemoveStatusIcon = false;
        copyArr[i].lastDroppedSlashUp = null;
        copyArr[i].lastDroppedSlashDown = null;
        kyeboardKeyNumber = kyeboardKeyNumber + 1
      }
      if (statusLedsCheckArray.length < 2 && chosenModel.type !== "M_DOT_R14") {
        showAlert(300);
        // copyIconsBackEnd = iconsBackEnd.filter(element => { return !((element.number - 1 < firstKeyboardIcon || element.number - 1 > firstKeyboardIcon + 11) && (element.type === 3) && (element.number !== numberWithStatusIcon)) })
        // beyondKeyboardArray.forEach(element => {
        //   copyArr[element].statusIconExist = true;
        //   copyArr[element].cannotRemoveStatusIcon = false;
        // })
      } else {
        copyIconsBackEnd = iconsBackEnd.filter(element => { return (element.number - 1 < firstKeyboardIcon || element.number - 1 > firstKeyboardIcon + 11) })
        changeIconHolders(copyArr)
        handleAddKeyboardBackend(keyboardArrayForBackend, copyIconsBackEnd)
      }
    }
  }

  const handleConfirmAddKeyboard = () => {
    const copyArr = JSON.parse(JSON.stringify(iconHolders))
    let kyeboardKeyNumber = 0
    const keyboardArrayForBackend = []
    const statusLedsCheckArray = []

    copyArr.forEach((element, idx) => {
      if (element.statusIconExist && (idx < firstKeyboardIcon || idx > firstKeyboardIcon + 11)) {
        statusLedsCheckArray.push(idx)
      }

    })

    const beyondKeyboardArray = []

    copyArr.forEach((element, idx) => {
      if (element.flag && (idx < firstKeyboardIcon || idx > firstKeyboardIcon + 11)) {
        beyondKeyboardArray.push(idx)
      }
    })
    let copyIconsBackEnd = []


    for (let i = firstKeyboardIcon; i < firstKeyboardIcon + 12; i++) {
      keyboardArrayForBackend.push(
        {
          icon: keyboardsSets[chosenSetNumber].listOfIcons[kyeboardKeyNumber].default,
          number: i + 1,
          type: 0
        },
        {
          icon: noDotUni,
          number: i + 1,
          type: 3
        }
      )
      copyArr[i].lastDroppedIcon = { image: keyboardsSets[chosenSetNumber].listOfIcons[kyeboardKeyNumber] }
      copyArr[i].statusIconExist = false;
      copyArr[i].cannotRemoveStatusIcon = false;
      copyArr[i].lastDroppedSlashUp = null;
      copyArr[i].lastDroppedSlashDown = null;
      kyeboardKeyNumber = kyeboardKeyNumber + 1
    }
    if (statusLedsCheckArray.length < 2 && chosenModel.type !== "M_DOT_R14") {
      showAlert(300);
      setChosenSetNumber(chosenSetNumber)
    } else {
      copyIconsBackEnd = iconsBackEnd.filter(element => { return (element.number - 1 < firstKeyboardIcon || element.number - 1 > firstKeyboardIcon + 11) })
      changeIconHolders(copyArr)
      handleAddKeyboardBackend(keyboardArrayForBackend, copyIconsBackEnd)
    }
  }


  const handleConfirmRecoverDots = () => {
    const copyArr = JSON.parse(JSON.stringify(iconHolders))
    let kyeboardKeyNumber = 0
    const keyboardArrayForBackend = []
    const statusLedsCheckArray = []
    let numberWithStatusIcon = null
    copyArr.forEach((element, idx) => {
      if (element.statusIconExist && (idx < firstKeyboardIcon || idx > firstKeyboardIcon + 11)) {
        statusLedsCheckArray.push(idx)
      }

      if (statusLedsCheckArray.length === 1 && element.lastDroppedDot && (idx < firstKeyboardIcon || idx > firstKeyboardIcon + 11)) {
        numberWithStatusIcon = idx + 1
      }
    })

    const beyondKeyboardArray = []

    copyArr.forEach((element, idx) => {
      if (element.flag && (idx < firstKeyboardIcon || idx > firstKeyboardIcon + 11)) {
        beyondKeyboardArray.push(idx)
      }
    })
    let copyIconsBackEnd = []


    for (let i = firstKeyboardIcon; i < firstKeyboardIcon + 12; i++) {
      keyboardArrayForBackend.push(
        {
          icon: keyboardsSets[chosenSetNumber]?.listOfIcons[kyeboardKeyNumber].default,
          number: i + 1,
          type: 0
        },
        {
          icon: noDotUni,
          number: i + 1,
          type: 3
        }
      )
      copyArr[i].lastDroppedIcon = { image: keyboardsSets[chosenSetNumber]?.listOfIcons[kyeboardKeyNumber] }
      copyArr[i].statusIconExist = false;
      copyArr[i].cannotRemoveStatusIcon = false;
      copyArr[i].lastDroppedSlashUp = null;
      copyArr[i].lastDroppedSlashDown = null;
      kyeboardKeyNumber = kyeboardKeyNumber + 1
    }

    copyIconsBackEnd = iconsBackEnd.filter(element => { return !((element.number - 1 < firstKeyboardIcon || element.number - 1 > firstKeyboardIcon + 11) && (element.type === 3) && (element.number !== numberWithStatusIcon)) })
    beyondKeyboardArray.forEach(element => {
      copyArr[element].statusIconExist = true;
      copyArr[element].cannotRemoveStatusIcon = false;
    })
    setChosenSetNumber(null)
    changeIconHolders(copyArr)
    handleAddKeyboardBackend(keyboardArrayForBackend, copyIconsBackEnd)
  }


  const handleHoverAddKeybard = () => {
    const copyArr = iconHolders
    copyArr.forEach((el, index) => {
      el.selectedDot = false;
      el.selected = false;
      el.selectedUp = false;
      el.selectedDown = false;
    })
    for (let i = firstKeyboardIcon; i < firstKeyboardIcon + 12; i++) {
      copyArr[i].highlightedForKeyboard = true
    }
    changeIconHolders(copyArr)
  }

  const handleStopHoverAddKeybard = () => {
    const copyArr = iconHolders
    copyArr.forEach((el, index) => {
      copyArr[index].highlightedForKeyboard = false
    })
    changeIconHolders(copyArr)
  }


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
      <div className="icon_container">
        <h2 className="icon_header">{t("ICONS")}</h2>
        <div className="icon_content">
          <Tab.Container defaultActiveKey="ulubione" mountOnEnter>
            <div className="nav_col">
              <Nav variant="pills" className="flex-column">
                <Nav.Link eventKey="ulubione"
                  onClick={handleClickIcons}
                >
                  <img src={Favorite} alt="own" className="favorite_nav" />
                  {t("FAVOURITE")}
                </Nav.Link>
                <Nav.Link eventKey="własne"
                  onClick={handleClickIcons}
                >
                  <img src={Own} alt="own" className="favorite_nav" />
                  {t("CUSTOM")}
                </Nav.Link>
                <Nav.Link eventKey="diody" onClick={() => handleClickStatusIcons("status_icons")}>
                  <img src={Status_leds} alt="status leds" className="favorite_nav" />
                  {t("STATUS_LEDS")}
                </Nav.Link>
                <Nav.Link eventKey="klawiatury" onClick={() => handleClickStatusIcons("keyboards")}>
                  <img src={Keyboards} alt="keybords" className="favorite_nav" />
                  {t("KEYBOARDS")}
                </Nav.Link>
                {iconCategories.map((el, i) => (
                  <Nav.Link key={i} eventKey={el.name}
                    onClick={handleClickIcons}
                  >{t(el.name)}</Nav.Link>
                ))}
              </Nav>
            </div>
            <div className="content_col">
              <Tab.Content>
                <Tab.Pane eventKey="ulubione">
                  <div className="icons">
                    <div className="instruction_box">
                      <p className="instruction_bold">{t("FAVOURITE_ICONS_INSTRUCTION_BOLD_1")}<span style={{ ...greenStyle }} />.
                        {t("FAVOURITE_ICONS_INSTRUCTION_BOLD_2")}
                        <span style={{ ...orangeStyle }} />.</p>
                      <p className="instruction">{t("FAVOURITE_ICONS_INSTRUCTION_NORMAL_1")}</p>

                      {favoriteIcons.length === 0 &&
                        <p className="instruction" style={{ margin: "28px" }}>({t("FAVOURITE_ICONS_INSTRUCTION_NORMAL_2")}
                          <img src={Favorite} alt="favorite" className="favorite_instruction" />)
                        </p>
                      }
                    </div>
                    {favoriteIcons.length !== 0 &&
                      <>
                        {
                          favoriteIcons.map((image, index) =>
                            <IconToDrag key={index} image={image} isInFavorite={true} />)
                        }
                      </>
                    }

                    <div className="instruction_box">
                      <p className="instruction_bold" style={{ marginTop: "20px" }}>{t("FAVOURITE_ICONS_INSTRUCTION_BOLD_3")}</p>

                      {panels.length === 0 || (panels.length === 1 && indexOfLastPanel !== -1) ?
                        <p className="instruction" style={{ marginTop: "0", marginBottom: "5px", fontSize: "12px" }}>{t("NO_OTHER_PROJECTS")}</p>
                        :
                        <>
                          <p className="instruction">{t("FAVOURITE_ICONS_INSTRUCTION_NORMAL_3")}</p>
                          {panels.map((panel, index) =>
                            <div key={index}>
                              {indexOfLastPanel !== index &&
                                <>
                                  <p className="instruction_bold" style={{ marginLeft: "20px", marginBottom: "5px" }}> {'\u2022'} {panel.backEndData.panelName} :</p>
                                  {panel.frontEndData.icon.favoriteIcons.length === 0 &&
                                    <p className="instruction" style={{ marginTop: "0", marginBottom: "5px", fontSize: "12px" }}>{t("NO_FAVOURITE_ICONS")}</p>
                                  }
                                  {panel.frontEndData.icon.favoriteIcons.length !== 0 && panel.frontEndData.icon.favoriteIcons.filter(containFavorite).length === 0 &&
                                    <p className="instruction" style={{ marginTop: "0", marginBottom: "5px", fontSize: "12px" }}>{t("NO_OTHER_FAVOURITE_ICONS")}</p>
                                  }

                                  {!(panel.frontEndData.icon.favoriteIcons.length === 0 && panel.frontEndData.icon.favoriteIcons.filter(containFavorite).length === 0) &&
                                    <div className="icons">
                                      {panel.frontEndData.icon.favoriteIcons.map((image, index) =>
                                        <IconToDrag key={index} image={image} isInOtherFavorite={true} />
                                      )}
                                    </div>
                                  }
                                </>
                              }
                            </div>
                          )}
                        </>
                      }
                    </div>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="własne">
                  <div className="icons">
                    <div className="instruction_box">

                      <p className="instruction_bold">{t("CUSTOM_ICONS_INSTRUCTION_BOLD_1")}</p>
                      <p className="instruction">{t("CUSTOM_ICONS_INSTRUCTION_NORMAL_1")}</p>
                      <label htmlFor="inputUploadIcon" >
                        <div className="select_button">
                          {t("SELECT_FILE")}
                          <div className="button_arrows" />
                        </div>
                      </label>
                      <input type="file" id="inputUploadIcon" style={{ display: "none" }} onChange={onSelectFile} />
                    </div>

                    {ownIcons.map((image, index) =>
                      <IconToDrag key={index} image={image} isInOwn={true} ownIconIndex={index} />)}

                    {loadingIcon &&
                      <div className="icon_box">
                        <div className="icon_drag">
                          <div class="lds-dual-ring" />
                        </div>
                      </div>
                    }

                    <div className="instruction_box">
                      <p className="instruction_bold" style={{ marginTop: "20px" }}>{t("CUSTOM_ICONS_INSTRUCTION_BOLD_2")}</p>

                      {panels.length === 0 || (panels.length === 1 && indexOfLastPanel !== -1) ?
                        <p className="instruction" style={{ marginTop: "0", marginBottom: "5px", fontSize: "12px" }}>{t("NO_OTHER_PROJECTS")}</p>
                        :
                        <>
                          <p className="instruction" >{t("CUSTOM_ICONS_INSTRUCTION_NORMAL_2")}</p>
                          {panels.map((panel, index) =>
                            <div key={index}>
                              {indexOfLastPanel !== index &&
                                <>
                                  <p className="instruction_bold" style={{ marginLeft: "20px", marginBottom: "5px" }}> {'\u2022'} {panel.backEndData.panelName} :</p>

                                  {panel.frontEndData.icon.ownIcons.length === 0 ?
                                    <p className="instruction" style={{ marginTop: "0", marginBottom: "5px", fontSize: "12px" }}>{t("NO_CUSTOM_ICONS")}</p>
                                    :
                                    <div className="icons">
                                      {panel.frontEndData.icon.ownIcons.map((image, index) =>
                                        <IconToDrag key={index} image={image} isInOtherOwn={true} />)}
                                    </div>
                                  }
                                </>
                              }
                            </div>
                          )}
                        </>
                      }
                    </div>

                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="diody">
                  <div className="icons">
                    <div className="instruction_box">
                      {(chosenModel.type === "MDOT_2" || chosenModel.type === "M_DOT_R14") ?
                        <>
                          <p className="instruction_bold">{t("STATUS_ICONS_INSTRUCTION_BOLD_3")}</p>
                          <p className="instruction">
                            {t("STATUS_ICONS_INSTRUCTION_NORMAL_6")}</p>
                        </>
                        :
                        <>
                          <p className="instruction_bold">{chosenModel.type === "MDOT_M18_UNIVERSAL" ? t("STATUS_ICONS_INSTRUCTION_BOLD_2") : t("STATUS_ICONS_INSTRUCTION_BOLD_1")}</p>
                          <p className="instruction">{t("STATUS_ICONS_INSTRUCTION_NORMAL_1")}
                            <span style={{ ...greenStyle }} />.
                            {t("STATUS_ICONS_INSTRUCTION_NORMAL_2")}</p>
                          <p className="instruction">{t("STATUS_ICONS_INSTRUCTION_NORMAL_3")}<span style={{ ...orangeStyle }} />.
                            {t("STATUS_ICONS_INSTRUCTION_NORMAL_4")}</p>
                          {chosenModel.type !== "MDOT_M18_UNIVERSAL" &&
                            <p className="instruction">
                              {t("STATUS_ICONS_INSTRUCTION_NORMAL_5")}</p>}
                        </>
                      }
                    </div>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="klawiatury">
                  <div className="icons">
                    <div className="instruction_box">
                      {chosenModel.type !== "MDOT_18" &&
                        chosenModel.type !== "MDOT_M18" &&
                        chosenModel.type !== "MDOT_M18_UNIVERSAL" &&
                        chosenModel.type !== "M_DOT_R14" &&
                        <>
                          <p className="instruction_bold">{t("KEYBOARD_INSTRUCTION_BOLD_1")}</p>
                          <p className="instruction">{t("KEYBOARD_INSTRUCTION_NORMAL_1")}</p>
                          <ol className="models_no_keyboard_list" >
                            <li key={"models_no_keyboard_list1"} className="models_no_keyboard_list_element">{t("MDOT_18")}</li>
                            <li key={"models_no_keyboard_list2"} className="models_no_keyboard_list_element">{t("MDOT_M18")}</li>
                            <li key={"models_no_keyboard_list3"} className="models_no_keyboard_list_element">{t("MDOT_M18_UNIVERSAL")}</li>
                            <li key={"models_no_keyboard_list4"} className="models_no_keyboard_list_element">{t("M_DOT_R14")}</li>
                          </ol>
                        </>
                      }
                      {chosenModel.type === "MDOT_18" &&
                        <>
                          <p className="instruction_bold">{t("KEYBOARD_INSTRUCTION_BOLD_2")}</p>
                          <div className="keyboard_box">
                            <div className="keyboard_link" style={firstKeyboardIcon === 6 ? { border: "3px solid #EC695C" } : {}}
                              onClick={() => setFirstKeyboardIcon(6)} >
                              <img src={keyboardBottom} alt="keyboard_bottom" className="keyboard_img" />
                              < p className="keyboard_name" style={firstKeyboardIcon === 6 ? { fontWeight: "700" } : {}}>{t("KEYBOARD_BOTTOM")}</p>
                            </div>

                            <div className="keyboard_link" style={firstKeyboardIcon === 3 ? { border: "3px solid #EC695C" } : {}}
                              onClick={() => setFirstKeyboardIcon(3)} >
                              <img src={keyboardMiddle} alt="keyboard_middle" className="keyboard_img" />
                              < p className="keyboard_name" style={firstKeyboardIcon === 3 ? { fontWeight: "700" } : {}}>{t("KEYBOARD_MIDDLE")}</p>
                            </div>

                            <div className="keyboard_link" style={firstKeyboardIcon === 0 ? { border: "3px solid #EC695C" } : {}}
                              onClick={() => setFirstKeyboardIcon(0)} >
                              <img src={keyboardTop} alt="keyboard_top" className="keyboard_img" />
                              < p className="keyboard_name" style={firstKeyboardIcon === 0 ? { fontWeight: "700" } : {}}>{t("KEYBOARD_TOP")}</p>
                            </div>
                          </div>

                        </>
                      }
                      {(chosenModel.type === "MDOT_18" ||
                        chosenModel.type === "MDOT_M18" ||
                        chosenModel.type === "MDOT_M18_UNIVERSAL" ||
                        chosenModel.type === "M_DOT_R14") &&
                        <>
                          <p className="instruction_bold">{t("KEYBOARD_INSTRUCTION_BOLD_3")}</p>
                          <p className="instruction">{t("KEYBOARD_INSTRUCTION_NORMAL_2")}<span style={{ ...greenStyle }} />
                            {t("KEYBOARD_INSTRUCTION_NORMAL_3")}</p>

                          <p className="instruction">{t("KEYBOARD_INSTRUCTION_NORMAL_4")}</p>

                          <div className="keyboard_box">
                            {keyboardsSets.map((el, i) => (
                              <div className="keyboard_set_link"
                                onClick={() => handleClickAddKeybard(i)}
                                onMouseOver={handleHoverAddKeybard}
                                onMouseLeave={handleStopHoverAddKeybard}
                                key={i}
                              >
                                <img
                                  src={keyboardsSetsLabels[0]?.listOfLabels[i]?.default}
                                  alt="keyboard_set" className="keyboard_set" />
                                < p className="keyboard_set_name">{t("KEYBOARD_SET")} {i + 1}</p>
                              </div>
                            ))}
                          </div>
                        </>
                      }
                    </div>
                  </div>
                </Tab.Pane>
                {iconCategories.map((el, i) => (
                  <Tab.Pane eventKey={el.name} key={i}>
                    <div className="icons">
                      {el.name === "SIGNS" &&
                        <div className="instruction_box">
                          <p className="instruction">{t("SIGN_ICONS_INSTRUCTION")}</p>
                        </div>
                      }

                      {
                        el.listOfIcons.map(
                          (image, index) => <IconToDrag key={index} image={image} isInFavorite={false} />
                        )
                      }
                    </div>
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </div>
          </Tab.Container>
        </div>
      </div >
    </div >

  );
}

const mapStateToProps = state => ({
  chosenColor: state.frontEndData.color,
  chosenModel: state.frontEndData.model.chosenModel,
  visual: state.frontEndData.visual.visual,
  alertAnswer: state.frontEndData.visual.alertAnswer,
  favoriteIcons: state.frontEndData.icon.favoriteIcons,
  ownIcons: state.frontEndData.icon.ownIcons,
  favoriteIconsRender: state.frontEndData.icon.favoriteIconsRender,
  ownIconsRender: state.frontEndData.icon.ownIconsRender,

  panels: state.panels.panels,
  indexOfLastPanel: state.panels.indexOfLastPanel,
  languageRender: state.frontEndData.visual.languageRender,

  iconHolders: state.frontEndData.icon.iconHolders,
  iconsBackEnd: state.backEndData.icons,


})

const mapDispatchToProps = dispatch => ({
  changeSubtab: tab => dispatch(actions.changeSubtab(tab)),
  toggleVisual: (income) => dispatch(actionsVisual.toggleVisual(income)),
  showAlert: (income) => dispatch(actionsVisual.showAlert(income)),
  updateOwnIcons: (income) => dispatch(actions.updateOwnIcons(income)),
  changeIconHolders: (income) => dispatch(actionsIcon.changeIconHolders(income)),
  changeIconsBackEnd: (income) => dispatch(actionsBackEnd.changeIcons(income)),
})

export default connect(mapStateToProps, mapDispatchToProps)(IconEditor)

