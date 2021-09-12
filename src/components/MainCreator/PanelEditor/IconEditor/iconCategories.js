const importAll = (r) => {
  return r.keys().map(r);
}


const iconCategories = [
  {
    name: "SAFETY",
    listOfIcons: importAll(require.context("../../../../assets/icons/security", true, /\.(svg)$/))
  },
  {
    name: "GATES_AND_ROLLERS",
    listOfIcons: importAll(require.context("../../../../assets/icons/gates_rollers", true, /\.(svg)$/))
  },
  {
    name: "HOUSE",
    listOfIcons: importAll(require.context("../../../../assets/icons/home", true, /\.(svg)$/))
  },
  {
    name: "LIGHTS",
    listOfIcons: importAll(require.context("../../../../assets/icons/lights", true, /\.(svg)$/))
  },
  {
    name: "FURNITURE",
    listOfIcons: importAll(require.context("../../../../assets/icons/furniture", true, /\.(svg)$/))
  },
  {
    name: "MUSIC",
    listOfIcons: importAll(require.context("../../../../assets/icons/music", true, /\.(svg)$/))
  },
  {
    name: "GARDEN",
    listOfIcons: importAll(require.context("../../../../assets/icons/garden", true, /\.(svg)$/))
  },
  {
    name: "HEATING",
    listOfIcons: importAll(require.context("../../../../assets/icons/heating", true, /\.(svg)$/))
  },
  {
    name: "FULL_ICONS",
    listOfIcons: importAll(require.context("../../../../assets/icons/full_icons", true, /\.(svg)$/))
  },
  {
    name: "ROOMS",
    listOfIcons: importAll(require.context("../../../../assets/icons/rooms", true, /\.(svg)$/))
  },
  {
    name: "SCENES",
    listOfIcons: importAll(require.context("../../../../assets/icons/scenes", true, /\.(svg)$/))
  },
  {
    name: "DEVICES",
    listOfIcons: importAll(require.context("../../../../assets/icons/devices", true, /\.(svg)$/))
  },
  {
    name: "SIGNS",
    listOfIcons: importAll(require.context("../../../../assets/icons/signs", true, /\.(svg)$/))
  },
  {
    name: "NUMBERS",
    listOfIcons: importAll(require.context("../../../../assets/icons/numbers", true, /\.(svg)$/))
  }
];

export default iconCategories