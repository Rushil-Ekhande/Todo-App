console.log("dashboard");

let todo_create_btn = document.querySelector('.btn');

todo_create_btn.addEventListener('click', async (e) => {
    e.preventDefault();
    let todo_title = document.querySelector('.todo-title').value;
    let todo_content = document.querySelector('.todo-content').value;
    const dataToBeSend = {
        title: todo_title,
        content: todo_content
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
    location.reload();
});
