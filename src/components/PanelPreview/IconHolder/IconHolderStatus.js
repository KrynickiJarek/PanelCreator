import { connect } from "react-redux"
import { useDrop } from 'react-dnd';
import "./IconHolderStatus.scss"
import actionsIcon from "../../PanelEditor/IconEditor/duck/actions"


import Dot from "../../../assets/preview/dot.svg"
import Remove from "../../../assets/preview/remove.svg"

import ReDragDot from './ReDrag/ReDragDot';

const IconHolderStatus = ({
  show,
  scale,
  animations,
  visual,

  removeIcon,
  removeIcons,


  chosenColor,
  chosenModel,
  chosenTab,
  changeIconHolders,
  index,
  iconHolders,



}) => {

  const handleDrop = (item) => {
    const copyArr = iconHolders
    copyArr.forEach((el) => {
      el.selectedDot = false;
      el.selected = false;
      el.selectedUp = false;
      el.selectedDown = false;
    })
    copyArr[index].lastDroppedDot = item
    changeIconHolders(copyArr)
  }

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "icon",
    // drop: onDropDot,
    drop: handleDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;
  let styleDropping = {};
  let styleDroppingAni = {};
  let styleDroppingPulse = {};
  let styleArea = {};
  let styleDot = {};
  styleDot.height = `${1 * scale}px`; //było 1.25
  styleDot.width = `${1 * scale}px`; //było 1.25
  let styleScale = {};
  styleScale.height = `${2.5 * scale}px`;
  styleScale.width = `${2.5 * scale}px`;
  let styleZIndex = {};

  if (isActive) {
    if (chosenColor.hex !== "#30a32c") {
      styleDropping = {
        backgroundColor: "rgb(40, 167, 69)",
        transform: "translateX(-50%) scale(3.2)",
      };
      if (animations) {
        styleDroppingPulse = {
          animation: "Ani 2s infinite",
          filter: "invert(34%) sepia(98%) saturate(353%) hue-rotate(70deg) brightness(87%) contrast(102%)",
        };
      };
    } else {
      styleDropping = {
        backgroundColor: "rgb( 32, 114, 30)",
        transform: "translateX(-50%) scale(3.2)",
      };
      if (animations) {
        styleDroppingPulse = {
          animation: "Ani 2s infinite",
          filter: "invert(34%) sepia(98%) saturate(353%) hue-rotate(70deg) brightness(87%) contrast(102%)",
        };
      };
    };
    if (chosenModel.type === "MDOT-18 poziomy") {
      styleArea = {
        transform: "scale(2.2) rotate(90deg)",
      };
    } else {
      styleArea = {
        transform: "scale(2.2)",
      };
    }
    styleDroppingAni = {
      transform: "translateX(-50%) scale(2)",
    };
    styleZIndex = {
      zIndex: "99",
    };
  }
  else if ((canDrop && iconHolders[index].lastDroppedDot) || (canDrop && show)) {
    styleDropping = {
      backgroundColor: "rgb(236, 105, 92)",
    };
    if (animations) {
      styleDroppingPulse = {
        animation: "Ani 2s infinite",
      };
    };
  }
  else if (canDrop && !iconHolders[index].lastDroppedDot) {
    styleDot = {
      filter: "invert(47%) sepia(92%) saturate(1130%) hue-rotate(326deg) brightness(100%) contrast(86%)",
      height: `${1 * scale}px`,//było 1.25? sprawdź jakby co
      width: `${1 * scale}px`,//było 1.25?
    };
    styleDroppingAni = {
      transform: "translateX(-50%) scale(0.6)",
    };
    if (animations) {
      styleDroppingPulse = {
        animation: "Ani 2s infinite",
      };
    };
  }
  else if (iconHolders[index].selectedDot && chosenTab === "icons") {
    styleDropping = {
      backgroundColor: "rgb(236, 105, 92)",
      transform: "translateX(-50%) scale(3.2)",
    };

    if (chosenModel.type === "MDOT-18 poziomy") {
      styleArea = {
        transform: "scale(2) rotate(90deg)",
      };
    } else {
      styleArea = {
        transform: "scale(2)",
      };
    }
    styleDroppingAni = {
      transform: "translateX(-50%) scale(2)",
    };
    styleZIndex = {
      zIndex: "99",
    };
    if (animations) {
      styleDroppingPulse = {
        animation: "Ani 2s infinite",
      };
    };
  }

  return (
    <div style={(chosenModel.type !== "MDOT-18 poziomy") ?
      { ...styleZIndex, position: "relative" }
      : { ...styleZIndex, position: "relative", transform: "rotate(-90deg)", transformOrigin: `center ${9.4 * scale}px`, transition: "0.4s ease" }}>
      <div className="status_area_dropping_ani" style={{ ...styleDroppingAni, height: `${5.5 * scale}px`, width: `${5.5 * scale}px`, margin: `${-0.85 * scale}px auto 0` }}>
        <div className="status_area_dropping_pulse" style={styleDroppingPulse} />
      </div>
      <div className="status_area_dropping" style={{ ...styleScale, ...styleDropping, margin: `${0.65 * scale}px auto ${2.5 * scale}px` }} />
      <div ref={drop} className="status_area" style={(chosenModel.type === "MDOT-18 poziomy") ?
        { transform: "rotate(90deg)", ...styleArea, height: `${3.8 * scale}px`, width: `${3.8 * scale}px`, margin: `${1 * scale}px auto ${1.85 * scale}px` }
        : { ...styleArea, height: `${3.8 * scale}px`, width: `${3.8 * scale}px`, margin: `${1 * scale}px auto ${1.85 * scale}px` }}>

        {/* <div style={{ transform: "scale(1)" }}> */}

        {iconHolders[index].lastDroppedDot
          ? <ReDragDot
            image={iconHolders[index].lastDroppedDot.image}
            index={index} />
          : (<img src={Dot} alt="dot" className="dot"
            style={visual ? { filter: "grayscale(100%) invert(1) brightness(10) drop-shadow( 0 0 3px rgba(255, 255, 255, 0.7))", ...styleDot }
              : chosenColor.iconColor === "white" ? { filter: "grayscale(100%) invert(1) brightness(10)", ...styleDot }
                : { filter: "grayscale(100%) brightness(0)", ...styleDot }} />)}
        {(iconHolders[index].lastDroppedDot && (isActive || removeIcons || (removeIcon && iconHolders[index].selectedDot))) &&
          (<img src={Remove} alt="remove" className="dot_remove" style={styleScale} />)}
        {/* </div> */}


      </div>
    </div>
  )
}


const mapStateToProps = state => ({
  chosenColor: state.color,
  chosenTab: state.tab,
  chosenModel: state.model,
  iconHolders: state.icon.iconHolders,
  iconHoldersRender: state.icon.iconHoldersRender,
  visual: state.visual.visual,
  scale: state.visual.scale,
  animations: state.visual.animations,
  removeIcon: state.visual.removeIcon,
  removeIcons: state.visual.removeIcons,
})
const mapDispatchToProps = dispatch => ({
  changeIconHolders: (income) => dispatch(actionsIcon.changeIconHolders(income)),
})

export default connect(mapStateToProps, mapDispatchToProps)(IconHolderStatus)