import React, { useState } from 'react';
import "./MainCreator.scss"

import CreatorHeader from "../components/CreatorHeader/CreatorHeader"
import PanelEditor from "../components/PanelEditor/PanelEditor"
import PanelPreview from "../components/PanelPreview/PanelPreview"

const MainCreator = () => {

    const [chosenColor, setChosenColor] = useState("#060707")

    const handleSetColor = (chosenColor)=>{
      setChosenColor(chosenColor);
    }


    return (
        <div className="main_container">
            <CreatorHeader />
            <div className="content_container">
                <PanelPreview chosenColor={chosenColor}/>
                <PanelEditor onColorSet={handleSetColor}/>
            </div>
        </div>

    );
};

export default MainCreator;