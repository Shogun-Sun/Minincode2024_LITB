document.querySelector("#save").onclick = () => {
    let data = {};
    data.name = document.querySelector("#name").value;
    data.description = document.querySelector("#description").value;
    data.days = document.querySelector("#days").value;
    data.times = document.querySelector("#times").value;
    console.log(data);
    fetch("", {
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(data => console.log(data))
}