import { memo } from 'react';
import "./MainCreator.scss"

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import CreatorHeader from "../components/CreatorHeader/CreatorHeader"
import PanelEditor from "../components/PanelEditor/PanelEditor"
import PanelPreview from "../components/PanelPreview/PanelPreview"


export const MainCreator = memo(function MainCreator() {

  return (
    // <DndProvider debugMode={true} backend={HTML5Backend}>
    <DndProvider backend={HTML5Backend}>
      <div className="main_container">
        <CreatorHeader />
        <div className="content_container">
          <PanelEditor />
          <PanelPreview />
        </div>
      </div>
    </DndProvider>
  );
});


export default MainCreator;



