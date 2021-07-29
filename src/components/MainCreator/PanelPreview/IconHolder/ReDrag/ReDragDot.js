import { useState, useEffect } from 'react';
import { connect } from "react-redux"
import { useDrag } from 'react-dnd';
import actionsIcon from "../../../PanelEditor/IconEditor/duck/actions"
import actionsBackEnd from "../../../duck/actions"

import "./../IconHolderStatus.scss"



const ReDragDot = ({
  image,
  scale,
  visual,
  chosenTab,
  chosenColor,
  iconHolders,
  index,
  changeIconHolders,
  isAnySelected,
  rotationDot,
  chosenModel,
  iconsBackEnd,
  changeIconsBackEnd,
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
          el.selected = false;
          el.selectedUp = false;
          el.selectedDown = false;
        } else {
          el.selectedDot = false;
          el.selected = false;
          el.selectedUp = false;
          el.selectedDown = false;
        }
      })
      if (copyArr[index].selectedDot) {
        copyArr[index].selectedDot = false
        isAnySelected(false)
      } else {
        copyArr[index].selectedDot = true
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
    copyArr[index].lastDroppedDot = null
    copyArr[index].rotationDot = 0
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
    const copyIconsBackEnd = iconsBackEnd.filter(element => { return !((element.number === numberBackEnd) && (element.type === 3)) })
    changeIconsBackEnd(copyIconsBackEnd)
    // ---------------------------------------------------------------------------------------------------------------/BACKEND---------------------
  }


  let styleScale = {};
  styleScale.height = `${7.5 * scale}px`;
  styleScale.width = `${7.5 * scale}px`;


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
    < img ref={drag} src={image.default} alt="ICON" className="status_icon"
      style={visual ? { ...styleScale, transform: `rotate(${rotationDot}deg) scale(0.333)`, filter: "grayscale(100%) invert(1) brightness(10) drop-shadow( 0 0 4px rgba(255, 255, 255, 1))" }
        : chosenColor.iconColor === "white" ? {
          ...styleScale, transform: `rotate(${rotationDot}deg) scale(0.333)`, filter: "grayscale(100%) invert(1) brightness(10)",
          backgroundColor: backgroundColorWhileDragging
        }
          : { ...styleScale, transform: `rotate(${rotationDot}deg) scale(0.333)`, filter: "grayscale(100%) brightness(0)" }}
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

export default connect(mapStateToProps, mapDispatchToProps)(ReDragDot)