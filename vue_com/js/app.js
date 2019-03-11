'use strict'
import SearchModel from '../js/models/SearchModel.js'
import KeywordModel from '../js/models/KeywordModel.js'
import HistoryModel from '../js/models/HistoryModel.js'

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
    onSubmit : function(e){
      //e.preventDefault()// plain에서는
      this.search();
      
    },
    onReset : function(e){
      this.onResetForm();
    },
    onKeyup : function(e){
      if(!this.query.length)this.onReset() 
    },
    search : function(){
      SearchModel.list().then(data => {
        this.submited = true
        this.searchResult = data
      })
      this.addHistory()
    },
    onResetForm : function(){
      this.query = ''
      this.submited = false
      this.searchResult = []
    }
  }
})


/* 
  
 1.  v-model vue 인스턴스와 연결 (binding) 양방향 바인딩 지원
 2.  v-show and condition 설정으로 x 버튼의 표기
 3.  v-on <- 이벤트 리스너 
 4.   검색 폼 구현

 1. 검색 결과 구현
  2. v-bind attr
  
  tab

  1.  v-bind:class

  돔 변경을 위해 미리 data 설정 해줘야함
*/
