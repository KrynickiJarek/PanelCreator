import React from 'react';
import "./ColorEditor.scss"
import availableColors from "./availableColors"


const ColorEditor = ({ onColorSet }) => {

    return (
        <>
            <h2>Wybierz kolor tła panelu:</h2>
            <div className="color_table">
                {availableColors.map((el, id) => {
                    return (
                        <div className="color_link" key={id} >
                            <div style={{ backgroundColor: el.hex }} className="color_box" onClick={() => { onColorSet(el) }} />
                            <p className="color_name">{el.name} ({el.RAL})</p>
                        </div>
                    )
                })}
            </div>
        </>
    );
};

export default ColorEditor;