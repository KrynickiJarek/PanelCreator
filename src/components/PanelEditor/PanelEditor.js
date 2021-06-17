import { useState } from 'react';
import "./PanelEditor.scss"

import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'

import 'antd/dist/antd.css'; //----------usuń jak zmienisz model


import ModelChooser from './ModelChooser/ModelChooser';
import IconEditor from "./IconEditor/IconEditor"
import TextEditor from "./TextEditor/TextEditor"
import FrameEditor from "./FrameEditor/FrameEditor"
import ColorEditor from "./ColorEditor/ColorEditor"

import Model from "../../assets/editornav/model.svg"
import ModelFill from "../../assets/editornav/model_fill.svg"
import Icons from "../../assets/editornav/icons.svg"
import IconsFill from "../../assets/editornav/icons_fill.svg"
import Text from "../../assets/editornav/text.svg"
import TextFill from "../../assets/editornav/text_fill.svg"
import Frame from "../../assets/editornav/frame.svg"
import FrameFill from "../../assets/editornav/frame_fill.svg"
import Color from "../../assets/editornav/color.svg"
import ColorFill from "../../assets/editornav/color_fill.svg"

const PanelEditor = ({ onModelSet, onColorSet, onIconSet, chosenColor, chosenModel, onTabSet, onFontSet, onFrameFontSet, onFrameShapeSet, onAddNewFrame }) => {

  const [modelHover, setModelHover] = useState(false)
  const [iconsHover, setIconsHover] = useState(false)
  const [textHover, setTextHover] = useState(false)
  const [frameHover, setFrameHover] = useState(false)
  const [colorHover, setColorHover] = useState(false)

  const [modelShow, setModelShow] = useState(true)
  const [iconsShow, setIconsShow] = useState(false)
  const [textShow, setTextShow] = useState(false)
  const [frameShow, setFrameShow] = useState(false)
  const [colorShow, setColorShow] = useState(false)



  const handleClickModel = () => {
    setModelHover(true)
    setModelShow(true)
    setIconsShow(false)
    setTextShow(false)
    setFrameShow(false)
    setColorShow(false)
    onTabSet("model")
  }
  const handleClickIcons = () => {
    setIconsHover(true)
    setModelShow(false)
    setIconsShow(true)
    setTextShow(false)
    setFrameShow(false)
    setColorShow(false)
    onTabSet("icons")
  }
  const handleClickText = () => {
    setTextHover(true)
    setModelShow(false)
    setIconsShow(false)
    setTextShow(true)
    setFrameShow(false)
    setColorShow(false)
    onTabSet("text")
  }
  const handleClickFrame = () => {
    setFrameHover(true)
    setModelShow(false)
    setIconsShow(false)
    setTextShow(false)
    setFrameShow(true)
    setColorShow(false)
    onTabSet("frame")
  }
  const handleClickColor = () => {
    setColorHover(true)
    setModelShow(false)
    setIconsShow(false)
    setTextShow(false)
    setFrameShow(false)
    setColorShow(true)
    onTabSet("color")
  }





  return (
    <Tab.Container defaultActiveKey="model" mountOnEnter>
      <div className="editor_container">
        <div className="editor_nav">
          <Nav.Link eventKey="model">
            <div className="editor_button" onMouseOver={() => { setModelHover(true) }} onMouseLeave={() => { setModelHover(false) }} onClick={handleClickModel}>
              <img src={Model} alt="model" className="button_icon" />
              {(modelHover || modelShow) && <img src={ModelFill} alt="model" className="button_icon_hover" />}
              <p className="button_text" style={modelShow ? { fontWeight: "700" } : {}}>Model</p>
            </div>
          </Nav.Link>

          <Nav.Link eventKey="color">
            <div className="editor_button" onMouseOver={() => { setColorHover(true) }} onMouseLeave={() => { setColorHover(false) }} onClick={handleClickColor}>
              <img src={Color} alt="color" className="button_icon" />
              {(colorHover || colorShow) && <img src={ColorFill} alt="color" className="button_icon_hover" />}
              <p className="button_text" style={colorShow ? { fontWeight: "700" } : {}}>Kolor</p>
            </div>
          </Nav.Link>

          <Nav.Link eventKey="icon">
            <div className="editor_button" onMouseOver={() => { setIconsHover(true) }} onMouseLeave={() => { setIconsHover(false) }} onClick={handleClickIcons}>
              <img src={Icons} alt="icons" className="button_icon" />
              {(iconsHover || iconsShow) && <img src={IconsFill} alt="icons" className="button_icon_hover" />}
              <p className="button_text" style={iconsShow ? { fontWeight: "700" } : {}}>Ikony</p>
            </div>
          </Nav.Link>

          <Nav.Link eventKey="text">
            <div className="editor_button" onMouseOver={() => { setTextHover(true) }} onMouseLeave={() => { setTextHover(false) }} onClick={handleClickText}>
              <img src={Text} alt="text" className="button_icon" />
              {(textHover || textShow) && <img src={TextFill} alt="text" className="button_icon_hover" />}
              <p className="button_text" style={textShow ? { fontWeight: "700" } : {}}>Napisy</p>
            </div>
          </Nav.Link>

          <Nav.Link eventKey="frame">
            <div className="editor_button" onMouseOver={() => { setFrameHover(true) }} onMouseLeave={() => { setFrameHover(false) }} onClick={handleClickFrame}>
              <img src={Frame} alt="frame" className="button_icon" />
              {(frameHover || frameShow) && <img src={FrameFill} alt="frame" className="button_icon_hover" />}
              <p className="button_text" style={frameShow ? { fontWeight: "700" } : {}}>Ramki</p>
            </div>
          </Nav.Link>
        </div>
        <div className="editor_box">
          <Tab.Content>
            <Tab.Pane eventKey="model">
              <ModelChooser onModelSet={onModelSet} chosenModel={chosenModel} />
            </Tab.Pane>
            <Tab.Pane eventKey="color">
              <ColorEditor onColorSet={onColorSet} chosenColor={chosenColor} />
            </Tab.Pane>
            <Tab.Pane eventKey="icon">
              <IconEditor onIconSet={onIconSet} />
            </Tab.Pane>
            <Tab.Pane eventKey="text">
              <TextEditor onFontSet={onFontSet} />
            </Tab.Pane>
            <Tab.Pane eventKey="frame">
              <FrameEditor onFrameFontSet={onFrameFontSet} onFrameShapeSet={onFrameShapeSet} onAddNewFrame={onAddNewFrame} />
            </Tab.Pane>

          </Tab.Content>
        </div>
      </div>
    </Tab.Container>

  );
};

export default PanelEditor;
