function removeChilds(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function apiController() {
    async function getAllPosts() {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async function getPostById(id) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { method: "GET" });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async function createPost({ title, body }) {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, body }),
            });

            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    return { getAllPosts, getPostById, createPost };
}

function renderController() {
    const container = document.getElementById("container");
    const ul = document.createElement("ul");

    function cleanContainer() {
        console.log("cleanContainer");
        removeChilds(container);
    }

    function renderPosts(posts) {
        posts.forEach((post) => {
            const li = document.createElement("li");
            const title = document.createElement("p");
            const bodyMessage = document.createElement("p");
            const button = document.createElement("button");

            title.textContent = post.title;
            bodyMessage.textContent = post.body;
            button.textContent = "post details";
            const postId = post.id;
            button.addEventListener("click", async () => {
                const post = await apiController().getPostById(postId);
                renderPostDetails(post);
            });

            title.appendChild(button);
            li.appendChild(title);
            li.appendChild(bodyMessage);
            ul.appendChild(li);
        });
        container.appendChild(ul);
    }

    function renderPostDetails(post) {
        cleanContainer();

        const container = document.getElementById("container");

        Object.entries(post).forEach(([key, value]) => {
            const pElement = document.createElement("p");
            pElement.textContent = `${key}: ${value}`;
            container.appendChild(pElement);
        });
    }

    function createForm(onSubmit) {

        const form = document.createElement("form");
        const titleLabel = document.createElement("label");
        const titleInput = document.createElement("input");
        const bodyLabel = document.createElement("label");
        const bodyInput = document.createElement("input");
        const submitButton = document.createElement("button");
        
        form.method = "post";
        titleLabel.textContent = "Title";
        titleInput.type = "text";
        titleInput.name = "title";
        bodyLabel.textContent = "Body";
        bodyInput.type = "text";
        bodyInput.name = "body";
        submitButton.type = "submit";
        submitButton.textContent = "Submit";

        form.appendChild(titleLabel);
        form.appendChild(titleInput);
        form.appendChild(bodyLabel);
        form.appendChild(bodyInput);
        form.appendChild(submitButton);

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const title = titleInput.value;
            const body = bodyInput.value;
            onSubmit({ title, body });
        });

        container.appendChild(form);
    }

    return { renderPosts, renderPostDetails, createForm };
}

function formController() {
    async function onSubmit(data) {
        try {
            const result = await apiController().createPost(data);
            renderController().renderPostDetails(result);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    }
    return { onSubmit };
}

async function main() {
    const { renderPosts, createForm } = renderController();
    const { getAllPosts } = apiController();
    const { onSubmit } = formController();
    
    createForm(onSubmit);

    const posts = await getAllPosts();
    renderPosts(posts);
}

main();
