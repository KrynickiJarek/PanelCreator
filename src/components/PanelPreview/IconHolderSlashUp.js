import { memo} from 'react';
import { useDrop } from 'react-dnd';
import UpHolder from "../../assets/preview/upholder.svg"
import Remove from "../../assets/preview/remove.svg"




export const IconHolderSlashUp = memo(function IconHolderSlashUp({ lastDroppedSlashUp, onDropSlashUp, chosenColor, onUpActive , show, warning }) {

    onUpActive(false) 

    const [{ isOver, canDrop }, drop] = useDrop({
        accept: "icon",
        drop: onDropSlashUp,
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
            animation: "spin 5s linear infinite"
        };
        styleArea = {
            transform: "translate(-85%,-85%) scale(1.6,1.6)",
            // zIndex: "2",
            zIndex: "3",
        };
        styleHolder = {
            display: "block",
        };
        onUpActive(true) 
    }
    else if (canDrop && show === true) {
        styleDropping = {
            backgroundColor: "rgba(240, 213, 0, 1)",
            border: "2px dotted rgba(240, 213, 0, 1)",
            animation: "spin 5s linear infinite"
        };
        styleArea = {
            transform: "translate(-85%,-85%)",
        };
        styleHolder = {
            display: "block",
        };
    }
    if (!lastDroppedSlashUp && !canDrop && !isActive) {
        styleArea = {
            transform: "translate(-35%,-35%) scale(0.01,0.01)",
        };
    }


    return (
        <div ref={drop} className="slash_up_area" style={styleArea}>
        {/* <div ref={drop}> */}
        {/* <> */}
            <div ref={drop} className="slash_icon_area_dropping" style={styleDropping} />
            {lastDroppedSlashUp &&
                (<img src={lastDroppedSlashUp.image.default} alt="ICON" className="slash_icon"
                    style={chosenColor.iconColor === "white" ? { filter: "grayscale(100%) invert(1) brightness(10)" } : { filter: "grayscale(100%) brightness(0)" }}
                />)}

            {!lastDroppedSlashUp &&
                (<img src={UpHolder} alt="upholder" className="slash_holder"
                    style={chosenColor.iconColor === "white" ? { ...styleHolder, filter: "grayscale(100%) invert(1) brightness(10)" } : { ...styleHolder, filter: "grayscale(100%) brightness(0)" }}
                />)}
            {(lastDroppedSlashUp&& warning) &&
                (<img src={Remove} alt="remove" className="slash_remove"/>)}
        </div>
    );
});
