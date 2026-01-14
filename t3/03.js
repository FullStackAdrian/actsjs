// Exercici 3 – Gestió d'errors
// Modifiquem l'exercici anterior perquè una promesa pugui fallar
// i gestionem l'error amb .catch() (i .finally()).

function transformaTextPotFallar(text, fallar = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (fallar) {
                reject(new Error("Error a transformaTextPotFallar: dada invàlida"));
            } else {
                resolve(text.trim().toLowerCase());
            }
        }, 400);
    });
}

function afegeixInfo(text) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`${text} -> informació afegida`);
        }, 300);
    });
}

// Prova amb fallida i gestió d'error
transformaTextPotFallar("  TEST ERROR  ", true)
    .then((t) => afegeixInfo(t))
    .then((final) => {
        console.log("[03-catch-finally] resultat final:", final);
    })
    .catch((err) => {
        console.error("[03-catch-finally] S'ha produït un error clar per consola:", err.message);
    })
    .finally(() => {
        console.log("[03-catch-finally] Execució finalitzada (finally).");
    });
