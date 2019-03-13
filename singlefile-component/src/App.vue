<template>
    <div>
      <header>
        <h2 class="container">검색</h2>
      </header>
      <div class="container">
        <search-form
        v-bind:value="query" 
        v-on:@submit="onSubmit"
        v-on:@reset="onReset"></search-form>
      </div>
      <div v-if="submited" class="container" >
        <search-result v-bind:data="searchResult"
            v-bind:query="query"></search-result>
      </div>
        <div v-else class="container">
          <tabs 
              v-bind:tabs="tabs"
              v-bind:selectedTab="selectedTab"
              v-on:@change="onSelectTab"
          ></tabs>
          <div v-if="selectedTab === tabs[0]">
              <list
                v-bind:data="keywords"
                type="keywords"
                v-on:@click="onClickKeyword"
              ></list>
          </div>
          <div v-else>
            <list
              v-bind:data="historys"
              type="historys"
              v-on:@click="onClickKeyword"
              v-on:@remove="onRemoveHistory"
            ></list>
          </div>
        </div>
      </div>
</template>

<script>
import SearchModel from './models/SearchModel.js'
import KeywordModel from './models/KeywordModel.js'
import HistoryModel from './models/HistoryModel.js'

import FormComponent from './components/FormComponent.vue'
import ResultComponent from './components/ResultComponent.vue';
import TabsComponent from './components/TabsComponent.vue';
import ListComponent from './components/ListComponent.vue';
export default {
  name: 'app',
  data () {
    return {
          query : '', // 입력 데이터를 저장하기 위함
          searchResult : [],
          keywords: [],
          historys : [],
          submited : false, // 검색 했는지 않했는지
          tabs : ['추천 검색어', '최근 검색어'],
          selectedTab : '',
    }
  },
  components : {
    'search-form' : FormComponent,
    'search-result' : ResultComponent,
    'tabs' : TabsComponent,
    'list' : ListComponent,
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
  }
}
</script>

<style>

</style>
