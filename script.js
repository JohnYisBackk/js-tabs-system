"use strict";

// ======================================================
// SELECT ELEMENTS
// ======================================================

const dropdown = document.getElementById("dropdown");
const dropdownTrigger = document.getElementById("dropdownTrigger");

const toast = document.getElementById("toast");
const toastMessage = document.querySelector(".toast-message");
const toastProgress = document.querySelector(".toast-progress");

const menuItems = document.querySelectorAll(".menu-item");

let toastTimeout;

// ======================================================
// OPEN DROPDOWN FUNCTION
// ======================================================

function openDropdown() {
  dropdown.classList.add("active");
}

// ======================================================
// CLOSE DROPDOWN FUNCTION
// ======================================================

function closeDropdown() {
  dropdown.classList.remove("active");
}

// ======================================================
// TOGGLE DROPDOWN FUNCTION
// ======================================================

function toggleDropdown() {
  if (dropdown.classList.contains("active")) {
    closeDropdown();
  } else {
    openDropdown();
  }
}

// ======================================================
// SHOWTOAST FUNCTION
// ======================================================

function showToast(message) {
  clearTimeout(toastTimeout);

  toastMessage.textContent = message;
  toast.classList.add("show");

  toastProgress.style.animation = "none";
  toastProgress.offsetHeight;
  toastProgress.style.animation = "toastProgress 2s linear forwards";

  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
    toastMessage.textContent = "";
  }, 2000);
}

// ======================================================
// TRIGGER CLICK EVENT
// ======================================================

dropdownTrigger.addEventListener("click", (e) => {
  e.stopPropagation();

  toggleDropdown();
});

// ======================================================
// CLICK OUTSIDE DETECTION
// ======================================================

document.addEventListener("click", (e) => {
  if (!dropdown.contains(e.target)) {
    closeDropdown();
  }
});

// ======================================================
// ESCAPE KEY SUPPORT
// ======================================================

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeDropdown();
  }
});

// ======================================================
// MENU ITEM CLICK
// ======================================================

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    menuItems.forEach((el) => {
      el.classList.remove("active");
    });

    item.classList.add("active");

    const text = item.querySelector("strong").textContent;
    const triggerText = dropdownTrigger.querySelector(".trigger-text");
    triggerText.textContent = text;

    showToast(`${text} selected`);

    closeDropdown();
  });
});
