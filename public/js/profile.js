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
      }
    })
    .catch((error) => {});
});
