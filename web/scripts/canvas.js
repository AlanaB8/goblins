/* Tasks:
* Send custom event when the game is ready
* Switch to a different script when the game is ready??
* Get, post goblin locations
* Refactor mouse events
*/


// Canvas Setup ----------------------------------------------------------------------

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

const BB = canvas.getBoundingClientRect();
const offsetX = BB.left;
const offsetY = BB.top;

canvas.onmousedown = myDown;
canvas.onmouseup = myUp;
canvas.onmousemove = myMove;


// Agent Interaction ----------------------------------------------------------------------

//Agents are the only draggable game elements
let dragok = false;
let startX = 0;
let startY = 0;

const agents = [];
agents.push({
    canDrag: true,
    isDragging: false,
    // These props will be grabbed from the hosted table:
    x: 700,
    y: 300,
    found: false //Must be false at beginning of game
});
agents.push({
    canDrag: true,
    isDragging: false,
    // These props will be grabbed from the hosted table:
    x: 700,
    y: 400,
    found: false //Must be false at beginning of game
});
agents.push({
    canDrag: true,
    isDragging: false,
    // These props will be grabbed from the hosted table:
    x: 700,
    y: 500,
    found: false //Must be false at beginning of game
});
agents.push({
    canDrag: true,
    isDragging: false,
    // These props will be grabbed from the hosted table:
    x: 700,
    y: 200,
    found: false //Must be false at beginning of game
});

// handle mousedown events
function myDown(e) {

    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // get the current mouse position
    var mx = parseInt(e.clientX - offsetX);
    var my = parseInt(e.clientY - offsetY);

    // test each rect to see if mouse is inside
    dragok = false;
    for (var i = 0; i < agents.length; i++) {
        var agent = agents[i];
        if (mx > agent.x && mx < agent.x + 35 && my > agent.y && my < agent.y + 30) {
            if (agent.canDrag) {
            // if yes, set that rects isDragging=true
            dragok = true;
            agent.isDragging = true;
            }

        }
    }
    // save the current mouse position
    startX = mx;
    startY = my;
}

// handle mouseup events
function myUp(e) {
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // clear all the dragging flags
    dragok = false;
    for (let i = 0; i < agents.length; i++) {
        if (agents[i].isDragging) {
            agents[i].isDragging = false;
            if (agents[i].x < 600) {
                agents[i].canDrag = false;
            console.log(`Final pos for goblin ${i}: ${agents[i].x}, ${agents[i].y}`);
            //TODO: post new agent location.
            }
        }
    }
}

// handle mouse moves
function myMove(e) {
    // if we're dragging anything...
    if (dragok) {

        // tell the browser we're handling this mouse event
        e.preventDefault();
        e.stopPropagation();

        // get the current mouse position
        var mx = parseInt(e.clientX - offsetX);
        var my = parseInt(e.clientY - offsetY);

        // calculate the distance the mouse has moved
        // since the last mousemove
        var dx = mx - startX;
        var dy = my - startY;

        // move each rect that isDragging 
        // by the distance the mouse has moved
        // since the last mousemove
        for (var i = 0; i < agents.length; i++) {
            var agent = agents[i];
            if (agent.isDragging) {
                agent.x += dx;
                agent.y += dy;
            }
        }

        // redraw the scene with the new rect positions
        draw();

        // reset the starting mouse position for the next mousemove
        startX = mx;
        startY = my;

    }
}

// Drawing ----------------------------------------------------------------------

// Draw icon to the canvas
function drawIcon(x, y, w, h, src) {
    const imgObj = new Image();
    imgObj.src = src;
    imgObj.onload = () => {ctx.drawImage(imgObj, x, y, w, h);};
}

// clear the canvas
function clear() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

// redraw the scene
//TODO: enable draws while dragging
function draw() {
    clear();

    //Draw background: game map, to scale, and container for agents
    const map = new Image();
    map.src = '../images/map.png';
    map.onload = () => {ctx.drawImage(map, 0, 0, 600, 600);};

    const container = new Image();
    container.src = '../images/container.png';
    container.onload = () => {ctx.drawImage(container, 600, 0, 200, 600);};

    //Draw sewer (no movement)
    drawIcon(212, 509, 45, 45, '../images/sewer.png');
    
    //Draw enemies (movement is a stretch goal, likely will simulate it in the canvas rather than requesting data)
    drawIcon(94, 79, 40, 30, '../images/enemy.png');
    drawIcon(380, 130, 40, 30, '../images/enemy.png');
    drawIcon(148, 195, 40, 30, '../images/enemy.png');
    drawIcon(195, 288, 40, 30, '../images/enemy.png');
    drawIcon(183, 358, 40, 30, '../images/enemy.png');
    drawIcon(316, 365, 40, 30, '../images/enemy.png');
    drawIcon(443, 407, 40, 30, '../images/enemy.png');
    drawIcon(108, 436, 40, 30, '../images/enemy.png');

    //Draw agents
    for (let i = 0; i < agents.length; i++) {
        const agent = agents[i];
        if (!agent.found) {
            drawIcon(agent.x, agent.y, 35, 30, '../images/agent.png');
        } else {
            drawIcon(agent.x, agent.y, 35, 30, '../images/agent-found.png');
        }
    }

    //If game has entered Stage 2, draw player

}

// call to draw the scene
draw();