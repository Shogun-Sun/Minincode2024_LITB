fetch("/organization/getunverified/data", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
})
  .then(res => res.json())
  .then(data => {
    console.log(data);
    data.data.forEach((org) => {
      /* объявление переменных */
      let tr = document.createElement("tr");
      let OGRN = document.createElement("td");
      let orgName = document.createElement("td");
      let agree = document.createElement("td");
      agree.classList.add('confirm')
      let accept = document.createElement("button");
      let reject = document.createElement("button");
      /* /объявление переменных */
      /* заполнение атрибутов */
      OGRN.innerText = org.ogrn;
      orgName.innerText = org.organization_name;
      accept.innerText = "Одобрить";
      reject.innerText = "Отклонить";
      OGRN.setAttribute("data-bs-toggle", "modal")
      OGRN.setAttribute("data-bs-target", "#exampleModal")
      orgName.setAttribute("data-bs-toggle", "modal")
      orgName.setAttribute("data-bs-target", "#exampleModal")
      accept.classList.add("accept")
      accept.classList.add("button")
      reject.classList.add("reject")
      reject.classList.add("button")

      /* /заполнение атрибутов */
      tr.onclick = () => {
        document.querySelector(".modal-body").innerText = 
        `ОГРН: ${org.ogrn}
        Назавание организации: ${org.organization_name}
        Электронная почта: ${org.email}
        Телефон: ${org.phone}
        Адрес: ${org.address}
        `;
        document.querySelector("#accept").onclick = () => {
          accept.click();
        }
      }
      agree.append(accept, reject);
      agree.onclick = (elem) => {
        if (elem.target.classList.contains("accept")) {
          console.log({id: org.id, status: 'save', organization: org})
        fetch("/organization/getunverified/update", {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({status: "save", ogrn: org.ogrn})
        })
        } else if (elem.target.classList.contains("reject")) {
          console.log({id:org.id, status: 'delete'})
          // fetch("", {
          //   method: "POST",
          //   headers: {
          //       "Content-Type": "application/json",
          //   },
          //   body: JSON.stringify({status: 'delete'})
          // })
        }
        tr.remove();
      }
      tr.append(OGRN, orgName, agree);
      document.querySelector("tbody").appendChild(tr);
    })
  })