userData = {};
document.querySelector("#login").onclick = () => {
    userData.email = document.querySelector("#email").value;
    userData.password = document.querySelector("#password").value;
    fetch("/user/log/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((res) => res.json())
        .then((data) => {
          if(data.status === "error"){
            alert(data.message);
          } else{
            alert(data.message);
          }
        })
        
}