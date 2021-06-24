// [ 코드스피츠 ]  디자인패턴/뷰패턴 -3
// Composite Pattern
import el from './DOMControl';

// 데이터 클래스 
const Task = class{
    constructor(title, date){
        this._title = title;
        this._date = date;
        this._isComplete = false;
        this._list = [];
    }
    isComplete(){ return this._isComplete }
    toggle(){ this._isComplete = !this._isComplete}
    
    //list 추가
    add(title, date=null){
        const list = this._list;
        list.push(new Task(title,date));
    }
    //oop에서는 값 x. 주소값을 전달해야 함
    remove(task){
        const list = this._list;
        list.filter(t=>t!==task);
    }

    byTitle(){}
    byDate(){}

    //sort된 sublist를 재귀한 뒤 return,,
    list(sort, stateGroup = true){
        const list = this._list, f = (a,b) => a[sort] > b[sort];           
        return {
            task: this,
            list: !stateGroup ? [...list].sort(f).map(task => task.list(sort,stateGroup)) : [
                ...list.filter(t=>!t.isComplete()).sort(f).map(task => task.list(sort,stateGroup)),
                ...list.filter(t=>t.isComplete()).sort(f).map(task => task.list(sort,stateGroup))                
            ] 
        };
    }
}

//DOM 조작 클래스
const Renderer  = class {
    constructor(parent){
        this._parent = parent;
    }

    //DOM El 생성. 재귀 DOM 생성의 진입점 함수
    render(data){
        const { task: {title:_title}, list} = data;
        const parent = this._parent;
        parent.innerHTML = '';
        parent.appendChild(el('h1',{innerHTML:title}));
        //
        parent.appendChild(this._render(el('ul'),list));        
    }
    
    _render(parent, list){
        list.forEach(({task,list})=>{
            const li = parent.appendChild(el('li'));
            li.appendChild(el('div',{innerHTML:task._title}));
            //재귀 
            li.appendChild(this._render(el('ul'),list));    
        });
        return parent;
    }

}

let tasks = new Task('root');
tasks.add('todo - 1');
tasks.add('todo - 2');
tasks.add('todo - 3');

let list = tasks.list('title');
list[1].task.add('todo - 2-1');
list[1].task.add('todo - 2-2');

const todo = new Renderer('#root');
todo.render(tasks.list('title'));



// folder-file 구조에서 composite패턴 
// 두 개 이상의 클래스에 대해 같은 class를 상속시켜서 재귀를 통해 탐색하게 하는 방식
// 

class Search{
    Search(v){}
}

class File extends Search{
    //검색된 객체는 자기 자신을 return
    Search(v){ return this.content.includes(v) ? [this] : [] }
}
class Forder extends Search{
    // this.child 는 file 객체를 가지는 array
    Search(v){ return this.child.filter( f => f.search(v).length ) };
}