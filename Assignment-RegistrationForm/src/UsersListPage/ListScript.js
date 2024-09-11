document.addEventListener("DOMContentLoaded", () => {
  fetch(`https://crudcrud.com/api/a1c7e2f11f4645db8eae360435521eb5/users`)
    .then((response) => response.json())
    .then((data) => createCards(data))
    .catch((error) => console.log("error", error));
});

function createCards(data) {
  const container = document.getElementById("card-container");
  data.forEach((item) => {
    const name = item.name;
    const profession = item.profession;
    const bio = item.bio;
    const email = item.email;
    const _id = item._id;

    const card = document.createElement("div");
    card.className = "card";

    const cardHeader = document.createElement("div");
    cardHeader.className = "card-header";
    const profilePicture = document.createElement("img");
    profilePicture.className = "profile-picture";
    profilePicture.src = "../../assets/Images/profile-image-circle.png";
    profilePicture.alt = "profile picture";
    cardHeader.appendChild(profilePicture);

    const cardContent = document.createElement("div");
    cardContent.className = "card-content";
    const profileName = document.createElement("h1");
    profileName.className = "profile-name";
    profileName.textContent = name;
    cardContent.appendChild(profileName);

    const professionElement = document.createElement("h2");
    professionElement.className = "profession";
    professionElement.textContent = profession;
    cardContent.appendChild(professionElement);

    const bioElement = document.createElement("p");
    bioElement.className = "bio";
    bioElement.textContent = bio;
    cardContent.appendChild(bioElement);

    const emailElement = document.createElement("a");
    emailElement.className = "email";
    emailElement.textContent = email;
    cardContent.appendChild(emailElement);

    const socialmedia = document.createElement("div");
    socialmedia.className = "socialmedia-panel";
    const icons = document.createElement("img");
    icons.className = "socialmedia-icons";
    icons.src = "../../assets/Images/socialmedia.jpg";
    icons.alt = "social media icons";
    socialmedia.appendChild(icons);
    cardContent.appendChild(socialmedia);

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";
    const subscribe = document.createElement("button");
    subscribe.className = "subscribe-button";
    subscribe.textContent = "Subscribe";
    buttonContainer.appendChild(subscribe);
    const message = document.createElement("button");
    message.className = "message-button";
    message.textContent = "Message";
    buttonContainer.appendChild(message);
    cardContent.appendChild(buttonContainer);

    const buttons = document.createElement("div");
    buttons.className = "container-edit-delete";
    const editButton = document.createElement("button");
    editButton.className = "edit-btn";
    editButton.textContent = "Edit profile";
    editButton.addEventListener("click", () => {
      window.location.href = `../../src/UpdationPage/editForm.html?_id=${_id}`;
    });

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Delete profile";
    deleteButton.addEventListener("click", () => {
      fetch(
        `https://crudcrud.com/api/a1c7e2f11f4645db8eae360435521eb5/users/${_id}`,
        {
          method: "DELETE",
        }
      )
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    });
    buttons.appendChild(editButton);
    buttons.appendChild(deleteButton);
    cardContent.appendChild(buttons);

    const iconContainer = document.createElement("div");
    iconContainer.className = "icon-container";
    const likeIcon = document.createElement("img");
    likeIcon.className = "icons";
    likeIcon.src = "../../assets/Images/like.jpg";
    likeIcon.alt = "like icon";
    iconContainer.appendChild(likeIcon);
    const commentIcon = document.createElement("img");
    commentIcon.className = "icons";
    commentIcon.src = "../../assets/Images/comment.jpg";
    commentIcon.alt = "comment icon";
    iconContainer.appendChild(commentIcon);
    const shareIcon = document.createElement("img");
    shareIcon.className = "icons";
    shareIcon.src = "../../assets/Images/share.jpg";
    shareIcon.alt = "comment icon";
    iconContainer.appendChild(shareIcon);
    cardContent.appendChild(iconContainer);

    card.appendChild(cardHeader);
    card.appendChild(cardContent);
    container.appendChild(card);
  });
}
