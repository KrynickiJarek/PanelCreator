import React from 'react';
<<<<<<< HEAD
import { Tabs } from 'antd';
import iconCategories from "./iconCategories"


const { TabPane } = Tabs;

const IconEditor = () => {

    
    

    return (
      <div>
        <Tabs defaultActiveKey="1" tabPosition="left" style={{ height: 700}} tabBarGutter={-10} centered={false}>
          {iconCategories.map((el,i) => (
            <TabPane tab={el.name} key={i} >
              Content of tab {el.name}
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }

export default IconEditor;

=======

const IconEditor = () => {
    return (
        <>
            <h1>IconEditor</h1>
        </>
    );
};

export default IconEditor;
>>>>>>> parent of 9ee0cb0... vertical tabs in iconEditor added
