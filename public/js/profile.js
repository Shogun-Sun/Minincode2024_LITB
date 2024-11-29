document.addEventListener("DOMContentLoaded", () => {
  fetch("/user/get/data", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
      if (data.status === "error") {
        fetch("/organization/get/data", {
            method:"GET",
            headers:{
                "Content-Type": "application/json",
            },
        })
          .then(res => res.json())
          .then(data => {
            if (data.message == 'Вы не авторизовались') {
                window.location.href = '/user/log/page';
            } else {
                console.log(data)
                document.querySelector("#name").textContent = data.data.organization_name;
                let email = document.createElement("p");
                let sections = document.createElement("div");
                let events = document.createElement("div");
                let address = document.createElement("p");
                let ogrn = document.createElement("p");
                let phone = document.createElement("p");
                let status = document.createElement("p")

                email.textContent = `Электронная почта: ${data.data.email}`;
                address.textContent = `Адрес: ${data.data.address}`;
                ogrn.textContent = `Номер ОГРН: ${data.data.ogrn}`;
                phone.textContent = `Телефон: ${data.data.phone}`;
                status.textContent = `Статус: ${data.data.role}`;

                document.querySelector("#contactInfo").append(email, phone, address, ogrn, status, sections, events);

            }
          })
      } else {
        const avatar = document.createElement("img");
        const fileInput = document.createElement("input");
        const avatar_container = document.createElement("label");
        fileInput.type = "file";
        fileInput.name = "avatar";
        fileInput.id = "input_avatar";

        avatar.src = data.data.avatar;
        avatar.id = "avatar_pict";
        avatar.alt = "Аватар пользователя";

        avatar_container.setAttribute("for", "input_avatar");
        avatar_container.appendChild(avatar);
        avatar_container.appendChild(fileInput);

        document.querySelector("#avatar").appendChild(avatar_container);

        fileInput.addEventListener("change", (e) => {
            const formData = new FormData();
            const file = e.target.files[0];
            if (file) {
              formData.append("avatar", file);
  
              // Отправка файла на сервер через fetch
              fetch("/profile/upload/avatar", {
                method: "POST",
                body: formData,
              })
              .then((response) => response.json())
              .then((data) => {
                if (data.status === "ok") {
                  alert(data.message); 
                  avatar.src = data.avatar;
                  window.location.reload();
                } else {
                  alert(data.message); 
                }
              })
              .catch((error) => {
                console.error("Ошибка:", error);
                alert("Что-то пошло не так.");
              });
            }
          });
        console.log(data.data.role)
        if (data.data.role === "user") {
            let nameLable = document.createElement("lable")
            let name = document.createElement("input");
            let surnameLable = document.createElement("lable");
            let surname = document.createElement("input");
            let middle_nameLable = document.createElement("lable");
            let middle_name = document.createElement("input");
            let email = document.createElement("p");
            let sections = document.createElement("div");
            let events = document.createElement("div");
            let change = document.createElement("button");
                change.classList.add('button');
            change.innerText = "Сохранить изменения"
            change.onclick = () => {
                let changeData = {};
                changeData.name = name.value;
                changeData.surname = surname.value;
                changeData.middle_name = middle_name.value;
                console.log(changeData)

                // fetch("/user/get/data", {
                //     method: "POST",
                //     headers: {
                //       "Content-Type": "application/json",
                //     },
                //     body:JSON.stringify(changeData)
                //   })
                //     .then((res) => res.json())
                //     .then((data) => {console.log(data)});
            }
            document.querySelector("#name").textContent = `${data.data.name}`;
            nameLable.textContent = "Имя: "
            name.value = data.data.name;
            surnameLable.innerText = "Фамилия: "
            surname.value = data.data.surname;
            middle_nameLable.innerText = "Отчество: "
            middle_name.value = data.data.middle_name;
            email.textContent = `Электронная почта: ${data.data.email}`;

            document.querySelector("#contactInfo").append(nameLable, name, surnameLable, surname, middle_nameLable, middle_name, change, email, sections, events);
            
        } else {
	    let ogrn = document.createElement("p");
	    let address = document.createElement("p");
	    let work_time = document.createElement("p");
	    let email = document.createElement("p");
	    let phone = document.createElement("p");
	    let status = document.createElement("p");

	    document.querySelector("#name").textContent = data.data.organization_name;

	    document.querySelector("#contactInfo").append(ogrn, address, work_time, email, phone, status);
        }
      }
    })
    .catch((error) => {});
});
