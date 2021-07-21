// eslint-disable-next-line 
const availablePanels = [
  {
    type: "MDOT-2",
    numberOfDots: 2,
    panelRotation: 0,
    height: 90,
    width: 90,
    lcdScreen: false,
    rows: [1, 1, 1],
    dotLocation: [0, 0, 0,
      1, 0, 1,
      0, 0, 0],
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
    picture: (require("../../../assets/panelpictures/mdot2v.jpg")).default,
    info: "Dwupolowy, szklany panel dotykowy w rozmiarze 90 mm x 90 mm.",
    link: "https://help.ampio.pl/pl/kb/modul-wlacznika-dotykowego-2-polowego-mdot-2/"
  },
  {
    type: "MDOT-4",
    numberOfDots: 4,
    panelRotation: 0,
    height: 90,
    width: 90,
    lcdScreen: false,
    rows: [1, 1, 1],
    dotLocation: [1, 0, 1,
      0, 0, 0,
      1, 0, 1],
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
    backEndPanelType: 1,
    picture: (require("../../../assets/panelpictures/mdot4v.jpg")).default,
    info: "Czteropolowy, szklany panel dotykowy w rozmiarze 90 mm x 90 mm.",
    link: "https://help.ampio.pl/pl/kb/modul-wlacznika-dotykowego-4-polowego-mdot-4/"
  },
  {
    type: "MDOT-6",
    numberOfDots: 6,
    panelRotation: 0,
    height: 90,
    width: 90,
    lcdScreen: {
      lcdType: "noslide",
      lcdHeight: 37,
      lcdWidth: 30,
      lcdTop: 25,
      lcdLeft: 30,
    },
    rows: [1, 1, 1],
    dotLocation: [1, 0, 1,
      1, 0, 1,
      1, 0, 1],
    marginTop: 9.8,
    marginBottom: 9.8,
    marginSide: 9.8,
    sideCellWidth: 22.4,
    centerCellWidth: 25.6,
    rowHeight: 24,
    lastRowHeight: 22.4,
    oneRowFrameHeight: 19.5,
    multiRowFrameHeight: 24,
    marginFrameTop: 10,
    marginFrameBottom: 12.5,
    sideColumnFrameWidth: 21.06,
    centerColumnFrameWidth: 27.28,
    marginFrameSide: 10.3,
    backEndPanelType: 2,
    picture: (require("../../../assets/panelpictures/mdot6v.jpg")).default,
    info: "Sześciopolowy, szklany panel dotykowy w rozmiarze 90 mm x 90 mm z przewijanym ekranem LCD.",
    link: "https://help.ampio.pl/pl/kb/modul-wlacznika-dotykowego-6-polowego-mdot-6-lcd/"
  },
  {
    type: "MDOT-6 nowy",
    numberOfDots: 6,
    panelRotation: 0,
    height: 90,
    width: 90,
    lcdScreen: {
      lcdType: "noslide",
      lcdHeight: 42.2,
      lcdWidth: 31.8,
      lcdTop: 22.15,
      lcdLeft: 29.1,
    },
    rows: [1, 1, 1],
    dotLocation: [1, 0, 1,
      1, 0, 1,
      1, 0, 1],
    marginTop: 9,
    marginBottom: 9.8,
    marginSide: 9.8,
    sideCellWidth: 22.4,
    centerCellWidth: 25.6,
    rowHeight: 24,
    lastRowHeight: 23.2,
    oneRowFrameHeight: 19.5,
    multiRowFrameHeight: 24,
    marginFrameTop: 9.4,
    marginFrameBottom: 13.1,
    sideColumnFrameWidth: 21.06,
    centerColumnFrameWidth: 27.28,
    marginFrameSide: 10.3,
    backEndPanelType: 3,
    picture: (require("../../../assets/panelpictures/mdot6newv.jpg")).default,
    info: "Sześciopolowy, szklany panel dotykowy w rozmiarze 90 mm x 90 mm z przewijanym ekranem LCD.***",
    link: "https://help.ampio.pl/pl/kb/modul-wlacznika-dotykowego-6-polowego-mdot-6-lcd/"
  },
  {
    type: "MDOT-9",
    numberOfDots: 9,
    panelRotation: 0,
    height: 90,
    width: 90,
    lcdScreen: false,
    rows: [1, 1, 1],
    dotLocation: [1, 1, 1,
      1, 1, 1,
      1, 1, 1],
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
    backEndPanelType: 4,
    picture: (require("../../../assets/panelpictures/mdot9v.jpg")).default,
    info: "Dziewięciopolowy, szklany panel dotykowy w rozmiarze 90 mm x 90 mm.",
    link: "https://help.ampio.pl/pl/kb/modul-wlacznika-dotykowego-9-polowego-mdot-9/"
  },
  {
    type: "MDOT-15",
    numberOfDots: 15,
    panelRotation: 0,
    height: 160,
    width: 90,
    lcdScreen: {
      lcdType: "noslide",
      lcdHeight: 37,
      lcdWidth: 30,
      lcdTop: 25,
      lcdLeft: 30,
    },
    rows: [1, 1, 1, 1, 1, 1],
    dotLocation: [1, 0, 1,
      1, 0, 1,
      1, 0, 1,
      1, 1, 1,
      1, 1, 1,
      1, 1, 1],
    marginTop: 9.6,
    marginBottom: 9.6,
    marginSide: 9.8,
    sideCellWidth: 22.4,
    centerCellWidth: 25.6,
    rowHeight: 24,
    lastRowHeight: 20.8,
    oneRowFrameHeight: 19.5,
    multiRowFrameHeight: 24,
    marginFrameTop: 10,
    marginFrameBottom: 10.5,
    sideColumnFrameWidth: 21.06,
    centerColumnFrameWidth: 27.28,
    marginFrameSide: 10.3,
    backEndPanelType: 5,
    picture: (require("../../../assets/panelpictures/mdot15v.jpg")).default,
    info: "Piętnastopolowy, szklany panel dotykowy w rozmiarze 90 mm x 160 mm z przewijanym ekranem LCD.***",
    link: "https://help.ampio.pl/pl/kb/modul-wlacznika-dotykowego-18-polowego-mdot-18/"
  },
  {
    type: "MDOT-18",
    numberOfDots: 18,
    panelRotation: 0,
    height: 160,
    width: 90,
    lcdScreen: false,
    rows: [1, 1, 1, 1, 1, 1],
    dotLocation: [1, 1, 1,
      1, 1, 1,
      1, 1, 1,
      1, 1, 1,
      1, 1, 1,
      1, 1, 1],
    marginTop: 9.6,
    marginBottom: 9.6,
    marginSide: 9.8,
    sideCellWidth: 22.4,
    centerCellWidth: 25.6,
    rowHeight: 24,
    lastRowHeight: 20.8,
    oneRowFrameHeight: 19.5,
    multiRowFrameHeight: 24,
    marginFrameTop: 10,
    marginFrameBottom: 10.5,
    sideColumnFrameWidth: 21.06,
    centerColumnFrameWidth: 27.28,
    marginFrameSide: 10.3,
    backEndPanelType: 6,
    picture: (require("../../../assets/panelpictures/mdot18v.jpg")).default,
    info: "Osiemnastopolowy, szklany panel dotykowy w rozmiarze 90 mm x 160 mm.",
    link: "https://help.ampio.pl/pl/kb/modul-wlacznika-dotykowego-18-polowego-mdot-18/"
  },
  {
    type: "MDOT-18 poziomy",
    numberOfDots: 18,
    panelRotation: 90,
    height: 160,
    width: 90,
    lcdScreen: false,
    rows: [1, 1, 1, 1, 1, 1],
    dotLocation: [1, 1, 1,
      1, 1, 1,
      1, 1, 1,
      1, 1, 1,
      1, 1, 1,
      1, 1, 1],
    marginTop: 9.6,
    marginBottom: 9.6,
    marginSide: 9.8,
    sideCellWidth: 22.4,
    centerCellWidth: 25.6,
    rowHeight: 24,
    lastRowHeight: 20.8,
    oneRowFrameHeight: 19.5,
    multiRowFrameHeight: 24,
    marginFrameTop: 10,
    marginFrameBottom: 10.5,
    sideColumnFrameWidth: 21.06,
    centerColumnFrameWidth: 27.28,
    marginFrameSide: 10.3,
    backEndPanelType: 7,
    picture: (require("../../../assets/panelpictures/mdot18pozv.jpg")).default,
    info: "Osiemnastopolowy, szklany panel dotykowy w rozmiarze 160 mm x 90 mm.",
    link: "https://help.ampio.pl/pl/kb/modul-wlacznika-dotykowego-18-polowego-mdot-18/"
  },
  {
    type: "MDOT-M18",
    numberOfDots: 18,
    panelRotation: 0,
    height: 160,
    width: 90,
    lcdScreen: {
      lcdType: "noslide",
      lcdHeight: 42.2,
      lcdWidth: 31.8,
      lcdTop: 18.9,
      lcdLeft: 29.1,
    },
    rows: [1, 1, 1, 1, 1, 1, 1],
    dotLocation: [1, 0, 1,
      1, 0, 1,
      1, 0, 1,
      1, 1, 1,
      1, 1, 1,
      1, 1, 1,
      1, 1, 1],
    marginTop: 9.6,
    marginBottom: 9.6,
    marginSide: 9.8,
    sideCellWidth: 22.4,
    centerCellWidth: 25.6,
    rowHeight: 20,
    lastRowHeight: 20.8,
    oneRowFrameHeight: 19.5,
    multiRowFrameHeight: 20,
    marginFrameTop: 10,
    marginFrameBottom: 10.5,
    sideColumnFrameWidth: 21.06,
    centerColumnFrameWidth: 27.28,
    marginFrameSide: 10.3,
    backEndPanelType: 8,
    picture: (require("../../../assets/panelpictures/mdotm18v.jpg")).default,
    info: "Osiemnastopolowy, szklany panel dotykowy w rozmiarze 90 mm x 160 mm z przewijanym ekranem LCD.",
    link: "https://help.ampio.pl/pl/kb/modul-wlacznika-dotykowego-18-polowego-mdot-m18/"
  },
  {
    type: "MDOT-M18 uniwersalny",
    numberOfDots: 18,
    panelRotation: 0,
    height: 160,
    width: 90,
    lcdScreen: {
      lcdType: "slide",
      lcdHeight: 42.2,
      lcdWidth: 31.8,
      lcdTop: 18.9,
      lcdLeft: 29.1,
    },
    rows: [1, 1, 1, 1, 1, 1, 1],
    dotLocation: [0, 0, 0,
      0, 0, 0,
      0, 0, 0,
      1, 1, 1,
      1, 1, 1,
      1, 1, 1,
      1, 1, 1],
    marginTop: 9.6,
    marginBottom: 9.6,
    marginSide: 9.8,
    sideCellWidth: 22.4,
    centerCellWidth: 25.6,
    rowHeight: 20,
    lastRowHeight: 20.8,
    oneRowFrameHeight: 19.5,
    multiRowFrameHeight: 20,
    marginFrameTop: 10,
    marginFrameBottom: 10.5,
    sideColumnFrameWidth: 21.06,
    centerColumnFrameWidth: 27.28,
    marginFrameSide: 10.3,
    backEndPanelType: 8,
    picture: (require("../../../assets/panelpictures/mdotm18univ.jpg")).default,
    info: "Osiemnastopolowy, szklany panel dotykowy w rozmiarze 90 mm x 160 mm z przewijanym ekranem LCD wyposażony w sześć dedykowanych ikon.",
    link: "https://help.ampio.pl/pl/kb/modul-wlacznika-dotykowego-18-polowego-mdot-m18/"
  },
];

export default availablePanels