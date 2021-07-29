import { connect } from "react-redux"
import { useDrop } from 'react-dnd';
import "./IconHolderStatus.scss"
import actionsIcon from "../../PanelEditor/IconEditor/duck/actions"
import actionsBackEnd from "../../duck/actions"

import Dot from "../../../../assets/preview/dot.svg"
import Remove from "../../../../assets/preview/remove.svg"

import ReDragDot from './ReDrag/ReDragDot';

const IconHolderStatus = ({
  show,
  scale,
  animations,
  visual,
  removeIcon,
  removeIcons,
  chosenColor,
  chosenTab,
  changeIconHolders,
  index,
  iconHolders,
  selectedDot,
  iconsBackEnd,
  changeIconsBackEnd,
  lastDroppedDot,
  rotationDot,
  panelRotation
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

    toDataURL(iconHolders[index].lastDroppedDot.image.default)
      .then(svgBackEnd => {
        let numberBackEnd = null
        if (panelRotation) {
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
          type: 3,
          rotation: Modulo((iconHolders[index].rotationDot), 360),
          svg: svgBackEnd
        }

        const copyIconsBackEnd = iconsBackEnd.filter(element => { return !((element.number === numberBackEnd) && (element.type === 3)) })
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
  let styleDot = {};
  styleDot.height = `${1 * scale}px`;
  styleDot.width = `${1 * scale}px`;
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
    if (panelRotation) {
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
  else if ((canDrop && lastDroppedDot) || (canDrop && show)) {
    styleDropping = {
      backgroundColor: "rgb(236, 105, 92)",
    };
    if (animations) {
      styleDroppingPulse = {
        animation: "Ani 2s infinite",
      };
    };
  }
  else if (canDrop && !lastDroppedDot) {
    styleDot = {
      filter: "invert(47%) sepia(92%) saturate(1130%) hue-rotate(326deg) brightness(100%) contrast(86%)",
      height: `${1 * scale}px`,
      width: `${1 * scale}px`,
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
  else if (selectedDot && chosenTab === "icons") {
    styleDropping = {
      backgroundColor: "rgb(236, 105, 92)",
      transform: "translateX(-50%) scale(3.2)",
    };

    if (panelRotation) {
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
    <div style={(!panelRotation) ?
      { ...styleZIndex, position: "relative" }
      : { ...styleZIndex, position: "relative", transform: "rotate(-90deg)", transformOrigin: `center ${9.4 * scale}px`, transition: "0.4s ease" }}>


      <div className="status_area_dropping_ani" style={{ ...styleDroppingAni, height: `${5.5 * scale}px`, width: `${5.5 * scale}px`, margin: `${-0.85 * scale}px auto 0` }}>
        <div className="status_area_dropping_pulse" style={styleDroppingPulse} />
      </div>
      <div className="status_area_dropping" style={{ ...styleScale, ...styleDropping, margin: `${0.65 * scale}px auto ${2.5 * scale}px` }} />
      <div ref={drop} className="status_area" style={(panelRotation) ?
        { transform: "rotate(90deg)", ...styleArea, height: `${3.8 * scale}px`, width: `${3.8 * scale}px`, margin: `${1 * scale}px auto ${1.85 * scale}px` }
        : { ...styleArea, height: `${3.8 * scale}px`, width: `${3.8 * scale}px`, margin: `${1 * scale}px auto ${1.85 * scale}px` }}>





        {lastDroppedDot
          ? <ReDragDot
            image={lastDroppedDot.image}
            index={index}
            chosenColor={chosenColor}
            rotationDot={rotationDot}
          />
          : (<img src={Dot} alt="dot" className="dot"
            style={visual ? { filter: "grayscale(100%) invert(1) brightness(10) drop-shadow( 0 0 3px rgba(255, 255, 255, 0.7))", ...styleDot }
              : chosenColor.iconColor === "white" ? { filter: "grayscale(100%) invert(1) brightness(10)", ...styleDot }
                : { filter: "grayscale(100%) brightness(0)", ...styleDot }} />)}
        {(lastDroppedDot && (isActive || removeIcons || (removeIcon && selectedDot))) &&
          (<img src={Remove} alt="remove" className="dot_remove" style={styleScale} />)}


      </div>
    </div>
  )
}


const mapStateToProps = state => ({
  chosenTab: state.frontEndData.tab,
  iconHolders: state.frontEndData.icon.iconHolders,
  iconHoldersRender: state.frontEndData.icon.iconHoldersRender,
  visual: state.frontEndData.visual.visual,
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

export default connect(mapStateToProps, mapDispatchToProps)(IconHolderStatus)






// import { connect } from "react-redux"
// import { useDrop } from 'react-dnd';
// import "./IconHolderStatus.scss"
// import actionsIcon from "../../PanelEditor/IconEditor/duck/actions"
// import actionsBackEnd from "../../duck/actions"

// import Dot from "../../../../assets/preview/dot.svg"
// import Remove from "../../../../assets/preview/remove.svg"

// import ReDragDot from './ReDrag/ReDragDot';

// const IconHolderStatus = ({
//   show,
//   scale,
//   animations,
//   visual,

//   removeIcon,
//   removeIcons,


//   chosenColor,
//   chosenModel,
//   chosenTab,
//   changeIconHolders,
//   index,
//   iconHolders,
//   selectedDot,


//   iconsBackEnd,
//   changeIconsBackEnd,
//   lastDroppedDot,
//   rotationDot,
//   panelRotation
// }) => {


//   const handleDrop = (item) => {
//     const copyArr = iconHolders
//     copyArr.forEach((el) => {
//       el.selectedDot = false;
//       el.selected = false;
//       el.selectedUp = false;
//       el.selectedDown = false;
//     })
//     copyArr[index].lastDroppedDot = item
//     changeIconHolders(copyArr)

//     // ----------------------------------------------------------------------------------------------------------------BACKEND---------------------
//     function Modulo(num, denom) {
//       if (num % denom >= 0) {
//         return Math.abs(num % denom);
//       }
//       else {
//         return num % denom + denom;
//       }
//     }

//     const toDataURL = svg => fetch(svg)
//       .then(response => response.blob())
//       .then(blob => new Promise((resolve, reject) => {
//         const reader = new FileReader()
//         reader.onloadend = () => resolve(reader.result)
//         reader.onerror = reject
//         reader.readAsDataURL(blob)
//       }))

//     toDataURL(iconHolders[index].lastDroppedDot.image.default)
//       .then(svgBackEnd => {
//         let numberBackEnd = null
//         if (chosenModel.panelRotation) {
//           if (index % 3 === 0) {
//             numberBackEnd = index + 3
//           } else if (index % 3 === 2) {
//             numberBackEnd = index - 1
//           } else {
//             numberBackEnd = index + 1
//           }
//         } else {
//           numberBackEnd = index + 1
//         }

//         let recordIcon = {
//           number: numberBackEnd,
//           type: 3,
//           rotation: Modulo((iconHolders[index].rotationDot), 360),
//           svg: svgBackEnd
//         }

//         // const copyIconsBackEnd = iconsBackEnd.filter(element => { return !((element.number === index + 1) && (element.type === 3)) })
//         const copyIconsBackEnd = iconsBackEnd.filter(element => { return !((element.number === numberBackEnd) && (element.type === 3)) })
//         copyIconsBackEnd.push(recordIcon)
//         changeIconsBackEnd(copyIconsBackEnd)
//       })
//     // ---------------------------------------------------------------------------------------------------------------/BACKEND---------------------
//   }

//   const [{ isOver, canDrop }, drop] = useDrop({
//     accept: "icon",
//     // drop: onDropDot,
//     drop: handleDrop,
//     collect: (monitor) => ({
//       isOver: monitor.isOver(),
//       canDrop: monitor.canDrop(),
//     }),
//   });

//   const isActive = isOver && canDrop;
//   let styleDropping = {};
//   let styleDroppingAni = {};
//   let styleDroppingPulse = {};
//   let styleArea = {};
//   let styleDot = {};
//   styleDot.height = `${1 * scale}px`;
//   styleDot.width = `${1 * scale}px`;
//   let styleScale = {};
//   styleScale.height = `${2.5 * scale}px`;
//   styleScale.width = `${2.5 * scale}px`;
//   let styleZIndex = {};

//   if (isActive) {
//     if (chosenColor.hex !== "#30a32c") {
//       styleDropping = {
//         backgroundColor: "rgb(40, 167, 69)",
//         transform: "translateX(-50%) scale(3.2)",
//       };
//       if (animations) {
//         styleDroppingPulse = {
//           animation: "Ani 2s infinite",
//           filter: "invert(34%) sepia(98%) saturate(353%) hue-rotate(70deg) brightness(87%) contrast(102%)",
//         };
//       };
//     } else {
//       styleDropping = {
//         backgroundColor: "rgb( 32, 114, 30)",
//         transform: "translateX(-50%) scale(3.2)",
//       };
//       if (animations) {
//         styleDroppingPulse = {
//           animation: "Ani 2s infinite",
//           filter: "invert(34%) sepia(98%) saturate(353%) hue-rotate(70deg) brightness(87%) contrast(102%)",
//         };
//       };
//     };
//     // if (chosenModel.panelRotaton) {
//     //   styleArea = {
//     //     transform: "scale(2.2) rotate(90deg)",
//     //   };
//     // } else {
//     styleArea = {
//       transform: "scale(2.2)",
//       // };
//     }
//     styleDroppingAni = {
//       transform: "translateX(-50%) scale(2)",
//     };
//     styleZIndex = {
//       zIndex: "99",
//     };
//   }
//   else if ((canDrop && lastDroppedDot) || (canDrop && show)) {
//     styleDropping = {
//       backgroundColor: "rgb(236, 105, 92)",
//     };
//     if (animations) {
//       styleDroppingPulse = {
//         animation: "Ani 2s infinite",
//       };
//     };
//   }
//   else if (canDrop && !lastDroppedDot) {
//     styleDot = {
//       filter: "invert(47%) sepia(92%) saturate(1130%) hue-rotate(326deg) brightness(100%) contrast(86%)",
//       height: `${1 * scale}px`,
//       width: `${1 * scale}px`,
//     };
//     styleDroppingAni = {
//       transform: "translateX(-50%) scale(0.6)",
//     };
//     if (animations) {
//       styleDroppingPulse = {
//         animation: "Ani 2s infinite",
//       };
//     };
//   }
//   else if (selectedDot && chosenTab === "icons") {
//     styleDropping = {
//       backgroundColor: "rgb(236, 105, 92)",
//       transform: "translateX(-50%) scale(3.2)",
//     };

//     // if (chosenModel.panelRotaton) {
//     //   styleArea = {
//     //     transform: "scale(2) rotate(90deg)",
//     //   };
//     // } else {
//     styleArea = {
//       transform: "scale(2)",
//       // };
//     }
//     styleDroppingAni = {
//       transform: "translateX(-50%) scale(2)",
//     };
//     styleZIndex = {
//       zIndex: "99",
//     };
//     if (animations) {
//       styleDroppingPulse = {
//         animation: "Ani 2s infinite",
//       };
//     };
//   }
//   console.log(chosenModel.panelRotation)


//   return (
//     // <div style={{ ...styleZIndex, position: "relative" }}>
//     <div style={(!chosenModel.panelRotaton) ?
//       { ...styleZIndex, position: "relative" }
//       : { ...styleZIndex, position: "relative", transform: "rotate(-90deg)", transformOrigin: `center ${9.4 * scale}px`, transition: "0.4s ease" }}>


//       <div className="status_area_dropping_ani" style={{ ...styleDroppingAni, height: `${5.5 * scale}px`, width: `${5.5 * scale}px`, margin: `${-0.85 * scale}px auto 0` }}>
//         <div className="status_area_dropping_pulse" style={styleDroppingPulse} />
//       </div>
//       <div className="status_area_dropping" style={{ ...styleScale, ...styleDropping, margin: `${0.65 * scale}px auto ${2.5 * scale}px` }} />
//       {/* <div ref={drop} className="status_area" style={(chosenModel.panelRotaton) ?
//         { transform: "rotate(90deg)", ...styleArea, height: `${3.8 * scale}px`, width: `${3.8 * scale}px`, margin: `${1 * scale}px auto ${1.85 * scale}px` }
//         : { ...styleArea, height: `${3.8 * scale}px`, width: `${3.8 * scale}px`, margin: `${1 * scale}px auto ${1.85 * scale}px` }}> */}



//       <div ref={drop} className="status_area" style={{ ...styleArea, height: `${3.8 * scale}px`, width: `${3.8 * scale}px`, margin: `${1 * scale}px auto ${1.85 * scale}px` }}>


//         {lastDroppedDot
//           ? <ReDragDot
//             image={lastDroppedDot.image}
//             index={index}
//             chosenColor={chosenColor}
//             rotationDot={rotationDot}
//             panelRotation={panelRotation}
//           />
//           : (<img src={Dot} alt="dot" className="dot"
//             style={visual ? { filter: "grayscale(100%) invert(1) brightness(10) drop-shadow( 0 0 3px rgba(255, 255, 255, 0.7))", ...styleDot }
//               : chosenColor.iconColor === "white" ? { filter: "grayscale(100%) invert(1) brightness(10)", ...styleDot }
//                 : { filter: "grayscale(100%) brightness(0)", ...styleDot }} />)}
//         {(lastDroppedDot && (isActive || removeIcons || (removeIcon && selectedDot))) &&
//           (<img src={Remove} alt="remove" className="dot_remove" style={styleScale} />)}


//       </div>
//     </div>
//   )
// }


// const mapStateToProps = state => ({
//   chosenTab: state.frontEndData.tab,
//   chosenModel: state.frontEndData.model.chosenModel,
//   iconHolders: state.frontEndData.icon.iconHolders,
//   iconHoldersRender: state.frontEndData.icon.iconHoldersRender,
//   visual: state.frontEndData.visual.visual,
//   scale: state.frontEndData.visual.scale,
//   animations: state.frontEndData.visual.animations,
//   removeIcon: state.frontEndData.visual.removeIcon,
//   removeIcons: state.frontEndData.visual.removeIcons,

//   iconsBackEnd: state.backEndData.icons,
// })
// const mapDispatchToProps = dispatch => ({
//   changeIconHolders: (income) => dispatch(actionsIcon.changeIconHolders(income)),
//   changeIconsBackEnd: (income) => dispatch(actionsBackEnd.changeIcons(income)),

// })

// export default connect(mapStateToProps, mapDispatchToProps)(IconHolderStatus)