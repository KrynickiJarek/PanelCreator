import { useState, useEffect, useRef } from 'react';
import { connect } from "react-redux"
import { saveAs } from 'file-saver';
import Warning from './Warning/Warning';
import actionsFrame from "../PanelEditor/FrameEditor/duck/actions"
import actionsVisual from "../PanelPreview/duck/actions"
import actionsIcon from "../PanelEditor/IconEditor/duck/actions"
import actionsColor from "../PanelEditor/ColorEditor/duck/actions"
import actionsModel from "../PanelEditor/ModelChooser/duck/actions"
import actionsText from "../PanelEditor/TextEditor/duck/actions"
import actionsTab from "../PanelEditor/duck/actions"
import actionsBackEnd from "../duck/actions"
import actionsDashboard from "../../Dashboard/duck/actions"
import { t } from "../../../i18n";
import availableModels from "../PanelEditor/ModelChooser/availableModels"

import moment from 'moment';

import "./PanelPreview.scss"

import Overlay from 'react-bootstrap/Overlay'
import ReactTooltip from "react-tooltip";


import LogoPure from "../../../assets/preview/logopure.svg"

import Resize from "../../../assets/scale/resize.svg"
import Fullscreen from "../../../assets/scale/fullscreen.svg"
import Zoomin from "../../../assets/scale/zoomin.svg"
import Zoomout from "../../../assets/scale/zoomout.svg"


import Alert from "../../../assets/side/alert.svg"

import Savetopdf from "../../../assets/side/savetopdf.svg"
import Savetopdfdebug from "../../../assets/side/savetopdfdebug.svg"
import Savetopdfload from "../../../assets/side/savetopdf_load.svg"
import Downloadpdfarrow from "../../../assets/side/downloadpdf_arrow.svg"
import Saveandback from "../../../assets/side/saveandback.svg"
import Back from "../../../assets/side/back.svg"
import Visual from "../../../assets/side/visual.svg"
import Clearall from "../../../assets/side/clearall.svg"
import Clearallicons from "../../../assets/side/clearallicons.svg"
import Clear from "../../../assets/side/clear.svg"
import Anim from "../../../assets/side/anim.svg"
import Animoff from "../../../assets/side/animoff.svg"
import Rotateright from "../../../assets/side/rotateright.svg"
import Rotateleft from "../../../assets/side/rotateleft.svg"
import Textborder from "../../../assets/side/textborder.svg"
import Textupoff from "../../../assets/side/textupoff.svg"
import Textupon from "../../../assets/side/textupon.svg"
import Clearalltext from "../../../assets/side/clearalltext.svg"
import Setonefont from "../../../assets/side/setonefont.svg"
import Frameblacklight from "../../../assets/side/framebacklight.svg"
import Framesharp from "../../../assets/side/framesharp.svg"
import Frameround from "../../../assets/side/frameround.svg"
import Removeallframes from "../../../assets/side/removeallframes.svg"
import Removecurrframe from "../../../assets/side/removecurrframe.svg"

import PropoportionsAllTo7030 from "../../../assets/side/proportions_all_to_70_30.svg"
import PropoportionsAllTo3070 from "../../../assets/side/proportions_all_to_30_70.svg"
import PropoportionsAllTo5050 from "../../../assets/side/proportions_all_to_50_50.svg"
import PropoportionsAllReset from "../../../assets/side/proportions_all_reset.svg"

import PropoportionsTo7030 from "../../../assets/side/proportions_to_70_30.svg"
import PropoportionsTo3070 from "../../../assets/side/proportions_to_30_70.svg"
import PropoportionsTo5050 from "../../../assets/side/proportions_to_50_50.svg"

import Submitinput from "../../../assets/preview/submitinput.svg"
import Clearinput from "../../../assets/preview/clearinput.svg"
import Submitinputdark from "../../../assets/preview/submitinputdark.svg"
import Removeall from "../../../assets/preview/remove.svg"

import Addframe from "../../../assets/frame/addframe.svg"
import Addframedark from "../../../assets/frame/addframedark.svg"
import Removeframe from "../../../assets/frame/removeframe.svg"
import Removeframehorizontal from "../../../assets/frame/removeframehorizontal.svg"


import LCDPause from "../../../assets/lcd/pause.svg"
import LCDPlay from "../../../assets/lcd/play.svg"
import LCDPlus from "../../../assets/lcd/plus.svg"
import LCDMinus from "../../../assets/lcd/minus.svg"
import Minusuni from "../../../assets/lcd/minusuni.svg"
import Leftuni from "../../../assets/lcd/leftuni.svg"
import Rightuni from "../../../assets/lcd/rightuni.svg"
import noDotUni from "../../../assets/lcd/noDotUni.svg"


import IconHolder from './IconHolder/IconHolder';
import PanelPreviewFullScreen from './PanelPreviewFullScreen';

