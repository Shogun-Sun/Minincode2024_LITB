fetch("/organization/getverified/data", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
})
  .then(res => res.json())
  .then(data => {
    console.log(data)
  })