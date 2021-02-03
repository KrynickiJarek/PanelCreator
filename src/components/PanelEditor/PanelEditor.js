import React from 'react';
import "./PanelEditor.scss"

import IconEditor from "./IconEditor/IconEditor"
import TextEditor from "./TextEditor/TextEditor"
import FrameEditor from "./FrameEditor/FrameEditor"
import ColorEditor from "./ColorEditor/ColorEditor"

const PanelEditor = () => {
    return (
        <div className="editor_container">
            <h1>PanelEditor - kontener do edycji panelu</h1>
            <IconEditor/>
            <TextEditor/>
            <FrameEditor/>
            <ColorEditor/>
        </div>
    );
};

export default PanelEditor;