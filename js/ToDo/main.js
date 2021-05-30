import Todos from './Todos.js';

const todo = new Todos('tasks');

window.addEventListener('load', () => {
    todo.showToDoList();
    todo.addTabListeners();
});

const nTask= document.getElementById('add');
nTask.addEventListener('click', () => {
  todo.addToDo();
});

