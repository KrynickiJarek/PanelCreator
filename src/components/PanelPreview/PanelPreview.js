import { useState, useEffect, useCallback, memo } from 'react';
import update from 'immutability-helper';
import moment from 'moment';

import "./PanelPreview.scss"

import LogoPure from "../../assets/preview/logopure.svg"

import Resize from "../../assets/scale/resize.svg"
import Zoomin from "../../assets/scale/zoomin.svg"
import Zoomout from "../../assets/scale/zoomout.svg"

import Visual from "../../assets/side/visual.svg"
import Clearall from "../../assets/side/clearall.svg"
import Clear from "../../assets/side/clear.svg"
import Anim from "../../assets/side/anim.svg"
import Animoff from "../../assets/side/animoff.svg"
import Rotateright from "../../assets/side/rotateright.svg"
import Rotateleft from "../../assets/side/rotateleft.svg"



import { IconHolder } from './IconHolder/IconHolder';

export const PanelPreview = memo(function MainCreator({ chosenModel, chosenColor }) {

    const [sc, setSc] = useState(5);

    const handleZoomOut = () => {
        (sc > 4) && setSc(prev => prev - 0.5)
    }
    const handleResize = () => {
        setSc(5)
    }

    const handleZoomIn = () => {
        (sc < 8) && setSc(prev => prev + 0.5)
    }


    const chosenModelStyle = {};
    chosenModelStyle.backgroundColor = chosenColor.hex;
    chosenModelStyle.height = `${parseInt(chosenModel.height) * sc}px`;
    chosenModelStyle.width = `${parseInt(chosenModel.width) * sc}px`;
    chosenModelStyle.transition = "400ms ease";

    const contentStyle = {};
    contentStyle.height = `${parseInt(chosenModel.height) * sc - (chosenModel.marginTopBotton * 2 * sc)}px`;
    contentStyle.width = `${parseInt(chosenModel.width) * sc - (chosenModel.marginLeftRight * 2 * sc)}px`;
    contentStyle.margin = `${chosenModel.marginTopBotton * sc}px ${chosenModel.marginLeftRight * sc}px`
    contentStyle.transition = "400ms ease";


    const cellStyle = {};
    cellStyle.position = "relative";
    cellStyle.transition = "400ms ease";

    const resizeStyle = {};
    resizeStyle.transition = "400ms ease";


    const [visual, setVisual] = useState(true)
    const [animations, setAnimations] = useState(true)
    const [isAnySelected, setIsAnySelected] = useState(false)
    const [clear, setClear] = useState(false)
    const [rotateRight, setRotateRight] = useState(false)
    const [rotateLeft, setRotateLeft] = useState(false)


    const [panelContainerHeight, setPanelContainerHeight] = useState(null)
    const [panelContainerWidth, setPanelContainerWidth] = useState(null)
    useEffect(() => {
        setPanelContainerHeight(document.querySelector(".panel_container").clientHeight)
        setPanelContainerWidth(document.querySelector(".panel_container").clientWidth)
    }, [panelContainerHeight, panelContainerWidth]);

    if (!panelContainerHeight || (panelContainerHeight < (parseInt(chosenModel.height) * sc))) {
        resizeStyle.height = `${(parseInt(chosenModel.height) * sc) + 50}px`;
    } else {
        resizeStyle.height = "100%";
    }

    if (!panelContainerWidth || (panelContainerWidth < (parseInt(chosenModel.width) * sc))) {
        resizeStyle.width = `${(parseInt(chosenModel.width) * sc) + 50}px`;
    } else {
        resizeStyle.width = "100%";
    }

    // window.addEventListener('resize', handleResize)


    const logoStyle = {};
    logoStyle.height = `${3.9 * sc}px`;
    logoStyle.width = `${15.9 * sc}px`;
    logoStyle.bottom = `${5 * sc}px`;
    logoStyle.right = `${5 * sc}px`;
    logoStyle.filter = "invert(79%) sepia(5%) saturate(8%) hue-rotate(322deg) brightness(84%) contrast(83%)";

    const lcdStyle = {};
    lcdStyle.height = `${37 * sc}px`;
    lcdStyle.width = `${30 * sc}px`;
    lcdStyle.top = `${25 * sc}px`;
    lcdStyle.left = `${30 * sc}px`;
    lcdStyle.transition = "400ms ease";

    const lcdIconStyle = {};
    lcdIconStyle.height = `${7 * sc}px`;
    lcdIconStyle.width = `${7 * sc}px`;


    const [time, setTime] = useState(moment().format('HH:mm'));
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
    useEffect(() => {
        const intervalID = setInterval(() => {
            setTime(moment().format('HH:mm'));
            setDate(moment().format('YYYY-MM-DD'));
        }, 5000)
        return () => clearInterval(intervalID);
    }, [time])

    const [iconHolders, setIconHolders] = useState([])
    const [lcdShow, setLcdShow] = useState(chosenModel.lcdScreen ? true : false)
    const [hideAll, setHideAll] = useState(true)

    useEffect(() => {
        setVisual(true)
        const tempArr = [];
        setHideAll(false)
        const modelimeout = setTimeout(() => {
            setHideAll(true)
            chosenModel.dotLocation.forEach(element => {
                tempArr.push({
                    flag: element, lastDroppedDot: null, lastDroppedIcon: null, lastDroppedSlashUp: null, lastDroppedSlashDown: null,
                    selectedDot: false, selected: false, selectedUp: false, selectedDown: false
                })
            });
            setIconHolders(tempArr);
            chosenModel.lcdScreen ? setLcdShow(true) : setLcdShow(false)
        }, 300);
        return () => clearTimeout(modelimeout);
    }, [chosenModel]);

    const handleDrag = useCallback((index, item) => {
        // console.log("NOW")//------------------------powoduje częste przeładowanie
        setIconHolders(update(iconHolders, {
            [index]: {
                selectedDot: {
                    $set: false,
                },
                selected: {
                    $set: false,
                },
                selectedUp: {
                    $set: false,
                },
                selectedDown: {
                    $set: false,
                }
            },
        }));
    }, [iconHolders]);

    const handleDropDot = useCallback((index, item) => {
        const copyArr = iconHolders;
        copyArr.forEach((el) => {
            el.selectedDot = false;
            el.selected = false;
            el.selectedUp = false;
            el.selectedDown = false;
        })
        setIconHolders(copyArr)
        setIconHolders(update(iconHolders, {
            [index]: {
                lastDroppedDot: {
                    $set: item,
                }
            },
        }));
    }, [iconHolders]);

    const handleResetDot = useCallback((index, item) => {
        setClear(false)
        const copyArr = iconHolders;
        copyArr.forEach((el) => {
            el.selectedDot = false;
            el.selected = false;
            el.selectedUp = false;
            el.selectedDown = false;
        })
        setIconHolders(copyArr)
        setIconHolders(update(iconHolders, {
            [index]: {
                lastDroppedDot: {
                    $set: null,
                }
            },
        }));
    }, [iconHolders]);

    const handleDropIcon = useCallback((index, item) => {
        const copyArr = iconHolders;
        copyArr.forEach((el) => {
            el.selectedDot = false;
            el.selected = false;
            el.selectedUp = false;
            el.selectedDown = false;
        })
        setIconHolders(copyArr)
        setIconHolders(update(iconHolders, {
            [index]: {
                lastDroppedIcon: {
                    $set: item,
                },
                lastDroppedSlashUp: {
                    $set: null,
                },
                lastDroppedSlashDown: {
                    $set: null,
                },
            },
        }));
    }, [iconHolders]);


    const handleReset = useCallback((index, item) => {
        setClear(false)
        // console.log("TERAZ")//////////////////---------------
        const copyArr = iconHolders;
        copyArr.forEach((el) => {
            el.selectedDot = false;
            el.selected = false;
            el.selectedUp = false;
            el.selectedDown = false;
        })
        setIconHolders(copyArr)
        setIconHolders(update(iconHolders, {
            [index]: {
                lastDroppedIcon: {
                    $set: null,
                }
            },
        }));
    }, [iconHolders]);



    const handleDropSlashUp = useCallback((index, item) => {
        const copyArr = iconHolders;
        copyArr.forEach((el) => {
            el.selectedDot = false;
            el.selected = false;
            el.selectedUp = false;
            el.selectedDown = false;
        })
        setIconHolders(copyArr)
        setIconHolders(update(iconHolders, {
            [index]: {
                lastDroppedSlashUp: {
                    $set: item,
                },
                lastDroppedIcon: {
                    $set: null,
                }
            },
        }));
    }, [iconHolders]);

    const handleResetUp = useCallback((index, item) => {
        setClear(false)
        const copyArr = iconHolders;
        copyArr.forEach((el) => {
            el.selectedDot = false;
            el.selected = false;
            el.selectedUp = false;
            el.selectedDown = false;
        })
        setIconHolders(copyArr)
        setIconHolders(update(iconHolders, {
            [index]: {
                lastDroppedSlashUp: {
                    $set: null,
                }
            },
        }));
    }, [iconHolders]);


    const handleDropSlashDown = useCallback((index, item) => {
        const copyArr = iconHolders;
        copyArr.forEach((el) => {
            el.selectedDot = false;
            el.selected = false;
            el.selectedUp = false;
            el.selectedDown = false;
        })
        setIconHolders(copyArr)
        setIconHolders(update(iconHolders, {
            [index]: {
                lastDroppedSlashDown: {
                    $set: item,
                },
                lastDroppedIcon: {
                    $set: null,
                }
            },
        }));
    }, [iconHolders]);

    const handleResetDown = useCallback((index, item) => {
        setClear(false)
        const copyArr = iconHolders;
        copyArr.forEach((el) => {
            el.selectedDot = false;
            el.selected = false;
            el.selectedUp = false;
            el.selectedDown = false;
        })
        setIconHolders(copyArr)
        setIconHolders(update(iconHolders, {
            [index]: {
                lastDroppedSlashDown: {
                    $set: null,
                }
            },
        }));
    }, [iconHolders]);


    //--------------------------------------------------------------------------------------SELECTY
    const handleSelect = useCallback((index, item) => {
        const copyArr = iconHolders;
        copyArr.forEach((el, i) => {
            if (i === index) {
                el.selectedDot = false;
                el.selectedUp = false;
                el.selectedDown = false;
            } else {
                el.selectedDot = false;
                el.selected = false;
                el.selectedUp = false;
                el.selectedDown = false;
            }
        })
        setIconHolders(copyArr)
        setIconHolders(update(iconHolders, {
            [index]: {
                selected: {
                    $set: !iconHolders[index].selected,
                }
            },
        }));
    }, [iconHolders]);



    const handleSelectDot = useCallback((index, item) => {
        const copyArr = iconHolders;
        copyArr.forEach((el, i) => {
            if (i === index) {
                el.selected = false;
                el.selectedUp = false;
                el.selectedDown = false;
            } else {
                el.selectedDot = false;
                el.selected = false;
                el.selectedUp = false;
                el.selectedDown = false;
            }
        })
        setIconHolders(copyArr)
        setIconHolders(update(iconHolders, {
            [index]: {
                selectedDot: {
                    $set: !iconHolders[index].selectedDot,
                }
            },
        }));
    }, [iconHolders]);


    const handleSelectDown = useCallback((index, item) => {
        const copyArr = iconHolders;
        copyArr.forEach((el, i) => {
            if (i === index) {
                el.selectedDot = false;
                el.selected = false;
                el.selectedUp = false;
            } else {
                el.selectedDot = false;
                el.selected = false;
                el.selectedUp = false;
                el.selectedDown = false;
            }
        })
        setIconHolders(copyArr)
        setIconHolders(update(iconHolders, {
            [index]: {
                selectedDown: {
                    $set: !iconHolders[index].selectedDown,
                }
            },
        }));
    }, [iconHolders]);


    const handleSelectUp = useCallback((index, item) => {
        const copyArr = iconHolders;
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
        setIconHolders(copyArr)
        setIconHolders(update(iconHolders, {
            [index]: {
                selectedUp: {
                    $set: !iconHolders[index].selectedUp,
                }
            },
        }));
    }, [iconHolders]);


    const handleVisual = () => {
        setVisual(prev => !prev)
    }

    const handleClearAll = () => {
        const tempArr = [];
        setHideAll(false)
        const modelimeout = setTimeout(() => {
            setHideAll(true)
            chosenModel.dotLocation.forEach(element => {
                tempArr.push({
                    flag: element, lastDroppedDot: null, lastDroppedIcon: null, lastDroppedSlashUp: null, lastDroppedSlashDown: null,
                    selectedDot: false, selected: false, selectedUp: false, selectedDown: false
                })
            });
            setIconHolders(tempArr);
            chosenModel.lcdScreen ? setLcdShow(true) : setLcdShow(false)
        }, 300);
        return () => clearTimeout(modelimeout);
    }

    useEffect(() => {
        setIsAnySelected(false)
        iconHolders.forEach((el) => {
            if (el.selectedDot || el.selected || el.selectedUp || el.selectedDown || el.selectedDot) {
                setIsAnySelected(true)
            }
        })
    }, [iconHolders, isAnySelected]);


    const handleClear = () => {
        if (isAnySelected) {
            setClear(true)
        }
        setIsAnySelected(false)
    }

    const handleAnimation = () => {
        setAnimations(prev => !prev)
    }

    const handleRotateRight = () => {
        setRotateRight(prev => !prev)
    }

    const handleRotateLeft = () => {
        setRotateLeft(prev => !prev)
    }




    return (
        <div className="panelpreview_container">
            <div className="preview_container">
                <div className="preview_top">
                    <h2>PODGLĄD PANELU</h2>
                </div>
                <div className="panel_container"  >
                    <div className="resize_container" style={resizeStyle}>
                        <div className="panel_box" style={chosenModelStyle}>
                            {/* <div className="visualization_frame" style={!visual ? { border: "4px groove #6f6f6f", boxShadow: "rgba(0, 0, 0, 0.55) 10px 5px 20px"} : {opacity: "0" }} /> */}
                            <div className="visualization_frame" style={!visual ? { border: `4px groove ${chosenColor.hex}`, opacity: "1", boxShadow: "rgba(0, 0, 0, 0.55) 10px 5px 20px" } : { opacity: "0" }} />
                            <div className="visualization_frame" style={!visual ? { border: `4px groove white`, opacity: "0.2" } : { opacity: "0" }} />
                            {(lcdShow && !visual) && <div style={{ ...lcdStyle, position: "absolute", backgroundColor: "#141414" }} />}
                            <div className="visualization_glass" style={!visual ? { opacity: "1" } : { opacity: "0" }} />
                            <div className="visualization_glass_bis" style={!visual ? { opacity: "1" } : { opacity: "0" }} />
                            <div className="visualization_glass_white" style={(!visual && chosenColor.RAL === "9003") ? { opacity: "1" } : { opacity: "0" }} />
                            {/* <div className="visualization_frame" style={!visual ? { border: "2px outset #d4d4d4", opacity: "1", boxShadow: "rgba(0, 0, 0, 0.55) 10px 5px 20px"} : {opacity: "0" }} /> */}
                            <div className="visualization_frame" style={!visual ? { border: "2px outset #d4d4d4", opacity: "0.8" } : { opacity: "0" }} />
                            {/* <div className="visualization_frame" style={!visual ? { border: `2px solid ${chosenColor.hex}`, opacity: "1" } : {}} /> */}
                            <img src={LogoPure} alt="logo" className="logo_pure" style={!visual ? { ...logoStyle, opacity: "1" } : { ...logoStyle, opacity: "0" }} />
                            <div className="panel_content" style={contentStyle}>
                                {hideAll &&
                                    <>
                                        {iconHolders.map(({ flag, lastDroppedIcon, lastDroppedDot, lastDroppedSlashUp, lastDroppedSlashDown, selected, selectedDot, selectedUp, selectedDown, }, index) =>
                                            <div key={index}
                                                style={
                                                    ((index + 2) % 3 === 0) ?
                                                        (
                                                            (iconHolders.length <= 9) ?
                                                                ((index > iconHolders.length - 4) ? { ...cellStyle, width: `${25.6 * sc}px`, height: `${22.4 * sc}px` } : { ...cellStyle, width: `${25.6 * sc}px`, height: `${24 * sc}px` })
                                                                : ((index > iconHolders.length - 4) ? { ...cellStyle, width: `${25.6 * sc}px`, height: `${20.8 * sc}px` } : { ...cellStyle, width: `${25.6 * sc}px`, height: `${24 * sc}px` })
                                                        )
                                                        : (
                                                            (iconHolders.length <= 9) ?
                                                                ((index > iconHolders.length - 4) ? { ...cellStyle, width: `${22.4 * sc}px`, height: `${22.4 * sc}px` } : { ...cellStyle, width: `${22.4 * sc}px`, height: `${24 * sc}px` })
                                                                : ((index > iconHolders.length - 4) ? { ...cellStyle, width: `${22.4 * sc}px`, height: `${20.8 * sc}px` } : { ...cellStyle, width: `${22.4 * sc}px`, height: `${24 * sc}px` })
                                                        )}>
                                                {flag === 1 &&
                                                    <>
                                                        <IconHolder
                                                            chosenColor={chosenColor}
                                                            lastDroppedDot={lastDroppedDot} onDropDot={(item) => handleDropDot(index, item)}
                                                            lastDroppedIcon={lastDroppedIcon} onDrop={(item) => handleDropIcon(index, item)}
                                                            lastDroppedSlashUp={lastDroppedSlashUp} onDropSlashUp={(item) => handleDropSlashUp(index, item)}
                                                            lastDroppedSlashDown={lastDroppedSlashDown} onDropSlashDown={(item) => handleDropSlashDown(index, item)}
                                                            onReset={(item) => handleReset(index, item)}
                                                            onResetDot={(item) => handleResetDot(index, item)}
                                                            onResetUp={(item) => handleResetUp(index, item)}
                                                            onResetDown={(item) => handleResetDown(index, item)}
                                                            scale={sc}
                                                            onSelect={(item) => handleSelect(index, item)}
                                                            onSelectDot={(item) => handleSelectDot(index, item)}
                                                            onSelectUp={(item) => handleSelectUp(index, item)}
                                                            onSelectDown={(item) => handleSelectDown(index, item)}
                                                            selectedDot={selectedDot}
                                                            selected={selected}
                                                            selectedUp={selectedUp}
                                                            selectedDown={selectedDown}
                                                            onDrag={(item) => handleDrag(index, item)}
                                                            animations={animations}
                                                            clear={clear}
                                                            rotateRight={rotateRight}
                                                            rotateLeft={rotateLeft}
                                                            visual={visual}
                                                        />
                                                    </>}
                                            </div>
                                        )}
                                        {(lcdShow && visual) && <div className="lcd" style={{ ...lcdStyle, borderColor: chosenColor.iconColor }} />}
                                        {(lcdShow && !visual) &&
                                            <div className="lcd_visual" style={{ ...lcdStyle, padding: `${2 * sc}px ${1 * sc}px` }}>
                                                <p className="lcd_clock" style={{ fontSize: `${3 * sc}px`, lineHeight: `${3.3 * sc}px` }}>{date}</p>
                                                <p className="lcd_clock" style={{ fontSize: `${5 * sc}px`, lineHeight: `${5.5 * sc}px` }}>{time}</p>
                                            </div>}
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="preview_bottom">
                    <div className="bottom_info_model">
                        <span>{chosenModel.type}</span>
                    </div>
                    <div className="scale_container">
                        <div className="scale_box">
                            <img src={Zoomout} alt="zoomout" className="scale_icon" onClick={handleZoomOut}
                                style={sc === 4 ? { filter: "invert(53%) sepia(6%) saturate(18%) hue-rotate(343deg) brightness(94%) contrast(84%)", cursor: "not-allowed" } : {}} />
                        </div>
                        <div className="scale_box">
                            <img src={Resize} alt="resize" className="scale_icon" onClick={handleResize} />
                        </div>
                        <div className="scale_box">
                            <img src={Zoomin} alt="zoomin" className="scale_icon" onClick={handleZoomIn}
                                style={sc === 8 ? { filter: "invert(53%) sepia(6%) saturate(18%) hue-rotate(343deg) brightness(94%) contrast(84%)", cursor: "not-allowed" } : {}} />
                        </div>
                    </div>
                    <div className="bottom_info_ral">
                        <span>RAL: {chosenColor.RAL}</span>
                    </div>

                </div>
            </div>
            <div className="preview_side">

                <div className="side_box">
                    <img src={Visual} alt="visualization" className="side_icon" onClick={handleVisual} />
                    {visual ? <span>Widok wizuali-<br />zacji</span> : <span>Widok schematy-<br />czny</span>}
                </div>
                <div className="side_box">
                    {animations ?
                        <img src={Animoff} alt="animationoff" className="side_icon" onClick={handleAnimation} />
                        : <img src={Anim} alt="animation" className="side_icon" onClick={handleAnimation} />
                    }
                    {animations ? <span>Wyłącz animacje</span> : <span>Włącz animacje</span>}
                </div>
                <div className="side_box">
                    <img src={Clearall} alt="clearall" className="side_icon" onClick={handleClearAll} />
                    <span>Usuń wszystkie ikony</span>
                </div>
                <div className="side_box" style={!isAnySelected ? { filter: "grayscale(100%)", cursor: "not-allowed" } : {}}>
                    <img src={Clear} alt="clear" className="side_icon" onClick={handleClear} />
                    <span>Usuń zaznaczoną ikonę</span>
                </div>
                <div className="side_box" style={!isAnySelected ? { filter: "grayscale(100%)", cursor: "not-allowed" } : {}}>
                    <img src={Rotateright} alt="rotateright" className="side_icon" onClick={handleRotateRight} />
                    <span>Obróć o 90° w prawo</span>
                </div>
                <div className="side_box" style={!isAnySelected ? { filter: "grayscale(100%)", cursor: "not-allowed" } : {}}>
                    <img src={Rotateleft} alt="rotateleft" className="side_icon" onClick={handleRotateLeft} />
                    <span >Obróć o 90° w lewo</span>
                </div>
            </div>
        </div>
    );
});

export default PanelPreview;


// import { useState, useEffect, useCallback, memo } from 'react';
// import "./PanelPreview.scss"

// import { StatusIconHolder } from './StatusIconHolder';
// import { IconHolder } from './IconHolder';

// import update from 'immutability-helper';

// export const PanelPreview = memo(function MainCreator({ chosenModel, chosenColor }) {

//     const sc = 5;

//     const chosenModelStyle = {};
//     chosenModelStyle.backgroundColor = chosenColor.hex;
//     chosenModelStyle.height = `${parseInt(chosenModel.height) * sc}px`;
//     chosenModelStyle.width = `${parseInt(chosenModel.width) * sc}px`;

//     const contentStyle = {};
//     contentStyle.height = `${parseInt(chosenModel.height) * sc - (chosenModel.marginTopBotton * 2 * sc)}px`;
//     contentStyle.width = `${parseInt(chosenModel.width) * sc - (chosenModel.marginLeftRight * 2 * sc)}px`;
//     contentStyle.margin = `${chosenModel.marginTopBotton * sc}px ${chosenModel.marginLeftRight * sc}px`

//     const [iconHolders, setIconHolders] = useState([])

//     useEffect(() => {
//         const tempArr = [];
//         chosenModel.dotLocation.forEach(element => {
//             tempArr.push({ flag: element, lastDroppedDot: null, lastDroppedIcon: null, lastDroppedSlashUp: null, lastDroppedSlashDown: null })
//         });
//         setIconHolders(tempArr);
//     }, [chosenModel]);


//     // const [droppedIcons, setDroppedIcons] = useState([]);
//     // function isDropped(icon) { //feedback dla ikony, że już jest dropnięta. Zbędne? 
//     // return droppedIcons.indexOf(icon) > -1;
//     // }
//     const handleDropDot = useCallback((index, item) => {
//         // const { image } = item;
//         // setDroppedIcons(update(droppedIcons, image ? { $push: [image] } : { $push: [] }));
//         setIconHolders(update(iconHolders, {
//             [index]: {
//                 lastDroppedDot: {
//                     $set: item,
//                 }
//             },
//         }));
//         // }, [droppedIcons, iconHolders]);
//     }, [iconHolders]);


//     const handleDropIcon = useCallback((index, item) => {
//         // const { image } = item;
//         // setDroppedIcons(update(droppedIcons, image ? { $push: [image] } : { $push: [] }));
//         setIconHolders(update(iconHolders, {
//             [index]: {
//                 lastDroppedIcon: {
//                     $set: item,
//                 },
//                 lastDroppedSlashUp: {
//                     $set: null,
//                 },
//                 lastDroppedSlashDown: {
//                     $set: null,
//                 }
//             },
//         }));
//         // }, [droppedIcons, iconHolders]);
//     }, [iconHolders]);


//     // const handleDropIcon = useCallback((index, item) => {
//     //     const { image } = item;
//     //     setDroppedIcons(update(droppedIcons, image ? { $push: [image] } : { $push: [] }));
//     //     setIconHolders(update(iconHolders, {
//     //         [index]: {
//     //             lastDroppedIcon: {
//     //                 $set: item,
//     //             },
//     //             lastDroppedSlashUp: {
//     //                 $set: null,
//     //             },
//     //             lastDroppedSlashDown: {
//     //                 $set: null,
//     //             }
//     //         },
//     //     }));
//     // }, [droppedIcons, iconHolders]);



//     const handleDropSlashUp = useCallback((index, item) => {
//         // const { image } = item;
//         // setDroppedIcons(update(droppedIcons, image ? { $push: [image] } : { $push: [] }));
//         setIconHolders(update(iconHolders, {
//             [index]: {
//                 lastDroppedSlashUp: {
//                     $set: item,
//                 },
//                 lastDroppedIcon: {
//                     $set: null,
//                 }
//             },
//         }));
//         // }, [droppedIcons, iconHolders]);
//     }, [iconHolders]);


//     const handleDropSlashDown = useCallback((index, item) => {
//         // const { image } = item;
//         // setDroppedIcons(update(droppedIcons, image ? { $push: [image] } : { $push: [] }));
//         setIconHolders(update(iconHolders, {
//             [index]: {
//                 lastDroppedSlashDown: {
//                     $set: item,
//                 },
//                 lastDroppedIcon: {
//                     $set: null,
//                 }
//             },
//         }));
//         // }, [droppedIcons, iconHolders]);
//     }, [iconHolders]);




//     const handleResetIcon = useCallback((index, item) => {
//         // const { image } = item;
//         // setDroppedIcons(update(droppedIcons, image ? { $push: [image] } : { $push: [] }));
//         setIconHolders(update(iconHolders, {
//             [index]: {
//                 lastDroppedIcon: {
//                     $set: null,
//                 }
//             },
//         }));
//         // }, [droppedIcons, iconHolders]);
//     }, [iconHolders]);



//     return (
//         <>
//             <div className="preview_container">
//                 <h2>Podgląd panelu</h2>
//                 <div className="panel_box"
//                     style={chosenModelStyle}>
//                     <div className="panel_content" style={contentStyle}>
//                         {iconHolders.map(({ flag, lastDroppedIcon, lastDroppedDot, lastDroppedSlashUp, lastDroppedSlashDown }, index) =>
//                             <div key={index}
//                                 className={(iconHolders.length <= 9) ? "cell cell_dot9" : "cell cell_dot18"}>
//                                 {flag === 1 &&
//                                     <>
//                                         <StatusIconHolder lastDroppedDot={lastDroppedDot} onDrop={(item) => handleDropDot(index, item)} chosenColor={chosenColor} />
//                                         <IconHolder
//                                             chosenColor={chosenColor}
//                                             lastDroppedIcon={lastDroppedIcon} onDrop={(item) => handleDropIcon(index, item)}
//                                             lastDroppedSlashUp={lastDroppedSlashUp} onDropSlashUp={(item) => handleDropSlashUp(index, item)}
//                                             lastDroppedSlashDown={lastDroppedSlashDown} onDropSlashDown={(item) => handleDropSlashDown(index, item)}


//                                             onReset={(item) => handleResetIcon(index, item)}
//                                         // onReset={handleResetIcon}
//                                         />
//                                     </>}
//                             </div>
//                         )}
//                     </div>
//                     {chosenModel.lcdScreen && <div className="lcd" style={{ borderColor: chosenColor.iconColor }} />}
//                 </div>

//                 <div className="panel_info" style={{ width: parseInt(chosenModel.width) * sc }}>
//                     <span>{chosenModel.type}</span>
//                     <span>RAL: {chosenColor.RAL}</span>
//                 </div>
//             </div>
//         </>
//     );
// });

// export default PanelPreview;
