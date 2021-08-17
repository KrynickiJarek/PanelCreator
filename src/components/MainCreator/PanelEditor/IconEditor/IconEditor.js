import React, { useState } from 'react';
import { connect } from "react-redux"
import actionsVisual from "../../PanelPreview/duck/actions"
import actions from "./duck/actions"
import "./IconEditor.scss"
import { t } from "../../../../i18n";

import Favorite from "../../../../assets/favorite.svg"
import Own from "../../../../assets/own.svg"
import Locked from "../../../../assets/preview/lock.svg"
import Unlocked from "../../../../assets/preview/unlock.svg"

import IconToDrag from './IconToDrag';
import iconCategories from "./iconCategories"

import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'




export const IconEditor = ({ visual, toggleVisual, favoriteIcons, ownIcons, updateOwnIcons, panels, indexOfLastPanel, chosenColor, showAlert }) => {

  const [unlock, setUnlock] = useState(false)

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

  if (chosenColor.hex === "#30a32c") {
    greenStyle.backgroundColor = "rgb( 32, 114, 30)"
  }


  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }


  const onSelectFile = (e) => {
    if (e.target.files[0].type !== "image/svg+xml") {
      showAlert(11);
    } else if (e.target.files[0].size > 100000) {
      showAlert(12);
    } else {
      console.log(e.target.files[0])
      getBase64(e.target.files[0]).then(
        data => {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', data);
          xhr.addEventListener('load', function (ev) {
            var xml = ev.target.response;
            var dom = new DOMParser();
            var svg = dom.parseFromString(xml, 'image/svg+xml');
            let svgDisplay = svg.rootElement

            svgDisplay.setAttribute("height", "28pt");
            svgDisplay.setAttribute("width", "28pt");

            let vbw = svgDisplay.viewBox.animVal.width
            let vhh = svgDisplay.viewBox.animVal.height
            svgDisplay.setAttribute("viewbox", `0 0 ${vbw} ${vhh}`);


            var svgSerializer = new XMLSerializer().serializeToString(svgDisplay)
            // var svgB64 = 'data:image/svg+xml;base64,' + btoa(svgSerializer);
            var svgB64 = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgSerializer)));
            const image = {
              default: svgB64
            }
            let copyOwnIcons = ownIcons
            copyOwnIcons.push(image)
            updateOwnIcons(copyOwnIcons)
            document.getElementById("inputUploadIcon").value = null
          });
          xhr.send(null);
        }
      )
    }
  };

  const containFavorite = (icon) => {
    return !favoriteIcons.includes(icon)
  }


  return (
    <div className="scroll_container">
      <div className="visual_background" style={visual ? { opacity: "1", zIndex: "999" } : { opacity: "0", zIndex: "-1" }}>
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
      <div className="icon_container">
        <h2 className="icon_header">{t("ICONS")}</h2>
        <div className="icon_content">
          <Tab.Container defaultActiveKey="ulubione" mountOnEnter>
            <div className="nav_col">
              <Nav variant="pills" className="flex-column">
                <Nav.Link eventKey="ulubione" >
                  <img src={Favorite} alt="own" className="favorite_nav" />
                  {t("FAVOURITE")}
                </Nav.Link>
                <Nav.Link eventKey="własne" >
                  <img src={Own} alt="own" className="favorite_nav" />
                  {t("CUSTOM")}
                </Nav.Link>
                {iconCategories.map((el, i) => (
                  <Nav.Link key={i} eventKey={el.name}>{t(el.name)}</Nav.Link>
                ))}
              </Nav>
            </div>
            <div className="content_col">
              <Tab.Content>
                <Tab.Pane eventKey="ulubione">
                  <div className="icons">
                    <div className="instruction_box">
                      <p className="instruction_bold">{t("FAVOURITE_ICONS_INSTRUCTION_BOLD_1")}<span style={{ ...orangeStyle }} />.
                        {t("FAVOURITE_ICONS_INSTRUCTION_BOLD_2")}
                        <span style={{ ...greenStyle }} />.</p>
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
                      {/* <svg id="mySvg" /> */}
                      <input type="file" id="inputUploadIcon" style={{ display: "none" }} onChange={onSelectFile} />
                    </div>

                    {ownIcons.map((image, index) =>
                      <IconToDrag key={index} image={image} isInOwn={true} ownIconIndex={index} />)}


                    <div className="instruction_box">
                      <p className="instruction_bold" style={{ marginTop: "20px" }}>{t("CUSTOM_ICONS_INSTRUCTION_BOLD_2")}</p>

                      {panels.length === 0 || (panels.length === 1 && indexOfLastPanel !== -1) ?
                        <p className="instruction" style={{ marginTop: "0", marginBottom: "5px", fontSize: "12px" }}>{t("NO_OTHER_PROJECTS")}</p>
                        :
                        <>
                          <p className="instruction" >{t("CUSTOM_ICONS_INSTRUCTION_NORMAL_1")}</p>
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
                {iconCategories.map((el, i) => (
                  <Tab.Pane eventKey={el.name} key={i}>
                    <div className="icons">
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
      </div>
    </div>

  );
}

const mapStateToProps = state => ({
  chosenColor: state.frontEndData.color,
  visual: state.frontEndData.visual.visual,
  favoriteIcons: state.frontEndData.icon.favoriteIcons,
  ownIcons: state.frontEndData.icon.ownIcons,
  favoriteIconsRender: state.frontEndData.icon.favoriteIconsRender,
  ownIconsRender: state.frontEndData.icon.ownIconsRender,

  panels: state.panels.panels,
  indexOfLastPanel: state.panels.indexOfLastPanel,
  languageRender: state.frontEndData.visual.languageRender,


})

const mapDispatchToProps = dispatch => ({
  toggleVisual: (income) => dispatch(actionsVisual.toggleVisual(income)),
  showAlert: (income) => dispatch(actionsVisual.showAlert(income)),
  updateOwnIcons: (income) => dispatch(actions.updateOwnIcons(income)),
})

export default connect(mapStateToProps, mapDispatchToProps)(IconEditor)

// function getBase64(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = error => reject(error);
//   });
// }


// const onSelectFile = (e) => {

//   if (e.target.files[0].type !== "image/svg+xml") {
//     showAlert(7);

//   } else {

//     getBase64(e.target.files[0]).then(
//       data => {
//         var xhr = new XMLHttpRequest();
//         xhr.open('GET', data);
//         xhr.addEventListener('load', function (ev) {
//           var xml = ev.target.response;
//           var dom = new DOMParser();
//           var svg = dom.parseFromString(xml, 'image/svg+xml');
//           let svgDisplay = svg.rootElement



//           svgDisplay.setAttribute("height", "28pt"); //wartość nie ma znaczenia
//           svgDisplay.setAttribute("width", "28pt"); //wartośc nie ma znaczenia
//           // console.log(svgDisplay.width.animVal.value)
//           // console.log(svgDisplay.viewBox)
//           // console.log(svgDisplay.height.animVal.value)

//           let vbw = svgDisplay.viewBox.animVal.width
//           let vhh = svgDisplay.viewBox.animVal.height
//           svgDisplay.setAttribute("viewbox", `0 0 ${vbw} ${vhh}`);

//           // ----------------------------------------------------------------gotowe?-----------
//           // type = 1 - number 
//           // let vbw = svgDisplay.width.animVal.value
//           // let vhh = svgDisplay.height.animVal.value
//           // svgDisplay.setAttribute("viewbox", `0 0 ${vbw} ${vhh}`);
//           // ----------------------------------------------------------------/gotowe----------

//           // svgDisplay.setAttribute("fill", "black")
//           // document.getElementById("mySvg").appendChild(svgDisplay);
//           // console.log(svgDisplay)


//           var svgSerializer = new XMLSerializer().serializeToString(svgDisplay)
//           // var svgB64 = window.btoa(svgSerializer);
//           var svgB64 = 'data:image/svg+xml;base64,' + btoa(svgSerializer);
//           const image = {
//             default: svgB64
//           }
//           let copyOwnIcons = ownIcons
//           copyOwnIcons.push(image)
//           updateOwnIcons(copyOwnIcons)
//           document.getElementById("inputUploadIcon").value = null
//         });
//         xhr.send(null);

//         //     let copyOwnIcons = ownIcons
//         //     copyOwnIcons.push(image)
//         //     updateOwnIcons(copyOwnIcons)
//         //     document.getElementById("inputUploadIcon").value = null
//         //   }
//         // )
//       }
//     )
//   }
// };