const response = await fetch("https://jsonplaceholder.typicode.com/posts");
const data = await response.json();

const container = document.getElementById("container");
const ul = document.createElement("ul");

data.forEach((post) => {
    const title = document.createElement("p");
    const bodyMessage = document.createElement("p");
    console.log(post);
    title.textContent = post.title;
    bodyMessage.textContent = post.body;

    ul.appendChild(title);
    ul.appendChild(bodyMessage);
});

container.appendChild(ul);
