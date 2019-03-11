export default{
    template : '#search-form',
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