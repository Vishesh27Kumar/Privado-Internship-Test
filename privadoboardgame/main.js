let box1 = document.getElementById("box1");
let box2 = document.getElementById("box2");
window.onload = function () {
  let b1 = {
    leftPosition: Math.floor(Math.random() * 200),
    topPosition: Math.floor(Math.random() * 200),
  };
  let b2 = {
    leftPosition: Math.floor(Math.random() * 200 + 300),
    topPosition: Math.floor(Math.random() * 200 + 300),
  };

  initDrag(b1, b2);
};

window.addEventListener("keydown", move);

function initDrag(b1, b2) {
  box1.style.top = b1.topPosition + "px";
  box1.style.left = b1.leftPosition + "px";
  box2.style.top = b2.topPosition + "px";
  box2.style.left = b2.leftPosition + "px";
}

let onfocus = {
  b1: true,
  b2: false,
};
let speed = 1; // speed of the boxes (better not to be changed with higher values)
let trigger;

box1.addEventListener("click", () => {
  onfocus.b1 = true;
  onfocus.b2 = false;
});

box2.addEventListener("click", () => {
  onfocus.b1 = false;
  onfocus.b2 = true;
});

function move(e) {
  trigger = onfocus.b1 ? box1 : box2;
  let left = trigger.style.left.replace("px", "") * 1;
  let top = trigger.style.top.replace("px", "") * 1;
  switch (e.keyCode) {
    case 37:
    case 65:
      if (left > 0) {
        left -= speed;
        trigger.style.left = left + "px";
        let box1Position = box1.getBoundingClientRect();
        let box2Position = box2.getBoundingClientRect();
        if (!check(box1Position, box2Position)) {
          left -= -speed;
          trigger.style.left = left + "px";
        }
      }
      break;
    case 38:
    case 87:
      if (top > 0) {
        top -= speed;
        trigger.style.top = top + "px";
        let box1Position = box1.getBoundingClientRect();
        let box2Position = box2.getBoundingClientRect();
        if (!check(box1Position, box2Position)) {
          top -= -speed;
          trigger.style.top = top + "px";
        }
      }
      break;
    case 39:
    case 68:
      if (left < 500) {
        left += speed;
        trigger.style.left = left + "px";
        let box1Position = box1.getBoundingClientRect();
        let box2Position = box2.getBoundingClientRect();
        if (!check(box1Position, box2Position)) {
          left += -speed;
          trigger.style.left = left + "px";
        }
      }
      break;
    case 40:
    case 83:
      if (top < 500) {
        top += speed;
        trigger.style.top = top + "px";
        let box1Position = box1.getBoundingClientRect();
        let box2Position = box2.getBoundingClientRect();
        if (!check(box1Position, box2Position)) {
          top += -speed;
          trigger.style.top = top + "px";
        }
      }
      break;
  }
}

function check(box1Position, box2Position) {
  return (
    box1Position.top > box2Position.bottom ||
    box1Position.left > box2Position.right ||
    box1Position.bottom < box2Position.top ||
    box1Position.right < box2Position.left
  );
}
