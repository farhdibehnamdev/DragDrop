let mouseOffset = { x: 0, y: 0 };
let isMouseDown = false;
const onMouseDown = function (e) {
  if (e.target.classList.contains("list")) {
    console.log("mouseDown", e.target);
    isMouseDown = true;
    mouseOffset = {
      x: e.target.offsetLeft - e.clientX,
      y: e.target.offsetTop - e.clientY,
    };
  }
};

const onMouseMove = function (e) {
  e.preventDefault();
  if (isMouseDown) {
    e.target.style.left = e.clientX + mouseOffset.x + "px";
    e.target.style.top = e.clientY + mouseOffset.y + "px";
  }
};

const onMouseUp = function (e) {
  isMouseDown = false;
};

(function () {
  const lists = document.querySelector(".lists");
  const groups = lists;
  lists.addEventListener("mousedown", onMouseDown);
  lists.addEventListener("mousemove", onMouseMove);
  lists.addEventListener("mouseup", onMouseUp);
})();
