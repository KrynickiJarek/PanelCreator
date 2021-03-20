import React from 'react';
import "./PanelPreview.scss"

const PanelPreview = ({ chosenColor }) => {



    return (
        <div className="preview_container">
            <h2>PanelPreview - kontener do podglądu panelu</h2>
            <div className="panel_box" style={{ backgroundColor: chosenColor }} />
        </div>
    );
};

export default PanelPreview;