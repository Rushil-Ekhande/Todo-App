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
    if(!response){
        let todos_list = document.querySelector('.todos-list');
        let p = document.createElement('p');
        p.innerText = "No Todos Yet | Created Todos will be shown here";
        p.classList.add('Display-text');
        todos_list.appendChild(p)
    }
    const data = await response.json();
    if(data){
        for(i=0;i<data.user.todos.length;i++){
            createTodoNode(data.user.todos[i]);
        }
    }else{
        alert("No response from create-todo Api")
    }
};

const createTodoNode = (todo) => {    
    const div = document.createElement('div');
    const top_div = document.createElement('div');
    const title = document.createElement('p');
    const desc = document.createElement('p');
    const del_btn = document.createElement('button');
    const del_icon = document.createElement('img');

    title.innerText = `TITLE: ${todo.title}`;
    desc.innerText = `DESCRIPTION: ${todo.content}`;
    del_icon.src = "assets/icons/delete_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.png"

    del_btn.appendChild(del_icon);
    top_div.appendChild(title);
    top_div.appendChild(del_btn);
    
    top_div.classList.add('top-div')
    del_btn.classList.add('del_btn');
    del_icon.classList.add('del_icon');
    div.classList.add('todoNode');
    title.classList.add('todoTitle');
    desc.classList.add('todoDesc');

    del_icon.setAttribute('data-id', todo._id);
    del_icon.addEventListener('click', async (e)=>{
        console.log(e.target);
        
        let todo_id = e.target.getAttribute('data-id');
        console.log(todo_id);
        await deleteTodo(todo_id);
        // e.target.parentElement.remove();
    })

    div.appendChild(top_div);
    div.appendChild(desc);
    parentDiv.appendChild(div);
};

todo_create_btn.addEventListener('click', async (e) => {
    e.preventDefault();
    let todo_title = document.querySelector('.todo-title');
    let todo_content = document.querySelector('.todo-content');
    const dataToBeSend = {
        title: todo_title.value,
        content: todo_content.value,
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
    todo_title.value = "";
    todo_content.value = "";
});

const deleteTodo = async(todo_id) => {
    console.log(todo_id);
    
    const dataToBeSend = {
        token: localStorage.getItem('authToken')
    }
    const response = await fetch(`http://localhost:3300/create-todo/delete/${todo_id}`, {
        method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataToBeSend),
    }); 
    const data = await response.json();
    if(data){
        alert(data.message);
        location.reload();
    }else{
        alert("No response from create-todo Api")
    }
}
