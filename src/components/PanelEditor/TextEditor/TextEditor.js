import React, { useState } from 'react';
import "./TextEditor.scss"


const TextEditor = ({ onFontSet }) => {

    // const [font, setFont] = useState(null)
    const [font, setFont] = useState("Calibri-bold")

    return (
        <>
            <div className="text_container">
                <h2 className="text_header">Dodaj podpisy do ikon (opcjonalne)</h2>
                <p className="instruction_bold">Wybierz font, a następnie dodaj opisy pod lub nad ikonami klikając w zaznaczone pola.</p>
                <div className="text_content">


                    <div className="font_link" style={((font === "Calibri-bold") || !font) ? { border: "3px solid #EC695C", fontFamily: "Calibri-bold" }
                        : { fontFamily: "Calibri-bold" }}
                        onClick={() => { setFont("Calibri-bold"); onFontSet("Calibri-bold") }} >
                        {((font === "Calibri-bold") || !font) && <div className="font_chosen" />}
                        < p className="font_name" style={{ fontSize: "24px" }}>Calibri-bold</p>
                        < p className="font_example" style={{ fontSize: "14px" }}>Przykładowy tekst napisany fontem Calibri-bold</p>
                    </div>

                    <div className="font_link" style={font === "Calibri" ? { border: "3px solid #EC695C", fontFamily: "Calibri" }
                        : { fontFamily: "Calibri" }}
                        onClick={() => { setFont("Calibri"); onFontSet("Calibri") }} >
                        {font === "Calibri" && <div className="font_chosen"/>}
                        < p className="font_name" style={{ fontSize: "24px" }}>Calibri</p>
                        < p className="font_example" style={{ fontSize: "14px" }}>Przykładowy tekst napisany fontem Calibri</p>
                    </div>

                    <div className="font_link" style={font === "Helvetica-bold" ? { border: "3px solid #EC695C", fontFamily: "Helvetica-bold" }
                        : { fontFamily: "Helvetica-bold" }}
                        onClick={() => { setFont("Helvetica-bold"); onFontSet("Helvetica-bold") }} >
                        {font === "Helvetica-bold" && <div className="font_chosen"/>}
                        < p className="font_name" style={{ fontSize: "24px" }}>Helvetica Bold</p>
                        < p className="font_example" style={{ fontSize: "14px" }}>Przykładowy tekst napisany fontem Helvetica Bold</p>
                    </div>

                    <div className="font_link" style={font === "Helvetica" ? { border: "3px solid #EC695C", fontFamily: "Helvetica" }
                        : { fontFamily: "Helvetica" }}
                        onClick={() => { setFont("Helvetica"); onFontSet("Helvetica") }} >
                        {font === "Helvetica" && <div className="font_chosen"/>}
                        < p className="font_name" style={{ fontSize: "24px" }}>Helvetica</p>
                        < p className="font_example" style={{ fontSize: "14px" }}>Przykładowy tekst napisany fontem Helvetica</p>
                    </div>

                    <div className="font_link" style={font === "Arial" ? { border: "3px solid #EC695C", fontFamily: "Arial" }
                        : { fontFamily: "Arial" }}
                        onClick={() => { setFont("Arial"); onFontSet("Arial") }} >
                        {font === "Arial" && <div className="font_chosen"/>}
                        < p className="font_name" style={{ fontSize: "24px" }}>Arial</p>
                        < p className="font_example" style={{ fontSize: "14px" }}>Przykładowy tekst napisany fontem Arial</p>
                    </div>




                </div>
            </div>
        </>
    );
};

export default TextEditor;