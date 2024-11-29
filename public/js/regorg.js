regForm = {};
document.querySelector("#main").onclick = () => {
    window.location.href = "/";
  };
document.querySelector("#send").onclick = () => {
    let first_password = document.querySelector("#first_password").value
    let second_password = document.querySelector("#second_password").value
    if (first_password !== second_password) {
        alert("Пароли не совпадают");
        document.querySelector("#first_password").classList.add('is-invalid');
        document.querySelector("#second_password").classList.add('is-invalid');
    } else {
        sendOrgData();
        window.location.href = "/"
    }
};
function sendOrgData() {
    regForm.name = document.querySelector("#regname").value;
    regForm.email = document.querySelector("#mail").value;
    regForm.phone = document.querySelector("#phone").value;
    regForm.address = document.querySelector("#address").value;
    regForm.ogrn = document.querySelector("#OGRN").value;
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