let x = 0;

let y = 50;

let scale = 1;

document.getElementById("workspace").onmousedown = (event) => {
    let xStart = event.clientX;
    let yStart = event.clientY;

    function onMouseMove(event) {
        if (event.which == 2) {
            document.getElementById("workspace").classList.add("workspace__move");
            
            if (event.clientX > xStart + 1) {
                x += event.clientX - xStart;
                document.documentElement.style.setProperty("--matrixSpace_X", x + "px");
            }
            if (event.clientX < xStart) {
                x -= xStart - event.clientX;
                document.documentElement.style.setProperty("--matrixSpace_X", x + "px");
            }

            if (event.clientY > yStart) {
                y += event.clientY - yStart;
                document.documentElement.style.setProperty("--matrixSpace_Y", y + "px");
            } 
            if (event.clientY < yStart) {
                y -= yStart - event.clientY;
                document.documentElement.style.setProperty("--matrixSpace_Y", y + "px");
            }

            xStart = event.clientX;
            yStart = event.clientY;
        }
    }

    document.addEventListener('mousemove', onMouseMove);

    document.getElementById("workspace").onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        document.getElementById("workspace").onmouseup = null;
        document.getElementById("workspace").classList.remove("workspace__move");
    };
}

document.getElementById("workspace").onwheel = (event) => {
    if (event.deltaY < 0) {
        scale += 0.1;
        document.documentElement.style.setProperty("--matrixSpace_Scale", scale);
    } else {
        scale -= 0.1;
        document.documentElement.style.setProperty("--matrixSpace_Scale", scale);
    }
}

