import View from './View.js'


const tag = '[TabView]'; // for debug 
const TabView = Object.create(View); // Copy view obj 


TabView.setup = function(el){
    this.init(el)
    TabView.bindClick()
    return this
}

TabView.setActiveTab = function(tabName){
    Array.from(this.el.querySelectorAll('li')).forEach(li => {
        li.className = li.innerHTML === tabName ? 'active' : ''
    })   
    this.show()
}

TabView.bindClick = function(){ // 이벤트 헨들러 추가 
    Array.from(this.el.querySelectorAll('li')).forEach(li => {
        li.addEventListener('click', e => this.onClick(li.innerHTML))
    })
}

TabView.onClick = function(tabName){
    this.setActiveTab(tabName);
    this.emit('@change',{tabName})
}

export default TabView