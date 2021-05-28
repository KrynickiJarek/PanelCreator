import React, { useState } from 'react';
import "./FrameEditor.scss"
import Roundframe from "../../../assets/frame/roundframe.svg"
import Sharpframe from "../../../assets/frame/sharpframe.svg"


const FrameEditor = ({ onFrameFontSet, onFrameShapeSet }) => {



    const [frameFont, setFrameFont] = useState("Calibri-bold")
    const [frameShape, setFrameShape] = useState("sharp")

    return (
        <>
            <div className="frame_container">
                <h2 className="frame_header">Dodaj ramki (opcjonalne)</h2>
                <div className="frame_content">
                    <p className="instruction_bold">Zaznacz pola, aby dodać je do obszaru tworzonej ramki. Ramka musi mieć kształt prostokąta.</p>
                    <p className="instruction_normal">Wybierz rodzaj ramki</p>

                    <div className="frame_choosing_box">

                        <div className="frame_shape_link" style={((frameShape === "sharp") || !frameShape) ? { border: "3px solid #EC695C", borderRadius: "0" } : { borderRadius: "0" }}
                            onClick={() => { setFrameShape("sharp"); onFrameShapeSet("sharp") }} >
                            {((frameShape === "sharp") || !frameShape) && <div className="frame_chosen" />}
                            < p className="shape_name">Ostre<br/>narożniki</p>
                            <img src={Sharpframe} alt="sharpframe" className="shape_image" />
                        </div>

                        <div className="frame_shape_link" style={frameShape === "round" ? { border: "3px solid #EC695C" } : {}}
                            onClick={() => { setFrameShape("round"); onFrameShapeSet("round") }} >
                            {frameShape === "round" && <div className="frame_chosen" />}
                            < p className="shape_name">Zaokrąglone<br/>narożniki</p>
                            <img src={Roundframe} alt="roundframe" className="shape_image" />
                        </div>
                    </div>

                    <p className="instruction_normal">(w przygotowaniu)Wybierz font, a następnie dodaj opisy ramki.</p>

                    <div className="frame_choosing_box">

                        <div className="frame_link" style={((frameFont === "Calibri-bold") || !frameFont) ? { border: "3px solid #EC695C", fontFamily: "Calibri-bold" }
                            : { fontFamily: "Calibri-bold" }}
                            onClick={() => { setFrameFont("Calibri-bold"); onFrameFontSet("Calibri-bold") }} >
                            {((frameFont === "Calibri-bold") || !frameFont) && <div className="frame_chosen" />}
                            < p className="font_name" style={{ fontSize: "18px" }}>Calibri bold</p>
                            < p className="font_example" style={{ fontSize: "12px" }}>Przykładowy tekst napisany fontem Calibri-bold</p>
                        </div>

                        <div className="frame_link" style={frameFont === "Calibri" ? { border: "3px solid #EC695C", fontFamily: "Calibri" }
                            : { fontFamily: "Calibri" }}
                            onClick={() => { setFrameFont("Calibri"); onFrameFontSet("Calibri") }} >
                            {frameFont === "Calibri" && <div className="frame_chosen" />}
                            < p className="font_name" style={{ fontSize: "18px" }}>Calibri</p>
                            < p className="font_example" style={{ fontSize: "12px" }}>Przykładowy tekst napisany fontem Calibri</p>
                        </div>

                        <div className="frame_link" style={frameFont === "Helvetica-bold" ? { border: "3px solid #EC695C", fontFamily: "Helvetica-bold" }
                            : { fontFamily: "Helvetica-bold" }}
                            onClick={() => { setFrameFont("Helvetica-bold"); onFrameFontSet("Helvetica-bold") }} >
                            {frameFont === "Helvetica-bold" && <div className="frame_chosen" />}
                            < p className="font_name" style={{ fontSize: "18px" }}>Helvetica bold</p>
                            < p className="font_example" style={{ fontSize: "12px" }}>Przykładowy tekst napisany fontem Helvetica Bold</p>
                        </div>

                        <div className="frame_link" style={frameFont === "Helvetica" ? { border: "3px solid #EC695C", fontFamily: "Helvetica" }
                            : { fontFamily: "Helvetica" }}
                            onClick={() => { setFrameFont("Helvetica"); onFrameFontSet("Helvetica") }} >
                            {frameFont === "Helvetica" && <div className="frame_chosen" />}
                            < p className="font_name" style={{ fontSize: "18px" }}>Helvetica</p>
                            < p className="font_example" style={{ fontSize: "12px" }}>Przykładowy tekst napisany fontem Helvetica</p>
                        </div>

                        <div className="frame_link" style={frameFont === "Arial" ? { border: "3px solid #EC695C", fontFamily: "Arial" }
                            : { fontFamily: "Arial" }}
                            onClick={() => { setFrameFont("Arial"); onFrameFontSet("Arial") }} >
                            {frameFont === "Arial" && <div className="frame_chosen" />}
                            < p className="font_name" style={{ fontSize: "18px" }}>Arial</p>
                            < p className="font_example" style={{ fontSize: "12px" }}>Przykładowy tekst napisany fontem Arial</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FrameEditor;