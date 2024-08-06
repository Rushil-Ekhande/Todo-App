console.log("Sign-Up");

const registerBtn = document.getElementsByClassName('registerBtn')[0]; 

registerBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const username = document.getElementsByClassName('username')[0];
    const email = document.getElementsByClassName('email')[0];
    const password = document.getElementsByClassName('password')[0];
    const userData = {
        username: username.value,
        email: email.value,
        password: password.value
    }
    console.log(userData);
     const response = await fetch('http://localhost:3300/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
     });
     const data = await response.json();
     if(data){
        alert(data.message);
     }else{
        alert("No response from User Register Api");
     }
     username.value = "";
     email.value = "";
     password.value = "";
});