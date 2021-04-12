import { memo } from 'react';
import { useDrop } from 'react-dnd';
import "./PanelPreview.scss"
import Dot from "../../assets/preview/dot.svg"



// const sc = 5;



export const StatusIconHolder = memo(function StatusIconHolder({ lastDroppedDot, onDrop, chosenColor }) {

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
    if (isActive) {
        styleDropping = {
            backgroundColor: "rgba(75, 181, 67, 1)",
            border: "2px dotted rgba(75, 181, 67, 1)",
            animation: "spin 5s linear infinite"

        };
        styleArea = {
            transform: "scale(1.6,1.6)",
            // zIndex: "2",
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
            ? (<img src={lastDroppedDot.image.default} alt="ICON" className="status_icon"
                style={chosenColor.iconColor === "white" ? { filter: "grayscale(100%) invert(1) brightness(10)" } : { filter: "grayscale(100%) brightness(0)" }} />)
            : (<img src={Dot} alt="dot" className="dot"
                style={chosenColor.iconColor === "white" ? { filter: "grayscale(100%) invert(1) brightness(10)" } : { filter: "grayscale(100%) brightness(0)" }} />)}
    </div>);
});



