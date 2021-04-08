import { memo } from 'react';
import { useDrop } from 'react-dnd';
import "./PanelPreview.scss"


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
    let style = {};
    let style2 = {};
    if (isActive) {
        style = {
            backgroundColor: "#4BB543",
            border: "2px dotted #4BB543",
            width: "400%",
            height: "400%",
            zIndex: "999"

        };
        style2 = {
            transform: "scale(2,2)",
            zIndex: "999"
        }
    }
    else if (canDrop) {
        style = {
            backgroundColor: "#F0D500",
            border: "2px dotted #F0D500",
        };
    }

    return (<div ref={drop} className="status_area">
        <div className="status_area_dropping" style={style} />
        {lastDroppedDot
            ? (<img src={lastDroppedDot.image.default} alt="ICON" className="status_icon" 
                style={ chosenColor.iconColor === "white" ? {...style2, filter: "grayscale(100%) invert(1) brightness(10)" } : { ...style2, filter: "grayscale(100%) brightness(0)" }} />)
            : (<div className="dot" style={{ ...style2, backgroundColor: chosenColor.iconColor }} />)}
    </div>);
});





// import { memo } from 'react';
// import { useDrop } from 'react-dnd';

// const sc = 5;

// const style = {
//     width: sc * 7.5 + "px",
//     height: sc * 7.5 + "px",
//     border: "1px dotted white",
//     margin: "0 auto"
// };

// export const IconHolder = memo(function IconHolder({ lastDroppedItem , onDrop }) {

//     const [{ isOver, canDrop }, drop] = useDrop({
//         accept: "icon",
//         drop: onDrop,
//         collect: (monitor) => ({
//             isOver: monitor.isOver(),
//             canDrop: monitor.canDrop(),
//         }),
//     });

//     const isActive = isOver && canDrop;
//     let backgroundColor = 'whitesmoke';
//     if (isActive) {
//         backgroundColor = 'darkgreen';
//     }
//     else if (canDrop) {
//         backgroundColor = 'darkkhaki';
//     }

//     // return (<div ref={drop} role={'IconHolder'} style={{ ...style, backgroundColor }}>
//     return (<div ref={drop} style={{ ...style, backgroundColor }}>
//         {lastDroppedItem && (<img src={lastDroppedItem.image.default} alt="ICON" />)}
//     </div>);
// });
