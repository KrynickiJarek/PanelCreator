import React, {useState} from 'react';
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



// textStyle.backgroundColor = "transparent";
// textStyle.color = chosenColor.iconColor;
// textStyle.border = "2px solid transparent"
// // textStyle.borderRadius = `${1.8 * sc}px`;
// textStyle.borderRadius = `${0.9 * sc}px`;
// textStyle.fontSize = `${2 * sc}px`
// textStyle.lineHeight = `${2 * sc}px`;
// textStyle.height = `${3.6 * sc}px`;
// textStyle.width = `${16 * sc}px`;



// .text_input{
//     // transition: 0.4s ease;
//     transition: color 0s, border 0.4s ease, width 0.4s ease, height 0.4s ease, top 0.4s ease;
//     text-align: center;
//     position: absolute;
//     // position: relative;
//     transform: translateX(-50%);
//     padding: 0;
//     font-weight: 700;
//   }