import React from 'react';
import "./PanelPreview.scss"

const PanelPreview = ({ chosenModel, chosenColor }) => {

    const sc = 5;

    const chosenModelStyle = {};
    chosenModelStyle.backgroundColor = chosenColor.hex;
    chosenModelStyle.height = `${parseInt(chosenModel.height) * sc}px`;
    chosenModelStyle.width = `${parseInt(chosenModel.width) * sc}px`;

    const contentStyle = {};
    contentStyle.height = `${parseInt(chosenModel.height) * sc - (chosenModel.marginTopBotton * 2 * sc)}px`;
    contentStyle.width = `${parseInt(chosenModel.width) * sc - (chosenModel.marginLeftRight * 2 * sc)}px`;
    contentStyle.margin = `${chosenModel.marginTopBotton * sc}px ${chosenModel.marginLeftRight * sc}px`


    return (
        <div className="preview_container">
            <h2>Podgląd panelu</h2>

            <div className="panel_box"
                style={chosenModelStyle}>
                <div className="panel_content" style={contentStyle}>
                    {chosenModel.dotLocation.map((cell, i) =>
                        <div key={i}
                            className={(chosenModel.dotLocation.length <= 9) ? "cell cell_dot9" : "cell cell_dot18"}>
                            {cell === 1 &&
                                <>
                                    <div className="dot" />
                                    <div className="icon_area" />
                                </>}
                        </div>
                    )}
                </div>
                {chosenModel.lcdScreen && <div className="lcd"/>}
            </div>

            <div className="panel_info" style={{ width: parseInt(chosenModel.width) * sc }}>
                <span>{chosenModel.type}</span>
                <span>RAL: {chosenColor.RAL}</span>
            </div>
        </div>
    );
};

export default PanelPreview;