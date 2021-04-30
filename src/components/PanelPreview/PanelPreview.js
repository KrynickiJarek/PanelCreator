import { useState, useEffect, useCallback, memo } from 'react';
import update from 'immutability-helper';

import "./PanelPreview.scss"

import Resize from "../../assets/scale/resize.svg"
import Zoomin from "../../assets/scale/zoomin.svg"
import Zoomout from "../../assets/scale/zoomout.svg"

import { IconHolder } from './IconHolder/IconHolder';
// import { checkPropTypes } from 'prop-types'; ///------WTF???


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






    const lcdStyle = {};
    lcdStyle.height = `${37 * sc}px`;
    lcdStyle.width = `${30 * sc}px`;
    lcdStyle.top = `${25 * sc}px`;
    lcdStyle.left = `${30 * sc}px`;
    lcdStyle.transition = "400ms ease";



    const [iconHolders, setIconHolders] = useState([])
    const [lcdShow, setLcdShow] = useState(chosenModel.lcdScreen ? true : false)
    const [hideAll, setHideAll] = useState(true)

    useEffect(() => {
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


    // useEffect(() => {
    //     const copyArr = iconHolders;
    //     copyArr.forEach((el) => {
    //             el.selectedDot = false;
    //             el.selected = false;
    //             el.selectedUp = false;
    //             el.selectedDown = false;
    //     })
    //     setIconHolders(copyArr)
    //     // console.log(dragging)
    //     // console.log(iconHolders)
    // }, [dragging, iconHolders]);

    // const handleDragTest = () => {//----------------------------------------------???
    //     const copyArr = iconHolders;
    //     copyArr.forEach((el) => {
    //         el.selectedDot = false;
    //         el.selected = false;
    //         el.selectedUp = false;
    //         el.selectedDown = false;
    //     })
    //     setIconHolders(copyArr)
    //     console.log("noi")

    //     setIconHolders(update(iconHolders, {
    //         [1]: {
    //             selected: {
    //                 $set: false,
    //             }
    //         },
    //     }));
    // };


    // const handleDrag = useCallback((index, item) => {
        // console.log("NOW")
        // setIconHolders(update(iconHolders, {
        //     [index]: {
        //         selectedDot: {
        //             $set: false,
        //         },
        //         selected: {
        //             $set: false,
        //         },
        //         selectedUp: {
        //             $set: false,
        //         },
        //         selectedDown: {
        //             $set: false,
        //         }
        //     },
        // }));
    // }, [iconHolders]);

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




    return (
        <div className="panelpreview_container">
            <div className="preview_container">
                <div className="preview_top">
                    <h2>PODGLĄD PANELU</h2>
                </div>
                <div className="panel_container">
                    <div className="resize_container" style={resizeStyle}>
                        <div className="panel_box" style={chosenModelStyle}>
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
                                                            // onDrag={(item) => handleDrag(index, item)}
                                                        />
                                                    </>}
                                            </div>
                                        )}
                                        {lcdShow && <div className="lcd" style={{ ...lcdStyle, borderColor: chosenColor.iconColor }} />}
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="preview_bottom">
                    <span>{chosenModel.type}</span>
                    <div className="scale_container">
                        <div className="scale_box">
                            <img src={Zoomout} alt="zoomout" className="scale_icon" onClick={handleZoomOut} />
                        </div>
                        <div className="scale_box">
                            <img src={Resize} alt="resize" className="scale_icon" onClick={handleResize} />

                        </div>
                        <div className="scale_box">
                            <img src={Zoomin} alt="zoomin" className="scale_icon" onClick={handleZoomIn} />

                        </div>
                    </div>
                    <span>RAL: {chosenColor.RAL}</span>
                </div>
            </div>
            <div className="preview_side">
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
