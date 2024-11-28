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
        avatar.id = "avatar";
        avatar.alt = "Аватар пользователя";

        avatar_container.setAttribute("for", "input_avatar");
        avatar_container.appendChild(avatar);
        avatar_container.appendChild(fileInput);

        const profileContainer = document.createElement("div");
        profileContainer.setAttribute('id','prof_container')
        // Аватар и текст приветствия
        profileContainer.appendChild(avatar_container);
        document.querySelector('main').appendChild(profileContainer)

        document.querySelector("main").appendChild(avatar_container);

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
      }
    })
    .catch((error) => {});
});
