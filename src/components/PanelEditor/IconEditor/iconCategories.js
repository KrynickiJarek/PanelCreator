const importAll = (r) => {
    return r.keys().map(r);
}


const iconCategories = [
    {
        name: "Bezpieczeństwo",
        directory: "bezpieczenstwo",
        listOfIcons: importAll(require.context("../../../assets/icons/bezpieczenstwo", true, /\.(svg)$/))
    },
    {
        name: "Bramy i rolety",
        directory: "bramyrolety",
        listOfIcons: importAll(require.context("../../../assets/icons/bramyrolety", true, /\.(svg)$/))
    },
    {
        name: "Dom",
        directory:"dom",
        listOfIcons: importAll(require.context("../../../assets/icons/dom", true, /\.(svg)$/))
    },
    {
        name: "Oświetlenie",
        directory:"lights",
        listOfIcons: importAll(require.context("../../../assets/icons/lights", true, /\.(svg)$/))
    },
    {
        name: "Meble",
        directory:"meble",
        listOfIcons: importAll(require.context("../../../assets/icons/meble", true, /\.(svg)$/))
    },
    {
        name: "Muzyka",
        directory:"muzyka",
        listOfIcons: importAll(require.context("../../../assets/icons/muzyka", true, /\.(svg)$/))
    },
    {
        name: "Ogród",
        directory:"ogrod",
        listOfIcons: importAll(require.context("../../../assets/icons/ogrod", true, /\.(svg)$/))
    },
    {
        name: "Ogrzewanie",
        directory:"ogrzewanie",
        listOfIcons: importAll(require.context("../../../assets/icons/ogrzewanie", true, /\.(svg)$/))
    },
    {
        name: "Pełne ikony",
        directory: "pelneikony",
        listOfIcons: importAll(require.context("../../../assets/icons/pelneikony", true, /\.(svg)$/))
    },
    {
        name: "Pomieszczenia",
        directory:"pomieszczenia",
        listOfIcons: importAll(require.context("../../../assets/icons/pomieszczenia", true, /\.(svg)$/))
    },
    {
        name: "Sceny",
        directory:"sceny",
        listOfIcons: importAll(require.context("../../../assets/icons/sceny", true, /\.(svg)$/))
    },
    {
        name: "Urządzenia",
        directory:"urzadzenia",
        listOfIcons: importAll(require.context("../../../assets/icons/urzadzenia", true, /\.(svg)$/))
    },
    {
        name: "Znaki",
        directory:"znaki",
        listOfIcons: importAll(require.context("../../../assets/icons/znaki", true, /\.(svg)$/))
    },
    {
        name: "Numery",
        directory:"numery",
        listOfIcons: importAll(require.context("../../../assets/icons/numery", true, /\.(svg)$/))
    },
    // {
    //     name: "Ulubione",
    //     directory:"ulubione",
    //     listOfIcons: importAll(require.context("../../../assets/icons/ulubione", true, /\.(svg)$/))
    // }
    // ,
    // {
    //     name: "Własne",
    //     directory:"wlasne",
    //     listOfIcons: importAll(require.context("../../../assets/icons/wlasne", true, /\.(svg)$/))
    // }
];

export default iconCategories