import { memo } from 'react';
import { useDrag } from 'react-dnd';


export const ReDrag = memo(function ReDrag({ image, chosenColor, onReset }) {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "icon",
        item: { image },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [image]);



    // let styleDrag = {};


    if (isDragging) {
        onReset(image)
        // styleDrag = {
            // filter: "invert(49%) sepia(48%) saturate(4810%) hue-rotate(190deg) brightness(101%) contrast(101%)",
            // backgroundColor: "rgba(255,255,255,1)"
        // };
    }



    return (
        // <div ref={drag} style={styleDrag} className="icon_drag">
            < img ref={drag} src={image.default} alt="ICON" className="icon"
                style={chosenColor.iconColor === "white" ? { filter: "grayscale(100%) invert(1) brightness(10)" } : { filter: "grayscale(100%) brightness(0)" }} />
                // style={{filter: "invert(49%) sepia(48%) saturate(4810%) hue-rotate(190deg) brightness(101%) contrast(101%)"}} />
        // </div>
    )
})