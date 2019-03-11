export default {
    template : '#tabs',
    props : ['tabs','selected-Tab'],
    methods : {
        onSelectTab(tab){
            this.$emit('@change',tab)
        }
    }
}