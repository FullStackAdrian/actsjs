// estructura json
//   [{
//     userId: 10,
//     id: 99,
//     title: 'temporibus sit alias delectus eligendi possimus magni',
//     body: 'quo deleniti praesentium dicta non quod\n' +
//       'aut est molestias\n' +
//       'molestias et officia quis nihil\n' +
//       'itaque dolorem quia'
//   },
//   {
//     userId: 10,
//     id: 100,
//     title: 'at nam consequatur ea labore ea harum',
//     body: 'cupiditate quo est a modi nesciunt soluta\n' +
//       'ipsa voluptas error itaque dicta in\n' +
//       'autem qui minus magnam et distinctio eum\n' +
//       'accusamus ratione error aut'
//   }
// ]

const response = await fetch("https://jsonplaceholder.typicode.com/posts");
const data = response.json();

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
