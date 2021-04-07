import { useState, useCallback, memo } from 'react';
import "./PanelPreview.scss"

import { IconHolder } from './IconHolder';
import update from 'immutability-helper';

export const PanelPreview = memo(function MainCreator({ chosenModel, chosenColor }) {

    const sc = 5;

    const chosenModelStyle = {};
    chosenModelStyle.backgroundColor = chosenColor.hex;
    chosenModelStyle.height = `${parseInt(chosenModel.height) * sc}px`;
    chosenModelStyle.width = `${parseInt(chosenModel.width) * sc}px`;

    const contentStyle = {};
    contentStyle.height = `${parseInt(chosenModel.height) * sc - (chosenModel.marginTopBotton * 2 * sc)}px`;
    contentStyle.width = `${parseInt(chosenModel.width) * sc - (chosenModel.marginLeftRight * 2 * sc)}px`;
    contentStyle.margin = `${chosenModel.marginTopBotton * sc}px ${chosenModel.marginLeftRight * sc}px`

        const [iconHolders, setIconHolders] = useState([
        { flag: 1, lastDroppedItem: null },
        { flag: 1, lastDroppedItem: null },
        { flag: 1, lastDroppedItem: null },
        { flag: 1, lastDroppedItem: null },
        { flag: 1, lastDroppedItem: null },
        { flag: 1, lastDroppedItem: null },
        { flag: 1, lastDroppedItem: null },
        { flag: 1, lastDroppedItem: null },
        { flag: 1, lastDroppedItem: null }
    ]);
    const [droppedIcons, setDroppedIcons] = useState([]);
    // function isDropped(icon) {
        // return droppedIcons.indexOf(icon) > -1;
    // }
    const handleDrop = useCallback((index, item) => {
        const { image } = item;
        setDroppedIcons(update(droppedIcons, image ? { $push: [image] } : { $push: [] }));
        setIconHolders(update(iconHolders, {
            [index]: {
                lastDroppedItem: {
                    $set: item,
                },
            },
        }));
    }, [droppedIcons, iconHolders]);


    return (
        <>
            <div className="preview_container">
                <h2>Podgląd panelu</h2>

                <div style={{ overflow: 'hidden', clear: 'both' }}>
                </div>


                <div className="panel_box"
                    style={chosenModelStyle}>
                    <div className="panel_content" style={contentStyle}>
                        {iconHolders.map(({ flag, lastDroppedItem }, index) =>
                            <div key={index}
                                className={(iconHolders.length <= 9) ? "cell cell_dot9" : "cell cell_dot18"}>
                                {flag === 1 &&
                                    <>
                                        <div className="dot" style={{ backgroundColor: chosenColor.iconColor }} />
                                        <IconHolder lastDroppedItem={lastDroppedItem} onDrop={(item) => handleDrop(index, item)} />
                                    </>} 
                             </div>
                        )}
                    </div>
                    {chosenModel.lcdScreen && <div className="lcd" style={{ borderColor: chosenColor.iconColor }} />}
                </div>

                <div className="panel_info" style={{ width: parseInt(chosenModel.width) * sc }}>
                    <span>{chosenModel.type}</span>
                    <span>RAL: {chosenColor.RAL}</span>
                </div>
            </div>
        </>
    );
});

export default PanelPreview;


// import { useState, useCallback, memo } from 'react';
// import "./PanelPreview.scss"

// import { IconHolder } from './IconHolder';
// import update from 'immutability-helper';

// export const PanelPreview = memo(function MainCreator({ chosenModel, chosenColor }) {

//     const sc = 5;

//     const chosenModelStyle = {};
//     chosenModelStyle.backgroundColor = chosenColor.hex;
//     chosenModelStyle.height = `${parseInt(chosenModel.height) * sc}px`;
//     chosenModelStyle.width = `${parseInt(chosenModel.width) * sc}px`;

//     const contentStyle = {};
//     contentStyle.height = `${parseInt(chosenModel.height) * sc - (chosenModel.marginTopBotton * 2 * sc)}px`;
//     contentStyle.width = `${parseInt(chosenModel.width) * sc - (chosenModel.marginLeftRight * 2 * sc)}px`;
//     contentStyle.margin = `${chosenModel.marginTopBotton * sc}px ${chosenModel.marginLeftRight * sc}px`

