// eslint-disable-next-line 
const availablePanels = [
  {
    type: "MDOT-2",
    numberOfDots: 2,
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
  },
  {
    type: "MDOT-4",
    numberOfDots: 4,
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
  },
  {
    type: "MDOT-6",
    numberOfDots: 6,
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
  },
  {
    type: "MDOT-6 nowy",
    numberOfDots: 6,
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
  },
  {
    type: "MDOT-9",
    numberOfDots: 9,
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
  },
  {
    type: "MDOT-15",
    numberOfDots: 15,
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
  },
  {
    type: "MDOT-18",
    numberOfDots: 18,
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
  },
  {
    type: "MDOT-18 poziomy",
    numberOfDots: 18,
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
  },
  {
    type: "MDOT-M18",
    numberOfDots: 18,
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
  },
  {
    type: "MDOT-M18 uniwersalny",
    numberOfDots: 18,
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

  },
];

export default availablePanels