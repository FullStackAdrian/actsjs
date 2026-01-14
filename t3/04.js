// Exercici 4 – Execució en paral·lel
// Creem tres promeses amb temps d'espera diferents i provem:
// Promise.all, Promise.race, Promise.any, Promise.allSettled
// També mostrem què passa quan una falla.

function promesaAmbTemps(nom, temps, fallar = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (fallar) {
                reject(new Error(`${nom} ha fallat`));
            } else {
                resolve(`${nom} resolta en ${temps}ms`);
            }
        }, temps);
    });
}

const p1 = promesaAmbTemps("p1", 300);
const p2 = promesaAmbTemps("p2", 600);
const p3 = promesaAmbTemps("p3", 100);

// 1) Promise.all — falla si alguna promesa falla; retorna array de resultats si totes ok
Promise.all([p1, p2, p3])
    .then((results) => {
        console.log("[05-parallel] Promise.all resultats:", results);
    })
    .catch((err) => {
        console.error("[05-parallel] Promise.all error:", err.message);
    });

// 2) Promise.race — retorna el primer que es resolgui o rellanciï (resolució o rebuig)
Promise.race([p1, p2, p3])
    .then((first) => {
        console.log("[05-parallel] Promise.race primer resultat:", first);
    })
    .catch((err) => {
        console.error("[05-parallel] Promise.race error:", err.message);
    });

// 3) Promise.any — retorna la primera promesa que s'acompleixi; falla si totes fallen
Promise.any([p1, p2, p3])
    .then((anyResult) => {
        console.log("[05-parallel] Promise.any resultat:", anyResult);
    })
    .catch((err) => {
        // err és un AggregateError si totes fallen
        console.error("[05-parallel] Promise.any error (totes han fallat):", err);
    });

// 4) Promise.allSettled — retorna l'estat de totes les promeses (fulfilled/rejected)
Promise.allSettled([p1, p2, p3]).then((states) => {
    console.log("[05-parallel] Promise.allSettled estats:", states);
});

// --------- Ara fem una prova on una promesa falla per analitzar els casos ----------
const p1f = promesaAmbTemps("p1", 300);
const p2f = promesaAmbTemps("p2", 600, true); // p2 fallarà
const p3f = promesaAmbTemps("p3", 100);

Promise.all([p1f, p2f, p3f])
    .then((results) => {
        console.log("[05-parallel] (fallida) Promise.all resultats:", results);
    })
    .catch((err) => {
        console.error("[05-parallel] (fallida) Promise.all error:", err.message);
    });

Promise.race([p1f, p2f, p3f])
    .then((first) => {
        console.log("[05-parallel] (fallida) Promise.race primer resultat:", first);
    })
    .catch((err) => {
        console.error("[05-parallel] (fallida) Promise.race error:", err.message);
    });

Promise.any([p1f, p2f, p3f])
    .then((anyResult) => {
        console.log("[05-parallel] (fallida) Promise.any resultat:", anyResult);
    })
    .catch((err) => {
        console.error("[05-parallel] (fallida) Promise.any error (totes han fallat):", err);
    });

Promise.allSettled([p1f, p2f, p3f]).then((states) => {
    console.log("[05-parallel] (fallida) Promise.allSettled estats:", states);
});
