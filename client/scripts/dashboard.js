console.log("dashboard");

let todo_create_btn = document.querySelector('.btn');
let parentDiv = document.querySelector('.todos-list')

window.onload = () => {
    getTodos();
}

const getTodos = async () => {
    const dataToBeSend = {
        token: localStorage.getItem('authToken')
    }
    const response = await fetch('http://localhost:3300/create-todo/get-todo',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToBeSend),
    });
    const data = await response.json();
    if(data){
        console.log();
        for(i=0;i<data.user.todos.length;i++){
            createTodoNode(data.user.todos[i]);
        }
    }else{
        alert("No response from create-todo Api")
    }
};

const createTodoNode = (todo) => {
    const div = document.createElement('div');
    const title = document.createElement('p');
    const desc = document.createElement('p');
    title.innerText = `Title: ${todo.title}`;
    desc.innerText = `Description: ${todo.content}`;
    div.classList.add('todoNode');
    title.classList.add('todoTitle');
    desc.classList.add('todoDesc');
    div.appendChild(title);
    div.appendChild(desc);
    parentDiv.appendChild(div);
};

todo_create_btn.addEventListener('click', async (e) => {
    e.preventDefault();
    let todo_title = document.querySelector('.todo-title').value;
    let todo_content = document.querySelector('.todo-content').value;
    const dataToBeSend = {
        title: todo_title,
        content: todo_content,
        token: localStorage.getItem('authToken')
    }
    const response = await fetch('http://localhost:3300/create-todo', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToBeSend),
    })
    const data = await response.json();
    if(data){
        alert(data.message);
    }else{
        alert("No response from create-todo Api")
    }
    getTodos();
});


