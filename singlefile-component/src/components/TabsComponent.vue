<template>
  <ul class="tabs">
    <li v-for="tab in tabs" v-bind:class="{active : tab === selectedTab }" :key="tab" v-on:click="onSelectTab(tab)">{{tab}}</li>
  </ul>
</template>

<script>
export default {
    props : ['tabs','selected-Tab'],
    methods : {
        onSelectTab(tab){
            this.$emit('@change',tab)
        }
    }
}
</script>