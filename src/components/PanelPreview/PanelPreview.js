import { useState, useEffect } from 'react';
import { connect } from "react-redux"
import actionsFrame from "../PanelEditor/FrameEditor/duck/actions"
import actionsVisual from "../PanelPreview/duck/actions"
import actionsIcon from "../PanelEditor/IconEditor/duck/actions"

import moment from 'moment';

import "./PanelPreview.scss"

// import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
// import Tooltip from 'react-bootstrap/Tooltip'

import LogoPure from "../../assets/preview/logopure.svg"

import Resize from "../../assets/scale/resize.svg"
import Zoomin from "../../assets/scale/zoomin.svg"
import Zoomout from "../../assets/scale/zoomout.svg"


import Alert from "../../assets/side/alert.svg"

import Visual from "../../assets/side/visual.svg"
import Clearall from "../../assets/side/clearall.svg"
import Clearallicons from "../../assets/side/clearallicons.svg"
import Clear from "../../assets/side/clear.svg"
import Anim from "../../assets/side/anim.svg"
import Animoff from "../../assets/side/animoff.svg"
import Rotateright from "../../assets/side/rotateright.svg"
import Rotateleft from "../../assets/side/rotateleft.svg"
import Textborder from "../../assets/side/textborder.svg"
import Textupoff from "../../assets/side/textupoff.svg"
import Textupon from "../../assets/side/textupon.svg"
import Clearalltext from "../../assets/side/clearalltext.svg"
import Setonefont from "../../assets/side/setonefont.svg"
import Frameblacklight from "../../assets/side/framebacklight.svg"
import Framesharp from "../../assets/side/framesharp.svg"
import Frameround from "../../assets/side/frameround.svg"
import Removeallframes from "../../assets/side/removeallframes.svg"
import Removecurrframe from "../../assets/side/removecurrframe.svg"


import Submitinput from "../../assets/preview/submitinput.svg"
import Clearinput from "../../assets/preview/clearinput.svg"
import Submitinputdark from "../../assets/preview/submitinputdark.svg"
import Removeall from "../../assets/preview/remove.svg"

import Addframe from "../../assets/frame/addframe.svg"
import Addframedark from "../../assets/frame/addframedark.svg"
import Removeframe from "../../assets/frame/removeframe.svg"
import Removeframehorizontal from "../../assets/frame/removeframehorizontal.svg"


import LCDPause from "../../assets/lcd/pause.svg"
import LCDPlay from "../../assets/lcd/play.svg"
import LCDPlus from "../../assets/lcd/plus.svg"
import LCDMinus from "../../assets/lcd/minus.svg"
import Minusuni from "../../assets/lcd/minusuni.svg"
import Leftuni from "../../assets/lcd/leftuni.svg"
import Rightuni from "../../assets/lcd/rightuni.svg"


import IconHolder from './IconHolder/IconHolder';

