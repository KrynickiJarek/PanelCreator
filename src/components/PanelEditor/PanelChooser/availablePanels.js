// eslint-disable-next-line 
const availablePanels = [
    {
        type: "MDOT2",
        numberOfDots: "2",
        height: "90.0 mm",
        width: "90.0 mm",
        lcdScreen: false,
        rows: [1,1,1],
        dotLocation: [0,0,0,
                      1,0,1,
                      0,0,0],        
        marginTopBotton: 9.8,
        marginLeftRight: 9.8,        
    },
    {
        type: "MDOT4",
        numberOfDots: "4",
        height: "90.0 mm",
        width: "90.0 mm",
        lcdScreen: false,
        rows: [1,1,1],
        dotLocation: [1,0,1,
                      0,0,0,
                      1,0,1],  
        marginTopBotton: 9.8,
        marginLeftRight: 9.8,
    },
    {
        type: "MDOT6LCD",
        numberOfDots: "6",
        height: "90.0 mm",
        width: "90.0 mm",
        lcdScreen: true,
        rows: [1,1,1],
        dotLocation: [1,0,1,
                      1,0,1,
                      1,0,1],  
        marginTopBotton: 9.8,
        marginLeftRight: 9.8,
    },
    {
        type: "MDOT9",
        numberOfDots: "9",
        height: "90.0 mm",
        width: "90.0 mm",
        lcdScreen: false,
        rows: [1,1,1],
        dotLocation: [1,1,1,
                      1,1,1,
                      1,1,1],  
        marginTopBotton: 9.8,
        marginLeftRight: 9.8,
    },
    {
        type: "MDOT15LCD",
        numberOfDots: "15",
        height: "160.0 mm",
        width: "90.0 mm",
        lcdScreen: true,
        rows: [1,1,1,1,1,1],
        dotLocation: [1,0,1,
                      1,0,1,
                      1,0,1,
                      1,1,1,
                      1,1,1,
                      1,1,1],
        marginTopBotton: 9.6,
        marginLeftRight: 9.8,
    },
    {
        type: "MDOT18",
        numberOfDots: "18",
        height: "160.0 mm",
        width: "90.0 mm",
        lcdScreen: false,
        rows: [1,1,1,1,1,1],
        dotLocation: [1,1,1,
                      1,1,1,
                      1,1,1,
                      1,1,1,
                      1,1,1,
                      1,1,1],
        marginTopBotton: 9.6,
        marginLeftRight: 9.8,
    },
];

export default availablePanels


// // eslint-disable-next-line 
// const availablePanels = [
//     {
//         type: "MDOT2",
//         numberOfDots: "2",
//         height: "90.0 mm",
//         width: "90.0 mm",
//         lcdScreen: false,
//         dotLocation: [2] 
//     },
//     {
//         type: "MDOT4",
//         numberOfDots: "4",
//         height: "90.0 mm",
//         width: "90.0 mm",
//         lcdScreen: false,
//         dotLocation: [2,2] 
//     },
//     {
//         type: "MDOT6LCD",
//         numberOfDots: "6",
//         height: "90.0 mm",
//         width: "90.0 mm",
//         lcdScreen: true,
//         dotLocation: [2,2,2] 
//     },
//     {
//         type: "MDOT9",
//         numberOfDots: "9",
//         height: "90.0 mm",
//         width: "90.0 mm",
//         lcdScreen: false,
//         dotLocation: [3,3,3] 
//     },
//     {
//         type: "MDOT15LCD",
//         numberOfDots: "15",
//         height: "160.0 mm",
//         width: "90.0 mm",
//         lcdScreen: false,
//         dotLocation: [2,2,2,3,3,3] 
//     },
//     {
//         type: "MDOT18",
//         numberOfDots: "18",
//         height: "160.0 mm",
//         width: "90.0 mm",
//         lcdScreen: false,
//         dotLocation: [3,3,3,3,3,3] 
//     },
// ];

// export default availablePanels