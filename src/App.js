import React from 'react';
import './App.less';
import MainCreator from "./components/MainCreator"
import { Button } from 'antd';

function App() {
  return (
    <div className="App">
      {/* <MainCreator/> */}
      <Button type="primary">Button</Button>
    </div>
  );
}

export default App;
