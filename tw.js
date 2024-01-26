function avtomatskaNadgradnja() {

    //zgradbe za upgrade
    var upgrade_buildings = ["wood","stone","iron"];
    // Poišči vse vrstice zgradb
    var vrsticeZgradb = document.querySelectorAll('.build_options');

    vrsticeZgradb.forEach(function(vrstica) {

        let povezava = vrstica.querySelectorAll('a[data-building]');
        //console.log(povezava);

        //KATERA STAVA JE
        //dataset.building
        //BUILD LINK
        //href
        if(povezava.length > 0) {
            let building = povezava[1];
            if(building.style.display !=="none" && upgrade_buildings.includes(building.dataset.building)) {
                let building_name = building.dataset.building;
                let building_lvl = building.dataset.levelNext;
                console.log('Zgradi: ' + building_name + ' na stopnjo: ' + building_lvl);

                //building.click();
            }
        }

    });
}

// Začni izvajati funkcijo
avtomatskaNadgradnja();