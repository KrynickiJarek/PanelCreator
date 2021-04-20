import { memo } from 'react';
import { useDrop } from 'react-dnd';
import "./PanelPreview.scss"
import Dot from "../../assets/preview/dot.svg"

import Remove from "../../assets/preview/remove.svg"
import { ReDragDot } from './ReDragDot';





export const StatusIconHolder = memo(function StatusIconHolder({ lastDroppedDot, onDropDot, chosenColor, onResetDot, show }) {

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
            backgroundColor: "rgb(255, 193, 7)",
        };
        styleDroppingPulse = {
            animation: "Ani 2s infinite",
        };
    }
    else if (canDrop && !lastDroppedDot) {
        styleDot = {
            filter: "invert(85%) sepia(24%) saturate(5008%) hue-rotate(349deg) brightness(103%) contrast(108%)"
        };
        styleDroppingPulse = {
            animation: "Ani 2s infinite",
            width: "12px",
            height: "12px",
        };
    }

    return (<div ref={drop} className="status_area" style={styleArea}>
        <div className="status_area_dropping_pulse" style={styleDroppingPulse} />
        <div className="status_area_dropping" style={styleDropping} />
        {lastDroppedDot
            ? <ReDragDot image={lastDroppedDot.image} chosenColor={chosenColor} onResetDot={onResetDot} />
            : (<img src={Dot} alt="dot" className="dot"
                style={chosenColor.iconColor === "white" ? { filter: "grayscale(100%) invert(1) brightness(10)", ...styleDot } : { filter: "grayscale(100%) brightness(0)", ...styleDot }} />)}

        {(lastDroppedDot && isActive) &&
            (<img src={Remove} alt="remove" className="dot_remove" />)}
    </div>);
});



