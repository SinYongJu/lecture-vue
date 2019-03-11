'use strict'
import MainController from "./controllers/MainController.js";

window.addEventListener('DOMContentLoaded', function(){
  MainController.init();
})


//
// mvvvm ????

/*
const h1 = document.createElement('h1');

document.body.appendChild(h1)

const viewModel = {}

let model = ''

Object.defineProperty(viewModel, 'model', {
  get() { return model },
  set(val) {
    model = val;
    h1.innerHTML = model
  }

})
*/