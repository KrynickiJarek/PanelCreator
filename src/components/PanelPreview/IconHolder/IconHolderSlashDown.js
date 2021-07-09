import { useEffect } from 'react';
import { connect } from "react-redux"
import { useDrop } from 'react-dnd';
import "./IconHolderSlash.scss"


import DownHolder from "../../../assets/preview/downholder.svg"
import Remove from "../../../assets/preview/remove.svg"

import ReDragDown from './ReDrag/ReDragDown';


export const IconHolderSlashDown = ({
  lastDroppedSlashDown,
  onDropSlashDown,
  // chosenColor, 
  onDownActive,
  show,
  showNow,
  warning,
  onResetDown,
  scale,
  onSelectDown,
  selectedDown,
  animations,
  clear,
  rotateRight,
  rotateLeft,
  visual,
  // chosenTab, 
  showRemoveIcon,
  showRemoveIcons,
  singleFrame,
  singleFrameTemp,



  chosenColor,
  chosenTab,
}) => {


  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "icon",
    drop: onDropSlashDown,
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
  let styleHolder = {};
  let styleScale = {};
  styleScale.height = `${3.6 * scale}px`;
  styleScale.width = `${3.6 * scale}px`;
  let styleZIndex = {};

  if ((isActive && show) || (isActive && showNow)) {
    if (chosenColor.hex !== "#2fa32c") {
      styleDropping = {
        backgroundColor: "rgb(40, 167, 69)",
        // transform: "translate(52%, 125%) scale(1.8)",
        transform: "translate(52%, 125%) scale(1.8)",
      };
      if (animations) {
        styleDroppingPulse = {
          animation: "Ani 2s infinite",
          filter: "invert(34%) sepia(98%) saturate(353%) hue-rotate(70deg) brightness(87%) contrast(102%)"
        };
      };
    } else {
      styleDropping = {
        backgroundColor: "rgb(40, 167, 69)",
        transform: "translate(52%, 125%) scale(1.8)",
      };
      if (animations) {
        styleDroppingPulse = {
          animation: "Ani 2s infinite",
          filter: "invert(34%) sepia(98%) saturate(353%) hue-rotate(70deg) brightness(87%) contrast(102%)"
        };
      };
    };
    styleDroppingAni = {
      transform: "translate(52%, 125%) scale(2.2)",
    };
    styleArea = {
      transform: "translate(108%,108%) scale(1.8)",
    };
    styleHolder = {
      display: "block",
    };
    styleZIndex = {
      zIndex: "99",
    };
  }
  else if ((canDrop && show) || (canDrop && showNow)) {
    styleDroppingAni = {
      transform: "translate(52%, 125%) scale(1.25)",
    };
    styleDropping = {
      backgroundColor: "rgb(236, 105, 92)",
      transform: "translate(52%, 125%)",
    };
    styleArea = {
      transform: "translate(108%,108%)",
    };
    styleHolder = {
      display: "block",
    };
    if (animations) {
      styleDroppingPulse = {
        animation: "Ani 2s infinite",
      };
    };
  } else if (selectedDown && chosenTab === "icons") {
    styleDroppingAni = {
      transform: "translate(13%, 87%) scale(2.2)",
    };
    styleDropping = {
      backgroundColor: "rgb(236, 105, 92)",
      transform: "translate(13%, 87%) scale(1.8)",
    };
    styleArea = {
      transform: "translate(48%,48%) scale(1.8)",
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
  if (!lastDroppedSlashDown && !show && !showNow && !isActive) {
    styleArea = {
      // transform: "translate(35%,35%) scale(0.01)",
      transform: "translate(50%,50%) scale(0.01)",
    };
    styleDroppingAni = {
      // transform: "translate(-10%, 65%) scale(0.01)",
      transform: "translate(10%, 95%) scale(0.01)",
    };
    styleDropping = {
      // transform: "translate(-10%, 65%) scale(0.01)",
      transform: "translate(10%, 95%) scale(0.01)",
    };
  }



  useEffect(() => {
    if (isActive) {
      onDownActive(true)
    } else {
      onDownActive(false)
    }
  }, [isActive, onDownActive]);

  return (
    <div style={styleZIndex}>
      <div className="slash_down_area_dropping_ani" style={{ ...styleDroppingAni, height: `${5.625 * scale}px`, width: `${5.625 * scale}px`, margin: `${6.65 * scale}px auto 0` }}>
        <div className="slash_area_dropping_pulse" style={styleDroppingPulse} />
      </div>
      <div className="slash_down_area_dropping" style={{ ...styleDropping, height: `${5.625 * scale}px`, width: `${5.625 * scale}px`, margin: `${6.65 * scale}px auto 0` }} />
      <div ref={drop} className="slash_down_area" style={{ ...styleScale, ...styleArea, top: `${10.65 * scale}px` }} >
        {lastDroppedSlashDown &&
          <ReDragDown
            image={lastDroppedSlashDown.image} onResetDown={onResetDown} scale={scale} onSelectDown={onSelectDown} selectedDown={selectedDown}
            clear={clear} rotateRight={rotateRight} rotateLeft={rotateLeft} visual={visual} singleFrame={singleFrame} singleFrameTemp={singleFrameTemp}
          />
        }
        {!lastDroppedSlashDown &&
          (<img src={DownHolder} alt="downholder" className="slash_holder"
            style={chosenColor.iconColor === "white" ? { ...styleHolder, ...styleScale, filter: "grayscale(100%) invert(1) brightness(10)" }
              : { ...styleHolder, ...styleScale, filter: "grayscale(100%) brightness(0)" }}
          />)}
        {(lastDroppedSlashDown && (warning || isActive || showRemoveIcons || (showRemoveIcon && selectedDown))) &&
          (<img src={Remove} alt="remove" className="slash_remove" style={styleScale} />)}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  chosenColor: state.color,
  chosenTab: state.tab,
})


export default connect(mapStateToProps, {})(IconHolderSlashDown)
