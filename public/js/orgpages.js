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
        // console.log(org);
        let orgcard = document.createElement("div");
        orgcard.classList.add('card');
        let orgName = document.createElement("p");
        orgName.classList.add('Name')
        let orgAddres = document.createElement("p");
        orgAddres.classList.add('adres');
        let moreButton = document.createElement("button");
        moreButton.classList.add('button');
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
            let sectionsBlock = document.createElement("div")
            console.log(org.ogrn);
            fetch("/organization/get/sections", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ogrn: org.ogrn}),
              })
                .then((res) => res.json())
                .then((dat) => {
                    console.log(dat)
                    dat.data.forEach((section) => {
                        let sectionCard = document.createElement("div");
                        let sectionName = document.createElement("p");
                        let description = document.createElement("p");
                        let days = document.createElement("p");
                        let times = document.createElement("p");

                        sectionName.innerText = section.section_name;
                        description.innerText = section.description;
                        days.innerText = section.days;
                        times.innerText = section.time;

                        sectionCard.append(sectionName, description, days, times)
                        sectionCard.classList.add("sectionCard")
                        sectionsBlock.append(sectionCard)
                    })
                })
                let sectionhead = document.createElement("p");
                sectionhead.classList.add("sectionhead");
                sectionhead.innerText = "Запись на секции"
                document.querySelector(".block").append(orgpage, sectionhead, sectionsBlock);
        };
        orgcard.append(orgName, orgAddres, moreButton);
        document.querySelector("#organizations").appendChild(orgcard);
    })
  })