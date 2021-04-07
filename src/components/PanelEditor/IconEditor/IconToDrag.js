import { memo } from 'react';
import { useDrag } from 'react-dnd';
import "./IconEditor.scss"

const style = {
};
export const IconToDrag = memo(function IconToDrag({ image}) {

    const [{ opacity }, drag] = useDrag(() => ({
        type: "icon",
        item: { image },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    }), [image]);

    
    // return (<div ref={drag} role="IconToDrag" style={{ ...style, opacity }}>
    return (<div ref={drag}  style={{ ...style, opacity }}>
            <img src={image.default} alt="info" className="icon"/>
		</div>);
});