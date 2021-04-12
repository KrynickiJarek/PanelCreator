import { memo, useState } from 'react';
import { useDrag } from 'react-dnd';


export const ReDrag = memo(function ReDrag({ image, chosenColor }) {

    const [isDraged, setIsDraged] = useState(false)
    const [{ opacity }, drag] = useDrag(() => ({

        type: "icon",
        item: { image },
        end(image, monitor) {
            const dropResult = monitor.didDrop();
            if (image && dropResult) {
                setIsDraged(true)
            }
        },
        collect: (monitor) => ({
            opacity: monitor.isDragging() && 0.3,
        }),
    }), [image]);


    console.log(isDraged)

    return (
        <>
            {/* {( !isDraged && */}


                < img ref={drag} src={image.default} alt="ICON" className="icon"
                    style={chosenColor.iconColor === "white" ? { opacity, filter: "grayscale(100%) invert(1) brightness(10)" } : { opacity, filter: "grayscale(100%) brightness(0)" }} />
    

            {/* )} */}
        </>
    )
})