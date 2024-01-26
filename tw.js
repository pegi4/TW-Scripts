function avtomatskaNadgradnja() {

    //zgradbe za upgrade
    var upgrade_building = ["main_buildrow_wood","main_buildrow_stone","main_buildrow_iron"];
    // Poišči vse vrstice zgradb
    var vrsticeZgradb = document.querySelectorAll('tr[id^="main_buildrow_"]');

    vrsticeZgradb.forEach(function(vrstica) {

        if(upgrade_building.includes(vrstica.id)) {
            //console.log(vrstica.id);
        }

    });
}

// Začni izvajati funkcijo
avtomatskaNadgradnja();