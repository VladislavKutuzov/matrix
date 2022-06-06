let windowObject;

function init() {
    windowObject = document.getElementsByClassName("window")[0];
}

function show(contentName) {
    document.getElementById("newProject").style.display = "none";
    document.getElementById("welcome").style.display = "none";
    document.getElementById("jsonConfigOpen").style.display = "none";
    document.getElementById("wait").style.display = "none";

    document.getElementById(contentName).style.display = "block";
}

function hideOrShow() {
    if (windowObject.style.display == "none" || windowObject.style.display == "") {
        windowObject.style.display = "block";
    } else {
        windowObject.style.display = "none";
    }
}

export {
    init as init,
    show as show,
    hideOrShow as hideOrShow
};