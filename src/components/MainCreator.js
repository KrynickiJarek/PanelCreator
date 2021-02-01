import React from 'react';
import "./_maincerator.scss"

import CreatorHeader from "../components/CreatorHeader/CreatorHeader"
import PanelEditor from "../components/PanelEditor/PanelEditor"
import PanelPreview from "../components/PanelPreview/PanelPreview"

const MainCreator = () => {
    return (
        <>
            <CreatorHeader/>
            <PanelEditor/>
            <PanelPreview/>
        </>

    );
};

export default MainCreator;