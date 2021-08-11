import React, { useState } from 'react';
import { connect } from "react-redux"
import actionsVisual from "../../PanelPreview/duck/actions"
import actions from "./duck/actions"
import "./IconEditor.scss"

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
      // alert("Niepoprawny plik. Wybierz plik z rozszerzeniem .svg!")
      showAlert(7);

    } else {
      // var reader = new FileReader();
      // // Set the image once loaded into file reader
      // reader.onload = function (e) {

      //   var img = document.createElement("img");
      //   img.src = e.target.result;

      //   var canvas = document.createElement("canvas");
      //   var ctx = canvas.getContext("2d");
      //   ctx.drawImage(img, 0, 0);

      //   var MAX_WIDTH = 280;
      //   var MAX_HEIGHT = 280;
      //   var width = img.width;
      //   var height = img.height;

      //   if (width > height) {
      //     if (width > MAX_WIDTH) {
      //       height *= MAX_WIDTH / width;
      //       width = MAX_WIDTH;
      //     }
      //   } else {
      //     if (height > MAX_HEIGHT) {
      //       width *= MAX_HEIGHT / height;
      //       height = MAX_HEIGHT;
      //     }
      //   }
      //   canvas.width = width;
      //   canvas.height = height;
      //   ctx = canvas.getContext("2d");
      //   ctx.drawImage(img, 0, 0, width, height);

      //   let resizedFile = canvas.toDataURL()
      //   const image = {
      //     default: resizedFile
      //   }
      //   let copyOwnIcons = ownIcons
      //   copyOwnIcons.push(image)
      //   updateOwnIcons(copyOwnIcons)
      //   console.log(copyOwnIcons)
      //   document.getElementById("inputUploadIcon").value = null
      // }
      // reader.readAsDataURL(e.target.files[0]);


      // console.log(e.target)
      // console.log(e.target.files[0])


      // var svgimg = document.createElementNS("http://www.w3.org/2000/svg", "image");
      // svgimg.setAttribute('width', '88pt');
      // svgimg.setAttribute('height', '88pt');
      // svgimg.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', e.target.files[0]);
      // document.getElementById("mySvg").appendChild(svgimg);






      getBase64(e.target.files[0]).then(

        data => {
          const image = {
            default: data
          }
          // document.getElementById('output').src = data;

          // var svgimg = document.createElementNS("http://www.w3.org/2000/svg", "image");

          // svgimg.setAttribute('width', '88pt');
          // svgimg.setAttribute('height', '88pt');
          // svgimg.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', data);
          // document.getElementById("mySvg").appendChild(svgimg);
          // console.log(svgimg)

          // let svgToJson = JSON.stringify(svgimg);
          // let svgToBase64 = Buffer.from(svgToJson).toString("base64")
          // console.log(svgToJson)
          // console.log(svgToBase64)



          // getBase64(svgimg).then(
          //   data => {
          //     console.log(data)
          //   })







          //-----------------------
          let copyOwnIcons = ownIcons
          copyOwnIcons.push(image)
          updateOwnIcons(copyOwnIcons)
          document.getElementById("inputUploadIcon").value = null
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
            <h2 className="visual_info">Niedostępne w trybie wizualizacji</h2>
          </div>
          <div className="visual_button"
            onClick={() => toggleVisual(!visual)}
            onMouseOver={() => setUnlock(true)}
            onMouseLeave={() => setUnlock(false)}
          >
            Tryb edycji
            <div className="button_arrows" />
          </div>
        </div>
      </div>
      <div className="icon_container">
        <h2 className="icon_header">Ikony</h2>
        <div className="icon_content">
          <Tab.Container defaultActiveKey="ulubione" mountOnEnter>
            <div className="nav_col">
              <Nav variant="pills" className="flex-column">
                <Nav.Link eventKey="ulubione" >
                  <img src={Favorite} alt="own" className="favorite_nav" />
                  Ulubione
                </Nav.Link>
                <Nav.Link eventKey="własne" >
                  <img src={Own} alt="own" className="favorite_nav" />
                  Własne
                </Nav.Link>
                {iconCategories.map((el, i) => (
                  <Nav.Link key={i} eventKey={el.name}>{el.name}</Nav.Link>
                ))}
              </Nav>
            </div>
            <div className="content_col">
              <Tab.Content>
                <Tab.Pane eventKey="ulubione">
                  <div className="icons">
                    <div className="instruction_box">
                      <p className="instruction_bold">Wybierz kategorię ikon, a następie przeciągaj wybrane ikony w odpowiednie miejsca na panelu. Będą one podświetlone kolorem  <span style={{ ...orangeStyle }} />.
                        Aby zostawić ikonę należy ją upuścić w momencie, gdy pole jest podświetlone kolorem  <span style={{ ...greenStyle }} />.</p>
                      <p className="instruction">Kliknięcie na ikonę spowoduje dodanie jej do Ulubionych.</p>

                      {favoriteIcons.length === 0 &&
                        <p className="instruction" style={{ margin: "28px" }}>(W tym miejscu pojawią się ikony dodane do Ulubionych
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
                      <p className="instruction_bold" style={{ marginTop: "20px" }}>Ulubione ikony z pozostałych projektów:</p>

                      {panels.length === 0 || (panels.length === 1 && indexOfLastPanel !== -1) ?
                        <p className="instruction" style={{ marginTop: "0", marginBottom: "5px", fontSize: "12px" }}>(Nie dodano innych projektów)</p>
                        :
                        <>
                          <p className="instruction" >Kliknięcie na ikonę spowoduje dodanie jej do Ulubionych w bieżącym projekcie.</p>
                          {panels.map((panel, index) =>
                            <div key={index}>
                              {indexOfLastPanel !== index &&
                                <>
                                  <p className="instruction_bold" style={{ marginLeft: "20px", marginBottom: "5px" }}> {'\u2022'} {panel.backEndData.panelName} :</p>
                                  {panel.frontEndData.icon.favoriteIcons.length === 0 &&
                                    <p className="instruction" style={{ marginTop: "0", marginBottom: "5px", fontSize: "12px" }}>(Brak ulubionych ikon w projekcie)</p>
                                  }
                                  {panel.frontEndData.icon.favoriteIcons.length !== 0 && panel.frontEndData.icon.favoriteIcons.filter(containFavorite).length === 0 &&
                                    <p className="instruction" style={{ marginTop: "0", marginBottom: "5px", fontSize: "12px" }}>(Brak innych ulubonych ikon w projekcie )</p>
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

                      <p className="instruction_bold">Aby dodać własną ikonę należy wczytać ją z dysku.</p>
                      <p className="instruction">Możliwe jest dodanie plików z rozszerzeniu SVG. Aby ikony wyświetlały się poprawnie powinny mieć przeźroczyste tło i jeden kolor.</p>
                      <label htmlFor="inputUploadIcon" >
                        <div className="select_button">
                          WYBIERZ PLIK
                          <div className="button_arrows" />
                        </div>
                      </label>
                      {/* <svg id="mySvg" style={{ display: "none" }} /> */}
                      {/* <svg id="mySvg" /> */}
                      <input type="file" id="inputUploadIcon" style={{ display: "none" }} onChange={onSelectFile} />
                    </div>

                    {ownIcons.map((image, index) =>
                      <IconToDrag key={index} image={image} isInOwn={true} ownIconIndex={index} />)}


                    <div className="instruction_box">
                      <p className="instruction_bold" style={{ marginTop: "20px" }}>Własne ikony z pozostałych projektów:</p>

                      {panels.length === 0 || (panels.length === 1 && indexOfLastPanel !== -1) ?
                        <p className="instruction" style={{ marginTop: "0", marginBottom: "5px", fontSize: "12px" }}>(Nie dodano innych projektów)</p>
                        :
                        <>
                          <p className="instruction" >Kliknij na ikonę aby przekopiować ją do bieżącego projektu.</p>
                          {panels.map((panel, index) =>
                            <div key={index}>
                              {indexOfLastPanel !== index &&
                                <>
                                  <p className="instruction_bold" style={{ marginLeft: "20px", marginBottom: "5px" }}> {'\u2022'} {panel.backEndData.panelName} :</p>

                                  {panel.frontEndData.icon.ownIcons.length === 0 ?
                                    <p className="instruction" style={{ marginTop: "0", marginBottom: "5px", fontSize: "12px" }}>(Brak własnych ikon w projekcie)</p>
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


})

const mapDispatchToProps = dispatch => ({
  toggleVisual: (income) => dispatch(actionsVisual.toggleVisual(income)),
  showAlert: (income) => dispatch(actionsVisual.showAlert(income)),
  updateOwnIcons: (income) => dispatch(actions.updateOwnIcons(income)),
})

export default connect(mapStateToProps, mapDispatchToProps)(IconEditor)