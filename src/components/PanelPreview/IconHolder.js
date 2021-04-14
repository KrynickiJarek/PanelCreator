import { memo, useState, useEffect } from 'react';
// import { memo, useState } from 'react';
import { useDrop } from 'react-dnd';

import Slash from "../../assets/preview/slash.svg"
import Holder from "../../assets/preview/holder.svg"
import Remove from "../../assets/preview/remove.svg"


import { StatusIconHolder } from './StatusIconHolder';
import { IconHolderSlashUp } from './IconHolderSlashUp';
import { IconHolderSlashDown } from './IconHolderSlashDown';

import { ReDrag } from './ReDrag';



export const IconHolder = memo(function IconHolder({
    chosenColor,
    lastDroppedDot, onDropDot,
    lastDroppedIcon, onDrop,
    lastDroppedSlashUp, onDropSlashUp,
    lastDroppedSlashDown, onDropSlashDown,
    onReset, onResetDot, onResetUp, onResetDown
}) {

    let warning = false


    // let show = false
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


    const isActive = isOver && canDrop;
    let styleDropping = {};
    let styleArea = {};
    // let styleHolder = {};
    // let styleSlash = {};
    if (isActive) {
        styleDropping = {
            backgroundColor: "rgba(75, 181, 67, 1)",
            border: "2px dotted rgba(75, 181, 67, 1)",
            animation: "spin 7s linear infinite"
        };
        styleArea = {
            transform: "scale(1.4,1.4)",
            zIndex: "3",
        };
        // styleSlash = {
        //     display: "none",
        // };
        warning = true;
    }
    else if (canDrop) {
        styleDropping = {
            backgroundColor: "rgba(240, 213, 0, 1)",
            border: "2px dotted rgba(240, 213, 0, 1)",
            animation: "spin 7s linear infinite"
        };

    }

    const [{ isOverToShow }, over] = useDrop({
        accept: "icon",
        drop: null,
        collect: (monitor) => ({
            isOverToShow: monitor.isOver(),
        }),
    });
    // if (isOverToShow) {
    //     styleHolder = {
    //         // display: "block",
    //     };
    //     styleSlash = {
    //         // display: "none",
    //     };
    //     // show=true
    // }

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


    let showNow = false
    if (isOverToShow && (lastDroppedSlashDown || lastDroppedSlashUp)){
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





    const handleUp = (income) => { //dwa sposoby przekazania zdarzenia przy up i down
        setUpActive(income)
    }


    return (
        <div ref={over} style={{ height: "100%" }}>
            <StatusIconHolder lastDroppedDot={lastDroppedDot} onDropDot={onDropDot} chosenColor={chosenColor} onResetDot={onResetDot} />
            <div ref={drop} className="icon_area" style={styleArea} >
                <div className="icon_area_dropping" style={styleDropping} />
                {(lastDroppedIcon) &&
                    <ReDrag image={lastDroppedIcon.image} chosenColor={chosenColor} onReset={onReset} />
                }
                {(!lastDroppedIcon && (show || showHolder)) &&
                    (<img src={Holder} alt="holder" className="holder"
                        // style={chosenColor.iconColor === "white" ? { ...styleHolder, filter: "grayscale(100%) invert(1) brightness(10)" } : { ...styleHolder, filter: "grayscale(100%) brightness(0)" }}
                        style={chosenColor.iconColor === "white" ? { filter: "grayscale(100%) invert(1) brightness(10)" } : { filter: "grayscale(100%) brightness(0)" }}
                    />)}
                {((lastDroppedSlashUp || lastDroppedSlashDown) && !show && !isActive) &&
                    (<img src={Slash} alt="slash" className="slash"
                        // style={chosenColor.iconColor === "white" ? { ...styleSlash, filter: "grayscale(100%) invert(1) brightness(10)" } : { ...styleSlash, filter: "grayscale(100%) brightness(0)" }}
                        style={chosenColor.iconColor === "white" ? { filter: "grayscale(100%) invert(1) brightness(10)" } : { filter: "grayscale(100%) brightness(0)" }}
                    />)}
                {(lastDroppedIcon && (upActive || downActive || isActive)) &&
                    (<img src={Remove} alt="remove" className="remove" />)}
            </div>
            <IconHolderSlashUp lastDroppedSlashUp={lastDroppedSlashUp} onDropSlashUp={onDropSlashUp} chosenColor={chosenColor} onUpActive={handleUp} 
            show={show} showNow={showNow} warning={warning} onResetUp={onResetUp} />

            <IconHolderSlashDown lastDroppedSlashDown={lastDroppedSlashDown} onDropSlashDown={onDropSlashDown} chosenColor={chosenColor} onDownActive={(income) => setDownActive(income)} 
            show={show} showNow={showNow}  warning={warning} onResetDown={onResetDown} />
        </div>
    );
});





// import { memo } from 'react';
// import { useDrop } from 'react-dnd';

// // const sc = 5;

// // const style = {
// // width: sc * 7.5 + "px",
// // height: sc * 7.5 + "px",
// // border: "1px dotted white",
// // margin: "0 auto"
// // };

// export const IconHolder = memo(function IconHolder({ lastDroppedIcon, onDrop, chosenColor, onCanDrop }) {
// // export const IconHolder = memo(function IconHolder({ lastDroppedIcon, onDrop, chosenColor}) {

//     const [{ isOver, canDrop }, drop] = useDrop({
//         accept: "icon",
//         drop: onDrop,
//         collect: (monitor) => ({
//             isOver: monitor.isOver(),
//             canDrop: monitor.canDrop(),
//         }),
//     });

//     const isActive = isOver && canDrop;
//     let styleDropping = {};
//     let styleArea = {};
//     if (isActive) {
//         styleDropping = {
//             // backgroundColor: "#4BB543",
//             backgroundColor: "rgba(75, 181, 67, 1)",
//             border: "2px dotted rgba(75, 181, 67, 1)",
//             zIndex: "2"
//         };
//         styleArea = {
//             // transform: "scale(1.4,1.4)",
//             transform: "scale(1.2,1.2)",
//             zIndex: "1",
//         }
//         onCanDrop(true);
//     }
//     else if (canDrop) {
//         styleDropping = {
//             // backgroundColor: "#F0D500",
//             backgroundColor: "rgba(240, 213, 0, 1)",
//             border: "2px dotted rgba(240, 213, 0, 1)",
//         };
//     }


//     return (<div ref={drop} className="icon_area" style={styleArea} >
//     {/* return (<div ref={drop} className="icon_area" style={styleArea} > */}
//         <div className="icon_area_dropping" style={styleDropping} />
//         {lastDroppedIcon &&
//             (<img src={lastDroppedIcon.image.default} alt="ICON" className="icon"
//                 style={chosenColor.iconColor === "white" ? { filter: "grayscale(100%) invert(1) brightness(10)" } : { filter: "grayscale(100%) brightness(0)" }}
//             />)}
//     </div>);
// });



