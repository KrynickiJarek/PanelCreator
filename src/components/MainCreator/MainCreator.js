import "./MainCreator.scss"

// import CreatorHeader from "../MainCreator/CreatorHeader/CreatorHeader"
import PanelEditor from "../MainCreator/PanelEditor/PanelEditor"
import PanelPreview from "../MainCreator/PanelPreview/PanelPreview"


const MainCreator = ({ dashboardSmooth }) => {

  return (
    <div className="main_content_container" style={!dashboardSmooth ? { opacity: "1" } : { opacity: "0" }}>
      <PanelEditor />
      <PanelPreview />
    </div>
  );
};


export default MainCreator;
