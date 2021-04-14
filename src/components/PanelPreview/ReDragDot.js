import { memo } from 'react';
import { useDrag } from 'react-dnd';


export const ReDragDot = memo(function ReDragDot({ image, chosenColor, onResetDot }) {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "icon",
        item: { image },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [image]);


    if (isDragging) {
        onResetDot(image)
    }

    return (
            < img ref={drag} src={image.default} alt="ICON" className="status_icon"
                style={chosenColor.iconColor === "white" ? { filter: "grayscale(100%) invert(1) brightness(10)" } : { filter: "grayscale(100%) brightness(0)" }} />
    )
})