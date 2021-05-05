import { memo, useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import "./../IconHolderSlash.scss"


export const ReDragUp = memo(function ReDragUp({ image, chosenColor, onResetUp, scale, onSelectUp, selectedUp, clear, rotateRight, rotateLeft, visual }) {

    let styleScale = {};
    styleScale.height = `${7.5 * scale}px`;
    styleScale.width = `${7.5 * scale}px`;

    const [turn, setTurn] = useState(0)
    let styleTurn = {};
    styleTurn.transform = `rotate(${turn}deg) scale(0.466)`

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

    useEffect(() => {
        if (clear) {
            if (selectedUp) {
                onResetUp(image)
            }
        }
    }, [selectedUp, clear, onResetUp, image]);

    useEffect(() => {
        if (selectedUp) {
            setTurn(prev => prev + 90)
        }
    }, [rotateRight, selectedUp]);

    useEffect(() => {
        if (selectedUp) {
            setTurn(prev => prev - 90)
        }
    }, [rotateLeft, selectedUp]);

    return (
        < img ref={drag} src={image.default} alt="ICON" className="slash_icon"
            style={!visual ? { ...styleScale, ...styleTurn, filter: "grayscale(100%) invert(1) brightness(10) drop-shadow( 0 0 4px rgba(255, 255, 255, 1))" }
                : chosenColor.iconColor === "white" ? { ...styleScale, ...styleTurn, filter: "grayscale(100%) invert(1) brightness(10)" }
                    : { ...styleScale, ...styleTurn, filter: "grayscale(100%) brightness(0)" }}
            onClick={() => onSelectUp()} />
    )
})