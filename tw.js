function avtomatskaNadgradnja() {

    //zgradbe za upgrade
    var upgrade_building = ["main_buildrow_wood","main_buildrow_stone","main_buildrow_iron"];
    // Poišči vse vrstice zgradb
    var vrsticeZgradb = document.querySelectorAll('tr[id^="main_buildrow_"]');

    vrsticeZgradb.forEach(function(vrstica) {

        //samo zgradbe, ki so v array-u upgrade_buildings
        if(upgrade_building.includes(vrstica.id)) {
            //console.log(vrstica.id);
            var buildOptions = vrstica.querySelector('.build_options');

            var povezavaZaKlik = buildOptions.querySelectorAll('[id^="main_buildlink_"]')

            console.log(povezavaZaKlik[1])

            povezavaZaKlik[1].click();

        }

    });
}

// Začni izvajati funkcijo
avtomatskaNadgradnja();