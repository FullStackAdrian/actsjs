function removeChilds(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function apiController() {
    const BASE_URL = "https://pokeapi.co/api/v2";

    async function getInitialPokemons() {
        try {
            const response = await fetch(`${BASE_URL}/pokemon?limit=20`);
            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async function getPokemonsByType(type) {
        try {
            const response = await fetch(`${BASE_URL}/type/${type}`);
            const data = await response.json();

            return data.pokemon.map((p) => p.pokemon).slice(0, 20);
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async function getPokemonDetails(nameOrId) {
        try {
            const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    return { getInitialPokemons, getPokemonsByType, getPokemonDetails };
}

function renderController() {
    const container = document.getElementById("container");

    function cleanContainer() {
        removeChilds(container);
    }

    function renderControls(onFilter) {
        const controlsDiv = document.createElement("div");

        const label = document.createElement("label");
        label.textContent = "Filtrar por tipo: ";

        const select = document.createElement("select");

        const defaultOpt = document.createElement("option");
        defaultOpt.value = "";
        defaultOpt.textContent = "--- Todos ---";
        select.appendChild(defaultOpt);

        const types = ["fire", "water", "grass", "electric", "ice", "fighting", "poison", "ground"];
        types.forEach((t) => {
            const opt = document.createElement("option");
            opt.value = t;
            opt.textContent = t;
            select.appendChild(opt);
        });

        const btn = document.createElement("button");
        btn.textContent = "Buscar";

        btn.addEventListener("click", () => {
            onFilter(select.value);
        });

        controlsDiv.appendChild(label);
        controlsDiv.appendChild(select);
        controlsDiv.appendChild(btn);

        container.parentElement.insertBefore(controlsDiv, container);
    }

    function renderList(pokemons, onDetailClick) {
        cleanContainer();

        if (!pokemons || pokemons.length === 0) {
            const msg = document.createElement("p");
            msg.textContent = "No se encontraron resultados.";
            container.appendChild(msg);
            return;
        }

        const ul = document.createElement("ul");

        pokemons.forEach((poke) => {
            const li = document.createElement("li");

            const textSpan = document.createElement("span");
            textSpan.textContent = poke.name + " ";

            const linkBtn = document.createElement("a");
            linkBtn.textContent = "[Ver detalles]";
            linkBtn.href = "#";
            linkBtn.style.marginLeft = "10px";

            linkBtn.addEventListener("click", (e) => {
                e.preventDefault();
                onDetailClick(poke.name);
            });

            li.appendChild(textSpan);
            li.appendChild(linkBtn);
            ul.appendChild(li);
        });

        container.appendChild(ul);
    }

    function renderDetails(data, onBack) {
        cleanContainer();

        const detailDiv = document.createElement("div");

        const backBtn = document.createElement("button");
        backBtn.textContent = "Volver al listado";
        backBtn.addEventListener("click", onBack);

        const title = document.createElement("h2");
        title.textContent = `${data.name} (ID: ${data.id})`;

        const img = document.createElement("img");
        if (data.sprites && data.sprites.front_default) {
            img.src = data.sprites.front_default;
        }

        const dataList = document.createElement("ul");

        const addDataVal = (label, val) => {
            const li = document.createElement("li");
            li.textContent = `${label}: ${val}`;
            dataList.appendChild(li);
        };

        addDataVal("Altura", data.height);
        addDataVal("Peso", data.weight);

        const typesStr = data.types.map((t) => t.type.name).join(", ");
        addDataVal("Tipos", typesStr);

        detailDiv.appendChild(backBtn);
        detailDiv.appendChild(title);
        detailDiv.appendChild(img);
        detailDiv.appendChild(dataList);

        container.appendChild(detailDiv);
    }

    return { renderControls, renderList, renderDetails };
}

async function main() {
    const { getInitialPokemons, getPokemonsByType, getPokemonDetails } = apiController();
    const { renderControls, renderList, renderDetails } = renderController();

    let currentList = [];

    async function handleFilter(type) {
        if (!type) {
            currentList = await getInitialPokemons();
        } else {
            currentList = await getPokemonsByType(type);
        }
        renderList(currentList, handleDetailClick);
    }

    async function handleDetailClick(name) {
        const details = await getPokemonDetails(name);
        renderDetails(details, () => renderList(currentList, handleDetailClick));
    }

    renderControls(handleFilter);

    currentList = await getInitialPokemons();
    renderList(currentList, handleDetailClick);
}

main();
