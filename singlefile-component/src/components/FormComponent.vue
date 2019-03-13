<template>
  <form action="" v-on:submit.prevent="onSubmit">
    <input type="text" v-model="inputValue" v-on:keyup="onKeyup" placeholder="검색어를 입력해주세요" autofocus>
    <button v-show="inputValue.length" class="btn-reset" type="reset" v-on:click="onReset"></button>
  </form>
</template>

<script>
export default{ 

    props : ['value'],
    data(){
        
        return {
            inputValue : this.value
        }
    },
    watch : {
        value(newValue, oldValue){
            this.inputValue = newValue
        }
    }, // 부모에서 넘오오는 인자 값을 감지
    methods : {
        onSubmit : function(e){
          this.$emit('@submit', this.inputValue.trim()) // 정확한 처리를 위한 트림
            
        },
        onKeyup : function(e){
            if(!this.inputValue.length)this.onReset() 
        },
        onReset : function(e){
            this.inputValue = ''
            this.$emit('@reset')
        }
    }
}
</script>