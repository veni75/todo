'use strict';

const date = document.querySelector('.date');
const day = document.querySelector('.day');
const todoList = document.querySelector('.todo__list');
const todoDoneList = document.querySelector('.todo__doneList');
const clear = document.querySelector('.todo__clear');
const input = document.querySelector('input');
const counter = document.querySelector('.todo__counter');
const doneCounter = document.querySelector('.todo__doneCounter');
const hide = document.querySelector('.todo__hide');
const complete = document.querySelector('.todo__complete');
let todoElement, todoWhite, todoRed, todoDiv;
let inputText;
let number = 0;
let sorszam = 0;
let percent = 0;
let done = 0;

const dateHandler = () => {
    const now = new Date();
    let options = { weekday: 'long' };
    day.textContent = new Intl.DateTimeFormat('en-GB', options).format(now);
    date.textContent = new Intl.DateTimeFormat('en-GB').format(now);
}
dateHandler();

const todoDoneHide = () => {
    hide.addEventListener('click', () => {
        complete.classList.toggle('hide');
        hide.textContent = hide.textContent.includes('Hide') ? 'Show Complete' : 'Hide Complete';
    })
}
todoDoneHide();

const clearTodo = () => {       
    localStorage.clear();    
    todoList.removeChild(todoDiv);    
    number = 0;
    counter.textContent = number;
}

const deleteTodo = (ev) => {
    const elem = ev.currentTarget;
    const todoElement = elem.parentElement;
    const todoId = todoElement.className.split(' ').pop();
    todoElement.parentElement.removeChild(todoElement);
    localStorage.removeItem(`todo${todoId}`);
    number -= 1;
    counter.textContent = number;
}

const redElement = (element) => {
    todoRed = document.createElement('div');
    element.appendChild(todoRed);
    todoRed.className = ('hide');
    const redIcon = document.createElement('i');
    todoRed.appendChild(redIcon);
    redIcon.className = ('fa fa-calendar-minus');
    todoRed.addEventListener('click', deleteTodo);
}

const toDo = () => {
    inputText = input.value;
    number += 1;
    sorszam += 1;
    localStorage.setItem(`todo${sorszam}`, inputText);
    input.value = '';
    todoDiv = document.createElement('div');
    todoDiv.className = ('todoDiv');
    todoElement = document.createElement('input');
    todoElement.setAttribute('type', 'checkbox');
    todoElement.setAttribute('id', `todo${sorszam}`);
    todoElement.setAttribute('name', `todo${sorszam}`);
    let todoElementLabel = document.createElement('label');
    todoElementLabel.setAttribute('for', `todo${sorszam}`);
    todoElementLabel.innerHTML = inputText;
    todoList.appendChild(todoDiv);
    todoDiv.appendChild(todoElement);
    todoDiv.appendChild(todoElementLabel);
    redElement(todoDiv);
    todoDiv.addEventListener('mouseover', ev => ev.currentTarget.lastChild.className = ('appearRed'));
    todoDiv.addEventListener('mouseleave', ev => ev.currentTarget.lastChild.className = ('hide'));
    todoElement.addEventListener('click', checkBox);
    counter.textContent = number;    
}

const button = document.querySelector('button');
button.addEventListener('click', toDo);
clear.addEventListener('click', clearTodo);

const checkBox = (ev) => {
    if (ev.currentTarget.checked === true) {
        ev.currentTarget.parentElement.parentElement.removeChild(ev.currentTarget.parentElement);
        const todoDoneDiv = document.createElement('div');
        todoDoneDiv.className = ('todoDoneDiv');
        const todoElementDone = document.createElement('input');
        todoElementDone.setAttribute('type', 'checkbox');
        todoElementDone.setAttribute('id', `todoDone${sorszam}`);
        todoElementDone.setAttribute('name', `todoDone${sorszam}`);
        todoElementDone.checked = true;
        let todoElementLabelDone = document.createElement('label');
        todoElementLabelDone.setAttribute('for', `todo${sorszam}`);
        todoElementLabelDone.innerHTML = ev.currentTarget.parentElement.textContent;
        todoDoneList.appendChild(todoDoneDiv);
        todoDoneDiv.appendChild(todoElementDone);
        todoDoneDiv.appendChild(todoElementLabelDone);
        done += 1;
        percent = done/sorszam;
        number -= 1;
        counter.textContent = number;
        doneCounter.textContent = percent*100;
    }
}

const toDoStart = (i) => {
    number = localStorage.length;
    todoDiv = document.createElement('div');
    todoDiv.className = ('todoDiv');
    todoElement = document.createElement('input');
    todoElement.setAttribute('type', 'checkbox');
    todoElement.setAttribute('id', `todo${sorszam}`);
    todoElement.setAttribute('name', `todo${sorszam}`);
    let todoElementLabel = document.createElement('label');
    todoElementLabel.setAttribute('for', `todo${sorszam}`);    
    todoList.appendChild(todoDiv);
    todoDiv.appendChild(todoElement);
    todoDiv.appendChild(todoElementLabel);
    redElement(todoDiv);
    todoDiv.addEventListener('mouseover', ev => ev.currentTarget.lastChild.className = ('appearRed'));
    todoDiv.addEventListener('mouseleave', ev => ev.currentTarget.lastChild.className = ('hide'));
    todoElement.addEventListener('click', checkBox);
    todoElementLabel.textContent = localStorage.getItem(localStorage.key(i));
    counter.textContent = number;
    sorszam = number;
}

const start = () => {
    for (let i = 0; i < localStorage.length; i++) {
        toDoStart(i);        
    }
}
start();
