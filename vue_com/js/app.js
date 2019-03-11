'use strict'
import SearchModel from '../js/models/SearchModel.js'
import KeywordModel from '../js/models/KeywordModel.js'
import HistoryModel from '../js/models/HistoryModel.js'

import FormComponent from './components/FormComponent.js'
import ResultComponent from './components/ResultComponent.js';
import ListComponent from './components/ListComponent.js';
import TabComponent from './components/TabComponent.js';

new Vue({
  el : '#app',
  data : {
   query : '', // 입력 데이터를 저장하기 위함
   searchResult : [],
   keywords: [],
   historys : [],
   submited : false, // 검색 했는지 않했는지
   tabs : ['추천 검색어', '최근 검색어'],
   selectedTab : '',
  },
  created : function(){
    this.selectedTab = this.tabs[0]
    this.fetchKeyword();
    this.fetchHistory();
  },
  methods : { // 바인딩할 함수들 정의 가능
    addHistory : function(){
      console.log(this.query)
      HistoryModel.add(this.query)
      this.fetchHistory()
    },
    onRemoveHistory : function(keyword){
      HistoryModel.remove(keyword)
      this.fetchHistory()
    },
    fetchHistory : function(){
      HistoryModel.list().then(data => {
        this.historys = data
      })
    },
    onClickKeyword : function(keyword){      
      this.query = keyword
      this.search()
    },
    fetchKeyword : function(){
      KeywordModel.list().then(data => {
        this.keywords = data
      })
    },
    onSelectTab : function(tab){
      this.selectedTab = tab
    },
   
    onSubmit : function(query){
      this.query = query
      // e.preventDefault()// plain에서는
     this.search();
      
    },
    search : function(){
    SearchModel.list().then(data => {
        this.submited = true
        this.searchResult = data
    })
    this.addHistory()
    },
    onReset : function(e){
        this.onResetForm();
    },

    onResetForm : function(){
    this.query = ''
    this.submited = false
    this.searchResult = []
    },
  },
  components : {
    'search-form' : FormComponent,
    'result-component' : ResultComponent,
    'list-component' : ListComponent,
    'tabs' : TabComponent,
  }
})


