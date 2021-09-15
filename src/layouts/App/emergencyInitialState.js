// eslint-disable-next-line 
const emergencyInitialState = {
  color: {
    RAL: 'RAL 9005',
    name: 'BLACK',
    hex: '#060707',
    iconColor: 'white'
  },
  tab: 'model',
  model: {
    chosenModel: {
      type: 'MDOT_2',
      name: 'mdot_2',
      numberOfDots: 2,
      panelRotation: 0,
      height: 90,
      width: 90,
      lcdScreen: false,
      rows: [
        1,
        1,
        1
      ],
      dotLocation: [
        0,
        0,
        0,
        1,
        0,
        1,
        0,
        0,
        0
      ],
      marginTop: 10.6,
      marginBottom: 9.8,
      marginSide: 9.8,
      sideCellWidth: 22.4,
      centerCellWidth: 25.6,
      rowHeight: 24,
      lastRowHeight: 21.6,
      oneRowFrameHeight: 19.5,
      multiRowFrameHeight: 24,
      marginFrameTop: 11,
      marginFrameBottom: 11.5,
      sideColumnFrameWidth: 21.06,
      centerColumnFrameWidth: 27.28,
      marginFrameSide: 10.3,
      backEndPanelType: 0,
      picture: '/static/media/mdot2v.873f53ea.jpg',
      info: 'MDOT_2_INFO',
      link: 'MDOT_2_LINK'
    },
    resetAllAfterModelChangeFlag: true
  },
  frame: {
    chosenFrameFont: 'Calibri-bold',
    chosenFrameShape: 'sharp',
    addNewFrame: false,
    removeFrame: false,
    overFrameRender: true,
    frameHolders: [],
    frameHoldersTemp: null,
    frameText: '',
    frameTitleFlag: false,
    allowFrameTitleFlag: false,
    lastRemovedFrameIndex: null
  },
  visual: {
    visual: false,
    scale: 5,
    animations: true,
    removeIcon: false,
    removeIcons: false,
    panelName: '',
    timeOfCreation: null,
    version: '1.00',
    warnings: [],
    warningsReRender: false,
    alert: null,
    alertAnswer: null,
    languageRender: false,
    fullScreen: false
  },
  text: {
    chosenTextFont: 'Calibri-bold',
    textRender: true,
    textUpOff: false
  },
  icon: {
    iconHolders: [],
    iconHoldersRender: false,
    favoriteIcons: [],
    favoriteIconsRender: false,
    ownIcons: [],
    ownIconsRender: false,
    isAnySelected: false,
    areThereAnyIcons: false
  }
}

export default emergencyInitialState
