import { memo } from 'react';
import { useDrop } from 'react-dnd';
import DownHolder from "../../assets/preview/downholder.svg"
import Remove from "../../assets/preview/remove.svg"

import { ReDragDown } from './ReDragDown';



export const IconHolderSlashDown = memo(function IconHolderSlashDown({ lastDroppedSlashDown, onDropSlashDown, chosenColor, onDownActive, show, showNow, warning, onResetDown }) {

    onDownActive(false)

    const [{ isOver, canDrop }, drop] = useDrop({
        accept: "icon",
        drop: onDropSlashDown,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const isActive = isOver && canDrop;
    let styleDropping = {};
    let styleArea = {};
    let styleHolder = {};

    // if (isActive && show) {
    if ((isActive && show) || (isActive && showNow)) {
        styleDropping = {
            backgroundColor: "rgba(75, 181, 67, 1)",
            border: "2px dotted rgba(75, 181, 67, 1)",
            animation: "spin 5s linear infinite"

        };
        styleArea = {
            transform: "translate(100%,100%) scale(1.8,1.8)",//-----------------
            zIndex: "3",
        };
        styleHolder = {
            display: "block",
        };
        onDownActive(true)
    }
    // else if (canDrop && show) {
    else if ((canDrop && show) || (canDrop && showNow)) {
        styleDropping = {
            backgroundColor: "rgba(240, 213, 0, 1)",
            border: "2px dotted rgba(240, 213, 0, 1)",
            animation: "spin 5s linear infinite"
        };
        styleArea = {
            transform: "translate(100%,100%)",
        };
        styleHolder = {
            display: "block",
        };
    }
    // if (!lastDroppedSlashDown && !canDrop && !isActive) {
    if (!lastDroppedSlashDown && !show && !showNow && !isActive) {
        styleArea = {
            transform: "translate(35%,35%) scale(0.01,0.01)",
        };
    }


    return (
        <div ref={drop} className="slash_down_area" style={styleArea} >
            <div className="slash_icon_area_dropping" style={styleDropping} />
            {lastDroppedSlashDown &&
                <ReDragDown image={lastDroppedSlashDown.image} chosenColor={chosenColor} onResetDown={onResetDown} />
            }
            {!lastDroppedSlashDown &&
                (<img src={DownHolder} alt="downholder" className="slash_holder"
                    style={chosenColor.iconColor === "white" ? { ...styleHolder, filter: "grayscale(100%) invert(1) brightness(10)" } : { ...styleHolder, filter: "grayscale(100%) brightness(0)" }}
                />)}
            {(lastDroppedSlashDown && (warning || isActive)) &&
                (<img src={Remove} alt="remove" className="slash_remove" />)}
        </div>
    );
});
