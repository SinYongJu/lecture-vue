<template>
  <div v-if="data.length">
    <ul class="list">
      <li v-for="(item, index) in data" :key='item.keyword' v-on:click="onClickList(item.keyword)">
        <span v-if="type ==='keywords'" class="number">{{ index+1 }}</span>
        {{ item.keyword }}
        <span v-if="type === 'historys'" class="date">{{ item.date }}</span>
        <button v-if="type ==='historys'" type="button" class="btn-remove" v-on:click.stop="onRemovelist(item.keyword)"></button>
      </li>
    </ul>
  </div>
  <div v-else>
    <div v-if="keywordType">
      추천 검색어가 없습니다.
    </div>
    <div v-if="historyType">
      최근 검색어가 없습니다.
    </div> 
  </div>
</template>

<script>
export default {
    props : ['data','type'],
    computed : {
        keywordType(){
            return this.type === 'keywords'
        },
        historyType(){
            return this.type === 'historys'
        },
    },
    methods : {
        onClickList(keyword){
            this.$emit('@click',keyword)
        },
        onRemovelist(keyword){
            this.$emit('@remove',keyword)
        },
    }
}
</script>