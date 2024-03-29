import { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { connect } from "react-redux"
import actionsIcon from "../../../PanelEditor/IconEditor/duck/actions"
import actionsBackEnd from "../../../duck/actions"

import "./../IconHolderSlash.scss"


export const ReDragUp = ({
  image,
  scale,
  visual,
  chosenTab,
  chosenColor,
  iconHolders,
  index,
  changeIconHolders,
  isAnySelected,
  rotationUp,
  iconsBackEnd,
  changeIconsBackEnd,
  singleFrame,
  singleFrameTemp,
  selectedUp,
  chosenModel,
  splitIconProportions,
  canDrop
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
          el.selectedDown = false;
        } else {
          el.selectedDot = false;
          el.selected = false;
          el.selectedUp = false;
          el.selectedDown = false;
        }
      })
      if (copyArr[index].selectedUp) {
        copyArr[index].selectedUp = false
        isAnySelected(false)
      } else {
        copyArr[index].selectedUp = true
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
    copyArr[index].lastDroppedSlashUp = null
    copyArr[index].rotationUp = 0
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
    const copyIconsBackEnd = iconsBackEnd.filter(element => { return !((element.number === numberBackEnd) && (element.type === 1)) })
    changeIconsBackEnd(copyIconsBackEnd)
    // ---------------------------------------------------------------------------------------------------------------/BACKEND---------------------
  }

  let styleScale = {};
  styleScale.height = `${7.5 * scale}px`;
  styleScale.width = `${7.5 * scale}px`;
  styleScale.transform = `scale(0.466)`

  let styleTurn = {};
  // styleTurn.transform = `rotate(${rotationUp}deg) scale(0.466)`

  if (selectedUp) {
    if (splitIconProportions === 0 || canDrop) {
      styleTurn.transform = `rotate(${rotationUp}deg) scale(0.466)`
    } else if (splitIconProportions === 1 && !canDrop) {
      styleTurn.transform = `rotate(${rotationUp}deg) scale(0.652)`
    } else if (splitIconProportions === 2 && !canDrop) {
      styleTurn.transform = `rotate(${rotationUp}deg) scale(0.332)`
    }
  } else {
    if (splitIconProportions === 0 || canDrop) {
      styleTurn.transform = `rotate(${rotationUp}deg) scale(0.466)`
    } else if (splitIconProportions === 1 && !canDrop) {
      styleTurn.transform = `translate(${0.5 * scale}px, ${0.75 * scale}px) rotate(${rotationUp}deg) scale(0.652)`
    } else if (splitIconProportions === 2 && !canDrop) {
      styleTurn.transform = `translate(-${0.675 * scale}px, -${0.5 * scale}px) rotate(${rotationUp}deg) scale(0.332)`
    }
  }


  if ((singleFrame || (singleFrameTemp && chosenTab === "frame")) && !selectedUp) {
    styleTurn = {
      transform: `rotate(${rotationUp}deg) scale(0.35)`,
      marginLeft: `${0.88 * scale}px`,
      marginTop: `${0.88 * scale}px`
    }
  } else if (singleFrame && selectedUp) {
    styleTurn = {
      transform: `rotate(${rotationUp}deg) scale(0.35)`,

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
      onMouseUp={handleMouseUp} />
  )
}

const mapStateToProps = state => ({
  chosenTab: state.frontEndData.tab.tab,
  iconHolders: state.frontEndData.icon.iconHolders,
  iconHoldersRender: state.frontEndData.icon.iconHoldersRender,
  scale: state.frontEndData.visual.scale,
  chosenModel: state.frontEndData.model.chosenModel,

  iconsBackEnd: state.backEndData.icons,
})
const mapDispatchToProps = dispatch => ({
  changeIconHolders: (income) => dispatch(actionsIcon.changeIconHolders(income)),
  isAnySelected: (income) => dispatch(actionsIcon.isAnySelected(income)),
  changeIconsBackEnd: (income) => dispatch(actionsBackEnd.changeIcons(income)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ReDragUp)