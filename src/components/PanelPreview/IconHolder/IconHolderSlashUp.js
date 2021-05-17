import { memo, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import "./IconHolderSlash.scss"
import "./IconHolderSlash.scss"

import UpHolder from "../../../assets/preview/upholder.svg"
import Remove from "../../../assets/preview/remove.svg"

import { ReDragUp } from './ReDrag/ReDragUp';



export const IconHolderSlashUp = memo(function IconHolderSlashUp({ lastDroppedSlashUp, onDropSlashUp, chosenColor, onUpActive, show, showNow,
    warning, onResetUp, scale, onSelectUp, selectedUp, animations, clear, rotateRight, rotateLeft, visual, chosenTab }) {


    const [{ isOver, canDrop }, drop] = useDrop({
        accept: "icon",
        drop: onDropSlashUp,
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
                transform: "translate(-152%, -90%) scale(1.8)",
            };
            if (animations) {
                styleDroppingPulse = {
                    animation: "Ani 2s infinite",
                    filter: "invert(34%) sepia(98%) saturate(353%) hue-rotate(70deg) brightness(87%) contrast(102%)"
                };
            };
        } else {
            styleDropping = {
                backgroundColor: "rgb( 32, 114, 30)",
                transform: "translate(-152%, -90%) scale(1.8)",
            };
            if (animations) {
                styleDroppingPulse = {
                    animation: "Ani 2s infinite",
                    filter: "invert(34%) sepia(98%) saturate(353%) hue-rotate(70deg) brightness(87%) contrast(102%)"
                };
            };
        };
        styleDroppingAni = {
            transform: "translate(-152%, -90%) scale(2.2)",
        };
        styleArea = {
            transform: "translate(-110%,-110%) scale(1.8)",
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
            transform: "translate(-152%, -90%) scale(1.25)",
        };
        styleDropping = {
            backgroundColor: "rgb(236, 105, 92)",
            transform: "translate(-152%, -90%)",
        };
        styleArea = {
            transform: "translate(-110%,-110%)",
        };
        styleHolder = {
            display: "block",
        };
        if (animations) {
            styleDroppingPulse = {
                animation: "Ani 2s infinite",
            };
        };
    } else if (selectedUp && chosenTab === "icons") {
        styleDroppingAni = {
            transform: "translate(-116.666%, -53.333%) scale(2.2)",
        };
        styleDropping = {
            backgroundColor: "rgb(236, 105, 92)",
            transform: "translate(-116.666%, -53.333%) scale(1.8)",
        };
        styleArea = {
            transform: "translate(-55%,-55%) scale(1.8)",
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
    if (!lastDroppedSlashUp && !show && !showNow && !isActive) {
        styleArea = {
            // transform: "translate(-35%,-35%) scale(0.01)",
            transform: "translate(-50%,-50%) scale(0.01)",
        };
        styleDroppingAni = {
            // transform: "translate(-106.666%, -40%) scale(0.01)",
            transform: "translate(-116.666%, -50%) scale(0.01)",
        };
        styleDropping = {
            // transform: "translate(-106.666%, -40%) scale(0.01)",
            transform: "translate(-116.666%, -50%) scale(0.01)",
        };
    }

    useEffect(() => {
        if (isActive) {
            onUpActive(true)
        } else {
            onUpActive(false)
        }
    }, [isActive, onUpActive]);

    return (
        <div style={styleZIndex}>
            <div className="slash_up_area_dropping_ani" style={{ ...styleDroppingAni, height: `${5.625 * scale}px`, width: `${5.625 * scale}px`, margin: `${6.65 * scale}px auto 0` }}>
                <div className="slash_area_dropping_pulse" style={styleDroppingPulse} />
            </div>
            <div className="slash_up_area_dropping" style={{ ...styleDropping, height: `${5.625 * scale}px`, width: `${5.625 * scale}px`, margin: `${6.65 * scale}px auto 0` }} />
            <div ref={drop} className="slash_up_area" style={{ ...styleScale, ...styleArea, top: `${6.65 * scale}px` }} >

                {lastDroppedSlashUp &&
                    <ReDragUp image={lastDroppedSlashUp.image} chosenColor={chosenColor} onResetUp={onResetUp} scale={scale} onSelectUp={onSelectUp} selectedUp={selectedUp}
                        clear={clear} rotateRight={rotateRight} rotateLeft={rotateLeft} visual={visual} />
                }
                {
                    !lastDroppedSlashUp &&
                    (<img src={UpHolder} alt="upholder" className="slash_holder"
                        style={chosenColor.iconColor === "white" ? { ...styleHolder, ...styleScale, filter: "grayscale(100%) invert(1) brightness(10)" }
                            : { ...styleHolder, ...styleScale, filter: "grayscale(100%) brightness(0)" }}
                    />)
                }
                {
                    (lastDroppedSlashUp && (warning || isActive)) &&
                    (<img src={Remove} alt="remove" className="slash_remove" style={styleScale} />)
                }
            </div >
        </div >
    );
});



// import { memo, useEffect } from 'react';
// import { useDrop } from 'react-dnd';
// import "./IconHolderSlash.scss"
// import "./IconHolderSlash.scss"

// import UpHolder from "../../../assets/preview/upholder.svg"
// import Remove from "../../../assets/preview/remove.svg"

// import { ReDragUp } from './ReDrag/ReDragUp';



// export const IconHolderSlashUp = memo(function IconHolderSlashUp({ lastDroppedSlashUp, onDropSlashUp, chosenColor, onUpActive, show, showNow, warning, onResetUp, scale, onSelectUp, selectedUp }) {


//     const [{ isOver, canDrop }, drop] = useDrop({
//         accept: "icon",
//         drop: onDropSlashUp,
//         collect: (monitor) => ({
//             isOver: monitor.isOver(),
//             canDrop: monitor.canDrop(),
//         }),
//     });

//     const isActive = isOver && canDrop;
//     let styleDropping = {};
//     let styleDroppingPulse = {};
//     let styleArea = {};
//     let styleHolder = {};
//     let styleScale = {};
//     styleScale.height = `${3.6 * scale}px`;
//     styleScale.width = `${3.6 * scale}px`;

//     if ((isActive && show) || (isActive && showNow)) {
//         if (chosenColor.hex !== "#2fa32c") {
//             styleDropping = {
//                 backgroundColor: "rgb(40, 167, 69)",
//             };
//             styleDroppingPulse = {
//                 animation: "Ani 2s infinite",
//                 filter: "invert(34%) sepia(98%) saturate(353%) hue-rotate(70deg) brightness(87%) contrast(102%)"
//             };
//         } else {
//             styleDropping = {
//                 backgroundColor: "rgb( 32, 114, 30)",
//             };
//             styleDroppingPulse = {
//                 animation: "Ani 2s infinite",
//                 filter: "invert(34%) sepia(98%) saturate(353%) hue-rotate(70deg) brightness(87%) contrast(102%)"
//             };
//         };
//         styleArea = {
//             transform: "translate(-103%,-103%) scale(1.8,1.8)",
//             zIndex: "3",
//         };
//         styleHolder = {
//             display: "block",
//         };
//     }

//     else if ((canDrop && show) || (canDrop && showNow)) {
//         styleDropping = {
//             // backgroundColor: "rgb(255, 193, 7)",
//             backgroundColor: "rgb(236, 105, 92)",
//         };
//         styleDroppingPulse = {
//             animation: "Ani 2s infinite",
//         };
//         styleArea = {
//             transform: "translate(-103%,-103%)",
//         };
//         styleHolder = {
//             display: "block",
//         };
//     } else if (selectedUp) {
//         styleDropping = {
//             // backgroundColor: "rgb(255, 193, 7)",
//             backgroundColor: "rgb(236, 105, 92)",
//             // transform: "scale(1.001)",
//         };
//         styleDroppingPulse = {
//             animation: "Ani 2s infinite",
//         }
//         styleArea = {
//             transform: "translate(-53%,-53%) scale(1.8,1.8)",
//             zIndex: "3",
//         };
//     }

//     if (!lastDroppedSlashUp && !show && !showNow && !isActive) {
//         styleArea = {
//             transform: "translate(-35%,-35%) scale(0.01,0.01)",
//         };
//     }

//     useEffect(() => {
//         if (isActive) {
//             onUpActive(true)
//         } else {
//             onUpActive(false)
//         }
//     }, [isActive, onUpActive]);



//     return (
//         <div ref={drop} className="slash_up_area" style={{ ...styleScale, ...styleArea, top: `${6.65 * scale}px` }} >
//             <div className="slash_icon_area_dropping_pulse" style={styleDroppingPulse} />
//             <div ref={drop} className="slash_icon_area_dropping" style={styleDropping} />
//             { lastDroppedSlashUp &&
//                 <ReDragUp image={lastDroppedSlashUp.image} chosenColor={chosenColor} onResetUp={onResetUp} scale={scale} onSelectUp={onSelectUp} />
//             }
//             {
//                 !lastDroppedSlashUp &&
//                 (<img src={UpHolder} alt="upholder" className="slash_holder"
//                     style={chosenColor.iconColor === "white" ? { ...styleHolder, ...styleScale, filter: "grayscale(100%) invert(1) brightness(10)" }
//                         : { ...styleHolder, ...styleScale, filter: "grayscale(100%) brightness(0)" }}
//                 />)
//             }
//             {
//                 (lastDroppedSlashUp && (warning || isActive)) &&
//                 (<img src={Remove} alt="remove" className="slash_remove" style={styleScale} />)
//             }
//         </div >
//     );
// });

