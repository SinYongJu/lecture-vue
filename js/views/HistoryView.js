import KeywordView from './KeywordView.js'


const tag = '[HistoryView]'; // for debug 
const HistoryView = Object.create(KeywordView); // Copy view obj 

// 키워드 뷰와 기능 유사 그래서 카피해서 사용

HistoryView.message = {
    NO_RESULT_MESSAGE : "최근 검색어가 없습니다"
  }
  

HistoryView.getKeywordViewHTML = function(data){
    return data.reduce((html, item ,index) => {
     html += `<li data-keyword="${item.keyword}">
         <span class="numbers">${index + 1}</span>
         ${item.keyword}
         <span class="date">${item.date}</span>
         <button type="button" class="btn-remove"></button>
     </li>`
     return html
    }, '<ul class="list">') + '</ul>'
}

HistoryView.bindClickEvent = function(){
    console.dir(this.el.querySelector('li'))
    Array.from(this.el.querySelectorAll('button.btn-remove')).forEach(button => { // 유사 배열이라서 from 사용
        button.addEventListener('click',e => {
            e.preventDefault();
            this.onClickRemoveHistory(e)
        })
    })
}

HistoryView.onClickRemoveHistory = function(e){
    console.dir(e.currentTarget)
    const { keyword } = e.currentTarget.parentNode.dataset
    this.emit('@removeClick',{history : keyword})
  }
  

export default HistoryView