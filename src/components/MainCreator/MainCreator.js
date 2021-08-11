import { useState, useEffect } from 'react';
import { connect } from "react-redux"
import "./MainCreator.scss"

import CreatorHeader from "../MainCreator/CreatorHeader/CreatorHeader"
import PanelEditor from "../MainCreator/PanelEditor/PanelEditor"
import PanelPreview from "../MainCreator/PanelPreview/PanelPreview"
import AlertBox from '../AlertBox/AlertBox';


const MainCreator = ({ dashboardSmooth, creator }) => {

  const [creatorSmooth, setCreatorSmooth] = useState(false)

  useEffect(() => {
    if (!dashboardSmooth) {
      setCreatorSmooth(true)
    }
  }, [dashboardSmooth])


  return (
    <div className="main_creator_container" style={creatorSmooth && creator ? { opacity: "1" } : { opacity: "0" }}>
      <AlertBox />
      <div className="creator_container" >
        <div className="creator_scroll">
          <CreatorHeader />
          <div className="creator_content">
            <PanelEditor />
            <PanelPreview />
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = state => ({
  creator: state.panels.creator,

})


export default connect(mapStateToProps, null)(MainCreator)