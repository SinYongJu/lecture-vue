import View from './View.js'

const tag = '[ResultView]'

const ResultView = Object.create(View)


ResultView.message = {
  NO_RESULT_MESSAGE : "검색 결과가 없습니다"
}

ResultView.setup = function(el) {
  this.init(el)  
  return this
}


ResultView.render = function(data = []){
  this.el.innerHTML = data.length ? this.getSearchResultHTML(data) : this.message.NO_RESULT_MESSAGE
  this.show()
}

ResultView.getSearchResultHTML = function (data){
  //debugger // 디버거로 멈춘다 이때 data 있는지  디버깅 방법
  console.log(tag, 'getSearchResultHTML', data)
  return  data.reduce((html, item) => {
    html += this.getSearchItemHTML(item)
    return html
  },'<ul>') + '</ul>'
  
}

ResultView.getSearchItemHTML = function(item){
  console.log(item)
  return `<li> 
    <img src="${item.image}">
    <p>${item.name}</p>
  </li>`
}




export default ResultView