import { useState, memo } from 'react';
// import { useState, memo, useEffect } from 'react';

import "./MainCreator.scss"

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import CreatorHeader from "../components/CreatorHeader/CreatorHeader"
import PanelEditor from "../components/PanelEditor/PanelEditor"
import PanelPreview from "../components/PanelPreview/PanelPreview"


export const MainCreator = memo(function MainCreator() {

  const [chosenFont, setChosenFont] = useState("Calibri-bold")
  const [frameList, setFrameList] = useState([])
  // const [frameListProp, setFrameListProp] = useState([])
  const [frameTitle, setFrameTitle] = useState(false)
  const [allowTextFrame, setAllowTextFrame] = useState(false)


  const handleSetFont = (chosenFont) => {
    setChosenFont(chosenFont);
  }


  const handleFrameList = (frameList) => {
    setFrameList(frameList)
  }


  const handleFrameTitle = (income) => {
    setFrameTitle(income)
  }

  const handleAllowTextFrame = (income) => {
    setAllowTextFrame(income)
  }
  // useEffect(() => {
  //   // console.log("MAIN")
  //   setFrameListProp(frameList)
  //   // eslint-disable-next-line 
  // }, [handleFrameList])


  return (
    <DndProvider backend={HTML5Backend}>
      <div className="main_container">
        <CreatorHeader />
        <div className="content_container">
          <PanelEditor onFontSet={handleSetFont}
            onToggleFrameTitle={handleFrameTitle}
            frameList={frameList} allowTextFrame={allowTextFrame} />
          <PanelPreview chosenFont={chosenFont}
            onFrameList={handleFrameList}
            frameTitle={frameTitle} onAllowTextFrame={handleAllowTextFrame}
          />
        </div>
      </div>
    </DndProvider>
  );
});


export default MainCreator;





// import { useState, useCallback, memo } from 'react';

// import "./MainCreator.scss"

// import { DndProvider } from 'react-dnd'
// import { HTML5Backend } from 'react-dnd-html5-backend'
// import update from 'immutability-helper';

// import CreatorHeader from "../components/CreatorHeader/CreatorHeader"
// import PanelEditor from "../components/PanelEditor/PanelEditor"
// import PanelPreview from "../components/PanelPreview/PanelPreview"

// import availablePanels from "./PanelEditor/PanelChooser/availablePanels"
// import availableColors from "./PanelEditor/ColorEditor/availableColors"

// // export const MainCreator = memo(function MainCreator() {
// const MainCreator = () => {

//     const [chosenColor, setChosenColor] = useState(availableColors[0])
//     const [chosenModel, setChosenModel] = useState(availablePanels[0])
//     // const [draggedIcon, setDraggedIcon] = useState(null)
//     // const [droppedIcons, setDroppedIcons] = useState([]); ///--



//     const handleSetColor = (chosenColor) => {
//         setChosenColor(chosenColor);
//     }

//     const handleSetModel = (chosenModel) => {
//         setChosenModel(chosenModel);
//     }


//     // const handleDrop = useCallback((item) => {
//     //     const { image } = item;
//     //     setDraggedIcon(image);
//     //     // console.log(image)
//     // }, [draggedIcon]);


//     //----
//     // function isDropped(icon) {
//     //     return droppedIcons.indexOf(icon) > -1;
//     // }
//     // const handleDrop = useCallback((index, item) => {
//     //     const { image } = item;
//     //     setDroppedIcons(update(droppedIcons, image ? { $push: [image] } : { $push: [] }));
//     //     setDraggedIcon(update(draggedIcon, {
//     //         [index]: {
//     //             lastDroppedIcon: {
//     //                 $set: item,
//     //             },
//     //         },
//     //     }));
//     // }, [setDroppedIcons, draggedIcon]);




//     return (

//         <DndProvider backend={HTML5Backend}>
//             <div className="main_container">
//                 <CreatorHeader />
//                 <div className="content_container">
//                     {/* <PanelPreview chosenModel={chosenModel} chosenColor={chosenColor} draggedIcon={draggedIcon} onDrop={(item) => handleDrop(item)}/> */}
//                     <PanelPreview chosenModel={chosenModel} chosenColor={chosenColor} />
//                     <PanelEditor onModelSet={handleSetModel} onColorSet={handleSetColor} />
//                 </div>
//             </div>
//         </DndProvider>



//     );
// };


// export default MainCreator;

