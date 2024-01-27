function calculateRemainingTime(inputString) {
    // Izluščimo čas iz niza
    const timeMatch = inputString.match(/(\d{2}:\d{2})/);
    if (!timeMatch) {
        return "Invalid time format";
    }
    const timeString = `${timeMatch[1]}:00`; // Dodamo sekunde, da ustrezajo formatu HH:MM:SS

    // Trenutni čas in ciljni čas
    const now = new Date();
    const todayDate = now.toISOString().split('T')[0];
    const targetTime = new Date(`${todayDate}T${timeString}`);

    // Dodajamo eno uro k ciljnemu času
    targetTime.setHours(targetTime.getHours() + 1);

    // Razlika v času v milisekundah
    const timeDifference = targetTime - now;
    
    // Preverimo, če je čas že mimo
    if (timeDifference < 0) {
        return "The time has already passed";
    }

    // Pretvorba milisekund v minute
    const minutes = Math.floor(timeDifference / 60000);

    return { milliseconds: timeDifference, minutes: minutes };
}   

function casDoPridobitevSurovin() {
    let vrsticeZgradb = document.querySelectorAll('.build_options');
    //zgradba najnižje stopnje za upgradat
    let stavba_min = null;
    let najnizji_lvl = Infinity;

    vrsticeZgradb.forEach((vrstica)=>{
        let zgradba = vrstica.querySelectorAll('a[data-building]')[1];

        if(upgrade_buildings.includes(zgradba.dataset.building)) {
            let building_lvl = parseInt(zgradba.dataset.levelNext);
            if (building_lvl < najnizji_lvl) {
                najnizji_lvl = building_lvl;
                stavba_min = zgradba;
            }
        }
    })

    let milisekunde = 0;
    vrsticeZgradb.forEach((vrstica)=>{
        let zgradba = vrstica.querySelectorAll('a[data-building]')[1];
        console.log("Zgradba: " + zgradba.dataset.building + " Minimalna zg: " + stavba_min.dataset.building)
        if(zgradba === stavba_min) {
            let ura = vrstica.getElementsByClassName('inactive')[0];
            milisekunde = calculateRemainingTime(ura.innerHTML);
            console.log("Milisekund do pridobitve virov: " + milisekunde.milisekunde)
        }
    })
    return milisekunde.milliseconds;
}