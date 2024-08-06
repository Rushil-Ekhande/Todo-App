console.log("Sign-In");

const loginBtn = document.querySelector('.loginBtn');

loginBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    let email = document.querySelector('.email');
    let password = document.querySelector('.password');
    const userLoginData = {
        email: email.value,
        password: password.value
    }
    const response = await fetch('http://localhost:3300/user/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userLoginData),
    });
    console.log(response);
    const data = await response.json();
    if(data){
        alert(data.message);
        if(localStorage.getItem('authToken') != null){
            localStorage.removeItem('authToken');
        }
        localStorage.setItem('authToken',data.token);
     }else{
        alert("No response from User Login Api");
     }
     email.value = "";
     password.value = "";
});