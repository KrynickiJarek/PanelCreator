import { memo } from 'react';
import { useDrop } from 'react-dnd';
import DownHolder from "../../assets/preview/downholder.svg"
import Remove from "../../assets/preview/remove.svg"




export const IconHolderSlashDown = memo(function IconHolderSlashDown({ lastDroppedSlashDown, onDropSlashDown, chosenColor, onDownActive, show, warning }) {

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

    if (isActive && show === true) {
        styleDropping = {
            backgroundColor: "rgba(75, 181, 67, 1)",
            border: "2px dotted rgba(75, 181, 67, 1)",
        };
        styleArea = {
            transform: "translate(85%,85%) scale(1.6,1.6)",
            zIndex: "2",
        };
        styleHolder = {
            display: "block",
        };
        onDownActive(true) 
    }
    else if (canDrop && show === true) {
        styleDropping = {
            backgroundColor: "rgba(240, 213, 0, 1)",
            border: "2px dotted rgba(240, 213, 0, 1)",
        };
        styleArea = {
            transform: "translate(85%,85%)",
        };
        styleHolder = {
            display: "block",
        };
    }


    return (
        <div ref={drop} className="slash_down_area" style={styleArea} >


            <div className="slash_icon_area_dropping" style={styleDropping} />
            {lastDroppedSlashDown &&
                (<img src={lastDroppedSlashDown.image.default} alt="ICON" className="slash_icon"
                    style={chosenColor.iconColor === "white" ? { filter: "grayscale(100%) invert(1) brightness(10)" } : { filter: "grayscale(100%) brightness(0)" }}
                />)}

            {!lastDroppedSlashDown &&
                (<img src={DownHolder} alt="downholder" className="slash_holder"
                    style={chosenColor.iconColor === "white" ? { ...styleHolder, filter: "grayscale(100%) invert(1) brightness(10)" } : { ...styleHolder, filter: "grayscale(100%) brightness(0)" }}
                />)}
            {(lastDroppedSlashDown && warning) &&
                (<img src={Remove} alt="remove" className="slash_remove"/>)}
        </div>
    );
});
