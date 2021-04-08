import { useState, useEffect, useCallback, memo } from 'react';
import "./PanelPreview.scss"

import { IconHolder } from './IconHolder';
import { StatusIconHolder } from './StatusIconHolder';
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

    const [iconHolders, setIconHolders] = useState([])

    useEffect(() => {
    const tempArr = [];
    chosenModel.dotLocation.forEach(element => {
        tempArr.push({ flag: element, lastDroppedIcon: null, lastDroppedDot: null  })
    });
    setIconHolders(tempArr);
}, [chosenModel]);


const [droppedIcons, setDroppedIcons] = useState([]);
// function isDropped(icon) { //feedback dla ikony, że już jest dropnięta. Zbędne? 
// return droppedIcons.indexOf(icon) > -1;
// }
const handleDropDot = useCallback((index, item) => {
    const { image } = item;
    setDroppedIcons(update(droppedIcons, image ? { $push: [image] } : { $push: [] }));
    setIconHolders(update(iconHolders, {
        [index]: {
            lastDroppedDot: {
                $set: item,
            }
            
        },
    }));
}, [droppedIcons, iconHolders]);

const handleDropIcon = useCallback((index, item) => {
    const { image } = item;
    setDroppedIcons(update(droppedIcons, image ? { $push: [image] } : { $push: [] }));
    setIconHolders(update(iconHolders, {
        [index]: {
            lastDroppedIcon: {
                $set: item,
            }
            
        },
    }));
}, [droppedIcons, iconHolders]);

return (
    <>
        <div className="preview_container">
            <h2>Podgląd panelu</h2>
            <div className="panel_box"
                style={chosenModelStyle}>
                <div className="panel_content" style={contentStyle}>
                    {iconHolders.map(({ flag, lastDroppedIcon, lastDroppedDot }, index) =>
                        <div key={index}
                            className={(iconHolders.length <= 9) ? "cell cell_dot9" : "cell cell_dot18"}>
                            {flag === 1 &&
                                <>
                                    {/* <div className="dot" style={{ backgroundColor: chosenColor.iconColor }} /> */}
                                    <StatusIconHolder lastDroppedDot={lastDroppedDot} onDrop={(item) => handleDropDot(index, item)} chosenColor={chosenColor}/>
                                    <IconHolder lastDroppedIcon={lastDroppedIcon} onDrop={(item) => handleDropIcon(index, item)} chosenColor={chosenColor}/>
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

// import { useState, useEffect, useCallback, memo } from 'react';
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

//     const [iconHolders, setIconHolders] = useState([])

//     useEffect(() => {
//     const tempArr = [];
//     chosenModel.dotLocation.forEach(element => {
//         tempArr.push({ flag: element, lastDroppedItem: null })
//     });
//     setIconHolders(tempArr);
// }, [chosenModel]);


// const [droppedIcons, setDroppedIcons] = useState([]);
// // function isDropped(icon) { //feedback dla ikony, że już jest dropnięta. Zbędne? 
// // return droppedIcons.indexOf(icon) > -1;
// // }
// const handleDrop = useCallback((index, item) => {
//     const { image } = item;
//     setDroppedIcons(update(droppedIcons, image ? { $push: [image] } : { $push: [] }));
//     setIconHolders(update(iconHolders, {
//         [index]: {
//             lastDroppedItem: {
//                 $set: item,
//             },
//         },
//     }));
// }, [droppedIcons, iconHolders]);

// return (
//     <>
//         <div className="preview_container">
//             <h2>Podgląd panelu</h2>
//             <div className="panel_box"
//                 style={chosenModelStyle}>
//                 <div className="panel_content" style={contentStyle}>
//                     {iconHolders.map(({ flag, lastDroppedItem }, index) =>
//                         <div key={index}
//                             className={(iconHolders.length <= 9) ? "cell cell_dot9" : "cell cell_dot18"}>
//                             {flag === 1 &&
//                                 <>
//                                     <div className="dot" style={{ backgroundColor: chosenColor.iconColor }} />
//                                     <IconHolder lastDroppedItem={lastDroppedItem} onDrop={(item) => handleDrop(index, item)} />
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
//     </>
// );
// });

// export default PanelPreview;

