import { memo } from 'react';
import { useDrop } from 'react-dnd';
import UpHolder from "../../assets/preview/upholder.svg"
import Remove from "../../assets/preview/remove.svg"

import { ReDragUp } from './ReDragUp';



export const IconHolderSlashUp = memo(function IconHolderSlashUp({ lastDroppedSlashUp, onDropSlashUp, chosenColor, onUpActive, show, showNow, warning, onResetUp }) {

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


    // if (isActive && show) {
    if ((isActive && show)||(isActive && showNow)) {
        styleDropping = {
            backgroundColor: "rgba(75, 181, 67, 1)",
            border: "2px dotted rgba(75, 181, 67, 1)",
            animation: "spin 5s linear infinite"
        };
        styleArea = {
            transform: "translate(-100%,-100%) scale(1.8,1.8)",
            zIndex: "3",
        };
        styleHolder = {
            display: "block",
        };
        onUpActive(true)
    }
    // else if (canDrop && show) {
    else if ((canDrop && show)||(canDrop && showNow)) {
        styleDropping = {
            backgroundColor: "rgba(240, 213, 0, 1)",
            border: "2px dotted rgba(240, 213, 0, 1)",
            animation: "spin 5s linear infinite"
        };
        styleArea = {
            transform: "translate(-100%,-100%)",
        };
        styleHolder = {
            display: "block",
        };
    }

    // if (!lastDroppedSlashUp && !canDrop && !isActive) {
    if (!lastDroppedSlashUp && !show && !showNow && !isActive) {
        styleArea = {
            transform: "translate(-35%,-35%) scale(0.01,0.01)",
        };
    }


    return (
        <div ref={drop} className="slash_up_area" style={styleArea}>
            <div ref={drop} className="slash_icon_area_dropping" style={styleDropping} />
            {lastDroppedSlashUp &&
                <ReDragUp image={lastDroppedSlashUp.image} chosenColor={chosenColor} onResetUp={onResetUp} />
            }
            {!lastDroppedSlashUp &&
                (<img src={UpHolder} alt="upholder" className="slash_holder"
                    style={chosenColor.iconColor === "white" ? { ...styleHolder, filter: "grayscale(100%) invert(1) brightness(10)" } : { ...styleHolder, filter: "grayscale(100%) brightness(0)" }}
                />)}
            {(lastDroppedSlashUp && (warning || isActive)) &&
                (<img src={Remove} alt="remove" className="slash_remove" />)}
        </div>
    );
});


// import { memo } from 'react';
// import { useDrop } from 'react-dnd';
// import UpHolder from "../../assets/preview/upholder.svg"
// import Remove from "../../assets/preview/remove.svg"

// import { ReDragUp } from './ReDragUp';



// export const IconHolderSlashUp = memo(function IconHolderSlashUp({ lastDroppedSlashUp, onDropSlashUp, chosenColor, onUpActive, show, warning, onResetUp }) {

//     onUpActive(false)

//     const [{ isOver, canDrop }, drop] = useDrop({
//         accept: "icon",
//         drop: onDropSlashUp,
//         collect: (monitor) => ({
//             isOver: monitor.isOver(),
//             canDrop: monitor.canDrop(),
//         }),
//     });

//     const isActive = isOver && canDrop;
//     let styleDropping = {};
//     let styleArea = {};
//     let styleHolder = {};


//     if (isActive && show) {
//         styleDropping = {
//             backgroundColor: "rgba(75, 181, 67, 1)",
//             border: "2px dotted rgba(75, 181, 67, 1)",
//             animation: "spin 5s linear infinite"
//         };
//         styleArea = {
//             // transform: "translate(-85%,-85%) scale(1.6,1.6)",
//             transform: "translate(-100%,-100%) scale(1.8,1.8)",
//             zIndex: "3",
//         };
//         styleHolder = {
//             display: "block",
//         };
//         onUpActive(true)
//     }
//     else if (canDrop && show) {
//         styleDropping = {
//             backgroundColor: "rgba(240, 213, 0, 1)",
//             border: "2px dotted rgba(240, 213, 0, 1)",
//             animation: "spin 5s linear infinite"
//         };
//         styleArea = {
//             // transform: "translate(-85%,-85%)",
//             transform: "translate(-100%,-100%)",
//         };
//         styleHolder = {
//             display: "block",
//         };
//     }

//     if (!lastDroppedSlashUp && !canDrop && !isActive) {
//         styleArea = {
//             transform: "translate(-35%,-35%) scale(0.01,0.01)",
//         };
//     }


//     return (
//         <div ref={drop} className="slash_up_area" style={styleArea}>
//             <div ref={drop} className="slash_icon_area_dropping" style={styleDropping} />
//             {lastDroppedSlashUp &&
//                 <ReDragUp image={lastDroppedSlashUp.image} chosenColor={chosenColor} onResetUp={onResetUp} />
//             }
//             {!lastDroppedSlashUp &&
//                 (<img src={UpHolder} alt="upholder" className="slash_holder"
//                     style={chosenColor.iconColor === "white" ? { ...styleHolder, filter: "grayscale(100%) invert(1) brightness(10)" } : { ...styleHolder, filter: "grayscale(100%) brightness(0)" }}
//                 />)}
//             {(lastDroppedSlashUp && (warning||isActive)) &&
//                 (<img src={Remove} alt="remove" className="slash_remove" />)}
//         </div>
//     );
// });