//         const [iconHolders, setIconHolders] = useState([
//         { flag: 1, lastDroppedItem: null },
//         { flag: 1, lastDroppedItem: null },
//         { flag: 1, lastDroppedItem: null },
//         { flag: 1, lastDroppedItem: null },
//         { flag: 1, lastDroppedItem: null },
//         { flag: 1, lastDroppedItem: null },
//         { flag: 1, lastDroppedItem: null },
//         { flag: 1, lastDroppedItem: null },
//         { flag: 1, lastDroppedItem: null }
//     ]);
//     const [droppedBoxNames, setDroppedBoxNames] = useState([]);
//     function isDropped(boxName) {
//         return droppedBoxNames.indexOf(boxName) > -1;
//     }
//     const handleDrop = useCallback((index, item) => {
//         const { name } = item;
//         setDroppedBoxNames(update(droppedBoxNames, name ? { $push: [name] } : { $push: [] }));
//         setIconHolders(update(iconHolders, {
//             [index]: {
//                 lastDroppedItem: {
//                     $set: item,
//                 },
//             },
//         }));
//     }, [droppedBoxNames, iconHolders]);


//     return (
//         <>
//             <div className="preview_container">
//                 <h2>Podgląd panelu</h2>

//                 <div style={{ overflow: 'hidden', clear: 'both' }}>
//                 </div>


//                 <div className="panel_box"
//                     style={chosenModelStyle}>
//                     <div className="panel_content" style={contentStyle}>
//                         {iconHolders.map(({ flag, lastDroppedItem }, index) =>
//                             <div key={index}
//                                 className={(iconHolders.length <= 9) ? "cell cell_dot9" : "cell cell_dot18"}>
//                                 {flag === 1 &&
//                                     <>
//                                         <div className="dot" style={{ backgroundColor: chosenColor.iconColor }} />
//                                         <IconHolder lastDroppedItem={lastDroppedItem} onDrop={(item) => handleDrop(index, item)} />
//                                     </>} 
//                              </div>
//                         )}
//                     </div>
//                     {chosenModel.lcdScreen && <div className="lcd" style={{ borderColor: chosenColor.iconColor }} />}
//                 </div>

//                 <div className="panel_info" style={{ width: parseInt(chosenModel.width) * sc }}>
//                     <span>{chosenModel.type}</span>
//                     <span>RAL: {chosenColor.RAL}</span>
//                 </div>
//             </div>
//         </>
//     );
// });

// export default PanelPreview;

// import { useState, useCallback, memo } from 'react';
// import "./PanelPreview.scss"

// import { IconHolder } from './IconHolder';
// import update from 'immutability-helper';
// import { DndProvider } from 'react-dnd'  //usuń tutaj i w return, albo w MainCreator
// import { HTML5Backend } from 'react-dnd-html5-backend'

// export const PanelPreview = memo(function MainCreator({ chosenModel, chosenColor }) {
//     // export const PanelPreview = memo(function MainCreator({ chosenModel, chosenColor, draggedIcon, onDrop }) { //niepotrzebne draggedIcon i onDrop
//    // const PanelPreview = ({ chosenModel, chosenColor, draggedIcon, onDrop }) => {

//     const sc = 5;

//     const chosenModelStyle = {};
//     chosenModelStyle.backgroundColor = chosenColor.hex;
//     chosenModelStyle.height = `${parseInt(chosenModel.height) * sc}px`;
//     chosenModelStyle.width = `${parseInt(chosenModel.width) * sc}px`;

//     const contentStyle = {};
//     contentStyle.height = `${parseInt(chosenModel.height) * sc - (chosenModel.marginTopBotton * 2 * sc)}px`;
//     contentStyle.width = `${parseInt(chosenModel.width) * sc - (chosenModel.marginLeftRight * 2 * sc)}px`;
//     contentStyle.margin = `${chosenModel.marginTopBotton * sc}px ${chosenModel.marginLeftRight * sc}px`

//     // ----
//     // const iconHolderArray = [];
//     // chosenModel.dotLocation.forEach((el, i) => {
//     // iconHolderArray.push({ flag: el, lastDroppedIcon: null })
//     // });

//     // const [iconHolders, setIconHolders] = useState(iconHolderArray);
//     const [iconHolders, setIconHolders] = useState([
//         { flag: 1, lastDroppedIcon: null },
//         { flag: 1, lastDroppedIcon: null },
//         { flag: 1, lastDroppedIcon: null },
//         { flag: 1, lastDroppedIcon: null },
//         { flag: 1, lastDroppedIcon: null },
//         { flag: 1, lastDroppedIcon: null },
//         { flag: 1, lastDroppedIcon: null },
//         { flag: 1, lastDroppedIcon: null },
//         { flag: 1, lastDroppedIcon: null }
//     ]);

//     const [droppedIcons, setDroppedIcons] = useState([]);

