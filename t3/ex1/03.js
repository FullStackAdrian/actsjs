// Exercici 3 – Gestió d'errors
// Modifiquem l'exercici anterior perquè una promesa pugui fallar
// i gestionem l'error amb .catch() (i .finally()).

function transformText(text) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve(text.trim().toLowerCase());
            } catch (error) {
                reject(new Error("Type Error: can not trim type  " + typeof text));
            }
        }, 400);
    });
}

function addInfo(text) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(text + " this is added info");
        }, 300);
    });
}

transformText(1)
    .then((t) => addInfo(t))
    .then((final) => {
        console.log("final result:", final);
    })
    .catch((err) => {
        console.error("Excepted error: ", err.message);
    })
    .finally(() => {
        console.log("This is finally");
    });
