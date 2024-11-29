userData = {};
organData = {};
document.querySelector("#main").onclick = () => {
  window.location.href = "/";
};
document.querySelector("#login").onclick = () => {
  userData.email = document.querySelector("#email").value;
  userData.password = document.querySelector("#password").value;
  const check_org = document.getElementById("check_org");
  if (!check_org.checked) {
    fetch("/user/log/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "error") {
          alert(data.message);
        } else {
          alert(data.message);
        }
      });
  } else {
    organData.email = document.querySelector("#email").value;
    organData.password = document.querySelector("#password").value;
    fetch("/organization/log/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(organData),
    })
    .then((res) => res.json())
    .then((data) => {console.log(data)})
    
  }
};