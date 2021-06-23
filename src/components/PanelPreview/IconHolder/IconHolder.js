import { memo, useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import "./IconHolder.scss"

import Slash from "../../../assets/preview/slash.svg"
import Holder from "../../../assets/preview/holder.svg"
import Remove from "../../../assets/preview/remove.svg"

import { IconHolderStatus } from './IconHolderStatus';
import { IconHolderSlashUp } from './IconHolderSlashUp';
import { IconHolderSlashDown } from './IconHolderSlashDown';

import { ReDrag } from './ReDrag/ReDrag';



export const IconHolder = memo(function IconHolder({
    chosenColor,
    lastDroppedDot, onDropDot,
    lastDroppedIcon, onDrop,
    lastDroppedSlashUp, onDropSlashUp,
    lastDroppedSlashDown, onDropSlashDown,
    onReset, onResetDot, onResetUp, onResetDown,
    scale,
    onSelect, onSelectDot, onSelectUp, onSelectDown,
    selected, selectedDot, selectedUp, selectedDown,
    onDrag,
    animations, clear,
    rotateRight, rotateLeft,
    visual,
    chosenTab,
    showRemoveIcon,
    showRemoveIcons,
    chosenModel,
    singleFrame,
    singleFrames,
    chosenFrameShape
}) {

    let warning = false
    const [show, setShow] = useState(false);

    const [upActive, setUpActive] = useState(false);
    const [downActive, setDownActive] = useState(false);

    const [{ isOver, canDrop }, drop] = useDrop({
        accept: "icon",
        drop: onDrop,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    useEffect(() => { //-------------------------------------------------------------------------------selected
        if (canDrop) {
            onDrag()
        }
    }, [canDrop, onDrag]);

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

    if (isActive) {
        if (chosenColor.hex !== "#2fa32c") {
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
            }, 400);
            return () => clearTimeout(slashTimeout);
        }
    }, [isOverToShow]);


    useEffect(() => {
        setShow(false)
    }, [isOverToShow]);

    if (singleFrames.lenght !== 0) {
        styleSignleFrame = {
            // border: `2px solid ${chosenColor.iconColor}`,
            border: `2px solid white`,
            borderRadius: "0px",
        }
        styleSignleFrameResize = {
            transform: "scale(0.75)",
        }
    }
    // console.log(singleFrames)


    if (singleFrame && chosenFrameShape === "sharp") {
        styleSignleFrame = {
            border: "2px solid rgb(32, 114, 30)",
            borderRadius: "0px",
        }
        styleSignleFrameResize = {
            transform: "scale(0.75)",
        }
    } else if (singleFrame && chosenFrameShape === "round") {
        styleSignleFrame = {
            border: "2px solid rgb(32, 114, 30)",
            borderRadius: `${scale}px`,
        }
        styleSignleFrameResize = {
            transform: "scale(0.75)",
        }
    } else if (!singleFrame && chosenFrameShape === "round") {
        styleSignleFrame = {
            border: "2px solid transparent",
            borderRadius: `${scale}px`
        }
    } else {
        styleSignleFrame = {
            border: "2px solid transparent"
        }
    }


    let showNow = false
    if (isOverToShow && (lastDroppedSlashDown || lastDroppedSlashUp)) {
        showNow = true
    }


    const [showHolder, setShowHolder] = useState(false);

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
                <IconHolderStatus lastDroppedDot={lastDroppedDot} onDropDot={onDropDot} chosenColor={chosenColor} onResetDot={onResetDot} show={show} scale={scale}
                    onSelectDot={onSelectDot} selectedDot={selectedDot} animations={animations} clear={clear} rotateRight={rotateRight} rotateLeft={rotateLeft}
                    visual={visual} chosenTab={chosenTab} chosenModel={chosenModel} showRemoveIcon={showRemoveIcon} showRemoveIcons={showRemoveIcons} />
                <div style={styleZIndex}>

                    <div className="icon_area_dropping_ani" style={{ ...styleDroppingAni, height: `${7.5 * scale}px`, width: `${7.5 * scale}px`, margin: `${6.65 * scale}px auto 0` }}>
                        <div className="icon_area_dropping_pulse" style={styleDroppingPulse} />
                    </div>
                    <div className="icon_area_dropping" style={{ ...styleScale, ...styleDropping, margin: `${6.65 * scale}px auto 0` }} />
                    <div ref={drop} className="icon_area" style={{ ...styleScale, ...styleArea, ...styleSignleFrame }} >
                        <div className="icon_area" style={styleSignleFrameResize}>

                            {(lastDroppedIcon) &&
                                <ReDrag image={lastDroppedIcon.image} chosenColor={chosenColor} onReset={onReset} scale={scale} onSelect={onSelect} selected={selected}
                                    clear={clear} rotateRight={rotateRight} rotateLeft={rotateLeft} visual={visual} />
                            }
                            {(!lastDroppedIcon && (show || showHolder)) &&
                                (<img src={Holder} alt="holder" className="holder"
                                    style={chosenColor.iconColor === "white" ? { ...styleScale, filter: "grayscale(100%) invert(1) brightness(10)" }
                                        : { ...styleScale, filter: "grayscale(100%) brightness(0)" }}
                                />)}
                            {((lastDroppedSlashUp || lastDroppedSlashDown) && !show && !isActive) &&
                                (<img src={Slash} alt="slash" className="slash"
                                    style={!visual ? { ...styleScale, filter: "grayscale(100%) invert(1) brightness(10) drop-shadow( 0 0 4px rgba(255, 255, 255, 1))" }
                                        : chosenColor.iconColor === "white" ? { ...styleScale, filter: "grayscale(100%) invert(1) brightness(10)" }
                                            : { ...styleScale, filter: "grayscale(100%) brightness(0)" }}
                                />)}
                            {(lastDroppedIcon && (upActive || downActive || isActive || showRemoveIcons || (showRemoveIcon && selected))) &&
                                (<img src={Remove} alt="remove" className="remove" style={styleScale} />)}

                        </div>
                    </div>
                </div>
                {/* <div className="icon_area" style={styleSignleFrameResize}> */}

                <IconHolderSlashUp lastDroppedSlashUp={lastDroppedSlashUp} onDropSlashUp={onDropSlashUp} chosenColor={chosenColor} onUpActive={(income) => setUpActive(income)}
                    show={show} showNow={showNow} warning={warning} onResetUp={onResetUp} scale={scale} onSelectUp={onSelectUp} selectedUp={selectedUp} animations={animations}
                    clear={clear} rotateRight={rotateRight} rotateLeft={rotateLeft} visual={visual} chosenTab={chosenTab} chosenModel={chosenModel}
                    showRemoveIcon={showRemoveIcon} showRemoveIcons={showRemoveIcons} singleFrame={singleFrame} />

                <IconHolderSlashDown lastDroppedSlashDown={lastDroppedSlashDown} onDropSlashDown={onDropSlashDown} chosenColor={chosenColor} onDownActive={(income) => setDownActive(income)}
                    show={show} showNow={showNow} warning={warning} onResetDown={onResetDown} scale={scale} onSelectDown={onSelectDown} selectedDown={selectedDown} animations={animations}
                    clear={clear} rotateRight={rotateRight} rotateLeft={rotateLeft} visual={visual} chosenTab={chosenTab} chosenModel={chosenModel}
                    showRemoveIcon={showRemoveIcon} showRemoveIcons={showRemoveIcons} singleFrame={singleFrame} />
            </div>
            {/* </div> */}
        </>





    );
});





