console.log("dashboard");


let todo_create_btn = document.querySelector('.btn');

todo_create_btn.addEventListener('click', (e) => {
    e.preventDefault();
    let todo_title = document.querySelector('.todo-title').value;
    let todo_content = document.querySelector('.todo-content').value;
    console.log(todo_title);
    console.log(todo_content);
})

