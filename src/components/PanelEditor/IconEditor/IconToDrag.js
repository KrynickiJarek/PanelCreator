import { memo, useEffect} from 'react';
import { useDrag } from 'react-dnd';
import "./IconEditor.scss"


export const IconToDrag = memo(function IconToDrag({ image, onDragging}) {

    const [{ isDragging, opacity, border }, drag] = useDrag(() => ({
        type: "icon",
        item: { image },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            opacity: monitor.isDragging() && 0.7,
            border: monitor.isDragging() && "3px solid rgb(236, 105, 92)",
        }),
    }), [image]);

    // useEffect(() => {
    //     if (isDragging) {
    //         onDragging(true)
    //     } else {
    //         onDragging(false)
    //     }
    // }, [isDragging]);




    return (
        <>
            <div className="icon_box" style={{ border }}>
                <div ref={drag} className="icon_drag">
                    <img src={image.default} alt="info" className="icon" width="40pt" height="40pt"
                        style={{ opacity }} />
                </div>
            </div>
        </>
    )
})