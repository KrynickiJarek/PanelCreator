const importAll = (r) => {
  return r.keys().map(r);
}


const keyboardsSetsLabels = [
  {
    listOfLabels: importAll(require.context("../../../../assets/keyboards/sets", true, /\.(svg)$/))
  }
];

export default keyboardsSetsLabels