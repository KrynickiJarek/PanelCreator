import { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { connect } from "react-redux"
import actionsIcon from "../../../PanelEditor/IconEditor/duck/actions"

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
}) => {

  const [backgroundColorWhileDragging, setBackgroundColorWhileDragging] = useState("transparent")

  const handleMouseDown = () => {
    setBackgroundColorWhileDragging("rgba(255,255,255,0.33)")
  }

  const handleMouseUp = () => {
    setBackgroundColorWhileDragging("transparent")
  }

  const handleSelect = () => {
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
  }

  let styleScale = {};
  styleScale.height = `${7.5 * scale}px`;
  styleScale.width = `${7.5 * scale}px`;

  let styleTurn = {};
  styleTurn.transform = `rotate(${iconHolders[index].rotationUp}deg) scale(0.466)`
  // styleTurn.transform = `rotate(${iconHolders[index].rotationUp}deg) rotateY(180deg)  translate(150%,-150%) scale(-1,1)`;
  // styleTurn.transformOrigin = "-100% -100%";
  // transform: `rotate(${iconHolders[index].rotationDot}deg) rotateY(180deg)  translate(150%,-150%) scale(-1,1)`,


  if ((iconHolders[index].singleFrame || (iconHolders[index].singleFrameTemp && chosenTab === "frame")) && !iconHolders[index].selectedUp) {
    styleTurn = {
      transform: `rotate(${iconHolders[index].rotationUp}deg) scale(0.35)`,
      marginLeft: `${0.88 * scale}px`,
      marginTop: `${0.88 * scale}px`
    }
  } else if (iconHolders[index].singleFrame && iconHolders[index].selectedUp) {
    styleTurn = {
      transform: `rotate(${iconHolders[index].rotationUp}deg) scale(0.35)`,
      // transform: `rotate(${iconHolders[index].rotationUp}deg) rotateY(180deg)  translate(150%,-150%) scale(-1,1)`

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
    < img ref={drag} src={iconHolders[index].lastDroppedSlashUp.image.default} alt="ICON" className="slash_icon"
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
  chosenColor: state.color,
  chosenTab: state.tab,
  iconHolders: state.icon.iconHolders,
  iconHoldersRender: state.icon.iconHoldersRender,
  visual: state.visual.visual,
  scale: state.visual.scale,
  // overFrameRender: state.frame.overFrameRender,
})
const mapDispatchToProps = dispatch => ({
  changeIconHolders: (income) => dispatch(actionsIcon.changeIconHolders(income)),
  isAnySelected: (income) => dispatch(actionsIcon.isAnySelected(income)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ReDragUp)