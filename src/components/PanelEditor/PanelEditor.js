// import React from 'react';
import { useState } from 'react';

import "./PanelEditor.scss"

import 'antd/dist/antd.css';
// import { Tabs } from 'antd';


import PanelChooser from './PanelChooser/PanelChooser';
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

const PanelEditor = ({ onModelSet, onColorSet, onIconSet , chosenColor, chosenModel }) => {

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
  }
  const handleClickIcons = () => {
    setIconsHover(true)
    setModelShow(false)
    setIconsShow(true)
    setTextShow(false)
    setFrameShow(false)
    setColorShow(false)
  }
  const handleClickText = () => {
    setTextHover(true)
    setModelShow(false)
    setIconsShow(false)
    setTextShow(true)
    setFrameShow(false)
    setColorShow(false)
  }
  const handleClickFrame = () => {
    setFrameHover(true)
    setModelShow(false)
    setIconsShow(false)
    setTextShow(false)
    setFrameShow(true)
    setColorShow(false)
  }
  const handleClickColor = () => {
    setColorHover(true)
    setModelShow(false)
    setIconsShow(false)
    setTextShow(false)
    setFrameShow(false)
    setColorShow(true)
  }


  return (

    <div className="editor_container">
        <div className="editor_nav">
          <div className="editor_button" onMouseOver={() => { setModelHover(true) }} onMouseLeave={() => { setModelHover(false) }} onClick={handleClickModel}>
            <img src={Model} alt="model" className="button_icon" />
            {(modelHover || modelShow) && <img src={ModelFill} alt="model" className="button_icon_hover" />}
            <p className="button_text" style={modelShow ? { fontWeight: "700" } : {}}>Model</p>
          </div>
          <div className="editor_button" onMouseOver={() => { setColorHover(true) }} onMouseLeave={() => { setColorHover(false) }} onClick={handleClickColor}>
            <img src={Color} alt="color" className="button_icon" />
            {(colorHover || colorShow) && <img src={ColorFill} alt="color" className="button_icon_hover" />}
            <p className="button_text" style={colorShow ? { fontWeight: "700" } : {}}>Kolor</p>
          </div>
          <div className="editor_button" onMouseOver={() => { setIconsHover(true) }} onMouseLeave={() => { setIconsHover(false) }} onClick={handleClickIcons}>
            <img src={Icons} alt="icons" className="button_icon" />
            {(iconsHover || iconsShow) && <img src={IconsFill} alt="icons" className="button_icon_hover" />}
            <p className="button_text" style={iconsShow ? { fontWeight: "700" } : {}}>Ikony</p>
          </div>
          <div className="editor_button" onMouseOver={() => { setTextHover(true) }} onMouseLeave={() => { setTextHover(false) }} onClick={handleClickText}>
            <img src={Text} alt="text" className="button_icon" />
            {(textHover || textShow) && <img src={TextFill} alt="text" className="button_icon_hover" />}
            <p className="button_text" style={textShow ? { fontWeight: "700" } : {}}>Tekst</p>
          </div>
          <div className="editor_button" onMouseOver={() => { setFrameHover(true) }} onMouseLeave={() => { setFrameHover(false) }} onClick={handleClickFrame}>
            <img src={Frame} alt="frame" className="button_icon" />
            {(frameHover || frameShow) && <img src={FrameFill} alt="frame" className="button_icon_hover" />}
            <p className="button_text" style={frameShow ? { fontWeight: "700" } : {}}>Ramki</p>
          </div>

        </div>
        <div className="editor_box">
          {modelShow && <PanelChooser onModelSet={onModelSet} chosenModel={chosenModel} />}
          {colorShow && <ColorEditor onColorSet={onColorSet} chosenColor={chosenColor}/>}
          {iconsShow && <IconEditor onIconSet={onIconSet} />}
          {textShow && <TextEditor />}
          {frameShow && <FrameEditor />}
        </div>
    </div>
  );
};

export default PanelEditor;