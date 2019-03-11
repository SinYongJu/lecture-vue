export default {
    template : "#list-component",
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