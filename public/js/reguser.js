regForm = {};
document.querySelector("#register").onclick = () => {
    let first_password = document.querySelector("#first_password").value
    let second_password = document.querySelector("#second_password").value
    if (first_password !== second_password) {
        alert("Пароли не совпадают");
    } else {
        sendData();
    }
};
function sendData() {
    regForm.name = document.querySelector("#name").value;
        regForm.surname = document.querySelector("#surname").value;
        regForm.middle_name = document.querySelector("#middle_name").value;
        regForm.email = document.querySelector("#email").value;
        regForm.password = first_password;
        console.log(regForm)
        fetch("/reguser", {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(regForm)
        })
        .then(res => res.json)
        .then(data => console.log(data))
}