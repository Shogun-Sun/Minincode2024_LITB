fetch("/organization/get/data", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
})
  .then(res => res.json())
  .then(sesionData => {
    console.log(sesionData)
    document.querySelector("#save").onclick = () => {
        let data = {};
        data.name = document.querySelector("#name").value;
        data.description = document.querySelector("#description").value;
        data.days = document.querySelector("#days").value;
        data.times = document.querySelector("#times").value;
        data.organization_id = sesionData.data.ogrn;
        console.log(data);
        fetch("/sections/create", {
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
          .then(res => res.json())
          .then(data => console.log(data))
    }
  })