// import { memo, useState, useEffect } from 'react';
// import { useDrop } from 'react-dnd';
// import "./IconHolder.scss"

// import Slash from "../../../assets/preview/slash.svg"
// import Holder from "../../../assets/preview/holder.svg"
// import Remove from "../../../assets/preview/remove.svg"

// import { IconHolderStatus } from './IconHolderStatus';
// import { IconHolderSlashUp } from './IconHolderSlashUp';
// import { IconHolderSlashDown } from './IconHolderSlashDown';

// import { ReDrag } from './ReDrag/ReDrag';



// export const IconHolder = memo(function IconHolder({
//     chosenColor,
//     lastDroppedDot, onDropDot,
//     lastDroppedIcon, onDrop,
//     lastDroppedSlashUp, onDropSlashUp,
//     lastDroppedSlashDown, onDropSlashDown,
//     onReset, onResetDot, onResetUp, onResetDown,
//     scale,
//     onSelect, onSelectDot, onSelectUp, onSelectDown,
//     selected, selectedDot, selectedUp, selectedDown,
//     onDrag,
//     animations, clear,
//     rotateRight, rotateLeft,
//     visual,
//     chosenTab,
//     showRemoveIcon,
//     showRemoveIcons,
//     chosenModel
// }) {

//     let warning = false
//     const [show, setShow] = useState(false);

