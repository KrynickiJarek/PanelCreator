import { memo } from 'react';
import { useDrop } from 'react-dnd';

const sc = 5;

const style = {
    width: sc * 7.5 + "px",
    height: sc * 7.5 + "px",
    border: "1px dotted white",
    margin: "0 auto"
};

export const IconHolder = memo(function IconHolder({ lastDroppedItem , onDrop }) {

    const [{ isOver, canDrop }, drop] = useDrop({
        accept: "icon",
        drop: onDrop,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const isActive = isOver && canDrop;
    let backgroundColor = 'whitesmoke';
    if (isActive) {
        backgroundColor = 'darkgreen';
    }
    else if (canDrop) {
        backgroundColor = 'darkkhaki';
    }

    // return (<div ref={drop} role={'IconHolder'} style={{ ...style, backgroundColor }}>
    return (<div ref={drop} style={{ ...style, backgroundColor }}>
        {lastDroppedItem && (<img src={lastDroppedItem.image.default} alt="ICON" />)}
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

//     return (<div ref={drop} role={'IconHolder'} style={{ ...style, backgroundColor }}>
//         {lastDroppedItem && (<img src={lastDroppedItem.image.default} alt="ICON" />)}
//     </div>);
// });