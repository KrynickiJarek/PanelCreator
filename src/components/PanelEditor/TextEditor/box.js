import { memo } from 'react';
import { useDrag } from 'react-dnd';



const style = {
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    cursor: 'move',
    float: 'left',
};
export const Box = memo(function Box({ image }) {


    const [{ opacity }, drag] = useDrag(() => ({
        type: "icon",
        item: { image }, // jak to jest niby przekazywane?
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    }), [image]);
    return (<div ref={drag} role="Box" style={{ ...style, opacity }}>
			{/* {isDropped ? <img src={image.default} alt="ICON"/> : <img src={image.default} alt="ICON"/> } */}
			<img src={image.default} alt="ICON"/> 
		</div>);
});


// import { memo } from 'react';
// import { useDrag } from 'react-dnd';



// const style = {
//     border: '1px dashed gray',
//     backgroundColor: 'white',
//     padding: '0.5rem 1rem',
//     marginRight: '1.5rem',
//     marginBottom: '1.5rem',
//     cursor: 'move',
//     float: 'left',
// };
// export const Box = memo(function Box({ image, name, type, isDropped }) {


//     const [{ opacity }, drag] = useDrag(() => ({
//         type,
//         item: { name },
//         collect: (monitor) => ({
//             opacity: monitor.isDragging() ? 0.4 : 1,
//         }),
//     }), [name, type]);
//     return (<div ref={drag} role="Box" style={{ ...style, opacity }}>
// 			{isDropped ? <img src={image.default} alt="ICON"/> : <img src={image.default} alt="ICON"/> }
// 		</div>);
// });



// ------------------

// import { memo } from 'react';
// import { useDrag } from 'react-dnd';

// import image from "../../../assets/icons/dom/barn.svg"


// const style = {
//     border: '1px dashed gray',
//     backgroundColor: 'white',
//     padding: '0.5rem 1rem',
//     marginRight: '1.5rem',
//     marginBottom: '1.5rem',
//     cursor: 'move',
//     float: 'left',
// };
// export const Box = memo(function Box({ name, type, isDropped }) {
//     const [{ opacity }, drag] = useDrag(() => ({
//         type,
//         item: { name },
//         collect: (monitor) => ({
//             opacity: monitor.isDragging() ? 0.4 : 1,
//         }),
//     }), [name, type]);
//     return (<div ref={drag} role="Box" style={{ ...style, opacity }}>
// 			{isDropped ? <img src={image} alt="info"/> : name}
// 		</div>);
// });
