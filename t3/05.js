// Exercici 5 – Refactor amb async / await
// Reescrivim l'exercici de cadena usant async/await i try/catch.
// Compara llegibilitat amb la versió amb .then().

function transformaText(text) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(text.split("").reverse().join("")), 350); // exemple: invertir text
    });
}

function afegeixInfo(text) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(`${text} [info afegida async]`), 250);
    });
}

async function processaText(original) {
    try {
        const t = await transformaText(original);
        const final = await afegeixInfo(t);
        console.log("[07-async] resultat final (async/await):", final);
        return final;
    } catch (err) {
        console.error("[07-async] Error:", err.message);
        throw err;
    }
}

// Cridem la funció
processaText("async await");
