import { memo } from 'react';
import { useDrop } from 'react-dnd';
const style = {
    height: '12rem',
    width: '12rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
};

// const ItemTypes = {
//     ICON: "ICON"
//   }

export const Dustbin = memo(function Dustbin({ lastDroppedItem, onDrop }) {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: "icon",
        drop: onDrop,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });
    const isActive = isOver && canDrop;
    let backgroundColor = 'grey';
    if (isActive) {
        backgroundColor = 'green';
    }
    else if (canDrop) {
        backgroundColor = 'blue';
    }
    return (<div ref={drop} role="Dustbin" style={{ ...style, backgroundColor }}>
			{isActive, lastDroppedItem && (<img src={lastDroppedItem.default} alt="ICON"/>)}
		</div>);

});
