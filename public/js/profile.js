document.addEventListener("DOMContentLoaded", () => {
    fetch("/user/get/data", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((data) => {
        if(data.status === "error"){
            alert(data.message); 
        } else {
            console.log(data);
        }
    })
    .catch((error) => {
        
    });
});
