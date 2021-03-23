import React, { useState } from 'react';
import "./PanelChooser.scss"
import availablePanels from "./availablePanels"


const PanelChooser = ({ onModelSet }) => {

    const [chosenPanel, setChosenPanel] = useState(availablePanels[0])


    const handlePanelChange = (e) => {
        console.log(e.target.value)
        onModelSet(availablePanels.find(panel => panel.type === e.target.value));
        setChosenPanel(availablePanels.find(panel => panel.type === e.target.value))
    };

    return (
        <>
            <form className="panel_form">
                <p>Wybierz model:</p>
                <select value={availablePanels.type} onChange={handlePanelChange}>
                    {availablePanels.map((panel) => <option key={panel.type}>{panel.type}</option>)}
                </select>
            </form>


            {/* <p>Ilość ikon: {chosenPanel.numberOfDots}</p> */}
            <ul>
                <li>Nazwa panelu{chosenPanel.type}</li>
                <li>Liczba ikon: {chosenPanel.numberOfDots}</li>
                <li>Wysokość: {chosenPanel.height}</li>
                <li>Szerokość: {chosenPanel.width}</li>
                <li>Wyświetlacz LCD: {(chosenPanel.lcdScreen===true) ? "tak" : "nie" }</li>
            </ul>
        </>
    );
};

export default PanelChooser;