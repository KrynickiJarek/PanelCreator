import { memo, useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { connect } from "react-redux";
import { saveAs } from 'file-saver';

import IconHolder from '../MainCreator/PanelPreview/IconHolder/IconHolder';

import Newpanel from "../../assets/dashboard/newpanel.svg";
import Newpanelfill from "../../assets/dashboard/newpanel_fill.svg";
import Uploadpdf from "../../assets/dashboard/uploadpdf.svg";
import Uploadpdffill from "../../assets/dashboard/uploadpdf_fill.svg";
import Copy from "../../assets/dashboard/copy.svg";
import Copyfill from "../../assets/dashboard/copy_fill.svg";
import Delete from "../../assets/dashboard/delete.svg";
import Deletefill from "../../assets/dashboard/delete_fill.svg";
import Edit from "../../assets/dashboard/edit.svg";
import Editfill from "../../assets/dashboard/edit_fill.svg";
import Savetopdf from "../../assets/dashboard/savetopdf.svg";
import Savetopdffill from "../../assets/dashboard/savetopdf_fill.svg";

import Minusuni from "../../assets/lcd/minusuni.svg"
import Leftuni from "../../assets/lcd/leftuni.svg"
import Rightuni from "../../assets/lcd/rightuni.svg"




import CreatorHeader from "../MainCreator/CreatorHeader/CreatorHeader";
import actionsBackEnd from "../MainCreator/duck/actions";
import MainCreator from "../MainCreator/MainCreator";
import actionsColor from "../MainCreator/PanelEditor/ColorEditor/duck/actions";
import actionsTab from "../MainCreator/PanelEditor/duck/actions";
import actionsFrame from "../MainCreator/PanelEditor/FrameEditor/duck/actions";
import actionsIcon from "../MainCreator/PanelEditor/IconEditor/duck/actions";
import actionsModel from "../MainCreator/PanelEditor/ModelChooser/duck/actions";
import actionsText from "../MainCreator/PanelEditor/TextEditor/duck/actions";
import actionsVisual from "../MainCreator/PanelPreview/duck/actions";
import actionsDashboard from "./duck/actions";

import moment from 'moment';

import "./Dashboard.scss";
import "../MainCreator/PanelPreview/PanelPreview.scss"








export const Dashboard = memo(function Dashboard({
  panels,
  addPanel,
  updatePanels,
  changeIndexOfLastPanel,
  dashboard,
  showDashboard,
  setBackEndReducers,
  setFrontEndReducerColor,
  setFrontEndReducerTab,
  setFrontEndReducerModel,
  setFrontEndReducerFrame,
  setFrontEndReducerIcon,
  setFrontEndReducerText,
  setFrontEndReducerVisual,

  resetAllAfterModelChange
}) {

  const [zoomId, setZoomId] = useState(null)
  const [resize, setResize] = useState(0)
  const [onTop, setOnTop] = useState(null)
  const [onBack, setOnBack] = useState(null)


  const [editOver, setEditOver] = useState(false)
  const [deleteOver, setDeleteOver] = useState(false)
  const [copyOver, setCopyOver] = useState(false)
  const [saveOver, setSaveOver] = useState(false)

  const [timeWithSeconds, setTimeWithSeconds] = useState(moment().format('HH:mm:ss'));
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));

  let sc = 5

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTimeWithSeconds(moment().format('HH:mm:ss'));
      setDate(moment().format('YYYY-MM-DD'));
    }, 1000)
    return () => clearInterval(intervalID);
  }, [timeWithSeconds])


  const handleZoom = (id) => {
    setResize(document.querySelector(`.resieze-${id}`).clientHeight)

    document.querySelector(".dashboard_scroll").scroll({
      top: (document.querySelector(`.resieze-${id}`).parentElement.parentElement.offsetTop) - 220,
      behavior: 'smooth'
    });


    if (id !== zoomId) {
      setOnBack(zoomId)
      setZoomId(id)
      setOnTop(id)
      const dahsboardTimeout = setTimeout(() => {
        setOnBack(null)
      }, 200);
      return () => clearTimeout(dahsboardTimeout);
    } else {
      setZoomId(null)
      const dahsboardTimeout = setTimeout(() => {
        setOnTop(null)
        setOnBack(null)
      }, 400);
      return () => clearTimeout(dahsboardTimeout);
    }
  };




  const handleAddPanel = () => {
    showDashboard(false)
    resetAllAfterModelChange(true)
    changeIndexOfLastPanel(-1)
    setZoomId(null)

  }

  const handleSelectPanel = (index) => {
    showDashboard(false)
    changeIndexOfLastPanel(index)
    setBackEndReducers(panels[index].backEndData)
    setFrontEndReducerColor(panels[index].frontEndData.color)
    setFrontEndReducerTab("model")
    setFrontEndReducerModel(panels[index].frontEndData.model.chosenModel)
    setFrontEndReducerFrame(panels[index].frontEndData.frame)
    setFrontEndReducerIcon(panels[index].frontEndData.icon)
    setFrontEndReducerText(panels[index].frontEndData.text)
    setFrontEndReducerVisual(panels[index].frontEndData.visual)
    setZoomId(null)
    setEditOver(false)
    setDeleteOver(false)
    setCopyOver(false)
    setSaveOver(false)
  }

  const handleDeletePanel = (index) => {
    const copyPanels = panels
    copyPanels.splice(index, 1)
    updatePanels(copyPanels)
    setZoomId(null)
    setEditOver(false)
    setDeleteOver(false)
    setCopyOver(false)
    setSaveOver(false)
  }

  const handleCopyPanel = (index) => {
    const deepCopyPanels = JSON.parse(JSON.stringify(panels));
    let copyPanel = deepCopyPanels[index]
    copyPanel.frontEndData.visual.timeOfCreation = date + ", " + timeWithSeconds
    copyPanel.frontEndData.visual.panelName += " (kopia)"
    copyPanel.backEndData.panelName += " (kopia)"
    addPanel(copyPanel)
    setZoomId(null)
    setEditOver(false)
    setDeleteOver(false)
    setCopyOver(false)
    setSaveOver(false)
  }

  const handlePrintPdf = (id) => {

    let dataToSend = {
      frontEndData: panels[id].frontEndData,
      backEndData: panels[id].backEndData
    }
    let frontEndDataStr = JSON.stringify(dataToSend);
    let frontEndDataB64 = Buffer.from(frontEndDataStr).toString("base64")

    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    headers.append('Access-Control-Allow-Credentials', 'true');

    fetch("http://bitcoin.ampio.pl:4567/generatepdf", {
      method: "POST",
      body: JSON.stringify({ backEndData: panels[id].backEndData, frontEndDataB64 }),
      headers: headers
    })
      .then(res => res.blob())
      .then(blob => {
        let fileName = panels[id].backEndData.panelName + "_" + panels[id].frontEndData.model.chosenModel.name + ".pdf"
        saveAs(blob, fileName);
      })
      .catch(error => {
        console.log(error);
      });
  }



  const upload = (file) => {
    fetch("http://bitcoin.ampio.pl:4567/loadpdf", {
      method: 'POST',
      body: file,
    })
      .then(response => response.text())
      .then(data => {
        function b64_to_utf8(str) {
          return decodeURIComponent(escape(window.atob(str)));
        }
        let dataUtf8 = b64_to_utf8(data)
        // let  endocedData = JSON.parse(atob(data))
        let endocedData = JSON.parse(dataUtf8)
        addPanel(endocedData)
        resetAllAfterModelChange(false)

      })
      .catch(
        error => console.log(error)
      );
    setZoomId(null)
  }

  const onSelectFile = (e) => {
    upload(e.target.files[0])
  };

  return (
    // <DndProvider debugMode={true} backend={HTML5Backend}>
    <DndProvider backend={HTML5Backend}>
      <div className="main_container">

        <CreatorHeader />
        {dashboard &&

          <div className="dashboard_container">
            <div className="dashboard_scroll">
              <div className="dashboard_content">
                <p className="dashboard_header">Menu główne</p>
                <p className="dashboard_header_info">Dodaj nowy panel, lub edytuj istniejący:</p>

                <div className="dashboard_panels">
                  {panels.map((panel, id) => {
                    return (
                      <div className="dashboard_section" key={id}>

                        <div className="dashboard_push"
                          style={
                            zoomId === id ?
                              (onTop === id || onBack === id) ? { transform: "scale(1.3)", minHeight: `${450 + resize}px` } : { transform: "scale(1.3)", minHeight: `${450 + resize}px` }
                              : (onTop === id || onBack === id) ? { transform: "scale(1)", minHeight: "400px" } : { transform: "scale(1)", minHeight: "400px" }

                          } />


                        <div className="dashboard_link"
                          style={
                            zoomId === id ?
                              (onTop === id || onBack === id) ? { transform: "scale(1.3)", zIndex: "999", border: "3px solid #EC695C", maxHeight: `${400 + resize}px` } : { transform: "scale(1.3)", border: "3px solid #EC695C", maxHeight: `${400 + resize}px` }
                              : (onTop === id || onBack === id) ? { zIndex: "999", transform: "scale(1)", border: "3px solid #EC695C", maxHeight: "400px" } : { transform: "scale(1)", border: "3px solid #EC695C", maxHeight: "400px" }
                          }
                        >


                          <div style={{ cursor: "pointer", zIndex: "10", backgroundColor: "white", margin: "0 auto" }} onClick={() => handleZoom(id)} >
                            <div className="dashboard_box">



                              {/* //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
                              <div style={panel.frontEndData.model.chosenModel.height === 90 && panel.frontEndData.model.chosenModel.width === 90 ? { transform: "scale(0.55)", position: "absolute" } : { transform: "scale(0.4)", position: "absolute" }}>
                                <div className="panel_box" style={panel.frontEndData.model.chosenModel.panelRotation ?
                                  { backgroundColor: panel.frontEndData.color.hex, height: `${panel.frontEndData.model.chosenModel.height * sc}px`, width: `${panel.frontEndData.model.chosenModel.width * sc}px`, transform: "rotate(-90deg)" }
                                  : { backgroundColor: panel.frontEndData.color.hex, height: `${panel.frontEndData.model.chosenModel.height * sc}px`, width: `${panel.frontEndData.model.chosenModel.width * sc}px` }}>


                                  {panel.frontEndData.frame.frameHolders.map((frame, i) =>
                                    <div key={i} >
                                      {frame.type === "multi" &&
                                        <div style={{
                                          height: `${panel.frontEndData.model.chosenModel.height * sc - ((panel.frontEndData.model.chosenModel.marginFrameTop * sc) + (panel.frontEndData.model.chosenModel.marginFrameBottom * sc))}px`,
                                          width: `${panel.frontEndData.model.chosenModel.width * sc - (panel.frontEndData.model.chosenModel.marginFrameSide * 2 * sc)}px`,
                                          margin: `${panel.frontEndData.model.chosenModel.marginFrameTop * sc}px ${panel.frontEndData.model.chosenModel.marginFrameSide * sc}px ${panel.frontEndData.model.chosenModel.marginFrameTop * sc}px`,
                                          position: "absolute",
                                          display: "flex",
                                          flexWrap: "wrap"
                                        }}>

                                          {frame.framePrint.frameArr.map((el, index) =>
                                            <div key={index}
                                              style={
                                                ((index + 2) % 3 === 0) ?
                                                  { position: "relative", width: `${panel.frontEndData.model.chosenModel.centerColumnFrameWidth * sc}px`, height: `${panel.frontEndData.model.chosenModel.multiRowFrameHeight * sc}px` }
                                                  : { position: "relative", width: `${panel.frontEndData.model.chosenModel.sideColumnFrameWidth * sc}px`, height: `${panel.frontEndData.model.chosenModel.multiRowFrameHeight * sc}px` }
                                              } >

                                              {el !== 0 &&
                                                <div style={frame.framePrint.shape === "sharp" ? {
                                                  position: "absolute",
                                                  borderColor: panel.frontEndData.color.iconColor, borderRadius: "0",
                                                  height: `${el.fh * sc}px`,
                                                  width: `${el.fw * sc}px`,
                                                  marginBottom: `${el.mb * sc}px`,
                                                  marginLeft: `${el.ml * sc}px`,
                                                  marginRight: `${el.mr * sc}px`,
                                                  transition: "0s",
                                                }
                                                  : {
                                                    position: "absolute",
                                                    borderColor: panel.frontEndData.color.iconColor, borderRadius: `${el.rtl * sc}px ${el.rtr * sc}px ${el.rbr * sc}px ${el.rbl * sc}px`,
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
                                            </div>
                                          )}
                                          {(frame.framePrint.text !== "" && !frame.framePrint.over) &&
                                            <div style={{ position: "absolute", width: "100%" }}>
                                              <div style={{
                                                fontSize: `${2 * sc}px`,
                                                lineHeight: `${2 * sc}px`,
                                                height: `${3.6 * sc}px`,
                                                width: `${8 * sc}px`,
                                                position: "absolute",
                                                display: "inline-grid",
                                                alignItems: "center",
                                                justifyItems: "center",
                                                top: `${frame.framePrint.textY * sc}px`,
                                                left: `${frame.framePrint.textX * sc}px`
                                              }}>
                                                <input className="text_input_frame"
                                                  autoComplete="off"
                                                  type="text"
                                                  maxLength="16"
                                                  style={
                                                    {
                                                      color: panel.frontEndData.color.iconColor,
                                                      borderRadius: `${0.9 * sc}px`,
                                                      fontSize: `${2 * sc}px`,
                                                      lineHeight: `${2 * sc}px`,
                                                      height: `${3.6 * sc}px`,
                                                      gridArea: "1 / 1 / 2 / 2",
                                                      width: "100%",
                                                      fontFamily: frame.framePrint.frameFont,
                                                      backgroundColor: panel.frontEndData.color.hex,
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
                                        </div>
                                      }
                                    </div>
                                  )}


                                  {panel.frontEndData.frame.frameHolders.map((frame, i) =>
                                    <div key={i} >
                                      {frame.type === "single" &&
                                        <div style={{
                                          width: `${panel.frontEndData.model.chosenModel.width * sc - (panel.frontEndData.model.chosenModel.marginSide * 2 * sc)}px`,
                                          height: `${panel.frontEndData.model.chosenModel.height * sc - ((panel.frontEndData.model.chosenModel.marginTop * sc) + (panel.frontEndData.model.chosenModel.marginBottom * sc))}px`,
                                          margin: `${panel.frontEndData.model.chosenModel.marginTop * sc}px ${panel.frontEndData.model.chosenModel.marginSide * sc}px ${panel.frontEndData.model.chosenModel.marginBottom * sc}px`,
                                          position: "absolute",
                                          display: "flex",
                                          flexWrap: "wrap"
                                        }}>

                                          {frame.framePrint.map((el, index) =>
                                            <div key={index}
                                              style={
                                                ((index + 2) % 3 === 0) ?
                                                  (
                                                    ((index > panel.frontEndData.icon.iconHolders.length - 4) ? { position: "relative", width: `${panel.frontEndData.model.chosenModel.centerCellWidth * sc}px`, height: `${panel.frontEndData.model.chosenModel.lastRowHeight * sc}px` }
                                                      : { position: "relative", width: `${panel.frontEndData.model.chosenModel.centerCellWidth * sc}px`, height: `${panel.frontEndData.model.chosenModel.rowHeight * sc}px` })
                                                  )
                                                  : (
                                                    ((index > panel.frontEndData.icon.iconHolders.length - 4) ? { position: "relative", width: `${panel.frontEndData.model.chosenModel.sideCellWidth * sc}px`, height: `${panel.frontEndData.model.chosenModel.lastRowHeight * sc}px` }
                                                      : { position: "relative", width: `${panel.frontEndData.model.chosenModel.sideCellWidth * sc}px`, height: `${panel.frontEndData.model.chosenModel.rowHeight * sc}px` })
                                                  )} >
                                              {el !== 0 &&
                                                <div style={el.shape === "sharp" ?
                                                  {
                                                    width: `${7.5 * sc}px`,
                                                    height: `${7.5 * sc}px`,
                                                    top: `${6.65 * sc}px`,
                                                    left: "50%",
                                                    marginLeft: `${-3.75 * sc}px`,
                                                    border: "2px solid transparent",
                                                    position: "absolute",
                                                    borderColor: panel.frontEndData.color.iconColor,
                                                    borderRadius: "0",
                                                  }
                                                  : {
                                                    width: `${7.5 * sc}px`,
                                                    height: `${7.5 * sc}px`,
                                                    top: `${6.65 * sc}px`,
                                                    left: "50%",
                                                    marginLeft: `${-3.75 * sc}px`,
                                                    border: "2px solid transparent",
                                                    position: "absolute",
                                                    borderColor: panel.frontEndData.color.iconColor,
                                                    borderRadius: `${sc}px`
                                                  }}
                                                />
                                              }
                                            </div>
                                          )}
                                        </div>
                                      }
                                    </div>
                                  )}



                                  <div style={{
                                    width: `${panel.frontEndData.model.chosenModel.width * sc - (panel.frontEndData.model.chosenModel.marginSide * 2 * sc)}px`,
                                    height: `${panel.frontEndData.model.chosenModel.height * sc - ((panel.frontEndData.model.chosenModel.marginTop * sc) + (panel.frontEndData.model.chosenModel.marginBottom * sc))}px`,
                                    margin: `${panel.frontEndData.model.chosenModel.marginTop * sc}px ${panel.frontEndData.model.chosenModel.marginSide * sc}px ${panel.frontEndData.model.chosenModel.marginBottom * sc}px`,
                                    display: "flex",
                                    flexWrap: "wrap"
                                  }}>

                                    {panel.frontEndData.icon.iconHolders.map(({
                                      flag,
                                      textUp,
                                      fontUp,
                                      textDown,
                                      fontDown,
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
                                    }, index) =>
                                      <div key={index}
                                        style={
                                          ((index + 2) % 3 === 0) ?
                                            (
                                              ((index > panel.frontEndData.icon.iconHolders.length - 4) ? { position: "relative", width: `${panel.frontEndData.model.chosenModel.centerCellWidth * sc}px`, height: `${panel.frontEndData.model.chosenModel.lastRowHeight * sc}px` }
                                                : { position: "relative", width: `${panel.frontEndData.model.chosenModel.centerCellWidth * sc}px`, height: `${panel.frontEndData.model.chosenModel.rowHeight * sc}px` })
                                            )
                                            : (
                                              ((index > panel.frontEndData.icon.iconHolders.length - 4) ? { position: "relative", width: `${panel.frontEndData.model.chosenModel.sideCellWidth * sc}px`, height: `${panel.frontEndData.model.chosenModel.lastRowHeight * sc}px` }
                                                : { position: "relative", width: `${panel.frontEndData.model.chosenModel.sideCellWidth * sc}px`, height: `${panel.frontEndData.model.chosenModel.rowHeight * sc}px` })
                                            )}>
                                        {flag === 1 &&
                                          <>
                                            <div className="text_box" >
                                              <div className="text_box" style={!panel.frontEndData.model.chosenModel.panelRotation ? { transition: "0.4s ease" } : { transform: "rotate(90deg)", transformOrigin: `center ${10.4 * sc}px`, transition: "0.4s ease" }}>
                                                <form >
                                                  <div style={!panel.frontEndData.model.chosenModel.panelRotation ?
                                                    {
                                                      fontSize: `${2 * sc}px`,
                                                      lineHeight: `${2 * sc}px`,
                                                      height: `${3.6 * sc}px`,
                                                      width: `${8 * sc}px`,
                                                      position: "absolute",
                                                      display: "inline-grid",
                                                      alignItems: "center",
                                                      justifyItems: "center",
                                                      top: `${-1.5 * sc}px`,
                                                      fontFamily: fontUp
                                                    }
                                                    :
                                                    {
                                                      fontSize: `${2 * sc}px`,
                                                      lineHeight: `${2 * sc}px`,
                                                      height: `${3.6 * sc}px`,
                                                      width: `${8 * sc}px`,
                                                      position: "absolute",
                                                      display: "inline-grid",
                                                      alignItems: "center",
                                                      justifyItems: "center",
                                                      top: `${2.85 * sc}px`,
                                                      fontFamily: fontUp
                                                    }}>
                                                    <input className="text_input"
                                                      type="text"
                                                      autoComplete="off"
                                                      maxLength="16"
                                                      style={{
                                                        backgroundColor: "transparent",
                                                        color: panel.frontEndData.color.iconColor,
                                                        border: "2px solid transparent",
                                                        borderRadius: `${0.9 * sc}px`,
                                                        fontSize: `${2 * sc}px`,
                                                        lineHeight: `${2 * sc}px`,
                                                        height: `${3.6 * sc}px`,
                                                        gridArea: "1 / 1 / 2 / 2",
                                                        width: "100%",
                                                        fontFamily: fontUp,
                                                      }}
                                                      disabled={true}
                                                      value={textUp}
                                                    />
                                                    <span style={{ gridArea: '1 / 1 / 2 / 2', visibility: 'hidden', padding: "0 5px", whiteSpace: "pre" }}>
                                                      {textUp}
                                                    </span>

                                                  </div>
                                                </form>
                                                <form >
                                                  <div style={{
                                                    fontSize: `${2 * sc}px`,
                                                    lineHeight: `${2 * sc}px`,
                                                    height: `${3.6 * sc}px`,
                                                    width: `${8 * sc}px`,
                                                    position: "absolute",
                                                    display: "inline-grid",
                                                    alignItems: "center",
                                                    justifyItems: "center",
                                                    top: `${14.35 * sc}px`,
                                                    fontFamily: fontDown
                                                  }}>
                                                    <input className="text_input"
                                                      type="text"
                                                      autoComplete="off"
                                                      maxLength="16"
                                                      style={{
                                                        backgroundColor: "transparent",
                                                        color: panel.frontEndData.color.iconColor,
                                                        border: "2px solid transparent",
                                                        borderRadius: `${0.9 * sc}px`,
                                                        fontSize: `${2 * sc}px`,
                                                        lineHeight: `${2 * sc}px`,
                                                        height: `${3.6 * sc}px`,
                                                        gridArea: "1 / 1 / 2 / 2",
                                                        width: "100%",
                                                        fontFamily: fontDown
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
                                              chosenColor={panel.frontEndData.color}
                                              rotationDot={rotationDot}
                                              rotationIcon={rotationIcon}
                                              rotationDown={rotationDown}
                                              rotationUp={rotationUp}
                                              panelRotation={panel.frontEndData.model.chosenModel.panelRotation}
                                              selectedDot={selectedDot}
                                              selected={selected}
                                              selectedDown={selectedDown}
                                              selectedUp={selectedUp}
                                              singleFrame={singleFrame}
                                              singleFrameTemp={singleFrameTemp}
                                            />
                                          </>}
                                      </div>
                                    )}


                                    {(panel.frontEndData.model.chosenModel.lcdScreen) && <div className="lcd" style={panel.frontEndData.model.chosenModel.lcdScreen ?
                                      {
                                        height: `${panel.frontEndData.model.chosenModel.lcdScreen.lcdHeight * sc}px`,
                                        width: `${panel.frontEndData.model.chosenModel.lcdScreen.lcdWidth * sc}px`,
                                        top: `${panel.frontEndData.model.chosenModel.lcdScreen.lcdTop * sc}px`,
                                        left: `${panel.frontEndData.model.chosenModel.lcdScreen.lcdLeft * sc}px`,
                                        borderColor: panel.frontEndData.color.iconColor
                                      } :
                                      { borderColor: panel.frontEndData.color.iconColor }} />}

                                    {panel.frontEndData.model.chosenModel.lcdScreen.lcdType === "slide" &&
                                      <div className="universal_icons" style={{ height: `${60 * sc}px`, width: `${70.4 * sc}px` }}>
                                        < img src={Minusuni} alt="minusuni" className="universal_icon"
                                          style={{ height: `${7.5 * sc}px`, width: `${7.5 * sc}px`, top: `${6.65 * sc}px`, left: `${7.45 * sc}px` }} />
                                        < img src={Minusuni} alt="minusuni" className="universal_icon"
                                          style={{ height: `${7.5 * sc}px`, width: `${7.5 * sc}px`, top: `${6.65 * sc}px`, left: `${55.45 * sc}px` }} />
                                        < img src={Leftuni} alt="leftuni" className="universal_icon"
                                          style={{ height: `${7.5 * sc}px`, width: `${7.5 * sc}px`, top: `${26.65 * sc}px`, left: `${7.45 * sc}px` }} />
                                        < img src={Rightuni} alt="rightuni" className="universal_icon"
                                          style={{ height: `${7.5 * sc}px`, width: `${7.5 * sc}px`, top: `${26.65 * sc}px`, left: `${55.45 * sc}px` }} />
                                        < img src={Minusuni} alt="minusuni" className="universal_icon"
                                          style={{ height: `${7.5 * sc}px`, width: `${7.5 * sc}px`, top: `${46.65 * sc}px`, left: `${7.45 * sc}px` }} />
                                        < img src={Minusuni} alt="minusuni" className="universal_icon"
                                          style={{ height: `${7.5 * sc}px`, width: `${7.5 * sc}px`, top: `${46.65 * sc}px`, left: `${55.45 * sc}px` }} />
                                      </div>
                                    }
                                  </div>
                                </div>
                              </div>

                              {/* //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

                            </div>
                            <p className="dashboard_name">{panel.backEndData.panelName}</p>
                          </div>

                          <div className={`resieze-${id}`} style={zoomId === id ? { transition: "0.5s ease", opacity: "1", width: "250px" } : { transform: "translateY(-100%)", transition: "0.5s ease", opacity: "0.5", width: "250px" }}>
                            <ol className="dashboard_info_list" onClick={() => handleZoom(id)} >
                              <li>Model: <span>{panel.frontEndData.model.chosenModel.type}</span></li>
                              <li>Kolor: <span>{panel.frontEndData.color.name}</span></li>
                              <li>Data utworzenia : <span>{panel.frontEndData.visual.timeOfCreation}</span></li>
                            </ol>


                            <div className="dashboard_button_container">
                              <div className="dashboard_button_box" onClick={() => { handleSelectPanel(id) }} onMouseOver={() => { setEditOver(true) }} onMouseLeave={() => { setEditOver(false) }}>
                                <img src={editOver ? Editfill : Edit} alt="edit" className="dashboard_img_button" />
                                <span>Edytuj</span>
                              </div>
                              <div className="dashboard_button_box" onClick={() => { handleDeletePanel(id) }} onMouseOver={() => { setDeleteOver(true) }} onMouseLeave={() => { setDeleteOver(false) }}>
                                <img src={deleteOver ? Deletefill : Delete} alt="delete" className="dashboard_img_button" />
                                <span>Usuń</span>
                              </div>
                              <div className="dashboard_button_box" onClick={() => { handleCopyPanel(id) }} onMouseOver={() => { setCopyOver(true) }} onMouseLeave={() => { setCopyOver(false) }}>
                                <img src={copyOver ? Copyfill : Copy} alt="copy" className="dashboard_img_button" />
                                <span>Utwórz kopię</span>
                              </div>
                              <div className="dashboard_button_box" onClick={() => { handlePrintPdf(id) }} onMouseOver={() => { setSaveOver(true) }} onMouseLeave={() => { setSaveOver(false) }}>
                                <img src={saveOver ? Savetopdffill : Savetopdf} alt="savetopdf" className="dashboard_img_button" />
                                <span>Zapisz do PDF</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}

                  <div className="dashboard_section">

                    <div className="dashboard_push"
                      style={
                        zoomId === "new" ?
                          (onTop === "new" || onBack === "new") ? { transform: "scale(1.3)", minHeight: `${450 + resize}px` } : { transform: "scale(1.3)", minHeight: `${450 + resize}px` }
                          : (onTop === "new" || onBack === "new") ? { transform: "scale(1)", minHeight: "400px" } : { transform: "scale(1)", minHeight: "400px" }
                      } />
                    <div className="dashboard_link"
                      style={
                        zoomId === "new" ?
                          (onTop === "new" || onBack === "new") ? { transform: "scale(1.3)", zIndex: "999", border: "3px solid #EC695C", maxHeight: `${400 + resize}px` } : { transform: "scale(1.3)", border: "3px solid #EC695C", maxHeight: `${400 + resize}px` }
                          : (onTop === "new" || onBack === "new") ? { zIndex: "999", transform: "scale(1)", border: "3px solid #EC695C", maxHeight: "400px" } : { transform: "scale(1)", border: "3px solid #EC695C", maxHeight: "400px" }
                      }
                    >
                      <div style={{ cursor: "pointer", zIndex: "10", backgroundColor: "white", margin: "0 auto" }} onClick={() => handleZoom("new")} >
                        <div className="dashboard_box">
                          <img src={zoomId === "new" ? Newpanelfill : Newpanel} alt="clearinput" className="dashboard_img" />
                        </div>
                        <p className="dashboard_name">Dodaj nowy panel</p>
                      </div>

                      <div className={`resieze-${"new"}`} style={zoomId === "new" ? { transition: "0.5s ease", opacity: "1", width: "300px" } : { transform: "translateY(-100%)", transition: "0.5s ease", opacity: "0.5", width: "300px" }}>
                        <p className="dashboard_info" onClick={() => handleZoom("new")}>Przejdź do edytora aby utworzyć nowy panel od podstaw.</p>
                        <div className="dashboard_button_container" style={{ justifyContent: "center" }}>
                          <div className="select_button" onClick={handleAddPanel}>
                            UTWÓRZ
                            <div className="button_arrows" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="dashboard_section">

                    <div className="dashboard_push"
                      style={
                        zoomId === "upload" ?
                          (onTop === "upload" || onBack === "upload") ? { transform: "scale(1.3)", minHeight: `${450 + resize}px` } : { transform: "scale(1.3)", minHeight: `${450 + resize}px` }
                          : (onTop === "upload" || onBack === "upload") ? { transform: "scale(1)", minHeight: "400px" } : { transform: "scale(1)", minHeight: "400px" }
                      } />
                    <div className="dashboard_link"
                      style={
                        zoomId === "upload" ?
                          (onTop === "upload" || onBack === "upload") ? { transform: "scale(1.3)", zIndex: "999", border: "3px solid #EC695C", maxHeight: `${400 + resize}px` } : { transform: "scale(1.3)", border: "3px solid #EC695C", maxHeight: `${400 + resize}px` }
                          : (onTop === "upload" || onBack === "upload") ? { zIndex: "999", transform: "scale(1)", border: "3px solid #EC695C", maxHeight: "400px" } : { transform: "scale(1)", border: "3px solid #EC695C", maxHeight: "400px" }
                      }
                    >
                      <div style={{ cursor: "pointer", zIndex: "10", backgroundColor: "white", margin: "0 auto" }} onClick={() => handleZoom("upload")} >
                        <div className="dashboard_box">
                          <img src={zoomId === "upload" ? Uploadpdffill : Uploadpdf} alt="clearinput" className="dashboard_img" />
                        </div>
                        <p className="dashboard_name">Wczytaj panel z pliku PDF</p>
                      </div>

                      <div className={`resieze-${"upload"}`} style={zoomId === "upload" ? { transition: "0.5s ease", opacity: "1", width: "300px" } : { transform: "translateY(-100%)", transition: "0.5s ease", opacity: "0.5", width: "300px" }}>
                        <p className="dashboard_info" onClick={() => handleZoom("upload")}>Wybierz plik PDF z komputera aby wczytać zapisany panel. Możliwe jest wczytanie plików utworzonych w aktualnej wersji Kreatora.</p>
                        <div className="dashboard_button_container" style={{ justifyContent: "center" }}>


                          <label htmlFor="inputUpload">
                            <div className="select_button">
                              WYBIERZ PLIK
                              <div className="button_arrows" />
                            </div>
                          </label>
                          <input type="file" id="inputUpload" style={{ display: "none" }} onChange={onSelectFile} />

                          {/* <div className="select_button"
                            // onClick={handleUploadPdf} >
                            >
                              WYBIERZ
                              <div className="button_arrows" /> */}
                          {/* </div> */}
                        </div>
                      </div>
                    </div>
                  </div>




                </div >
              </div>
            </div>
          </div>
        }

        {!dashboard &&
          <MainCreator />
        }
      </div>
    </DndProvider >
  );
});





const mapStateToProps = state => ({
  panels: state.panels.panels,
  dashboard: state.panels.dashboard,
})

const mapDispatchToProps = dispatch => ({
  showDashboard: (income) => dispatch(actionsDashboard.showDashboard(income)),
  addPanel: (income) => dispatch(actionsDashboard.addPanel(income)),
  updatePanels: (income) => dispatch(actionsDashboard.updatePanels(income)),
  changeIndexOfLastPanel: (income) => dispatch(actionsDashboard.changeIndexOfLastPanel(income)),
  setBackEndReducers: (income) => dispatch(actionsBackEnd.setBackEndReducers(income)),
  setFrontEndReducerColor: (income) => dispatch(actionsColor.setFrontEndReducerColor(income)),
  setFrontEndReducerTab: (income) => dispatch(actionsTab.change(income)),
  setFrontEndReducerModel: (income) => dispatch(actionsModel.change(income)),
  setFrontEndReducerFrame: (income) => dispatch(actionsFrame.setFrontEndReducerFrame(income)),
  setFrontEndReducerIcon: (income) => dispatch(actionsIcon.setFrontEndReducerIcon(income)),
  setFrontEndReducerText: (income) => dispatch(actionsText.setFrontEndReducerText(income)),
  setFrontEndReducerVisual: (income) => dispatch(actionsVisual.setFrontEndReducerVisual(income)),

  resetAllAfterModelChange: (income) => dispatch(actionsModel.resetAllAfterModelChange(income)),

})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)