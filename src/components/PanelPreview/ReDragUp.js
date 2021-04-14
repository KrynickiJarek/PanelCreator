import { memo } from 'react';
import { useDrag } from 'react-dnd';


export const ReDragUp = memo(function ReDragUp({ image, chosenColor, onResetUp }) {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "icon",
        item: { image },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [image]);


    if (isDragging) {
        onResetUp(image)
    }

    return (
            < img ref={drag} src={image.default} alt="ICON" className="slash_icon"
                style={chosenColor.iconColor === "white" ? { filter: "grayscale(100%) invert(1) brightness(10)" } : { filter: "grayscale(100%) brightness(0)" }} />
    )
})