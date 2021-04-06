import { useState } from 'react';
import { useDrop } from 'react-dnd';

const sc = 5;


const style = {
    width: sc * 7.5 + "px",
    height: sc * 7.5 + "px",
    border: "1px dotted white",
    margin: "0 auto"
};

export const IconHolder = ({ draggedIcon , onDrop }) => {

    // const [chosenIcon, seChosenIcon] = useState(null)

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: "icon",
        drop: onDrop,
        // drop: console.log("draggedIcon 3 >>>" + draggedIcon),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));
    const isActive = canDrop && isOver;
    let backgroundColor = 'red';
    if (isActive) {
        backgroundColor = 'green';
    }
    else if (canDrop) {
        backgroundColor = 'blue';
    }
    return (<div ref={drop} role={'IconHolder'} style={{ ...style, backgroundColor }}>
        {/* {isActive ? 'Release to drop' : 'Drag a box here'} */}
        {isActive, draggedIcon && (<img src={draggedIcon.default} alt="ICON" />)}
        {/* {isActive, draggedIcon && console.log("draggedIcon >>>" + draggedIcon)} */}
    </div>);
};
