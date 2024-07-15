console.log("Sign-In");

const loginBtn = document.querySelector('.loginBtn');

loginBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = document.querySelector('.email').value;
    const password = document.querySelector('.password').value;
    const userLoginData = {
        email: email,
        password: password
    }
    const response = await fetch('http://localhost:3300/user/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userLoginData),
    });
    const data = await response.json();
    if(data){
        alert(data.message);
     }else{
        alert("No response from User Login Api");
     }
});