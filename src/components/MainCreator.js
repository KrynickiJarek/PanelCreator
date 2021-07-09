import { useState, memo } from 'react';
import "./MainCreator.scss"

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import CreatorHeader from "../components/CreatorHeader/CreatorHeader"
import PanelEditor from "../components/PanelEditor/PanelEditor"
import PanelPreview from "../components/PanelPreview/PanelPreview"


export const MainCreator = memo(function MainCreator() {

  const [frameTitle, setFrameTitle] = useState(false)
  const [allowTextFrame, setAllowTextFrame] = useState(false)



  const handleFrameTitle = (income) => {
    setFrameTitle(income)
  }

  const handleAllowTextFrame = (income) => {
    setAllowTextFrame(income)
  }


  return (
    // <DndProvider debugMode={true} backend={HTML5Backend}>
    <DndProvider backend={HTML5Backend}>
      <div className="main_container">
        <CreatorHeader />
        <div className="content_container">
          <PanelEditor
            onToggleFrameTitle={handleFrameTitle}
            allowTextFrame={allowTextFrame} />
          <PanelPreview
            frameTitle={frameTitle} onAllowTextFrame={handleAllowTextFrame}
          />
        </div>
      </div>
    </DndProvider>
  );
});


export default MainCreator;



