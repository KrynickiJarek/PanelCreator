import { memo, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import "./../IconHolder.scss"

export const ReDrag = memo(function ReDrag({ image, chosenColor, onReset, scale, onClickIcon }) {

    let styleScale={};
    styleScale.height = `${7.5 * scale}px`;
    styleScale.width =`${7.5 * scale}px`;

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

    // useEffect(() => {
    //     if (isDragging) {
    //         onClickIcon(false)
    //     } 
    // }, [isDragging, onClickIcon]);



    return (
            < img ref={drag} src={image.default} alt="ICON" className="icon"
                style={chosenColor.iconColor === "white" ? { ...styleScale, filter: "grayscale(100%) invert(1) brightness(10)" } 
                : { ...styleScale,filter: "grayscale(100%) brightness(0)" }} 
                onClick={onClickIcon}/>
    )
})