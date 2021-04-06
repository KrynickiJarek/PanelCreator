import { memo } from 'react';
import { useDrag } from 'react-dnd';
import "./IconEditor.scss"



const style = {
    // border: '1px dashed gray',
    // backgroundColor: 'white',
    // padding: '0.5rem 1rem',
    // marginRight: '1.5rem',
    // marginBottom: '1.5rem',
    // cursor: 'move',
    // float: 'left',
};
// export const IconToDrag = memo(function IconToDrag({ image , onIconSet }) {
export const IconToDrag = memo(function IconToDrag({ image}) {

    // const handleIconSet = () =>{
    //     onIconSet(image.default)
    // }


    const [{ opacity }, drag] = useDrag(() => ({
        type: "icon",
        item: { image },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    }), [image]);

    
    return (<div ref={drag} role="IconToDrag" style={{ ...style, opacity }}>
			{/* {isDropped ? <img src={image.default} alt="ICON"/> : <img src={image.default} alt="ICON"/> } */}
            {/* <img src={image.default} alt="info" className="icon" onMouseOver={handleIconSet}/> */} 
            <img src={image.default} alt="info" className="icon"/>
		</div>);
});