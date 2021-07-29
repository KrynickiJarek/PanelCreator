import { useState, useEffect } from 'react';
import { connect } from "react-redux"
import "./MainCreator.scss"

// import CreatorHeader from "../MainCreator/CreatorHeader/CreatorHeader"
import PanelEditor from "../MainCreator/PanelEditor/PanelEditor"
import PanelPreview from "../MainCreator/PanelPreview/PanelPreview"


const MainCreator = ({ dashboardSmooth, creator }) => {

  const [creatorSmooth, setCreatorSmooth] = useState(false)

  useEffect(() => {
    if (!dashboardSmooth) {
      setCreatorSmooth(true)
    }
  }, [dashboardSmooth])


  return (
    <div className="main_content_container" style={creatorSmooth && creator ? { opacity: "1" } : { opacity: "0" }}>
      <PanelEditor />
      <PanelPreview />
    </div>
  );
};
const mapStateToProps = state => ({
  creator: state.panels.creator,

})


const mapDispatchToProps = dispatch => ({
  // addNewFrame: (income) => dispatch(actionsFrame.addNewFrame(income)),
  // changeFrameHolders: (income) => dispatch(actionsFrame.frameHolders(income)),
  // changeFrameHoldersTemp: (income) => dispatch(actionsFrame.frameHoldersTemp(income)),
  // changeFrameText: (income) => dispatch(actionsFrame.changeFrameText(income)),
  // changeFrameShape: shape => dispatch(actionsFrame.changeFrameShape(shape)),
  // changeFramesShapeToSharp: (income) => dispatch(actionsFrame.changeFramesShapeToSharp(income)),
  // changeFramesShapeToRound: (income) => dispatch(actionsFrame.changeFramesShapeToRound(income)),
  // overFrameAll: (income) => dispatch(actionsFrame.overFrameAll(income)),
  // overFrameReRender: (income) => dispatch(actionsFrame.overFrameReRender(income)),
  // frameTitle: (income) => dispatch(actionsFrame.frameTitle(income)),
  // allowFrameTitle: (income) => dispatch(actionsFrame.allowFrameTitle(income)),
  // toggleVisual: (income) => dispatch(actionsVisual.toggleVisual(income)),
  // changePanelName: (income) => dispatch(actionsVisual.changePanelName(income)),
  // toggleAnimations: (income) => dispatch(actionsVisual.toggleAnimations(income)),
  // changeScale: (income) => dispatch(actionsVisual.changeScale(income)),
  // changeIconHolders: (income) => dispatch(actionsIcon.changeIconHolders(income)),
  // changeIsAnySelected: (income) => dispatch(actionsIcon.isAnySelected(income)),
  // showRemoveIcon: (income) => dispatch(actionsVisual.showRemoveIcon(income)),
  // showRemoveIcons: (income) => dispatch(actionsVisual.showRemoveIcons(income)),
  // setTimeOfCreation: (income) => dispatch(actionsVisual.setTimeOfCreation(income)),
  // resetColor: (income) => dispatch(actionsColor.resetColor(income)),
  // resetTab: (income) => dispatch(actionsTab.change(income)),

  // changePanelNameBackEnd: (income) => dispatch(actionsBackEnd.changePanelName(income)),
  // changePanelTextBackEnd: (income) => dispatch(actionsBackEnd.changePanelText(income)),
  // resetPanelColorBackEnd: (income) => dispatch(actionsBackEnd.resetPanelColor(income)),
  // changeIconsBackEnd: (income) => dispatch(actionsBackEnd.changeIcons(income)),
  // changeFramesBackEnd: (income) => dispatch(actionsBackEnd.changeFrames(income)),

  // addPanel: (income) => dispatch(actionsDashboard.addPanel(income)),
  // updatePanels: (income) => dispatch(actionsDashboard.updatePanels(income)),
  // showDashboard: (income) => dispatch(actionsDashboard.showDashboard(income)),

  // resetAllAfterModelChange: (income) => dispatch(actionsModel.resetAllAfterModelChange(income)),
  // resetModel: (income) => dispatch(actionsModel.resetModel(income)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MainCreator)