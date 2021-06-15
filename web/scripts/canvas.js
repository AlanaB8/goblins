    /* Tasks:
    * Load SVG map onto canvas
    * Rectangles with purple strokes
    * Add red drone icons, purple exit icon to canvas
    * Switch yellow rectangles out for little friend pngs
    * Send custom event: game is ready
    */
    
    
    // get canvas related references
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    const BB = canvas.getBoundingClientRect();
    const offsetX = BB.left;
    const offsetY = BB.top;
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;
    // drag related
    var dragok = false;
    var startX = 0;
    var startY = 0;



    // an array of goblin agents
    const gobs = [];
    gobs.push({
        x: 530,
        y: 25,
        found: false,
        canDrag: true,
        isDragging: false
    });
    gobs.push({
        x: 530,
        y: 100,
        found: false,
        canDrag: true,
        isDragging: false
    });
    gobs.push({
        x: 530,
        y: 175,
        found: false,
        canDrag: true,
        isDragging: false
    });
    gobs.push({
        x: 530,
        y: 250,
        found: false,
        canDrag: true,
        isDragging: false
    });

    // listen for mouse events
    canvas.onmousedown = myDown;
    canvas.onmouseup = myUp;
    canvas.onmousemove = myMove;


    // draw a single rect
    function drawGoblin(x, y) {
        const imgObj = new Image();
        imgObj.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg';
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
        const imgObj = new Image();
        imgObj.src = './map.jpg';
        ctx.drawImage(imgObj, 250, 250);


        clear();
        ctx.fillStyle = "#202020";

        ctx.fillStyle = "#FF0000";
        ctx.beginPath();
        ctx.arc(100, 75, 10, 0, 2 * Math.PI);
        ctx.fill();
        
        // redraw each rect in the rects[] array
        for (var i = 0; i < gobs.length; i++) {
            var r = gobs[i];
            ctx.fillStyle = r.fill;
            drawGoblin(r.x, r.y);
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