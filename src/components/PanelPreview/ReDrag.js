import { memo, useEffect } from 'react';
import { useDrag } from 'react-dnd';


export const ReDrag = memo(function ReDrag({ image, chosenColor, onReset }) {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "icon",
        item: { image },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [image]);


    useEffect(() => {
        if (isDragging) {
            onReset(image)
        } 
    }, [isDragging, onReset, image]);



    return (
            < img ref={drag} src={image.default} alt="ICON" className="icon"
                style={chosenColor.iconColor === "white" ? { filter: "grayscale(100%) invert(1) brightness(10)" } : { filter: "grayscale(100%) brightness(0)" }} />
    )
})