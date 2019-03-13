export default {
    template : '#tabs',
    props : ['tabs','selectedTab'],
    methods : {
        onSelectTab(tab){
            this.$emit('@change',tab)
        }
    }
}