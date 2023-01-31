const importAll = (r) => {
  return r.keys().map(r);
}


const keyboardsSets = [
  {
    setName: "Calibri bold",
    listOfIcons: importAll(require.context("../../../../assets/keyboards/calibri_bold", true, /\.(svg)$/))
  },
  {
    setName: "Calibri",
    listOfIcons: importAll(require.context("../../../../assets/keyboards/calibri", true, /\.(svg)$/))
  },
  {
    setName: "Montserrat bold",
    listOfIcons: importAll(require.context("../../../../assets/keyboards/montserrat_bold", true, /\.(svg)$/))
  }
  ,
  {
    setName: "Montserrat",
    listOfIcons: importAll(require.context("../../../../assets/keyboards/montserrat", true, /\.(svg)$/))
  }
];

export default keyboardsSets