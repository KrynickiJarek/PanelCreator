import React, { useState } from 'react';
import "./MainCreator.scss"

import CreatorHeader from "../components/CreatorHeader/CreatorHeader"
import PanelEditor from "../components/PanelEditor/PanelEditor"
import PanelPreview from "../components/PanelPreview/PanelPreview"

import availablePanels from "./PanelEditor/PanelChooser/availablePanels"
import availableColors from "./PanelEditor/ColorEditor/availableColors"


const MainCreator = () => {

    const [chosenColor, setChosenColor] = useState(availableColors[0])

    const [chosenModel, setChosenModel] = useState(availablePanels[0])


    const handleSetColor = (chosenColor)=>{
      setChosenColor(chosenColor);
    }

    const handleSetModel = (chosenModel)=>{
        setChosenModel(chosenModel);
      }

    return (
        <div className="main_container">
            <CreatorHeader />
            <div className="content_container">
                <PanelPreview chosenModel={chosenModel} chosenColor={chosenColor}/>
                <PanelEditor onModelSet={handleSetModel} onColorSet={handleSetColor}/>
            </div>
        </div>

    );
};

export default MainCreator;