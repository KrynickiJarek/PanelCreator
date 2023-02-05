import { useState } from 'react';
import { connect } from "react-redux"
import actions from "./duck/actions"
import actionsIcon from "../PanelEditor/IconEditor/duck/actions"
import "./PanelEditor.scss"
import { t } from "../../../i18n";

import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'



import ModelChooser from './ModelChooser/ModelChooser';
import IconEditor from "./IconEditor/IconEditor"
import TextEditor from "./TextEditor/TextEditor"
import FrameEditor from "./FrameEditor/FrameEditor"
import ColorEditor from "./ColorEditor/ColorEditor"

import Model from "../../../assets/editornav/model.svg"
import ModelFill from "../../../assets/editornav/model_fill.svg"
import Icons from "../../../assets/editornav/icons.svg"
import IconsFill from "../../../assets/editornav/icons_fill.svg"
import Text from "../../../assets/editornav/text.svg"
import TextFill from "../../../assets/editornav/text_fill.svg"
import Frame from "../../../assets/editornav/frame.svg"
import FrameFill from "../../../assets/editornav/frame_fill.svg"
import Color from "../../../assets/editornav/color.svg"
import ColorFill from "../../../assets/editornav/color_fill.svg"

const PanelEditor = ({ tab, change, iconHolders, changeIconHolders, isAnySelected, chosenModel }) => {

  const [modelHover, setModelHover] = useState(false)
  const [iconsHover, setIconsHover] = useState(false)
  const [textHover, setTextHover] = useState(false)
  const [frameHover, setFrameHover] = useState(false)
  const [colorHover, setColorHover] = useState(false)


  const handleClickModel = () => {
    setModelHover(true)
    change("model")
    const copyArr = iconHolders
    copyArr.forEach((el) => {
      el.selectedDot = false;
      el.selected = false;
      el.selectedUp = false;
      el.selectedDown = false;
    })
    changeIconHolders(copyArr)
    isAnySelected(false)
  }
  const handleClickIcons = () => {
    setIconsHover(true)
    change("icons")
  }
  const handleClickText = () => {
    setTextHover(true)
    change("text")
    const copyArr = iconHolders
    copyArr.forEach((el) => {
      el.selectedDot = false;
      el.selected = false;
      el.selectedUp = false;
      el.selectedDown = false;
    })
    changeIconHolders(copyArr)
    isAnySelected(false)
  }
  const handleClickFrame = () => {
    setFrameHover(true)
    change("frame")
    const copyArr = iconHolders
    copyArr.forEach((el) => {
      el.selectedDot = false;
      el.selected = false;
      el.selectedUp = false;
      el.selectedDown = false;
    })
    changeIconHolders(copyArr)
    isAnySelected(false)
  }
  const handleClickColor = () => {
    setColorHover(true)
    change("color")
    const copyArr = iconHolders
    copyArr.forEach((el) => {
      el.selectedDot = false;
      el.selected = false;
      el.selectedUp = false;
      el.selectedDown = false;
    })
    changeIconHolders(copyArr)
    isAnySelected(false)
  }



  return (
    <Tab.Container defaultActiveKey="model" mountOnEnter>
      <div className="editor_container">
        <div className="editor_nav">
          <Nav.Link eventKey="model">
            <div className="editor_button" onMouseOver={() => { setModelHover(true) }} onMouseLeave={() => { setModelHover(false) }} onClick={handleClickModel}>
              <img src={Model} alt="model" className="button_icon" />
              {(modelHover || tab === "model") && <img src={ModelFill} alt="model" className="button_icon_hover" />}
              <div className="button_text_box">
                <p className="button_text" style={tab === "model" ? { fontWeight: "700" } : {}}>{t("MODELS")}</p>
              </div>
            </div>
          </Nav.Link>

          <Nav.Link eventKey="color">
            <div className="editor_button" onMouseOver={() => { setColorHover(true) }} onMouseLeave={() => { setColorHover(false) }} onClick={handleClickColor}>
              <img src={Color} alt="color" className="button_icon" />
              {(colorHover || tab === "color") && <img src={ColorFill} alt="color" className="button_icon_hover" />}
              <div className="button_text_box">
                <p className="button_text" style={tab === "color" ? { fontWeight: "700" } : {}}>{t("COLORS")}</p>
              </div>
            </div>
          </Nav.Link>

          <Nav.Link eventKey="icon">
            <div className="editor_button" onMouseOver={() => { setIconsHover(true) }} onMouseLeave={() => { setIconsHover(false) }} onClick={handleClickIcons}>
              <img src={Icons} alt="icons" className="button_icon" />
              {(iconsHover || tab === "icons") && <img src={IconsFill} alt="icons" className="button_icon_hover" />}
              <div className="button_text_box">
                <p className="button_text" style={tab === "icons" ? { fontWeight: "700" } : {}}>{t("ICONS")}</p>
              </div>
            </div>
          </Nav.Link>

          <Nav.Link eventKey="text">
            <div className="editor_button" onMouseOver={() => { setTextHover(true) }} onMouseLeave={() => { setTextHover(false) }} onClick={handleClickText}>
              <img src={Text} alt="text" className="button_icon" />
              {(textHover || tab === "text") && <img src={TextFill} alt="text" className="button_icon_hover" />}
              <div className="button_text_box">
                <p className="button_text" style={tab === "text" ? { fontWeight: "700" } : {}}>{chosenModel.type === "M_DOT_R14" ? t("TITLES_AND_RFID_READER") : t("TITLES")}</p>
              </div>
            </div>
          </Nav.Link>

          <Nav.Link eventKey="frame">
            <div className="editor_button" onMouseOver={() => { setFrameHover(true) }} onMouseLeave={() => { setFrameHover(false) }} onClick={handleClickFrame}>
              <img src={Frame} alt="frame" className="button_icon" />
              {(frameHover || tab === "frame") && <img src={FrameFill} alt="frame" className="button_icon_hover" />}
              <div className="button_text_box">
                <p className="button_text" style={tab === "frame" ? { fontWeight: "700" } : {}}>{t("FRAMES")}</p>
              </div>
            </div>
          </Nav.Link>
        </div>
        <div className="editor_box">
          <Tab.Content>
            <Tab.Pane eventKey="model">
              <ModelChooser />
            </Tab.Pane>
            <Tab.Pane eventKey="color">
              <ColorEditor />
            </Tab.Pane>
            <Tab.Pane eventKey="icon">
              <IconEditor />
            </Tab.Pane>
            <Tab.Pane eventKey="text">
              <TextEditor />
            </Tab.Pane>
            <Tab.Pane eventKey="frame">
              <FrameEditor />
            </Tab.Pane>

          </Tab.Content>
        </div>
      </div>
    </Tab.Container>

  );
};

const mapStateToProps = state => ({
  tab: state.frontEndData.tab.tab,
  iconHolders: state.frontEndData.icon.iconHolders,
  languageRender: state.frontEndData.visual.languageRender,
  chosenModel: state.frontEndData.model.chosenModel,
})

const mapDispatchToProps = dispatch => ({
  change: tab => dispatch(actions.change(tab)),
  changeIconHolders: (income) => dispatch(actionsIcon.changeIconHolders(income)),
  isAnySelected: (income) => dispatch(actionsIcon.isAnySelected(income)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PanelEditor)

