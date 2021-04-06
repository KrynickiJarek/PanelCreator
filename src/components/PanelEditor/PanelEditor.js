import React from 'react';
import "./PanelEditor.scss"

import 'antd/dist/antd.css';
import { Tabs } from 'antd';


import IconEditor from "./IconEditor/IconEditor"
import TextEditor from "./TextEditor/TextEditor"
import FrameEditor from "./FrameEditor/FrameEditor"
import ColorEditor from "./ColorEditor/ColorEditor"
import PanelChooser from './PanelChooser/PanelChooser';



const PanelEditor = ({onModelSet, onColorSet, onIconSet}) => {


  const { TabPane } = Tabs;
  function callback(key) {
  }



  return (

    <div className="editor_container">
      <h1>PanelEditor - kontener do edycji panelu</h1>

      
      <Tabs onChange={callback} type="card" size="large">
      <TabPane tab="Model" key="1">
          <PanelChooser onModelSet={onModelSet} />
        </TabPane>
        <TabPane tab="Ikony" key="2">
          <IconEditor onIconSet={onIconSet}/>
        </TabPane>
        <TabPane tab="Tekst" key="3">
          <TextEditor />
        </TabPane>
        <TabPane tab="Ramki" key="4">
          <FrameEditor />
        </TabPane>
        <TabPane tab="Kolor" key="5">
          <ColorEditor onColorSet={onColorSet} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default PanelEditor;


// import React from 'react';
// import "./PanelEditor.scss"

// import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';

// import IconEditor from "./IconEditor/IconEditor"
// import TextEditor from "./TextEditor/TextEditor"
// import FrameEditor from "./FrameEditor/FrameEditor"
// import ColorEditor from "./ColorEditor/ColorEditor"

// function TabPanel(props) {
//     const { children, value, index, ...other } = props;

//     return (
//       <div
//         role="tabpanel"
//         hidden={value !== index}
//         id={`simple-tabpanel-${index}`}
//         aria-labelledby={`simple-tab-${index}`}
//         {...other}
//       >
//         {value === index && (
//           <Box p={3}>
//             <Typography>{children}</Typography>
//           </Box>
//         )}
//       </div>
//     );
//   }

//   TabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.any.isRequired,
//     value: PropTypes.any.isRequired,
//   };

//   function a11yProps(index) {
//     return {
//       id: `simple-tab-${index}`,
//       'aria-controls': `simple-tabpanel-${index}`,
//     };
//   }

//   const useStyles = makeStyles((theme) => ({
//     root: {
//       flexGrow: 1,
//     //   backgroundColor: theme.palette.background.paper,
//     },
//   }));

//   const PanelEditor = () => {
//     const classes = useStyles();
//     const [value, setValue] = React.useState(0);

//     const handleChange = (event, newValue) => {
//       setValue(newValue);
//     };

//     return (
//         <div className="editor_container">
//         <h1>PanelEditor - kontener do edycji panelu</h1>



//             <div className={classes.root}>
//                 <AppBar position="static">
//                     <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
//                         <Tab label="Ikony" {...a11yProps(0)} />
//                         <Tab label="Tekst" {...a11yProps(1)} />
//                         <Tab label="Ramki" {...a11yProps(2)} />
//                         <Tab label="Kolory" {...a11yProps(3)} />
//                     </Tabs>
//                 </AppBar>
//                 <TabPanel value={value} index={0}>
//                     <IconEditor />
//                 </TabPanel>
//                 <TabPanel value={value} index={1}>
//                     <TextEditor />
//                 </TabPanel>
//                 <TabPanel value={value} index={2}>
//                     <FrameEditor />
//                 </TabPanel>
//                 <TabPanel value={value} index={3}>
//                     <ColorEditor/>
//                 </TabPanel>
//             </div>
//         </div>
//     );
//   }


// export default PanelEditor;








// stara wersja przed materialUi
// import React from 'react';
// import "./PanelEditor.scss"

// import IconEditor from "./IconEditor/IconEditor"
// import TextEditor from "./TextEditor/TextEditor"
// import FrameEditor from "./FrameEditor/FrameEditor"
// import ColorEditor from "./ColorEditor/ColorEditor"

// const PanelEditor = () => {
//     return (
//         <div className="editor_container">
//             <h1>PanelEditor - kontener do edycji panelu</h1>
//             <IconEditor/>
//             <TextEditor/>
//             <FrameEditor/>
//             <ColorEditor/>
//         </div>
//     );
// };

// export default PanelEditor;