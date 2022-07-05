// let mouseOffset = { x: 0, y: 0 };
let translate = { x: 0, y: 0 };
let client = { x: 0, y: 0 };
let isMouseDown = false;
let isMouseMove = false;
const elements = [
  { id: 1, title: "Practice JS", type: "list" },
  { id: 2, title: "JavaScript", type: "group" },
  { id: 3, title: "Learn JS", type: "list" },
  { id: 4, title: "React", type: "group" },
  { id: 5, title: "Learn React", type: "list" },
];

const RenderList = function () {
  let html = "";

  const lists = elements.map((data, index) => {
    if (data.type === "group")
      return createGroup({ id: data.id, title: data.title });
    else {
      return createList({ id: data.id, title: data.title });
    }
  });
  if (lists.length > 0) {
    let joined = lists.join("").replaceAll(",", "");
    html += `<ul class="lists"> ${joined} </ul>`;
  }

  const listPlaceHolder = document.querySelector("#list-placeholder");
  listPlaceHolder.innerHTML = html;
};

const createGroup = function (data) {
  const groupElement = `<li class="group"  data-id=${data.id}>
  <div class="group-container">
    <div>
      <i class="ph-folder-dotted-light ph-1x"></i>
      <span>${data.title}</span>
    </div>
    <i class="ph-caret-down"></i>
  </div>
  <ul class="lists-dropped">
    <li class="group-body">Drag here to add lists</li>
  </ul>
</li>`;

  return groupElement;
};

const createList = function (data) {
  const listElement = `<li class="list hide-before"  data-id=${data.id}>
        <i class="ph-list-light ph-1x" style="color: #788cde"></i>
        <span>${data.title}</span>
      </li>`;
  return listElement;
};

const onMouseDown = function (e) {
  e = e || window.event;
  e.preventDefault();
  if (e.target.classList.contains("list")) {
    console.log("mouseDown", e.target);
    isMouseDown = true;
    // mouseOffset = {
    //   x: e.target.offsetLeft - e.clientX,
    //   y: e.target.offsetTop - e.clientY,
    // };

    // get the mouse cursor position at startup:
    client.x = e.clientX;
    client.y = e.clientY;
    // e.target.onmouseup = closeDragElement;
    // // call a function whenever the cursor moves:
    e.target.onmouseup = onMouseUp;

    e.target.onmousemove = onMouseMove;
  }
};

const onMouseMove = function (e) {
  // e.preventDefault();
  // if (isMouseDown) {
  //   e.target.style.left = e.clientX + mouseOffset.x + "px";
  //   e.target.style.top = e.clientY + mouseOffset.y + "px";
  // }

  e = e || window.event;
  e.preventDefault();
  // calculate the new cursor position:
  if (isMouseDown) {
    isMouseMove = true;
    translate.x = translate.x - (client.x - e.clientX);
    translate.y = translate.y - (client.y - e.clientY);
    client.x = e.clientX;
    client.y = e.clientY;
    // set the element's new position:
    e.target.style.transform =
      "translate(" + translate.x + "px, " + translate.y + "px)";
  }
};

const onMouseUp = function (e) {
  isMouseDown = false;
  isMouseMove = false;
  document.onmouseup = null;
  document.onmousemove = null;
  if (e.target.classList.contains("groups")) {
  }
};

function closeDragElement() {
  // stop moving when mouse button is released:
  document.onmouseup = null;
  document.onmousemove = null;
}

(function () {
  RenderList();

  const lists = document.querySelector(".lists");
  const groups = lists;
  lists.addEventListener("mousedown", onMouseDown);
  lists.addEventListener("mousemove", onMouseMove);
  lists.addEventListener("mouseup", onMouseUp);
})();
