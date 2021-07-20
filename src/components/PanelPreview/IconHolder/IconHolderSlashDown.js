import { useEffect } from 'react';
import { connect } from "react-redux"
import { useDrop } from 'react-dnd';
import actionsIcon from "../../PanelEditor/IconEditor/duck/actions"
import actionsBackEnd from "../../../components/duck/actions"
import "./IconHolderSlash.scss"

import DownHolder from "../../../assets/preview/downholder.svg"
import Remove from "../../../assets/preview/remove.svg"

import ReDragDown from './ReDrag/ReDragDown';


export const IconHolderSlashDown = ({
  onDownActive,
  show,
  showNow,
  warning,
  scale,
  animations,
  removeIcon,
  removeIcons,
  chosenColor,
  chosenModel,
  chosenTab,
  changeIconHolders,
  index,
  iconHolders,

  iconsBackEnd,
  changeIconsBackEnd
}) => {


  const handleDrop = (item) => {
    const copyArr = iconHolders
    copyArr.forEach((el) => {
      el.selectedDot = false;
      el.selected = false;
      el.selectedUp = false;
      el.selectedDown = false;
    })
    copyArr[index].lastDroppedSlashDown = item
    copyArr[index].lastDroppedIcon = null
    changeIconHolders(copyArr)
    // ----------------------------------------------------------------------------------------------------------------BACKEND---------------------
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

    toDataURL(iconHolders[index].lastDroppedSlashDown.image.default)
      .then(svgBackEnd => {
        console.log('RESULT:', svgBackEnd)


        let recordIcon = {
          number: index + 1,
          type: 2,
          rotation: Modulo((iconHolders[index].rotationDown + chosenModel.panelRotation), 360),
          svg: svgBackEnd
        }
        const copyIconsBackEnd = iconsBackEnd.filter(element => { return !((element.number === index + 1) && (element.type === 0 || element.type === 2)) })
        copyIconsBackEnd.push(recordIcon)
        changeIconsBackEnd(copyIconsBackEnd)
      })
    // ---------------------------------------------------------------------------------------------------------------/BACKEND---------------------

  }



  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "icon",
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
  let styleHolder = {};
  let styleScale = {};
  styleScale.height = `${3.6 * scale}px`;
  styleScale.width = `${3.6 * scale}px`;
  let styleZIndex = {};

  if ((isActive && show) || (isActive && showNow)) {
    if (chosenColor.hex !== "#30a32c") {
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
  } else if (iconHolders[index].selectedDown && chosenTab === "icons") {
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
  if (!iconHolders[index].lastDroppedSlashDown && !show && !showNow && !isActive) {
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



        {iconHolders[index].lastDroppedSlashDown &&
          <ReDragDown
            image={iconHolders[index].lastDroppedSlashDown.image}


            index={index}
          />
        }
        {!iconHolders[index].lastDroppedSlashDown &&
          (<img src={DownHolder} alt="downholder" className="slash_holder"
            style={chosenColor.iconColor === "white" ? { ...styleHolder, ...styleScale, filter: "grayscale(100%) invert(1) brightness(10)" }
              : { ...styleHolder, ...styleScale, filter: "grayscale(100%) brightness(0)" }}
          />)}
        {(iconHolders[index].lastDroppedSlashDown && (warning || isActive || removeIcons || (removeIcon && iconHolders[index].selectedDown))) &&
          (<img src={Remove} alt="remove" className="slash_remove" style={styleScale} />)}

      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  chosenColor: state.frontEndData.color,
  chosenTab: state.frontEndData.tab,
  chosenModel: state.frontEndData.model,
  iconHolders: state.frontEndData.icon.iconHolders,
  iconHoldersRender: state.frontEndData.icon.iconHoldersRender,
  scale: state.frontEndData.visual.scale,
  animations: state.frontEndData.visual.animations,
  removeIcon: state.frontEndData.visual.removeIcon,
  removeIcons: state.frontEndData.visual.removeIcons,

  iconsBackEnd: state.backEndData.icons,
})
const mapDispatchToProps = dispatch => ({
  changeIconHolders: (income) => dispatch(actionsIcon.changeIconHolders(income)),
  changeIconsBackEnd: (income) => dispatch(actionsBackEnd.changeIcons(income)),

})

export default connect(mapStateToProps, mapDispatchToProps)(IconHolderSlashDown)