//     const [upActive, setUpActive] = useState(false);
//     const [downActive, setDownActive] = useState(false);

//     const [{ isOver, canDrop }, drop] = useDrop({
//         accept: "icon",
//         drop: onDrop,
//         collect: (monitor) => ({
//             isOver: monitor.isOver(),
//             canDrop: monitor.canDrop(),
//         }),
//     });

//     useEffect(() => { //-------------------------------------------------------------------------------selected
//         if (canDrop) {
//             onDrag()
//         }
//     }, [canDrop, onDrag]);

//     const isActive = isOver && canDrop;
//     let styleDropping = {};
//     let styleDroppingAni = {};
//     let styleDroppingPulse = {};
//     let styleArea = {};
//     let styleScale = {};
//     styleScale.height = `${7.5 * scale}px`;
//     styleScale.width = `${7.5 * scale}px`;
//     let styleZIndex = {};

//     if (isActive) {
//         if (chosenColor.hex !== "#2fa32c") {
//             styleDropping = {
//                 backgroundColor: "rgb(40, 167, 69)",
//                 transform: "translateX(-50%) scale(2)",
//             };
//             if (animations) {
//                 styleDroppingPulse = {
//                     animation: "Ani 2s infinite",
//                     filter: "invert(34%) sepia(98%) saturate(353%) hue-rotate(70deg) brightness(87%) contrast(102%)"
//                 };
//             }
//         } else {
//             styleDropping = {
//                 backgroundColor: "rgb( 32, 114, 30)",
//                 transform: "translateX(-50%) scale(2)",
//             };
//             if (animations) {
//                 styleDroppingPulse = {
//                     animation: "Ani 2s infinite",
//                     filter: "invert(34%) sepia(98%) saturate(353%) hue-rotate(70deg) brightness(87%) contrast(102%)"
//                 };
//             }
//         };
//         if (chosenModel.type === "MDOT-18 poziomy") {
//             styleArea = {
//                 transform: "scale(1.3) rotate(90deg)",
//             };
//         } else {
//             styleArea = {
//                 transform: "scale(1.3)",
//             };
//         }

//         styleDroppingAni = {
//             transform: "translateX(-50%) scale(2.25)",
//         }
//         styleZIndex = {
//             zIndex: "99",
//         };
//         warning = true;
//     }
//     else if (canDrop || (selected && chosenTab === "icons")) {
//         styleDropping = {
//             backgroundColor: "rgb(236, 105, 92)",
//             transform: "translateX(-50%) scale(1.45)",
//         };
//         styleDroppingAni = {
//             transform: "translateX(-50%) scale(1.75)",
//         }
//         if (animations) {
//             styleDroppingPulse = {
//                 animation: "Ani 2s infinite",
//             };
//         }
//     }

//     const [{ isOverToShow }, over] = useDrop({
//         accept: "icon",
//         drop: null,
//         collect: (monitor) => ({
//             isOverToShow: monitor.isOver(),
//         }),
//     });

//     useEffect(() => {
//         if (isOverToShow) {
//             const slashTimeout = setTimeout(() => {
//                 setShow(true)
//             }, 400);
//             return () => clearTimeout(slashTimeout);
//         }
//     }, [isOverToShow]);


//     useEffect(() => {
//         setShow(false)
//     }, [isOverToShow]);


//     let showNow = false
//     if (isOverToShow && (lastDroppedSlashDown || lastDroppedSlashUp)) {
//         showNow = true
//     }


//     const [showHolder, setShowHolder] = useState(false);

//     useEffect(() => {
//         if (isActive) {
//             const holderTimeout = setTimeout(() => {
//                 setShowHolder(true)
//             }, 200);
//             return () => clearTimeout(holderTimeout);
//         }
//     }, [isActive]);

//     useEffect(() => {
//         setShowHolder(false)
//     }, [isActive]);





