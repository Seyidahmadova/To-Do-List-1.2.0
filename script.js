const container = document.querySelector(".container");
const container2 = document.querySelector(".container2");
const addbtn = document.querySelector(".addbtn");
const listItems = document.querySelector(".list-items");
const input2 = document.querySelector(".input2");
const input = document.querySelector(".input");
const sorting = document.querySelector(".sorting");
const items = document.querySelectorAll(".list-items .item");
const svg1 = document.querySelector('.svg1')
const svg2 = document.querySelector('.svg2')

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
          svg1.style.display = 'block'
          svg2.style.display = 'none'

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
          svg1.style.display = 'none'
          svg2.style.display = 'block'
          switching = true;
          break;
        }
      }
    }
  }
}

function handleDragStart(e) {
  this.style.opacity = "0.4";

  dragSrcEl = this;

  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", this.innerHTML);
}

function handleDragEnd(e) {
  this.style.opacity = "1";

  items.forEach(function (item) {
    item.classList.remove("over");
  });
}

function handleDragOver(e) {
  e.preventDefault();
  return false;
}

function handleDragEnter(e) {
  this.classList.add("over");
}

function handleDragLeave(e) {
  this.classList.remove("over");
}

function handleDrop(e) {
  e.stopPropagation();

  if (dragSrcEl !== this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData("text/html");
  }

  return false;
}

var i = 1;
function displayList(list) {
  let item = document.createElement("div");
  item.classList.add("item");
  item.classList.add("draggable");
  item.setAttribute("draggable", "true");
  item.setAttribute("id", `div${i}`);
  i = i + 1;

  let textDiv = document.createElement("div");
  textDiv.classList.add("text");
  textDiv.textContent = list.firstElementChild.value;

  let del = document.createElement("div");
  del.classList.add("del");
  del.innerHTML = `<svg id="delInputBtn"width="101%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" y="0.5" width="19" height="19" rx="9.5" stroke="#C4C4C4"/>
          <path d="M6 6L14 14" stroke="#C4C4C4"/>
          <path d="M6 14L14 6" stroke="#C4C4C4"/>
          </svg>`;

  listItems.append(item);
  item.append(textDiv);
  item.append(del);

  list.firstElementChild.value = "";
  item.addEventListener("dragstart", handleDragStart);
  item.addEventListener("dragover", handleDragOver);
  item.addEventListener("dragenter", handleDragEnter);
  item.addEventListener("dragleave", handleDragLeave);
  item.addEventListener("dragend", handleDragEnd);
  item.addEventListener("drop", handleDrop);
}
