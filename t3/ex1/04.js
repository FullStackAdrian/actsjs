// Exercici 4 – Execució en paral·lel
// Creem tres promeses amb temps d'espera diferents i provem:
// Promise.all, Promise.race, Promise.any, Promise.allSettled
// També mostrem què passa quan una falla.

function timingPromise(name, waitingTime) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve(name.trim() + " resolved in " + waitingTime + " ms");
            } catch (error) {
                reject(new Error("Type Error: can not trim type  " + typeof text));
            }
        }, waitingTime);
    });
}


// for make it failure enter type number not char or string
const p1 = timingPromise("p1", 300);
const p2 = timingPromise(2, 600);
const p3 = timingPromise("p3", 100);

Promise.all([p1, p2, p3])
    .then((results) => {
        console.log("Promise all resolves: ", results);
    })
    .catch((err) => {
        console.error("Promise all reject: ", err.message);
    });

Promise.race([p1, p2, p3])
    .then((first) => {
        console.log("Promise race resolve: ", first);
    })
    .catch((err) => {
        console.error("Promise race reject: ", err.message);
    });

Promise.any([p1, p2, p3])
    .then((anyResult) => {
        console.log("Promise any resolve: ", anyResult);
    })
    .catch((err) => {
        console.error("Promise any reject: ", err);
    });

Promise.allSettled([p1, p2, p3]).then((states) => {
    console.log("Promise allSettled states: ", states);
});