//     return (
//         // <div ref={over} style={{ height: "100%", width: "100%", position: "absolute", border: "2px dotted pink", transform:"rotate(90deg)", transformOrigin:`${10.4 * scale} center`}}>
//         <div ref={over} style={{ height: "100%", width: "100%", position: "absolute"}}>
//             <IconHolderStatus lastDroppedDot={lastDroppedDot} onDropDot={onDropDot} chosenColor={chosenColor} onResetDot={onResetDot} show={show} scale={scale}
//                 onSelectDot={onSelectDot} selectedDot={selectedDot} animations={animations} clear={clear} rotateRight={rotateRight} rotateLeft={rotateLeft}
//                 visual={visual} chosenTab={chosenTab} chosenModel={chosenModel} showRemoveIcon={showRemoveIcon} showRemoveIcons={showRemoveIcons} />
//             <div style={styleZIndex}>
//                 <div className="icon_area_dropping_ani" style={{ ...styleDroppingAni, height: `${7.5 * scale}px`, width: `${7.5 * scale}px`, margin: `${6.65 * scale}px auto 0` }}>
//                     <div className="icon_area_dropping_pulse" style={styleDroppingPulse} />
//                 </div>
//                 <div className="icon_area_dropping" style={{ ...styleScale, ...styleDropping, margin: `${6.65 * scale}px auto 0` }} />
//                 <div ref={drop} className="icon_area" style={(chosenModel.type === "MDOT-18 poziomy") ?
//                     { transform: "rotate(90deg)", ...styleScale, ...styleArea } : { ...styleScale, ...styleArea }}  >

//                     {(lastDroppedIcon) &&
//                         <ReDrag image={lastDroppedIcon.image} chosenColor={chosenColor} onReset={onReset} scale={scale} onSelect={onSelect} selected={selected}
//                             clear={clear} rotateRight={rotateRight} rotateLeft={rotateLeft} visual={visual} />
//                     }
//                     {(!lastDroppedIcon && (show || showHolder)) &&
//                         (<img src={Holder} alt="holder" className="holder"
//                             style={chosenColor.iconColor === "white" ? { ...styleScale, filter: "grayscale(100%) invert(1) brightness(10)" }
//                                 : { ...styleScale, filter: "grayscale(100%) brightness(0)" }}
//                         />)}
//                     {((lastDroppedSlashUp || lastDroppedSlashDown) && !show && !isActive) &&
//                         (<img src={Slash} alt="slash" className="slash"
//                             style={!visual ? { ...styleScale, filter: "grayscale(100%) invert(1) brightness(10) drop-shadow( 0 0 4px rgba(255, 255, 255, 1))" }
//                                 : chosenColor.iconColor === "white" ? { ...styleScale, filter: "grayscale(100%) invert(1) brightness(10)" }
//                                     : { ...styleScale, filter: "grayscale(100%) brightness(0)" }}
//                         />)}
//                     {(lastDroppedIcon && (upActive || downActive || isActive || showRemoveIcons || (showRemoveIcon && selected))) &&
//                         (<img src={Remove} alt="remove" className="remove" style={styleScale} />)}
//                 </div>
//             </div>
//             {/* <div style={(chosenModel.type === "MDOT-18 poziomy") ? 
//             { position:" absolute", top: "0", height:"100%",width:"100%", backgroundColor: "rgba(0, 255, 25,0.2)", border: "2px dotted pink"} 
//             : {}}> */}

//                 <IconHolderSlashUp lastDroppedSlashUp={lastDroppedSlashUp} onDropSlashUp={onDropSlashUp} chosenColor={chosenColor} onUpActive={(income) => setUpActive(income)}
//                     show={show} showNow={showNow} warning={warning} onResetUp={onResetUp} scale={scale} onSelectUp={onSelectUp} selectedUp={selectedUp} animations={animations}
//                     clear={clear} rotateRight={rotateRight} rotateLeft={rotateLeft} visual={visual} chosenTab={chosenTab} chosenModel={chosenModel}
//                     showRemoveIcon={showRemoveIcon} showRemoveIcons={showRemoveIcons} />

//                 <IconHolderSlashDown lastDroppedSlashDown={lastDroppedSlashDown} onDropSlashDown={onDropSlashDown} chosenColor={chosenColor} onDownActive={(income) => setDownActive(income)}
//                     show={show} showNow={showNow} warning={warning} onResetDown={onResetDown} scale={scale} onSelectDown={onSelectDown} selectedDown={selectedDown} animations={animations}
//                     clear={clear} rotateRight={rotateRight} rotateLeft={rotateLeft} visual={visual} chosenTab={chosenTab} chosenModel={chosenModel}
//                     showRemoveIcon={showRemoveIcon} showRemoveIcons={showRemoveIcons} />
//             {/* </div> */}
//         </div>
//     );
// });


