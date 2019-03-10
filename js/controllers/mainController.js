import FormView from '../views/FormView.js'
import ResultView from '../views/ResultView.js'
import TabView from '../views/TabView.js'
import KeywordView from '../views/KeywordView.js'
import HistoryView from '../views/HistoryView.js'

import SearchModel from '../models/SearchModel.js'
import KeywordModel from '../models/KeywordModel.js'
import HistoryModel from '../models/HistoryModel.js'

const tag = '[mainController]';

// els
const form = document.querySelector('form');
const searchResult = document.querySelector('#search-result');
const tabs = document.querySelector('#tabs');
const keyword = document.querySelector('#search-keyword');
const history = document.querySelector('#search-history');
// 검색 결과 출력시 고려 실제 메인에서 호출시 시점에 대한 

export default {
  init(){
    console.log('init', FormView)
    FormView.setup(form)
            .on('@submit', e => this.onSubmit(e.detail.input)) 
            .on('@reset', e => this.onResetForm())
            // 뷰에서 오는 이벤트를 받아야 함
            // chaining 위해서 폼 뷰에서의 리턴 this
            
    TabView.setup(tabs)
           .on('@change', e => this.onChangeTab(e.detail.tabName))

    KeywordView.setup(keyword)  
               .on('@click',e => this.onClickKeyword(e.detail.keyword))     
    HistoryView.setup(history) 
               .on('@click',e => this.onClickHisroty(e.detail.history)) 
               .on('@removeClick',e => this.onClickRemoveHistory(e.detail.history)) 
    //  this.onChangeTab()
           // 컨트롤러에서 내부적으로 어느 텝을 선택하였는가
    ResultView.setup(searchResult)

    this.selectedTab = '최근 검색어'
    this.renderView();
    
  },

  renderView(){ // view 들을 한번에 그려줄 위임
    console.log(tag,'renderView()')
    TabView.setActiveTab(this.selectedTab)
    
    if(this.selectedTab === '추천 검색어'){
      this.fetchSearchKeyword()
      HistoryView.hide()
    }else{
      this.fetchSearchHistory()
      KeywordView.hide()
    }
    ResultView.hide() 
  },
  
  fetchSearchKeyword(){
    KeywordModel.list().then(data => {
      KeywordView.render(data)
    })
  },
  
  fetchSearchHistory(){
    HistoryModel.list().then(data => {
      HistoryView.render(data)
    })
  },

  onChangeTab(tab){
    // checkout
    this.selectedTab = tab
    this.renderView()
  },

  onClickKeyword(keyword){ 
    this.search(keyword)
  },

  onClickHisroty(history){  
    this.search(history)
  },

  onClickRemoveHistory(history){
    console.log(history)
    HistoryModel.remove(history)
    this.fetchSearchHistory()
  },

  search(query){
    // console.log(tag, 'search()', query.length ? true : false)
    //search api
    FormView.setValue(query)
    HistoryModel.add(query)
    SearchModel.list(query).then(data => {
      this.onSearchResult(data)
    })
   
  },
  
  onSubmit(input){
    this.search(input) // on submit 일때 검색  검색 데이타는 모델에서
  },
  onResetForm(input){
    console.log(tag,'onResetForm()')
    // ResultView.el.innerHTML = ''
    ResultView.hide() 
    // this.onSearchResult([]) 다른 방법
    this.renderView()
  },
 
  onSearchResult(data){
    TabView.hide();
    KeywordView.hide();
    HistoryView.hide();
    ResultView.render(data)
  },
 

// 과연 무슨 패턴일까!? 
// 패턴에 관하여 
// 이벤트에 관하여 

}