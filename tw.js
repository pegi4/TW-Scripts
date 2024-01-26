function avtomatskaNadgradnja() {

    //zgradbe za upgrade
    var upgrade_buildings = ["wood","stone","iron"];
    // Poišči vse vrstice zgradb
    var vrsticeZgradb = document.querySelectorAll('.build_options');

    vrsticeZgradb.forEach(function(vrstica) {

        //console.log(vrstica);

        //KATERA STAVA JE
        //dataset.building
        //BUILD LINK
        //href
        let building = vrstica.querySelectorAll('a[data-building]')[1];
        if(upgrade_buildings.includes(building.dataset.building)) {
            console.log('Zgradi: ' + building.dataset.building);
            building.click();
        }

    });
}

// Začni izvajati funkcijo
avtomatskaNadgradnja();