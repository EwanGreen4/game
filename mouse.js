// Buttons in the "buttons" array below are NOT HTML elements; they are generic
// objects with positional parameters & an element parameter, for which it acts
// as a surrogate for events.
// Use like so:

//		var element = new Image();
//		var button = {x: x, y: y, w: w, h: h, elem: element};
//		mouse.buttons.push(button);
//		element.onmousedown = callback;

let mouse = {
  buttons: [],
  lastPos: {
    x: 0,
    y: 0,
  },
  newPos: {
    x: 0,
    y: 0,
  },

  contains: function (pos, button) {
    return (
      pos.x > button.x &&
      pos.y > button.y &&
      pos.x < button.x + button.w &&
      pos.y < button.y + button.h
    );
  },
  compare: function (pos1, pos2) {
    return pos1.x == pos2.x && pos1.y == pos2.y;
  },
  trackedEvents: ["mousedown", "mouseup", "mousemove"],
};

// Custom mouse event propagator for HTMLCanvas
mouse.trackedEvents.forEach((event) =>
  document.getElementById("canvas").addEventListener(
    event,
    function (event) {
      var canvas = document.getElementById("canvas");
      mouse.newPos = {
        x: event.x - canvas.offsetLeft,
        y: event.y - canvas.offsetTop,
      };

      for (const button of mouse.buttons) {
        if (mouse.contains(mouse.newPos, button)) {
          if (!mouse.contains(mouse.lastPos, button)) {
            if (button.elem.onmouseenter !== null) button.elem.onmouseenter();
          } else {
            if (!mouse.compare(mouse.newPos, mouse.lastPos))
              if (button.elem.onmousemove !== null) button.elem.onmousemove();
          }
          if (event.type != "mousemove") {
            if (button.elem["on" + event.type] !== null)
              button.elem["on" + event.type]();
          }
        } else if (mouse.contains(mouse.lastPos, button))
          if (button.elem.onmouseleave !== null) button.elem.onmouseleave();
      }
      mouse.lastPos = {
        x: mouse.newPos.x,
        y: mouse.newPos.y,
      };
    },
    false
  )
);
