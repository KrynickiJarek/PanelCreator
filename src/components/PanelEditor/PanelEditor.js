import React from 'react';
import "./_paneleditor.scss"

import IconEditor from "./IconEditor/IconEditor"
import TextEditor from "./TextEditor/TextEditor"
import FrameEditor from "./FrameEditor/FrameEditor"
import ColorEditor from "./ColorEditor/ColorEditor"

const PanelEditor = () => {
    return (
        <>
            <h1>PanelEditor - kontener do edycji panelu</h1>
            <IconEditor/>
            <TextEditor/>
            <FrameEditor/>
            <ColorEditor/>
        </>
    );
};

export default PanelEditor;