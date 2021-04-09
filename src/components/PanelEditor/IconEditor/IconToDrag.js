import { memo } from 'react';
import { useDrag } from 'react-dnd';
import "./IconEditor.scss"


export const IconToDrag = memo(function IconToDrag({ image }) {

    const [{ opacity, boxShadow}, drag] = useDrag(() => ({
        type: "icon",
        item: { image },
        collect: (monitor) => ({
            opacity: monitor.isDragging() && 0.8,
            boxShadow: !!monitor.isDragging() && "inset 0px 0px 10px 5px rgba(0,0,0,0.5)",

        }),
    }), [image]);

    return (
        <>
            <div className="icon_box" style={{opacity, boxShadow}}>
                    <img ref={drag} src={image.default} alt="info" className="icon"/>
            </div>
        </>
    )
})