const PanelPreview = ({
  frameTitleFlag,
  frameTitle,
  allowFrameTitle,
  chosenColor,
  chosenTab,
  chosenModel,
  chosenFrameFont,
  chosenFrameShape,
  addNewFrameState,
  addNewFrame,
  removeFrame,
  frameHolders,
  frameHoldersTemp,
  changeFrameHolders,
  changeFrameHoldersTemp,
  changeFrameText,
  frameText,
  changeFrameShape,
  changeFramesShapeToSharp,
  changeFramesShapeToRound,
  overFrameReRender,
  chosenTextFont,
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
  showRemoveIcon,
  showRemoveIcons,


}) => {




  const [visualSmooth, setVisualSmooth] = useState(true)

  const [showTextBorder, setShowTextBorder] = useState(true)
  const [showFrameTextBorder, setShowFrameTextBorder] = useState(true)
  const [showFramBlackLight, setShowFramBlackLight] = useState(true)
  const [textUpOff, setTextUpOff] = useState(true)

  const [newFrame, setNewFrame] = useState([])
  const [newFrameHide, setNewFrameHide] = useState([])
  const [newFrameChange, setNewFrameChange] = useState([])
  const [tempFrame, setTempFrame] = useState({ textX: 0, textY: 0, frameArr: [], text: "" })


  const [textFrame, setTextFrame] = useState(false)
  const [isFocusedInputFrame, setIsFocusedInputFrame] = useState(false)
  const [allFramesSharpRound, setAllFramesSharpRound] = useState(true)

  const [isFocusedInputIndex, setIsFocusedInputIndex] = useState(null)
  const [isFocusedInputSide, setIsFocusedInputSide] = useState(null)

  const [time, setTime] = useState(moment().format('HH:mm'));
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));

  const [differentFont, setDifferentFont] = useState(false)

  const [lcdShow, setLcdShow] = useState(chosenModel.lcdScreen ? true : false)
  const [lcdNew, setLcdNew] = useState((chosenModel.lcdScreen && chosenModel.lcdScreen.lcdType === "slide") ? true : false)
  const [hideAll, setHideAll] = useState(true)

  const [removeAll, setRemoveAll] = useState(false)

  const [differentFrameFont, setDifferentFrameFont] = useState(false)

  const [panelContainerHeight, setPanelContainerHeight] = useState("100%")
  const [panelContainerWidth, setPanelContainerWidth] = useState("100%")


  useEffect(() => {
    setPanelContainerHeight(document.querySelector(".panel_container").clientHeight)
    setPanelContainerWidth(document.querySelector(".panel_container").clientWidth)
  }, [panelContainerHeight, panelContainerWidth]);



  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(moment().format('HH:mm'));
      setDate(moment().format('YYYY-MM-DD'));
    }, 5000)
    return () => clearInterval(intervalID);
  }, [time])

  useEffect(() => {
    setVisualSmooth(true)
    const arrIconHolders = [];
    const arrNewFrame = [];
    const arrNewFrameHide = [];
    const arrNewFrameChange = [];
    const arrTempFrame = { textX: 0, textY: 0, frameArr: [] };
    setHideAll(false)
    setDifferentFont(false)
    setDifferentFrameFont(false)


    const modeltimeout = setTimeout(() => {
      setHideAll(true)
      chosenModel.dotLocation.forEach(element => {
        arrIconHolders.push({
          flag: element, lastDroppedDot: null, lastDroppedIcon: null, lastDroppedSlashUp: null, lastDroppedSlashDown: null,
          selectedDot: false, selected: false, selectedUp: false, selectedDown: false, rotationDot: 0, rotationIcon: 0, rotationUp: 0, rotationDown: 0,
          textUp: "", fontUp: null, textDown: "", fontDown: null, singleFrameTemp: false, singleFrame: false
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
      // setTempFrameText("")
      changeFrameText("")
      setTextFrame(false)
      chosenModel.lcdScreen ? setLcdShow(true) : setLcdShow(false);
      (chosenModel.lcdScreen && chosenModel.lcdScreen.lcdType === "slide") ? setLcdNew(true) : setLcdNew(false);
      setVisualSmooth(false)
      changeFrameHolders([])
    }, 300);
    return () => clearTimeout(modeltimeout);
    // eslint-disable-next-line
  }, [chosenModel]);

  useEffect(() => {
    const copyArr = iconHolders;
    const checkArr = []
    copyArr.forEach((el) => {
      if (el.fontDown && el.textDown && !checkArr.includes(el.fontDown)) {
        checkArr.push(el.fontDown)
      }
      if (el.fontUp && el.textUp && !checkArr.includes(el.fontUp)) {
        checkArr.push(el.fontUp)
      }
    })
    if (checkArr.length > 1) {
      setDifferentFont(true)
    } else {
      setDifferentFont(false)
    }
    // eslint-disable-next-line
  }, [isFocusedInputIndex, isFocusedInputSide]);

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
      copyFrameHolders.forEach((el) => {
        if (el.framePrint.frameFont && !checkFrameFontArr.includes(el.framePrint.frameFont)) {
          checkFrameFontArr.push(el.framePrint.frameFont)
        }
      })
      if (checkFrameFontArr.length > 1) {
        setDifferentFrameFont(true)
      } else {
        setDifferentFrameFont(false)
      }


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
    copyFrameHolders.forEach((el) => {
      if (el.framePrint.frameFont && !checkFrameFontArr.includes(el.framePrint.frameFont)) {
        checkFrameFontArr.push(el.framePrint.frameFont)
      }
    })
    if (checkFrameFontArr.length > 1) {
      setDifferentFrameFont(true)
    } else {
      setDifferentFrameFont(false)
    }
    overFrameReRender()
    // eslint-disable-next-line 
  }, [removeFrame]);




  useEffect(() => {
    if (chosenTab !== "text") {
      setIsFocusedInputIndex(null)
      setIsFocusedInputSide(null)
    } else if (chosenTab !== "frame") {
      setIsFocusedInputFrame(false)
    }
  }, [chosenTab]);



  useEffect(() => {
    const copyArr = iconHolders;
    if (isFocusedInputSide === "up") {
      copyArr[isFocusedInputIndex].fontUp = chosenTextFont

    } else if (isFocusedInputSide === "down") {
      copyArr[isFocusedInputIndex].fontDown = chosenTextFont
    }
    changeIconHolders(copyArr)
    // eslint-disable-next-line 
  }, [chosenTextFont]);


  let frameCellStyle = {}
  frameCellStyle.height = `${16 * sc}px`;
  frameCellStyle.width = `${16 * sc}px`;
  frameCellStyle.borderRadius = "50%";
  frameCellStyle.transition = "400ms ease";
  frameCellStyle.backgroundColor = "rgba(236, 105, 92, 0.5)";
  frameCellStyle.opacity = "0";
  frameCellStyle.margin = `${2 * sc}px auto`;

  if ((chosenTab === "frame")) {
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
  if ((chosenTab === "frame")) {
    frameClickStyle.cursor = "pointer";
    frameClickStyle.zIndex = "999";
  }

  let frameTempStyle = {}
  frameTempStyle.position = "absolute";
  frameTempStyle.transition = "width 400ms ease, height 400ms ease, border-color 400ms ease, border-width 0s";
  frameTempStyle.borderColor = "rgb(40, 167, 69)";
  frameTempStyle.opacity = "0";

  if (chosenColor.hex === "#30a32c") {
    frameTempStyle.borderColor = "rgb(32, 114, 30)";
  }
  if ((chosenTab === "frame")) {
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
  if (chosenModel.type === "MDOT-18 poziomy") {
    panelPreviewStyle.width = `${(chosenModel.height * 5) + 450}px`;
  }


  let chosenModelStyle = {};
  chosenModelStyle.backgroundColor = chosenColor.hex;
  chosenModelStyle.height = `${chosenModel.height * sc}px`;
  chosenModelStyle.width = `${chosenModel.width * sc}px`;
  chosenModelStyle.transition = "background-color 400ms ease,height 400ms ease, width 400ms ease, transform 800ms ease-in-out";
  if (chosenModel.type === "MDOT-18 poziomy") {
    chosenModelStyle.transform = "rotate(-90deg)"
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
  if (chosenModel.type === "MDOT-18 poziomy") {
    visualStyle.width = `${chosenModel.height * sc}px`;
    visualStyle.height = `${chosenModel.width * sc}px`;
    visualStyle.transform = "rotate(90deg)";
    visualStyle.transformOrigin = `${chosenModel.width * 0.5 * sc}px ${chosenModel.width * 0.5 * sc}px`;
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






  if ((chosenModel.type !== "MDOT-18 poziomy") && (panelContainerHeight < (chosenModel.height * sc))) {
    resizeStyle.height = `${(chosenModel.height * sc) + 50}px`;
  } else if ((chosenModel.type === "MDOT-18 poziomy") && (panelContainerHeight < (chosenModel.width * sc))) {
    resizeStyle.height = `${(chosenModel.width * sc) + 50}px`;
  }
  else {
    resizeStyle.height = "100%";
  }


  if (chosenModel.type !== "MDOT-18 poziomy" && panelContainerWidth < (chosenModel.width * sc)) { //TA LINIJKA
    resizeStyle.width = `${(chosenModel.width * sc) + 50}px`;
  } else if (chosenModel.type === "MDOT-18 poziomy" && (panelContainerWidth < chosenModel.height * sc)) { //TA LINIJKA
    resizeStyle.width = `${(chosenModel.height * sc) + 50}px`;
  }
  else {
    resizeStyle.width = "100%";
  }



  const logoStyle = {};
  logoStyle.height = `${3.9 * sc}px`;
  logoStyle.width = `${15.9 * sc}px`;
  logoStyle.filter = "invert(79%) sepia(5%) saturate(8%) hue-rotate(322deg) brightness(84%) contrast(83%)";
  logoStyle.bottom = `${5 * sc}px`;
  logoStyle.right = `${5 * sc}px`;

  if (chosenModel.type === "MDOT-18 poziomy") {
    logoStyle.bottom = `${5 * sc}px`;
    logoStyle.left = `${5 * sc}px`;
    logoStyle.transform = "translate(-100%,0) rotate(90deg)  ";
    logoStyle.transformOrigin = "bottom right";
  }

  const lcdStyle = {};
  lcdStyle.transition = "400ms ease";
  if (chosenModel.lcdScreen) {
    lcdStyle.height = `${chosenModel.lcdScreen.lcdHeight * sc}px`;
    lcdStyle.width = `${chosenModel.lcdScreen.lcdWidth * sc}px`;
    lcdStyle.top = `${chosenModel.lcdScreen.lcdTop * sc}px`;
    lcdStyle.left = `${chosenModel.lcdScreen.lcdLeft * sc}px`;
  }

  const lcdIconStyle = {};
  lcdIconStyle.height = `${7 * sc}px`;
  lcdIconStyle.width = `${7 * sc}px`;



  const autoResizeInputStyle = {};
  autoResizeInputStyle.fontSize = `${2 * sc}px`;
  autoResizeInputStyle.lineHeight = `${2 * sc}px`;
  autoResizeInputStyle.height = `${3.6 * sc}px`;
  autoResizeInputStyle.width = `${8 * sc}px`;// było 10
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
  textStyle.fontSize = `${2 * sc}px`
  textStyle.lineHeight = `${2 * sc}px`;
  textStyle.height = `${3.6 * sc}px`;
  textStyle.gridArea = "1 / 1 / 2 / 2";
  textStyle.width = "100%";
  textStyle.transition = "400ms ease";




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
  textStyleFrame.fontSize = `${2 * sc}px`
  textStyleFrame.lineHeight = `${2 * sc}px`;
  textStyleFrame.height = `${3.6 * sc}px`;
  textStyleFrame.gridArea = "1 / 1 / 2 / 2";
  textStyleFrame.width = "100%";
  textStyleFrame.transition = "400ms ease";

  if (chosenTab === "frame" && showFrameTextBorder) {
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
    if ((chosenTab === "frame") && !showFrameTextBorder && !isFocusedInputFrame) {
      e.target.style.border = "2px dashed rgb(236, 105, 92)"
    }
  }


  function hideFrameBorder(e) {
    if ((chosenTab === "frame") && !showFrameTextBorder && !isFocusedInputFrame) {
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
  }

  const handleClearAll = () => {
    setRemoveAll(false)

    const tempArr = [];
    setHideAll(false)
    setDifferentFont(false)
    setDifferentFrameFont(false)
    const modeltimeout = setTimeout(() => {
      setHideAll(true)
      chosenModel.dotLocation.forEach(element => {
        tempArr.push({
          flag: element, lastDroppedDot: null, lastDroppedIcon: null, lastDroppedSlashUp: null, lastDroppedSlashDown: null,
          selectedDot: false, selected: false, selectedUp: false, selectedDown: false, rotationDot: 0, rotationIcon: 0, rotationUp: 0, rotationDown: 0,
          textUp: "", fontUp: null, textDown: "", fontDown: null, singleFrameTemp: false, singleFrame: false
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
      setTextFrame(false)
      chosenModel.lcdScreen ? setLcdShow(true) : setLcdShow(false)
    }, 300);
    return () => clearTimeout(modeltimeout);
  }

  const handleClearAllOver = () => {
    setRemoveAll(true)
  }

  const handleClearAllLeave = () => {
    setRemoveAll(false)
  }

  const handleClearAllIcons = () => {
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
    })
    changeIconHolders(copyArr)
  }

  const handleClearIcon = () => {
    const copyArr = iconHolders;
    copyArr.forEach((el) => {
      if (el.selectedDot) {
        el.lastDroppedDot = null;
        el.selectedDot = false;
        el.rotationDot = 0;
      } else if (el.selected) {
        el.lastDroppedIcon = null;
        el.selected = false;
        el.rotationIcon = 0;
      } else if (el.selectedDown) {
        el.lastDroppedSlashDown = null;
        el.selectedDown = false;
        el.rotationDown = 0;
      } else if (el.selectedUp) {
        el.lastDroppedSlashUp = null;
        el.selectedUp = false;
        el.rotationUp = 0;
      }
    })
    changeIconHolders(copyArr)
  }

  const handleRotateRight = () => {
    const copyArr = iconHolders;
    copyArr.forEach((el) => {
      if (el.selectedDot) {
        el.rotationDot = el.rotationDot + 90;
      } else if (el.selected) {
        el.rotationIcon = el.rotationIcon + 90;
      } else if (el.selectedDown) {
        el.rotationDown = el.rotationDown + 90;
      } else if (el.selectedUp) {
        el.rotationUp = el.rotationUp + 90;
      }
    })
    changeIconHolders(copyArr)
  }

  const handleRotateLeft = () => {
    const copyArr = iconHolders;
    copyArr.forEach((el) => {
      if (el.selectedDot) {
        el.rotationDot = el.rotationDot - 90;
      } else if (el.selected) {
        el.rotationIcon = el.rotationIcon - 90;
      } else if (el.selectedDown) {
        el.rotationDown = el.rotationDown - 90;
      } else if (el.selectedUp) {
        el.rotationUp = el.rotationUp - 90;
      }
    })
    changeIconHolders(copyArr)
  }


  const handleTextUpOff = () => {
    setTextUpOff(prev => !prev)
    const copyArr = iconHolders;
    copyArr.forEach((el) => {
      el.textUp = "";
      el.fontUp = null;
    })
    changeIconHolders(copyArr)
  }

  const handleClearAllText = () => {
    const copyArr = iconHolders;
    copyArr.forEach((el) => {
      el.textUp = "";
      el.fontUp = null;
      el.textDown = "";
      el.fontDown = null;
    })
    changeIconHolders(copyArr)
  }



  // const renderTooltip = (props) => (
  //     <Tooltip id="button-tooltip" {...props}>
  //         Simple tooltip
  //     </Tooltip>
  // );

  const handleChangeTextUp = (index, text) => {
    const copyArr = iconHolders;
    copyArr[index].textUp = text.target.value.toUpperCase()
    changeIconHolders(copyArr)
  };


  const handleChangeTextDown = (index, text) => {
    const copyArr = iconHolders;
    copyArr[index].textDown = text.target.value.toUpperCase()
    changeIconHolders(copyArr)
  };


  const handleChangeFontDown = (index) => {
    const copyArr = iconHolders;
    copyArr[index].fontDown = chosenTextFont
    changeIconHolders(copyArr)
  }


  const handleChangeFontUp = (index) => {
    const copyArr = iconHolders;
    copyArr[index].fontUp = chosenTextFont
    changeIconHolders(copyArr)
  }




  const handleSetOneFont = () => {
    const copyArr = iconHolders;
    copyArr.forEach((el) => {
      el.fontUp = chosenTextFont;
      el.fontDown = chosenTextFont;
    })
    changeIconHolders(copyArr)
    setDifferentFont(false)
  }

  const handleSetOneFrameFont = () => {
    const copyFrameHolders = frameHolders
    copyFrameHolders.forEach((el) => {
      el.framePrint.frameFont = chosenFrameFont
    })
    changeFrameHolders(copyFrameHolders)
    overFrameReRender()
    setDifferentFrameFont(false)
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFocusedInputIndex(null)
    setIsFocusedInputSide(null)
    setIsFocusedInputFrame(false)
  }


  const handleKeyPress = (e) => {
    if (e.keyCode === 13 || e.keyCode === 27) {
      e.target.blur();
      setIsFocusedInputIndex(null)
      setIsFocusedInputSide(null)
      setIsFocusedInputFrame(false)
    }
  }

  const handleFocusInput = (index, side) => {
    setIsFocusedInputIndex(index)
    setIsFocusedInputSide(side)
  }


  const handleClearInput = (index, side) => {
    const copyArr = iconHolders;
    if (side === "up") {
      copyArr[index].textUp = "";
      copyArr[index].fontUp = null;
    } else if (side === "down") {
      copyArr[index].textDown = "";
      copyArr[index].fontDown = null;
    }
    changeIconHolders(copyArr)
    setIsFocusedInputIndex(null)
    setIsFocusedInputSide(null)
  }
  const handleClearInputFrame = () => {
    changeFrameText("")
    setIsFocusedInputFrame(false)
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
          for (let i = copyArr.length; i >= copyArr.length - 9; i--) {
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


      if (chosenModel.type === "MDOT-2") {
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
      if (chosenModel.type === "MDOT-4") {
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
          for (let i = copyArr.length; i >= copyArr.length - 9; i--) {
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

      if (chosenModel.type !== "MDOT-4") {

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

        if (chosenModel.type === "MDOT-2") {
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
      } else if (chosenModel.type === "MDOT-4") {
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
      if (i % 3 === 1 && copyArr[i] === "s" && copyArr[i - 1] !== "s" && copyArr[i + 1] !== "s") {
        setTextFrame(false)
        allowFrameTitle(false)
        changeFrameText("")
        frameTitle(false)
      }
      if (i % 3 === 0 && copyArr[i] === "s" && copyArr[i + 1] !== "s") {
        setTextFrame(false)
        allowFrameTitle(false)
        changeFrameText("")
        frameTitle(false)
      }
      if (i % 3 === 2 && copyArr[i] === "s" && copyArr[i - 1] !== "s") {
        setTextFrame(false)
        allowFrameTitle(false)
        changeFrameText("")
        frameTitle(false)
      }
      // if (copyArr.indexOf("s") === -1) {
      //   allowFrameTitle(false)
      //   changeFrameText("")
      // }
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

      if (chosenModel.type !== "MDOT-18 poziomy") {
        frameTemp.frameInfo =
        {
          startRow: Math.ceil((copyArr.indexOf("s") + 1) / 3),
          startColumn: ((copyArr.indexOf("s") % 3) + 1),
          rows: rows,
          columns: columns,
          shape: chosenFrameShape,
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
        }
      }
    } else if (checkArr.length === 1) {
      frameTemp.type = "single"

      const currSingleFrames = [];
      copyArr.forEach((el) => {
        if (el === "s") {
          currSingleFrames.push({ shape: chosenFrameShape, over: false })

          if (chosenModel.type !== "MDOT-18 poziomy") {
            frameTemp.frameInfo =
            {
              startRow: Math.ceil((index + 1) / 3),
              startColumn: ((index % 3) + 1),
              rows: 1,
              columns: 1,
              shape: chosenFrameShape,
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

  const handleChangeFramesToSharp = () => {

    changeFramesShapeToSharp()
    setAllFramesSharpRound(prev => !prev)
    changeFrameShape("sharp")
  }

  const handleChangeFramesToRound = () => {
    changeFramesShapeToRound()
    setAllFramesSharpRound(prev => !prev)
    changeFrameShape("round")

  }


  const handleResetCurrFrame = () => {
    const copyArr = iconHolders;

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
    changeFrameHolders([])
    const copyArr = iconHolders;
    copyArr.forEach((element, index) => {
      element.singleFrame = false;
    })
    changeIconHolders(copyArr)
    overFrameReRender()
  }




  return (
    <div className="panelpreview_container" style={panelPreviewStyle}>
      <div className="preview_container">
        <div className="preview_top">
          <h2>PODGLĄD PANELU</h2>
        </div>
        <div className="panel_container">
          <div className="resize_container" style={resizeStyle}>
            <div className="panel_box" style={chosenModelStyle}>

              <div className="visualization_glass_white" style={(visual && chosenColor.RAL === "9003") ? { ...visualStyle, opacity: "1" } : { ...visualStyle, opacity: "0" }} />

              <div className="panel_content" style={{ ...contentStyle, position: "absolute" }}>
                {removeAll &&
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                    <img src={Removeall} alt="removeall" style={{
                      width: "100%",
                      zIndex: "999999",
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
                          < img src={chosenModel.type !== "MDOT-18 poziomy" ? Removeframe : Removeframehorizontal} alt="removeframe" style={el === "r" ? { ...frameChangeStyle, opacity: "1" } : { ...frameChangeStyle, opacity: "0" }} />
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
                                  ...frameStyle, borderColor: chosenColor.iconColor, borderRadius: "0",
                                  height: `${el.fh * sc}px`,
                                  width: `${el.fw * sc}px`,
                                  marginBottom: `${el.mb * sc}px`,
                                  marginLeft: `${el.ml * sc}px`,
                                  marginRight: `${el.mr * sc}px`,
                                  // transition: "0.4s ease"
                                  transition: "0s",
                                }
                                  : {
                                    ...frameStyle, borderColor: chosenColor.iconColor, borderRadius: `${el.rtl * sc}px ${el.rtr * sc}px ${el.rbr * sc}px ${el.rbl * sc}px`,
                                    height: `${el.fh * sc}px`,
                                    width: `${el.fw * sc}px`,
                                    marginBottom: `${el.mb * sc}px`,
                                    marginLeft: `${el.ml * sc}px`,
                                    marginRight: `${el.mr * sc}px`,
                                    // transition: "0.4s ease"
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
                                  // zIndex: "999"
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
                                    // zIndex: "999"
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
                                  style={(chosenColor.RAL === "9003" && visual) ?
                                    {
                                      ...textStyleFrame,
                                      fontFamily: frame.framePrint.frameFont,
                                      backgroundColor: "rgb(233,233,233)",
                                      border: "none",
                                    }
                                    :
                                    {
                                      ...textStyleFrame,
                                      fontFamily: frame.framePrint.frameFont,
                                      backgroundColor: chosenColor.hex,
                                      border: "none",
                                    }
                                  }
                                  disabled={true}
                                  value={frame.framePrint.text}
                                />
                                <span style={{ gridArea: '1 / 1 / 2 / 2', visibility: 'hidden', padding: "0 5px", whiteSpace: "pre" }}>
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
                                      backgroundColor: chosenColor.hex,
                                      border: "none",
                                      zIndex: "99999",
                                      color: "#dc3545",
                                    }
                                  }
                                  disabled={true}
                                  value={frame.framePrint.text}
                                />
                                <span style={{ gridArea: '1 / 1 / 2 / 2', visibility: 'hidden', padding: "0 5px", whiteSpace: "pre" }}>
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

                    {textFrame && chosenTab === "frame" && frameTitleFlag &&
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
                                      border: "2px dashed rgb(40, 167, 69)",
                                      backgroundColor: chosenColor.hex
                                    } :
                                      {
                                        ...textStyleFrame,
                                        fontFamily: chosenFrameFont,
                                        border: "2px dashed rgb(32, 114, 30)",
                                        backgroundColor: chosenColor.hex
                                      }
                                  )
                                  : {
                                    ...textStyleFrame,
                                    fontFamily: chosenFrameFont,
                                    backgroundColor: chosenColor.hex

                                  }}
                                disabled={chosenTab !== "frame" && true}
                                onMouseOver={showFrameBorder}
                                onMouseLeave={hideFrameBorder}
                                value={frameText}
                                onChange={(text) => handleChangeTextFrame(text)}
                                onFocus={() => setIsFocusedInputFrame(true)}
                                onKeyDown={handleKeyPress}

                              />
                              <span style={{ gridArea: '1 / 1 / 2 / 2', visibility: 'hidden', padding: "0 5px", whiteSpace: "pre" }}>
                                {frameText}
                              </span>


                              {(isFocusedInputFrame && chosenColor.hex !== "#30a32c") &&
                                <input type="image" src={Submitinput} alt="submitinput"
                                  style={{
                                    height: `${3.6 * sc}px`,
                                    width: `${3.6 * sc}px`,
                                    transform: "translate(75%, -50%)",
                                    gridArea: '1 / 1 / 2 / 2'
                                  }}
                                />
                              }
                              {(isFocusedInputFrame && chosenColor.hex === "#30a32c") &&
                                <input type="image" src={Submitinputdark} alt="submitinput"
                                  style={{
                                    height: `${3.6 * sc}px`,
                                    width: `${3.6 * sc}px`,
                                    transform: "translate(75%, -50%)",
                                    gridArea: '1 / 1 / 2 / 2'
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
                                    cursor: "pointer"
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
                  <div className="visualization_frame" style={visual ? { ...visualStyle, border: `4px groove ${chosenColor.hex}`, opacity: "1", boxShadow: "rgba(0, 0, 0, 0.55) 10px 5px 20px" } : { ...visualStyle, opacity: "0" }} />
                  <div className="visualization_frame" style={visual ? { ...visualStyle, border: `4px groove white`, opacity: "0.2" } : { ...visualStyle, opacity: "0" }} />
                  {(lcdShow && visual) && <div style={{ ...lcdStyle, position: "absolute", backgroundColor: "#141414" }} />}
                  <div className="visualization_glass" style={visual ? { ...visualStyle, opacity: "1" } : { ...visualStyle, opacity: "0" }} />
                  <div className="visualization_glass_bis" style={visual ? { ...visualStyle, opacity: "1" } : { ...visualStyle, opacity: "0" }} />
                  <div className="visualization_frame" style={visual ? { ...visualStyle, border: "2px outset #d4d4d4", opacity: "0.8", zIndex: "9999" } : { ...visualStyle, opacity: "0" }} />
                  <img src={LogoPure} alt="logo" className="logo_pure" style={visual ? { ...logoStyle, opacity: "1" } : { ...logoStyle, opacity: "0" }} />
                </>}

              <div className="panel_content" style={contentStyle}>

                {hideAll &&
                  <>
                    {iconHolders.map(({
                      flag,
                      textUp,
                      fontUp,
                      textDown,
                      fontDown,
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
                            <div className="text_box" style={chosenTab === "text" ? { zIndex: "999" } : { zIndex: "0" }}>
                              <div className="text_box" style={chosenModel.type !== "MDOT-18 poziomy" ? { transition: "0.4s ease" } : { transform: "rotate(90deg)", transformOrigin: `center ${10.4 * sc}px`, transition: "0.4s ease" }}>
                                {textUpOff &&
                                  <form onSubmit={handleSubmit}>
                                    <div style={chosenModel.type !== "MDOT-18 poziomy" ?
                                      { ...autoResizeInputStyle, top: `${-1.5 * sc}px`, fontFamily: fontUp }
                                      :
                                      { ...autoResizeInputStyle, top: `${2.85 * sc}px`, fontFamily: fontUp }}>
                                      <input className="text_input"
                                        type="text"
                                        autoComplete="off"
                                        maxLength="16"
                                        style={(isFocusedInputIndex === index && isFocusedInputSide === "up") ?
                                          (
                                            (chosenColor.hex !== "#30a32c") ? {
                                              ...textStyle,
                                              fontFamily: fontUp,
                                              border: "2px solid rgb(40, 167, 69)"
                                            } :
                                              {
                                                ...textStyle,
                                                fontFamily: fontUp,
                                                border: "2px solid rgb(32, 114, 30)",
                                              }
                                          )
                                          : {
                                            ...textStyle,
                                            fontFamily: fontUp,
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
                                      <span style={{ gridArea: '1 / 1 / 2 / 2', visibility: 'hidden', padding: "0 5px", whiteSpace: "pre" }}>
                                        {textUp}
                                      </span>

                                      {(isFocusedInputIndex === index && isFocusedInputSide === "up" && chosenColor.hex !== "#30a32c") &&
                                        <input type="image" src={Submitinput} alt="submitinput"
                                          style={{
                                            height: `${3.6 * sc}px`,
                                            width: `${3.6 * sc}px`,
                                            transform: "translateX(75%)",
                                            gridArea: '1 / 1 / 2 / 2'
                                          }}
                                        />
                                      }
                                      {(isFocusedInputIndex === index && isFocusedInputSide === "up" && chosenColor.hex === "#30a32c") &&
                                        <input type="image" src={Submitinputdark} alt="submitinput"
                                          style={{
                                            height: `${3.6 * sc}px`,
                                            width: `${3.6 * sc}px`,
                                            transform: "translateX(75%)",
                                            gridArea: '1 / 1 / 2 / 2'
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
                                            cursor: "pointer"
                                          }}
                                          onClick={() => { handleClearInput(index, "up") }}
                                        />
                                      }
                                    </div>
                                  </form>
                                }
                                <form onSubmit={handleSubmit}>
                                  <div style={{ ...autoResizeInputStyle, top: `${14.35 * sc}px`, fontFamily: fontDown }}>
                                    <input className="text_input"
                                      type="text"
                                      autoComplete="off"
                                      maxLength="16"
                                      style={(isFocusedInputIndex === index && isFocusedInputSide === "down") ?
                                        (
                                          (chosenColor.hex !== "#30a32c") ? {
                                            ...textStyle,
                                            fontFamily: fontDown,
                                            border: "2px solid rgb(40, 167, 69)"
                                          } :
                                            {
                                              ...textStyle,
                                              fontFamily: fontDown,
                                              border: "2px solid rgb(32, 114, 30)"
                                            }
                                        )
                                        : {
                                          ...textStyle,
                                          fontFamily: fontDown
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
                                    <span style={{ gridArea: '1 / 1 / 2 / 2', visibility: 'hidden', padding: "0 5px", whiteSpace: "pre" }}>
                                      {textDown}
                                    </span>
                                    {(isFocusedInputIndex === index && isFocusedInputSide === "down" && chosenColor.hex !== "#30a32c") &&
                                      <input type="image" src={Submitinput} alt="submitinput"
                                        style={{
                                          height: `${3.6 * sc}px`,
                                          width: `${3.6 * sc}px`,
                                          transform: "translateX(75%)",
                                          gridArea: '1 / 1 / 2 / 2'
                                        }}
                                      />
                                    }
                                    {(isFocusedInputIndex === index && isFocusedInputSide === "down" && chosenColor.hex === "#30a32c") &&
                                      <input type="image" src={Submitinputdark} alt="submitinput"
                                        style={{
                                          height: `${3.6 * sc}px`,
                                          width: `${3.6 * sc}px`,
                                          transform: "translateX(75%)",
                                          gridArea: '1 / 1 / 2 / 2'
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
                                          cursor: "pointer"
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
            <span>{chosenModel.type}</span>
          </div>
          <div className="scale_container">
            <div className="scale_box">
              <img src={Zoomout} alt="zoomout" className="scale_icon" onClick={handleZoomOut}
                style={sc === 4 ? { filter: "invert(53%) sepia(6%) saturate(18%) hue-rotate(343deg) brightness(94%) contrast(84%)", cursor: "not-allowed" } : {}} />
            </div>
            <div className="scale_box">
              <img src={Resize} alt="resize" className="scale_icon" onClick={handleResize} />
            </div>
            <div className="scale_box">
              <img src={Zoomin} alt="zoomin" className="scale_icon" onClick={handleZoomIn}
                style={sc === 8 ? { filter: "invert(53%) sepia(6%) saturate(18%) hue-rotate(343deg) brightness(94%) contrast(84%)", cursor: "not-allowed" } : {}} />
            </div>
          </div>
          <div className="bottom_info_ral">
            <span>RAL: {chosenColor.RAL}</span>
          </div>
        </div>
      </div>
      <div className="preview_side">

        <div className="side_box">
          <img src={Visual} alt="visualization" className="side_icon" onClick={handleVisual} />
          {!visual ? <span>Podgląd</span> : <span>Tryb edycji</span>}
        </div>

        <div className="side_box">
          <img src={Clearall} alt="clearall" className="side_icon" onClick={handleClearAll}
            onMouseOver={handleClearAllOver}
            onMouseLeave={handleClearAllLeave}
          />
          <span>Zresetuj wszystko</span>
        </div>

        {/* <div className="side_box">
                      <img src={Addframe} alt="addframe" className="side_icon" onClick={handleAddFrame} />
                      <span>Zatwierdź</span>
                  </div> */}


        {chosenTab === "icons" &&
          <>
            <div className="side_box">
              {animations ?
                <img src={Animoff} alt="animationoff" className="side_icon" onClick={() => { toggleAnimations(!animations) }} />
                : <img src={Anim} alt="animation" className="side_icon" onClick={() => { toggleAnimations(!animations) }} />
              }
              {animations ? <span>Wyłącz animacje</span> : <span>Włącz animacje</span>}
            </div>
            <div className="side_box">
              <img src={Clearallicons} alt="clearallicons" className="side_icon" onClick={handleClearAllIcons}
                onMouseOver={() => showRemoveIcons(true)} onMouseLeave={() => showRemoveIcons(false)} />

              <span>Usuń wszystkie ikony</span>
            </div>
            <div className="side_box" style={!isAnySelected ? { filter: "grayscale(100%)", cursor: "not-allowed" } : {}}>
              <img src={Clear} alt="clear" className="side_icon" onClick={handleClearIcon}
                onMouseOver={() => showRemoveIcon(true)} onMouseLeave={() => showRemoveIcon(false)} />

              <span>Usuń zaznaczoną ikonę</span>
            </div>
            <div className="side_box" style={!isAnySelected ? { filter: "grayscale(100%)", cursor: "not-allowed" } : {}}>
              <img src={Rotateright} alt="rotateright" className="side_icon" onClick={handleRotateRight} />
              <span>Obróć o 90° w prawo</span>
            </div>
            <div className="side_box" style={!isAnySelected ? { filter: "grayscale(100%)", cursor: "not-allowed" } : {}}>
              <img src={Rotateleft} alt="rotateleft" className="side_icon" onClick={handleRotateLeft} />
              <span >Obróć o 90° w lewo</span>
            </div>
          </>
        }
        {chosenTab === "text" &&
          <>
            <div className="side_box">
              <img src={Textborder} alt="textborder" className="side_icon" onClick={() => { setShowTextBorder(prev => !prev) }} />
              <span>{showTextBorder ? "Ukryj granice" : "Pokaż granice"}</span>
            </div>

            <div className="side_box">
              {textUpOff ?
                <img src={Textupoff} alt="textupoff" className="side_icon" onClick={handleTextUpOff} />
                :
                <img src={Textupon} alt="textupon" className="side_icon" onClick={handleTextUpOff} />}
              {textUpOff ? <span>Wyłącz i usuń opisy nad ikonami</span> : <span>Włącz opisy nad ikonami</span>}
            </div>

            <div className="side_box">
              <img src={Clearalltext} alt="clearalltext" className="side_icon" onClick={handleClearAllText} />
              <span>Usuń wszystkie opisy</span>
            </div>

            <div className="side_box">
              <img src={Setonefont} alt="setonefont" className="side_icon" onClick={handleSetOneFont} />
              <span>Wybrany font dla wszystkich opisów</span>
            </div>

            {differentFont &&
              <div className="side_box" style={{ marginTop: "auto", cursor: "default" }}>
                <img src={Alert} alt="Alert" className="side_icon" />
                <span style={{ color: "#dc3545" }}>Zastosowano różne fonty opisów</span>
              </div>
            }
          </>
        }
        {chosenTab === "frame" &&
          <>

            <div className="side_box">
              <img src={Frameblacklight} alt="frameblacklight" className="side_icon" onClick={() => { setShowFramBlackLight(prev => !prev) }} />
              {showFramBlackLight ? <span>Ukryj podświet- <br />lenie pól</span> : <span>Pokaż podświet- <br />lenie pól</span>}
            </div>

            <div className="side_box"
            // style={frameHolders.length === 0 ? { filter: "grayscale(100%)", cursor: "not-allowed" } : {}}
            >
              {allFramesSharpRound ?
                <img src={Framesharp} alt="framesharp" className="side_icon" onClick={handleChangeFramesToSharp} />
                :
                <img src={Frameround} alt="frameround" className="side_icon" onClick={handleChangeFramesToRound} />}
              {allFramesSharpRound ? <span>Wszystkie narożniki proste</span> : <span>Wszystkie narożniki zaokrąglone</span>}
            </div>

            <div className="side_box" style={frameHolders.length === 0 ? { filter: "grayscale(100%)", cursor: "not-allowed" } : {}}>
              <img src={Removeallframes} alt="ramoveallframes" className="side_icon" onClick={() => { handleResetAllFrames(); handleResetCurrFrame() }} />
              <span>Usuń wszystkie ramki</span>
            </div>

            <div className="side_box" style={!frameHoldersTemp ? { filter: "grayscale(100%)", cursor: "not-allowed" } : {}}>
              <img src={Removecurrframe} alt="removecurrframe" className="side_icon" onClick={handleResetCurrFrame} />
              <span>Usuń tworzoną ramkę</span>
            </div>



            <div className="side_box" style={!frameTitleFlag ? { filter: "grayscale(100%)", cursor: "not-allowed" } : {}}>
              <img src={Textborder} alt="textborder" className="side_icon"
                onClick={!frameTitleFlag ? null : () => { setShowFrameTextBorder(prev => !prev) }} />
              <span>{showFrameTextBorder ? "Ukryj granice" : "Pokaż granice"}</span>
            </div>

            <div className="side_box" style={frameHolders.length === 0 ? { filter: "grayscale(100%)", cursor: "not-allowed" } : {}}>
              <img src={Setonefont} alt="setonefont" className="side_icon" onClick={handleSetOneFrameFont} />
              <span>Wybrany font dla wszystkich tytułów</span>
            </div>

            {differentFrameFont &&
              <div className="side_box" style={{ marginTop: "auto", cursor: "default" }}>
                <img src={Alert} alt="Alert" className="side_icon" />
                <span style={{ color: "#dc3545" }}>Zastosowano różne fonty tytułów ramek</span>
              </div>
            }
          </>
        }
        {/* <OverlayTrigger
                      arrowProps
                      placement="left"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltip}
                  >
                      <div className="side_box" style={!isAnySelected ? { filter: "grayscale(100%)", cursor: "not-allowed" } : {}}>
                          <img src={Rotateleft} alt="rotateleft" className="side_icon" onClick={handleRotateLeft} />
                          <span >Obróć o 90° w lewo</span>
                      </div>
                  </OverlayTrigger> */}

      </div>

    </div >
  );
}



const mapStateToProps = state => ({
  chosenColor: state.color,
  chosenTab: state.tab,
  chosenModel: state.model,
  chosenFrameFont: state.frame.chosenFrameFont,
  chosenFrameShape: state.frame.chosenFrameShape,
  addNewFrameState: state.frame.addNewFrame,
  removeFrame: state.frame.removeFrame,
  overFrameRender: state.frame.overFrameRender,
  frameHolders: state.frame.frameHolders,
  frameHoldersTemp: state.frame.frameHoldersTemp,
  frameText: state.frame.frameText,
  frameTitleFlag: state.frame.frameTitleFlag,
  visual: state.visual.visual,
  animations: state.visual.animations,
  sc: state.visual.scale,
  chosenTextFont: state.text.chosenTextFont,
  textRender: state.text.textRender,
  iconHolders: state.icon.iconHolders,
  iconHoldersRender: state.icon.iconHoldersRender,
  isAnySelected: state.icon.isAnySelected,
})

const mapDispatchToProps = dispatch => ({
  addNewFrame: (income) => dispatch(actionsFrame.addNewFrame(income)),
  changeFrameHolders: (income) => dispatch(actionsFrame.frameHolders(income)),
  changeFrameHoldersTemp: (income) => dispatch(actionsFrame.frameHoldersTemp(income)),
  changeFrameText: (income) => dispatch(actionsFrame.changeFrameText(income)),
  changeFrameShape: shape => dispatch(actionsFrame.changeFrameShape(shape)),
  changeFramesShapeToSharp: (income) => dispatch(actionsFrame.changeFramesShapeToSharp(income)),
  changeFramesShapeToRound: (income) => dispatch(actionsFrame.changeFramesShapeToRound(income)),
  overFrameReRender: (income) => dispatch(actionsFrame.overFrameReRender(income)),
  frameTitle: (income) => dispatch(actionsFrame.frameTitle(income)),
  allowFrameTitle: (income) => dispatch(actionsFrame.allowFrameTitle(income)),
  toggleVisual: (income) => dispatch(actionsVisual.toggleVisual(income)),
  toggleAnimations: (income) => dispatch(actionsVisual.toggleAnimations(income)),
  changeScale: (income) => dispatch(actionsVisual.changeScale(income)),
  changeIconHolders: (income) => dispatch(actionsIcon.changeIconHolders(income)),
  changeIsAnySelected: (income) => dispatch(actionsIcon.isAnySelected(income)),
  showRemoveIcon: (income) => dispatch(actionsVisual.showRemoveIcon(income)),
  showRemoveIcons: (income) => dispatch(actionsVisual.showRemoveIcons(income)),
})


export default connect(mapStateToProps, mapDispatchToProps)(PanelPreview)
