import { useState, useEffect } from 'react';
import { connect } from "react-redux"
import actionsVisual from "../PanelPreview/duck/actions"
import { t } from "../../../i18n";
import moment from 'moment';
import "./PanelPreview.scss"
import ReactTooltip from "react-tooltip";

import LogoPure from "../../../assets/preview/logopure.svg"

import Resize from "../../../assets/scale/resize.svg"
import Exitfullscreen from "../../../assets/scale/exitfullscreen.svg"
import Zoomin from "../../../assets/scale/zoomin.svg"
import Zoomout from "../../../assets/scale/zoomout.svg"

import Visual from "../../../assets/side/visual.svg"
import Back from "../../../assets/side/back.svg"

import LCDPause from "../../../assets/lcd/pause.svg"
import LCDPlay from "../../../assets/lcd/play.svg"
import LCDPlus from "../../../assets/lcd/plus.svg"
import LCDMinus from "../../../assets/lcd/minus.svg"
import Minusuni from "../../../assets/lcd/minusuni.svg"
import Leftuni from "../../../assets/lcd/leftuni.svg"
import Rightuni from "../../../assets/lcd/rightuni.svg"


import IconHolder from './IconHolder/IconHolder';

const PanelPreviewFullScreen = ({
  chosenColor,
  chosenCut,
  chosenTab,
  chosenModel,
  frameHolders,
  toggleVisual,
  visual,
  changeScale,
  sc,
  iconHolders,
  panelName,
  textUpOff,
  setFullScreen
}) => {



  const [time, setTime] = useState(moment().format('HH:mm'));
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));


  const lcdShow = chosenModel.lcdScreen ? true : false
  const lcdNew = (chosenModel.lcdScreen && chosenModel.lcdScreen.lcdType === "slide") ? true : false


  const [panelContainerHeight, setPanelContainerHeight] = useState("100%")
  const [panelContainerWidth, setPanelContainerWidth] = useState("100%")



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
    const intervalID = setInterval(() => {
      setTime(moment().format('HH:mm'));
      setDate(moment().format('YYYY-MM-DD'));
    }, 1000)
    return () => clearInterval(intervalID);
  }, [time])


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


  let panelPreviewStyleFullScreen = {};

  panelPreviewStyleFullScreen.width = "100vw";
  panelPreviewStyleFullScreen.position = "absolute";
  panelPreviewStyleFullScreen.position = "fixed";
  panelPreviewStyleFullScreen.top = "0";
  panelPreviewStyleFullScreen.left = "0";
  panelPreviewStyleFullScreen.zIndex = "999999999";
  panelPreviewStyleFullScreen.transition = "0s";


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

  if (chosenCut === 5 && !chosenModel.panelRotation) { //--Nataleczka
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


  let cutBorderStyle = {}//--NATALECZKA
  if (chosenCut) {
    cutBorderStyle.border = `${chosenCut * sc}px outset ${chosenColor.hex}`
    cutBorderStyle.opacity = "0.4"
  } else {
    cutBorderStyle.border = `2px outset ${chosenColor.hex}`
    cutBorderStyle.opacity = "0.4"
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


  if (chosenCut === 5 && !chosenModel.panelRotation) { //--Nataleczka xx
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



  if (visual) {
    textStyleFrame.color = "white";
    textStyleFrame.textShadow = "0 0 5px rgba(255, 255, 255, 1)";
    textStyleFrame.transition = "0.4s ease";
  }



  const handleVisual = () => {
    toggleVisual(!visual)
  }




  return (
    <div className="panelpreview_container" style={panelPreviewStyleFullScreen}>
      <div className="preview_container" >
        <div className="preview_top">
          <h2 style={{ width: "100%", textAlign: "center" }}>{t("PANEL_PREVIEW")}: {panelName}</h2>
        </div>


        <div className="panel_container" >
          <div className="resize_container" style={resizeStyle}>
            <div className="panel_box" style={chosenModelStyle}>
              <div className="visualization_glass_white" style={(visual && chosenColor.RAL === "RAL 9003") ? { ...visualStyle, opacity: "1" } : { ...visualStyle, opacity: "0" }} />

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
                    </div>
                  }
                </div>
              )}


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
                        </div>
                      )}
                    </div>
                  }
                </div>
              )}

              {visual &&
                <>
                  <div className="visualization_frame" style={visual ? { ...visualStyle, border: `4px groove ${chosenColor.hex}`, opacity: "1", boxShadow: "rgba(0, 0, 0, 0.55) 10px 5px 20px" } : { ...visualStyle, opacity: "0" }} />
                  <div className="visualization_frame" style={visual ? { ...visualStyle, border: `4px groove white`, opacity: "0.2" } : { ...visualStyle, opacity: "0" }} />
                  {(lcdShow && visual && chosenColor.RAL !== "SMOKED_GLASS") && <div style={{ ...lcdStyle, position: "absolute", backgroundColor: "#141414" }} />}
                  {(lcdShow && visual && chosenColor.RAL === "SMOKED_GLASS") && <div style={{ ...lcdStyle, position: "absolute", backgroundColor: "black" }} />}
                  <div className="visualization_glass" style={visual ? { ...visualStyle, opacity: "1" } : { ...visualStyle, opacity: "0" }} />
                  <div className="visualization_glass_bis" style={visual ? { ...visualStyle, opacity: "1" } : { ...visualStyle, opacity: "0" }} />
                  <div className="visualization_frame" style={visual ? { ...visualStyle, ...cutBorderStyle, zIndex: "9999" } : { ...visualStyle, opacity: "0" }} />
                  <img src={LogoPure} alt="logo" className="logo_pure" style={visual ? { ...logoStyle, opacity: "1" } : { ...logoStyle, opacity: "0" }} />
                </>}

              <div className="panel_content" style={contentStyle}>

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
                        <div className="text_box" >
                          <div className="text_box" style={!chosenModel.panelRotation ? { transition: "0.4s ease" } : {
                            transform: "rotate(90deg)",
                            transformOrigin: `center ${10.4 * sc}px`,
                            transition: "0.4s ease"
                          }}>
                            {textUpOff &&
                              <form>
                                <div style={!chosenModel.panelRotation ?
                                  { ...autoResizeInputStyle, top: `${-1.5 * sc}px`, fontFamily: fontUp, fontWeight: fontUpWeight }
                                  :
                                  { ...autoResizeInputStyle, top: `${2.85 * sc}px`, fontFamily: fontUp, fontWeight: fontUpWeight }}>
                                  <input className="text_input"
                                    type="text"
                                    autoComplete="off"
                                    maxLength="16"
                                    style={{
                                      ...textStyle,
                                      fontFamily: fontUp,
                                      fontWeight: fontUpWeight
                                    }}
                                    disabled={true}
                                    value={textUp}
                                  />
                                  <span style={{ gridArea: '1 / 1 / 2 / 2', visibility: 'hidden', padding: "0 5px", whiteSpace: "pre" }}>
                                    {textUp}
                                  </span>
                                </div>
                              </form>
                            }
                            <form >
                              <div style={{ ...autoResizeInputStyle, top: `${14.35 * sc}px`, fontFamily: fontDown, fontWeight: fontDownWeight }}>
                                <input className="text_input"
                                  type="text"
                                  autoComplete="off"
                                  maxLength="16"
                                  style={{
                                    ...textStyle,
                                    fontFamily: fontDown,
                                    fontWeight: fontDownWeight
                                  }}
                                  disabled={true}
                                  value={textDown}
                                />
                                <span style={{ gridArea: '1 / 1 / 2 / 2', visibility: 'hidden', padding: "0 5px", whiteSpace: "pre" }}>
                                  {textDown}
                                </span>
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
              <img src={Exitfullscreen} alt="fullsexitfullscreencreen" className="scale_icon" onClick={() => { setFullScreen(false) }} data-tip data-for='exitfullscreen' />
              <ReactTooltip className='tooltip_custom' id='exitfullscreen' place="top" type="error" effect="float" delayShow={300}>
                <span>{t("FULLSCREEN_OFF_TOOLTIP")}</span>
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
            <ReactTooltip place="top" type="error" effect="float" className='tooltip_custom' />
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
            <div className="side_box">
              <img src={Visual} alt="visualization" className="side_icon" onClick={handleVisual} />
              {!visual ? <span>{t("VISUALIZATION_MODE")}</span> : <span>{t("EDIT_MODE")}</span>}
            </div>
            <div className="side_box">
              <img src={Back} alt="back" className="side_icon" onClick={() => { setFullScreen(false) }} />
              <span>{t("FULLSCREEN_OFF")}</span>
            </div>
          </div>
        </div>
      </div>

    </div >
  );
}



const mapStateToProps = state => ({
  chosenColor: state.frontEndData.color.color,
  chosenCut: state.frontEndData.color.cut,
  chosenTab: state.frontEndData.tab.tab,
  chosenModel: state.frontEndData.model.chosenModel,
  frameHolders: state.frontEndData.frame.frameHolders,
  visual: state.frontEndData.visual.visual,
  sc: state.frontEndData.visual.scale,
  iconHolders: state.frontEndData.icon.iconHolders,
  panelName: state.frontEndData.visual.panelName,
  textUpOff: state.frontEndData.text.textUpOff,
})
const mapDispatchToProps = dispatch => ({
  toggleVisual: (income) => dispatch(actionsVisual.toggleVisual(income)),
  changeScale: (income) => dispatch(actionsVisual.changeScale(income)),
  setFullScreen: (income) => dispatch(actionsVisual.setFullScreen(income)),
})


export default connect(mapStateToProps, mapDispatchToProps)(PanelPreviewFullScreen)
