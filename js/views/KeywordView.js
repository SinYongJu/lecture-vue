import View from './View.js'


const tag = '[KeywordView]'; // for debug 
const KeywordView = Object.create(View); // Copy view obj 


KeywordView.message = {
    NO_RESULT_MESSAGE : "추천 검색어가 없습니다"
  }
  

KeywordView.setup = function(el){
    this.init(el)
    
    return this
}

KeywordView.render = function(data = []){
    this.el.innerHTML = data.length ? this.getKeywordViewHTML(data) : this.message.NO_RESULT_MESSAGE
    this.bindClickEvent()
    this.show()
}

KeywordView.getKeywordViewHTML = function(data){
   return data.reduce((html, item ,index) => {
    html += `<li data-keyword="${item.keyword}">
        <span class="numbers">${index + 1}</span>
        ${item.keyword}
    </li>`
    return html
   }, '<ul class="list">') + '</ul>'
}

KeywordView.bindClickEvent = function(){
    console.dir(this.el.querySelector('li'))
    Array.from(this.el.querySelectorAll('li')).forEach(li => { // 유사 배열이라서 from 사용
        console.log(li)
        li.addEventListener('click',e => this.onClickKeyword(e))
    })
}

KeywordView.onClickKeyword = function(e){
  const { keyword } = e.currentTarget.dataset
  this.emit('@click',{keyword})
}


export default KeywordView