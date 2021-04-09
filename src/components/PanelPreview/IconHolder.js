import { memo } from 'react';
import { useDrop } from 'react-dnd';

// const sc = 5;

// const style = {
// width: sc * 7.5 + "px",
// height: sc * 7.5 + "px",
// border: "1px dotted white",
// margin: "0 auto"
// };

export const IconHolder = memo(function IconHolder({ lastDroppedIcon, onDrop, chosenColor }) {

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
            // backgroundColor: "#4BB543",
            backgroundColor: "rgba(75, 181, 67, 1)",
            border: "2px dotted rgba(75, 181, 67, 1)",
            zIndex: "2"
        };
        styleArea = {
            transform: "scale(1.4,1.4)",
            zIndex: "1",
        }
    }
    else if (canDrop) {
        styleDropping = {
            // backgroundColor: "#F0D500",
            backgroundColor: "rgba(240, 213, 0, 0.7)",
            border: "2px dotted rgba(240, 213, 0, 0.7)",
        };
    }


    return (<div ref={drop} className="icon_area" style={styleArea} >
        <div className="icon_area_dropping" style={styleDropping} />
        {lastDroppedIcon &&
            (<img src={lastDroppedIcon.image.default} alt="ICON" className="icon"
                style={chosenColor.iconColor === "white" ? { filter: "grayscale(100%) invert(1) brightness(10)" } : { filter: "grayscale(100%) brightness(0)" }}
            />)}
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
