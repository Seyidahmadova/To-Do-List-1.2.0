const container = document.querySelector(".container");
const container2 = document.querySelector(".container2");
const addbtn = document.querySelector(".addbtn");
const listItems = document.querySelector(".list-items");
const input2 = document.querySelector(".input2");
const input = document.querySelector(".input");
const sorting = document.querySelector(".sorting");
const item = document.querySelector(".item");

const warn = document.querySelector(".warn");

addbtn.addEventListener("click", function (event) {
  event.preventDefault();

  if (input2.value == "") {
    warn.style.visibility = "visible";
  } else {
    warn.style.visibility = "hidden";
    displayList(input);
  }
});

input.addEventListener("keyup", function (event) {
  if (event.target.value.trim() == "" && event.key.toLowerCase() != "enter") {
    warn.style.visibility = "visible";
  } else {
    warn.style.visibility = "hidden";
  }
});

input.addEventListener("submit", function (event) {
  event.preventDefault();
  if (input2.value.trim() !== "") {
    displayList(event.target);
  }
  input2.value = "";
});

listItems.addEventListener("click", function (event) {
  delinput = event.target.id == "delInputBtn";
  if (delinput) {
    event.target.parentElement.parentElement.remove();
  }
});
let count = true;
sorting.addEventListener("click", function (event) {
  if (event.target.id == "svg") {
    sortTable(listItems, count);
    count = !count;
    console.log("count", count);
  }
});

function sortTable(lists, reversed) {
  switching = true;
  while (switching) {
    for (let i = 0; i < lists.children.length - 1; i++) {
      switching = false;
      a = lists.children[i];
      b = lists.children[i + 1];
      if (reversed) {
        if (
          a.firstElementChild.textContent.trim().toLowerCase() >
          b.firstElementChild.textContent.trim().toLowerCase()
        ) {
          temp = lists.children[i].firstElementChild.textContent;
          lists.children[i].firstElementChild.textContent =
            lists.children[i + 1].firstElementChild.textContent;
          lists.children[i + 1].firstElementChild.textContent = temp;
          switching = true;
          break;
        }
      }
      if (reversed === false) {
        if (
          a.firstElementChild.textContent.trim().toLowerCase() <
          b.firstElementChild.textContent.trim().toLowerCase()
        ) {
          temp1 = lists.children[i].firstElementChild.textContent;
          lists.children[i].firstElementChild.textContent =
            lists.children[i + 1].firstElementChild.textContent;
          lists.children[i + 1].firstElementChild.textContent = temp1;
          switching = true;
          break;
        }
      }
    }
  }
}

function displayList(list) {
  let inputsHTML = "";
  inputsHTML += `
      <div class="item">
       <div class="text">${list.firstElementChild.value}</div>
       <div class="del">
        <svg id="delInputBtn"width="101%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" y="0.5" width="19" height="19" rx="9.5" stroke="#C4C4C4"/>
          <path d="M6 6L14 14" stroke="#C4C4C4"/>
          <path d="M6 14L14 6" stroke="#C4C4C4"/>
          </svg>
      </div>
    </div>
      `;
  listItems.innerHTML += inputsHTML;
  list.firstElementChild.value = "";
}
