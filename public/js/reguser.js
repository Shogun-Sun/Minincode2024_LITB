regForm = {};
document.querySelector("#register").onclick = () => {
  let first_password = document.querySelector("#first_password").value;
  let second_password = document.querySelector("#second_password").value;
  if (first_password !== second_password) {
    alert("Пароли не совпадают");
    document.querySelector("#first_password").classList.add('is-invalid');
    document.querySelector("#second_password").classList.add('is-invalid');
  } else {
    sendData();
  }
};
function sendData() {
  regForm.name = document.querySelector("#name").value;
  regForm.surname = document.querySelector("#surname").value;
  regForm.middle_name = document.querySelector("#middle_name").value;
  regForm.email = document.querySelector("#email").value;
  regForm.password =  document.querySelector("#first_password").value;
  console.log(regForm);
  fetch("/user/reg/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(regForm),
  })
    .then((res) => res.json)
    .then((data) => console.log(data));
}
