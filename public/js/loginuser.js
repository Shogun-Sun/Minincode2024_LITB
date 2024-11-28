userData = {};
document.querySelector("#login").onclick = () => {
    userData.email = document.querySelector("#email").value;
    userData.password = document.querySelector("#password").value;
    const check_org = document.getElementById('check_org');
    if(check_org.value == false){
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
    } else {
      // fetch
    }

        
}