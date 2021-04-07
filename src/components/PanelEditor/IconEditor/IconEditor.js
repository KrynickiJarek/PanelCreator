import React, { memo } from 'react'; 
import { Tabs } from 'antd';
import "./IconEditor.scss"
import iconCategories from "./iconCategories"
import { IconToDrag } from './IconToDrag';


const { TabPane } = Tabs;


export const IconEditor = memo(function IconEditor() {



  return (
    <div>
      <Tabs defaultActiveKey="1" tabPosition="left" style={{ height: 700 }} tabBarGutter={-10} centered={false}>
        {iconCategories.map((el, i) => (
          <TabPane tab={el.name} key={i} >
            <div className="icons">
              {
                el.listOfIcons.map(
                  (image, index) => <IconToDrag key={index} image={image} />
                )
              }
            </div>
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
})

export default IconEditor;

