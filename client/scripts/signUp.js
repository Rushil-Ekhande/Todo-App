console.log("Sign-Up");

const registerBtn = document.getElementsByClassName('registerBtn')[0]; 

registerBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const username = document.getElementsByClassName('username')[0].value;
    const email = document.getElementsByClassName('email')[0].value;
    const password = document.getElementsByClassName('password')[0].value;
    const userData = {
        username: username,
        email: email,
        password: password
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
});