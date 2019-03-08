/*
  form view를 담당한다

*/


import View from './View.js'


const tag = '[FormView]'; // for debug 
const FormView = Object.create(View); // Copy view obj 

FormView.setup = function(el){
  this.init(el)
  this.inputEl = el.querySelector('[type = text]')
  this.resetEl = el.querySelector('[type = reset]')
  this.showResetBtn(false)
  this.bindEvents()
  return this
}


// form button의 노출 유무
FormView.showResetBtn = function(show = true){ 
    this.resetEl.style.display = show ? 'block' : 'none';

}
FormView.bindEvents = function(){
  this.on(e => e.preventDefault())
  this.inputEl.addEventListener('keyup',e => this.onKeyup(e))
  this.resetEl.addEventListener('click', e => this.onReset(e))
}
FormView.onKeyup = function(e){
  const enter = 13;
  this.showResetBtn(this.inputEl.value.length)
  if(!this.inputEl.value.length) this.emit('@reset') // 검색어를 삭제시 검색결과 삭제에 대하여 , 입력한 값을 지울 경우
  if(e.keyCode !== enter)return

   /* 
    폼 뷰는 엔터를 눌렀을 때 이벤트를 콘트롤러로 
   */
   this.emit('@submit', {input: this.inputEl.value}) // 검색 결과가 보이게 한다는 컨트롤러에 위임
  
}
FormView.onReset = function(e){
  this.emit('@reset') // click 시 지울 경우
  this.showResetBtn(false)
}



export default FormView