
import { useState, useCallback, memo } from 'react';
import { NativeTypes } from 'react-dnd-html5-backend';
import { Dustbin } from './dustbin';
import { Box } from './box';
import { ItemTypes } from './ItemTypes';
import update from 'immutability-helper';

export const Container = memo(function Container() {
    const [dustbins, setDustbins] = useState(null);

    const importAll = (r) => {
        return r.keys().map(r);
    }
    const listOfIcons= importAll(require.context("../../../assets/icons/dom", true, /\.(svg)$/))
    const [boxes] = useState(listOfIcons);


    const handleDrop = useCallback((item) => {
        const { image } = item;
        setDustbins(image);
    }, [dustbins]);
    
    return (<div>
			<div style={{ overflow: 'hidden', clear: 'both' }}>
				<Dustbin lastDroppedItem={dustbins} onDrop={(item) => handleDrop(item)}/>
				<Dustbin lastDroppedItem={dustbins} onDrop={(item) => handleDrop(item)}/>
			</div>

			<div style={{ overflow: 'hidden', clear: 'both' }}>
				{boxes.map((image , index) => (<Box image = {image} key={index}/>))}
			</div>
		</div>);
});



// -------------

// import { useState, useCallback, memo } from 'react';
// import { NativeTypes } from 'react-dnd-html5-backend';
// import { Dustbin } from './dustbin';
// import { Box } from './box';
// import { ItemTypes } from './ItemTypes';
// import update from 'immutability-helper';

// export const Container = memo(function Container() {
//     const [dustbins, setDustbins] = useState([
//         { accepts: [ItemTypes.ICON], lastDroppedItem: null },
//         { accepts: [ItemTypes.ICON], lastDroppedItem: null },
//         { accepts: [ItemTypes.ICON], lastDroppedItem: null },
//     ]);

//     const importAll = (r) => {
//         return r.keys().map(r);
//     }
//     const listOfIcons= importAll(require.context("../../../assets/icons/dom", true, /\.(svg)$/))
//     const [boxes] = useState(listOfIcons);


//     const [droppedBoxNames, setDroppedBoxNames] = useState([]);

//     function isDropped(boxName) {
//         return droppedBoxNames.indexOf(boxName) > -1;
//     }
//     const handleDrop = useCallback((index, item) => {
//         const { image } = item;
//         setDroppedBoxNames(update(droppedBoxNames, image ? { $push: [image] } : { $push: [] }));
//         setDustbins(update(dustbins, {
//             [index]: {
//                 lastDroppedItem: {
//                     $set: image,
//                 },
//             },
//         }));
//     }, [droppedBoxNames, dustbins]);
    
//     return (<div>
// 			<div style={{ overflow: 'hidden', clear: 'both' }}>
// 				{dustbins.map(({ accepts, lastDroppedItem }, index) => (<Dustbin accept={accepts} lastDroppedItem={lastDroppedItem} onDrop={(item) => handleDrop(index, item)} key={index}/>))}
// 				{/* {dustbins.map(({ accepts, lastDroppedItem }, index) => (<Dustbin accept={accepts} lastDroppedItem={lastDroppedItem} onDrop={(icon) => handleDropIcon(icon)} key={index}/>))} */}
// 			</div>

// 			<div style={{ overflow: 'hidden', clear: 'both' }}>
// 				{boxes.map((image , index) => (<Box image = {image} name="ICON" type="ICON" isDropped={isDropped("ICON")} key={index}/>))}
// 			</div>
// 		</div>);
// });

