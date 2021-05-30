import * as lsH from 'ls.js';
import * as uH from 'utilities.js';

var todoList = null;

export class Todos {
    constructor(id) {
        this.element = document.getElementById(id);
        this.key = this.element.id;
    }
}

function saveTodo(task, key) {
    let t = getToDo(key);    
}