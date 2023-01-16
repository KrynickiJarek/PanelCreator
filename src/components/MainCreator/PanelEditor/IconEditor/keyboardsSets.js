const importAll = (r) => {
  return r.keys().map(r);
}


const keyboardsSets = [
  {
    setId: 1,
    listOfIcons: importAll(require.context("../../../../assets/keyboards/1", true, /\.(svg)$/))
  }
];

export default keyboardsSets