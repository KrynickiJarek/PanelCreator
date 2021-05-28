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


import React, { memo, useState, useEffect } from 'react';
import "./IconEditor.scss"

import Favorite from "../../../assets/favorite.svg"

import { IconToDrag } from './IconToDrag';
import iconCategories from "./iconCategories"

import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'




export const IconEditor = memo(function IconEditor() {

  const [favoriteIcons, setFavoriteIcons] = useState([])
  const [rerender, setRerender] = useState(false)

  const handleFavorite = (image) => {
    const tempArr = favoriteIcons;
    if (tempArr.indexOf(image) === -1) {
      tempArr.push(image)
    }
    else {
      tempArr.splice((tempArr.indexOf(image)), 1)
    }
    setFavoriteIcons(tempArr)
  }

  const handleRemoveFavorite = (image) => {
    const tempArr = favoriteIcons;
    tempArr.splice((tempArr.indexOf(image)), 1)
    setFavoriteIcons(tempArr)
    setRerender(prev => !prev)
  }

  const handleClick = () => {
    setRerender(prev => !prev)
  }
  useEffect(() => {
  }, [rerender])





  return (
    <div className="icon_container">
      <h2 className="icon_header">Ikony</h2>
      <div className="icon_content">
        <Tab.Container defaultActiveKey="ulubione" mountOnEnter>
          <div className="nav_col">
            <Nav variant="pills" className="flex-column">
              <Nav.Link eventKey="ulubione" onClick={handleClick}>
                <img src={Favorite} alt="favorite" className="favorite_nav" />
                Ulubione
              </Nav.Link>
              {iconCategories.map((el, i) => (
                <Nav.Link key={i} eventKey={el.name}>{el.name}</Nav.Link>
              ))}
            </Nav>
          </div>
          <div className="content_col">
            <Tab.Content>
              <Tab.Pane eventKey="ulubione">
                <div className="icons">
                  <p className="instruction_bold">Wybierz kategorię ikon, a następie przeciągaj wybrane ikony w odpowiednie miejsce na panelu. Kliknij ikonę aby dodać ją do Ulubionych.</p>
                  {(favoriteIcons.length === 0) ?
                    <>
                      <p className="instruction">W tym miejscu pojawią się ikony zaznaczone jako Ulubione
                    <img src={Favorite} alt="favorite" className="favorite_instruction" />
                      </p>

                    </>

                    : favoriteIcons.map((image, index) =>
                      <IconToDrag key={index} image={image}
                        addToFavorite={(image) => handleFavorite(image)}
                        removeFavorite={(image) => handleRemoveFavorite(image)}
                        isInFavorite={true}
                        favoriteIcons={favoriteIcons} />)}
                </div>
              </Tab.Pane>
              {iconCategories.map((el, i) => (
                <Tab.Pane eventKey={el.name} key={i}>
                  <div className="icons">
                    {
                      el.listOfIcons.map(
                        (image, index) => <IconToDrag key={index} image={image}
                          addToFavorite={(image) => handleFavorite(image)}
                          removeFavorite={(image) => handleRemoveFavorite(image)}
                          isInFavorite={false}
                          favoriteIcons={favoriteIcons} />

                      )
                    }
                  </div>
                </Tab.Pane>
              ))}
            </Tab.Content>
          </div>
        </Tab.Container>


      </div>
    </div>

  );
})

export default IconEditor;
