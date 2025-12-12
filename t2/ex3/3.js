//#region  form functions
function getData(form, keys) {
    const fd = new FormData(form);
    const values = [...fd.values()];
    const data = keys.reduce((obj, key, i) => {
        obj[key] = values[i];
        return obj;
    }, {});

    return data;
}

function validate(data, validationRules) {
    const errors = [];
    Object.values(data).forEach((value, key) => {
        if (!validationRules[keys[key]].validate(value)) {
            errors.push(validationRules[keys[key]].message);
        }
    });
    return errors;
}
//#endregion

function removeAllChildrens(el) {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
}

function ListController(ul) {
    function appendItemToList(data, keys) {
        const li = document.createElement("li");
        if (keys !== null) {
            keys.forEach(key => {
                const text = data[key];
                console.log(text);
                li.textContent += " " + text;
            });
        } else {
            data.forEach(text => {
                li.textContent += " " + text;
            });
        }
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "delete";
        deleteButton.addEventListener('click', () => deleteItem(li));

        li.appendChild(deleteButton);
        ul.appendChild(li);

        return li;
    }
    function deleteItem(li) {
        ul.removeChild(li);
    }
    function cleanList() {
        removeAllChildrens(ul);
    }

    return { ul, appendItemToList, deleteItem, cleanList };
}

function TaskController() {

    const divTaskList = document.getElementById("llistaTasques");
    const liController = ListController(document.createElement("ul"));
    const pSuccessSubmit = document.createElement("p");

    divTaskList.appendChild(liController.ul);
    divErrors.appendChild(pSuccessSubmit);

    function addTasc(tasca, keys, errors) {

        if (errors.length === 0) {
            pSuccessSubmit.textContent = "Formulari enviat correctament!";
            ulTaskController.appendItemToList(tasca, keys);

            return true;
        }

        return false;
    }

    return { addTasc };
}

function ErrorsController() {

    const ulErrorController = ListController(document.createElement("ul"));
    const divErrors = document.getElementById("errors");


    divErrors.appendChild(ulErrorController.ul);

    function addErrors(errors) {
        errors.forEach(error => {
            ulErrorController.appendItemToList(validationRules[keys[key]].message);
        });
    }

    function cleanErrors() {
        ulErrorController.cleanList();
        removeAllChildrens(divErrors);
        const liErrors = errors.length ? ulErrorController.getAllLi() : null;

    }

    return { cleanErrors, addErrors };
}

const form = document.getElementById("form-tasca");

const keys = ["nom_tasca", "categoria_tasca", "data_tasca"];

const validationRules = {
    nom_tasca: {
        validate: (nom) => nom && nom.trim().length >= 3 && /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(nom),
        message: "El nom és obligatori, mínim 3 caràcters i només alfabètic.",
    },
    categoria_tasca: {
        validate: (cat) => cat && cat.trim() !== "",
        message: "Cal seleccionar una categoria.",
    },
    data_tasca: {
        validate: (dateStr) => {
            if (!dateStr) return false;
            const parts = dateStr.split("-");
            if (parts.length !== 3) return false;
            const [yyyy, mm, dd] = parts.map(Number);
            const date = new Date(yyyy, mm - 1, dd);
            if (isNaN(date)) return false;
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date >= today;
        },
        message: "La data és obligatòria, format DD/MM/YYYY i no pot ser anterior a l'actual.",
    },
};

// get taskList and  error divs

const taskController = TaskController();
const errorController = ErrorsController()

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = getData(form, keys);

    errorController.addErrors(validate(data, validationRules));
    task.addTasc(data, keys, errors);

});
