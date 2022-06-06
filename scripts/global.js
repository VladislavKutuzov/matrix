//#region МОДУЛИ

import * as sm from './modules/simpleModule/module.js';
import * as wm from './modules/windowManager/module.js';

//#endregion

//#region ОБЪЕ%КТЫ

let dragWindow = document.getElementsByClassName("window")[0];

//#endregion

//#region Переменные

//#region Глобальный объект
    let _GLOBAL = {
      interface: {

      },
      matrix: {
        matrixObject: [
          // по умолчанию пусто
        ],
        numbersList: [
          [0,"по умолчанию"],
        ],
      },
    };
//#endregion

//#endregion

window.onload = () => {
    sm.helloModule();  
    wm.init();
    wm.hideOrShow();
    wm.show("welcome");

    drawMatrixDOM();
}

function drawMatrixDOM() {
    let matrixWorkspace = document.getElementById("matrixSpace");
    matrixWorkspace.innerHTML = null;

    for (let i = 0; i < _GLOBAL.matrix.matrixObject.length; i++) {
      const line = i;
      
      matrixWorkspace.innerHTML += `
        <div class="matrixLine" id="ml_`+line+`"></div>
      `;

      let temper = document.getElementById("ml_"+line);

      for (let k = 0; k < _GLOBAL.matrix.matrixObject[i].length; k++) {
        const matrixSlot = _GLOBAL.matrix.matrixObject[i][k];
        temper.innerHTML += `
          <div class="matrixSlot" id="ms_`+line+`_`+k+`"></div>
        `;
      }
    }
}

//#region Перетаскиваемое окно
dragWindow.onmousedown = function(event) {

    let shiftX = event.clientX - dragWindow.getBoundingClientRect().left;
    let shiftY = event.clientY - dragWindow.getBoundingClientRect().top;

    dragWindow.style.zIndex = 1000;
    document.body.append(dragWindow);
  
    moveAt(event.pageX, event.pageY);
  
    function moveAt(pageX, pageY) {
        if(pageX < (window.innerWidth - dragWindow.clientWidth)){
            dragWindow.style.left = pageX - shiftX + 'px';
        }
        if(pageY < (window.innerHeight - dragWindow.clientHeight)){   
            dragWindow.style.top = pageY - shiftY + 'px';
        }
    }
  
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    dragWindow.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      dragWindow.onmouseup = null;
      dragWindow.style.zIndex = 1;
    };
  
};
  
dragWindow.ondragstart = function() {
    return false;
};
//#endregion

document.getElementsByClassName("close")[0].onmousedown = () => { wm.hideOrShow(); }
document.getElementById("newMatrix").onmousedown = () => { wm.show("newProject"); }
document.getElementById("jsonConfig").onmousedown = () => { wm.show("jsonConfigOpen"); }

document.getElementById("createMatrix").onmousedown = () => {
  wm.show("wait");
  createMatrix().then(()=>{
    wm.hideOrShow();
  }).catch(()=>{wm.show("newProject");});
}

async function createMatrix() {
  const w = document.getElementById("createMatrix_height").value;
  const h = document.getElementById("createMatrix_width").value;

  let matrix = [];
  let matrix_TEMP = [];
  
  for (let i = 0; i < w; i++) {
    matrix_TEMP = [];
    for (let j = 0; j < h; j++) {
      matrix_TEMP.push(j);
    }
    matrix.push(matrix_TEMP);
  }
  console.log(matrix);

  _GLOBAL.matrix.matrixObject = matrix;
  
  drawMatrixDOM()
}