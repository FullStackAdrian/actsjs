// Exercici 5 – Refactor amb async / await
// Reescrivim l'exercici de cadena usant async/await i try/catch.
// Compara llegibilitat amb la versió amb .then().

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
            resolve(text + "-- this is added info");
        }, 400);
    });
}
async function doPromises(text) {
    try {
        const t = await transformText(text);
        const final = await addInfo(t);
        console.log(" Resolve :" + final);
        return final;
    } catch (err) {
        console.log("Error: " + err.message);
    }
}

// Cridem la funció
doPromises(1);
