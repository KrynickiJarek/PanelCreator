import { memo } from 'react';
import { useDrop } from 'react-dnd';
import "./IconHolder.scss"

import Dot from "../../../assets/preview/dot.svg"
import Remove from "../../../assets/preview/remove.svg"

import { ReDragDot } from './ReDrag/ReDragDot';

export const IconHolderStatus = memo(function IconHolderStatus({ lastDroppedDot, onDropDot, chosenColor, onResetDot, show , scale}) {

    const [{ isOver, canDrop }, drop] = useDrop({
        accept: "icon",
        drop: onDropDot,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const isActive = isOver && canDrop;
    let styleDropping = {};
    let styleDroppingPulse = {};
    let styleArea = {};
    let styleDot = {};
    styleDot.height = `${1.25 * scale}px`;
    styleDot.width = `${1.25 * scale}px`;
    let styleScale = {};
    styleScale.height = `${2.5 * scale}px`;
    styleScale.width = `${2.5 * scale}px`;

  
    if (isActive) {
        if (chosenColor.hex !== "#2fa32c") {
            styleDropping = {
                backgroundColor: "rgb(40, 167, 69)",
            };
            styleDroppingPulse = {
                animation: "Ani 2s infinite",
                filter: "invert(34%) sepia(98%) saturate(353%) hue-rotate(70deg) brightness(87%) contrast(102%)"
            };
        } else {
            styleDropping = {
                backgroundColor: "rgb( 32, 114, 30)",
            };
            styleDroppingPulse = {
                animation: "Ani 2s infinite",
                filter: "invert(34%) sepia(98%) saturate(353%) hue-rotate(70deg) brightness(87%) contrast(102%)",

            };
        };
        styleArea = {
            transform: "scale(2,2)",
            zIndex: "3",
        }
    }
    else if ((canDrop && lastDroppedDot) || (canDrop && show)) {
        styleDropping = {
            // backgroundColor: "rgb(255, 193, 7)",
            backgroundColor: "rgb(236, 105, 92)",
        };
        styleDroppingPulse = {
            animation: "Ani 2s infinite",
        };
    }
    else if (canDrop && !lastDroppedDot) {
        styleDot = {
            // filter: "invert(85%) sepia(24%) saturate(5008%) hue-rotate(349deg) brightness(103%) contrast(108%)",
            filter: "invert(47%) sepia(92%) saturate(1130%) hue-rotate(326deg) brightness(100%) contrast(86%)",
            height : `${1.25 * scale}px`,
            width : `${1.25 * scale}px`,
        };
        styleDroppingPulse = {
            animation: "Ani 2s infinite",
            width: `${2.5 * scale}px`,
            height: `${2.5 * scale}px`,
        };
    }

    return (<div ref={drop} className="status_area" style={{...styleScale, ...styleArea, margin: `${1.65 * scale}px auto ${2.5 * scale}px`}}>
    {/* return (<div ref={drop} className="status_area" style={{...styleScale, ...styleArea, margin: "8px auto 12px"}}> */}
        <div className="status_area_dropping_pulse" style={styleDroppingPulse} />
        <div className="status_area_dropping" style={styleDropping} />
        {lastDroppedDot
            ? <ReDragDot image={lastDroppedDot.image} chosenColor={chosenColor} onResetDot={onResetDot} scale={scale}/>
            : (<img src={Dot} alt="dot" className="dot"
                style={chosenColor.iconColor === "white" ? { filter: "grayscale(100%) invert(1) brightness(10)", ...styleDot } 
                : { filter: "grayscale(100%) brightness(0)", ...styleDot }} />)}

        {(lastDroppedDot && isActive) &&
            (<img src={Remove} alt="remove" className="dot_remove" style={styleScale}/>)}
    </div>);
});



