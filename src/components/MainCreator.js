import React from 'react';
import "./MainCreator.scss"

import CreatorHeader from "../components/CreatorHeader/CreatorHeader"
import PanelEditor from "../components/PanelEditor/PanelEditor"
import PanelPreview from "../components/PanelPreview/PanelPreview"

const MainCreator = () => {
    return (
        <div className="main_container">
            <CreatorHeader/>
            <div className="content_container">
                <PanelPreview/>
                <PanelEditor/>
            </div>
        </div>

    );
};

export default MainCreator;