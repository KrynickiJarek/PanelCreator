import React from 'react';
import "./PanelPreview.scss"

const PanelPreview = ({ chosenModel, chosenColor }) => {


    const chosenModelStyle = {};
    chosenModelStyle.backgroundColor= chosenColor.hex;
    chosenModelStyle.height= parseInt(chosenModel.height) * 5;
    chosenModelStyle.width= parseInt(chosenModel.width) * 5;


    return (
        <div className="preview_container">
            <h2>Podgląd panelu</h2>
            <div className="panel_box"
                style={chosenModelStyle} />
            <div className="panel_info" style={{width: parseInt(chosenModel.width) * 5}}>
                <span>{chosenModel.type}</span>
                <span>RAL: {chosenColor.RAL}</span>
            </div>
        </div>
    );
};

export default PanelPreview;