const PanelPreview = ({
  frameTitleFlag,
  frameTitle,
  allowFrameTitle,
  chosenColor,
  chosenCut,
  resetColor,
  resetCut,
  chosenTab,
  resetTab,
  chosenModel,
  resetModel,
  resetAllAfterModelChange,
  resetAllAfterModelChangeFlag,
  changePanelTypeBackEnd,
  chosenFrameFont,
  chosenFrameFontWeight,
  chosenFrameFontInfo,
  chosenFrameShape,
  addNewFrameState,
  addNewFrame,
  removeFrameState,
  removeFrame,
  lastRemovedFrameIndex,
  frameHolders,
  frameHoldersTemp,
  changeFrameHolders,
  changeFrameHoldersTemp,
  changeFrameText,
  frameText,
  changeFrameFont,
  changeFrameFontWeight,
  changeFrameShape,
  changeFramesShapeToSharp,
  changeFramesShapeToRound,
  overFrameReRender,
  textFrameRender,
  overFrameAll,
  chosenTextFont,
  chosenTextWeight,
  toggleVisual,
  visual,
  changeScale,
  sc,
  animations,
  toggleAnimations,
  changeIconHolders,
  iconHolders,
  isAnySelected,
  changeIsAnySelected,
  areThereAnyIcons,
  setAreThereAnyIcons,
  showRemoveIcon,
  showRemoveIcons,

  changePanelName,
  panelName,
  setTimeOfCreation,

  changePanelNameBackEnd,
  changePanelTextBackEnd,
  changeIconsBackEnd,
  resetPanelColorBackEnd,
  changeFramesBackEnd,
  panelTextBackEnd,
  iconsBackEnd,
  framesBackEnd,

  toggleTextUp,
  textUpOff,
  changeTextFont,
  changeTextWeight,

  backEndData,
  frontEndData,
  addPanel,
  showDashboard,
  panels,
  indexOfLastPanel,
  updatePanels,
  dashboard,
  hideCreator,
  dashboardSmoothEnter,

  updateFavoriteIcons,
  ownIcons,
  ownIconsRender,
  updateOwnIcons,

  warnings,
  updateWarnings,
  filterWarnings,
  pushWarnings,
  iconHoldersRender,

  alert,
  showAlert,
  alertAnswer,
  setAlertAnswer,
  fullScreen,
  setFullScreen,
  setAllIcons,
  allIcons,
}) => {



  const target = useRef(null);

  const [visualSmooth, setVisualSmooth] = useState(true)

  const [showTextBorder, setShowTextBorder] = useState(true)
  const [showFrameTextBorder, setShowFrameTextBorder] = useState(true)
  const [showFramBlackLight, setShowFramBlackLight] = useState(true)

  const [noPanelName, setNoPanelName] = useState(false)
  const [occupiedPanelName, setOccupiedPanelName] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const [newFrame, setNewFrame] = useState([])
  const [newFrameHide, setNewFrameHide] = useState([])
  const [newFrameChange, setNewFrameChange] = useState([])
  const [tempFrame, setTempFrame] = useState({ textX: 0, textY: 0, frameArr: [], text: "" })

  const [overCurrFrame, setOverCurrFrame] = useState(false)


  const [textFrame, setTextFrame] = useState(false)
  const [isFocusedInputFrame, setIsFocusedInputFrame] = useState(false)
  const [allFramesSharpRound, setAllFramesSharpRound] = useState(true)

  const [overDescriptions, setOverDescriptions] = useState(false)
  const [overUpDescriptions, setOverUpDescriptions] = useState(false)

  const [isFocusedInputIndex, setIsFocusedInputIndex] = useState(null)
  const [isFocusedInputSide, setIsFocusedInputSide] = useState(null)
  const [rerenderTextWarning, setRerenderTextWarning] = useState(false)

  const [isFocusedInputName, setIsFocusedInputName] = useState(false)

  const [time, setTime] = useState(moment().format('HH:mm'));
  const [timeWithSeconds, setTimeWithSeconds] = useState(moment().format('HH:mm:ss'));
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));


  const [lcdShow, setLcdShow] = useState(chosenModel.lcdScreen ? true : false)
  const [lcdNew, setLcdNew] = useState((chosenModel.lcdScreen && chosenModel.lcdScreen.lcdType === "slide") ? true : false)
  const [hideAll, setHideAll] = useState(true)

  const [removeAll, setRemoveAll] = useState(false)

  const [frameTitles, setFrameTitles] = useState(false)

  const [panelContainerHeight, setPanelContainerHeight] = useState("100%")
  const [panelContainerWidth, setPanelContainerWidth] = useState("100%")

  const [globalProportions, setGlobalProportions] = useState(0)
  const [areThereAnySplit, setAreThereAnySplit] = useState(false)
  const [isAnySplitSelected, setIsAnySplitSelected] = useState(3)


  useEffect(() => {
    setPanelContainerHeight(document.querySelector(".panel_container").clientHeight)
    setPanelContainerWidth(document.querySelector(".panel_container").clientWidth)

    const resizeTimeout = setTimeout(() => {
      setPanelContainerHeight(document.querySelector(".panel_container").clientHeight)
      setPanelContainerWidth(document.querySelector(".panel_container").clientWidth)
    }, 850);
    return () => clearTimeout(resizeTimeout);
  }, [panelContainerHeight, panelContainerWidth, chosenModel]);




  useEffect(() => {
    if (chosenColor.RAL === "RAL 9003" && visual) {
      let checkWarnings = warnings.filter(element => element.code === 0)
      if (checkWarnings.length === 0) {
        pushWarnings(0)
      }
    } else {
      filterWarnings(0)
    }
    // eslint-disable-next-line
  }, [chosenColor, visual]);

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(moment().format('HH:mm'));
      setTimeWithSeconds(moment().format('HH:mm:ss'));
      setDate(moment().format('YYYY-MM-DD'));
    }, 1000)
    return () => clearInterval(intervalID);
  }, [time])

  useEffect(() => {
    if (resetAllAfterModelChangeFlag) {
      dashboardSmoothEnter(false)
      setVisualSmooth(true)
      const arrIconHolders = [];
      const arrNewFrame = [];
      const arrNewFrameHide = [];
      const arrNewFrameChange = [];
      const arrTempFrame = { textX: 0, textY: 0, frameArr: [] };
      setHideAll(false)
      setFrameTitles(false)
      if (textUpOff) {
        toggleTextUp()
      }
      changeTextFont("Calibri-bold")
      changeTextWeight("700")
      changeFrameFont("Calibri-bold")
      changeFrameFontWeight("700")
      changeFrameShape("sharp")
      changeFrameHoldersTemp(null)
      allowFrameTitle(false)
      frameTitle(false)


      const modeltimeout = setTimeout(() => {
        setHideAll(true)
        chosenModel.dotLocation.forEach(element => {
          arrIconHolders.push({
            flag: element, lastDroppedDot: null, lastDroppedIcon: null, lastDroppedSlashUp: null, lastDroppedSlashDown: null,
            selectedDot: false, selected: false, selectedUp: false, selectedDown: false, rotationDot: 0, rotationIcon: 0, rotationUp: 0, rotationDown: 0,
            textUp: "", fontUp: null, fontUpWeight: null, textDown: "", fontDown: null, fontDownWeight: null, singleFrameTemp: false, singleFrame: false,
            splitIconProportions: 0
          })
        });
        chosenModel.dotLocation.forEach(element => {
          arrNewFrame.push(element)
        });
        chosenModel.dotLocation.forEach(element => {
          arrNewFrameHide.push(element)
        });
        chosenModel.dotLocation.forEach(element => {
          arrNewFrameChange.push(element)
        });

        chosenModel.dotLocation.forEach(element => {
          arrTempFrame.frameArr.push({
            flag: element,
            rtl: 0, rtr: 0, rbr: 0, rbl: 0,
            t: 0, r: 0, b: 0, l: 0,
            fh: 0, fw: 0, mt: 0, mb: 0, ml: 0, mr: 0,
          })
        });
        setNewFrame(arrNewFrame)
        setNewFrameHide(arrNewFrameHide)
        setNewFrameChange(arrNewFrameChange)
        setTempFrame(arrTempFrame)
        changeIconHolders(arrIconHolders);
        changeFrameText("")
        setTextFrame(false)
        chosenModel.lcdScreen ? setLcdShow(true) : setLcdShow(false);
        (chosenModel.lcdScreen && chosenModel.lcdScreen.lcdType === "slide") ? setLcdNew(true) : setLcdNew(false);
        setVisualSmooth(false)
        changeFrameHolders([])
        changeFramesBackEnd([])
        updateWarnings([])

        if (chosenColor.RAL === "SMOKED_GLASS" && chosenModel.type !== "MDOT_M18" && chosenModel.type !== "MDOT_M18_UNIVERSAL") {
          resetColor()
        }

        if (chosenColor.RAL === "RAL 9003" && visual) {
          pushWarnings(0)
        }

        // ----------------------------------------------------------------------------------------------------------------BACKEND---------------------
        if (chosenModel.lcdScreen.lcdType === "slide") {
          const copyIconsBackEnd = []

          const universalIconArr = [
            {
              icon: Minusuni,
              number: 1,
              type: 0
            },
            {
              icon: Minusuni,
              number: 3,
              type: 0
            },
            {
              icon: Leftuni,
              number: 4,
              type: 0
            },
            {
              icon: Rightuni,
              number: 6,
              type: 0
            },
            {
              icon: Minusuni,
              number: 7,
              type: 0
            },
            {
              icon: Minusuni,
              number: 9,
              type: 0
            },
            {
              icon: noDotUni,
              number: 1,
              type: 3
            },
            {
              icon: noDotUni,
              number: 3,
              type: 3
            },
            {
              icon: noDotUni,
              number: 4,
              type: 3
            },
            {
              icon: noDotUni,
              number: 6,
              type: 3
            },
            {
              icon: noDotUni,
              number: 7,
              type: 3
            },
            {
              icon: noDotUni,
              number: 9,
              type: 3
            },
          ]

          universalIconArr.forEach(element => {
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
                  proportion: 0,
                  svg: svgBackEnd
                }
                copyIconsBackEnd.push(recordIcon)
                changeIconsBackEnd(copyIconsBackEnd)
              })
          })
        } else {
          changeIconsBackEnd([])
        }
        // ----------------------------------------------------------------------------------------------------------------/BACKEND---------------------
        changePanelTextBackEnd([])
        resetAllAfterModelChange(false)
      }, 300);
      return () => clearTimeout(modeltimeout);
    }
    // eslint-disable-next-line
  }, [resetAllAfterModelChangeFlag]);


  useEffect(() => {
    const arrNewFrame = [];
    const arrNewFrameHide = [];
    const arrNewFrameChange = [];
    const arrTempFrame = { textX: 0, textY: 0, frameArr: [] };
    const arrIconHolders = iconHolders
    chosenModel.dotLocation.forEach(element => {
      arrNewFrame.push(element)
    });
    chosenModel.dotLocation.forEach(element => {
      arrNewFrameHide.push(element)
    });
    chosenModel.dotLocation.forEach(element => {
      arrNewFrameChange.push(element)
    });

    chosenModel.dotLocation.forEach(element => {
      arrTempFrame.frameArr.push({
        flag: element,
        rtl: 0, rtr: 0, rbr: 0, rbl: 0,
        t: 0, r: 0, b: 0, l: 0,
        fh: 0, fw: 0, mt: 0, mb: 0, ml: 0, mr: 0,
      })
    });
    arrIconHolders.forEach(element => element.singleFrameTemp = false)
    setNewFrame(arrNewFrame)
    setNewFrameHide(arrNewFrameHide)
    setNewFrameChange(arrNewFrameChange)
    setTempFrame(arrTempFrame)
    setVisualSmooth(false)
    changeIconHolders(arrIconHolders);
    resetTab("model")
    handleShowWarnings()
    allowFrameTitle(false)
    // eslint-disable-next-line
  }, [dashboard]);




  useEffect(() => {
    const copyIconHolders = iconHolders.filter(element => element.lastDroppedDot !== null)
    if (copyIconHolders.length > 0) {
      const checkWarnings = warnings.filter(element => element.code === 1)
      if (checkWarnings.length === 0) {
        pushWarnings(1)
      }
    } else {
      filterWarnings(1)
    }

    const copyIconHoldersText = iconHolders.filter(element => element.textUp.length > 9 || element.textDown.length > 9)
    if (copyIconHoldersText.length > 0) {
      const checkWarningsText = warnings.filter(element => element.code === 2)
      if (checkWarningsText.length === 0) {
        pushWarnings(2)
      }
    } else {
      filterWarnings(2)
    }

    const copyIconHoldersSelected = iconHolders.filter(element => element.selectedDot || element.selected || element.selectedUp || element.selectedDown)
    if (copyIconHoldersSelected.length > 0) {
      changeIsAnySelected(true)
    } else {
      changeIsAnySelected(false)
    }

    const copyIconHoldersSplitSelected = iconHolders.filter(element => element.selectedUp || element.selectedDown)
    const copyIconHoldersSplitSelectedProportions = iconHolders.filter(element => element.selectedUp || element.selectedDown)
    if (copyIconHoldersSplitSelected.length > 0) {
      setIsAnySplitSelected(copyIconHoldersSplitSelectedProportions[0].splitIconProportions)
    } else {
      setIsAnySplitSelected(3)
    }

    if (iconsBackEnd.length > 0) {
      setAreThereAnyIcons(true)
    } else {
      setAreThereAnyIcons(false)
    }

    if (iconsBackEnd.filter(element => element.type === 1 || element.type === 2).length > 0) {
      setAreThereAnySplit(true)
    } else {
      setAreThereAnySplit(false)
    }

    let checkAllIcons = 0
    const copyBackEndData = iconsBackEnd
    copyBackEndData.forEach(element => {
      if (element.type === 0) {
        checkAllIcons += 1
      } else if (element.type === 1 || element.type === 2) {
        checkAllIcons += 0.5
      }
      if (checkAllIcons === chosenModel.numberOfDots) {
        setAllIcons(true)
      } else {
        setAllIcons(false)
      }
    })

    // eslint-disable-next-line
  }, [iconHolders, iconHoldersRender, iconsBackEnd]);




  useEffect(() => {
    const copyFrameHoldersText = frameHolders.filter(element => element.type === "multi").filter(el => el.framePrint.text.length > 9)

    if (copyFrameHoldersText.length > 0 || frameText.length > 9) {
      const checkWarningsText = warnings.filter(element => element.code === 5)
      if (checkWarningsText.length === 0) {
        pushWarnings(5)
      }
    } else {
      filterWarnings(5)
    }
    // eslint-disable-next-line
  }, [textFrameRender, addNewFrameState, removeFrameState]);




  useEffect(() => {
    const checkTextUp = []
    iconHolders.forEach((element, index) => {
      if (element.textUp) {
        if (!checkTextUp.includes(index)) {
          checkTextUp.push(index)
        }
      }
    })

    const checkFrame = []

    frameHolders.forEach((element, index) => {
      if (element.type === "multi") {
        element.framePrint.frameArr.forEach((el, i) => {
          if (el.t) {
            if (!checkFrame.includes(i)) {
              checkFrame.push(i)
            }
          }
        })
      }

    })

    let checkFrameAndTextUp = []

    checkTextUp.forEach(element => {
      checkFrame.forEach(el => {
        if (el === element) {
          checkFrameAndTextUp.push(element)
        }
      })
    })

    if (checkFrameAndTextUp.length > 0) {
      const checkWarningsText = warnings.filter(element => element.code === 6)
      if (checkWarningsText.length === 0) {
        pushWarnings(6)
      }
    } else {
      filterWarnings(6)
    }
    // eslint-disable-next-line
  }, [iconHolders, iconHoldersRender, textFrameRender, addNewFrameState]);



  useEffect(() => { //NATALECZKA

    const checkProportions = []
    iconHolders.forEach((element, index) => {
      if (element.splitIconProportions && (element.lastDroppedSlashUp || element.lastDroppedSlashDown)) {
        checkProportions.push(index)
      }
    })
    const checkSingleFrames = []
    frameHolders.forEach((element) => {
      if (element.type === "single") {
        checkSingleFrames.push(element.frameInfo.startCell - 1)
      }
    })
    const filteredArray = checkSingleFrames.filter(el => checkProportions.includes(el));
    if (filteredArray.length > 0) {
      const checkWarningsText = warnings.filter(element => element.code === 8)
      if (checkWarningsText.length === 0) {
        pushWarnings(8)
      }
    } else {
      filterWarnings(8)
    }
    //eslint-disable-next-line
  }, [iconHolders, iconHoldersRender, addNewFrameState]);



  useEffect(() => {
    const copyArr = iconHolders;
    if (isFocusedInputSide === "up") {
      copyArr[isFocusedInputIndex].fontUp = chosenTextFont
      copyArr[isFocusedInputIndex].fontUpWeight = chosenTextWeight
    } else if (isFocusedInputSide === "down") {
      copyArr[isFocusedInputIndex].fontDown = chosenTextFont
      copyArr[isFocusedInputIndex].fontDownWeight = chosenTextWeight
    }
    changeIconHolders(copyArr)
    // const checkArr = []
    // copyArr.forEach((el) => {
    //   if (el.fontDown && el.textDown && !checkArr.includes(el.fontDown)) {
    //     checkArr.push(el.fontDown)

    //   }
    //   if (el.fontUp && el.textUp && !checkArr.includes(el.fontUp)) {
    //     checkArr.push(el.fontUp)
    //   }
    // })

    // if (checkArr.length > 1) {
    //   filterWarnings(3)
    //   pushWarnings(3)
    // } else {
    //   filterWarnings(3)
    // }

    // ----------------------------------------------------------------------------------------------------------------BACKEND---------------------
    const copyPanelTextBackEnd = panelTextBackEnd
    copyPanelTextBackEnd.forEach(element => {
      if (element.number === isFocusedInputIndex + 1) {
        if (element.type === 0 && isFocusedInputSide === "down") {
          // element.font = chosenTextFont
          // element.fontWeight = chosenTextWeight
          element.font = chosenTextWeight === "700" && !chosenTextFont.includes("-bold") ? `${chosenTextFont}-bold` : chosenTextFont
        } else if (element.type === 1 && isFocusedInputSide === "up") {
          // element.font = chosenTextFont
          // element.fontWeight = chosenTextWeight
          element.font = chosenTextWeight === "700" && !chosenTextFont.includes("-bold") ? `${chosenTextFont}-bold` : chosenTextFont
        }
      }
    })
    changePanelTextBackEnd(copyPanelTextBackEnd)
    const checkArr = []
    copyPanelTextBackEnd.forEach((el) => {
      if (el.font && !checkArr.includes(el.font)) {
        checkArr.push(el.font)
      }
    })
    if (checkArr.length > 1) {
      filterWarnings(3)
      pushWarnings(3)
    } else {
      filterWarnings(3)
    }
    // ---------------------------------------------------------------------------------------------------------------/BACKEND---------------------
    // eslint-disable-next-line
  }, [isFocusedInputIndex, isFocusedInputSide, chosenTextFont, chosenTextWeight, rerenderTextWarning]);

  useEffect(() => {
    if (addNewFrameState) {
      const arrNewFrame = [];
      const arrNewFrameHide = [];
      const arrNewFrameChange = [];
      const arrTempFrame = { textX: 0, textY: 0, frameArr: [] };

      chosenModel.dotLocation.forEach(element => {
        arrNewFrame.push(element)
      });
      chosenModel.dotLocation.forEach(element => {
        arrNewFrameHide.push(element)
      });
      chosenModel.dotLocation.forEach(element => {
        arrNewFrameChange.push(element)
      });


      chosenModel.dotLocation.forEach(element => {
        arrTempFrame.frameArr.push({
          flag: element,
          rtl: 0, rtr: 0, rbr: 0, rbl: 0,
          t: 0, r: 0, b: 0, l: 0,
          fh: 0, fw: 0, mt: 0, mb: 0, ml: 0, mr: 0,
        })
      });

      const copyArr = iconHolders;
      copyArr.forEach((element, index) => {

        if (element.singleFrameTemp) {
          element.singleFrameTemp = false;
          element.singleFrame = true;
        }
      })

      const copyFrameHolders = frameHolders

      const checkFrameFontArr = []
      const checkFrameTitlesArr = []


      copyFrameHolders.forEach((el) => {
        if (el.framePrint.frameFontInfo && !checkFrameFontArr.includes(el.framePrint.frameFontInfo)) {
          checkFrameFontArr.push(el.framePrint.frameFontInfo)
        }
        if (el.framePrint.text !== "") {
          checkFrameTitlesArr.push(el.framePrint.text)
        }
      })

      if (checkFrameFontArr.length > 1) {
        filterWarnings(4)
        pushWarnings(4)
      } else {
        filterWarnings(4)
      }


      if (checkFrameTitlesArr.length > 0) {
        setFrameTitles(true)
      } else {
        setFrameTitles(false)
      }
      // ----------------------------------------------------------------------------------------------------------------BACKEND---------------------

      let sizeXBackEnd = frameHolders[frameHolders.length - 1].frameInfo.columns // po staremu
      let sizeYBackEnd = frameHolders[frameHolders.length - 1].frameInfo.rows
      let iconStartBackEnd = 1
      // let sizeXBackEnd = 1
      // let sizeYBackEnd = 1
      if (!chosenModel.panelRotation) {
        iconStartBackEnd = frameHolders[frameHolders.length - 1].frameInfo.startCell
        // if (frameHolders[frameHolders.length - 1].frameInfo.columns === 1 && frameHolders[frameHolders.length - 1].frameInfo.rows === 1) {
        //   sizeXBackEnd = 7.5
        //   sizeYBackEnd = 7.5
        // } else {
        //   if (frameHolders[frameHolders.length - 1].frameInfo.columns === 1) {
        //     sizeXBackEnd = chosenModel.sideColumnFrameWidth
        //   } else if (frameHolders[frameHolders.length - 1].frameInfo.columns === 2) {
        //     sizeXBackEnd = chosenModel.sideColumnFrameWidth * 2 + ((chosenModel.centerColumnFrameWidth - chosenModel.sideColumnFrameWidth) / 2)
        //   } else if (frameHolders[frameHolders.length - 1].frameInfo.columns === 3) {
        //     sizeXBackEnd = chosenModel.sideColumnFrameWidth * 2 + chosenModel.centerColumnFrameWidth
        //   }
        //   sizeYBackEnd = chosenModel.multiRowFrameHeight * (frameHolders[frameHolders.length - 1].frameInfo.rows - 1) + chosenModel.oneRowFrameHeight
        // }

      } else {
        iconStartBackEnd = 3 * (frameHolders[frameHolders.length - 1].frameInfo.startColumn - 1) + frameHolders[frameHolders.length - 1].frameInfo.startRow
        // if (frameHolders[frameHolders.length - 1].frameInfo.columns === 1 && frameHolders[frameHolders.length - 1].frameInfo.rows === 1) {
        //   sizeXBackEnd = 7.5
        //   sizeYBackEnd = 7.5
        // } else {
        //   if (frameHolders[frameHolders.length - 1].frameInfo.rows === 1) {
        //     sizeYBackEnd = chosenModel.sideColumnFrameWidth
        //   } else if (frameHolders[frameHolders.length - 1].frameInfo.rows === 2) {
        //     sizeYBackEnd = chosenModel.sideColumnFrameWidth * 2 + ((chosenModel.centerColumnFrameWidth - chosenModel.sideColumnFrameWidth) / 2)
        //   } else if (frameHolders[frameHolders.length - 1].frameInfo.rows === 3) {
        //     sizeYBackEnd = chosenModel.sideColumnFrameWidth * 2 + chosenModel.centerColumnFrameWidth
        //   }
        //   sizeXBackEnd = chosenModel.multiRowFrameHeight * (frameHolders[frameHolders.length - 1].frameInfo.columns - 1) + chosenModel.oneRowFrameHeight
        // }
      }


      let cornerRadiousBackEnd = 0
      if (chosenFrameShape === "sharp") {
        cornerRadiousBackEnd = 0
      } else if (chosenFrameShape === "round") {
        cornerRadiousBackEnd = 1
      }


      let titleBackEnd = null
      let fontBackEnd = null
      if (frameText !== "") {
        titleBackEnd = frameText
        fontBackEnd = chosenFrameFontInfo

      } else if (frameText === "") {
        titleBackEnd = null
        fontBackEnd = null
      }

      const copyIconsBackEnd = framesBackEnd
      const newFrameBackEnd = {
        sizeX: sizeXBackEnd,
        sizeY: sizeYBackEnd,
        iconStart: iconStartBackEnd,
        cornerRadious: cornerRadiousBackEnd,
        title: titleBackEnd,
        font: fontBackEnd,
      }
      copyIconsBackEnd.push(newFrameBackEnd)
      changeFramesBackEnd(copyIconsBackEnd)


      // ----------------------------------------------------------------------------------------------------------------/BACKEND---------------------
      setNewFrame(arrNewFrame)
      setNewFrameHide(arrNewFrameHide)
      setNewFrameChange(arrNewFrameChange)
      setTempFrame(arrTempFrame)
      changeIconHolders(copyArr)
      changeFrameText("")
      setTextFrame(false)
      allowFrameTitle(false)
      addNewFrame(false)
    }
    // eslint-disable-next-line 
  }, [addNewFrameState]);



  useEffect(() => {
    if (lastRemovedFrameIndex !== null) {
      // ----------------------------------------------------------------------------------------------------------------BACKEND---------------------
      const copyFramesBackEnd = framesBackEnd.filter(function (element, index) { return index !== lastRemovedFrameIndex })
      changeFramesBackEnd(copyFramesBackEnd)
      // ----------------------------------------------------------------------------------------------------------------/BACKEND---------------------

      const copyFrameHolders = frameHolders
      const checkSingleFramesArr = []
      copyFrameHolders.forEach(element => {
        if (element.type === "single") {
          element.framePrint.forEach((el, index) => {
            if (el !== 0) {
              checkSingleFramesArr.push(index)
            }
          })
        }
      })
      const copyArr = iconHolders;
      copyArr.forEach((element, index) => {
        if (!checkSingleFramesArr.includes(index)) {
          element.singleFrame = false;
        }
      })
      changeIconHolders(copyArr)

      const checkFrameFontArr = []
      const checkFrameTitlesArr = []

      copyFrameHolders.forEach((el) => {
        if (el.framePrint.frameFontInfo && !checkFrameFontArr.includes(el.framePrint.frameFontInfo)) {
          checkFrameFontArr.push(el.framePrint.frameFontInfo)
        }
        if (el.framePrint.text !== "") {
          checkFrameTitlesArr.push(el.framePrint.text)
        }
      })
      if (checkFrameFontArr.length > 1) {
        filterWarnings(4)
        pushWarnings(4)

      } else {
        filterWarnings(4)
      }

      if (checkFrameTitlesArr.length > 0) {
        setFrameTitles(true)
      } else {
        setFrameTitles(false)
      }

      overFrameReRender()
      removeFrame(null)
    }
    // eslint-disable-next-line 
  }, [removeFrameState]);



  useEffect(() => {
    if (chosenTab !== "text") {
      setIsFocusedInputIndex(null)
      setIsFocusedInputSide(null)
    } else if (chosenTab !== "frame") {
      setIsFocusedInputFrame(false)
    }
  }, [chosenTab]);



  useEffect(() => {
    if (alertAnswer === 2) {
      goBack()
    }
    if (alertAnswer === 3) {
      handleClearAll()
    }
    if (alertAnswer === 4) {
      handleClearAllIcons()
    }
    if (alertAnswer === 5 || alertAnswer === 105) {
      handleResetAllFrames()
      handleResetCurrFrame()
    }
    if (alertAnswer === 6) {
      handleClearAllText()
    }
    if (alertAnswer === 8) {
      printPdf()
    }
    // eslint-disable-next-line 
  }, [alertAnswer])


  useEffect(() => {
    if (ownIcons.length !== 0) {
      const checkWarnings = warnings.filter(element => element.code === 7)
      if (checkWarnings.length === 0) {
        pushWarnings(7)
      }
    } else {
      filterWarnings(7)
    }
    // eslint-disable-next-line 
  }, [ownIconsRender])

  useEffect(() => {
    const checkProportions = []
    iconHolders.forEach((element) => {
      checkProportions.push(element.splitIconProportions)
    })
    const uniqueArray = [...new Set(checkProportions)]
    if (uniqueArray.length > 1) {
      setGlobalProportions(3)
    } else {
      setGlobalProportions(uniqueArray[0])
    }
    // eslint-disable-next-line
  }, [iconHolders, iconHoldersRender, isAnySplitSelected]);

  let frameCellStyle = {}
  frameCellStyle.height = `${16 * sc}px`;
  frameCellStyle.width = `${16 * sc}px`;
  frameCellStyle.borderRadius = "50%";
  frameCellStyle.transition = "400ms ease";
  frameCellStyle.backgroundColor = "rgba(236, 105, 92, 0.5)";
  frameCellStyle.opacity = "0";
  frameCellStyle.margin = `${2 * sc}px auto`;

  if ((chosenTab === "frame" && chosenColor.RAL !== "SMOKED_GLASS")) {
    frameCellStyle.opacity = "1";
  }


  let frameChangeStyle = {}
  frameChangeStyle.height = `${16 * sc}px`;
  frameChangeStyle.width = `${16 * sc}px`;
  frameChangeStyle.transition = "200ms ease";
  frameChangeStyle.position = "absolute";
  frameChangeStyle.marginTop = `${1.5 * sc}px`;
  frameChangeStyle.left = "50%"
  frameChangeStyle.transform = "translate(-50%,-10%)"



  let frameClickStyle = {}
  frameClickStyle.height = "100%";
  frameClickStyle.width = "100%";
  frameClickStyle.position = "absolute";
  if ((chosenTab === "frame" && chosenColor.RAL !== "SMOKED_GLASS")) {
    frameClickStyle.cursor = "pointer";
    frameClickStyle.zIndex = "999";
  }

  let frameTempStyle = {}
  frameTempStyle.position = "absolute";
  frameTempStyle.transition = "width 400ms ease, height 400ms ease, border-color 400ms ease, border-width 0s";
  frameTempStyle.borderColor = "rgb(40, 167, 69)";
  frameTempStyle.opacity = "0";

  if (chosenColor.hex === "#30a32c" && !overCurrFrame) {
    frameTempStyle.borderColor = "rgb(32, 114, 30)";
  }
  if (overCurrFrame) {
    frameTempStyle.borderColor = "#dc3545";
  }
  if ((chosenTab === "frame" && chosenColor.RAL !== "SMOKED_GLASS")) {
    frameTempStyle.opacity = "1";
  }

  let frameStyle = {}
  frameStyle.position = "absolute";
  frameStyle.transition = "width 400ms ease, height 400ms ease, border-color 400ms ease, border-width 0s";


  let singleFrameStyle = {}
  singleFrameStyle.width = `${7.5 * sc}px`;
  singleFrameStyle.height = `${7.5 * sc}px`;
  singleFrameStyle.top = `${6.65 * sc}px`;
  singleFrameStyle.left = "50%";
  singleFrameStyle.marginLeft = `${-3.75 * sc}px`;
  singleFrameStyle.border = "2px solid transparent";
  singleFrameStyle.position = "absolute";
  singleFrameStyle.transition = "width 400ms ease, height 400ms ease, border-color 400ms ease, border-width 0s";





  const handleZoomOut = () => {
    let scaleCopy = sc;
    (sc > 4) && changeScale(scaleCopy - 0.5)
  }
  const handleResize = () => {
    changeScale(5)
  }




  const handleZoomIn = () => {
    let scaleCopy = sc;
    (sc < 8) && changeScale(scaleCopy + 0.5)
  }


  let panelPreviewStyle = {};

  panelPreviewStyle.width = `${(chosenModel.width * 5) + 280}px`;
  if (chosenModel.panelRotation) {
    panelPreviewStyle.width = `${(chosenModel.height * 5) + 450}px`;
  }


  let chosenModelStyle = {};
  chosenModelStyle.backgroundColor = chosenColor.hex;
  chosenModelStyle.height = `${chosenModel.height * sc}px`;
  chosenModelStyle.width = `${chosenModel.width * sc}px`;
  chosenModelStyle.transition = "background-color 400ms ease,height 400ms ease, width 400ms ease, transform 800ms ease-in-out, border 400ms ease";
  chosenModelStyle.boxSizing = "content-box"
  chosenModelStyle.border = `0 solid ${chosenColor.hex}`;
  if (chosenModel.panelRotation) {
    chosenModelStyle.transform = "rotate(-90deg)"
  }

  if (chosenCut === 5) {
    chosenModelStyle.border = `${2.5 * sc}px solid ${chosenColor.hex}`;
  }


  let contentStyle = {};
  contentStyle.height = `${chosenModel.height * sc - ((chosenModel.marginTop * sc) + (chosenModel.marginBottom * sc))}px`;
  contentStyle.width = `${chosenModel.width * sc - (chosenModel.marginSide * 2 * sc)}px`;
  contentStyle.margin = `${chosenModel.marginTop * sc}px ${chosenModel.marginSide * sc}px ${chosenModel.marginBottom * sc}px`
  contentStyle.transition = "400ms ease";



  let contentFrameStyle = {};
  contentFrameStyle.height = `${chosenModel.height * sc - ((chosenModel.marginFrameTop * sc) + (chosenModel.marginFrameBottom * sc))}px`;
  contentFrameStyle.width = `${chosenModel.width * sc - (chosenModel.marginFrameSide * 2 * sc)}px`;
  contentFrameStyle.margin = `${chosenModel.marginFrameTop * sc}px ${chosenModel.marginFrameSide * sc}px ${chosenModel.marginFrameTop * sc}px`
  contentFrameStyle.transition = "400ms ease";

  let cellStyle = {};
  cellStyle.position = "relative";
  cellStyle.transition = "400ms ease";

  let resizeStyle = {};
  resizeStyle.transition = "400ms ease";
  resizeStyle.alignSelf = "center"

  let universalIconBoxStyle = {};
  universalIconBoxStyle.height = `${60 * sc}px`;
  universalIconBoxStyle.width = `${70.4 * sc}px`;
  universalIconBoxStyle.transition = "400ms ease";

  let universalIconStyle = {};
  universalIconStyle.height = `${7.5 * sc}px`;
  universalIconStyle.width = `${7.5 * sc}px`;
  universalIconStyle.transition = "400ms ease";


  let visualStyle = {}
  visualStyle.width = `${chosenModel.width * sc}px`;
  visualStyle.height = `${chosenModel.height * sc}px`;
  visualStyle.top = "0";
  visualStyle.left = "0";


  if (chosenCut === 5 && !chosenModel.panelRotation) {
    visualStyle.width = `${(chosenModel.width + 5) * sc}px`;
    visualStyle.height = `${(chosenModel.height + 5) * sc}px`;
    visualStyle.top = `${-2.5 * sc}px`;
    visualStyle.left = `${-2.5 * sc}px`;
  } else if (chosenCut !== 5 && chosenModel.panelRotation) {
    visualStyle.width = `${chosenModel.height * sc}px`;
    visualStyle.height = `${chosenModel.width * sc}px`;
    visualStyle.transform = "rotate(90deg)";
    visualStyle.transformOrigin = `${chosenModel.width * 0.5 * sc}px ${chosenModel.width * 0.5 * sc}px`;
  } else if (chosenCut === 5 && chosenModel.panelRotation) {
    visualStyle.width = `${(chosenModel.height + 5) * sc}px`;
    visualStyle.height = `${(chosenModel.width + 5) * sc}px`;
    visualStyle.top = `${-2.5 * sc}px`;
    visualStyle.left = `${2.5 * sc}px`;
    visualStyle.transform = "rotate(90deg)";
    visualStyle.transformOrigin = `${chosenModel.width * 0.5 * sc}px ${chosenModel.width * 0.5 * sc}px`;
  }


  let cutBorderStyle = {}
  if (chosenCut) {
    if (chosenColor.hex === "#060707") {
      cutBorderStyle.border = `${chosenCut * sc}px outset rgb(44,44,44)`
      cutBorderStyle.opacity = "0.6"
    } else {
      cutBorderStyle.border = `${chosenCut * sc}px outset ${chosenColor.hex}`
      cutBorderStyle.opacity = "0.5"
    }
  } else {
    cutBorderStyle.border = `2px outset ${chosenColor.hex}`
    cutBorderStyle.opacity = "0.4"
  }

  if (visual) {
    universalIconStyle.filter = "grayscale(100%) invert(1) brightness(10) drop-shadow( 0 0 4px rgba(255, 255, 255, 1))";
    frameStyle.filter = "brightness(10) drop-shadow( 0 0 2px rgba(255, 255, 255, 1))";
    singleFrameStyle.filter = "brightness(10) drop-shadow( 0 0 2px rgba(255, 255, 255, 1))";
  } else if (chosenColor.iconColor === "white") {
    universalIconStyle.filter = "grayscale(100%) invert(1) brightness(10)";
  } else {
    universalIconStyle.filter = "grayscale(100%) brightness(0)";
  }






  if ((!chosenModel.panelRotation) && (panelContainerHeight < (chosenModel.height * sc))) {
    resizeStyle.height = `${(chosenModel.height * sc) + 50}px`;
  } else if ((chosenModel.panelRotation) && (panelContainerHeight < (chosenModel.height * sc))) {
    resizeStyle.height = `${(chosenModel.height * sc) + 50}px`;
  }

  else {
    resizeStyle.height = "100%";
  }


  if (!chosenModel.panelRotation && panelContainerWidth < (chosenModel.width * sc)) {
    resizeStyle.width = `${(chosenModel.width * sc) + 50}px`;
  } else if (chosenModel.panelRotation && (panelContainerWidth < chosenModel.height * sc)) {
    resizeStyle.width = `${(chosenModel.height * sc) + 50}px`;
  }
  else {
    resizeStyle.width = "100%";
  }



  const logoStyle = {};
  logoStyle.height = `${3.9 * sc}px`;
  logoStyle.width = `${15.9 * sc}px`;
  logoStyle.filter = "invert(79%) sepia(5%) saturate(8%) hue-rotate(322deg) brightness(84%) contrast(83%)";


  if (chosenCut === 5 && !chosenModel.panelRotation) {
    logoStyle.bottom = `${6.5 * sc}px`;
    logoStyle.right = `${6.5 * sc}px`;
  } else if (chosenCut === 5 && chosenModel.panelRotation) {
    logoStyle.bottom = `${6.5 * sc}px`;
    logoStyle.left = `${6.5 * sc}px`;
    logoStyle.transform = "translate(-100%,0) rotate(90deg)  ";
    logoStyle.transformOrigin = "bottom right";
  } else if (chosenCut !== 5 && chosenModel.panelRotation) {
    logoStyle.bottom = `${5 * sc}px`;
    logoStyle.left = `${5 * sc}px`;
    logoStyle.transform = "translate(-100%,0) rotate(90deg)  ";
    logoStyle.transformOrigin = "bottom right";
  } else {
    logoStyle.bottom = `${5 * sc}px`;
    logoStyle.right = `${5 * sc}px`;
  }



  const lcdStyle = {};
  lcdStyle.transition = "400ms ease";
  if (chosenModel.lcdScreen && chosenColor.RAL !== "RAL 9003") {
    lcdStyle.height = `${chosenModel.lcdScreen.lcdHeight * sc}px`;
    lcdStyle.width = `${chosenModel.lcdScreen.lcdWidth * sc}px`;
    lcdStyle.top = `${chosenModel.lcdScreen.lcdTop * sc}px`;
    lcdStyle.left = `${chosenModel.lcdScreen.lcdLeft * sc}px`;
  }

  if (chosenModel.lcdScreen && chosenColor.RAL === "RAL 9003") {
    lcdStyle.height = `${(chosenModel.lcdScreen.lcdHeight - 2.2) * sc}px`;
    lcdStyle.width = `${(chosenModel.lcdScreen.lcdWidth - 1.8) * sc}px`;
    lcdStyle.top = `${(chosenModel.lcdScreen.lcdTop + 1.1) * sc}px`;
    lcdStyle.left = `${(chosenModel.lcdScreen.lcdLeft + 0.9) * sc}px`;
  }


  const lcdIconStyle = {};
  lcdIconStyle.height = `${7 * sc}px`;
  lcdIconStyle.width = `${7 * sc}px`;



  const autoResizeInputStyle = {};
  autoResizeInputStyle.fontSize = `${2.5 * sc}px`
  autoResizeInputStyle.lineHeight = `${2.5 * sc}px`
  autoResizeInputStyle.height = `${3.6 * sc}px`;
  autoResizeInputStyle.width = `${5 * sc}px`;
  autoResizeInputStyle.transition = "400ms ease";
  autoResizeInputStyle.position = "absolute";
  autoResizeInputStyle.display = "inline-grid";
  autoResizeInputStyle.alignItems = "center";
  autoResizeInputStyle.justifyItems = "center";

  const textStyle = {};
  textStyle.backgroundColor = "transparent";
  textStyle.color = chosenColor.iconColor;
  textStyle.border = "2px solid transparent"
  textStyle.borderRadius = `${0.9 * sc}px`;
  textStyle.fontSize = `${2.5 * sc}px`
  textStyle.lineHeight = `${2.5 * sc}px`



  textStyle.height = `${3.6 * sc}px`;
  textStyle.gridArea = "1 / 1 / 2 / 2";
  textStyle.width = "100%";
  textStyle.transition = "400ms ease";

  if (overDescriptions) {
    textStyle.color = "#dc3545";
  }

  const textUpStyle = {};

  if (overUpDescriptions) {
    textUpStyle.color = "#dc3545";
    textUpStyle.border = "2px solid #dc3545"
  }


  if (chosenTab === "text" && showTextBorder && !visual) {
    textStyle.border = "2px solid rgb(236, 105, 92)"
  }

  if (visual) {
    textStyle.color = "white";
    textStyle.textShadow = "0 0 5px rgba(255, 255, 255, 1)";
  }


  const textStyleFrame = {};
  textStyleFrame.backgroundColor = "transparent";
  textStyleFrame.color = chosenColor.iconColor;
  textStyleFrame.border = "2px dashed transparent"
  textStyleFrame.borderRadius = `${0.9 * sc}px`;
  textStyleFrame.fontSize = `${2.5 * sc}px`
  textStyleFrame.lineHeight = `${2.5 * sc}px`;
  textStyleFrame.height = `${3.6 * sc}px`;
  textStyleFrame.gridArea = "1 / 1 / 2 / 2";
  textStyleFrame.width = "100%";
  textStyleFrame.transition = "400ms ease";

  if (chosenTab === "frame" && showFrameTextBorder && chosenColor.RAL !== "SMOKED_GLASS") {
    textStyleFrame.border = "2px dashed rgb(236, 105, 92)"
  }

  if (visual) {
    textStyleFrame.color = "white";
    textStyleFrame.textShadow = "0 0 5px rgba(255, 255, 255, 1)";
    textStyleFrame.transition = "0.4s ease";
  }



  function showBorder(e) {
    if ((chosenTab === "text") && !showTextBorder && !isFocusedInputIndex) {
      e.target.style.border = "2px solid rgb(236, 105, 92)"
    }
  }


  function hideBorder(e) {
    if ((chosenTab === "text") && !showTextBorder && !isFocusedInputIndex) {
      e.target.style.border = "2px solid transparent"
    }
  }

  function showFrameBorder(e) {
    if ((chosenTab === "frame" && chosenColor.RAL !== "SMOKED_GLASS") && !showFrameTextBorder && !isFocusedInputFrame) {
      e.target.style.border = "2px dashed rgb(236, 105, 92)"
    }
  }


  function hideFrameBorder(e) {
    if ((chosenTab === "frame" && chosenColor.RAL !== "SMOKED_GLASS") && !showFrameTextBorder && !isFocusedInputFrame) {
      e.target.style.border = "2px dashed transparent"
    }
  }





  const handleVisual = () => {
    toggleVisual(!visual)
    const copyArr = iconHolders;
    copyArr.forEach((el) => {
      el.selectedDot = false;
      el.selected = false;
      el.selectedUp = false;
      el.selectedDown = false;
    })
    changeIconHolders(copyArr)
    changeIsAnySelected(false)
    setIsAnySplitSelected(false)
  }

  const handleClearAll = () => {
    setAlertAnswer(null)
    setRemoveAll(false)
    const tempArr = [];
    setHideAll(false)
    setFrameTitles(false)
    const modeltimeout = setTimeout(() => {
      setHideAll(true)
      chosenModel.dotLocation.forEach(element => {
        tempArr.push({
          flag: element, lastDroppedDot: null, lastDroppedIcon: null, lastDroppedSlashUp: null, lastDroppedSlashDown: null,
          selectedDot: false, selected: false, selectedUp: false, selectedDown: false, rotationDot: 0, rotationIcon: 0, rotationUp: 0, rotationDown: 0,
          textUp: "", fontUp: null, fontUpWeight: null, textDown: "", fontDown: null, fontDownWeight: null, singleFrameTemp: false, singleFrame: false,
          splitIconProportions: 0
        })
      });
      changeIconHolders(tempArr);

      const arrNewFrame = [];
      const arrNewFrameHide = [];
      const arrNewFrameChange = [];
      const arrTempFrame = { textX: 0, textY: 0, frameArr: [] };

      chosenModel.dotLocation.forEach(element => {
        arrNewFrame.push(element)
      });
      chosenModel.dotLocation.forEach(element => {
        arrNewFrameHide.push(element)
      });
      chosenModel.dotLocation.forEach(element => {
        arrNewFrameChange.push(element)
      });


      chosenModel.dotLocation.forEach(element => {
        arrTempFrame.frameArr.push({
          flag: element,
          rtl: 0, rtr: 0, rbr: 0, rbl: 0,
          t: 0, r: 0, b: 0, l: 0,
          fh: 0, fw: 0, mt: 0, mb: 0, ml: 0, mr: 0,
        })
      });
      setNewFrame(arrNewFrame)
      setNewFrameHide(arrNewFrameHide)
      setNewFrameChange(arrNewFrameChange)
      setTempFrame(arrTempFrame)
      changeFrameText("")
      changeFrameHolders([])
      changeFramesBackEnd([])



      const copyWarnings = warnings.filter(warning => warning.code === 7)
      updateWarnings(copyWarnings)
      if (chosenColor.RAL === "RAL 9003" && visual) {
        pushWarnings(0)
      }
      // ----------------------------------------------------------------------------------------------------------------BACKEND---------------------
      if (chosenModel.lcdScreen.lcdType === "slide") {
        const copyIconsBackEnd = []

        const universalIconArr = [
          {
            icon: Minusuni,
            number: 1,
            type: 0
          },
          {
            icon: Minusuni,
            number: 3,
            type: 0
          },
          {
            icon: Leftuni,
            number: 4,
            type: 0
          },
          {
            icon: Rightuni,
            number: 6,
            type: 0
          },
          {
            icon: Minusuni,
            number: 7,
            type: 0
          },
          {
            icon: Minusuni,
            number: 9,
            type: 0
          },
          {
            icon: noDotUni,
            number: 1,
            type: 3
          },
          {
            icon: noDotUni,
            number: 3,
            type: 3
          },
          {
            icon: noDotUni,
            number: 4,
            type: 3
          },
          {
            icon: noDotUni,
            number: 6,
            type: 3
          },
          {
            icon: noDotUni,
            number: 7,
            type: 3
          },
          {
            icon: noDotUni,
            number: 9,
            type: 3
          },
        ]

        universalIconArr.forEach(element => {
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
                proportion: 0,
                svg: svgBackEnd
              }
              copyIconsBackEnd.push(recordIcon)
              changeIconsBackEnd(copyIconsBackEnd)
            })
        })
      } else {
        changeIconsBackEnd([])
      }
      // ----------------------------------------------------------------------------------------------------------------/BACKEND---------------------
      changePanelTextBackEnd([])
      setTextFrame(false)
      chosenModel.lcdScreen ? setLcdShow(true) : setLcdShow(false)
    }, 300);
    return () => clearTimeout(modeltimeout);
  }

  const handleHideRemoveIcons = () => {
    if (alert !== 4) {
      showRemoveIcons(false)
    }
  }


  const handleClearAllIcons = () => {
    setAlertAnswer(null)
    showRemoveIcons(false)
    const copyArr = iconHolders;
    copyArr.forEach((el) => {
      el.lastDroppedDot = null;
      el.lastDroppedIcon = null;
      el.lastDroppedSlashUp = null;
      el.lastDroppedSlashDown = null;
      el.selectedDot = false;
      el.selected = false;
      el.selectedUp = false;
      el.selectedDown = false;
      el.rotationIcon = false;
      el.rotationUp = 0;
      el.rotationDown = 0;
      el.rotationDot = false;
      el.splitIconProportions = 0;
    })
    changeIconHolders(copyArr)
    // ----------------------------------------------------------------------------------------------------------------BACKEND---------------------
    if (chosenModel.lcdScreen.lcdType === "slide") {
      const copyIconsBackEnd = []

      const universalIconArr = [
        {
          icon: Minusuni,
          number: 1,
          type: 0
        },
        {
          icon: Minusuni,
          number: 3,
          type: 0
        },
        {
          icon: Leftuni,
          number: 4,
          type: 0
        },
        {
          icon: Rightuni,
          number: 6,
          type: 0
        },
        {
          icon: Minusuni,
          number: 7,
          type: 0
        },
        {
          icon: Minusuni,
          number: 9,
          type: 0
        },
        {
          icon: noDotUni,
          number: 1,
          type: 3
        },
        {
          icon: noDotUni,
          number: 3,
          type: 3
        },
        {
          icon: noDotUni,
          number: 4,
          type: 3
        },
        {
          icon: noDotUni,
          number: 6,
          type: 3
        },
        {
          icon: noDotUni,
          number: 7,
          type: 3
        },
        {
          icon: noDotUni,
          number: 9,
          type: 3
        },
      ]

      universalIconArr.forEach(element => {
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
              proportion: 0,
              svg: svgBackEnd
            }
            copyIconsBackEnd.push(recordIcon)
            changeIconsBackEnd(copyIconsBackEnd)
          })
      })
    } else {
      changeIconsBackEnd([])
    }
    // ----------------------------------------------------------------------------------------------------------------/BACKEND---------------------
  }

  const handleClearIcon = () => {
    showRemoveIcon(false)
    const copyArr = iconHolders;
    const copyIconsBackEnd = iconsBackEnd //---BACKEND
    copyArr.forEach((el, index) => {
      if (chosenModel.panelRotation) {
        let numberBackEnd = null
        if (chosenModel.panelRotation) {
          if (index % 3 === 0) {
            numberBackEnd = index + 3
          } else if (index % 3 === 2) {
            numberBackEnd = index - 1
          } else {
            numberBackEnd = index + 1
          }
        } else {
          numberBackEnd = index + 1
        }

        if (el.selectedDot) {
          el.lastDroppedDot = null;
          el.selectedDot = false;
          el.rotationDot = 0;
          copyIconsBackEnd.splice((copyIconsBackEnd.findIndex(icon => icon.number === numberBackEnd && icon.type === 3)), 1)
        } else if (el.selected) {
          el.lastDroppedIcon = null;
          el.selected = false;
          el.rotationIcon = 0;
          copyIconsBackEnd.splice((copyIconsBackEnd.findIndex(icon => icon.number === numberBackEnd && icon.type === 0)), 1)
        } else if (el.selectedDown) {
          el.lastDroppedSlashDown = null;
          el.selectedDown = false;
          el.rotationDown = 0;
          copyIconsBackEnd.splice((copyIconsBackEnd.findIndex(icon => icon.number === numberBackEnd && icon.type === 2)), 1)
        } else if (el.selectedUp) {
          el.lastDroppedSlashUp = null;
          el.selectedUp = false;
          el.rotationUp = 0;
          copyIconsBackEnd.splice((copyIconsBackEnd.findIndex(icon => icon.number === numberBackEnd && icon.type === 1)), 1)
        }
      } else {
        if (el.selectedDot) {
          el.lastDroppedDot = null;
          el.selectedDot = false;
          el.rotationDot = 0;
          copyIconsBackEnd.splice((copyIconsBackEnd.findIndex(icon => icon.number === index + 1 && icon.type === 3)), 1)
        } else if (el.selected) {
          el.lastDroppedIcon = null;
          el.selected = false;
          el.rotationIcon = 0;
          copyIconsBackEnd.splice((copyIconsBackEnd.findIndex(icon => icon.number === index + 1 && icon.type === 0)), 1)
        } else if (el.selectedDown) {
          el.lastDroppedSlashDown = null;
          el.selectedDown = false;
          el.rotationDown = 0;
          copyIconsBackEnd.splice((copyIconsBackEnd.findIndex(icon => icon.number === index + 1 && icon.type === 2)), 1)
        } else if (el.selectedUp) {
          el.lastDroppedSlashUp = null;
          el.selectedUp = false;
          el.rotationUp = 0;
          copyIconsBackEnd.splice((copyIconsBackEnd.findIndex(icon => icon.number === index + 1 && icon.type === 1)), 1)
        }
      }
    })
    changeIconHolders(copyArr)
    changeIconsBackEnd(copyIconsBackEnd)
  }

  function Modulo(num, denom) {
    if (num % denom >= 0) {
      return Math.abs(num % denom);
    }
    else {
      return num % denom + denom;
    }
  }

  const handleRotateRight = () => {
    const copyArr = iconHolders;
    const copyIconsBackEnd = iconsBackEnd //---BACKEND
    copyArr.forEach((el, index) => {
      if (chosenModel.panelRotation) {
        let numberBackEnd = null
        if (chosenModel.panelRotation) {
          if (index % 3 === 0) {
            numberBackEnd = index + 3
          } else if (index % 3 === 2) {
            numberBackEnd = index - 1
          } else {
            numberBackEnd = index + 1
          }
        } else {
          numberBackEnd = index + 1
        }

        if (el.selectedDot) {
          el.rotationDot = el.rotationDot + 90;
          copyIconsBackEnd[copyIconsBackEnd.findIndex(icon => icon.number === numberBackEnd && icon.type === 3)].rotation = Modulo((el.rotationDot), 360)//---BACKEND
        } else if (el.selected) {
          el.rotationIcon = el.rotationIcon + 90;
          copyIconsBackEnd[copyIconsBackEnd.findIndex(icon => icon.number === numberBackEnd && icon.type === 0)].rotation = Modulo((el.rotationIcon), 360)//---BACKEND
        } else if (el.selectedDown) {
          el.rotationDown = el.rotationDown + 90;
          copyIconsBackEnd[copyIconsBackEnd.findIndex(icon => icon.number === numberBackEnd && icon.type === 2)].rotation = Modulo((el.rotationDown), 360)//---BACKEND
        } else if (el.selectedUp) {
          el.rotationUp = el.rotationUp + 90;
          copyIconsBackEnd[copyIconsBackEnd.findIndex(icon => icon.number === numberBackEnd && icon.type === 1)].rotation = Modulo((el.rotationUp), 360)//---BACKEND
        }
      } else {
        if (el.selectedDot) {
          el.rotationDot = el.rotationDot + 90;
          copyIconsBackEnd[copyIconsBackEnd.findIndex(icon => icon.number === index + 1 && icon.type === 3)].rotation = Modulo((el.rotationDot), 360)//---BACKEND
        } else if (el.selected) {
          el.rotationIcon = el.rotationIcon + 90;
          copyIconsBackEnd[copyIconsBackEnd.findIndex(icon => icon.number === index + 1 && icon.type === 0)].rotation = Modulo((el.rotationIcon), 360)//---BACKEND
        } else if (el.selectedDown) {
          el.rotationDown = el.rotationDown + 90;
          copyIconsBackEnd[copyIconsBackEnd.findIndex(icon => icon.number === index + 1 && icon.type === 2)].rotation = Modulo((el.rotationDown), 360)//---BACKEND
        } else if (el.selectedUp) {
          el.rotationUp = el.rotationUp + 90;
          copyIconsBackEnd[copyIconsBackEnd.findIndex(icon => icon.number === index + 1 && icon.type === 1)].rotation = Modulo((el.rotationUp), 360)//---BACKEND
        }
      }
    })
    changeIconHolders(copyArr)
    changeIconsBackEnd(copyIconsBackEnd)//---BACKEND
  }

  const handleRotateLeft = () => {
    const copyArr = iconHolders;
    const copyIconsBackEnd = iconsBackEnd //---BACKEND
    copyArr.forEach((el, index) => {
      if (chosenModel.panelRotation) {
        let numberBackEnd = null
        if (chosenModel.panelRotation) {
          if (index % 3 === 0) {
            numberBackEnd = index + 3
          } else if (index % 3 === 2) {
            numberBackEnd = index - 1
          } else {
            numberBackEnd = index + 1
          }
        } else {
          numberBackEnd = index + 1
        }

        if (el.selectedDot) {
          el.rotationDot = el.rotationDot - 90;
          copyIconsBackEnd[copyIconsBackEnd.findIndex(icon => icon.number === numberBackEnd && icon.type === 3)].rotation = Modulo((el.rotationDot), 360)//---BACKEND
        } else if (el.selected) {
          el.rotationIcon = el.rotationIcon - 90;
          copyIconsBackEnd[copyIconsBackEnd.findIndex(icon => icon.number === numberBackEnd && icon.type === 0)].rotation = Modulo((el.rotationIcon), 360)//---BACKEND
        } else if (el.selectedDown) {
          el.rotationDown = el.rotationDown - 90;
          copyIconsBackEnd[copyIconsBackEnd.findIndex(icon => icon.number === numberBackEnd && icon.type === 2)].rotation = Modulo((el.rotationDown), 360)//---BACKEND
        } else if (el.selectedUp) {
          el.rotationUp = el.rotationUp - 90;
          copyIconsBackEnd[copyIconsBackEnd.findIndex(icon => icon.number === numberBackEnd && icon.type === 1)].rotation = Modulo((el.rotationUp), 360)//---BACKEND
        }
      } else {
        if (el.selectedDot) {
          el.rotationDot = el.rotationDot - 90;
          copyIconsBackEnd[copyIconsBackEnd.findIndex(icon => icon.number === index + 1 && icon.type === 3)].rotation = Modulo((el.rotationDot), 360)//---BACKEND
        } else if (el.selected) {
          el.rotationIcon = el.rotationIcon - 90;
          copyIconsBackEnd[copyIconsBackEnd.findIndex(icon => icon.number === index + 1 && icon.type === 0)].rotation = Modulo((el.rotationIcon), 360)//---BACKEND
        } else if (el.selectedDown) {
          el.rotationDown = el.rotationDown - 90;
          copyIconsBackEnd[copyIconsBackEnd.findIndex(icon => icon.number === index + 1 && icon.type === 2)].rotation = Modulo((el.rotationDown), 360)//---BACKEND
        } else if (el.selectedUp) {
          el.rotationUp = el.rotationUp - 90;
          copyIconsBackEnd[copyIconsBackEnd.findIndex(icon => icon.number === index + 1 && icon.type === 1)].rotation = Modulo((el.rotationUp), 360)//---BACKEND
        }
      }
    })
    changeIconHolders(copyArr)
    changeIconsBackEnd(copyIconsBackEnd)//---BACKEND
  }



  const handleSwitchSplitIconProportionsGlobal = () => {
    const copyArr = iconHolders;
    const copyIconsBackEnd = iconsBackEnd //---BACKEND
    copyArr.forEach((el) => {
      if (globalProportions === 0) {
        el.splitIconProportions = 1
      } else if (globalProportions === 1) {
        el.splitIconProportions = 2
      } else if (globalProportions === 2 || globalProportions === 3) {
        el.splitIconProportions = 0
      }

      copyIconsBackEnd.forEach((el) => {
        if (globalProportions === 0) {
          el.proportion = 1
        } else if (globalProportions === 1) {
          el.proportion = 2
        } else if (globalProportions === 2 || globalProportions === 3) {
          el.proportion = 0
        }
      })


    })
    changeIconHolders(copyArr)
    changeIconsBackEnd(copyIconsBackEnd)//---BACKEND
  }

  const handleSwitchSplitIconProportions = () => {
    const copyArr = iconHolders;
    const copyIconsBackEnd = iconsBackEnd //---BACKEND

    copyArr.forEach((el, index) => {
      console.log("test", copyIconsBackEnd.findIndex(icon => icon.number === index + 1 && icon.type === 1))
      if (el.selectedUp || el.selectedDown) {
        if (el.splitIconProportions === 0) {
          el.splitIconProportions = 1
          if (copyIconsBackEnd.findIndex(icon => icon.number === index + 1 && icon.type === 1) > -1) {
            copyIconsBackEnd[copyIconsBackEnd.findIndex(icon => icon.number === index + 1 && icon.type === 1)].proportion = 1
          }
          if (copyIconsBackEnd.findIndex(icon => icon.number === index + 1 && icon.type === 2) > -1) {
            copyIconsBackEnd[copyIconsBackEnd.findIndex(icon => icon.number === index + 1 && icon.type === 2)].proportion = 1
          }
        } else if (el.splitIconProportions === 1) {
          el.splitIconProportions = 2
          if (copyIconsBackEnd.findIndex(icon => icon.number === index + 1 && icon.type === 1) > -1) {
            copyIconsBackEnd[copyIconsBackEnd.findIndex(icon => icon.number === index + 1 && icon.type === 1)].proportion = 2
          }
          if (copyIconsBackEnd.findIndex(icon => icon.number === index + 1 && icon.type === 2) > -1) {
            copyIconsBackEnd[copyIconsBackEnd.findIndex(icon => icon.number === index + 1 && icon.type === 2)].proportion = 2
          }
        } else if (el.splitIconProportions === 2) {
          el.splitIconProportions = 0
          if (copyIconsBackEnd.findIndex(icon => icon.number === index + 1 && icon.type === 1) > -1) {
            copyIconsBackEnd[copyIconsBackEnd.findIndex(icon => icon.number === index + 1 && icon.type === 1)].proportion = 0
          }
          if (copyIconsBackEnd.findIndex(icon => icon.number === index + 1 && icon.type === 2) > -1) {
            copyIconsBackEnd[copyIconsBackEnd.findIndex(icon => icon.number === index + 1 && icon.type === 2)].proportion = 0
          }
        }
      }
    })




    changeIconHolders(copyArr)
    changeIconsBackEnd(copyIconsBackEnd)//---BACKEND
  }


  const handleTextUpOff = () => {
    toggleTextUp()
    const copyArr = iconHolders;
    copyArr.forEach((el) => {
      el.textUp = "";
      el.fontUp = null;
      el.fontUpWeight = null;
    })
    changeIconHolders(copyArr)

    // ----------------------------------------------------------------------------------------------------------------BACKEND---------------------
    const copyPanelTextBackEnd = panelTextBackEnd.filter(element => element.type === 0)
    changePanelTextBackEnd(copyPanelTextBackEnd)
    // ----------------------------------------------------------------------------------------------------------------/BACKEND---------------------

  }

  const handleClearAllText = () => {
    setAlertAnswer(null)
    const copyArr = iconHolders;
    copyArr.forEach((el) => {
      el.textUp = "";
      el.fontUp = null;
      el.fontUpWeight = null;
      el.textDown = "";
      el.fontDown = null;
      el.fontDownWeight = null;
    })
    changeIconHolders(copyArr)
    changePanelTextBackEnd([])
    filterWarnings(3)
  }


  const handleChangeTextUp = (index, text) => {
    const copyArr = iconHolders;
    copyArr[index].textUp = text.target.value.toUpperCase()
    changeIconHolders(copyArr)
    setRerenderTextWarning(prev => !prev)
    // ----------------------------------------------------------------------------------------------------------------BACKEND---------------------
    const copyPanelTextBackEnd = panelTextBackEnd

    let numberBackEnd = null
    if (chosenModel.panelRotation) {
      if (index % 3 === 0) {
        numberBackEnd = index + 3
      } else if (index % 3 === 2) {
        numberBackEnd = index - 1
      } else {
        numberBackEnd = index + 1
      }
    } else {
      numberBackEnd = index + 1
    }

    let recordTextIndex = copyPanelTextBackEnd.map(item => item.number).indexOf(numberBackEnd)

    let recordText = {
      number: numberBackEnd,
      type: 1,
      title: text.target.value.toUpperCase(),
      // font: chosenTextFont,
      // fontWeight: chosenTextWeight
      font: chosenTextWeight === "700" && !chosenTextFont.includes("-bold") ? `${chosenTextFont}-bold` : chosenTextFont

    }
    if (recordTextIndex > -1) {
      if (copyPanelTextBackEnd[recordTextIndex].type === 1) {
        copyPanelTextBackEnd.splice(recordTextIndex, 1, recordText)
      }
      else if (copyPanelTextBackEnd[recordTextIndex].type === 0) {
        let recordTextLastIndex = copyPanelTextBackEnd.map(item => item.number).lastIndexOf(numberBackEnd)
        if (recordTextLastIndex > -1) {
          if (copyPanelTextBackEnd[recordTextLastIndex].type === 1) {
            copyPanelTextBackEnd.splice(recordTextLastIndex, 1, recordText)
          } else {
            copyPanelTextBackEnd.push(recordText)
          }
        }
      }
    } else {
      copyPanelTextBackEnd.push(recordText)
    }

    // let recordTextIndex = copyPanelTextBackEnd.map(item => item.number).indexOf(index + 1)

    // let recordText = {
    //   number: index + 1,
    //   type: 1,
    //   title: text.target.value.toUpperCase(),
    //   font: chosenTextFont
    // }
    // if (recordTextIndex > -1) {
    //   if (copyPanelTextBackEnd[recordTextIndex].type === 1) {
    //     copyPanelTextBackEnd.splice(recordTextIndex, 1, recordText)
    //   }
    //   else if (copyPanelTextBackEnd[recordTextIndex].type === 0) {
    //     let recordTextLastIndex = copyPanelTextBackEnd.map(item => item.number).lastIndexOf(index + 1)
    //     if (recordTextLastIndex > -1) {
    //       if (copyPanelTextBackEnd[recordTextLastIndex].type === 1) {
    //         copyPanelTextBackEnd.splice(recordTextLastIndex, 1, recordText)
    //       } else {
    //         copyPanelTextBackEnd.push(recordText)
    //       }
    //     }
    //   }
    // } else {
    //   copyPanelTextBackEnd.push(recordText)
    // }


    changePanelTextBackEnd(copyPanelTextBackEnd)
    // ----------------------------------------------------------------------------------------------------------------/BACKEND---------------------
  };


  const handleChangeTextDown = (index, text) => {
    const copyArr = iconHolders;
    copyArr[index].textDown = text.target.value.toUpperCase()
    changeIconHolders(copyArr)
    setRerenderTextWarning(prev => !prev)

    // ----------------------------------------------------------------------------------------------------------------BACKEND---------------------
    const copyPanelTextBackEnd = panelTextBackEnd

    let numberBackEnd = null
    if (chosenModel.panelRotation) {
      if (index % 3 === 0) {
        numberBackEnd = index + 3
      } else if (index % 3 === 2) {
        numberBackEnd = index - 1
      } else {
        numberBackEnd = index + 1
      }
    } else {
      numberBackEnd = index + 1
    }


    let recordTextIndex = copyPanelTextBackEnd.map(item => item.number).indexOf(numberBackEnd)

    let recordText = {
      number: numberBackEnd,
      type: 0,
      title: text.target.value.toUpperCase(),
      font: chosenTextWeight === "700" && !chosenTextFont.includes("-bold") ? `${chosenTextFont}-bold` : chosenTextFont
      // fontWeight: chosenTextWeight
    }
    if (recordTextIndex > -1) {
      if (copyPanelTextBackEnd[recordTextIndex].type === 0) {
        copyPanelTextBackEnd.splice(recordTextIndex, 1, recordText)
      }
      else if (copyPanelTextBackEnd[recordTextIndex].type === 1) {
        let recordTextLastIndex = copyPanelTextBackEnd.map(item => item.number).lastIndexOf(numberBackEnd)
        if (recordTextLastIndex > -1) {
          if (copyPanelTextBackEnd[recordTextLastIndex].type === 0) {
            copyPanelTextBackEnd.splice(recordTextLastIndex, 1, recordText)
          } else {
            copyPanelTextBackEnd.push(recordText)
          }
        }
      }
    } else {
      copyPanelTextBackEnd.push(recordText)
    }
    // let recordTextIndex = copyPanelTextBackEnd.map(item => item.number).indexOf(index + 1)

    // let recordText = {
    //   number: index + 1,
    //   type: 0,
    //   title: text.target.value.toUpperCase(),
    //   font: chosenTextFont
    // }
    // if (recordTextIndex > -1) {
    //   if (copyPanelTextBackEnd[recordTextIndex].type === 0) {
    //     copyPanelTextBackEnd.splice(recordTextIndex, 1, recordText)
    //   }
    //   else if (copyPanelTextBackEnd[recordTextIndex].type === 1) {
    //     let recordTextLastIndex = copyPanelTextBackEnd.map(item => item.number).lastIndexOf(index + 1)
    //     if (recordTextLastIndex > -1) {
    //       if (copyPanelTextBackEnd[recordTextLastIndex].type === 0) {
    //         copyPanelTextBackEnd.splice(recordTextLastIndex, 1, recordText)
    //       } else {
    //         copyPanelTextBackEnd.push(recordText)
    //       }
    //     }
    //   }
    // } else {
    //   copyPanelTextBackEnd.push(recordText)
    // }
    changePanelTextBackEnd(copyPanelTextBackEnd)
    // ----------------------------------------------------------------------------------------------------------------/BACKEND---------------------
  };


  const handleChangeFontDown = (index) => {
    const copyArr = iconHolders;
    copyArr[index].fontDown = chosenTextFont
    copyArr[index].fontDownWeight = chosenTextWeight
    changeIconHolders(copyArr)
    // ----------------------------------------------------------------------------------------------------------------BACKEND---------------------
    const copyPanelTextBackEnd = panelTextBackEnd
    copyPanelTextBackEnd.forEach(element => {
      if ((element.number === index + 1) && element.type === 0) {
        // element.font = chosenTextFont
        // element.fontWeight = chosenTextWeight
        element.font = chosenTextWeight === "700" && !chosenTextFont.includes("-bold") ? `${chosenTextFont}-bold` : chosenTextFont
      }
    })
    changePanelTextBackEnd(copyPanelTextBackEnd)
    // ----------------------------------------------------------------------------------------------------------------/BACKEND---------------------
  }


  const handleChangeFontUp = (index) => {
    const copyArr = iconHolders;
    copyArr[index].fontUp = chosenTextFont
    copyArr[index].fontUpWeight = chosenTextWeight
    changeIconHolders(copyArr)

    // ----------------------------------------------------------------------------------------------------------------BACKEND---------------------
    const copyPanelTextBackEnd = panelTextBackEnd
    copyPanelTextBackEnd.forEach(element => {
      if ((element.number === index + 1) && element.type === 1) {
        // element.font = chosenTextFont
        element.font = chosenTextWeight === "700" && !chosenTextFont.includes("-bold") ? `${chosenTextFont}-bold` : chosenTextFont
        // element.fontWeight = chosenTextWeight
      }
    })
    changePanelTextBackEnd(copyPanelTextBackEnd)
    // ----------------------------------------------------------------------------------------------------------------/BACKEND---------------------
  }




  const handleSetOneFont = () => {
    const copyArr = iconHolders;
    copyArr.forEach((el) => {
      el.fontUp = chosenTextFont;
      el.fontUpWeight = chosenTextWeight;
      el.fontDown = chosenTextFont;
      el.fontDownWeight = chosenTextWeight;
    })
    changeIconHolders(copyArr)
    filterWarnings(3)

    // ----------------------------------------------------------------------------------------------------------------BACKEND---------------------
    const copyPanelTextBackEnd = panelTextBackEnd
    copyPanelTextBackEnd.forEach(element => {
      // element.font = chosenTextFont
      // element.fontWeight = chosenTextWeight
      element.font = chosenTextWeight === "700" && !chosenTextFont.includes("-bold") ? `${chosenTextFont}-bold` : chosenTextFont
    })
    changePanelTextBackEnd(copyPanelTextBackEnd)
    // ----------------------------------------------------------------------------------------------------------------/BACKEND---------------------

  }

  const handleSetOneFrameFont = () => {
    const copyFrameHolders = frameHolders
    copyFrameHolders.forEach((el) => {
      el.framePrint.frameFont = chosenFrameFont
      el.framePrint.frameFontWeight = chosenFrameFontWeight
      el.framePrint.frameFontInfo = chosenFrameFontInfo
    })
    changeFrameHolders(copyFrameHolders)
    filterWarnings(4)
    overFrameReRender()
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFocusedInputIndex(null)
    setIsFocusedInputSide(null)
    setIsFocusedInputFrame(false)
    setIsFocusedInputName(false)
  }


  const handleKeyPress = (e) => {
    if (e.keyCode === 13 || e.keyCode === 27) {
      e.target.blur();
      setIsFocusedInputIndex(null)
      setIsFocusedInputSide(null)
      setIsFocusedInputFrame(false)
      setIsFocusedInputName(false)
    }
  }

  const handleFocusInput = (index, side) => {
    setIsFocusedInputIndex(index)
    setIsFocusedInputSide(side)
  }


  const handleClearInput = (index, side) => {
    // ----------------------------------------------------------------------------------------------------------------BACKEND---------------------
    const copyPanelTextBackEnd = panelTextBackEnd

    let numberBackEnd = null
    if (chosenModel.panelRotation) {
      if (index % 3 === 0) {
        numberBackEnd = index + 3
      } else if (index % 3 === 2) {
        numberBackEnd = index - 1
      } else {
        numberBackEnd = index + 1
      }
    } else {
      numberBackEnd = index + 1
    }

    let recordTextIndex = copyPanelTextBackEnd.map(item => item.number).indexOf(numberBackEnd)

    const copyArr = iconHolders;
    if (side === "up") {
      copyArr[index].textUp = "";
      copyArr[index].fontUp = null;
      copyArr[index].fontUpWeight = null;
      if (copyPanelTextBackEnd[recordTextIndex] && copyPanelTextBackEnd[recordTextIndex].type === 1) {
        copyPanelTextBackEnd.splice(recordTextIndex, 1)
      }
    } else if (side === "down") {
      copyArr[index].textDown = "";
      copyArr[index].fontDown = null;
      copyArr[index].fontDownWeight = null;
      if (copyPanelTextBackEnd[recordTextIndex] && copyPanelTextBackEnd[recordTextIndex].type === 0) {
        copyPanelTextBackEnd.splice(recordTextIndex, 1)
      }
    }
    changeIconHolders(copyArr)
    setIsFocusedInputIndex(null)
    setIsFocusedInputSide(null)

    changePanelTextBackEnd(copyPanelTextBackEnd)
    // ----------------------------------------------------------------------------------------------------------------/BACKEND---------------------
  }





  const handleClearInputFrame = () => {
    changeFrameText("")
    setIsFocusedInputFrame(false)
  }

  const handleClearInputName = () => {
    changePanelName("")
    changePanelNameBackEnd("")
    setIsFocusedInputName(false)
  }

  const handleShowWarnings = () => {
    const copyWarnings = warnings
    copyWarnings.forEach(warning => {
      warning.show = true
      warning.hide = false
    })
    updateWarnings(copyWarnings)
  }

  const handleHideWarnings = () => {
    const copyWarnings = warnings
    copyWarnings.forEach(warning => {
      warning.show = false
      warning.hide = false
    })
    updateWarnings(copyWarnings)
  }




  const handleFrameOver = ((index) => {
    const copyArr = newFrame;
    const copyArrChange = newFrameChange;

    if (copyArr[index] === 1) {
      copyArrChange[index] = "a";

      //poziomo: automatyczne zaznaczenie środkowego kiedy lewy był zaznaczony i zaznacza się prawy
      if (((index % 3) === 2) && copyArr[index - 2] === "s" && copyArr[index - 1] !== 0) {
        copyArrChange[index - 1] = "a";
      }
      //poziomo: automatyczne zaznaczenie środkowego kiedy prawy był zaznaczony i zaznacza się lewy
      if ((index % 3 === 0) && copyArr[index + 2] === "s" && copyArr[index + 1] !== 0) {
        copyArrChange[index + 1] = "a";
      }
      //pionowo: automatyczne zaznaczenie pośrednich kiedy wyżej był zaznaczony i zaznacza się nizszy
      for (let i = 0; i < index; i++) {
        if (i % 3 === index % 3 && copyArr[i] === "s" && i + 3 < index) {
          for (let j = i; j < index; j++) {
            if (j % 3 === index % 3) {
              copyArrChange[j] = "a"
            }
          }
        }
      }
      //pionowo: automatyczne zaznaczenie pośrednich kiedy niżej był zaznaczony i zaznacza się wyższy
      for (let i = copyArr.length; i > index; i--) {
        if (i % 3 === index % 3 && copyArr[i] === "s" && i - 3 > index) {
          for (let j = i; j >= index; j--) {
            if (j % 3 === index % 3) {
              copyArrChange[j] = "a"
            }
          }
        }
      }
      //3d: automatyczne zaznaczenie pośrednich kiedy niższy był zaznaczony i zaznacza się wyższy, skrajne prawe
      for (let i = 0; i < index; i++) {
        if (copyArr[i] === "s" && i % 3 === 0 && index % 3 === 2) {
          for (let j = i; j <= index; j++) {
            copyArrChange[j] = "a"
          }
        }
      }
      //3d: automatyczne zaznaczenie pośrednich kiedy wyższy był zaznaczony i zaznacza się niższy, skrajne prawe
      for (let i = copyArr.length; i > index; i--) {
        if (copyArr[i] === "s" && i % 3 === 0 && index % 3 === 2) {
          for (let j = i + 2; j >= index - 2; j--) {
            copyArrChange[j] = "a"
          }
        }
      }
      //3d: automatyczne zaznaczenie pośrednich kiedy niższy był zaznaczony i zaznacza się wyższy, skrajne lewe, tylko prawy zaznaczony
      for (let i = 2; i < index; i++) {
        if (copyArr[i] === "s" && i % 3 === 2 && index % 3 === 0) {
          for (let j = i - 2; j <= index + 2; j++) {
            copyArrChange[j] = "a"
          }
        }
      }
      //3d: automatyczne zaznaczenie pośrednich kiedy niższy był zaznaczony i zaznacza się wyższy, skrajne lewe, prawy i środkowy zaznaczony  
      for (let i = 0; i < index; i++) {
        if (copyArr[i] === "s" && copyArr[i + 1] === "s" && i % 3 === 1 && index % 3 === 0) {
          for (let j = i - 1; j <= index + 2; j++) {
            copyArrChange[j] = "a"
          }
        }
      }
      //3d: automatyczne zaznaczenie pośrednich kiedy niższy był zaznaczony i zaznacza się wyższy, skrajne lewe, zaznaczony tylko środkowy rząd
      for (let i = 0; i < index; i++) {
        if (copyArr[i] === "s" && copyArr[i + 1] !== "s" && i % 3 === 1 && index % 3 === 0) {
          for (let j = i - 1; j < index + 2; j++) {
            if (j % 3 !== 2) {
              copyArrChange[j] = "a"
            }
          }
        }
      }
      //3d: automatyczne zaznaczenie pośrednich kiedy niższy był zaznaczony i zaznacza się wyższy, środek, zaznaczony tylko prawy rząd
      for (let i = 0; i < index; i++) {
        if (copyArr[i] === "s" && copyArr[i - 1] !== "s" && i % 3 === 2 && index % 3 === 1) {
          for (let j = i - 1; j < index + 2; j++) {
            if (j % 3 !== 0) {
              copyArrChange[j] = "a"
            }
          }
        }
      }
      //3d: automatyczne zaznaczenie pośrednich kiedy wyższy był zaznaczony i zaznacza się niższy, środek, zaznaczony tylko lewy rząd
      for (let i = copyArr.length; i > index; i--) {
        if (copyArr[i] === "s" && i % 3 === 0 && index % 3 === 1) {
          for (let j = i + 1; j >= index - 1; j--) {
            if (j % 3 !== 2) {
              copyArrChange[j] = "a"
            }
          }
        }
      }
      //3d: automatyczne zaznaczenie pośrednich kiedy wyższy był zaznaczony i zaznacza się niższy, skrajne lewe
      for (let i = copyArr.length; i > index; i--) {
        if (copyArr[i] === "s" && i % 3 - 2 === index % 3) {
          for (let j = i; j > index; j--) {
            copyArrChange[j] = "a"
          }
        }
      }

      //3d: automatyczne zaznaczenie pośrednich kiedy wyższy był zaznaczony i zaznacza się niższy, skrajne prawe----
      for (let i = copyArr.length - 1; i > index; i--) {
        if (copyArr[i] === "s" && copyArr[i - 1] === "s" && i % 3 === 1 && index % 3 === 2) {
          for (let j = i + 1; j > index - 2; j--) {
            copyArrChange[j] = "a"
          }
        }
      }
      //3d: automatyczne zaznaczenie pośrednich kiedy wyższy był zaznaczony i zaznacza się niższy, zaznaczony tylko środkowy rząd
      for (let i = copyArr.length - 1; i > index; i--) {
        if (copyArr[i] === "s" && copyArr[i - 1] !== "s" && i % 3 === 1 && index % 3 === 2) {
          for (let j = i + 1; j > index - 2; j--) {
            if (j % 3 !== 0) {
              copyArrChange[j] = "a"
            }
          }
        }
      }
      //3d: automatyczne zaznaczenie pośrednich kiedy niższy był zaznaczony i zaznacza się niższy, sąsiednie lewe
      for (let i = 0; i < index; i++) {
        if (copyArr[i] === "s" && i % 3 === 0 && index % 3 === 1) {
          for (let j = i; j < index; j++) {
            if (j % 3 !== 2)
              copyArrChange[j] = "a"
          }
        }
      }
      //3d: automatyczne zaznaczenie pośrednich kiedy wyższy był zaznaczony i zaznacza się niższy, sąsiednie lewe
      for (let i = copyArr.length; i > index; i--) {
        if (copyArr[i] === "s" && i % 3 === 1 && index % 3 === 0) {
          for (let j = i; j > index; j--)
            if (j % 3 !== 2)
              copyArrChange[j] = "a"
        }
      }
      //3d: automatyczne zaznaczenie pośrednich kiedy niższy był zaznaczony i zaznacza się wyższy, sąsiednie prawe
      for (let i = 0; i < index; i++) {
        if (copyArr[i] === "s" && i % 3 === 1 && index % 3 === 2) {
          for (let j = i; j < index; j++)
            if (j % 3 !== 0)
              copyArrChange[j] = "a"
        }
      }
      //3d: automatyczne zaznaczenie pośrednich kiedy wyższy był zaznaczony i zaznacza się niższy, sąsiednie prawe
      for (let i = copyArr.length; i > index; i--) {
        if (copyArr[i] === "s" && i % 3 === 2 && index % 3 === 1) {
          for (let j = i; j > index; j--)
            if (j % 3 !== 0)
              copyArrChange[j] = "a"
        }
      }
      //dodawanie rzędu na 3: automatyczne zaznaczenie całego rzędu kiedy niższy był zaznaczony i zaznacza się wyższy,
      for (let i = 0; i < index; i++) {
        if (copyArr[i] === "s" && i % 3 === 0 && copyArr[i + 1] === "s" && copyArr[i + 2] === "s") {
          for (let j = i + 3; j < index; j++) {
            copyArrChange[j] = "a"
          }
          if (index % 3 === 0) {
            copyArrChange[index + 1] = "a"
            copyArrChange[index + 2] = "a"
          }
          if (index % 3 === 1) {
            copyArrChange[index + 1] = "a"
          }
        }
      }
      //dodawanie rzędu na 3: automatyczne zaznaczenie całego rzędu kiedy wyższy był zaznaczony i zaznacza się niższy ,
      for (let i = copyArr.length; i > index; i--) {
        if (copyArr[i] === "s" && i % 3 === 2 && copyArr[i - 1] === "s" && copyArr[i - 2] === "s") {
          for (let j = i - 3; j > index; j--) {
            copyArrChange[j] = "a"
          }
          if (index % 3 === 2) {
            copyArrChange[index - 1] = "a"
            copyArrChange[index - 2] = "a"
          }
          if (index % 3 === 1) {
            copyArrChange[index - 1] = "a"
          }
        }
      }
      //dodawanie rzędu na 2 lewego: automatyczne zaznaczenie całego rzędu kiedy niższy był zaznaczony i zaznacza się wyższy,
      for (let i = 0; i < index; i++) {
        if (copyArr[i] === "s" && i % 3 === 0 && copyArr[i + 1] === "s") {
          for (let j = i + 3; j < index; j++) {
            if (j % 3 !== 2) {
              copyArrChange[j] = "a"
            }
          }
          if (index % 3 === 0) {
            copyArrChange[index + 1] = "a"
          }
        }
      }
      //dodawanie rzędu na 2 lewego: automatyczne zaznaczenie całego rzędu kiedy wyższy  był zaznaczony i zaznacza się niższy,
      for (let i = copyArr.length; i > index; i--) {
        if (copyArr[i] === "s" && i % 3 === 1 && copyArr[i - 1] === "s") {
          for (let j = i - 3; j > index; j--) {
            if (j % 3 !== 2) {
              copyArrChange[j] = "a"
            }
          }
          if (index % 3 === 1) {
            copyArrChange[index - 1] = "a"
          }
        }
      }
      //dodawanie rzędu na 2 prawego: automatyczne zaznaczenie całego rzędu kiedy niższy był zaznaczony i zaznacza się wyższy,
      for (let i = 0; i < index; i++) {
        if (copyArr[i] === "s" && i % 3 === 1 && copyArr[i + 1] === "s") {
          for (let j = i + 3; j < index; j++) {
            if (j % 3 !== 0) {
              copyArrChange[j] = "a"
            }
          }
          if (index % 3 === 1) {
            copyArrChange[index + 1] = "a"
          }
        }
      }
      //dodawanie rzędu na 2 prawego: automatyczne zaznaczenie całego rzędu kiedy wyższy był zaznaczony i zaznacza się niższy,
      for (let i = copyArr.length; i > index; i--) {
        if (copyArr[i] === "s" && i % 3 === 2 && copyArr[i - 1] === "s") {
          for (let j = i - 3; j > index; j--) {
            if (j % 3 !== 0) {
              copyArrChange[j] = "a"
            }
          }
          if (index % 3 === 2) {
            copyArrChange[index - 1] = "a"
          }
        }
      }
      // dodawanie prawej kolumny, dwie lewe zaznaczone, środek zaznaczony: 
      for (let i = 0; i < copyArr.length; i++) {
        if (i % 3 === 0 && copyArr[i] === "s" && copyArr[i + 1] === "s" && copyArr[i + 3] === "s" && copyArr[i + 4] === "s" && index % 3 === 2) {
          for (let j = copyArr.length - 1; j > i; j--) {
            if (j % 3 === 1 && copyArr[j] === "s" && index <= j + 1 && index >= i + 2) {
              for (let k = j + 1; k > i + 2; k--) {
                if (k % 3 === 2) {
                  copyArrChange[k] = "a"
                }
              }
            }
          }
        }
      }
      // dodawanie środkowej kolumny, lewa zaznaczona: 
      for (let i = 0; i < copyArr.length; i++) {
        if (i % 3 === 0 && copyArr[i] === "s" && copyArr[i + 3] === "s" && index % 3 === 1) {
          for (let j = copyArr.length - 2; j > i; j--) {
            if (j % 3 === 0 && copyArr[j] === "s" && index <= j + 1 && index >= i + 1) {
              for (let k = j + 1; k > i + 1; k--) {
                if (k % 3 === 1) {
                  copyArrChange[k] = "a"
                }
              }
            }
          }
        }
      }
      // dodawanie środkowej i prawej kolumny, lewa zaznaczona: 
      for (let i = 0; i < copyArr.length; i++) {
        if (i % 3 === 0 && copyArr[i] === "s" && copyArr[i + 3] === "s" && index % 3 === 2) {
          for (let j = copyArr.length; j > i; j--) {
            if (j % 3 === 0 && copyArr[j] === "s" && index <= j + 2 && index >= i + 2) {
              for (let k = j + 2; k > i + 1; k--) {
                copyArrChange[k] = "a"
              }
            }
          }
        }
      }
      // dodawanie środkowej kolumny, prawa zaznaczona: 
      for (let i = 0; i < copyArr.length; i++) {
        if (i % 3 === 2 && copyArr[i] === "s" && copyArr[i + 3] === "s" && index % 3 === 1) {
          for (let j = copyArr.length; j > i; j--) {
            if (j % 3 === 2 && copyArr[j] === "s" && index <= j - 1 && index >= i - 1) {
              for (let k = j - 1; k >= i - 1; k--) {
                if (k % 3 === 1) {
                  copyArrChange[k] = "a"
                }
              }
            }
          }
        }
      }
      // dodawanie lewej i środkowej kolumny, prawa zaznaczona: 
      for (let i = 0; i < copyArr.length; i++) {
        if (i % 3 === 2 && copyArr[i] === "s" && copyArr[i + 3] === "s" && index % 3 === 0) {
          for (let j = copyArr.length; j > i; j--) {
            if (j % 3 === 2 && copyArr[j] === "s" && index <= j - 2 && index >= i - 2) {
              for (let k = j - 1; k >= i - 2; k--) {
                copyArrChange[k] = "a"
              }
            }
          }
        }
      }

      if (chosenModel.lcdScreen !== false) {
        for (let i = 0; i < 9; i++) {
          if (copyArr[i] === "s" && index < 9) {
            for (let j = 0; j < 9; j++) {
              for (let k = 0; k < 9; k++) {
                copyArrChange[k] = "a"
              }
            }
          }
        }
        for (let i = 0; i < 9; i++) {
          if (copyArr[i] === "s" && index >= 9) {
            if (index % 3 === 0) {
              for (let k = 0; k <= index + 2; k++) {
                copyArrChange[k] = "a"

              }
            } else if (index % 3 === 1) {
              for (let k = 0; k <= index + 1; k++) {
                copyArrChange[k] = "a"
              }
            } else {
              for (let k = 0; k < index; k++) {
                copyArrChange[k] = "a"
              }
            }
          }
        }
        if (copyArr.length > 9) {
          for (let i = copyArr.length; i >= 9; i--) {
            if (copyArr[i] === "s") {
              for (let j = 0; j < 9; j++) {
                if (index === j) {
                  if (i % 3 === 0) {
                    for (let k = 0; k <= i + 2; k++) {
                      copyArrChange[k] = "a"
                    }
                  } else if (i % 3 === 1) {
                    for (let k = 0; k <= i + 1; k++) {
                      copyArrChange[k] = "a"
                    }
                  } else {
                    for (let k = 0; k < i; k++) {
                      copyArrChange[k] = "a"
                    }
                  }
                }
              }
            }
          }
        }
      }



      for (let i = 0; i < copyArr.length; i++) {
        if (copyArr[i] === "s") {
          copyArrChange[i] = 0
        }
      }




    } else if (copyArr[index] === "s") {
      copyArrChange[index] = "r";

      //automatyczne usuwanie dolnego rzędu - naciśnięcie na dół, cała góra zaznaczona
      for (let i = 0; i < index; i++) {
        if (i % 3 === 0 && i < index - 2 && copyArr[i] === "s" && copyArr[i + 1] === "s" && copyArr[i + 2] === "s") {
          if (copyArr[index + 3] !== "s" && index % 3 === 0) {
            for (let j = index; j < copyArr.length; j++) {
              copyArrChange[j] = "r"
            }
          }
          if (copyArr[index + 3] !== "s" && index % 3 === 2) {
            for (let j = index - 2; j < copyArr.length; j++) {
              copyArrChange[j] = "r"
            }
          }
          if (index % 3 === 1) {
            for (let j = index - 1; j < copyArr.length; j++) {
              copyArrChange[j] = "r"
            }
          }
        }
      }
      //automatyczne usuwanie górnego rzędu - naciśnięcie na góre, cała szerokość zaznaczona
      for (let i = 0; i < copyArr.length; i++) {
        if (i % 3 === 0 && copyArr[index - 3] !== "s" && copyArr[i] === "s" && copyArr[i + 5] === "s") {
          if (index % 3 === 0) {
            for (let j = index; j < index + 3; j++) {
              copyArrChange[j] = "r"
            }
          }
          if (index % 3 === 1) {
            for (let j = index - 1; j < index + 2; j++) {
              copyArrChange[j] = "r"
            }
          }
          if (index % 3 === 2) {
            for (let j = index - 2; j < index + 1; j++) {
              copyArrChange[j] = "r"
            }
          }
        }
      }
      //automatyczne usuwanie prawej kolumny - naciśnięcie na prawą, lewa i środek zaznaczona
      for (let i = 0; i < copyArr.length; i++) {
        if (i % 3 === 0 && index % 3 === 2 && copyArr[i] === "s" && copyArr[i + 1] === "s" && copyArr[i + 2] === "s") {
          for (let j = i; j < copyArr.length; j++) {
            if (j % 3 === 2) {
              copyArrChange[j] = "r"
            }
          }
        }
      }
      //automatyczne usuwanie lewej kolumny - naciśnięcie na lewą, prawa i środek zaznaczona
      for (let i = 0; i < copyArr.length; i++) {
        if (i % 3 === 0 && index % 3 === 0 && copyArr[i] === "s" && copyArr[i + 1] === "s" && copyArr[i + 2] === "s") {
          for (let j = i; j < copyArr.length; j++) {
            if (j % 3 === 0) {
              copyArrChange[j] = "r"
            }
          }
        }
      }



      //dwa lewe zaznaczone
      //automatyczne usuwanie dolnego rzędu - naciśnięcie na dół, dwa lewe zaznaczone
      for (let i = 0; i < index; i++) {
        if (i % 3 === 0 && copyArr[i] === "s" && copyArr[i + 1] === "s" && copyArr[i + 2] !== "s" && (copyArr[i + 3] === "s" || copyArr[i - 3] === "s")) {
          if (copyArr[index + 3] !== "s" && index % 3 === 0) {
            for (let j = index; j < copyArr.length; j++) {
              copyArrChange[j] = "r"
            }
          }
          if (copyArr[index + 3] !== "s" && index % 3 === 1) {
            for (let j = index - 1; j < copyArr.length; j++) {
              copyArrChange[j] = "r"
            }
          }
        }
      }
      //automatyczne usuwanie dolnego rzędu - naciśnięcie na dół, dwa prawe zaznaczone
      for (let i = 0; i < index; i++) {
        if (i % 3 === 1 && copyArr[i] === "s" && copyArr[i + 1] === "s" && copyArr[i - 1] !== "s") {
          if (copyArr[index + 3] !== "s" && index % 3 === 1) {
            for (let j = index; j < copyArr.length; j++) {
              copyArrChange[j] = "r"
            }
          }
          if (copyArr[index + 3] !== "s" && index % 3 === 2) {
            for (let j = index - 1; j < copyArr.length; j++) {
              copyArrChange[j] = "r"
            }
          }
        }
      }
      //automatyczne usuwanie górnego rzędu - naciśnięcie na góre, dwa lewe zaznaczone
      for (let i = 0; i < copyArr.length; i++) {
        if (i % 3 === 0 && copyArr[i + 2] !== "s" && copyArr[index - 3] !== "s" && copyArr[i] === "s" && copyArr[i + 4] === "s") {
          if (index % 3 === 0) {
            for (let j = index; j < index + 2; j++) {
              copyArrChange[j] = "r"
            }
          }
          if (index % 3 === 1) {
            for (let j = index - 1; j < index + 1; j++) {
              copyArrChange[j] = "r"
            }
          }
        }
      }
      //automatyczne usuwanie górnego rzędu - naciśnięcie na góre, dwa prawe zaznaczone
      for (let i = 0; i < copyArr.length; i++) {
        if (i % 3 === 1 && copyArr[i - 1] !== "s" && copyArr[index - 3] !== "s" && copyArr[i] === "s" && copyArr[i + 4] === "s") {
          if (index % 3 === 1) {
            for (let j = index; j < index + 2; j++) {
              copyArrChange[j] = "r"
            }
          }
          if (index % 3 === 2) {
            for (let j = index - 1; j < index + 1; j++) {
              copyArrChange[j] = "r"
            }
          }
        }
      }

      //automatyczne usuwanie prawej kolumny - naciśnięcie na środek, lewa zaznaczona
      for (let i = 0; i < copyArr.length; i++) {
        if (i % 3 === 0 && index % 3 === 1 && copyArr[i] === "s" && copyArr[i + 1] === "s" && copyArr[i + 2] !== "s") {
          for (let j = i; j < copyArr.length; j++) {
            if (j % 3 === 1) {
              copyArrChange[j] = "r"
            }
          }
        }
      }
      //automatyczne usuwanie prawej kolumny - naciśnięcie na prawą, środkowa zaznaczona
      for (let i = 0; i < copyArr.length; i++) {
        if (i % 3 === 1 && index % 3 === 2 && copyArr[i] === "s" && copyArr[i + 1] === "s" && copyArr[i - 1] !== "s") {
          for (let j = i; j < copyArr.length; j++) {
            if (j % 3 === 2) {
              copyArrChange[j] = "r"
            }
          }
        }
      }
      //automatyczne usuwanie lewej kolumny - naciśnięcie na lewą, środek zaznaczona
      for (let i = 0; i < copyArr.length; i++) {
        if (i % 3 === 0 && index % 3 === 0 && copyArr[i] === "s" && copyArr[i + 1] === "s" && copyArr[i + 2] !== "s") {
          for (let j = i; j < copyArr.length; j++) {
            if (j % 3 === 0) {
              copyArrChange[j] = "r"
            }
          }
        }
      }
      // automatyczne usuwanie lewej kolumny - naciśnięcie na środkową, prawa zaznaczona
      for (let i = 0; i < copyArr.length; i++) {
        if (i % 3 === 1 && index % 3 === 1 && copyArr[i] === "s" && copyArr[i + 1] === "s" && copyArr[i - 1] !== "s") {
          for (let j = i; j < copyArr.length; j++) {
            if (j % 3 === 1) {
              copyArrChange[j] = "r"
            }
          }
        }
      }

      // automatyczne usuwanie prawej komórki - zaznaczony jeden rząd
      if ((index % 3 === 1) && copyArr[index - 1] === "s" && copyArr[index + 1] === "s" && copyArr[index + 3] !== "s" && copyArr[index - 3] !== "s") {
        copyArrChange[index + 1] = "r"
      }



      // automatyczne usuwanie dolnych komórek - zaznaczona lewa kolumna
      for (let i = 0; i < copyArr.length; i++) {
        if (i % 3 === 0 && index % 3 === 0 && i < index && copyArr[i] === "s" && copyArr[i + 1] !== "s") {
          for (let j = copyArr.length - 1; j > index; j--) {
            if (j % 3 === 0) {
              copyArrChange[j] = "r"
            }
          }
        }
      }
      // automatyczne usuwanie dolnych komórek - zaznaczona środkowa kolumna
      for (let i = 0; i < copyArr.length; i++) {
        if (i % 3 === 1 && index % 3 === 1 && i < index && copyArr[i] === "s" && copyArr[i - 1] !== "s" && copyArr[i + 1] !== "s") {
          for (let j = copyArr.length - 1; j > index; j--) {
            if (j % 3 === 1) {
              copyArrChange[j] = "r"
            }
          }
        }
      }
      // automatyczne usuwanie dolnych komórek - zaznaczona prawa kolumna
      for (let i = 0; i < copyArr.length; i++) {
        if (i % 3 === 2 && index % 3 === 2 && i < index && copyArr[i] === "s" && copyArr[i - 1] !== "s") {
          for (let j = copyArr.length - 1; j > index; j--) {
            if (j % 3 === 2) {
              copyArrChange[j] = "r"
            }
          }
        }
      }


      if (chosenModel.lcdScreen !== false) {
        for (let i = 0; i < 9; i++) {
          if (copyArr[i] === "s") {
            for (let j = 0; j < 9; j++) {
              if (index === j && j !== i) {
                for (let k = 0; k < 9; k++) {
                  copyArrChange[k] = "r"
                }
              }
            }
          }
        }

        for (let i = 0; i < 9; i++) {
          if (copyArr[i] === "s") {
            for (let j = 0; j < 9; j++) {
              if (copyArr[j] === "s" && j !== i) {
                for (let k = 9; k < copyArr.length; k++) {
                  if (index === k && (index % 3 === 0 || index % 3 === 2)) {
                    for (let l = 0; l < 9; l++) {
                      copyArrChange[l] = "r"
                    }
                  }
                }
              }
            }
          }
        }
      }

      for (let i = 0; i < copyArr.length; i++) {
        if (copyArr[i] !== "s") {
          copyArrChange[i] = 0
        }
      }


      if (chosenModel.type === "MDOT_2") {
        if (copyArr[3] === "s") {
          if (index === 4 || index === 5) {
            copyArrChange[4] = "r"
            copyArrChange[5] = "r"
          }
        }

        if (copyArr[5] === "s") {
          if (index === 3) {
            copyArrChange[3] = "r"
            copyArrChange[4] = "r"
          }
        }
      }
      if (chosenModel.type === "MDOT_4") {
        for (let i = 0; i < 9; i++) {
          if (copyArr[i] === "s" && i % 3 === 0 && copyArr[i + 3] !== "s" && copyArr[i - 3] !== "s") {
            if (index === i + 1 || index === i + 2) {
              copyArrChange[i + 1] = "r"
              copyArrChange[i + 2] = "r"
            }
          }

          if (copyArr[i] === "s" && i % 3 === 2 && copyArr[i + 3] !== "s" && copyArr[i - 3] !== "s") {
            if (index === i - 2) {
              copyArrChange[i - 1] = "r"
              copyArrChange[i - 2] = "r"
            }
          }
        }

        for (let i = 0; i < 3; i++) {
          if (copyArr[i] === "s" && copyArr[1] !== "s") {
            if (index === i + 3 || index === i + 6) {
              copyArrChange[i + 3] = "r"
              copyArrChange[i + 6] = "r"
            }
          }
        }

        for (let i = 8; i > 5; i--) {
          if (copyArr[i] === "s" && copyArr[7] !== "s") {
            if (index === i - 6) {
              copyArrChange[i - 3] = "r"
              copyArrChange[i - 6] = "r"
            }
          }
        }


        for (let i = 0; i < 9; i++) {
          if (copyArr[i] === "s" && copyArr[i + 4] === "s") {
            if (index === 0) {
              copyArrChange[0] = "r"
              copyArrChange[1] = "r"
              copyArrChange[2] = "r"
              copyArrChange[3] = "r"
              copyArrChange[4] = "r"
              copyArrChange[5] = "r"
              copyArrChange[6] = "r"
              copyArrChange[7] = "r"
            } else if (index === 1) {
              copyArrChange[0] = "r"
              copyArrChange[1] = "r"
              copyArrChange[2] = "r"
              copyArrChange[3] = "r"
              copyArrChange[4] = "r"
              copyArrChange[5] = "r"
            } else if (index === 2) {
              copyArrChange[0] = "r"
              copyArrChange[1] = "r"
              copyArrChange[2] = "r"
              copyArrChange[3] = "r"
              copyArrChange[4] = "r"
              copyArrChange[5] = "r"
              copyArrChange[7] = "r"
              copyArrChange[8] = "r"
            } else if (index === 3) {
              copyArrChange[0] = "r"
              copyArrChange[1] = "r"
              copyArrChange[3] = "r"
              copyArrChange[4] = "r"
              copyArrChange[6] = "r"
              copyArrChange[7] = "r"
            } else if (index === 4) {
              copyArrChange[3] = "r"
              copyArrChange[4] = "r"
              copyArrChange[5] = "r"
              copyArrChange[6] = "r"
              copyArrChange[7] = "r"
              copyArrChange[8] = "r"
            } else if (index === 5) {
              copyArrChange[1] = "r"
              copyArrChange[2] = "r"
              copyArrChange[4] = "r"
              copyArrChange[5] = "r"
              copyArrChange[7] = "r"
              copyArrChange[8] = "r"
            } else if (index === 6) {
              copyArrChange[0] = "r"
              copyArrChange[1] = "r"
              copyArrChange[3] = "r"
              copyArrChange[4] = "r"
              copyArrChange[5] = "r"
              copyArrChange[6] = "r"
              copyArrChange[7] = "r"
              copyArrChange[8] = "r"
            } else if (index === 7) {
              copyArrChange[3] = "r"
              copyArrChange[4] = "r"
              copyArrChange[5] = "r"
              copyArrChange[6] = "r"
              copyArrChange[7] = "r"
              copyArrChange[8] = "r"
            } else if (index === 8) {
              copyArrChange[1] = "r"
              copyArrChange[2] = "r"
              copyArrChange[3] = "r"
              copyArrChange[4] = "r"
              copyArrChange[5] = "r"
              copyArrChange[6] = "r"
              copyArrChange[7] = "r"
              copyArrChange[8] = "r"
            }
          }
        }
      }
    }

    setNewFrameChange(copyArrChange);
    overFrameReRender()
  });

  const handleFrameLeave = (() => {
    const arrNewFrameChange = [];
    chosenModel.dotLocation.forEach(element => {
      arrNewFrameChange.push(element)
    });
    setNewFrameChange(arrNewFrameChange);
    overFrameReRender()
  });


  // const handleFrameClick = useCallback((index) => {
  const handleFrameClick = (index) => {
    const copyArr = newFrame;
    const copyIconHolders = iconHolders;
    const copyTempArr = tempFrame.frameArr;
    if (copyArr[index] === 1) {
      copyArr[index] = "s";

      //poziomo: automatyczne zaznaczenie środkowego kiedy lewy był zaznaczony i zaznacza się prawy
      if (((index % 3) === 2) && copyArr[index - 2] === "s" && copyArr[index - 1] !== 0) {
        copyArr[index - 1] = "s";
      }
      //poziomo: automatyczne zaznaczenie środkowego kiedy prawy był zaznaczony i zaznacza się lewy
      if ((index % 3 === 0) && copyArr[index + 2] === "s" && copyArr[index + 1] !== 0) {
        copyArr[index + 1] = "s";
      }

      //pionowo: automatyczne zaznaczenie pośrednich kiedy wyżej był zaznaczony i zaznacza się nizszy
      for (let i = 0; i < index; i++) {
        if (i % 3 === index % 3 && copyArr[i] === "s" && i + 3 < index) {
          copyArr[i + 3] = "s"
        }
      }
      //pionowo: automatyczne zaznaczenie pośrednich kiedy niżej był zaznaczony i zaznacza się wyższy
      for (let i = copyArr.length; i > index; i--) {
        if (i % 3 === index % 3 && copyArr[i] === "s" && i - 3 > index) {
          copyArr[i - 3] = "s"
        }
      }
      //3d: automatyczne zaznaczenie pośrednich kiedy niższy był zaznaczony i zaznacza się wyższy, skrajne prawe
      for (let i = 0; i < index; i++) {
        if (copyArr[i] === "s" && i % 3 === 0 && index % 3 === 2) {
          for (let j = i; j < index; j++) {
            copyArr[j] = "s"
          }
        }
      }
      //3d: automatyczne zaznaczenie pośrednich kiedy wyższy był zaznaczony i zaznacza się niższy, skrajne prawe
      for (let i = copyArr.length; i > index; i--) {
        if (copyArr[i] === "s" && i % 3 === 0 && index % 3 === 2) {
          for (let j = i + 2; j > index - 2; j--) {
            copyArr[j] = "s"
          }
        }
      }
      //3d: automatyczne zaznaczenie pośrednich kiedy niższy był zaznaczony i zaznacza się wyższy, skrajne lewe, tylko prawy zaznaczony
      for (let i = 2; i < index; i++) {
        if (copyArr[i] === "s" && i % 3 === 2 && index % 3 === 0) {
          for (let j = i - 2; j < index + 2; j++) {
            copyArr[j] = "s"
          }
        }
      }
      //3d: automatyczne zaznaczenie pośrednich kiedy niższy był zaznaczony i zaznacza się wyższy, skrajne lewe, prawy i środkowy zaznaczony  
      for (let i = 0; i < index; i++) {
        if (copyArr[i] === "s" && copyArr[i + 1] === "s" && i % 3 === 1 && index % 3 === 0) {
          for (let j = i - 1; j < index + 2; j++) {
            copyArr[j] = "s"
          }
        }
      }
      //3d: automatyczne zaznaczenie pośrednich kiedy niższy był zaznaczony i zaznacza się wyższy, skrajne lewe, zaznaczony tylko środkowy rząd
      for (let i = 0; i < index; i++) {
        if (copyArr[i] === "s" && copyArr[i + 1] !== "s" && i % 3 === 1 && index % 3 === 0) {
          for (let j = i - 1; j < index + 2; j++) {
            if (j % 3 !== 2) {
              copyArr[j] = "s"
            }
          }
        }
      }
      //3d: automatyczne zaznaczenie pośrednich kiedy niższy był zaznaczony i zaznacza się wyższy, środek, zaznaczony tylko prawy rząd
      for (let i = 0; i < index; i++) {
        if (copyArr[i] === "s" && copyArr[i - 1] !== "s" && i % 3 === 2 && index % 3 === 1) {
          for (let j = i - 1; j < index + 1; j++) {
            if (j % 3 !== 0) {
              copyArr[j] = "s"
            }
          }
        }
      }
      //3d: automatyczne zaznaczenie pośrednich kiedy wyższy był zaznaczony i zaznacza się niższy, środek, zaznaczony tylko lewy rząd
      for (let i = copyArr.length; i > index; i--) {
        if (copyArr[i] === "s" && i % 3 === 0 && index % 3 === 1) {
          for (let j = i + 1; j > index - 1; j--) {
            if (j % 3 !== 2) {
              copyArr[j] = "s"
            }
          }
        }
      }
      //3d: automatyczne zaznaczenie pośrednich kiedy wyższy był zaznaczony i zaznacza się niższy, skrajne lewe
      for (let i = copyArr.length; i > index; i--) {
        if (copyArr[i] === "s" && i % 3 - 2 === index % 3) {
          for (let j = i; j > index; j--) {
            copyArr[j] = "s"
          }
        }
      }

      //3d: automatyczne zaznaczenie pośrednich kiedy wyższy był zaznaczony i zaznacza się niższy, skrajne prawe
      for (let i = copyArr.length - 1; i > index; i--) {
        if (copyArr[i] === "s" && copyArr[i - 1] === "s" && i % 3 === 1 && index % 3 === 2) {
          for (let j = i + 1; j > index - 2; j--) {
            copyArr[j] = "s"
          }
        }
      }
      //3d: automatyczne zaznaczenie pośrednich kiedy wyższy był zaznaczony i zaznacza się niższy, zaznaczony tylko środkowy rząd
      for (let i = copyArr.length - 1; i > index; i--) {
        if (copyArr[i] === "s" && copyArr[i - 1] !== "s" && i % 3 === 1 && index % 3 === 2) {
          for (let j = i + 1; j > index - 2; j--) {
            if (j % 3 !== 0) {
              copyArr[j] = "s"
            }
          }
        }
      }
      //3d: automatyczne zaznaczenie pośrednich kiedy niższy był zaznaczony i zaznacza się niższy, sąsiednie lewe
      for (let i = 0; i < index; i++) {
        if (copyArr[i] === "s" && i % 3 === 0 && index % 3 === 1) {
          for (let j = i; j < index; j++) {
            if (j % 3 !== 2)
              copyArr[j] = "s"
          }
        }
      }
      //3d: automatyczne zaznaczenie pośrednich kiedy wyższy był zaznaczony i zaznacza się niższy, sąsiednie lewe
      for (let i = copyArr.length; i > index; i--) {
        if (copyArr[i] === "s" && i % 3 === 1 && index % 3 === 0) {
          for (let j = i; j > index; j--)
            if (j % 3 !== 2)
              copyArr[j] = "s"
        }
      }
      //3d: automatyczne zaznaczenie pośrednich kiedy niższy był zaznaczony i zaznacza się wyższy, sąsiednie prawe
      for (let i = 0; i < index; i++) {
        if (copyArr[i] === "s" && i % 3 === 1 && index % 3 === 2) {
          for (let j = i; j < index; j++)
            if (j % 3 !== 0)
              copyArr[j] = "s"
        }
      }
      //3d: automatyczne zaznaczenie pośrednich kiedy wyższy był zaznaczony i zaznacza się niższy, sąsiednie prawe
      for (let i = copyArr.length; i > index; i--) {
        if (copyArr[i] === "s" && i % 3 === 2 && index % 3 === 1) {
          for (let j = i; j > index; j--)
            if (j % 3 !== 0)
              copyArr[j] = "s"
        }
      }
      //dodawanie rzędu na 3: automatyczne zaznaczenie całego rzędu kiedy niższy był zaznaczony i zaznacza się wyższy,
      for (let i = 0; i < index; i++) {
        if (copyArr[i] === "s" && i % 3 === 0 && copyArr[i + 1] === "s" && copyArr[i + 2] === "s") {
          for (let j = i + 3; j < index; j++) {
            copyArr[j] = "s"
          }
          if (index % 3 === 0) {
            copyArr[index + 1] = "s"
            copyArr[index + 2] = "s"
          }
          if (index % 3 === 1) {
            copyArr[index + 1] = "s"
          }
        }
      }
      //dodawanie rzędu na 3: automatyczne zaznaczenie całego rzędu kiedy wyższy był zaznaczony i zaznacza się niższy 
      for (let i = copyArr.length; i > index; i--) {
        if (copyArr[i] === "s" && i % 3 === 2 && copyArr[i - 1] === "s" && copyArr[i - 2] === "s") {
          for (let j = i - 3; j > index; j--) {
            copyArr[j] = "s"
          }
          if (index % 3 === 2) {
            copyArr[index - 1] = "s"
            copyArr[index - 2] = "s"
          }
          if (index % 3 === 1) {
            copyArr[index - 1] = "s"
          }
        }
      }
      //dodawanie rzędu na 2 lewego: automatyczne zaznaczenie całego rzędu kiedy niższy był zaznaczony i zaznacza się wyższy,
      for (let i = 0; i < index; i++) {
        if (copyArr[i] === "s" && i % 3 === 0 && copyArr[i + 1] === "s") {
          for (let j = i + 3; j < index; j++) {
            if (j % 3 !== 2) {
              copyArr[j] = "s"
            }
          }
          if (index % 3 === 0) {
            copyArr[index + 1] = "s"
          }
        }
      }
      //dodawanie rzędu na 2 lewego: automatyczne zaznaczenie całego rzędu kiedy wyższy  był zaznaczony i zaznacza się niższy,
      for (let i = copyArr.length; i > index; i--) {
        if (copyArr[i] === "s" && i % 3 === 1 && copyArr[i - 1] === "s") {
          for (let j = i - 3; j > index; j--) {
            if (j % 3 !== 2) {
              copyArr[j] = "s"
            }
          }
          if (index % 3 === 1) {
            copyArr[index - 1] = "s"
          }
        }
      }
      //dodawanie rzędu na 2 prawego: automatyczne zaznaczenie całego rzędu kiedy niższy był zaznaczony i zaznacza się wyższy,
      for (let i = 0; i < index; i++) {
        if (copyArr[i] === "s" && i % 3 === 1 && copyArr[i + 1] === "s") {
          for (let j = i + 3; j < index; j++) {
            if (j % 3 !== 0) {
              copyArr[j] = "s"
            }
          }
          if (index % 3 === 1) {
            copyArr[index + 1] = "s"
          }
        }
      }
      //dodawanie rzędu na 2 prawego: automatyczne zaznaczenie całego rzędu kiedy wyższy był zaznaczony i zaznacza się niższy,
      for (let i = copyArr.length; i > index; i--) {
        if (copyArr[i] === "s" && i % 3 === 2 && copyArr[i - 1] === "s") {
          for (let j = i - 3; j > index; j--) {
            if (j % 3 !== 0) {
              copyArr[j] = "s"
            }
          }
          if (index % 3 === 2) {
            copyArr[index - 1] = "s"
          }
        }
      }
      // dodawanie prawej kolumny, dwie lewe zaznaczone, środek zaznaczony: 
      for (let i = 0; i < copyArr.length; i++) {
        if (i % 3 === 0 && copyArr[i] === "s" && copyArr[i + 1] === "s" && copyArr[i + 3] === "s" && copyArr[i + 4] === "s" && index % 3 === 2) {
          for (let j = copyArr.length - 1; j > i; j--) {
            if (j % 3 === 1 && copyArr[j] === "s" && index <= j + 1 && index >= i + 2) {
              for (let k = j + 1; k > i + 2; k--) {
                if (k % 3 === 2) {
                  copyArr[k] = "s"
                }
              }
            }
          }
        }
      }
      // dodawanie środkowej kolumny, lewa zaznaczona: 
      for (let i = 0; i < copyArr.length; i++) {
        if (i % 3 === 0 && copyArr[i] === "s" && copyArr[i + 3] === "s" && index % 3 === 1) {
          for (let j = copyArr.length - 2; j > i; j--) {
            if (j % 3 === 0 && copyArr[j] === "s" && index <= j + 1 && index >= i + 1) {
              for (let k = j + 1; k > i + 1; k--) {
                if (k % 3 === 1) {
                  copyArr[k] = "s"
                }
              }
            }
          }
        }
      }
      // dodawanie środkowej i prawej kolumny, lewa zaznaczona: 
      for (let i = 0; i < copyArr.length; i++) {
        if (i % 3 === 0 && copyArr[i] === "s" && copyArr[i + 3] === "s" && index % 3 === 2) {
          for (let j = copyArr.length; j > i; j--) {
            if (j % 3 === 0 && copyArr[j] === "s" && index <= j + 2 && index >= i + 2) {
              for (let k = j + 2; k > i + 1; k--) {
                copyArr[k] = "s"
              }
            }
          }
        }
      }
      // dodawanie środkowej kolumny, prawa zaznaczona: 
      for (let i = 0; i < copyArr.length; i++) {
        if (i % 3 === 2 && copyArr[i] === "s" && copyArr[i + 3] === "s" && index % 3 === 1) {
          for (let j = copyArr.length; j > i; j--) {
            if (j % 3 === 2 && copyArr[j] === "s" && index <= j - 1 && index >= i - 1) {
              for (let k = j - 1; k >= i - 1; k--) {
                if (k % 3 === 1) {
                  copyArr[k] = "s"
                }
              }
            }
          }
        }
      }
      // dodawanie lewej i środkowej kolumny, prawa zaznaczona: 
      for (let i = 0; i < copyArr.length; i++) {
        if (i % 3 === 2 && copyArr[i] === "s" && copyArr[i + 3] === "s" && index % 3 === 0) {
          for (let j = copyArr.length; j > i; j--) {
            if (j % 3 === 2 && copyArr[j] === "s" && index <= j - 2 && index >= i - 2) {
              for (let k = j - 1; k >= i - 2; k--) {
                copyArr[k] = "s"
              }
            }
          }
        }
      }


      if (chosenModel.lcdScreen !== false) {
        for (let i = 0; i < 9; i++) {
          if (copyArr[i] === "s" && index < 9) {
            for (let j = 0; j < 9; j++) {
              if (copyArr[j] === "s" && j !== i) {
                for (let k = 0; k < 9; k++) {
                  copyArr[k] = "s"
                }
              }
            }
          }
        }
        for (let i = 0; i < 9; i++) {
          if (copyArr[i] === "s" && index >= 9) {
            if (index % 3 === 0) {
              for (let k = 0; k <= index + 2; k++) {
                copyArr[k] = "s"
              }
            } else if (index % 3 === 1) {
              for (let k = 0; k <= index + 1; k++) {
                copyArr[k] = "s"
              }
            } else {
              for (let k = 0; k < index; k++) {
                copyArr[k] = "s"
              }
            }
          }
        }
        if (copyArr.length > 9) {
          for (let i = copyArr.length; i >= 9; i--) {
            if (copyArr[i] === "s") {
              for (let j = 0; j < 9; j++) {
                if (index === j) {
                  if (i % 3 === 0) {
                    for (let k = 0; k <= i + 2; k++) {
                      copyArr[k] = "s"
                    }
                  } else if (i % 3 === 1) {
                    for (let k = 0; k <= i + 1; k++) {
                      copyArr[k] = "s"
                    }
                  } else {
                    for (let k = 0; k < i; k++) {
                      copyArr[k] = "s"
                    }
                  }
                }
              }
            }
          }
        }
      }



    } else if (copyArr[index] === "s") {
      copyArr[index] = 1;

      if (chosenModel.type !== "MDOT_4") {

        //automatyczne usuwanie dolnego rzędu - naciśnięcie na dół, cała góra zaznaczona
        for (let i = 0; i < index; i++) {
          if (i % 3 === 0 && i < index - 2 && copyArr[i] === "s" && copyArr[i + 1] === "s" && copyArr[i + 2] === "s") {
            if (copyArr[index + 3] !== "s" && index % 3 === 0) {
              for (let j = index; j < copyArr.length; j++) {
                copyArr[j] = 1
              }
            }
            if (copyArr[index + 3] !== "s" && index % 3 === 2) {
              for (let j = index - 2; j < copyArr.length; j++) {
                copyArr[j] = 1
              }
            }
            if (index % 3 === 1) {
              for (let j = index - 1; j < copyArr.length; j++) {
                copyArr[j] = 1
              }
            }
          }
        }
        //automatyczne usuwanie górnego rzędu - naciśnięcie na góre, cała szerokość zaznaczona
        if (index % 3 === 0 && copyArr[index - 3] !== "s" && copyArr[index + 5] === "s") {
          copyArr[index + 1] = 1
          copyArr[index + 2] = 1
        }
        if (index % 3 === 1 && copyArr[index - 3] !== "s" && copyArr[index - 1] === "s" && copyArr[index + 4] === "s") {
          copyArr[index - 1] = 1
          copyArr[index + 1] = 1
        }
        if (index % 3 === 2 && copyArr[index - 3] !== "s" && copyArr[index - 2] === "s" && copyArr[index + 3] === "s") {
          copyArr[index - 1] = 1
          copyArr[index - 2] = 1
        }
        //automatyczne usuwanie prawej kolumny - naciśnięcie na prawą, lewa i środek zaznaczona
        for (let i = 0; i < copyArr.length; i++) {
          if (i % 3 === 0 && index % 3 === 2 && copyArr[i] === "s" && copyArr[i + 1] === "s" && copyArr[i + 2] === "s") {
            for (let j = i; j < copyArr.length; j++) {
              if (j % 3 === 2) {
                copyArr[j] = 1
              }
            }
          }
        }
        //automatyczne usuwanie lewej kolumny - naciśnięcie na lewą, prawa i środek zaznaczona
        for (let i = 0; i < copyArr.length; i++) {
          if (i % 3 === 0 && index % 3 === 0 && copyArr[i] === "s" && copyArr[i + 1] === "s" && copyArr[i + 2] === "s") {
            for (let j = i; j < copyArr.length; j++) {
              if (j % 3 === 0) {
                copyArr[j] = 1
              }
            }
          }
        }



        //dwa lewe zaznaczone
        //automatyczne usuwanie dolnego rzędu - naciśnięcie na dół, dwa lewe zaznaczone
        for (let i = 0; i < index; i++) {
          if (i % 3 === 0 && copyArr[i] === "s" && copyArr[i + 1] === "s" && copyArr[i + 2] !== "s") {
            if (copyArr[index + 3] !== "s" && index % 3 === 0) {
              for (let j = index; j < copyArr.length; j++) {
                copyArr[j] = 1
              }
            }
            if (copyArr[index + 3] !== "s" && index % 3 === 1) {
              for (let j = index - 1; j < copyArr.length; j++) {
                copyArr[j] = 1
              }
            }
          }
        }
        //automatyczne usuwanie dolnego rzędu - naciśnięcie na dół, dwa prawe zaznaczone
        for (let i = 0; i < index; i++) {
          if (i % 3 === 1 && copyArr[i] === "s" && copyArr[i + 1] === "s" && copyArr[i - 1] !== "s") {
            if (copyArr[index + 3] !== "s" && index % 3 === 1) {
              for (let j = index; j < copyArr.length; j++) {
                copyArr[j] = 1
              }
            }
            if (copyArr[index + 3] !== "s" && index % 3 === 2) {
              for (let j = index - 1; j < copyArr.length; j++) {
                copyArr[j] = 1
              }
            }
          }
        }
        //automatyczne usuwanie górnego rzędu - naciśnięcie na góre, dwa lewe zaznaczone
        if (index % 3 === 0 && copyArr[index + 2] !== "s" && copyArr[index - 3] !== "s" && copyArr[index + 4] === "s") {
          copyArr[index + 1] = 1
        }
        if (index % 3 === 1 && copyArr[index + 1] !== "s" && copyArr[index - 3] !== "s" && copyArr[index - 1] === "s" && copyArr[index + 3] === "s") {
          copyArr[index - 1] = 1
        }
        //automatyczne usuwanie górnego rzędu - naciśnięcie na góre, dwa prawe zaznaczone
        if (index % 3 === 1 && copyArr[index - 1] !== "s" && copyArr[index - 3] !== "s" && copyArr[index + 4] === "s") {
          copyArr[index + 1] = 1
        }
        if (index % 3 === 2 && copyArr[index - 1] === "s" && copyArr[index - 2] !== "s" && copyArr[index - 3] !== "s" && copyArr[index + 3] === "s") {
          copyArr[index - 1] = 1
        }

        //automatyczne usuwanie prawej kolumny - naciśnięcie na środek, lewa zaznaczona
        for (let i = 0; i < copyArr.length; i++) {
          if (i % 3 === 0 && index % 3 === 1 && copyArr[i] === "s" && copyArr[i + 1] === "s" && copyArr[i + 2] !== "s") {
            for (let j = i; j < copyArr.length; j++) {
              if (j % 3 === 1) {
                copyArr[j] = 1
              }
            }
          }
        }
        //automatyczne usuwanie prawej kolumny - naciśnięcie na prawą, środkowa zaznaczona
        for (let i = 0; i < copyArr.length; i++) {
          if (i % 3 === 1 && index % 3 === 2 && copyArr[i] === "s" && copyArr[i + 1] === "s" && copyArr[i - 1] !== "s") {
            for (let j = i; j < copyArr.length; j++) {
              if (j % 3 === 2) {
                copyArr[j] = 1
              }
            }
          }
        }
        //automatyczne usuwanie lewej kolumny - naciśnięcie na lewą, środek zaznaczona
        for (let i = 0; i < copyArr.length; i++) {
          if (i % 3 === 0 && index % 3 === 0 && copyArr[i] === "s" && copyArr[i + 1] === "s" && copyArr[i + 2] !== "s") {
            for (let j = i; j < copyArr.length; j++) {
              if (j % 3 === 0) {
                copyArr[j] = 1
              }
            }
          }
        }
        // automatyczne usuwanie lewej kolumny - naciśnięcie na środkową, prawa zaznaczona
        for (let i = 0; i < copyArr.length; i++) {
          if (i % 3 === 1 && index % 3 === 1 && copyArr[i] === "s" && copyArr[i + 1] === "s" && copyArr[i - 1] !== "s") {
            for (let j = i; j < copyArr.length; j++) {
              if (j % 3 === 1) {
                copyArr[j] = 1
              }
            }
          }
        }



        // automatyczne usuwanie prawej komórki - zaznaczony jeden rząd
        if ((index % 3 === 1) && copyArr[index - 1] === "s" && copyArr[index + 1] === "s" && copyArr[index + 3] !== "s" && copyArr[index - 3] !== "s") {
          copyArr[index + 1] = 1
        }



        // automatyczne usuwanie dolnych komórek - zaznaczona lewa kolumna
        for (let i = 0; i < copyArr.length; i++) {
          if (i % 3 === 0 && index % 3 === 0 && i < index && copyArr[i] === "s" && copyArr[i + 1] !== "s") {
            for (let j = copyArr.length - 1; j > index; j--) {
              if (j % 3 === 0) {
                copyArr[j] = 1
              }
            }
          }
        }
        // automatyczne usuwanie dolnych komórek - zaznaczona środkowa kolumna
        for (let i = 0; i < copyArr.length; i++) {
          if (i % 3 === 1 && index % 3 === 1 && i < index && copyArr[i] === "s" && copyArr[i - 1] !== "s" && copyArr[i + 1] !== "s") {
            for (let j = copyArr.length - 1; j > index; j--) {
              if (j % 3 === 1) {
                copyArr[j] = 1
              }
            }
          }
        }
        // automatyczne usuwanie dolnych komórek - zaznaczona prawa kolumna
        for (let i = 0; i < copyArr.length; i++) {
          if (i % 3 === 2 && index % 3 === 2 && i < index && copyArr[i] === "s" && copyArr[i - 1] !== "s") {
            for (let j = copyArr.length - 1; j > index; j--) {
              if (j % 3 === 2) {
                copyArr[j] = 1
              }
            }
          }
        }


        if (chosenModel.lcdScreen !== false) {
          for (let i = 0; i < 9; i++) {
            if (copyArr[i] === "s") {
              for (let j = 0; j < 9; j++) {
                if (index === j && j !== i) {
                  for (let k = 0; k < 9; k++) {
                    if (k % 3 === 1) {
                      copyArr[k] = 0
                    } else {
                      copyArr[k] = 1
                    }
                  }
                  setTextFrame(false)
                  allowFrameTitle(false)
                  changeFrameText("")
                  frameTitle(false)
                }
              }
            }
          }


          for (let i = 0; i < 9; i++) {
            if (copyArr[i] === "s") {
              for (let j = 0; j < 9; j++) {
                if (copyArr[j] === "s" && j !== i) {
                  for (let k = 9; k < copyArr.length; k++) {
                    if (index === k && (index % 3 === 0 || index % 3 === 2)) {
                      for (let l = 0; l < 9; l++) {
                        if (l % 3 === 1) {
                          copyArr[l] = 0
                        } else {
                          copyArr[l] = 1
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }

        if (chosenModel.type === "MDOT_2") {
          if (copyArr[3] === "s") {
            if (index === 4 || index === 5) {
              copyArr[4] = 0
              copyArr[5] = 1
            }
          }

          if (copyArr[5] === "s") {
            if (index === 3 || index === 4) {
              copyArr[3] = 1
              copyArr[4] = 0
            }
          }
        }
      } else if (chosenModel.type === "MDOT_4") {
        for (let i = 0; i < 9; i++) {
          if (copyArr[i] === "s" && i % 3 === 0 && copyArr[i + 3] !== "s" && copyArr[i - 3] !== "s") {
            if (index === i + 1 || index === i + 2) {
              copyArr[i + 1] = 0
              copyArr[i + 2] = 1
            }
          }

          if (copyArr[i] === "s" && i % 3 === 2 && copyArr[i + 3] !== "s" && copyArr[i - 3] !== "s") {
            if (index === i - 2) {
              copyArr[i - 1] = 0
              copyArr[i - 2] = 1
            }
          }
        }

        for (let i = 0; i < 3; i++) {
          if (copyArr[i] === "s" && copyArr[1] !== "s") {
            if (index === i + 3 || index === i + 6) {
              copyArr[i + 3] = 0
              copyArr[i + 6] = 1
            }
          }
        }

        for (let i = 8; i > 5; i--) {
          if (copyArr[i] === "s" && copyArr[7] !== "s") {
            if (index === i - 3 || index === i - 6) {
              copyArr[i - 3] = 0
              copyArr[i - 6] = 1
            }
          }
        }


        for (let i = 0; i < 9; i++) {
          if (copyArr[i] === "s" && copyArr[i + 4] === "s") {
            if (index === 0) {
              copyArr[0] = 1
              copyArr[1] = 0
              copyArr[2] = 1
              copyArr[3] = 0
              copyArr[4] = 0
              copyArr[5] = 0
              copyArr[6] = 1
              copyArr[7] = 0
            } else if (index === 1) {
              copyArr[0] = 1
              copyArr[1] = 0
              copyArr[2] = 1
              copyArr[3] = 0
              copyArr[4] = 0
              copyArr[5] = 0
            } else if (index === 2) {
              copyArr[0] = 1
              copyArr[1] = 0
              copyArr[2] = 1
              copyArr[3] = 0
              copyArr[4] = 0
              copyArr[5] = 0
              copyArr[7] = 0
              copyArr[8] = 1
            } else if (index === 3) {
              copyArr[0] = 1
              copyArr[1] = 0
              copyArr[3] = 0
              copyArr[4] = 0
              copyArr[6] = 1
              copyArr[7] = 0
            } else if (index === 4) {
              copyArr[3] = 0
              copyArr[4] = 0
              copyArr[5] = 0
              copyArr[6] = 1
              copyArr[7] = 0
              copyArr[8] = 1
            } else if (index === 5) {
              copyArr[1] = 0
              copyArr[2] = 1
              copyArr[4] = 0
              copyArr[5] = 0
              copyArr[7] = 0
              copyArr[8] = 1
            } else if (index === 6) {
              copyArr[0] = 1
              copyArr[1] = 0
              copyArr[3] = 0
              copyArr[4] = 0
              copyArr[5] = 0
              copyArr[6] = 1
              copyArr[7] = 0
              copyArr[8] = 1
            } else if (index === 7) {
              copyArr[3] = 0
              copyArr[4] = 0
              copyArr[5] = 0
              copyArr[6] = 1
              copyArr[7] = 0
              copyArr[8] = 1
            } else if (index === 8) {
              copyArr[1] = 0
              copyArr[2] = 1
              copyArr[3] = 0
              copyArr[4] = 0
              copyArr[5] = 0
              copyArr[6] = 1
              copyArr[7] = 0
              copyArr[8] = 1
            }
          }
        }
      }
    }





    for (let i = 0; i < copyArr.length; i++) {
      if (copyArr[i] !== "s") {
        copyTempArr[i].t = 0
        copyTempArr[i].r = 0
        copyTempArr[i].b = 0
        copyTempArr[i].l = 0
      }

      if (copyArr[i] === "s" && copyArr[i - 3] !== "s") {
        copyTempArr[i].t = 1
      }
      if (copyArr[i] === "s" && copyArr[i - 3] === "s") {
        copyTempArr[i].t = 0
      }
      if (copyArr[i] === "s" && copyArr[i + 3] !== "s") {
        copyTempArr[i].b = 1
      }
      if (copyArr[i] === "s" && copyArr[i + 3] === "s") {
        copyTempArr[i].b = 0
      }


      if (copyArr[i] === "s" && copyArr[i - 1] !== "s" && i % 3 !== 0) {
        copyTempArr[i].l = 1
      } else if (copyArr[i] === "s" && i % 3 === 0) {
        copyTempArr[i].l = 1
      }
      if (copyArr[i] === "s" && copyArr[i - 1] === "s" && i % 3 !== 0) {
        copyTempArr[i].l = 0
      }

      if (copyArr[i] === "s" && copyArr[i + 1] !== "s" && i % 3 !== 2) {
        copyTempArr[i].r = 1
      } else if (copyArr[i] === "s" && i % 3 === 2) {
        copyTempArr[i].r = 1
      }
      if (copyArr[i] === "s" && copyArr[i + 1] === "s" && i % 3 !== 2) {
        copyTempArr[i].r = 0
      }


      if (copyTempArr[i].t === 1 && copyTempArr[i].l === 1) {
        copyTempArr[i].rtl = 3
      }
      if (copyTempArr[i].t === 1 && copyTempArr[i].r === 1) {
        copyTempArr[i].rtr = 3
      }
      if (copyTempArr[i].b === 1 && copyTempArr[i].r === 1) {
        copyTempArr[i].rbr = 3
      }
      if (copyTempArr[i].b === 1 && copyTempArr[i].l === 1) {
        copyTempArr[i].rbl = 3
      }

      if (copyTempArr[i].t === 1 && copyTempArr[i].l !== 1) {
        copyTempArr[i].rtl = 0
      }
      if (copyTempArr[i].t !== 1 && copyTempArr[i].l === 1) {
        copyTempArr[i].rtl = 0
      }
      if (copyTempArr[i].t === 1 && copyTempArr[i].r !== 1) {
        copyTempArr[i].rtr = 0
      }
      if (copyTempArr[i].t !== 1 && copyTempArr[i].r === 1) {
        copyTempArr[i].rtr = 0
      }
      if (copyTempArr[i].b === 1 && copyTempArr[i].r !== 1) {
        copyTempArr[i].rbr = 0
      }
      if (copyTempArr[i].b !== 1 && copyTempArr[i].r === 1) {
        copyTempArr[i].rbr = 0
      }
      if (copyTempArr[i].b === 1 && copyTempArr[i].l !== 1) {
        copyTempArr[i].rbl = 0
      }
      if (copyTempArr[i].b !== 1 && copyTempArr[i].l === 1) {
        copyTempArr[i].rbl = 0
      }




      if (copyTempArr[i].t === 1 && copyTempArr[i].b === 1) {
        copyTempArr[i].fh = chosenModel.oneRowFrameHeight
        copyTempArr[i].mb = chosenModel.multiRowFrameHeight - chosenModel.oneRowFrameHeight
      }
      if (copyTempArr[i].t === 1 && copyTempArr[i].b !== 1) {
        copyTempArr[i].fh = chosenModel.multiRowFrameHeight
        copyTempArr[i].mb = 0
      }
      if (copyTempArr[i].t !== 1 && copyTempArr[i].b === 1) {
        copyTempArr[i].fh = chosenModel.oneRowFrameHeight
        copyTempArr[i].mb = chosenModel.multiRowFrameHeight - chosenModel.oneRowFrameHeight
      }
      if (copyTempArr[i].t !== 1 && copyTempArr[i].b !== 1) {
        copyTempArr[i].fh = chosenModel.multiRowFrameHeight
        copyTempArr[i].mb = 0
      }



      if (i % 3 === 0 || i % 3 === 2) {
        copyTempArr[i].fw = chosenModel.sideColumnFrameWidth
        copyTempArr[i].ml = 0
        copyTempArr[i].mr = 0
      }
      if (i % 3 === 1 && copyTempArr[i].l !== 1 && copyTempArr[i].r !== 1) {
        copyTempArr[i].fw = chosenModel.centerColumnFrameWidth
        copyTempArr[i].ml = 0
        copyTempArr[i].mr = 0
      }
      if (i % 3 === 1 && copyTempArr[i].l === 1 && copyTempArr[i].r === 1) {
        copyTempArr[i].fw = chosenModel.sideColumnFrameWidth
        copyTempArr[i].ml = (chosenModel.centerColumnFrameWidth - chosenModel.sideColumnFrameWidth) / 2
        copyTempArr[i].mr = (chosenModel.centerColumnFrameWidth - chosenModel.sideColumnFrameWidth) / 2
      }
      if (i % 3 === 1 && copyTempArr[i].l === 1 && copyTempArr[i].r !== 1) {
        copyTempArr[i].fw = chosenModel.centerColumnFrameWidth - ((chosenModel.centerColumnFrameWidth - chosenModel.sideColumnFrameWidth) / 2)
        copyTempArr[i].ml = (chosenModel.centerColumnFrameWidth - chosenModel.sideColumnFrameWidth) / 2
        copyTempArr[i].mr = 0
      }
      if (i % 3 === 1 && copyTempArr[i].l !== 1 && copyTempArr[i].r === 1) {
        copyTempArr[i].fw = chosenModel.centerColumnFrameWidth - ((chosenModel.centerColumnFrameWidth - chosenModel.sideColumnFrameWidth) / 2)
        copyTempArr[i].ml = 0
        copyTempArr[i].mr = (chosenModel.centerColumnFrameWidth - chosenModel.sideColumnFrameWidth) / 2
      }

      if (copyArr[i] === "s" && copyArr[i + 1] !== "s" && copyArr[i - 1] !== "s" && copyArr[i + 3] !== "s" && copyArr[i - 3] !== "s") {
        copyTempArr[i].t = 0
        copyTempArr[i].r = 0
        copyTempArr[i].b = 0
        copyTempArr[i].l = 0
        copyIconHolders[i].singleFrameTemp = true
        //tutaj dodaj setOverCurrFrameTemp
      } else {
        copyIconHolders[i].singleFrameTemp = false
      }
    }

    let textX = 0
    let textY = 0

    for (let i = 0; i < copyArr.length; i++) {
      if (copyArr[i] === "s" && copyArr[i + 1] === "s" && (i % 3 === 0 || i % 3 === 1)) {
        setTextFrame(true)
        allowFrameTitle(true)
        textY = (Math.ceil((copyArr.indexOf("s") + 1) / 3) - 1) * chosenModel.multiRowFrameHeight
        if (copyArr[i] === "s" && copyArr[i + 1] === "s" && copyArr[i + 2] === "s" && i % 3 === 0) {
          textX = ((chosenModel.sideColumnFrameWidth * 2) + chosenModel.centerColumnFrameWidth) / 2
        }
        if (copyArr[i] === "s" && copyArr[i + 1] === "s" && copyArr[i + 2] !== "s" && i % 3 === 0) {
          textX = (((chosenModel.sideColumnFrameWidth) + chosenModel.centerColumnFrameWidth) - ((chosenModel.centerColumnFrameWidth - chosenModel.sideColumnFrameWidth) / 2)) / 2
        }
        if (copyArr[i] === "s" && copyArr[i + 1] === "s" && copyArr[i - 1] !== "s" && i % 3 === 1) {
          textX = (((3 * chosenModel.sideColumnFrameWidth) + chosenModel.centerColumnFrameWidth) + ((chosenModel.centerColumnFrameWidth - chosenModel.sideColumnFrameWidth) / 2)) / 2
        }
      }

      if (copyArr[i] === "s" && copyArr[i + 3] === "s" && copyArr[i + 1] !== "s" && i % 3 === 0) {
        setTextFrame(true)
        allowFrameTitle(true)
        textY = (Math.ceil((copyArr.indexOf("s") + 1) / 3) - 1) * chosenModel.multiRowFrameHeight
        textX = chosenModel.sideColumnFrameWidth / 2
      }
      if (copyArr[i] === "s" && copyArr[i + 3] === "s" && copyArr[i + 1] !== "s" && copyArr[i - 1] !== "s" && i % 3 === 1) {
        setTextFrame(true)
        allowFrameTitle(true)
        textY = (Math.ceil((copyArr.indexOf("s") + 1) / 3) - 1) * chosenModel.multiRowFrameHeight
        textX = ((chosenModel.sideColumnFrameWidth * 2) + chosenModel.centerColumnFrameWidth) / 2
      }
      if (copyArr[i] === "s" && copyArr[i + 3] === "s" && copyArr[i - 1] !== "s" && copyArr[i + 1] !== "s" && copyArr[i - 1] !== "s" && i % 3 === 2) {
        setTextFrame(true)
        allowFrameTitle(true)
        textY = (Math.ceil((copyArr.indexOf("s") + 1) / 3) - 1) * chosenModel.multiRowFrameHeight
        textX = ((3 * chosenModel.sideColumnFrameWidth) + (2 * chosenModel.centerColumnFrameWidth)) / 2
      }

      if (copyArr[i] === "s" && copyArr[i + 1] !== "s" && copyArr[i - 1] !== "s" && copyArr[i + 3] !== "s" && copyArr[i - 3] !== "s") {
        setTextFrame(false)
        allowFrameTitle(false)
        changeFrameText("")
        frameTitle(false)
      }
    }


    const arrNewFrameChange = [];
    chosenModel.dotLocation.forEach(element => {
      arrNewFrameChange.push(element)
    });
    setNewFrameChange(arrNewFrameChange);


    setNewFrame(copyArr);

    const copyTempFrame = tempFrame;
    copyTempFrame.frameArr = copyTempArr
    copyTempFrame.textX = textX
    copyTempFrame.textY = textY
    setTempFrame(copyTempFrame)


    const copyFramePrint = {};
    copyFramePrint.frameArr = copyTempArr
    copyFramePrint.textX = textX
    copyFramePrint.textY = textY

    //---------------------------------REDUX---------------------------------
    let frameTemp = {};

    const checkArr = copyArr.filter(function (element) {
      return element === "s"
    })


    if (checkArr.length > 1) {


      frameTemp.type = "multi"
      frameTemp.framePrint = copyFramePrint

      const columns = ((copyArr.lastIndexOf("s") % 3) + 1) - (copyArr.indexOf("s") % 3)
      const rows = Math.ceil((copyArr.lastIndexOf("s") + 1) / 3) - Math.floor(copyArr.indexOf("s") / 3)

      if (!chosenModel.panelRotation) {
        frameTemp.frameInfo =
        {
          startRow: Math.ceil((copyArr.indexOf("s") + 1) / 3),
          startColumn: ((copyArr.indexOf("s") % 3) + 1),
          rows: rows,
          columns: columns,
          shape: chosenFrameShape,
          startCell: Math.ceil((copyArr.indexOf("s") + 1))
        }
      } else {
        const rowCalc = (copyArr.indexOf("s") % 3) + columns
        let startRow
        if (rowCalc === 1) {
          startRow = 3
        } else if (rowCalc === 2) {
          startRow = 2
        } else if (rowCalc === 3) {
          startRow = 1
        }

        frameTemp.frameInfo =
        {
          startRow: startRow,
          startColumn: Math.ceil((copyArr.indexOf("s") + 1) / 3),
          rows: columns,
          columns: rows,

          shape: chosenFrameShape,
          startCell: Math.ceil((copyArr.indexOf("s") + 1))
        }
      }
    } else if (checkArr.length === 1) {
      frameTemp.type = "single"

      const currSingleFrames = [];
      copyArr.forEach((el) => {
        if (el === "s") {
          currSingleFrames.push({ shape: chosenFrameShape, over: false })

          if (!chosenModel.panelRotation) {
            frameTemp.frameInfo =
            {
              startRow: Math.ceil((index + 1) / 3),
              startColumn: ((index % 3) + 1),
              rows: 1,
              columns: 1,
              shape: chosenFrameShape,
              startCell: Math.ceil((copyArr.indexOf("s") + 1))
            }
          } else {
            let startRow
            if (index % 3 === 0) {
              startRow = 3
            } else if (index % 3 === 1) {
              startRow = 2
            } else if (index % 3 === 2) {
              startRow = 1
            }

            frameTemp.frameInfo =
            {
              startRow: startRow,
              startColumn: Math.ceil((index + 1) / 3),
              rows: 1,
              columns: 1,
              shape: chosenFrameShape,
              startCell: Math.ceil((copyArr.indexOf("s") + 1))
            }
          }

        } else {
          currSingleFrames.push(0)
        }
      })
      frameTemp.framePrint = currSingleFrames


    } else {
      frameTemp = null;
    }
    changeFrameHoldersTemp(frameTemp)
    changeIconHolders(copyIconHolders)
  }


  const handleChangeTextFrame = (text) => {
    changeFrameText(text.target.value.toUpperCase())
  }

  const handleChangePanelName = (text) => {
    changePanelName(text.target.value)
    changePanelNameBackEnd(text.target.value)
    setOccupiedPanelName(false)
    if (panelName !== "") {
      setNoPanelName(false)
    }
  }

  const handleChangeFramesToSharp = () => {

    changeFramesShapeToSharp()
    setAllFramesSharpRound(prev => !prev)
    changeFrameShape("sharp")

    const copyFrameBackEnd = framesBackEnd
    copyFrameBackEnd.forEach(frame => {
      frame.cornerRadious = 0
    })
    changeFramesBackEnd(copyFrameBackEnd)
  }

  const handleChangeFramesToRound = () => {
    changeFramesShapeToRound()
    setAllFramesSharpRound(prev => !prev)
    changeFrameShape("round")

    const copyFrameBackEnd = framesBackEnd
    copyFrameBackEnd.forEach(frame => {
      frame.cornerRadious = 1
    })
    changeFramesBackEnd(copyFrameBackEnd)
  }


  const handleResetCurrFrame = () => {
    const copyArr = iconHolders;
    setOverCurrFrame(false)
    const arrNewFrame = [];
    const arrNewFrameHide = [];
    const arrNewFrameChange = [];
    const arrTempFrame = { textX: 0, textY: 0, frameArr: [] };

    chosenModel.dotLocation.forEach(element => {
      arrNewFrame.push(element)
    });
    chosenModel.dotLocation.forEach(element => {
      arrNewFrameHide.push(element)
    });
    chosenModel.dotLocation.forEach(element => {
      arrNewFrameChange.push(element)
    });


    chosenModel.dotLocation.forEach(element => {
      arrTempFrame.frameArr.push({
        flag: element,
        rtl: 0, rtr: 0, rbr: 0, rbl: 0,
        t: 0, r: 0, b: 0, l: 0,
        fh: 0, fw: 0, mt: 0, mb: 0, ml: 0, mr: 0,
      })
    });
    copyArr.forEach((el) => {
      el.singleFrameTemp = false
    })
    changeIconHolders(copyArr)
    setNewFrame(arrNewFrame)
    setNewFrameHide(arrNewFrameHide)
    setNewFrameChange(arrNewFrameChange)
    setTempFrame(arrTempFrame)
    changeFrameText("")
    setTextFrame(false)
    changeFrameHoldersTemp(null)
    frameTitle(false)
    overFrameReRender()
  }

  const handleResetAllFrames = () => {
    setAlertAnswer(null)
    changeFrameHolders([])
    changeFramesBackEnd([])
    const copyArr = iconHolders;
    copyArr.forEach((element, index) => {
      element.singleFrame = false;
    })
    changeIconHolders(copyArr)
    overFrameReRender()
    setFrameTitles(false)
    filterWarnings(4)
  }


  const fetchWithTimeout = (frontEndDataB64) => {
    let ctrl = new AbortController()
    let signal = ctrl.signal

    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    headers.append('Access-Control-Allow-Credentials', 'true');

    let serverTimeout = setTimeout(() => {
      ctrl.abort()
      setDownloading(false)
      showAlert(14);
      clearTimeout(serverTimeout)
    }, 8000)

    fetch("https://bitcoin.ampio.pl:4567/generatepdf", {
      signal,
      method: "POST",
      body: JSON.stringify({ backEndData, frontEndDataB64 }),
      headers: headers
    })
      .then(res => res.blob())
      .then(blob => {
        let fileName = chosenModel.name + "_" + panelName + ".pdf"
        saveAs(blob, fileName);
        setDownloading(false)
        showAlert(100);
        clearTimeout(serverTimeout)
      })
      .catch(error => {
        if (error.toString() !== "AbortError: The user aborted a request.") {
          setDownloading(false)
          showAlert(13);
          clearTimeout(serverTimeout)
        }
      })
  }

  const printPdf = () => {
    setAlertAnswer(null)
    setDownloading(true)
    let dataToSend = {
      frontEndData,
      backEndData,
      show: true,
      hide: false
    }
    let frontEndDataStr = JSON.stringify(dataToSend);
    let frontEndDataB64 = Buffer.from(frontEndDataStr).toString("base64")
    fetchWithTimeout(frontEndDataB64)
  }


  const handlePrintPdf = () => {
    if (panelName === "") {
      setNoPanelName(true)
    } else if (!allIcons) {
      showAlert(8);
    } else {
      printPdf()
      // setDownloading(true)
      // let dataToSend = {
      //   frontEndData,
      //   backEndData,
      //   show: true,
      //   hide: false
      // }
      // let frontEndDataStr = JSON.stringify(dataToSend);
      // let frontEndDataB64 = Buffer.from(frontEndDataStr).toString("base64")
      // fetchWithTimeout(frontEndDataB64)
    }
  }





  const debugFetchWithTimeout = (frontEndDataB64) => {
    let ctrl = new AbortController()
    let signal = ctrl.signal


    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    headers.append('Access-Control-Allow-Credentials', 'true');

    let serverTimeout = setTimeout(() => {
      ctrl.abort()
      setDownloading(false)
      clearTimeout(serverTimeout)
    }, 8000)

    fetch("https://kreator.ampio.pl/generatepdf", {
      signal,
      method: "POST",
      body: JSON.stringify({ backEndData, frontEndDataB64 }),
      headers: headers
    })
      .then(res => res.blob())
      .then(blob => {
        let fileName = chosenModel.name + "_" + panelName + ".pdf"
        saveAs(blob, fileName);
        setDownloading(false)
        clearTimeout(serverTimeout)
      })
      .catch(error => {
        setDownloading(false)
        console.log(error)
        clearTimeout(serverTimeout)
      })
  }

  const handlePrintPdfDebug = () => {

    if (panelName === "") {
      setNoPanelName(true)
    } else {
      setDownloading(true)
      let dataToSend = {
        frontEndData,
        backEndData,
        show: true,
        hide: false
      }
      let frontEndDataStr = JSON.stringify(dataToSend);
      let frontEndDataB64 = Buffer.from(frontEndDataStr).toString("base64")

      debugFetchWithTimeout(frontEndDataB64)
    }
  }



  const handleSave = () => {
    if (panelName === "") {
      setNoPanelName(true)
    } else if (((panels.filter(function (el, i) { return i !== indexOfLastPanel })).filter(function (panel) { return panel.backEndData.panelName === panelName })).length) {
      setOccupiedPanelName(true)
    } else {
      if (indexOfLastPanel > -1) {
        const copyPanels = panels
        copyPanels.splice(indexOfLastPanel, 1)
        updatePanels(copyPanels)
      }
      setTimeOfCreation(date + ", " + timeWithSeconds)
      const frontEndDataCopy = frontEndData
      frontEndDataCopy.visual.timeOfCreation = date + ", " + timeWithSeconds
      addPanel({
        frontEndData: frontEndDataCopy,
        backEndData,
        show: true,
        hide: false
      })

      hideCreator(false)
      handleClearAll()
      const dahsboardTimeout = setTimeout(() => {
        showDashboard(true)
        changePanelName("")
        changePanelNameBackEnd("")
        resetColor()
        resetCut()
        resetPanelColorBackEnd()
        resetTab("model")
        resetModel()
        changePanelTypeBackEnd(availableModels[0].backEndPanelType)
        updateFavoriteIcons([])
        updateOwnIcons([])
      }, 400);
      return () => clearTimeout(dahsboardTimeout);
    }

  }


  // const handleBack = () => {
  // hideCreator(false)
  // handleClearAll()

  // const dahsboardTimeout = setTimeout(() => {
  //   showDashboard(true)
  //   // handleClearAll()
  //   changePanelName("")
  //   changePanelNameBackEnd("")
  //   resetColor()
  //   resetPanelColorBackEnd()
  //   resetTab("model")
  //   resetModel()
  //   updateFavoriteIcons([])
  //   updateOwnIcons([])
  // }, 400);
  // return () => clearTimeout(dahsboardTimeout);
  // }

  const goBack = () => {
    setAlertAnswer(null)
    hideCreator(false)
    handleClearAll()
    setOccupiedPanelName(false)

    const dahsboardTimeout = setTimeout(() => {
      showDashboard(true)
      changePanelName("")
      changePanelNameBackEnd("")
      resetColor()
      resetCut()
      resetPanelColorBackEnd()
      resetTab("model")
      resetModel()
      changePanelTypeBackEnd(availableModels[0].backEndPanelType)
      updateFavoriteIcons([])
      updateOwnIcons([])
    }, 400);
    return () => clearTimeout(dahsboardTimeout);
  }



  return (
    <>
      {fullScreen &&
        <PanelPreviewFullScreen />
      }
      <div className="panelpreview_container" style={panelPreviewStyle}>
        <div className="preview_container" >
          <Warning />
          <div className="preview_top">
            <h2>{t("PANEL_PREVIEW")}:</h2>
            <form onSubmit={handleSubmit} className="panel_name_form" >
              <input className="panel_name_input"
                ref={target}
                type="text"
                autoComplete="off"
                maxLength="23"
                placeholder={t("ENTER_NAME")}
                style={isFocusedInputName ? { backgroundColor: "white", color: "#333333", border: "3px solid transparent" }
                  : (noPanelName || occupiedPanelName) ? { color: "white", border: "3px solid #dc3545" } : { color: "white", border: "3px solid transparent" }}
                onMouseOver={showFrameBorder}
                onMouseLeave={hideFrameBorder}
                value={panelName}
                onChange={(text) => handleChangePanelName(text)}
                onFocus={() => setIsFocusedInputName(true)}
                onKeyDown={handleKeyPress}
              />

              {isFocusedInputName &&
                <input type="image" src={Submitinput} alt="submitinput" className="panel_name_image" />
              }
              {isFocusedInputName &&
                <img src={Clearinput} alt="clearinput" className="panel_name_image" onClick={handleClearInputName} />
              }
            </form>


          </div>
          <div className="panel_container" >
            <div className="resize_container" style={resizeStyle}>
              <div className="panel_box" style={chosenModelStyle}>
                <div className="visualization_glass_white" style={(visual && chosenColor.RAL === "RAL 9003") ? { ...visualStyle, opacity: "1" } : { ...visualStyle, opacity: "0" }} />

                <div className="panel_content" style={{ ...contentStyle, position: "absolute" }}>
                  {(removeAll || alert === 3) &&
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                      <img src={Removeall} alt="removeall" style={{
                        width: "100%",
                        zIndex: "99999",
                        opacity: "0.8"
                      }} />
                    </div>
                  }
                </div>

                <div className="panel_content" style={{ ...contentStyle, position: "absolute" }}>
                  {hideAll && !visual &&
                    <>
                      {newFrame.map((el, index) =>
                        <div key={index}
                          style={
                            ((index + 2) % 3 === 0) ?
                              (
                                ((index > iconHolders.length - 4) ? { ...cellStyle, width: `${chosenModel.centerCellWidth * sc}px`, height: `${chosenModel.lastRowHeight * sc}px` }
                                  : { ...cellStyle, width: `${chosenModel.centerCellWidth * sc}px`, height: `${chosenModel.rowHeight * sc}px` })
                              )
                              : (
                                ((index > iconHolders.length - 4) ? { ...cellStyle, width: `${chosenModel.sideCellWidth * sc}px`, height: `${chosenModel.lastRowHeight * sc}px` }
                                  : { ...cellStyle, width: `${chosenModel.sideCellWidth * sc}px`, height: `${chosenModel.rowHeight * sc}px` })
                              )} >

                          {el !== 0 && showFramBlackLight &&
                            <div style={el === 1 ? { ...frameCellStyle } :
                              chosenColor.hex !== "#30a32c" ?
                                { ...frameCellStyle, backgroundColor: "rgba(40, 167, 69, 0.5)" }
                                : { ...frameCellStyle, backgroundColor: "rgba(32, 114, 30, 0.5)" }} >
                              <div style={frameClickStyle}
                                onClick={() => handleFrameClick(index)}
                                onMouseOver={() => handleFrameOver(index)}
                                onMouseLeave={() => handleFrameLeave()}
                              />
                            </div>
                          }

                          {el !== 0 && !showFramBlackLight &&
                            <div style={{ ...frameCellStyle, backgroundColor: "transparent" }} >
                              <div style={frameClickStyle}
                                onClick={() => handleFrameClick(index)}
                                onMouseOver={() => handleFrameOver(index)}
                                onMouseLeave={() => handleFrameLeave()}
                              />
                            </div>
                          }
                        </div>
                      )
                      }
                    </>}
                </div>

                <div className="panel_content" style={{ ...contentStyle, position: "absolute" }}>
                  {hideAll && !visual &&
                    <>
                      {newFrameHide.map((el, index) =>
                        <div key={index}
                          style={
                            ((index + 2) % 3 === 0) ?
                              (
                                ((index > iconHolders.length - 4) ? { ...cellStyle, width: `${chosenModel.centerCellWidth * sc}px`, height: `${chosenModel.lastRowHeight * sc}px` }
                                  : { ...cellStyle, width: `${chosenModel.centerCellWidth * sc}px`, height: `${chosenModel.rowHeight * sc}px` })
                              )
                              : (
                                ((index > iconHolders.length - 4) ? { ...cellStyle, width: `${chosenModel.sideCellWidth * sc}px`, height: `${chosenModel.lastRowHeight * sc}px` }
                                  : { ...cellStyle, width: `${chosenModel.sideCellWidth * sc}px`, height: `${chosenModel.rowHeight * sc}px` })
                              )} >
                          {el === 0 &&
                            <div style={{ ...frameCellStyle, backgroundColor: chosenColor.hex, height: `${18 * sc}px`, width: `${18 * sc}px`, margin: `${1 * sc}px auto` }} />
                          }
                        </div>
                      )
                      }
                    </>}
                </div>


                <div className="panel_content" style={{ ...contentStyle, position: "absolute" }}>
                  {hideAll && !visual &&
                    <>
                      {newFrameChange.map((el, index) =>
                        <div key={index}
                          style={
                            ((index + 2) % 3 === 0) ?
                              (
                                ((index > iconHolders.length - 4) ? { ...cellStyle, width: `${chosenModel.centerCellWidth * sc}px`, height: `${chosenModel.lastRowHeight * sc}px` }
                                  : { ...cellStyle, width: `${chosenModel.centerCellWidth * sc}px`, height: `${chosenModel.rowHeight * sc}px` })
                              )
                              : (
                                ((index > iconHolders.length - 4) ? { ...cellStyle, width: `${chosenModel.sideCellWidth * sc}px`, height: `${chosenModel.lastRowHeight * sc}px` }
                                  : { ...cellStyle, width: `${chosenModel.sideCellWidth * sc}px`, height: `${chosenModel.rowHeight * sc}px` })
                              )} >

                          <div style={{ ...frameCellStyle, backgroundColor: "none" }} >
                            < img src={chosenColor.hex !== "#30a32c" ? Addframe : Addframedark} alt="addframe" style={el === "a" ? { ...frameChangeStyle, opacity: "1" } : { ...frameChangeStyle, opacity: "0" }} />
                            < img src={!chosenModel.panelRotation ? Removeframe : Removeframehorizontal} alt="removeframe" style={el === "r" ? { ...frameChangeStyle, opacity: "1" } : { ...frameChangeStyle, opacity: "0" }} />
                          </div>
                        </div>
                      )
                      }
                    </>}
                </div>


                {hideAll &&
                  <>
                    {frameHolders.map((frame, i) =>
                      <div key={i} >
                        {frame.type === "multi" &&
                          <div className="panel_content" style={{ ...contentFrameStyle, position: "absolute" }}>

                            {frame.framePrint.frameArr.map((el, index) =>
                              <div key={index}
                                style={
                                  ((index + 2) % 3 === 0) ?
                                    { ...cellStyle, width: `${chosenModel.centerColumnFrameWidth * sc}px`, height: `${chosenModel.multiRowFrameHeight * sc}px` }
                                    : { ...cellStyle, width: `${chosenModel.sideColumnFrameWidth * sc}px`, height: `${chosenModel.multiRowFrameHeight * sc}px` }
                                } >

                                {el !== 0 && !visual &&
                                  <div style={frame.framePrint.shape === "sharp" ? {
                                    ...frameStyle,
                                    borderColor: chosenColor.iconColor,
                                    borderRadius: "0",
                                    height: `${el.fh * sc}px`,
                                    width: `${el.fw * sc}px`,
                                    marginBottom: `${el.mb * sc}px`,
                                    marginLeft: `${el.ml * sc}px`,
                                    marginRight: `${el.mr * sc}px`,
                                    transition: "0s",
                                  }
                                    : {
                                      ...frameStyle, borderColor: chosenColor.iconColor, borderRadius: `${el.rtl * sc}px ${el.rtr * sc}px ${el.rbr * sc}px ${el.rbl * sc}px`,
                                      height: `${el.fh * sc}px`,
                                      width: `${el.fw * sc}px`,
                                      marginBottom: `${el.mb * sc}px`,
                                      marginLeft: `${el.ml * sc}px`,
                                      marginRight: `${el.mr * sc}px`,
                                      transition: "0s",
                                    }}

                                    className={`border_top${el.t} border_right${el.r} border_bottom${el.b} border_left${el.l}`}
                                  />
                                }

                                {el !== 0 && visual &&
                                  <div style={frame.framePrint.shape === "sharp" ? {
                                    ...frameStyle,
                                    borderColor: "white",
                                    borderRadius: "0",
                                    height: `${el.fh * sc}px`,
                                    width: `${el.fw * sc}px`,
                                    marginBottom: `${el.mb * sc}px`,
                                    marginLeft: `${el.ml * sc}px`,
                                    marginRight: `${el.mr * sc}px`,
                                    transition: "0.4s ease",
                                  }
                                    : {
                                      ...frameStyle,
                                      borderColor: "white",
                                      borderRadius: `${el.rtl * sc}px ${el.rtr * sc}px ${el.rbr * sc}px ${el.rbl * sc}px`,
                                      height: `${el.fh * sc}px`,
                                      width: `${el.fw * sc}px`,
                                      marginBottom: `${el.mb * sc}px`,
                                      marginLeft: `${el.ml * sc}px`,
                                      marginRight: `${el.mr * sc}px`,
                                      transition: "0.4s ease",
                                    }}

                                    className={`border_top${el.t} border_right${el.r} border_bottom${el.b} border_left${el.l}`}
                                  />
                                }
                                {el !== 0 && frame.framePrint.over && !visual &&
                                  <div style={frame.framePrint.shape === "sharp" ? {
                                    ...frameStyle,
                                    borderColor: "#dc3545",
                                    zIndex: "9999",
                                    borderRadius: "0",
                                    height: `${el.fh * sc}px`,
                                    width: `${el.fw * sc}px`,
                                    marginBottom: `${el.mb * sc}px`,
                                    marginLeft: `${el.ml * sc}px`,
                                    marginRight: `${el.mr * sc}px`,
                                    transition: "0.4s ease",
                                  }
                                    : {
                                      ...frameStyle,
                                      borderColor: "#dc3545",
                                      zIndex: "9999",
                                      borderRadius: `${el.rtl * sc}px ${el.rtr * sc}px ${el.rbr * sc}px ${el.rbl * sc}px`,
                                      height: `${el.fh * sc}px`,
                                      width: `${el.fw * sc}px`,
                                      marginBottom: `${el.mb * sc}px`,
                                      marginLeft: `${el.ml * sc}px`,
                                      marginRight: `${el.mr * sc}px`,
                                      transition: "0.4s ease",
                                    }}

                                    className={`border_top${el.t} border_right${el.r} border_bottom${el.b} border_left${el.l}`}
                                  />
                                }
                              </div>
                            )}
                            {(frame.framePrint.text !== "" && !frame.framePrint.over) &&
                              <div style={{ position: "absolute", width: "100%" }}>
                                <div style={!visual ? { ...autoResizeInputStyle, top: `${frame.framePrint.textY * sc}px`, left: `${frame.framePrint.textX * sc}px`, transition: "0s" } :
                                  { ...autoResizeInputStyle, top: `${frame.framePrint.textY * sc}px`, left: `${frame.framePrint.textX * sc}px`, transition: "0.4s ease" }}>
                                  <input className="text_input_frame"
                                    autoComplete="off"
                                    type="text"
                                    maxLength="16"
                                    style={(chosenColor.RAL === "RAL 9003" && visual) ?
                                      {
                                        ...textStyleFrame,
                                        fontFamily: frame.framePrint.frameFont,
                                        fontWeight: frame.framePrint.frameFontWeight,
                                        backgroundColor: "rgb(233,233,233)",
                                        border: "none",
                                      }
                                      :
                                      {
                                        ...textStyleFrame,
                                        fontFamily: frame.framePrint.frameFont,
                                        fontWeight: frame.framePrint.frameFontWeight,
                                        backgroundColor: chosenColor.hex,
                                        border: "none",
                                      }
                                    }
                                    disabled={true}
                                    value={frame.framePrint.text}
                                  />
                                  <span style={{
                                    fontFamily: frame.framePrint.frameFont,
                                    fontWeight: frame.framePrint.frameFontWeight,
                                    gridArea: '1 / 1 / 2 / 2',
                                    visibility: 'hidden',
                                    whiteSpace: "pre",
                                    margin: `0 ${1.5 * sc}px`
                                  }}>
                                    {frame.framePrint.text}
                                  </span>
                                </div>
                              </div>
                            }
                            {(frame.framePrint.text !== "" && frame.framePrint.over) &&
                              <div style={{ position: "absolute", width: "100%" }}>
                                <div style={!visual ? { ...autoResizeInputStyle, top: `${frame.framePrint.textY * sc}px`, left: `${frame.framePrint.textX * sc}px`, transition: "0s" } :
                                  { ...autoResizeInputStyle, top: `${frame.framePrint.textY * sc}px`, left: `${frame.framePrint.textX * sc}px`, transition: "0.4s ease" }}>
                                  <input className="text_input_frame"
                                    type="text"
                                    autoComplete="off"
                                    maxLength="16"
                                    style={
                                      {
                                        ...textStyleFrame,
                                        fontFamily: frame.framePrint.frameFont,
                                        fontWeight: frame.framePrint.frameFontWeight,
                                        backgroundColor: chosenColor.hex,
                                        border: "none",
                                        zIndex: "99999",
                                        color: "#dc3545",
                                      }
                                    }
                                    disabled={true}
                                    value={frame.framePrint.text}
                                  />
                                  <span style={{
                                    fontFamily: frame.framePrint.frameFont,
                                    fontWeight: frame.framePrint.frameFontWeight,
                                    gridArea: '1 / 1 / 2 / 2', visibility: 'hidden',
                                    whiteSpace: "pre",
                                    margin: `0 ${1.5 * sc}px`
                                  }}>
                                    {frame.framePrint.text}
                                  </span>
                                </div>
                              </div>
                            }
                          </div>
                        }
                      </div>
                    )}
                  </>
                }


                {hideAll &&
                  <>
                    {frameHolders.map((frame, i) =>
                      <div key={i} >
                        {frame.type === "single" &&
                          <div className="panel_content" style={{ ...contentStyle, position: "absolute" }}>

                            {frame.framePrint.map((el, index) =>
                              <div key={index}
                                style={
                                  ((index + 2) % 3 === 0) ?
                                    (
                                      ((index > iconHolders.length - 4) ? { ...cellStyle, width: `${chosenModel.centerCellWidth * sc}px`, height: `${chosenModel.lastRowHeight * sc}px` }
                                        : { ...cellStyle, width: `${chosenModel.centerCellWidth * sc}px`, height: `${chosenModel.rowHeight * sc}px` })
                                    )
                                    : (
                                      ((index > iconHolders.length - 4) ? { ...cellStyle, width: `${chosenModel.sideCellWidth * sc}px`, height: `${chosenModel.lastRowHeight * sc}px` }
                                        : { ...cellStyle, width: `${chosenModel.sideCellWidth * sc}px`, height: `${chosenModel.rowHeight * sc}px` })
                                    )} >
                                {el !== 0 && !visual &&
                                  <div style={el.shape === "sharp" ?
                                    { ...singleFrameStyle, borderColor: chosenColor.iconColor, borderRadius: "0", }
                                    : { ...singleFrameStyle, borderColor: chosenColor.iconColor, borderRadius: `${sc}px` }}
                                  />
                                }
                                {el !== 0 && visual &&
                                  <div style={el.shape === "sharp" ? { ...singleFrameStyle, borderColor: "white", borderRadius: "0", zIndex: "99999" }
                                    : { ...singleFrameStyle, borderColor: "White", borderRadius: `${sc}px`, zIndex: "99999" }}
                                  />
                                }
                                {el !== 0 && el.over && !visual &&
                                  <div style={el.shape === "sharp" ? { ...singleFrameStyle, borderColor: "#dc3545", borderRadius: "0", zIndex: "9999", }
                                    : { ...singleFrameStyle, borderColor: "#dc3545", borderRadius: `${sc}px`, zIndex: "9999", }}
                                  />
                                }
                              </div>
                            )}
                          </div>
                        }
                      </div>
                    )}
                  </>
                }

                <div className="panel_content" style={{ ...contentFrameStyle, position: "absolute" }}>
                  {hideAll && !visual &&
                    <>
                      {tempFrame.frameArr.map((el, index) =>
                        <div key={index}
                          style={
                            ((index + 2) % 3 === 0) ?
                              { ...cellStyle, width: `${chosenModel.centerColumnFrameWidth * sc}px`, height: `${chosenModel.multiRowFrameHeight * sc}px` }
                              : { ...cellStyle, width: `${chosenModel.sideColumnFrameWidth * sc}px`, height: `${chosenModel.multiRowFrameHeight * sc}px` }
                          } >

                          {el !== 0 &&
                            <div style={chosenFrameShape === "sharp" ? {
                              ...frameTempStyle, borderRadius: "0",
                              height: `${el.fh * sc}px`,
                              width: `${el.fw * sc}px`,
                              marginBottom: `${el.mb * sc}px`,
                              marginLeft: `${el.ml * sc}px`,
                              marginRight: `${el.mr * sc}px`,
                              transition: "0s",
                            }
                              : {
                                ...frameTempStyle, borderRadius: `${el.rtl * sc}px ${el.rtr * sc}px ${el.rbr * sc}px ${el.rbl * sc}px`,
                                height: `${el.fh * sc}px`,
                                width: `${el.fw * sc}px`,
                                marginBottom: `${el.mb * sc}px`,
                                marginLeft: `${el.ml * sc}px`,
                                marginRight: `${el.mr * sc}px`,
                                transition: "0s"
                              }}
                              className={`border_top${el.t} border_right${el.r} border_bottom${el.b} border_left${el.l}`}
                            />
                          }
                        </div>
                      )}

                      {textFrame && chosenTab === "frame" && chosenColor.RAL !== "SMOKED_GLASS" && frameTitleFlag &&
                        <div style={{ zIndex: "999", position: "absolute", width: "100%" }}>
                          <div style={{ transition: "0.4s ease", position: "absolute", width: "100%" }}>
                            <form onSubmit={handleSubmit}>
                              <div style={{ ...autoResizeInputStyle, top: `${tempFrame.textY * sc}px`, left: `${tempFrame.textX * sc}px`, transition: "0s" }}>


                                <input className="text_input_frame"
                                  type="text"
                                  autoComplete="off"
                                  maxLength="16"
                                  style={(isFocusedInputFrame) ?
                                    (
                                      (chosenColor.hex !== "#30a32c") ? {
                                        ...textStyleFrame,
                                        fontFamily: chosenFrameFont,
                                        fontWeight: chosenFrameFontWeight,
                                        border: "2px dashed rgb(40, 167, 69)",
                                        backgroundColor: chosenColor.hex,
                                      } :
                                        {
                                          ...textStyleFrame,
                                          fontFamily: chosenFrameFont,
                                          fontWeight: chosenFrameFontWeight,
                                          border: "2px dashed rgb(32, 114, 30)",
                                          backgroundColor: chosenColor.hex,
                                        }
                                    )
                                    : {
                                      ...textStyleFrame,
                                      fontFamily: chosenFrameFont,
                                      fontWeight: chosenFrameFontWeight,
                                      backgroundColor: chosenColor.hex,
                                    }}
                                  disabled={chosenTab !== "frame" && true}
                                  onMouseOver={showFrameBorder}
                                  onMouseLeave={hideFrameBorder}
                                  value={frameText}
                                  onChange={(text) => handleChangeTextFrame(text)}
                                  onFocus={() => setIsFocusedInputFrame(true)}
                                  onKeyDown={handleKeyPress}
                                />
                                <span style={{
                                  gridArea: '1 / 1 / 2 / 2',
                                  visibility: 'hidden',
                                  fontFamily: chosenFrameFont,
                                  fontWeight: chosenFrameFontWeight,
                                  padding: "0 8px",
                                  whiteSpace: "pre",
                                  margin: `0 ${1.5 * sc}px`
                                }}>
                                  {frameText}
                                </span>


                                {(isFocusedInputFrame && chosenColor.hex !== "#30a32c") &&
                                  <input type="image" src={Submitinput} alt="submitinput"
                                    style={{
                                      height: `${3.6 * sc}px`,
                                      width: `${3.6 * sc}px`,
                                      transform: "translate(75%, -50%)",
                                      gridArea: '1 / 1 / 2 / 2',
                                    }}
                                  />
                                }
                                {(isFocusedInputFrame && chosenColor.hex === "#30a32c") &&
                                  <input type="image" src={Submitinputdark} alt="submitinput"
                                    style={{
                                      height: `${3.6 * sc}px`,
                                      width: `${3.6 * sc}px`,
                                      transform: "translate(75%, -50%)",
                                      gridArea: '1 / 1 / 2 / 2',
                                    }}
                                  />
                                }

                                {isFocusedInputFrame &&
                                  <img src={Clearinput} alt="clearinput"
                                    style={{
                                      height: `${3.6 * sc}px`,
                                      width: `${3.6 * sc}px`,
                                      transform: "translate(200%, -50%)",
                                      gridArea: '1 / 1 / 2 / 2',
                                      cursor: "pointer",
                                    }}
                                    onClick={handleClearInputFrame}
                                  />
                                }
                              </div>
                            </form>
                          </div>
                        </div>
                      }

                    </>}
                </div>

                {!visualSmooth &&
                  <>
                    <div className="visualization_frame" style={visual ? { ...visualStyle, border: `4px groove ${chosenColor.hex}`, opacity: "1", boxShadow: "rgba(0, 0, 0, 0.55) 10px 5px 20px" } :
                      { ...visualStyle, opacity: "0" }} />
                    <div className="visualization_frame" style={visual ? { ...visualStyle, border: `4px groove white`, opacity: "0.2" } : { ...visualStyle, opacity: "0" }} />
                    {(lcdShow && visual && chosenColor.RAL !== "SMOKED_GLASS") && <div style={{ ...lcdStyle, position: "absolute", backgroundColor: "#141414" }} />}
                    {(lcdShow && visual && chosenColor.RAL === "SMOKED_GLASS") && <div style={{ ...lcdStyle, position: "absolute", backgroundColor: "black" }} />}
                    <div className="visualization_glass" style={visual ? { ...visualStyle, opacity: "1" } : { ...visualStyle, opacity: "0" }} />
                    <div className="visualization_glass_bis" style={visual ? { ...visualStyle, opacity: "1" } : { ...visualStyle, opacity: "0" }} />
                    <div className="visualization_frame" style={visual ? { ...visualStyle, ...cutBorderStyle, zIndex: "9999" } : { ...visualStyle, opacity: "0" }} />
                    <img src={LogoPure} alt="logo" className="logo_pure" style={visual ? { ...logoStyle, opacity: "1" } : { ...logoStyle, opacity: "0" }} />
                  </>}

                <div className="panel_content" style={contentStyle}>

                  {hideAll &&
                    <>
                      {iconHolders.map(({
                        flag,
                        textUp,
                        fontUp,
                        fontUpWeight,
                        textDown,
                        fontDown,
                        fontDownWeight,
                        lastDroppedDot,
                        lastDroppedIcon,
                        lastDroppedSlashUp,
                        lastDroppedSlashDown,
                        rotationDot,
                        rotationIcon,
                        rotationDown,
                        rotationUp,
                        selectedDot,
                        selected,
                        selectedDown,
                        selectedUp,
                        singleFrame,
                        singleFrameTemp,
                        splitIconProportions
                      }, index) =>
                        <div key={index}
                          style={
                            ((index + 2) % 3 === 0) ?
                              (
                                ((index > iconHolders.length - 4) ? { ...cellStyle, width: `${chosenModel.centerCellWidth * sc}px`, height: `${chosenModel.lastRowHeight * sc}px` }
                                  : { ...cellStyle, width: `${chosenModel.centerCellWidth * sc}px`, height: `${chosenModel.rowHeight * sc}px` })
                              )
                              : (
                                ((index > iconHolders.length - 4) ? { ...cellStyle, width: `${chosenModel.sideCellWidth * sc}px`, height: `${chosenModel.lastRowHeight * sc}px` }
                                  : { ...cellStyle, width: `${chosenModel.sideCellWidth * sc}px`, height: `${chosenModel.rowHeight * sc}px` })
                              )}>
                          {flag === 1 &&
                            <>
                              <div className="text_box" style={chosenTab === "text" ? (isFocusedInputIndex === index) ? { zIndex: "99999" } : { zIndex: "999" } : { zIndex: "0" }}>
                                <div className="text_box" style={!chosenModel.panelRotation ? { transition: "0.4s ease" } : {
                                  transform: "rotate(90deg)",
                                  transformOrigin: `center ${10.4 * sc}px`,
                                  transition: "0.4s ease"
                                }}>
                                  {textUpOff &&
                                    <form onSubmit={handleSubmit}>
                                      <div style={!chosenModel.panelRotation ?
                                        { ...autoResizeInputStyle, top: `${-1.5 * sc}px`, fontFamily: fontUp, fontWeight: fontUpWeight }
                                        :
                                        { ...autoResizeInputStyle, top: `${2.85 * sc}px`, fontFamily: fontUp, fontWeight: fontUpWeight }}>
                                        <input className="text_input"
                                          type="text"
                                          autoComplete="off"
                                          maxLength="16"
                                          style={(isFocusedInputIndex === index && isFocusedInputSide === "up") ?
                                            (
                                              (chosenColor.hex !== "#30a32c") ? {
                                                ...textStyle,
                                                ...textUpStyle,
                                                fontFamily: fontUp,
                                                fontWeight: fontUpWeight,
                                                border: "2px solid rgb(40, 167, 69)"
                                              } :
                                                {
                                                  ...textStyle,
                                                  ...textUpStyle,
                                                  fontFamily: fontUp,
                                                  fontWeight: fontUpWeight,
                                                  border: "2px solid rgb(32, 114, 30)",
                                                }
                                            )
                                            : {
                                              ...textStyle,
                                              ...textUpStyle,
                                              fontFamily: fontUp,
                                              fontWeight: fontUpWeight,
                                            }}
                                          disabled={chosenTab !== "text" && true}
                                          onMouseOver={showBorder}
                                          onMouseLeave={hideBorder}
                                          value={textUp}
                                          onChange={(text) => handleChangeTextUp(index, text)}
                                          onClick={() => handleChangeFontUp(index)}
                                          onFocus={() => { handleFocusInput(index, "up") }}
                                          onKeyDown={handleKeyPress}
                                        />
                                        <span style={{ gridArea: '1 / 1 / 2 / 2', visibility: 'hidden', padding: "0 15px", whiteSpace: "pre" }}>
                                          {textUp}
                                        </span>

                                        {(isFocusedInputIndex === index && isFocusedInputSide === "up" && chosenColor.hex !== "#30a32c") &&
                                          <input type="image" src={Submitinput} alt="submitinput"
                                            style={{
                                              height: `${3.6 * sc}px`,
                                              width: `${3.6 * sc}px`,
                                              transform: "translateX(75%)",
                                              gridArea: '1 / 1 / 2 / 2',

                                            }}
                                          />
                                        }
                                        {(isFocusedInputIndex === index && isFocusedInputSide === "up" && chosenColor.hex === "#30a32c") &&
                                          <input type="image" src={Submitinputdark} alt="submitinput"
                                            style={{
                                              height: `${3.6 * sc}px`,
                                              width: `${3.6 * sc}px`,
                                              transform: "translateX(75%)",
                                              gridArea: '1 / 1 / 2 / 2',
                                            }}
                                          />
                                        }
                                        {isFocusedInputIndex === index && isFocusedInputSide === "up" &&
                                          <img src={Clearinput} alt="clearinput"
                                            style={{
                                              height: `${3.6 * sc}px`,
                                              width: `${3.6 * sc}px`,
                                              transform: "translate(200%, 0%)",
                                              gridArea: '1 / 1 / 2 / 2',
                                              cursor: "pointer",
                                            }}
                                            onClick={() => { handleClearInput(index, "up") }}
                                          />
                                        }
                                      </div>
                                    </form>
                                  }
                                  <form onSubmit={handleSubmit}>
                                    <div style={{ ...autoResizeInputStyle, top: `${14.35 * sc}px`, fontFamily: fontDown, fontWeight: fontDownWeight }}>
                                      <input className="text_input"
                                        type="text"
                                        autoComplete="off"
                                        maxLength="16"
                                        style={(isFocusedInputIndex === index && isFocusedInputSide === "down") ?
                                          (
                                            (chosenColor.hex !== "#30a32c") ? {
                                              ...textStyle,
                                              fontFamily: fontDown,
                                              fontWeight: fontDownWeight,
                                              border: "2px solid rgb(40, 167, 69)"
                                            } :
                                              {
                                                ...textStyle,
                                                fontFamily: fontDown,
                                                fontWeight: fontDownWeight,
                                                border: "2px solid rgb(32, 114, 30)"
                                              }
                                          )
                                          : {
                                            ...textStyle,
                                            fontFamily: fontDown,
                                            fontWeight: fontDownWeight
                                          }}
                                        disabled={chosenTab !== "text" && true}
                                        onMouseOver={showBorder}
                                        onMouseLeave={hideBorder}
                                        value={textDown}
                                        onChange={(text) => handleChangeTextDown(index, text)}
                                        onClick={() => handleChangeFontDown(index)}
                                        onFocus={() => { handleFocusInput(index, "down") }}
                                        onKeyDown={handleKeyPress}
                                      />
                                      <span style={{ gridArea: '1 / 1 / 2 / 2', visibility: 'hidden', padding: "0 15px", whiteSpace: "pre" }}>
                                        {textDown}
                                      </span>
                                      {(isFocusedInputIndex === index && isFocusedInputSide === "down" && chosenColor.hex !== "#30a32c") &&
                                        <input type="image" src={Submitinput} alt="submitinput"
                                          style={{
                                            height: `${3.6 * sc}px`,
                                            width: `${3.6 * sc}px`,
                                            transform: "translateX(75%)",
                                            gridArea: '1 / 1 / 2 / 2',
                                          }}
                                        />
                                      }
                                      {(isFocusedInputIndex === index && isFocusedInputSide === "down" && chosenColor.hex === "#30a32c") &&
                                        <input type="image" src={Submitinputdark} alt="submitinput"
                                          style={{
                                            height: `${3.6 * sc}px`,
                                            width: `${3.6 * sc}px`,
                                            transform: "translateX(75%)",
                                            gridArea: '1 / 1 / 2 / 2',
                                          }}
                                        />
                                      }
                                      {isFocusedInputIndex === index && isFocusedInputSide === "down" &&
                                        <img src={Clearinput} alt="clearinput"
                                          style={{
                                            height: `${3.6 * sc}px`,
                                            width: `${3.6 * sc}px`,
                                            transform: "translate(200%, 0%)",
                                            gridArea: '1 / 1 / 2 / 2',
                                            cursor: "pointer",
                                          }}
                                          onClick={() => { handleClearInput(index, "down") }}
                                        />
                                      }
                                    </div>
                                  </form>
                                </div>
                              </div>

                              <IconHolder
                                index={index}
                                lastDroppedDot={lastDroppedDot}
                                lastDroppedIcon={lastDroppedIcon}
                                lastDroppedSlashUp={lastDroppedSlashUp}
                                lastDroppedSlashDown={lastDroppedSlashDown}
                                chosenColor={chosenColor}
                                rotationDot={rotationDot}
                                rotationIcon={rotationIcon}
                                rotationDown={rotationDown}
                                rotationUp={rotationUp}
                                panelRotation={chosenModel.panelRotation}
                                selectedDot={selectedDot}
                                selected={selected}
                                selectedDown={selectedDown}
                                selectedUp={selectedUp}
                                singleFrame={singleFrame}
                                singleFrameTemp={singleFrameTemp}
                                visual={visual}
                                splitIconProportions={splitIconProportions}
                              />
                            </>}
                        </div>
                      )}


                      {(lcdShow && !visual) && <div className="lcd" style={{ ...lcdStyle, borderColor: chosenColor.iconColor }} />}
                      {(lcdShow && visual && lcdNew) &&
                        <div className="lcd_visual" style={{ ...lcdStyle, padding: `${2 * sc}px ${1 * sc}px` }}>
                          <div className="lcd_icon_box">
                            < img src={LCDPause} alt="pause" className="lcd_icon" style={lcdIconStyle} />
                            < img src={LCDPlay} alt="play" className="lcd_icon" style={lcdIconStyle} />
                          </div>

                          <div className="lcd_icon_box">
                            < img src={LCDMinus} alt="minus" className="lcd_icon" style={lcdIconStyle} />
                            < img src={LCDPlus} alt="plus" className="lcd_icon" style={lcdIconStyle} />
                          </div>
                        </div>
                      }
                      {(lcdShow && visual && !lcdNew) &&
                        <div className="lcd_visual" style={{ ...lcdStyle, padding: `${2 * sc}px ${1 * sc}px`, justifyContent: "center" }}>
                          <p className="lcd_clock" style={{ fontSize: `${3 * sc}px`, lineHeight: `${3.3 * sc}px` }}>{date}</p>
                          <p className="lcd_clock" style={{ fontSize: `${5 * sc}px`, lineHeight: `${5.5 * sc}px` }}>{time}</p>
                        </div>
                      }
                      {(lcdShow && visual && lcdNew) &&
                        <div className="lcd_visual" style={{ ...lcdStyle, padding: `${2 * sc}px ${1 * sc}px` }}>
                          <div className="lcd_icon_box">
                            < img src={LCDPause} alt="pause" className="lcd_icon" style={lcdIconStyle} />
                            < img src={LCDPlay} alt="play" className="lcd_icon" style={lcdIconStyle} />
                          </div>

                          <div>
                            <p className="lcd_clock" style={{ fontSize: `${3 * sc}px`, lineHeight: `${3.3 * sc}px` }}>{date}</p>
                            <p className="lcd_clock" style={{ fontSize: `${5 * sc}px`, lineHeight: `${5.5 * sc}px` }}>{time}</p>
                          </div>

                          <div className="lcd_icon_box">
                            < img src={LCDMinus} alt="minus" className="lcd_icon" style={lcdIconStyle} />
                            < img src={LCDPlus} alt="plus" className="lcd_icon" style={lcdIconStyle} />
                          </div>
                        </div>
                      }
                      {lcdNew &&
                        <div className="universal_icons" style={universalIconBoxStyle}>
                          < img src={Minusuni} alt="minusuni" className="universal_icon"
                            style={{ ...universalIconStyle, top: `${6.65 * sc}px`, left: `${7.45 * sc}px` }} />
                          < img src={Minusuni} alt="minusuni" className="universal_icon"
                            style={{ ...universalIconStyle, top: `${6.65 * sc}px`, left: `${55.45 * sc}px` }} />
                          < img src={Leftuni} alt="leftuni" className="universal_icon"
                            style={{ ...universalIconStyle, top: `${26.65 * sc}px`, left: `${7.45 * sc}px` }} />
                          < img src={Rightuni} alt="rightuni" className="universal_icon"
                            style={{ ...universalIconStyle, top: `${26.65 * sc}px`, left: `${55.45 * sc}px` }} />
                          < img src={Minusuni} alt="minusuni" className="universal_icon"
                            style={{ ...universalIconStyle, top: `${46.65 * sc}px`, left: `${7.45 * sc}px` }} />
                          < img src={Minusuni} alt="minusuni" className="universal_icon"
                            style={{ ...universalIconStyle, top: `${46.65 * sc}px`, left: `${55.45 * sc}px` }} />
                        </div>
                      }
                    </>
                  }
                </div>
              </div>

            </div>
          </div>
          <div className="preview_bottom">
            <div className="bottom_info_model">
              <span>{t(chosenModel.type)}</span>
            </div>
            <div className="scale_container">
              <div className="scale_box">
                <img src={Zoomout} alt="zoomout" className="scale_icon" onClick={handleZoomOut}
                  style={sc === 4 ? { filter: "invert(53%) sepia(6%) saturate(18%) hue-rotate(343deg) brightness(94%) contrast(84%)", cursor: "not-allowed" } : {}}
                  data-tip data-for='zoomout'
                />
                <div style={sc === 4 ? { opacity: "1" } : { opacity: "0" }}>
                  <ReactTooltip className='tooltip_custom' id='zoomout' place="top" type="error" effect="float" >
                    <span>{t("MIN_SCALING")}</span>
                  </ReactTooltip>
                </div>
              </div>
              <div className="scale_box">
                <img src={Resize} alt="resize" className="scale_icon" onClick={handleResize} data-tip data-for='resize' />
                <ReactTooltip className='tooltip_custom' id='resize' place="top" type="error" effect="float" delayShow={300}>
                  <span>{t("DEFAULT_SCALE_TOOLTIP")}</span>
                </ReactTooltip>
              </div>
              <div className="scale_box">
                <img src={Fullscreen} alt="fullscreen" className="scale_icon" onClick={() => { setFullScreen(true) }} data-tip data-for='fullscreen' />
                <ReactTooltip className='tooltip_custom' id='fullscreen' place="top" type="error" effect="float" delayShow={300}>
                  <span>{t("FULLSCREEN_ON_TOOLTIP")}</span>
                </ReactTooltip>
              </div>
              <div className="scale_box">
                <img src={Zoomin} alt="zoomin" className="scale_icon" onClick={handleZoomIn}
                  style={sc === 8 ? { filter: "invert(53%) sepia(6%) saturate(18%) hue-rotate(343deg) brightness(94%) contrast(84%)", cursor: "not-allowed" } : {}}
                  data-tip data-for='zoomin'
                />
                <div style={sc === 8 ? { opacity: "1" } : { opacity: "0" }}>
                  <ReactTooltip className='tooltip_custom' id='zoomin' place="top" type="error" effect="float" >
                    <span>{t("MAX_SCALING")}</span>
                  </ReactTooltip>
                </div>
              </div>
            </div>
            <div className="bottom_info_ral">
              {chosenColor.RAL === "SMOKED_GLASS" ?
                <span>{t(chosenColor.RAL)}</span>
                : <span>{chosenColor.RAL}</span>
              }

            </div>
          </div>
        </div>


        <div className="preview_side_container">
          <div className="preview_side_scroll">
            <div className="preview_side">

              <Overlay target={target.current} show={noPanelName} placement="top">
                {({ placement, arrowProps, show: _show, popper, ...props }) => (
                  <div
                    {...props}
                    style={{
                      backgroundColor: 'rgba(220, 53, 69, 0.85)',
                      fontSize: "14px",
                      fontFamily: "'Montserrat', sans-serif",
                      padding: '10px 15px',
                      color: 'white',
                      borderRadius: 3,
                      ...props.style,
                    }}
                  >
                    {t("ENTER_PANEL_NAME")}
                  </div>
                )}
              </Overlay>


              <Overlay target={target.current} show={occupiedPanelName} placement="top">
                {({ placement, arrowProps, show: _show, popper, ...props }) => (
                  <div
                    {...props}
                    style={{
                      backgroundColor: 'rgba(220, 53, 69, 0.85)',
                      fontSize: "14px",
                      fontFamily: "'Montserrat', sans-serif",
                      padding: '10px 15px',
                      color: 'white',
                      borderRadius: 3,
                      ...props.style,
                    }}
                  >
                    {t("BUSY_PANEL_NAME")}
                  </div>
                )}
              </Overlay>

              <div className="side_box">

                {!downloading &&
                  <img src={Savetopdf} alt="savetopdf" className="side_icon" onClick={handlePrintPdf} />
                }
                {downloading &&
                  <>
                    <img src={Savetopdfload} alt="savetopdf" className="side_icon" />
                    <img src={Downloadpdfarrow} alt="savetopdf" className="side_icon_arrow"
                      style={{ animationName: "downloadnigPrewiev" }}
                    />
                  </>
                }
                {downloading ?
                  <span>{t("SAVING")} <br />{t("TO_PDF")}<br />  </span>
                  :
                  <span>{t("SAVE_TO_PDF")}</span>
                }
              </div>

              <div className="side_box">
                <img src={Saveandback} alt="saveandback" className="side_icon" onClick={handleSave} />
                <span>{t("SAVE_AND_GO_BACK")}</span>
              </div>

              <div className="side_box">
                <img src={Back} alt="back" className="side_icon" onClick={() => showAlert(2)} />
                <span>{t("NO_SAVE_AND_GO_BACK")}</span>
              </div>


              <div className="side_box">
                <img src={Visual} alt="visualization" className="side_icon" onClick={handleVisual} />
                {!visual ? <span>{t("VISUALIZATION_MODE")}</span> : <span>{t("EDIT_MODE")}</span>}
              </div>

              <div className="side_box">
                <img src={Clearall} alt="clearall" className="side_icon"
                  onClick={() => showAlert(3)}
                  onMouseOver={() => setRemoveAll(true)}
                  onMouseLeave={() => setRemoveAll(false)}
                />
                <span>{t("RESET_ALL")}</span>
              </div>


              {chosenTab === "icons" &&
                <>
                  <div className="side_box" data-for="animation_tooltip" data-tip={t("ANIMATION_TOOLTIP")}>
                    {animations ?
                      <img src={Animoff} alt="animationoff" className="side_icon" onClick={() => { toggleAnimations(!animations) }} />
                      : <img src={Anim} alt="animation" className="side_icon" onClick={() => { toggleAnimations(!animations) }} />
                    }
                    {animations ? <span>{t("ANIMATION_OFF")}</span> : <span>{t("ANIMATION_OFF")}</span>}
                  </div>
                  <ReactTooltip id="animation_tooltip" place="left" type="error" effect="float" className='tooltip_custom' delayShow={400} />




                  <div className="side_box" data-for="proportions_tooltip" data-tip={t("PROPORTIONS_TOOLTIP")}>
                    <img src={globalProportions === 0 ? PropoportionsAllTo7030 : globalProportions === 1 ? PropoportionsAllTo3070 : globalProportions === 2 ? PropoportionsAllTo5050 : PropoportionsAllReset}
                      alt="proportions" className="side_icon" onClick={handleSwitchSplitIconProportionsGlobal} />
                    {globalProportions === 3 ? <span>{t("SIDE_ICON_PROPORTIONS_GLOBAL_RESET")}</span> : <span>{t("SIDE_ICON_PROPORTIONS_GLOBAL")}</span>}
                  </div>
                  {!areThereAnySplit &&
                    <ReactTooltip id="proportions_tooltip" place="left" type="error" effect="float" className='tooltip_custom' delayShow={400} />
                  }

                  {isAnySplitSelected !== 3 ?
                    <div className="side_box" >
                      <img
                        src={isAnySplitSelected === 0 ? PropoportionsTo7030 : isAnySplitSelected === 1 ? PropoportionsTo3070 : PropoportionsTo5050}
                        alt="proportions" className="side_icon" onClick={handleSwitchSplitIconProportions} />
                      <span>{t("SIDE_ICON_PROPORTIONS")}</span>
                    </div>
                    :
                    <div className="side_box" style={{ filter: "grayscale(100%)", cursor: "not-allowed" }} data-tip={t("PROPORTIONS_SINGLE_TOOLTIP")}>
                      <img
                        src={PropoportionsTo7030}
                        alt="proportions" className="side_icon" />
                      <span>{t("SIDE_ICON_PROPORTIONS")}</span>
                    </div>
                  }


                  {areThereAnyIcons ?
                    <div className="side_box">
                      <img src={Clearallicons} alt="clearallicons" className="side_icon" onClick={() => showAlert(4)}
                        onMouseOver={() => showRemoveIcons(true)}
                        onMouseLeave={handleHideRemoveIcons}
                      />
                      <span>{t("DALETE_ALL_ICONS")}</span>
                    </div>
                    :
                    <div className="side_box" style={{ filter: "grayscale(100%)", cursor: "not-allowed" }} data-tip={t("ADD_ICONS_TOOLTIP")}>
                      <img src={Clearallicons} alt="clearallicons" className="side_icon" />
                      <span>{t("DALETE_ALL_ICONS")}</span>
                    </div>
                  }

                  {isAnySelected ?
                    <>
                      <div className="side_box">
                        <img src={Clear} alt="clear" className="side_icon" onClick={handleClearIcon}
                          onMouseOver={() => showRemoveIcon(true)} onMouseLeave={() => showRemoveIcon(false)} />
                        <span>{t("DALETE_SELECTED_ICON")}</span>
                      </div>

                      <div className="side_box">
                        <img src={Rotateright} alt="rotateright" className="side_icon" onClick={handleRotateRight} />
                        <span>{t("ROTATE_RIGHT")}</span>
                      </div>
                      <div className="side_box">
                        <img src={Rotateleft} alt="rotateleft" className="side_icon" onClick={handleRotateLeft} />
                        <span>{t("ROTATE_LEFT")}</span>
                      </div>
                    </>
                    :
                    <>
                      <div className="side_box" style={{ filter: "grayscale(100%)", cursor: "not-allowed" }} data-tip={t("SELECT_ICON_TOOLTIP")}>
                        <img src={Clear} alt="clear" className="side_icon" />
                        <span>{t("DALETE_SELECTED_ICON")}</span>
                      </div>

                      <div className="side_box" style={{ filter: "grayscale(100%)", cursor: "not-allowed" }} data-tip={t("SELECT_ICON_TOOLTIP")}>
                        <img src={Rotateright} alt="rotateright" className="side_icon" />
                        <span>{t("ROTATE_RIGHT")}</span>
                      </div>
                      <div className="side_box" style={{ filter: "grayscale(100%)", cursor: "not-allowed" }} data-tip={t("SELECT_ICON_TOOLTIP")}>
                        <img src={Rotateleft} alt="rotateleft" className="side_icon" />
                        <span>{t("ROTATE_LEFT")}</span>
                      </div>
                    </>
                  }
                  <ReactTooltip place="left" type="error" effect="float" className='tooltip_custom' />
                  <div className="side_box" >

                    {!downloading &&
                      <img src={Savetopdfdebug} alt="savetopdf" className="side_icon" onClick={handlePrintPdfDebug} style={{ cursor: "default" }} />
                    }
                    {downloading &&
                      <img src={Savetopdfdebug} alt="savetopdf" className="side_icon" style={{ filter: "invert(29%) sepia(6%) saturate(152%) hue-rotate(131deg) brightness(92%) contrast(90%)" }} />
                    }
                    {/* {downloading ?
                      <span>DEBUGGING</span>
                      :
                      <span
                        // style={{ color: "rgb(73, 75, 75)" }}>{t("DEBUG")}</span>
                        style={{ color: "#3f4141" }}>{t("DEBUG")}</span>
                    } */}
                  </div>

                </>
              }
              {chosenTab === "text" &&
                <>
                  <div className="side_box">
                    <img src={Textborder} alt="textborder" className="side_icon" onClick={() => { setShowTextBorder(prev => !prev) }} />
                    <span>{showTextBorder ? t("HIDE_BORDERS") : t("SHOW_BORDERS")}</span>
                  </div>

                  <div className="side_box">
                    {textUpOff ?
                      <img src={Textupoff} alt="textupoff" className="side_icon" onClick={handleTextUpOff}
                        onMouseOver={() => { setOverUpDescriptions(true) }}
                        onMouseLeave={() => { setOverUpDescriptions(false) }}
                      />
                      :
                      <img src={Textupon} alt="textupon" className="side_icon" onClick={handleTextUpOff}
                        onMouseOver={() => { setOverUpDescriptions(true) }}
                        onMouseLeave={() => { setOverUpDescriptions(false) }}
                      />}
                    {textUpOff ? <span>{t("TRUN_OFF_UP_DESCRIPTION")}</span> : <span>{t("TRUN_ON_UP_DESCRIPTION")}</span>}
                  </div>

                  {panelTextBackEnd.length !== 0 ?
                    <div className="side_box" >
                      <img src={Clearalltext} alt="clearalltext" className="side_icon"
                        onClick={() => showAlert(6)}
                        onMouseOver={() => { setOverDescriptions(true) }}
                        onMouseLeave={() => { setOverDescriptions(false) }}
                      />
                      <span>{t("DELTEL_ALL_DESCRIPTIONS")}</span>
                    </div>
                    :
                    <div className="side_box" style={{ filter: "grayscale(100%)", cursor: "not-allowed" }} data-tip={t("ADD_DESCRIPTION_TOOLTIP")}>
                      <img src={Clearalltext} alt="clearalltext" className="side_icon" />
                      <span>{t("DELTEL_ALL_DESCRIPTIONS")}</span>
                    </div>
                  }

                  <div className="side_box">
                    <img src={Setonefont} alt="setonefont" className="side_icon" onClick={handleSetOneFont} />
                    <span>{t("CHOSEN_FONT_FOR_ALL_DESCRIPTIONS")}</span>
                  </div>

                  <ReactTooltip place="left" type="error" effect="float" className='tooltip_custom' />

                </>
              }
              {chosenTab === "frame" && chosenColor.RAL !== "SMOKED_GLASS" &&
                <>

                  <div className="side_box">
                    <img src={Frameblacklight} alt="frameblacklight" className="side_icon" onClick={() => { setShowFramBlackLight(prev => !prev) }} />
                    {showFramBlackLight ? <span>{t("HIDE_BACKLIGHT")}</span> : <span>{t("SHOW_BACKLIGHT")}</span>}
                  </div>

                  <div className="side_box">
                    {allFramesSharpRound ?
                      <img src={Framesharp} alt="framesharp" className="side_icon" onClick={handleChangeFramesToSharp} />
                      :
                      <img src={Frameround} alt="frameround" className="side_icon" onClick={handleChangeFramesToRound} />}
                    {allFramesSharpRound ? <span>{t("ALL_CORNERS_STRAIGHT")}</span> : <span>{t("ALL_CORNERS_ROUNDED")}</span>}
                  </div>

                  {frameHolders.length !== 0 ?

                    <div className="side_box" >
                      <img src={Removeallframes} alt="ramoveallframes" className="side_icon"
                        onClick={() => showAlert(5)}
                        onMouseOver={() => { overFrameAll(true); setOverCurrFrame(true) }}
                        onMouseLeave={() => { overFrameAll(false); setOverCurrFrame(false) }}
                      />
                      <span>{t("DELETE_ALL_FRAMES")}</span>
                    </div>
                    :
                    <div className="side_box" style={{ filter: "grayscale(100%)", cursor: "not-allowed" }} data-tip={t("CONFIRM_FRAME_TOOLTIP")}>
                      <img src={Removeallframes} alt="ramoveallframes" className="side_icon" />
                      <span>{t("DELETE_ALL_FRAMES")}</span>
                    </div>
                  }

                  {frameHoldersTemp ?

                    <div className="side_box" >
                      <img src={Removecurrframe} alt="removecurrframe" className="side_icon" onClick={handleResetCurrFrame} />
                      <span>{t("DELETE_CURRENT_FRAME")}</span>
                    </div>
                    :
                    <div className="side_box" style={{ filter: "grayscale(100%)", cursor: "not-allowed" }} data-tip={t("CREATE_FRAME_TOOLTIP")}>
                      <img src={Removecurrframe} alt="removecurrframe" className="side_icon" />
                      <span>{t("DELETE_CURRENT_FRAME")}</span>
                    </div>
                  }

                  {frameTitleFlag ?

                    <div className="side_box">
                      <img src={Textborder} alt="textborder" className="side_icon"
                        onClick={!frameTitleFlag ? null : () => { setShowFrameTextBorder(prev => !prev) }} />
                      <span>{showFrameTextBorder ? t("HIDE_BORDERS") : t("SHOW_BORDERS")}</span>
                    </div>
                    :
                    <div className="side_box" style={{ filter: "grayscale(100%)", cursor: "not-allowed" }} data-tip={t("ADD_TITLE_TOOLTIP")} >
                      <img src={Textborder} alt="textborder" className="side_icon" />
                      <span>{showFrameTextBorder ? t("HIDE_BORDERS") : t("SHOW_BORDERS")}</span>
                    </div>
                  }


                  {frameTitles ?
                    <div className="side_box" >
                      <img src={Setonefont} alt="setonefont" className="side_icon" onClick={handleSetOneFrameFont} />
                      <span>{t("CHOSEN_FONT_FOR_ALL_TITLES")}</span>
                    </div>
                    :
                    <div className="side_box" style={{ filter: "grayscale(100%)", cursor: "not-allowed" }} data-tip={t("CONFIRM_TITLE_FRAME_TOOLTIP")}>
                      <img src={Setonefont} alt="setonefont" className="side_icon" />
                      <span>{t("CHOSEN_FONT_FOR_ALL_TITLES")}</span>
                    </div>}

                  <ReactTooltip place="left" type="error" effect="float" className='tooltip_custom' />
                </>

              }


            </div>
          </div>

          {warnings.length !== 0 &&
            <div className="side_alert_container">
              {warnings.filter(function (element) { return !element.show }).length !== 0 ?
                <div className="side_box_alert" style={{ marginTop: "auto" }}>
                  <img src={Alert} alt="Alert" className="side_icon" onClick={handleShowWarnings} />
                  <span >{t("SHOW_WARNINGS")}</span>
                </div>
                :
                <div className="side_box_alert" style={{ marginTop: "auto" }}>
                  <img src={Alert} alt="Alert" className="side_icon" onClick={handleHideWarnings} />
                  <span >{t("HIDE_WARNINGS")}</span>
                </div>
              }



            </div>
          }
        </div>
      </div>
    </>
  );
}





const mapStateToProps = state => ({
  chosenColor: state.frontEndData.color.color,
  chosenCut: state.frontEndData.color.cut,
  chosenTab: state.frontEndData.tab,
  chosenModel: state.frontEndData.model.chosenModel,
  resetAllAfterModelChangeFlag: state.frontEndData.model.resetAllAfterModelChangeFlag,
  chosenFrameFont: state.frontEndData.frame.chosenFrameFont,
  chosenFrameFontWeight: state.frontEndData.frame.chosenFrameFontWeight,
  chosenFrameFontInfo: state.frontEndData.frame.chosenFrameFontInfo,
  chosenFrameShape: state.frontEndData.frame.chosenFrameShape,
  addNewFrameState: state.frontEndData.frame.addNewFrame,
  removeFrameState: state.frontEndData.frame.removeFrame,
  lastRemovedFrameIndex: state.frontEndData.frame.lastRemovedFrameIndex,
  overFrameRender: state.frontEndData.frame.overFrameRender,
  textFrameRender: state.frontEndData.frame.textFrameRender,
  frameHolders: state.frontEndData.frame.frameHolders,
  frameHoldersTemp: state.frontEndData.frame.frameHoldersTemp,
  frameText: state.frontEndData.frame.frameText,
  frameTitleFlag: state.frontEndData.frame.frameTitleFlag,
  visual: state.frontEndData.visual.visual,
  warnings: state.frontEndData.visual.warnings,
  warningsReRender: state.frontEndData.visual.warningsReRender,
  animations: state.frontEndData.visual.animations,
  sc: state.frontEndData.visual.scale,
  allIcons: state.frontEndData.visual.allIcons,
  fullScreen: state.frontEndData.visual.fullScreen,
  panelName: state.frontEndData.visual.panelName,
  chosenTextFont: state.frontEndData.text.chosenTextFont,
  chosenTextWeight: state.frontEndData.text.chosenTextWeight,
  textRender: state.frontEndData.text.textRender,
  textUpOff: state.frontEndData.text.textUpOff,
  iconHolders: state.frontEndData.icon.iconHolders,
  iconHoldersRender: state.frontEndData.icon.iconHoldersRender,
  isAnySelected: state.frontEndData.icon.isAnySelected,
  areThereAnyIcons: state.frontEndData.icon.areThereAnyIcons,
  panelTextBackEnd: state.backEndData.panelText,
  iconsBackEnd: state.backEndData.icons,
  framesBackEnd: state.backEndData.frames,
  backEndData: state.backEndData,
  frontEndData: state.frontEndData,
  panels: state.panels.panels,
  indexOfLastPanel: state.panels.indexOfLastPanel,
  dashboard: state.panels.dashboard,
  alert: state.frontEndData.visual.alert,
  alertAnswer: state.frontEndData.visual.alertAnswer,
  ownIcons: state.frontEndData.icon.ownIcons,
  ownIconsRender: state.frontEndData.icon.ownIconsRender,
  languageRender: state.frontEndData.visual.languageRender,
})

const mapDispatchToProps = dispatch => ({
  addNewFrame: (income) => dispatch(actionsFrame.addNewFrame(income)),
  changeFrameHolders: (income) => dispatch(actionsFrame.frameHolders(income)),
  changeFrameHoldersTemp: (income) => dispatch(actionsFrame.frameHoldersTemp(income)),
  changeFrameText: (income) => dispatch(actionsFrame.changeFrameText(income)),
  changeFrameShape: shape => dispatch(actionsFrame.changeFrameShape(shape)),
  changeFramesShapeToSharp: (income) => dispatch(actionsFrame.changeFramesShapeToSharp(income)),
  changeFramesShapeToRound: (income) => dispatch(actionsFrame.changeFramesShapeToRound(income)),
  overFrameAll: (income) => dispatch(actionsFrame.overFrameAll(income)),
  overFrameReRender: (income) => dispatch(actionsFrame.overFrameReRender(income)),
  frameTitle: (income) => dispatch(actionsFrame.frameTitle(income)),
  changeFrameFont: (income) => dispatch(actionsFrame.changeFrameFont(income)),
  changeFrameFontWeight: (income) => dispatch(actionsFrame.changeFrameFontWeight(income)),
  allowFrameTitle: (income) => dispatch(actionsFrame.allowFrameTitle(income)),
  removeFrame: (income) => dispatch(actionsFrame.removeFrame(income)),
  toggleVisual: (income) => dispatch(actionsVisual.toggleVisual(income)),
  changePanelName: (income) => dispatch(actionsVisual.changePanelName(income)),
  toggleAnimations: (income) => dispatch(actionsVisual.toggleAnimations(income)),
  changeScale: (income) => dispatch(actionsVisual.changeScale(income)),
  updateWarnings: (income) => dispatch(actionsVisual.updateWarnings(income)),
  filterWarnings: (income) => dispatch(actionsVisual.filterWarnings(income)),
  pushWarnings: (income) => dispatch(actionsVisual.pushWarnings(income)),
  changeIconHolders: (income) => dispatch(actionsIcon.changeIconHolders(income)),
  changeIsAnySelected: (income) => dispatch(actionsIcon.isAnySelected(income)),
  setAreThereAnyIcons: (income) => dispatch(actionsIcon.setAreThereAnyIcons(income)),
  showRemoveIcon: (income) => dispatch(actionsVisual.showRemoveIcon(income)),
  showRemoveIcons: (income) => dispatch(actionsVisual.showRemoveIcons(income)),
  setTimeOfCreation: (income) => dispatch(actionsVisual.setTimeOfCreation(income)),
  setFullScreen: (income) => dispatch(actionsVisual.setFullScreen(income)),
  setAllIcons: (income) => dispatch(actionsVisual.setAllIcons(income)),

  toggleTextUp: (income) => dispatch(actionsText.toggleTextUp(income)),
  changeTextFont: (income) => dispatch(actionsText.changeTextFont(income)),
  changeTextWeight: (income) => dispatch(actionsText.changeTextWeight(income)),


  resetColor: (income) => dispatch(actionsColor.resetColor(income)),
  resetCut: (income) => dispatch(actionsColor.resetCut(income)),
  resetTab: (income) => dispatch(actionsTab.change(income)),

  changePanelNameBackEnd: (income) => dispatch(actionsBackEnd.changePanelName(income)),
  changePanelTextBackEnd: (income) => dispatch(actionsBackEnd.changePanelText(income)),
  resetPanelColorBackEnd: (income) => dispatch(actionsBackEnd.resetPanelColor(income)),
  resetPanelCutBackEnd: (income) => dispatch(actionsBackEnd.resetPanelCut(income)),
  changeIconsBackEnd: (income) => dispatch(actionsBackEnd.changeIcons(income)),
  changeFramesBackEnd: (income) => dispatch(actionsBackEnd.changeFrames(income)),
  changePanelTypeBackEnd: (income) => dispatch(actionsBackEnd.changePanelType(income)),

  addPanel: (income) => dispatch(actionsDashboard.addPanel(income)),
  updatePanels: (income) => dispatch(actionsDashboard.updatePanels(income)),
  showDashboard: (income) => dispatch(actionsDashboard.showDashboard(income)),
  dashboardSmoothEnter: (income) => dispatch(actionsDashboard.dashboardSmoothEnter(income)),
  hideCreator: (income) => dispatch(actionsDashboard.hideCreator(income)),

  resetAllAfterModelChange: (income) => dispatch(actionsModel.resetAllAfterModelChange(income)),
  resetModel: (income) => dispatch(actionsModel.resetModel(income)),

  updateOwnIcons: (income) => dispatch(actionsIcon.updateOwnIcons(income)),
  updateFavoriteIcons: icon => dispatch(actionsIcon.updateFavoriteIcons(icon)),
  showAlert: (income) => dispatch(actionsVisual.showAlert(income)),
  setAlertAnswer: (income) => dispatch(actionsVisual.setAlertAnswer(income)),
})


export default connect(mapStateToProps, mapDispatchToProps)(PanelPreview)
