function buildqueue() {

    let buildqueue = document.getElementById('buildqueue');

    // if nothing is in queue
    if (!buildqueue) {
        return 0;
    } else {
        let buildOrder = buildqueue.querySelectorAll('[class*="buildorder_"]');
    
        return buildOrder.length;
    }

}

function avtomatskaNadgradnja() {

    if(buildqueue() < 2) {
        //zgradbe za upgrade
        let upgrade_buildings = ["wood","stone","iron"];
        // Poišči vse vrstice zgradb
        let vrsticeZgradb = document.querySelectorAll('.build_options');
        //zgradba najnižje stopnje za upgradat
        let stavba_min = null;
        let najnizji_lvl = 100;
    
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
                    let building_lvl = parseInt(building.dataset.levelNext);
    
                    if(building_lvl < najnizji_lvl) {
                        najnizji_lvl = building_lvl;
                        stavba_min = building;
                    }
                }
            }
        });
        if(stavba_min) {
            console.log('Zgradi: ' + stavba_min.dataset.building + ' na stopnjo: ' + stavba_min.dataset.levelNext);
            //stavba_min.click();
        } else {
            console.log('Dobene zgradbe ni mogoce nadgraditi.');
        }
    } else {
        console.log("Spot za upgrade je poln.");
    }

}

// Začni izvajati funkcijo
avtomatskaNadgradnja();