const toBackend =
{
  backEndData: {
    panelName: "kuchnia", // nazwa nadana przez użytkownika, string?
    panelType: 0,
    // 0 - MDOT-2 
    // 1 - MDOT-4
    // 2 - MDOT-6
    // 3 - MDOT-6 nowy
    // 4 - MDOT-9
    // 5 - MDOT-15
    // 6 - MDOT-18
    // 7 - MDOT-18 poziomy
    // 8 - MDOT-M18
    // XXXX- MDOT-M18 uniwersalny ---- nie ma, traktujemy jak 8-MDOT-M18
    panelColorRal: 9005, // RAL
    panelColorHex: "#060707", // hex jako string
    icons: [
      {
        number: 1, // numer ikony liczony od 1 do 21, przy uniwersal wypełnij i wyślij ikonki pod polami 1,3,4,6,7,9, przy poziomym liczenie tak samo
        type: 0, // 0 - normalne, 1 - dzielona górna, 2- dzielona dolna, 3 - statusowa 
        rotation: 0, // 0, 90, 180, 270 - obrót zgodnie z ruchem wskazówek zegara w deg, przy poziomym wyjściowe rotatnion: 90
        proportion: 0, // 0 - domyślnie 50:50, dla każdej ikony ustawione,  1 i 2 mogą mieć tylko ikony dzielone (type 1 i 2)
        // 1 - lewa górna 70, prawa dolna 30;  2 - lewa górna 30, prawa dolna 70
        svg: "XML" // przekopiowany xml, xml to base64
      }
    ],
    panelText: [
      {
        number: 1, // jak icons 
        type: 0, // 0 - dół , 1 - góra, 
        title: "OPIS", //string drukowanymi
        font: "Calibri", // nazwa czcionki
      }
    ],
    fames: [
      {
        sizeX: 1, // szerokość, 1 to mała, 
        sizeY: 1, // wysokość,  
        iconStart: 1, //od 1
        cornerRadious: 0, // 0 - proste, 1 - zaokrąglone
        title: "TYTUŁ", // jak nie ma to null
        font: "Calibri", // nazwa czcionki
      }
    ]
  },
  frontEndData: {
    //mój stan reduxowy do przytrzymania
  }
}
export default toBackend


