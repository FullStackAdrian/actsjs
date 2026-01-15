const promesa = new Promise((resolve) => {
    setTimeout(() => {
        resolve("resolve after one second");
    }, 1000);
});

promesa.then((resultat) => {
    console.log("text:", resultat);
});
