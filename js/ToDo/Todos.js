import * as lsH from './ls.js';
import * as uH from './utilities.js';

var todoList = null;

export default class Todos {
    constructor(id) {
        this.element = document.getElementById(id);
        this.key = this.element.id;
    }

    showToDoList(){
        getToDo(this.LSkey);
        renderToDoList(this.element, todoList);
        if(todoList != null){
            this.addEventListeners();
        }
    }

    addToDo(){
        const task = document.getElementById('new-task');
        saveTodo(task, this.key);
        this.showToDoList();
    }

    addEventListeners() {
        const ls = Array.from(this.element.children);
        if(ls.length > 0 && ls[0].children[0]){
        ls.forEach(item => {
            item.children[0].addEventListener('click', event => {
                this.completeToDo(event.currentTarget.id);
            })
            item.children[2].addEventListener('click', event => {
                this.removeItem(event.currentTarget.id);
            })
        })}
    }

    completeToDo(itId) {
        let t = todoList.findIndex(task => task.id == itId);
        todoList[t].completed = !todoList[t].completed;
        lsH.writeToLS(this.key, todoList);
        markDone(itId);
    }

    filterToDos(category){
        category = filterBy(category);
        const f = todoList.filter(task => {
            if (category != null){
                return task.completed == category;
            }
            else {
                return task;
            }
        })
        renderToDoList(this.element, f);
        this.addEventListeners();
    }

    addTabListeners() {
        alert('hola');
        const lsT = Array.from(document.querySelectorAll('.tab'));
        lsT.forEach(tab => {
            tab.addEventListener('click', event => {
                for (let item in lsT){
                    lsT[item].classList.remove('selected-tab');
                }
                event.currentTarget.classList.add('selected-tab');
                this.filterToDos(event.currentTarget.id);
            })
        })    
    }

    removeItem(itID) {
        let t = todoList.findIndex(task => task.id == itID);
        todoList.splice(t, 1);
        lsH.writeToLS(this.key, todoList);
        this.showToDoList();
    }
}

function filterBy(category){
    switch(category){
        case 'active':
            category = false;
            break;
        case 'complete':
            category = true;
            break;
        case 'all':
            category = null;
            break;
    }
    return category;
}

function getToDo(key) {
    if(todoList === null) {
        todoList = [];
        let ls = lsH.readFromLS(key);
        if(ls != null){
            ls.foreach(task => todoList.push(task));
        }
    }
    return todoList;
}

function saveTodo(task, key) {
    let t = getToDo(key);
    let timestamp = Date.now();
    const nt = {id: timestamp, content: task.value, completed: false};
    t.push(nt);
    lsH.writeToLS(key,t);
    task.value = '';
    task.focus();    
}

function renderToDoList(p, ls) {
    p.innerHTML = '';
    if(ls != null && ls.length > 0) {
    ls.forEach(taskObject => {
        p.appendChild(renderOneToDo(taskObject));
    })
    }
    updateCount(ls);
}

function renderOneToDo(task) {
    const t = document.createElement('li');
    task.completed ? t.classList.toggle('completed') : '';
    t.innerHTML = 
        `<input id="${task.id}" name="${task.content}" type="checkbox" value="none" ${task.completed ? 'checked' : ''}>
        <label for="${task.id}">${task.content}</label>
        <div class="delete">X</div>`;
    return t;
}

function updateCount(ls){
    const count = document.getElementById('num-task');
    if(ls != null) {
        count.innerHTML = `${ls.length} tasks left`;
    } else {
        count.innerHTML = `0 tasks left`;
    }
}

function markDone(itId){
    let task = document.getElementById(itId).parentElement;
    task.classList.toggle('completed');
}