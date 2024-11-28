regForm = {};
document.querySelector("#send").onclick = () => {
    let first_password = document.querySelector("#first_password").value
    let second_password = document.querySelector("#second_password").value
    if (first_password !== second_password) {
        alert("Пароли не совпадают");
    } else {
        sendOrgData();
    }
};
function sendOrgData() {
    regForm.name = document.querySelector("#regname").value;
    regForm.email = document.querySelector("#mail").value;
    regForm.phone = document.querySelector("#phone").value;
    regForm.address = document.querySelector("#address").value;
    regForm.orgn = document.querySelector("#OGRN").value;
    regForm.password = document.querySelector("#first_password").value
    console.log(regForm);
    fetch("/organization/reg/data", {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(regForm)
    })
      .then(res => res.json)
      .then(data => console.log(data))
}