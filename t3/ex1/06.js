function initialPromise() {
    return new Promise((resolve) => {
        setTimeout(() => resolve("initial completed"), 400);
    });
}

function taskA() {
    return new Promise((resolve) => {
        setTimeout(() => resolve("result A"), 300);
    });
}

function taskB() {
    return new Promise((resolve) => {
        setTimeout(() => resolve("result B"), 200);
    });
}

async function main() {
    try {
        console.log("Inici main()");
        const initial = await initialPromise();
        console.log("initialPromise ->", initial);

        // Call taskA and taskB sequentially or in parallel:
        // Sequential (wait for A before B):
        const a = await taskA();
        const b = await taskB();
        console.log("Sequential: A, B ->", a, ",", b);

        // Parallel (start both and wait Promise.all):
        const [ap, bp] = await Promise.all([taskA(), taskB()]);
        console.log("Parallel with Promise.all ->", ap, ",", bp);

        console.log("Final main()");
    } catch (err) {
        console.error("Error in main():", err.message);
    }
}

// Run main()
main();
