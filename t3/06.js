// Exercici 6 – Flux complet amb async / await
// - crea una funció `main` que:
//   1. esperi una promesa inicial
//   2. cridi dues funcions asíncrones
//   3. mostri tots els resultats per consola
// L'objectiu és entendre l'ordre d'execució i el retorn de valors.

function promesaInicial() {
    return new Promise((resolve) => {
        setTimeout(() => resolve("inicial completada"), 400);
    });
}

function feinaA() {
    return new Promise((resolve) => {
        setTimeout(() => resolve("resultat A"), 300);
    });
}

function feinaB() {
    return new Promise((resolve) => {
        setTimeout(() => resolve("resultat B"), 200);
    });
}

async function main() {
    try {
        console.log("[06-main] Inici main()");
        const inicial = await promesaInicial();
        console.log("[06-main] promesaInicial ->", inicial);

        // Pots cridar feinaA i feinaB en paral·lel o seqüencial:
        // Seqüencial (espera A abans de B):
        const a = await feinaA();
        const b = await feinaB();
        console.log("[06-main] Seqüencial: A, B ->", a, ",", b);

        // Paral·lel (iniciar ambdues i await Promise.all):
        const [ap, bp] = await Promise.all([feinaA(), feinaB()]);
        console.log("[06-main] Paral·lel amb Promise.all ->", ap, ",", bp);

        console.log("[06-main] Final main()");
    } catch (err) {
        console.error("[06-main] Error en main():", err.message);
    }
}

// Executem main()
main();
