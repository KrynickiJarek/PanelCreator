const importAll = (r) => {
  return r.keys().map(r);
}


const iconCategories = [
  {
    name: "SAFETY",
    directory: "bezpieczenstwo",
    listOfIcons: importAll(require.context("../../../../assets/icons/bezpieczenstwo", true, /\.(svg)$/))
  },
  {
    name: "GATES_AND_ROLLERS",
    directory: "bramyrolety",
    listOfIcons: importAll(require.context("../../../../assets/icons/bramyrolety", true, /\.(svg)$/))
  },
  {
    name: "HOUSE",
    directory: "dom",
    listOfIcons: importAll(require.context("../../../../assets/icons/dom", true, /\.(svg)$/))
  },
  {
    name: "LIGHTS",
    directory: "lights",
    listOfIcons: importAll(require.context("../../../../assets/icons/lights", true, /\.(svg)$/))
  },
  {
    name: "FURNITURE",
    directory: "meble",
    listOfIcons: importAll(require.context("../../../../assets/icons/meble", true, /\.(svg)$/))
  },
  {
    name: "MUSIC",
    directory: "muzyka",
    listOfIcons: importAll(require.context("../../../../assets/icons/muzyka", true, /\.(svg)$/))
  },
  {
    name: "GARDEN",
    directory: "ogrod",
    listOfIcons: importAll(require.context("../../../../assets/icons/ogrod", true, /\.(svg)$/))
  },
  {
    name: "HEATING",
    directory: "ogrzewanie",
    listOfIcons: importAll(require.context("../../../../assets/icons/ogrzewanie", true, /\.(svg)$/))
  },
  {
    name: "FULL_ICONS",
    directory: "pelneikony",
    listOfIcons: importAll(require.context("../../../../assets/icons/pelneikony", true, /\.(svg)$/))
  },
  {
    name: "ROOMS",
    directory: "pomieszczenia",
    listOfIcons: importAll(require.context("../../../../assets/icons/pomieszczenia", true, /\.(svg)$/))
  },
  {
    name: "SCENES",
    directory: "sceny",
    listOfIcons: importAll(require.context("../../../../assets/icons/sceny", true, /\.(svg)$/))
  },
  {
    name: "DEVICES",
    directory: "urzadzenia",
    listOfIcons: importAll(require.context("../../../../assets/icons/urzadzenia", true, /\.(svg)$/))
  },
  {
    name: "SIGNS",
    directory: "znaki",
    listOfIcons: importAll(require.context("../../../../assets/icons/znaki", true, /\.(svg)$/))
  },
  {
    name: "NUMBERS",
    directory: "numery",
    listOfIcons: importAll(require.context("../../../../assets/icons/numery", true, /\.(svg)$/))
  },
];

export default iconCategories