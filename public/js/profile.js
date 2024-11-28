document.addEventListener("DOMContentLoaded", () => {
  fetch("/user/get/data", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
        console.log(data.avatar);
      if (data.status === "error") {
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
            let name = document.createElement("p");
            let surname = document.createElement("p");
            let middle_name = document.createElement("p");
            let email = document.createElement("p");
            let sections = document.createElement("div");
            let events = document.createElement("div")

            document.querySelector("#name").textContent = `${data.data.name}`;
            name.textContent = `Имя: ${data.data.name}`;
            surname.textContent = `Фамилия: ${data.data.surname}`;
            middle_name.textContent = `Отчество: ${data.data.middle_name}`;
            email.textContent = `Электронная почта: ${data.data.email}`;

            document.querySelector("#contactInfo").append(name, surname, middle_name, email, sections, events);
            
        } else if (data.data.role === "organisation") {
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
