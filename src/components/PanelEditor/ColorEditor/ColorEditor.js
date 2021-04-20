import { useState} from 'react';
import "./ColorEditor.scss"
import availableColors from "./availableColors"


const ColorEditor = ({ onColorSet, chosenColor }) => {

    const [color, setColor] = useState(chosenColor.hex)


    return (
        <div className="color_container">
            <h2 className="color_header">Wybierz kolor tła panelu</h2>
            <div className="color_content">
                {availableColors.map((el, id) => {
                    return (
                        <div className="color_link" key={id} style={color === el.hex ? { border: "3px solid #EC695C" } : {}}
                            onClick={() => { setColor(el.hex); onColorSet(el) }} >
                            <div style={{ backgroundColor: el.hex }} className="color_box" />
                                < p className="color_name" style={color === el.hex ? { fontWeight: "700", margin: "0 5px" } : {}}>{el.name}</p>
                            <p className="color_ral">RAL: {el.RAL}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default ColorEditor;