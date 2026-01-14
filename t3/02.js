// Exercici 2 – Cadena de promeses
// - la primera transforma un text
// - la segona afegeix informació al resultat
// Encadena-les amb `.then()` i mostra el resultat final.

function transformText(text) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(text.trim().toUpperCase());
        }, 500);
    });
}

function addInfo(text) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(text + "-- this is the extra info");
        }, 400);
    });
}

transformText(" Hello ")
    .then((t) => addInfo(t))
    .then((final) => {
        console.log(" final result: " + final);
    });
