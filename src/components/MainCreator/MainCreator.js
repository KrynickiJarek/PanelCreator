import "./MainCreator.scss"

// import CreatorHeader from "../MainCreator/CreatorHeader/CreatorHeader"
import PanelEditor from "../MainCreator/PanelEditor/PanelEditor"
import PanelPreview from "../MainCreator/PanelPreview/PanelPreview"


const MainCreator = () => {

  return (
    <div className="main_content_container">
      <PanelEditor />
      <PanelPreview />
    </div>
  );
};


export default MainCreator;
