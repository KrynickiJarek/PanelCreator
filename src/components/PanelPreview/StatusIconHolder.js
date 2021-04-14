import { memo } from 'react';
import { useDrop } from 'react-dnd';
import "./PanelPreview.scss"
import Dot from "../../assets/preview/dot.svg"

import Remove from "../../assets/preview/remove.svg"
import { ReDragDot } from './ReDragDot';





export const StatusIconHolder = memo(function StatusIconHolder({ lastDroppedDot, onDropDot, chosenColor, onResetDot }) {

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
    let styleArea = {};
    if (isActive) {
        styleDropping = {
            backgroundColor: "rgba(75, 181, 67, 1)",
            border: "2px dotted rgba(75, 181, 67, 1)",
            animation: "spin 5s linear infinite"

        };
        styleArea = {
            transform: "scale(1.8,1.8)",
            zIndex: "3",
        }
    }
    else if (canDrop) {
        styleDropping = {
            backgroundColor: "rgba(240, 213, 0, 1)",
            border: "2px dotted rgba(240, 213, 0, 1)",
            animation: "spin 5s linear infinite"
        };
    }

    return (<div ref={drop} className="status_area" style={styleArea}>
        <div className="status_area_dropping" style={styleDropping} />
        {lastDroppedDot
            ? <ReDragDot image={lastDroppedDot.image} chosenColor={chosenColor} onResetDot={onResetDot} />
            : (<img src={Dot} alt="dot" className="dot"
                style={chosenColor.iconColor === "white" ? { filter: "grayscale(100%) invert(1) brightness(10)" } : { filter: "grayscale(100%) brightness(0)" }} />)}

        {(lastDroppedDot && isActive) &&
            (<img src={Remove} alt="remove" className="dot_remove" />)}
    </div>);
});



