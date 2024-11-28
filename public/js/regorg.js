regForm = {};
document.querySelector("#send").onclick = () => {
    regForm.regname = document.querySelector("#regname").value;
    regForm.mail = document.querySelector("#mail").value;
    regForm.phone = document.querySelector("#phone").value;
    regForm.address = document.querySelector("#address").value;
    regForm.OGRN = document.querySelector("#OGRN").value;
    console.log(regForm);
    fetch("/regorg", {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(regForm)
    })
      .then(res => res.json)
      .then(data => console.log(data))
};