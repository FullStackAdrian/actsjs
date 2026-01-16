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

    return { getAllPosts, getPostById };
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

    return { renderPosts, renderPostDetails };
}

async function main() {
    const { renderPosts, renderPostDetails } = renderController();
    const { getAllPosts, getPostById } = apiController();

    const posts = await getAllPosts();
    await renderPosts(posts);
}

main();