//     // function isDropped(icon) {
//     //     return droppedIcons.indexOf(icon) > -1;
//     // }
//     const handleDrop = useCallback((index, item) => {
//         const { image } = item;
//         setDroppedIcons(update(droppedIcons, image ? { $push: [image] } : { $push: [] }));
//         // setDroppedIcons(update(droppedIcons, image.default ? { $push: [image.default] } : { $push: [] }));
//         setIconHolders(update(iconHolders, {
//             [index]: {
//                 lastDroppedIcon: {
//                     $set: item,
//                     // $set: item.image.default,
//                 },
//             },
//         }));
//         // console.log(droppedIcons);
//         // console.log(iconHolders);
//     }, [droppedIcons, iconHolders]);

//     console.log(iconHolders);
//     console.log(droppedIcons);




//     return (
//         // <DndProvider backend={HTML5Backend}>
//             <div className="preview_container">
//                 <h2>Podgląd panelu</h2>

//                 <div style={{ overflow: 'hidden', clear: 'both' }}>
//                 </div>


//                 <div className="panel_box"
//                     style={chosenModelStyle}>
//                     <div className="panel_content" style={contentStyle}>
//                         {iconHolders.map(({ flag, lastDroppedIcon }, index) =>
//                             <div key={index}
//                                 className={(iconHolders.length <= 9) ? "cell cell_dot9" : "cell cell_dot18"}>
//                                 {flag === 1 &&
//                                     <>
//                                         <div className="dot" style={{ backgroundColor: chosenColor.iconColor }} />
//                                         {/* <IconHolder lastDroppedIcon={lastDroppedIcon} onDrop={onDrop} /> */}
//                                         <IconHolder lastDroppedIcon={lastDroppedIcon} onDrop={(item) => handleDrop(index, item)} />
//                                     </>}
//                             </div>
//                         )}
//                     </div>
//                     {chosenModel.lcdScreen && <div className="lcd" style={{ borderColor: chosenColor.iconColor }} />}
//                 </div>

//                 <div className="panel_info" style={{ width: parseInt(chosenModel.width) * sc }}>
//                     <span>{chosenModel.type}</span>
//                     <span>RAL: {chosenColor.RAL}</span>
//                 </div>
//             </div>
//         // </DndProvider>
//     );
// });

// export default PanelPreview;



// import React from 'react';
// import "./PanelPreview.scss"

// import { IconHolder } from './IconHolder';



// const PanelPreview = ({ chosenModel, chosenColor, draggedIcon, onDrop}) => {

//     const sc = 5;

//     const chosenModelStyle = {};
//     chosenModelStyle.backgroundColor = chosenColor.hex;
//     chosenModelStyle.height = `${parseInt(chosenModel.height) * sc}px`;
//     chosenModelStyle.width = `${parseInt(chosenModel.width) * sc}px`;

//     const contentStyle = {};
//     contentStyle.height = `${parseInt(chosenModel.height) * sc - (chosenModel.marginTopBotton * 2 * sc)}px`;
//     contentStyle.width = `${parseInt(chosenModel.width) * sc - (chosenModel.marginLeftRight * 2 * sc)}px`;
//     contentStyle.margin = `${chosenModel.marginTopBotton * sc}px ${chosenModel.marginLeftRight * sc}px`


//     return (
//         <div className="preview_container">
//             <h2>Podgląd panelu</h2>

//             <div style={{ overflow: 'hidden', clear: 'both' }}>
//             </div>


//             <div className="panel_box"
//                 style={chosenModelStyle}>
//                 <div className="panel_content" style={contentStyle}>
//                     {chosenModel.dotLocation.map((cell, i) =>
//                         <div key={i}
//                             className={(chosenModel.dotLocation.length <= 9) ? "cell cell_dot9" : "cell cell_dot18"}>
//                             {cell === 1 &&
//                                 <>
//                                     <div className="dot" style={{ backgroundColor: chosenColor.iconColor }} />
//                                     <IconHolder draggedIcon={draggedIcon} onDrop={onDrop}/>
//                                     {/* <div className="icon_area" style={{ borderColor: chosenColor.iconColor }} /> */}
//                                 </>}
//                         </div>
//                     )}
//                 </div>
//                 {chosenModel.lcdScreen && <div className="lcd" style={{ borderColor: chosenColor.iconColor }} />}
//             </div>

//             <div className="panel_info" style={{ width: parseInt(chosenModel.width) * sc }}>
//                 <span>{chosenModel.type}</span>
//                 <span>RAL: {chosenColor.RAL}</span>
//             </div>
//         </div>
//     );
// };

// export default PanelPreview;
