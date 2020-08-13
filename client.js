console.log("Client-Init");

const userDiv = document.querySelector(".userList");
const commetingForm = document.querySelector(".commetingForm");

const BackendUrl = "http://localhost:5000/tweet/";

commetingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(commetingForm);
  const firstname = formData.get("firstName");
  const lastname = formData.get("lastName");
  const comment = formData.get("comment");

  const data = {
    firstname: firstname,
    lastname: lastname,
    comment: comment,
  };

  try {
    fetch(BackendUrl, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((_data) => {
        console.log(_data);
      });
    commetingForm.reset();
  } catch (e) {
    console.log("There Was An Error Contacting The Server!");
  }
  document.location.reload();
});

try {
  fetch(BackendUrl)
    .then((response) => response.json())
    .then((user) => {
      console.log(user);

      user.forEach((user) => {
        const container = document.createElement("div");
        container.style.marginBottom = "4px";
        container.style.border = "solid";
        container.style.borderRadius = "5px";

        const NameHeader = document.createElement("h4");
        NameHeader.textContent = `Name: ${user.name}`;

        container.appendChild(NameHeader);

        //const container = document.createElement("div");
        user.comments.forEach((_comment) => {
          const Message = document.createElement("p");
          Message.textContent = _comment;
          container.appendChild(Message);
        });

        userDiv.appendChild(container);
      });
    });
} catch (e) {
  console.log(e);
}
