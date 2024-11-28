fetch("/organization/get/data", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
})
  .then(res => res.json())
  .thent(data => {
    console.log(data);
    let tr = document.createElement("tr");
    let orgName = document.createElement("td");
    let agree = document.createElement("td");
    let accept = document.createElement("button");
    let reject = document.createElement("button");
    //orgName.innerText = data.name;
  })