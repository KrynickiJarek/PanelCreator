import React from 'react';
import "./PanelEditor.scss"

import 'antd/dist/antd.css';
import { Tabs } from 'antd';


import IconEditor from "./IconEditor/IconEditor"
import TextEditor from "./TextEditor/TextEditor"
import FrameEditor from "./FrameEditor/FrameEditor"
import ColorEditor from "./ColorEditor/ColorEditor"
import PanelChooser from './PanelChooser/PanelChooser';



const PanelEditor = ({onModelSet, onColorSet, onIconSet}) => {


  const { TabPane } = Tabs;
  function callback(key) {
  }


  return (

    <div className="editor_container">
      <h1>PanelEditor - kontener do edycji panelu</h1>

      
      <Tabs onChange={callback} type="card" size="large">
      <TabPane tab="Model" key="1">
          <PanelChooser onModelSet={onModelSet} />
        </TabPane>
        <TabPane tab="Ikony" key="2">
          <IconEditor onIconSet={onIconSet}/>
        </TabPane>
        <TabPane tab="Tekst" key="3">
          <TextEditor />
        </TabPane>
        <TabPane tab="Ramki" key="4">
          <FrameEditor />
        </TabPane>
        <TabPane tab="Kolor" key="5">
          <ColorEditor onColorSet={onColorSet} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default PanelEditor;
