import React, { useState } from 'react';
import "./PanelChooser.scss"
import availablePanels from "./availablePanels"
import { Select } from "antd"


const PanelChooser = ({ onModelSet, chosenModel}) => {

    const { Option } = Select;

    const [model, setModel] = useState(chosenModel)

    const handlePanelChange = (value) => {
        onModelSet(availablePanels.find(panel => panel.type === value));
        setModel(availablePanels.find(panel => panel.type === value))
    };


    return (
        <div className="panelChooser_container">
            <form className="panel_form">
                <label>Wybierz model:</label>
                <Select defaultValue={model.type} style={{ width: 150 }} value={availablePanels.type} onChange={handlePanelChange}>
                    {availablePanels.map((panel) => <Option key={panel.type}>{panel.type}</Option>)}
                </Select>



            </form>

            <ul className="panel_list">
                <li>Nazwa panelu: <span>{model.type}</span></li>
                <li>Liczba ikon: <span>{model.numberOfDots}</span></li>
                <li>Wysokość: <span>{model.height}</span></li>
                <li>Szerokość: <span>{model.width}</span></li>
                <li>Wyświetlacz LCD: <span>{(model.lcdScreen === true) ? "tak" : "nie"}</span></li>
            </ul>
        </div>
    );
};

export default PanelChooser;





// import React, { useState } from 'react';
// import "./PanelChooser.scss"
// import availablePanels from "./availablePanels"
// import { Select } from "antd"


// const PanelChooser = ({ onModelSet }) => {

//     const { Option } = Select;

//     const [chosenPanel, setChosenPanel] = useState(availablePanels[0])


//     // const handlePanelChange = (e) => {
//     //     console.log(e.target.value)
//     //     onModelSet(availablePanels.find(panel => panel.type === e.target.value));
//     //     setChosenPanel(availablePanels.find(panel => panel.type === e.target.value))
//     // };

//     const handlePanelChange = (value) => {
//         onModelSet(availablePanels.find(panel => panel.type === value));
//         setChosenPanel(availablePanels.find(panel => panel.type === value))
//     };

//     return (
//         <div className="panelChooser_container">
//             <form className="panel_form">
//                 <label>Wybierz model:</label>
//                 {/* <select value={availablePanels.type} onChange={handlePanelChange}>
//                     {availablePanels.map((panel) => <option key={panel.type}>{panel.type}</option>)}
//                 </select> */}
//                 <Select defaultValue={availablePanels[0].type} style={{ width: 150 }}  value={availablePanels.type} onChange={handlePanelChange}>
//                     {availablePanels.map((panel) => <Option key={panel.type}>{panel.type}</Option>)}
//                 </Select>




//             </form>

//             <ul className="panel_list">
//                 <li>Nazwa panelu: <span>{chosenPanel.type}</span></li>
//                 <li>Liczba ikon: <span>{chosenPanel.numberOfDots}</span></li>
//                 <li>Wysokość: <span>{chosenPanel.height}</span></li>
//                 <li>Szerokość: <span>{chosenPanel.width}</span></li>
//                 <li>Wyświetlacz LCD: <span>{(chosenPanel.lcdScreen === true) ? "tak" : "nie"}</span></li>
//             </ul>
//         </div>
//     );
// };

// export default PanelChooser;