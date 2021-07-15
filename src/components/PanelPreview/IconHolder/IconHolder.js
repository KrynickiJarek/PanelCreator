import { useState, useEffect } from 'react';
import { connect } from "react-redux"
import { useDrop } from 'react-dnd';
import actionsIcon from "../../PanelEditor/IconEditor/duck/actions"

import "./IconHolder.scss"

import Slash from "../../../assets/preview/slash.svg"
import Holder from "../../../assets/preview/holder.svg"
import Remove from "../../../assets/preview/remove.svg"

import IconHolderStatus from './IconHolderStatus';
import IconHolderSlashUp from './IconHolderSlashUp';
import IconHolderSlashDown from './IconHolderSlashDown';

import ReDrag from './ReDrag/ReDrag';



const IconHolder = ({
  scale,
  animations,
  visual,
  removeIcon,
  removeIcons,
  chosenFrameShape,
  chosenColor,
  chosenTab,
  chosenModel,
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
    copyArr[index].lastDroppedIcon = item
    copyArr[index].lastDroppedSlashDown = null
    copyArr[index].lastDroppedSlashUp = null
    changeIconHolders(copyArr)
  }

  let warning = false
  const [show, setShow] = useState(false);
  const [showHolder, setShowHolder] = useState(false);

  const [upActive, setUpActive] = useState(false);
  const [downActive, setDownActive] = useState(false);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "icon",
    drop: handleDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  useEffect(() => {
    if (canDrop) {
      const copyArr = iconHolders
      copyArr.forEach((el) => {
        el.selectedDot = false;
        el.selected = false;
        el.selectedUp = false;
        el.selectedDown = false;
      })
      changeIconHolders(copyArr)
    }
  }, [canDrop, changeIconHolders, iconHolders]);



  const isActive = isOver && canDrop;
  let styleDropping = {};
  let styleDroppingAni = {};
  let styleDroppingPulse = {};
  let styleArea = {};
  let styleScale = {};
  styleScale.height = `${7.5 * scale}px`;
  styleScale.width = `${7.5 * scale}px`;
  let styleZIndex = {};
  let styleSignleFrame = {};
  let styleSignleFrameResize = {};
  styleSignleFrameResize.transform = "scale(1)";


  if (isActive) {
    if (chosenColor.hex !== "#30a32c") {
      styleDropping = {
        backgroundColor: "rgb(40, 167, 69)",
        transform: "translateX(-50%) scale(2)",
      };
      if (animations) {
        styleDroppingPulse = {
          animation: "Ani 2s infinite",
          filter: "invert(34%) sepia(98%) saturate(353%) hue-rotate(70deg) brightness(87%) contrast(102%)"
        };
      }
    } else {
      styleDropping = {
        backgroundColor: "rgb( 32, 114, 30)",
        transform: "translateX(-50%) scale(2)",
      };
      if (animations) {
        styleDroppingPulse = {
          animation: "Ani 2s infinite",
          filter: "invert(34%) sepia(98%) saturate(353%) hue-rotate(70deg) brightness(87%) contrast(102%)"
        };
      }
    };
    styleArea = {
      transform: "scale(1.3)",
    };

    styleDroppingAni = {
      transform: "translateX(-50%) scale(2.25)",
    }
    styleZIndex = {
      zIndex: "99",
    };
    warning = true;
  }
  else if (canDrop || (iconHolders[index].selected && chosenTab === "icons")) {
    styleDropping = {
      backgroundColor: "rgb(236, 105, 92)",
      transform: "translateX(-50%) scale(1.45)",
    };
    styleDroppingAni = {
      transform: "translateX(-50%) scale(1.75)",
    }
    if (animations) {
      styleDroppingPulse = {
        animation: "Ani 2s infinite",
      };
    }
  }

  const [{ isOverToShow }, over] = useDrop({
    accept: "icon",
    drop: null,
    collect: (monitor) => ({
      isOverToShow: monitor.isOver(),
    }),
  });

  useEffect(() => {
    if (isOverToShow) {
      const slashTimeout = setTimeout(() => {
        setShow(true)
      }, 300); //było 400
      return () => clearTimeout(slashTimeout);
    }
  }, [isOverToShow]);


  useEffect(() => {
    setShow(false)
  }, [isOverToShow]);


  if (iconHolders[index].singleFrameTemp && chosenFrameShape === "sharp" && chosenTab === "frame" && !visual) {
    styleSignleFrame = {
      border: "2px solid rgb(32, 114, 30)",
      borderRadius: "0px",
    }
    styleSignleFrameResize = {
      transform: "scale(0.75)",
    }
  } else if (iconHolders[index].singleFrameTemp && chosenFrameShape === "round" && chosenTab === "frame" && !visual) {
    styleSignleFrame = {
      border: "2px solid rgb(32, 114, 30)",
      borderRadius: `${scale}px`,
    }
    styleSignleFrameResize = {
      transform: "scale(0.75)",
    }
  } else if ((!iconHolders[index].singleFrameTemp && chosenFrameShape === "round") || chosenTab !== "frame") { //??
    styleSignleFrame = {
      border: "2px solid transparent",
      borderRadius: `${scale}px`
    }
    styleSignleFrameResize = {
      transform: "scale(1)",
    }
  } else if ((!iconHolders[index].singleFrameTemp && chosenFrameShape === "sharp") || chosenTab !== "frame") { //??
    styleSignleFrame = {
      border: "2px solid transparent"
    }
    styleSignleFrameResize = {
      transform: "scale(1)",
    }
  }


  if (iconHolders[index].singleFrame) {
    styleSignleFrameResize = {
      transform: "scale(0.75)",
    }
  }

  let showNow = false
  if (isOverToShow && (iconHolders[index].lastDroppedSlashDown || iconHolders[index].lastDroppedSlashUp)) {
    showNow = true
  }



  useEffect(() => {
    if (isActive) {
      const holderTimeout = setTimeout(() => {
        setShowHolder(true)
      }, 200);
      return () => clearTimeout(holderTimeout);
    }
  }, [isActive]);

  useEffect(() => {
    setShowHolder(false)
  }, [isActive]);


  return (
    <>
      <div ref={over} style={(chosenModel.type !== "MDOT-18 poziomy") ? { height: "100%", width: "100%", position: "absolute" }
        : { height: "100%", width: "100%", position: "absolute", transform: "rotate(90deg)", transformOrigin: `center ${10.4 * scale}px`, transition: "0.4s ease" }}>
        <IconHolderStatus
          show={show}
          index={index}
        />
        <div style={styleZIndex}>

          <div className="icon_area_dropping_ani" style={{ ...styleDroppingAni, height: `${7.5 * scale}px`, width: `${7.5 * scale}px`, margin: `${6.65 * scale}px auto 0` }}>
            <div className="icon_area_dropping_pulse" style={styleDroppingPulse} />
          </div>
          <div className="icon_area_dropping" style={{ ...styleScale, ...styleDropping, margin: `${6.65 * scale}px auto 0` }} />
          <div ref={drop} className="icon_area" style={{ ...styleScale, ...styleArea, ...styleSignleFrame }} >
            <div className="icon_area" style={styleSignleFrameResize}>

              {(iconHolders[index].lastDroppedIcon) &&
                <ReDrag
                  image={iconHolders[index].lastDroppedIcon.image}
                  index={index} />
              }
              {(!iconHolders[index].lastDroppedIcon && (show || showHolder)) &&
                (<img src={Holder} alt="holder" className="holder"
                  style={chosenColor.iconColor === "white" ? { ...styleScale, filter: "grayscale(100%) invert(1) brightness(10)" }
                    : { ...styleScale, filter: "grayscale(100%) brightness(0)" }}
                />)}
              {((iconHolders[index].lastDroppedSlashUp || iconHolders[index].lastDroppedSlashDown) && !show && !isActive) &&
                (<img src={Slash} alt="slash" className="slash"
                  style={visual ? { ...styleScale, filter: "grayscale(100%) invert(1) brightness(10) drop-shadow( 0 0 4px rgba(255, 255, 255, 1))" }
                    : chosenColor.iconColor === "white" ? { ...styleScale, filter: "grayscale(100%) invert(1) brightness(10)" }
                      : { ...styleScale, filter: "grayscale(100%) brightness(0)" }}
                />)}
              {(iconHolders[index].lastDroppedIcon && (upActive || downActive || isActive || removeIcons || (removeIcon && iconHolders[index].selected))) &&
                (<img src={Remove} alt="remove" className="remove" style={styleScale} />)}

            </div>
          </div>
        </div>

        <IconHolderSlashUp
          onUpActive={(income) => setUpActive(income)}
          show={show}
          showNow={showNow}
          warning={warning}
          index={index}
        />

        <IconHolderSlashDown
          onDownActive={(income) => setDownActive(income)}
          show={show}
          showNow={showNow}
          warning={warning}
          index={index}
        />
      </div>
    </>
  );
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
  chosenFrameShape: state.frame.chosenFrameShape,

})
const mapDispatchToProps = dispatch => ({
  changeIconHolders: (income) => dispatch(actionsIcon.changeIconHolders(income)),
})

export default connect(mapStateToProps, mapDispatchToProps)(IconHolder)



