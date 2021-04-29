import { memo, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import "./../IconHolder.scss"


export const ReDragUp = memo(function ReDragUp({ image, chosenColor, onResetUp, scale, onSelectUp }) {

    let styleScale = {};
    styleScale.height = `${7.5 * scale}px`;
    styleScale.width = `${7.5 * scale}px`;

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "icon",
        item: { image },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [image]);


    useEffect(() => {
        if (isDragging) {
            onResetUp(image)
        }
    }, [isDragging, onResetUp, image]);

    return (
        < img ref={drag} src={image.default} alt="ICON" className="slash_icon"
            style={chosenColor.iconColor === "white" ? { ...styleScale, filter: "grayscale(100%) invert(1) brightness(10)" } 
            : {...styleScale,  filter: "grayscale(100%) brightness(0)" }} 
            onClick={()=>onSelectUp()}/>
    )
})