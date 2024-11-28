userData = {};
document.querySelector("#login").onclick = () => {
    userData.email = document.querySelector("#email").value;
    userData.password = document.querySelector("#password").value;
    console.log(userData)
    fetch("/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((res) => res.json)
        .then((data) => console.log(data));
}