fetch("", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
})
  .then(res => res.json())
  .thent(data => {
    console.log(data)
    let orgName = document.createElement("span")
    let buttons = document.createElement("span")
    
  })