// ==UserScript==
// @name         Avtomatska Nadgradnja Zgradb
// @namespace    http://tvoj.namespace/
// @version      1.0
// @description  Avtomatično nadgradi zgradbe v igri
// @author       Pegi4
// @match        https://en137.tribalwars.net/game.php?village=73339&screen=main
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    //zgradbe za upgrade
    let upgrade_buildings = ["wood", "stone", "iron"];

    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    function timeStringToMilliseconds(timeString) {
        // Razdelimo časovni zapis na ure, minute in sekunde
        const timeParts = timeString.split(':');
        
        // Pretvorimo ure, minute in sekunde v milisekunde in seštejemo
        const hoursInMilliseconds = parseInt(timeParts[0]) * 60 * 60 * 1000;
        const minutesInMilliseconds = parseInt(timeParts[1]) * 60 * 1000;
        const secondsInMilliseconds = parseInt(timeParts[2]) * 1000;
        
        // Skupno število milisekund
        const totalMilliseconds = hoursInMilliseconds + minutesInMilliseconds + secondsInMilliseconds;
        
        return totalMilliseconds;
    }

    function getBuildingTime() {
        let buildQueueElement = document.getElementById('buildqueue');
        let timeSpan = buildQueueElement ? buildQueueElement.querySelector('[class*="buildorder_"] td > span') : null;
    
        if (timeSpan) {
            let cas = timeStringToMilliseconds(timeSpan.innerHTML)
            //console.log(cas);
            return cas;
        } else {
            console.log("Dobenih zgradb se ne bilda");
            return null;
        }
    }    

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

    function upGradeBuilding() {
        // Poišči vse vrstice zgradb
        let vrsticeZgradb = document.querySelectorAll('.build_options');
        //zgradba najnižje stopnje za upgradat
        let stavba_min = null;
        let najnizji_lvl = Infinity;

        vrsticeZgradb.forEach(function(vrstica) {
            let povezava = vrstica.querySelectorAll('a[data-building]');
            //console.log(povezava);

            //KATERA STAVA JE
            //dataset.building
            //BUILD LINK
            //href
            if (povezava.length > 0) {
                let building = povezava[1];
                if (building.style.display !== "none" && upgrade_buildings.includes(building.dataset.building)) {
                    let building_lvl = parseInt(building.dataset.levelNext);
                    if (building_lvl < najnizji_lvl) {
                        najnizji_lvl = building_lvl;
                        stavba_min = building;
                    }
                } 
            }
        });
        return stavba_min;
    }

    function nadgradiZgradbo() {
        let upGB = upGradeBuilding();
        if (upGB) {
            console.log('Zgradi: ' + upGB.dataset.building + ' na stopnjo: ' + upGB.dataset.levelNext);
            //upGB.click();
        } else {
            console.log('Ni dovolj surovin za nadgradnjo.');
        }
    }

    function avtomatskaNadgradnja() {
        console.log("Start");
        let upgrade_time = randomIntFromInterval(3000,5000);
        let reload_time = randomIntFromInterval(upgrade_time, upgrade_time+2000)
        console.log("Upgrade time: " + upgrade_time);
        
        if (buildqueue() < 5) {
            setTimeout(()=>{
                nadgradiZgradbo();
                console.log("Reload time in: " + reload_time);
            },upgrade_time);
            setTimeout(()=>{
                location.reload();
            },reload_time);
        } else {
            setTimeout(()=>{
                setTimeout(()=>{
                    location.reload();
                },getBuildingTime());
                console.log("Čas reload je nastavljen na: " + getBuildingTime() + "ms");
            }, 1000);
        }
    }

    window.addEventListener("load", () => {
        // Začni izvajati funkcijo
        avtomatskaNadgradnja();
    });

})();