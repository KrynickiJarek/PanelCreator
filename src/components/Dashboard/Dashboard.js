// import React, { memo, useState, useEffect, Suspense } from 'react';
import { memo, useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { connect } from "react-redux";
import { saveAs } from 'file-saver';
import {
  isChrome,
  isOpera,
  isEdge
} from "react-device-detect";
import { t } from "../../i18n";

import IconHolder from '../MainCreator/PanelPreview/IconHolder/IconHolder';
import AlertBox from '../AlertBox/AlertBox';

import Newpanel from "../../assets/dashboard/newpanel.svg";
import Newpanelfill from "../../assets/dashboard/newpanel_fill.svg";
import Uploadpdf from "../../assets/dashboard/uploadpdf.svg";
import Pdfload from "../../assets/dashboard/uploadpdf_load.svg";
import Uploadpdfarrow from "../../assets/dashboard/uploadpdf_arrow.svg";
import Downloadpdfarrow from "../../assets/dashboard/downloadpdf_arrow.svg";
import Copy from "../../assets/dashboard/copy.svg";
import Copyfill from "../../assets/dashboard/copy_fill.svg";
import Delete from "../../assets/dashboard/delete.svg";
import Deletefill from "../../assets/dashboard/delete_fill.svg";
import Edit from "../../assets/dashboard/edit.svg";
import Editfill from "../../assets/dashboard/edit_fill.svg";
import Savetopdf from "../../assets/dashboard/savetopdf.svg";

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
  updatePanels,
  changeIndexOfLastPanel,
  dashboard,
  showDashboard,
  hideCreator,
  dashboardEnter,
  dashboardSmoothEnter,
  setBackEndReducers,
  setFrontEndReducerColor,
  setFrontEndReducerTab,
  setFrontEndReducerModel,
  setFrontEndReducerFrame,
  setFrontEndReducerIcon,
  setFrontEndReducerText,
  setFrontEndReducerVisual,

  resetAllAfterModelChange,
  updateVersion,
  showAlert,
  alertAnswer,
  setAlertAnswer
}) {

  // const CreatorHeader = React.lazy(() => import("../MainCreator/CreatorHeader/CreatorHeader"));

  const [zoomId, setZoomId] = useState(null)
  const [resize, setResize] = useState(0)
  const [onTop, setOnTop] = useState(null)
  const [onBack, setOnBack] = useState(null)
  const [dashboardSmooth, setDashboardSmooth] = useState(false)

  const [uploading, setUploading] = useState(false)
  const [downloading, setDownloading] = useState(false)


  const [editOver, setEditOver] = useState(false)
  const [deleteOver, setDeleteOver] = useState(false)
  const [copyOver, setCopyOver] = useState(false)
  const [saveOver, setSaveOver] = useState(false)

  const [indexToDelete, setIndexToDelete] = useState(null)

  const [timeWithSeconds, setTimeWithSeconds] = useState(moment().format('HH:mm:ss'));
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));

  const [isChanging, setIsChanging] = useState(false)

  let sc = 5

  if (!(isChrome || isEdge || isOpera)) {
    showAlert(20)
  }

  useEffect(() => {
    updateVersion("0.99e")
    // updateVersion("1.00")
    // eslint-disable-next-line 
  }, [])

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTimeWithSeconds(moment().format('HH:mm:ss'));
      setDate(moment().format('YYYY-MM-DD'));
    }, 1000)
    return () => clearInterval(intervalID);
  }, [timeWithSeconds])

  useEffect(() => {
    if (dashboard) {
      setDashboardSmooth(true)
      hideCreator(true)
      const dahsboardTimeout = setTimeout(() => {
        dashboardSmoothEnter(true)
      }, 100);
      return () => clearTimeout(dahsboardTimeout);
    }
    // eslint-disable-next-line 
  }, [dashboard])


  const handleZoom = (id) => {
    setIsChanging(true)


    if (!isChanging) {
      setResize(document.querySelector(`.resize-${id}`).clientHeight)
      let dashboardScrollSize = (document.querySelector(".dashboard_scroll").clientHeight)
      let linkSize = (((document.querySelector(`.resize-${id}`).parentElement.parentElement.clientHeight) + (document.querySelector(`.resize-${id}`).clientHeight)))
      let checkPosition = (document.querySelector(`.resize-${id}`).parentElement.parentElement.offsetTop) + (((document.querySelector(`.resize-${id}`).parentElement.parentElement.clientHeight) + (document.querySelector(`.resize-${id}`).clientHeight)) * 1.3) - 120
      let currPosition = ((document.querySelector(".dashboard_scroll").scrollTop) + dashboardScrollSize)
      let sctrollTop = document.querySelector(".dashboard_scroll").scrollTop + 100
      let modelOffsetTop = document.querySelector(`.resize-${id}`).parentElement.parentElement.offsetTop


      if (currPosition < checkPosition || sctrollTop > modelOffsetTop) {
        document.querySelector(".dashboard_scroll").scroll({
          top: (document.querySelector(`.resize-${id}`).parentElement.parentElement.offsetTop) + linkSize - dashboardScrollSize + 75,
          behavior: 'smooth'
        });
      }



      if (id !== zoomId) {
        setOnBack(zoomId)
        setZoomId(id)
        setOnTop(id)
        const dahsboardTimeout = setTimeout(() => {
          setOnBack(null)
          setIsChanging(false)
        }, 200);
        return () => clearTimeout(dahsboardTimeout);
      } else {
        setZoomId(null)
        const dahsboardTimeout = setTimeout(() => {
          setOnTop(null)
          setOnBack(null)
          setIsChanging(false)
        }, 400);
        return () => clearTimeout(dahsboardTimeout);
      }
    }
  };




  const handleAddPanel = () => {
    showDashboard(false)
    resetAllAfterModelChange(true)
    changeIndexOfLastPanel(-1)
    setZoomId(null)
    const dahsboardTimeout = setTimeout(() => {
      setDashboardSmooth(false)
    }, 400);
    return () => clearTimeout(dahsboardTimeout);

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

    const dahsboardTimeout = setTimeout(() => {
      setDashboardSmooth(false)
    }, 400);
    return () => clearTimeout(dahsboardTimeout);
  }

  const handleDeletePanel = (index) => {
    showAlert(1)
    setIndexToDelete(index)
  }

  useEffect(() => {
    if (alertAnswer === 1) {
      deletePanel()
    }
    // eslint-disable-next-line 
  }, [alertAnswer])



  const deletePanel = () => {
    setAlertAnswer(null)
    setZoomId(null)
    const copyPanels = JSON.parse(JSON.stringify(panels))
    copyPanels[indexToDelete].hide = true
    updatePanels(copyPanels)

    const dahsboardTimeout = setTimeout(() => {
      const copyPanels = JSON.parse(JSON.stringify(panels))
      copyPanels[indexToDelete].show = false
      copyPanels[indexToDelete].hide = true
      updatePanels(copyPanels)
      setZoomId(null)
      setEditOver(false)
      setDeleteOver(false)
      setCopyOver(false)
      setSaveOver(false)
    }, 400);

    const dahsboardTimeout2 = setTimeout(() => {
      const copyPanels = JSON.parse(JSON.stringify(panels))
      copyPanels[indexToDelete].show = false
      copyPanels[indexToDelete].hide = true
      copyPanels.splice(indexToDelete, 1)
      updatePanels(copyPanels)
    }, 500);
    return () => clearTimeout(dahsboardTimeout, dahsboardTimeout2);
  }






  const handleCopyPanel = (index) => {
    const copyPanels = panels
    const deepCopyPanels = JSON.parse(JSON.stringify(panels));
    let copyPanel = deepCopyPanels[index]
    copyPanel.frontEndData.visual.timeOfCreation = date + ", " + timeWithSeconds


    if (copyPanel.frontEndData.visual.panelName.includes(t("COPY"))) {
      let pureName = copyPanel.frontEndData.visual.panelName.slice(0, copyPanel.frontEndData.visual.panelName.indexOf(t("COPY")))
      let copyNumber = 0
      deepCopyPanels.forEach(panel => {
        if (panel.frontEndData.visual.panelName.includes(pureName + t("COPY"))) {
          if (Number.isInteger(parseInt(panel.frontEndData.visual.panelName.slice(-2, -1)))) {
            let numberTemp = parseInt(panel.frontEndData.visual.panelName.slice(-2, -1)) + 1
            if (numberTemp > copyNumber) {
              copyNumber = numberTemp
            }
          } else {
            copyNumber = 2
          }
        }
      })
      if (copyNumber > 0) {
        copyPanel.frontEndData.visual.panelName = pureName + t("COPY") + ` (${copyNumber})`
        copyPanel.backEndData.panelName = pureName + t("COPY") + ` (${copyNumber})`
      } else {
        copyPanel.frontEndData.visual.panelName = pureName + t("COPY")
        copyPanel.backEndData.panelName = pureName + t("COPY")
      }
    } else {
      let copyNumber = 0
      deepCopyPanels.forEach(panel => {
        if (panel.frontEndData.visual.panelName.includes(copyPanel.frontEndData.visual.panelName + t("COPY"))) {
          if (Number.isInteger(parseInt(panel.frontEndData.visual.panelName.slice(-2, -1)))) {
            let numberTemp = parseInt(panel.frontEndData.visual.panelName.slice(-2, -1)) + 1
            if (numberTemp > copyNumber) {
              copyNumber = numberTemp
            }
          } else {
            copyNumber = 2
          }
        }
      })

      if (copyNumber > 0) {
        let name = copyPanel.frontEndData.visual.panelName
        copyPanel.frontEndData.visual.panelName = name + t("COPY") + ` (${copyNumber})`
        copyPanel.backEndData.panelName = name + t("COPY") + ` (${copyNumber})`
      } else {
        let name = copyPanel.frontEndData.visual.panelName
        copyPanel.frontEndData.visual.panelName = name + t("COPY")
        copyPanel.backEndData.panelName = name + t("COPY")
      }
    }



    copyPanel.hide = true
    copyPanels.push(copyPanel)
    updatePanels(copyPanels)
    setZoomId(null)
    setEditOver(false)
    setDeleteOver(false)
    setCopyOver(false)
    setSaveOver(false)

    const dahsboardTimeout = setTimeout(() => {
      copyPanels[copyPanels.length - 1].hide = false
      updatePanels(copyPanels)
    }, 300);
    return () => clearTimeout(dahsboardTimeout);
  }



  const fetchWithTimeout = (id, frontEndDataB64) => {
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
      body: JSON.stringify({ backEndData: panels[id].backEndData, frontEndDataB64 }),
      headers: headers
    })
      .then(res => res.blob())
      .then(blob => {
        let fileName = panels[id].backEndData.panelName + "_" + panels[id].frontEndData.model.chosenModel.name + ".pdf"
        saveAs(blob, fileName);
        setDownloading(false)
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


  const handlePrintPdf = (id) => {
    setDownloading(true)
    let dataToSend = {
      frontEndData: panels[id].frontEndData,
      backEndData: panels[id].backEndData,
      show: true,
      hide: false
    }
    let frontEndDataStr = JSON.stringify(dataToSend);
    let frontEndDataB64 = Buffer.from(frontEndDataStr).toString("base64")

    // let headers = new Headers();
    // headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    // headers.append('Access-Control-Allow-Credentials', 'true');



    fetchWithTimeout(id, frontEndDataB64)
    // fetch("https://bitcoin.ampio.pl:4567/generatepdf", {
    //   // fetch("https://kreator.ampio.pl/generatepdf", {
    //   method: "POST",
    //   body: JSON.stringify({ backEndData: panels[id].backEndData, frontEndDataB64 }),
    //   headers: headers
    // })
    //   .then(res => res.blob())
    //   .then(blob => {
    //     let fileName = panels[id].backEndData.panelName + "_" + panels[id].frontEndData.model.chosenModel.name + ".pdf"
    //     saveAs(blob, fileName);
    //     setDownloading(false)
    //   })
    //   .catch(error => {
    //     setDownloading(false)
    //     showAlert(13);
    //   });
  }


  const uploadFetchWithTimeout = (file) => {
    let ctrl = new AbortController()
    let signal = ctrl.signal

    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    headers.append('Access-Control-Allow-Credentials', 'true');

    let uploadServerTimeout = setTimeout(() => {
      ctrl.abort()
      setZoomId(null)
      setUploading(false)
      showAlert(14);
      document.getElementById("inputUploadProject").value = null
      clearTimeout(uploadServerTimeout)
    }, 8000)

    fetch("https://bitcoin.ampio.pl:4567/loadpdf", {
      // fetch("https://kreator.ampio.pl/loadpdf", {
      signal,
      method: 'POST',
      body: file,
    })
      .then(response => response.text())
      .then(data => {
        function b64_to_utf8(str) {
          return decodeURIComponent(escape(window.atob(str)));
        }
        let dataUtf8 = b64_to_utf8(data)
        let endocedData = JSON.parse(dataUtf8)
        const copyPanels = panels
        endocedData.hide = true

        if (endocedData.frontEndData.visual.panelName.includes(t("COPY"))) {
          let pureName = endocedData.frontEndData.visual.panelName.slice(0, endocedData.frontEndData.visual.panelName.indexOf(t("COPY")))
          let copyNumber = 0
          copyPanels.forEach(panel => {
            if (panel.frontEndData.visual.panelName.includes(pureName + t("COPY"))) {
              if (Number.isInteger(parseInt(panel.frontEndData.visual.panelName.slice(-2, -1)))) {
                let numberTemp = parseInt(panel.frontEndData.visual.panelName.slice(-2, -1)) + 1
                if (numberTemp > copyNumber) {
                  copyNumber = numberTemp
                }
              } else {
                copyNumber = 2
              }
            }
          })
          if (copyNumber > 0) {
            endocedData.frontEndData.visual.panelName = pureName + t("COPY") + ` (${copyNumber})`
            endocedData.backEndData.panelName = pureName + t("COPY") + ` (${copyNumber})`
          } else {
            endocedData.frontEndData.visual.panelName = pureName + t("COPY")
            endocedData.backEndData.panelName = pureName + t("COPY")
          }
        } else {
          let copyNumber = 0
          copyPanels.forEach(panel => {
            if (panel.frontEndData.visual.panelName.includes(endocedData.frontEndData.visual.panelName + t("COPY"))) {
              if (Number.isInteger(parseInt(panel.frontEndData.visual.panelName.slice(-2, -1)))) {
                let numberTemp = parseInt(panel.frontEndData.visual.panelName.slice(-2, -1)) + 1
                if (numberTemp > copyNumber) {
                  copyNumber = numberTemp
                }
              } else {
                copyNumber = 2
              }
            }
          })

          if (copyNumber > 0) {
            let name = endocedData.frontEndData.visual.panelName
            endocedData.frontEndData.visual.panelName = name + t("COPY") + ` (${copyNumber})`
            endocedData.backEndData.panelName = name + t("COPY") + ` (${copyNumber})`
          } else {
            let name = endocedData.frontEndData.visual.panelName
            endocedData.frontEndData.visual.panelName = name + t("COPY")
            endocedData.backEndData.panelName = name + t("COPY")
          }
        }

        copyPanels.push(endocedData)
        updatePanels(copyPanels)
        resetAllAfterModelChange(false)
        document.getElementById("inputUploadProject").value = null
        setZoomId(null)
        setUploading(false)
        clearTimeout(uploadServerTimeout)
        const dahsboardTimeout = setTimeout(() => {
          copyPanels[copyPanels.length - 1].hide = false
          updatePanels(copyPanels)
        }, 200);
        return () => clearTimeout(dahsboardTimeout);

      })
      .catch(
        error => {
          if (error.toString() !== "AbortError: The user aborted a request.") {
            console.log(error)

            setZoomId(null)
            setUploading(false)
            showAlert(10);
            document.getElementById("inputUploadProject").value = null
            clearTimeout(uploadServerTimeout)
          }
        }

      );
  }


  const upload = (file) => {
    if (file.type !== "application/pdf") {
      showAlert(15);
    } else {
      setUploading(true)

      uploadFetchWithTimeout(file)


      // fetch("https://bitcoin.ampio.pl:4567/loadpdf", {
      //   // fetch("https://kreator.ampio.pl/loadpdf", {
      //   method: 'POST',
      //   body: file,
      // })
      //   .then(response => response.text())
      //   .then(data => {
      //     function b64_to_utf8(str) {
      //       return decodeURIComponent(escape(window.atob(str)));
      //     }
      //     let dataUtf8 = b64_to_utf8(data)
      //     let endocedData = JSON.parse(dataUtf8)
      //     const copyPanels = panels
      //     endocedData.hide = true

      //     if (endocedData.frontEndData.visual.panelName.includes(t("COPY"))) {
      //       let pureName = endocedData.frontEndData.visual.panelName.slice(0, endocedData.frontEndData.visual.panelName.indexOf(t("COPY")))
      //       let copyNumber = 0
      //       copyPanels.forEach(panel => {
      //         if (panel.frontEndData.visual.panelName.includes(pureName + t("COPY"))) {
      //           if (Number.isInteger(parseInt(panel.frontEndData.visual.panelName.slice(-2, -1)))) {
      //             let numberTemp = parseInt(panel.frontEndData.visual.panelName.slice(-2, -1)) + 1
      //             if (numberTemp > copyNumber) {
      //               copyNumber = numberTemp
      //             }
      //           } else {
      //             copyNumber = 2
      //           }
      //         }
      //       })
      //       if (copyNumber > 0) {
      //         endocedData.frontEndData.visual.panelName = pureName + t("COPY") + ` (${copyNumber})`
      //         endocedData.backEndData.panelName = pureName + t("COPY") + ` (${copyNumber})`
      //       } else {
      //         endocedData.frontEndData.visual.panelName = pureName + t("COPY")
      //         endocedData.backEndData.panelName = pureName + t("COPY")
      //       }
      //     } else {
      //       let copyNumber = 0
      //       copyPanels.forEach(panel => {
      //         if (panel.frontEndData.visual.panelName.includes(endocedData.frontEndData.visual.panelName + t("COPY"))) {
      //           if (Number.isInteger(parseInt(panel.frontEndData.visual.panelName.slice(-2, -1)))) {
      //             let numberTemp = parseInt(panel.frontEndData.visual.panelName.slice(-2, -1)) + 1
      //             if (numberTemp > copyNumber) {
      //               copyNumber = numberTemp
      //             }
      //           } else {
      //             copyNumber = 2
      //           }
      //         }
      //       })

      //       if (copyNumber > 0) {
      //         let name = endocedData.frontEndData.visual.panelName
      //         endocedData.frontEndData.visual.panelName = name + t("COPY") + ` (${copyNumber})`
      //         endocedData.backEndData.panelName = name + t("COPY") + ` (${copyNumber})`
      //       } else {
      //         let name = endocedData.frontEndData.visual.panelName
      //         endocedData.frontEndData.visual.panelName = name + t("COPY")
      //         endocedData.backEndData.panelName = name + t("COPY")
      //       }
      //     }

      //     copyPanels.push(endocedData)
      //     updatePanels(copyPanels)
      //     resetAllAfterModelChange(false)
      //     document.getElementById("inputUploadProject").value = null
      //     setZoomId(null)
      //     setUploading(false)
      //     const dahsboardTimeout = setTimeout(() => {
      //       copyPanels[copyPanels.length - 1].hide = false

      //       updatePanels(copyPanels)
      //     }, 200);
      //     return () => clearTimeout(dahsboardTimeout);

      //   })
      //   .catch(
      //     error => {
      //       setZoomId(null)
      //       setUploading(false)
      //       showAlert(10);
      //       document.getElementById("inputUploadProject").value = null
      //     }
      //   );
    }
  }

  const onSelectFile = (e) => {
    upload(e.target.files[0])
  };

  return (
    // <DndProvider debugMode={true} backend={HTML5Backend}>
    <DndProvider backend={HTML5Backend}>
      {dashboardSmooth &&
        <div className="main_dashboard_container">
          <AlertBox />
          <div className="dashboard_container" style={dashboard && dashboardEnter ? { opacity: "1" } : { opacity: "0" }}>
            <div className="dashboard_scroll">
              <CreatorHeader />
              <div className="dashboard_content">
                <p className="dashboard_header">{t("MAIN_MENU")}</p>
                <p className="dashboard_header_info">{t("DASHBOARD_INSTRUCTION")}</p>

                <div className="dashboard_panels">
                  {panels.map((panel, id) => {
                    return (
                      <div key={id}>
                        {panel.show &&
                          <div className="dashboard_section" style={panel.hide ? { opacity: "0", width: "0", margin: "0" } : {}}>

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


                              <div style={{ cursor: "pointer", zIndex: "10", backgroundColor: "white", margin: "0 auto" }} onClick={() => handleZoom(id)}>
                                <div className="dashboard_box">



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
                                                    fontSize: `${2.5 * sc}px`,
                                                    lineHeight: `${2.5 * sc}px`,
                                                    height: `${3.6 * sc}px`,
                                                    width: `${5 * sc}px`,
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
                                                          fontSize: `${2.5 * sc}px`,
                                                          lineHeight: `${2.5 * sc}px`,
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
                                                    <span style={{
                                                      fontFamily: frame.framePrint.frameFont,
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
                                                          fontSize: `${2.5 * sc}px`,
                                                          lineHeight: `${2.5 * sc}px`,
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
                                                          fontSize: `${2.5 * sc}px`,
                                                          lineHeight: `${2.5 * sc}px`,
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
                                                            fontSize: `${2.5 * sc}px`,
                                                            lineHeight: `${2.5 * sc}px`,
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
                                                        fontSize: `${2.5 * sc}px`,
                                                        lineHeight: `${2.5 * sc}px`,
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
                                                            fontSize: `${2.5 * sc}px`,
                                                            lineHeight: `${2.5 * sc}px`,
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
                                                  visual={false}
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


                                </div>
                                <p className="dashboard_name">{panel.backEndData.panelName}</p>
                              </div>

                              <div className={`resize-${id}`} style={zoomId === id ? { transition: "0.5s ease", opacity: "1", width: "250px", cursor: "default" } : { transform: "translateY(-100%)", transition: "0.5s ease", opacity: "0.5", width: "250px", cursor: "default" }}>
                                <ol className="dashboard_info_list" >
                                  <li>{t("MODEL")}: <span>{t(panel.frontEndData.model.chosenModel.type)}</span></li>
                                  <li>{t("COLOR")}: <span>{t(panel.frontEndData.color.name)}</span></li>
                                  <li>{t("CREATION_DATE")} : <span>{panel.frontEndData.visual.timeOfCreation}</span></li>
                                </ol>


                                <div className="dashboard_button_container">
                                  <div className="dashboard_button_box" onClick={() => { handleSelectPanel(id) }} onMouseOver={() => { setEditOver(true) }} onMouseLeave={() => { setEditOver(false) }}>
                                    <img src={editOver ? Editfill : Edit} alt="edit" className="dashboard_img_button" />
                                    <span>{t("EDIT")}</span>
                                  </div>
                                  <div className="dashboard_button_box" onClick={() => { handleDeletePanel(id) }} onMouseOver={() => { setDeleteOver(true) }} onMouseLeave={() => { setDeleteOver(false) }}>
                                    <img src={deleteOver ? Deletefill : Delete} alt="delete" className="dashboard_img_button" />
                                    <span>{t("DELETE")}</span>
                                  </div>
                                  <div className="dashboard_button_box" onClick={() => { handleCopyPanel(id) }} onMouseOver={() => { setCopyOver(true) }} onMouseLeave={() => { setCopyOver(false) }}>
                                    <img src={copyOver ? Copyfill : Copy} alt="copy" className="dashboard_img_button" />
                                    <span>{t("CREATE_COPY")}</span>
                                  </div>
                                  <div className="dashboard_button_box" onClick={() => { handlePrintPdf(id) }} onMouseOver={() => { setSaveOver(true) }} onMouseLeave={() => { setSaveOver(false) }}>
                                    {saveOver && !downloading &&
                                      <>
                                        <img src={Pdfload} alt="savetopdf" className="dashboard_img_button" />
                                        <img src={Downloadpdfarrow} alt="savetopdf" className="dashboard_img_button_arrow" />
                                      </>
                                    }
                                    {!saveOver && !downloading &&
                                      <img src={Savetopdf} alt="savetopdf" className="dashboard_img_button" />
                                    }
                                    {downloading &&
                                      <>
                                        <img src={Pdfload} alt="savetopdf" className="dashboard_img_button" />
                                        <img src={Downloadpdfarrow} alt="savetopdf" className="dashboard_img_button_arrow"
                                          style={{ animationName: "downloading" }}
                                        />
                                      </>
                                    }
                                    {downloading ?
                                      <span>{t("SAVING")} <br />{t("TO_PDF")}</span>
                                      :
                                      <span>{t("SAVE_TO_PDF")}</span>
                                    }
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        }
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
                      onClick={() => handleZoom("new")}
                      style={
                        zoomId === "new" ?
                          (onTop === "new" || onBack === "new") ? { transform: "scale(1.3)", zIndex: "999", border: "3px solid #EC695C", maxHeight: `${400 + resize}px` } : { transform: "scale(1.3)", border: "3px solid #EC695C", maxHeight: `${400 + resize}px` }
                          : (onTop === "new" || onBack === "new") ? { zIndex: "999", transform: "scale(1)", border: "3px solid #EC695C", maxHeight: "400px" } : { transform: "scale(1)", border: "3px solid #EC695C", maxHeight: "400px" }
                      }
                    >
                      <div style={{ cursor: "pointer", zIndex: "10", backgroundColor: "white", margin: "0 auto" }}  >
                        <div className="dashboard_box">
                          <img src={zoomId === "new" ? Newpanelfill : Newpanel} alt="newpanel" className="dashboard_img" />
                        </div>
                        <p className="dashboard_name">{t("ADD_NEW_PANEL")}</p>
                      </div>

                      <div className={`resize-${"new"}`} style={zoomId === "new" ? { transition: "0.5s ease", opacity: "1", width: "300px", cursor: "default" } : { transform: "translateY(-100%)", transition: "0.5s ease", opacity: "0.5", width: "300px", cursor: "default" }}>
                        <p className="dashboard_info" >{t("ADD_NEW_PANEL_DESCRIPTION")}</p>
                        <div className="dashboard_button_container" style={{ justifyContent: "center" }}>
                          <div className="select_button" onClick={handleAddPanel}>
                            {t("CREATE")}
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
                      onClick={() => handleZoom("upload")}
                      style={
                        zoomId === "upload" ?
                          (onTop === "upload" || onBack === "upload") ? { transform: "scale(1.3)", zIndex: "999", border: "3px solid #EC695C", maxHeight: `${400 + resize}px` } : { transform: "scale(1.3)", border: "3px solid #EC695C", maxHeight: `${400 + resize}px` }
                          : (onTop === "upload" || onBack === "upload") ? { zIndex: "999", transform: "scale(1)", border: "3px solid #EC695C", maxHeight: "400px" } : { transform: "scale(1)", border: "3px solid #EC695C", maxHeight: "400px" }
                      }
                    >
                      <div style={{ cursor: "pointer", zIndex: "10", backgroundColor: "white", margin: "0 auto" }} >
                        <div className="dashboard_box">
                          {zoomId === "upload" && !uploading &&
                            <>
                              <img src={Pdfload} alt="upload" className="dashboard_img" />
                              <img src={Uploadpdfarrow} alt="upload" className="dashboard_img_arrow" />
                            </>
                          }
                          {zoomId !== "upload" && !uploading &&
                            <img src={Uploadpdf} alt="upload" className="dashboard_img" />
                          }
                          {uploading &&
                            <>
                              <img src={Pdfload} alt="upload" className="dashboard_img" />
                              <img src={Uploadpdfarrow} alt="upload" className="dashboard_img_arrow" style={{ animationName: "uploading" }} />
                            </>
                          }
                        </div>
                        {uploading ?
                          <p className="dashboard_name">{t("LOADING")}</p>
                          : <p className="dashboard_name">{t("LOAD_PANEL")}</p>
                        }

                      </div>

                      <div className={`resize-${"upload"}`} style={zoomId === "upload" ? { transition: "0.5s ease", opacity: "1", width: "300px", cursor: "default" } : { transform: "translateY(-100%)", transition: "0.5s ease", opacity: "0.5", width: "300px", cursor: "default" }}>
                        <p className="dashboard_info">{t("LOAD_PANEL_DESCRIPTION")}</p>
                        <div className="dashboard_button_container" style={{ justifyContent: "center" }}>


                          <label htmlFor="inputUploadProject">
                            <div className="select_button">
                              {t("SELECT_FILE")}
                              <div className="button_arrows" />
                            </div>
                          </label>
                          <input type="file" id="inputUploadProject" style={{ display: "none" }} onChange={onSelectFile} />

                        </div>
                      </div>
                    </div>
                  </div>
                </div >
              </div>
            </div>
          </div>
        </div>
      }
      {!dashboardSmooth &&
        <MainCreator dashboardSmooth={dashboardSmooth} />
      }
    </DndProvider >
  );
});





const mapStateToProps = state => ({
  panels: state.panels.panels,
  dashboard: state.panels.dashboard,
  dashboardEnter: state.panels.dashboardEnter,
  alert: state.frontEndData.visual.alert,
  alertAnswer: state.frontEndData.visual.alertAnswer,
})

const mapDispatchToProps = dispatch => ({
  showDashboard: (income) => dispatch(actionsDashboard.showDashboard(income)),
  dashboardSmoothEnter: (income) => dispatch(actionsDashboard.dashboardSmoothEnter(income)),
  hideCreator: (income) => dispatch(actionsDashboard.hideCreator(income)),
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
  updateVersion: (income) => dispatch(actionsVisual.updateVersion(income)),
  showAlert: (income) => dispatch(actionsVisual.showAlert(income)),
  setAlertAnswer: (income) => dispatch(actionsVisual.setAlertAnswer(income)),

  resetAllAfterModelChange: (income) => dispatch(actionsModel.resetAllAfterModelChange(income)),

})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)