import "./Scss/main.scss";
import {
  textareaSelector,
  imageSelector,
  imagePreviewContainer,
  formSelector,
} from "./uiElements";
import moment from "moment";

// ----------------STATE INITIAL VALUES--------------

let state = {
  currentPost: {
    text: "",
    uploadedImageSrc: "",
  },
};

// -----------------FUNCTIONS---------------

function addPostToUI() {
  if (state.currentPost.text || state.currentPost.uploadedImageSrc) {
    let newPost = `<div class="post_container">
    <div class="post_image"><img src="${
      state.currentPost.uploadedImageSrc
    }" id="image"></div>
    <div id="post_text_container">
      <div class="post_text">${state.currentPost.text}</div>
      <div class="post_date">${generateCurrentDate()}</div>
    </div>
    </div>
  `;
    document
      .querySelector(".posts_container")
      .insertAdjacentHTML("afterbegin", newPost);
  }
}

function generateCurrentDate() {
  const now = new Date();
  const currentDate = moment(now).format("MMMM d, YYYY");
  return currentDate;
}

function previewImageHandler() {
  let loaded_image = "";
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    loaded_image = reader.result;
    document.querySelector(
      "#preview_image"
    ).style.backgroundImage = `url(${loaded_image})`;
  });
  reader.readAsDataURL(this.files[0]);
  state.currentPost.uploadedImageSrc = URL.createObjectURL(this.files[0]);
}

function submitPost(e) {
  e.preventDefault();

  if (state.currentPost.text || state.currentPost.uploadedImageSrc) {
    addPostToUI();
    removeErrorMessage();
    clearForm();
    clearCurrentStateValues();
  } else {
    displayError();
  }
}

function clearForm() {
  textareaSelector.value = "";
  imageSelector.value = "";
  imagePreviewContainer.style.backgroundImage = "";
}

function clearCurrentStateValues() {
  state.currentPost.text = "";
  state.currentPost.uploadedImageSrc = "";
}

function displayError() {
  const errorDiv = document.querySelector("#error");
  if (!errorDiv) {
    document
      .querySelector("#error_container")
      .insertAdjacentHTML(
        "afterbegin",
        `<p id="error">Please add text or image...</p> `
      );
  }
}

function removeErrorMessage() {
  document.querySelector("#error_container").innerHTML = "";
}

// --------------EVENT LISTENERS-----------------
function loadEventListeners() {
  document.addEventListener("DOMContentLoaded", addPostToUI);
  formSelector.addEventListener("submit", submitPost);
  imageSelector.addEventListener("change", previewImageHandler);
  textareaSelector.addEventListener("input", (e) => {
    state.currentPost.text = e.target.value;
  });
}

// run the app
loadEventListeners();
