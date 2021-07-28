import { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { connect } from "react-redux"
import actionsIcon from "../../../PanelEditor/IconEditor/duck/actions"
import actionsBackEnd from "../../../duck/actions"

import "./../IconHolderSlash.scss"




export const ReDragDown = ({
  image,
  scale,
  visual,
  chosenColor,
  chosenTab,
  iconHolders,
  index,
  changeIconHolders,
  isAnySelected,
  rotationDown,
  iconsBackEnd,
  changeIconsBackEnd,
  singleFrame,
  singleFrameTemp,
  selectedDown,
  chosenModel,
}) => {


  const [backgroundColorWhileDragging, setBackgroundColorWhileDragging] = useState("transparent")

  const handleMouseDown = () => {
    setBackgroundColorWhileDragging("rgba(255,255,255,0.33)")
  }

  const handleMouseUp = () => {
    setBackgroundColorWhileDragging("transparent")
  }
  const handleSelect = () => {
    if (chosenTab === "icons") {
      const copyArr = iconHolders
      copyArr.forEach((el, i) => {
        if (i === index) {
          el.selectedDot = false;
          el.selected = false;
          el.selectedUp = false;
        } else {
          el.selectedDot = false;
          el.selected = false;
          el.selectedUp = false;
          el.selectedDown = false;
        }
      })
      if (copyArr[index].selectedDown) {
        copyArr[index].selectedDown = false
        isAnySelected(false)
      } else {
        copyArr[index].selectedDown = true
        isAnySelected(true)
      }
      changeIconHolders(copyArr)
    }
  }

  const handleReset = () => {
    const copyArr = iconHolders
    copyArr.forEach((el) => {
      el.selectedDot = false;
      el.selected = false;
      el.selectedUp = false;
      el.selectedDown = false;
    })
    copyArr[index].lastDroppedSlashDown = null
    copyArr[index].rotationDown = null
    changeIconHolders(copyArr)
    // ---------------------------------------------------------------------------------------------------------------BACKEND---------------------
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

    // const copyIconsBackEnd = iconsBackEnd.filter(element => { return !((element.number === index + 1) && (element.type === 2)) })
    const copyIconsBackEnd = iconsBackEnd.filter(element => { return !((element.number === numberBackEnd) && (element.type === 2)) })
    changeIconsBackEnd(copyIconsBackEnd)
    // ---------------------------------------------------------------------------------------------------------------/BACKEND---------------------
  }

  let styleScale = {};
  styleScale.height = `${7.5 * scale}px`;
  styleScale.width = `${7.5 * scale}px`;


  let styleTurn = {};
  styleTurn.transform = `rotate(${rotationDown}deg) scale(0.466)`

  if ((singleFrame || (singleFrameTemp && chosenTab === "frame")) && !selectedDown) {
    styleTurn = {
      transform: `rotate(${rotationDown}deg) scale(0.35)`,
      marginRight: `${0.88 * scale}px`,
      marginBottom: `${0.88 * scale}px`
    }
  } else if (singleFrame && selectedDown) {
    styleTurn = {
      transform: `rotate(${rotationDown}deg) scale(0.35)`,
    }
  }


  const [{ isDragging }, drag] = useDrag(() => ({
    type: "icon",
    item: { image },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [image]);

  useEffect(() => {
    if (isDragging) {
      handleReset()
    }
    // eslint-disable-next-line
  }, [isDragging]);



  return (
    < img ref={drag} src={image.default} alt="ICON" className="slash_icon"
      style={visual ? { ...styleScale, ...styleTurn, filter: "grayscale(100%) invert(1) brightness(10) drop-shadow( 0 0 4px rgba(255, 255, 255, 1))" }
        : chosenColor.iconColor === "white" ? {
          ...styleScale, ...styleTurn, filter: "grayscale(100%) invert(1) brightness(10)",
          backgroundColor: backgroundColorWhileDragging
        }
          : { ...styleScale, ...styleTurn, filter: "grayscale(100%) brightness(0)" }}
      onClick={() => handleSelect()}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    />
  )
}

const mapStateToProps = state => ({
  chosenTab: state.frontEndData.tab,
  iconHolders: state.frontEndData.icon.iconHolders,
  iconHoldersRender: state.frontEndData.icon.iconHoldersRender,
  visual: state.frontEndData.visual.visual,
  scale: state.frontEndData.visual.scale,
  chosenModel: state.frontEndData.model.chosenModel,

  iconsBackEnd: state.backEndData.icons,
})
const mapDispatchToProps = dispatch => ({
  changeIconHolders: (income) => dispatch(actionsIcon.changeIconHolders(income)),
  isAnySelected: (income) => dispatch(actionsIcon.isAnySelected(income)),
  changeIconsBackEnd: (income) => dispatch(actionsBackEnd.changeIcons(income)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ReDragDown)