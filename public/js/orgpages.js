fetch("/organization/getverified/data", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
})
  .then(res => res.json())
  .then(data => {
    console.log(data.data);
    data.data.forEach((org) => {
        console.log(org);
        let orgcard = document.createElement("div");
        let orgName = document.createElement("p");
        let orgAddres = document.createElement("p");
        let moreButton = document.createElement("button");
        orgName.textContent = org.organization_name;
        orgAddres.textContent = org.address;
        moreButton.innerText = "Подробнее";
        moreButton.onclick = () => {
            document.querySelector("#organizations").remove();
            let orgpage = document.createElement("div");
            let contactInfo = document.createElement("div");
            let phone = document.createElement("p");
            let email = document.createElement("p");

            phone.innerText = `Телефон организации: ${org.phone}`;
            email.innerText = `Почта организации: ${org.email}`;
            contactInfo.append(orgAddres, phone, email);
            orgpage.append(orgName, contactInfo);
            document.querySelector(".container").appendChild(orgpage);
        };
        orgcard.append(orgName, orgAddres, moreButton);
        document.querySelector("#organizations").appendChild(orgcard);
    })
  })