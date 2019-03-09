import FormView from '../views/FormView.js'
import ResultView from '../views/ResultView.js'
import TabView from '../views/TabView.js'
import SearchModel from '../models/SearchModel.js'
const tag = '[mainController]';

// els
const form = document.querySelector('form');
const searchResult = document.querySelector('#search-result');
const tabs = document.querySelector('#tabs');
// 검색 결과 출력시 고려 실제 메인에서 호출시 시점에 대한 

export default {
  init(){
    console.log('init', FormView)
    FormView.setup(form)
            .on('@submit', e => this.onSubmit(e.detail.input)) 
            .on('@reset', e => this.onResetForm())
            // 뷰에서 오는 이벤트를 받아야 함
            // chaining 위해서 폼 뷰에서의 리턴 this
    TabView.setup(tabs)// 컨트롤러에서 내부적으로 어느 텝을 선택하였는가
    ResultView.setup(searchResult)

    this.selectedTab = '추천 검색어'
    this.renderView();
    
  },
  search(query){
    console.log(tag, 'search()', query.length ? true : false)
    //search api
    if(!query)return
    SearchModel.list(query).then(data => {
      this.onSearchResult(data)
    })
  },
  onSubmit(input){
    console.log(tag,'onSubmit',input)
    this.search(input) // on submit 일때 검색  검색 데이타는 모델에서
  },
  onResetForm(input){
    console.log(tag,'onResetForm()')
    ResultView.el.innerHTML = ''
    // this.onSearchResult([]) 다른 방법
  },
 
  onSearchResult(data){
    ResultView.render(data)
  },

  renderView(){ // view 들을 한번에 그려줄 위임
    console.log(tag,'renderView()')
    TabView.setActiveTab(this.selectedTab)
    ResultView.hide() 
  }

// 과연 무슨 패턴일까!? 
// 패턴에 관하여 
// 이벤트에 관하여 

}