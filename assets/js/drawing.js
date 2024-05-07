let canvas = document.getElementById("canvas");
canvas.width = 1250;
canvas.height = 500;

let context = canvas.getContext("2d");

let restore_array = [];
let start_index = -1;
let stroke_color = 'black';
let stroke_width = "2";
let is_drawing = false;

function change_color(element) {
    stroke_color = element.style.background;
}

function change_width(element) {
    stroke_width = element.innerHTML
}

function start(event) {
    is_drawing = true;
    context.beginPath();
    context.moveTo(getX(event), getY(event));
    event.preventDefault();
}

function draw(event) {
    if (is_drawing) {
        context.lineTo(getX(event), getY(event));
        context.strokeStyle = stroke_color;
        context.lineWidth = stroke_width;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.stroke();
    }
    event.preventDefault();
}

function stop(event) {
    if (is_drawing) {
        context.stroke();
        context.closePath();
        is_drawing = false;
    }
    event.preventDefault();
    restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
    start_index += 1;
}

function getX(event) {
    if (event.pageX == undefined) { return event.targetTouches[0].pageX - canvas.offsetLeft }
    else { return event.pageX - canvas.offsetLeft }
}


function getY(event) {
    if (event.pageY == undefined) { return event.targetTouches[0].pageY - canvas.offsetTop }
    else { return event.pageY - canvas.offsetTop }
}

canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);

function Restore() {
    if (start_index <= 0) {
        Clear()
    } else {
        start_index += -1;
        restore_array.pop();
        if (event.type != 'mouseout') {
            context.putImageData(restore_array[start_index], 0, 0);
        }
    }
}

function Clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    start_index = -1;
}

var container1 = document.querySelector("#container1");
var activeItem = null;
var active = false;

container1.addEventListener("touchstart", dragStart, false);
container1.addEventListener("touchend", dragEnd, false);
container1.addEventListener("touchmove", drag, false);
container1.addEventListener("mousedown", dragStart, false);
container1.addEventListener("mouseup", dragEnd, false);
container1.addEventListener("mousemove", drag, false);

function dragStart(e) {
    if (e.target !== e.currentTarget) {
        active = true;
        // this is the item we are interacting with
        activeItem = e.target;
        if (activeItem !== null) {
            if (!activeItem.xOffset) {
                activeItem.xOffset = 0;
            }
            if (!activeItem.yOffset) {
                activeItem.yOffset = 0;
            }
            if (e.type === "touchstart") {
                activeItem.initialX = e.touches[0].clientX - activeItem.xOffset;
                activeItem.initialY = e.touches[0].clientY - activeItem.yOffset;
            } else {
                console.log("doing something!");
                activeItem.initialX = e.clientX - activeItem.xOffset;
                activeItem.initialY = e.clientY - activeItem.yOffset;
            }
        }
    }
}

function dragEnd(e) {
    if (activeItem !== null) {
        activeItem.initialX = activeItem.currentX;
        activeItem.initialY = activeItem.currentY;
    }
    active = false;
    activeItem = null;
}

function drag(e) {
    if (active) {
        if (e.type === "touchmove") {
            e.preventDefault();

            activeItem.currentX = e.touches[0].clientX - activeItem.initialX;
            activeItem.currentY = e.touches[0].clientY - activeItem.initialY;
        } else {
            activeItem.currentX = e.clientX - activeItem.initialX;
            activeItem.currentY = e.clientY - activeItem.initialY;
        }

        activeItem.xOffset = activeItem.currentX;
        activeItem.yOffset = activeItem.currentY;

        setTranslate(activeItem.currentX, activeItem.currentY, activeItem);
    }
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}


