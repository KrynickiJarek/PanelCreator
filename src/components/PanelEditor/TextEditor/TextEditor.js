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
//         <Tabs defaultActiveKey="0" tabPosition="left" style={{ height: 700 }} tabBarGutter={-10} centered={false}>
//           {iconCategories.map((el, i) => (
//             <TabPane tab={el.name} key={i} >
//               <div className="icons">
//                 {
//                   el.listOfIcons.map(
//                     (image, index) => <IconToDrag key={index} image={image} />
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



import React from 'react';

const TextEditor = () => {
    return (
        <>
        <h1>TextEditor</h1>
        </>
    );
};

export default TextEditor;