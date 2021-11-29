const input = document.querySelector(".ctn input");
const saveBtn = document.querySelector(".ctn .save");
const deleteBtn = document.querySelector(".ctn .delete");
const tabBtn = document.querySelector(".ctn .tab");
const urls = document.querySelector(".ctn .urls");

let urlArr = [];

saveBtn.addEventListener("click", () => {
  const urlName = input.value;
  if (urlName !== "") {
    urlArr.push(urlName);
    addToLocal(urlArr);
    createUrl(urlArr);
  }
  input.value = "";
});

deleteBtn.addEventListener("dblclick", () => {
  urlArr = [];
  urls.innerHTML = "";
  input.value = "";
  localStorage.removeItem("myurls");
});

tabBtn.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    urlArr.push(tabs[0].url);
    addToLocal(urlArr);
    createUrl(urlArr);
  });
});

function createUrl(event) {
  urls.innerHTML = "";
  for (let i = 0; i < event.length; i++) {
    const urlItem = `
    <div id="${i}" class="url-item">
        <span>${i + 1}. <a target="_black" href="${event[i]}">${
      event[i]
    }</a></span>
        
        <img src="./trash.svg" alt="trash icon" />
    </div>
  `;
    urls.innerHTML += urlItem;
    addDelete();
  }
}

function addDelete() {
  const imgs = document.querySelectorAll(".url-item img");
  imgs.forEach((img) => {
    img.addEventListener("click", () => {
      const parentId = img.parentElement.id;
      urlArr.splice(parentId, 1);
      addToLocal(urlArr);
      createUrl(urlArr);
    });
  });
}

function addToLocal(event) {
  let arrjson = JSON.stringify(event);
  localStorage.setItem("myurls", arrjson);
}

function loadFromLocal() {
  let jsonarr = localStorage.getItem("myurls");
  urlArr = JSON.parse(jsonarr);
  createUrl(urlArr);
}

window.addEventListener("load", () => {
  if (localStorage.getItem("myurls") !== null) {
    loadFromLocal();
  }
});
