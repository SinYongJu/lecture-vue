<template>
  <div v-if="data.length" id="search-result">
    <ul class="list">
      <li v-for="item in data" :key="item.name">
        <img v-bind:src="item.img" alt="">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    props : ['data','query'],
    data(){
        return {}
    },

}
</script>