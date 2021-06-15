    /* Tasks:
    * Load SVG map onto canvas

    * Rectangles with purple strokes
    * Add red drone icons, purple exit icon to canvas
    * Switch yellow rectangles out for little friend pngs
    * Send custom event: game is ready
    */
    
    // Canvas Setup
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

    const dragok = false;
    const startX = 0;
    const startY = 0;

    const agents = [];
    agents.push({
        x: 530,
        y: 25,
        found: false,
        canDrag: true,
        isDragging: false
    });
    

    /* 
     * Enemies
     * Stretch goal: animate their locations on semi-credible paths.
    const enemies = [];
    enemies.push({
        x: 0,
        y: 0
    });
    */

    // draw a goblin
    function drawGoblin(x, y) {
        const imgObj = new Image();
        imgObj.src = '../images/follower.png';
        imgObj.onload = () => {ctx.drawImage(imgObj, x, y);};
        
        // ctx.beginPath();
        // ctx.rect(x, y, w, h);
        // ctx.closePath();
        // ctx.fill();
    }

    // clear the canvas
    function clear() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
    }

    // redraw the scene
    function draw() {
        clear();
        const map = new Image();
        map.src = '../images/map.jpg';
        map.onload = () => {ctx.drawImage(map, 0, 0, 600, 600);};

        // clear();
        ctx.fillStyle = "#202020";

        ctx.fillStyle = "#FF0000";
        ctx.beginPath();
        ctx.arc(100, 75, 10, 0, 2 * Math.PI);
        ctx.fill();
        
        // redraw each rect in the rects[] array
        for (var i = 0; i < agents.length; i++) {
            var agent = agents[i];
            drawGoblin(agent.x, agent.y);
        }
    }


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
        for (var i = 0; i < gobs.length; i++) {
            var r = gobs[i];
            if (mx > r.x && mx < r.x + r.width && my > r.y && my < r.y + r.height) {
                if (r.canDrag) {
                // if yes, set that rects isDragging=true
                dragok = true;
                r.isDragging = true;
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
        for (var i = 0; i < gobs.length; i++) {
            if (gobs[i].isDragging) {
                gobs[i].isDragging = false;
                if (gobs[i].x < 400)
                    gobs[i].canDrag = false;
                    console.log(`Final pos for goblin ${i}: ${gobs[i].x}, ${gobs[i].y}`)
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
            for (var i = 0; i < gobs.length; i++) {
                var r = gobs[i];
                if (r.isDragging) {
                    r.x += dx;
                    r.y += dy;
                }
            }

            // redraw the scene with the new rect positions
            draw();

            // reset the starting mouse position for the next mousemove
            startX = mx;
            startY = my;

        }
    }

            // call to draw the scene
            draw();