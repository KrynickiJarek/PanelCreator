import { useState, useCallback, memo } from 'react';

import "./MainCreator.scss"

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import CreatorHeader from "../components/CreatorHeader/CreatorHeader"
import PanelEditor from "../components/PanelEditor/PanelEditor"
import PanelPreview from "../components/PanelPreview/PanelPreview"

import availablePanels from "./PanelEditor/PanelChooser/availablePanels"
import availableColors from "./PanelEditor/ColorEditor/availableColors"

export const MainCreator = memo(function MainCreator() {
// const MainCreator = () => {

    const [chosenColor, setChosenColor] = useState(availableColors[0])
    const [chosenModel, setChosenModel] = useState(availablePanels[0])
    const [draggedIcon, setDraggedIcon] = useState(null)


    const handleSetColor = (chosenColor) => {
        setChosenColor(chosenColor);
    }

    const handleSetModel = (chosenModel) => {
        setChosenModel(chosenModel);
    }

    // const handleSetIcon = (draggedIconxx) => {
        // setDraggedIcon(draggedIconxx);
        // console.log("MC 1 XXXX>>> " + draggedIconxx);
        // console.log("MC 2 state>>> " + draggedIcon); //działa z opóźnieniem
    // }


    const handleDrop = useCallback((item) => {
        const { image } = item;
        setDraggedIcon(image);
        console.log(image)
    }, [draggedIcon]);

    return (

        <DndProvider backend={HTML5Backend}> 
            <div className="main_container">
                <CreatorHeader />
                <div className="content_container">
                    {/* <PanelPreview chosenModel={chosenModel} chosenColor={chosenColor} draggedIcon={draggedIcon}/> */}
                    {/* <PanelEditor onModelSet={handleSetModel} onColorSet={handleSetColor} onIconSet={handleSetIcon}/> */}
                    <PanelPreview chosenModel={chosenModel} chosenColor={chosenColor} draggedIcon={draggedIcon} onDrop={(item) => handleDrop(item)}/>
                    <PanelEditor onModelSet={handleSetModel} onColorSet={handleSetColor}/>
                </div>
            </div>
         </DndProvider>



    );
});

// };

export default MainCreator;