import React from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const IconEditor = () => {
    
const iconCategories = ["Bezpieczeństwo", "Bramy i rolety","Dom","Oświetlenie","Megle","Muzyka","Ogród","Ogrzewanie","Pełne ikony","Pomieszczenia",
                        "Sceny","Urządzenia","Znaki","Numery","Ulubione","Własne"]


    return (
      <div>
        <Tabs defaultActiveKey="1" tabPosition="left" style={{ height: 700}} tabBarGutter={-15} centered={false}>
          {iconCategories.map((el,i) => (
            <TabPane tab={el} key={i} >
              Content of tab {el}
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }

export default IconEditor;


// import React, {useState} from 'react';
// import { Tabs, Radio } from 'antd';

// const { TabPane } = Tabs;

// const IconEditor = () => {
//     const [mode, setMode] = useState("top")
    

//   const handleModeChange = e => {
//     setMode(e.target.value);
      
//   };

//     return (
//       <div>
//         <Radio.Group onChange={handleModeChange} value={mode} style={{ marginBottom: 8 }}>
//           <Radio.Button value="top">Horizontal</Radio.Button>
//           <Radio.Button value="left">Vertical</Radio.Button>
//         </Radio.Group>
//         <Tabs defaultActiveKey="1" tabPosition={mode} style={{ height: 220 }}>
//           {[...Array.from({ length: 30 }, (v, i) => i)].map(i => (
//             <TabPane tab={`Tab-${i}`} key={i} disabled={i === 28}>
//               Content of tab {i}
//             </TabPane>
//           ))}
//         </Tabs>
//       </div>
//     );
//   }

// export default IconEditor;




// import React from 'react';
// import { Tabs, Radio } from 'antd';


// const IconEditor = () => {

//     const { TabPane } = Tabs;
//     function callback(key) {
//       console.log(key);
//     }


//     return (
//         <>
//             <h1>IconEditor</h1>

//             <Tabs defaultActiveKey="1" tabPosition={mode} style={{ height: 220 }}>
//           {[...Array.from({ length: 30 }, (v, i) => i)].map(i => (
//             <TabPane tab={`Tab-${i}`} key={i} disabled={i === 28}>
//               Content of tab {i}
//             </TabPane>
//           ))}
//         </Tabs>
//         </>
//     );
// };

// export default IconEditor;