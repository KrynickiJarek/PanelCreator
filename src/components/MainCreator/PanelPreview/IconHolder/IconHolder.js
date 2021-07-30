import { useState, useEffect } from 'react';
import { connect } from "react-redux"
import { useDrop } from 'react-dnd';
import actionsIcon from "../../PanelEditor/IconEditor/duck/actions"
import actionsBackEnd from "../../duck/actions"

import "./IconHolder.scss"

import Slash from "../../../../assets/preview/slash.svg"
import Holder from "../../../../assets/preview/holder.svg"
import Remove from "../../../../assets/preview/remove.svg"

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

  iconsBackEnd,
  changeIconsBackEnd,

  rotationDot,
  rotationIcon,
  rotationDown,
  rotationUp,
  panelRotation,
  selectedDot,
  selected,
  selectedDown,
  selectedUp,
  singleFrame,
  singleFrameTemp,




  lastDroppedDot,
  lastDroppedIcon,
  lastDroppedSlashUp,
  lastDroppedSlashDown,
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

    function Modulo(num, denom) {
      if (num % denom >= 0) {
        return Math.abs(num % denom);
      }
      else {
        return num % denom + denom;
      }
    }

    const toDataURL = svg => fetch(svg)
      .then(response => response.blob())
      .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
      }))

    toDataURL(iconHolders[index].lastDroppedIcon.image.default)
      .then(svgBackEnd => {
        // console.log(svgBackEnd)
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

        let recordIcon = {
          number: numberBackEnd,
          type: 0,
          rotation: Modulo((iconHolders[index].rotationIcon), 360),
          svg: svgBackEnd
        }
        // const copyIconsBackEnd = iconsBackEnd.filter(element => { return !((element.number === index + 1) && (element.type === 0 || element.type === 1 || element.type === 2)) })
        const copyIconsBackEnd = iconsBackEnd.filter(element => { return !((element.number === numberBackEnd) && (element.type === 0 || element.type === 1 || element.type === 2)) })
        copyIconsBackEnd.push(recordIcon)
        changeIconsBackEnd(copyIconsBackEnd)
      })
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
  styleSignleFrameResize.transform = "scale(1)"


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
  else if (canDrop || (selected && chosenTab === "icons")) {
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
      }, 300);
      return () => clearTimeout(slashTimeout);
    }
  }, [isOverToShow]);


  useEffect(() => {
    setShow(false)
  }, [isOverToShow]);


  if (singleFrameTemp && chosenFrameShape === "sharp" && chosenTab === "frame" && !visual) {
    styleSignleFrame = {
      border: "2px solid rgb(32, 114, 30)",
      borderRadius: "0px",
    }
    styleSignleFrameResize = {
      transform: "scale(0.75)",
    }
  } else if (singleFrameTemp && chosenFrameShape === "round" && chosenTab === "frame" && !visual) {
    styleSignleFrame = {
      border: "2px solid rgb(32, 114, 30)",
      borderRadius: `${scale}px`,
    }
    styleSignleFrameResize = {
      transform: "scale(0.75)",
    }
  } else if ((!singleFrameTemp && chosenFrameShape === "round") || chosenTab !== "frame") {
    styleSignleFrame = {
      border: "2px solid transparent",
      borderRadius: `${scale}px`
    }
    styleSignleFrameResize = {
      transform: "scale(1)",
    }
  } else if ((!singleFrameTemp && chosenFrameShape === "sharp") || chosenTab !== "frame") {
    styleSignleFrame = {
      border: "2px solid transparent"
    }
    styleSignleFrameResize = {
      transform: "scale(1)",
    }
  }


  if (singleFrame) {
    styleSignleFrameResize = {
      transform: "scale(0.75)",
    }
  }

  let showNow = false
  if (isOverToShow && (lastDroppedSlashDown || lastDroppedSlashUp)) {
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
      <div ref={over} style={(!panelRotation) ? { height: "100%", width: "100%", position: "absolute" }
        : { height: "100%", width: "100%", position: "absolute", transform: "rotate(90deg)", transformOrigin: `center ${10.4 * scale}px`, transition: "0.4s ease" }}>
        <IconHolderStatus
          show={show}
          index={index}
          lastDroppedDot={lastDroppedDot}
          chosenColor={chosenColor}
          rotationDot={rotationDot}
          selectedDot={selectedDot}
          panelRotation={panelRotation}
        />
        <div style={styleZIndex}>

          <div className="icon_area_dropping_ani" style={{ ...styleDroppingAni, height: `${7.5 * scale}px`, width: `${7.5 * scale}px`, margin: `${6.65 * scale}px auto 0` }}>
            <div className="icon_area_dropping_pulse" style={styleDroppingPulse} />
          </div>
          <div className="icon_area_dropping" style={{ ...styleScale, ...styleDropping, margin: `${6.65 * scale}px auto 0` }} />
          <div ref={drop} className="icon_area" style={{ ...styleScale, ...styleArea, ...styleSignleFrame }} >
            <div className="icon_area" style={styleSignleFrameResize}>

              {(lastDroppedIcon) &&
                <ReDrag
                  image={lastDroppedIcon.image}
                  index={index}
                  chosenColor={chosenColor}
                  rotationIcon={rotationIcon}
                  panelRotation={panelRotation}
                />
              }
              {(!lastDroppedIcon && (show || showHolder)) &&
                (<img src={Holder} alt="holder" className="holder"
                  style={chosenColor.iconColor === "white" ? { ...styleScale, filter: "grayscale(100%) invert(1) brightness(10)" }
                    : { ...styleScale, filter: "grayscale(100%) brightness(0)" }}
                />)}
              {((lastDroppedSlashUp || lastDroppedSlashDown) && !show && !isActive) &&
                (<img src={Slash} alt="slash" className="slash"
                  style={visual ? { ...styleScale, filter: "grayscale(100%) invert(1) brightness(10) drop-shadow( 0 0 4px rgba(255, 255, 255, 1))" }
                    : chosenColor.iconColor === "white" ? { ...styleScale, filter: "grayscale(100%) invert(1) brightness(10)" }
                      : { ...styleScale, filter: "grayscale(100%) brightness(0)" }}
                />)}
              {(lastDroppedIcon && (upActive || downActive || isActive || removeIcons || (removeIcon && selected))) &&
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
          lastDroppedSlashUp={lastDroppedSlashUp}
          chosenColor={chosenColor}
          rotationUp={rotationUp}
          selectedUp={selectedUp}
          singleFrame={singleFrame}
          singleFrameTemp={singleFrameTemp}
          panelRotation={panelRotation}
        />

        <IconHolderSlashDown
          onDownActive={(income) => setDownActive(income)}
          show={show}
          showNow={showNow}
          warning={warning}
          index={index}
          lastDroppedSlashDown={lastDroppedSlashDown}
          chosenColor={chosenColor}
          rotationDown={rotationDown}
          selectedDown={selectedDown}
          singleFrame={singleFrame}
          singleFrameTemp={singleFrameTemp}
          panelRotation={panelRotation}
        />
      </div>
    </>
  );
}

const mapStateToProps = state => ({
  chosenTab: state.frontEndData.tab,
  chosenModel: state.frontEndData.model.chosenModel,
  iconHolders: state.frontEndData.icon.iconHolders,
  iconHoldersRender: state.frontEndData.icon.iconHoldersRender,
  visual: state.frontEndData.visual.visual,
  scale: state.frontEndData.visual.scale,
  animations: state.frontEndData.visual.animations,
  removeIcon: state.frontEndData.visual.removeIcon,
  removeIcons: state.frontEndData.visual.removeIcons,
  chosenFrameShape: state.frontEndData.frame.chosenFrameShape,

  iconsBackEnd: state.backEndData.icons,
})
const mapDispatchToProps = dispatch => ({
  changeIconHolders: (income) => dispatch(actionsIcon.changeIconHolders(income)),
  changeIconsBackEnd: (income) => dispatch(actionsBackEnd.changeIcons(income)),

})

export default connect(mapStateToProps, mapDispatchToProps)(IconHolder)



