// import React, { memo } from 'react';
// import PropTypes from "prop-types";
// import { makeStyles } from "@material-ui/core/styles";
// import Tabs from "@material-ui/core/Tabs";
// import Tab from "@material-ui/core/Tab";
// import Typography from "@material-ui/core/Typography";
// import Box from "@material-ui/core/Box";

// import "./IconEditor.scss"
// import iconCategories from "./iconCategories"
// import { IconToDrag } from './IconToDrag';


// function TabPanel(props) {
//   const { children, value, index} = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`vertical-tabpanel-${index}`}
//       aria-labelledby={`vertical-tab-${index}`}
//     >
//       {value === index && (
//         // <Box p={8}>
//         <Box >
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired
// };

// function a11yProps(index) {
//   return {
//     id: `vertical-tab-${index}`,
//     "aria-controls": `vertical-tabpanel-${index}`
//   };
// }

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     display: "flex",
//     height: 400
//   },
//   tabs: {
//     borderRight: `1px solid ${theme.palette.divider}`
//   }
// }));

// // export default function IconEditor() {
// export const IconEditor = memo(function IconEditor() {

//   const classes = useStyles();
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <div className="icon_container">
//       <h2 className="icon_header">Wybierz ikonę</h2>
//       <div className="icon_content">
//         <div className={classes.root}>
//           <Tabs
//             orientation="vertical"
//             variant="scrollable"
//             value={value}
//             onChange={handleChange}
//             aria-label="Vertical tabs example"
//             className={classes.tabs}
//           >

//             {iconCategories.map((el, i) => (
//               <Tab label={el.name} index={i} key={i} />
//             ))}

// {/* 
//             <Tab label="Item One" {...a11yProps(0)} />
//             <Tab label="Item Two" {...a11yProps(1)} />
//             <Tab label="Item Three" {...a11yProps(2)} />
//             <Tab label="Item Four" {...a11yProps(3)} />
//             <Tab label="Item Five" {...a11yProps(4)} />
//             <Tab label="Item Six" {...a11yProps(5)} />
//             <Tab label="Item Seven" {...a11yProps(6)} /> */}
//           </Tabs>
//           {iconCategories.map((el, i) => (
//             <TabPanel value={value} index={i} key={i}>
//               <div className="icons">
//                 {
//                   el.listOfIcons.map(
//                     (image, index) => <IconToDrag key={index} image={image} />
//                   )
//                 }
//               </div>
//             </TabPanel>
//           ))}
//         </div>
//       </div>
//     </div>


//   );
// }
// )
// export default IconEditor;
//-----------------------------------------------------------------------------------------------------------------------------------antd
// import React, { memo } from 'react';
// import { Tabs } from 'antd';
// import "./IconEditor.scss"
// import iconCategories from "./iconCategories"
// import { IconToDrag } from './IconToDrag';


// const { TabPane } = Tabs;


// export const IconEditor = memo(function IconEditor() {



//   return (
//     <div className="icon_container">
//       <h2 className="icon_header">Wybierz ikonę</h2>
//       <div className="icon_content">
//         <Tabs defaultActiveKey="0" tabPosition="left" style={{ height: 1000 }} tabBarGutter={-5} centered={false}
//         type="card"
//         // <Tabs defaultActiveKey="0" tabPosition="left"  tabBarGutter={-10} centered={false}
//         // className="custom-tab">
//         >
//           {iconCategories.map((el, i) => (
//             <TabPane tab={el.name} key={i} >
//               <div className="icons">
//                 {
//                   el.listOfIcons.map(
//                     (image, index) => <IconToDrag key={index} image={image}/>
//                   )
//                 }
//               </div>
//             </TabPane>
//           ))}
//         </Tabs>
//       </div>
//     </div>
//   );
// })

// export default IconEditor;



//----------------------------------------------------------------------bootstrap


import React, { memo } from 'react';
import "./IconEditor.scss"

import { IconToDrag } from './IconToDrag';
import iconCategories from "./iconCategories"



// import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'

export const IconEditor = memo(function IconEditor() {



  return (
    <div className="icon_container">
      <h2 className="icon_header">Wybierz ikonę</h2>
      <div className="icon_content">
        {/* 
        <Tabs defaultActiveKey="Bezpieczeństwo" mountOnEnter variant="pills">

          {iconCategories.map((el, i) => (
            <Tab eventKey={el.name} title={el.name} key={i} >
              <div className="icons">
                {
                  el.listOfIcons.map(
                    (image, index) => <IconToDrag key={index} image={image} />
                  )
                }
              </div>
            </Tab>
          ))}
        </Tabs> */}

        <Tab.Container defaultActiveKey="Bezpieczeństwo" mountOnEnter>
          {/* <Row> */}

            {/* <Col sm={2}> */}
            <div className="nav_col">
            
              <Nav variant="pills" className="flex-column">
                {iconCategories.map((el, i) => (
                  <Nav.Item key={i} >
                    <Nav.Link eventKey={el.name}>{el.name}</Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            {/* </Col> */}
            </div>



            {/* <Col sm={10}> */}
            <div className="content_col">

                <Tab.Content>
              {iconCategories.map((el, i) => (
                  <Tab.Pane eventKey={el.name} key={i}>
                    <div className="icons">
                      {
                        el.listOfIcons.map(
                          (image, index) => <IconToDrag key={index} image={image} />
                        )
                      }
                    </div>
                  </Tab.Pane>
              ))}
                </Tab.Content>
            {/* </Col> */}
            </div>

          {/* </Row> */}
        </Tab.Container>


      </div>
    </div>

  );
})

export default IconEditor;
