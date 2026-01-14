// Exercici 2 – Cadena de promeses
// - la primera transforma un text
// - la segona afegeix informació al resultat
// Encadena-les amb `.then()` i mostra el resultat final.

function transformaText(text) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // exemple de transformació: majúscules i trim
            resolve(text.trim().toUpperCase());
        }, 500);
    });
}

function afegeixInfo(text) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`${text} -- AFEGIT: informació extra`);
        }, 400);
    });
}

// Cadena amb .then()
transformaText("  hola promeses  ")
    .then((t) => afegeixInfo(t))
    .then((final) => {
        console.log("[02-chain] resultat final:", final);
    });
