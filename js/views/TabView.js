import View from './View.js'


const tag = '[TabView]'; // for debug 
const TabView = Object.create(View); // Copy view obj 


TabView.setup = function(el){
    this.init(el)
}

TabView.setActiveTab = function(tabName){
    Array.from(this.el.querySelectorAll('li')).forEach(li => {
        li.className = li.innerHTML === tabName ? 'active' : ''
    })
    

}

export default TabView