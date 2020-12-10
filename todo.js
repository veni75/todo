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
    let i = todoList.childNodes.length;
    while (i > 0) {
        todoList.removeChild(todoList.childNodes[i - 1]);
        i -= 1;
    }
    localStorage.clear();
    numberSet(0);    
    sorszam = 0;    
}

/* const numberSet1 = {
    0: ()=>number =0,
    1: ()=>number +=1,
    2: ()=>number -=1,
} */

const numberSet = (value) => {
    if (value === 1) {
        number += 1;
    } else if (value === -1) {
        number -= 1;
    } else if (value === 0) {
        number = 0;
    }
    counter.textContent = number;
}

const deleteTodo = (ev) => {
    const elem = ev.currentTarget;
    const todoDiv = elem.parentElement;
    const todoId = todoDiv.className.split(' ').pop();
    todoDiv.parentElement.removeChild(todoDiv);
    localStorage.removeItem(`todo${todoId}`);
    numberSet(-1);
}

const redElement = (element) => {
    todoRed = document.createElement('div');
    element.appendChild(todoRed);
    todoRed.className = ('hide');
    const redIcon = document.createElement('i');
    todoRed.appendChild(redIcon);
    redIcon.className = ('fa fa-bitbucket');
    todoRed.addEventListener('click', deleteTodo);
}

const toDo = () => {
    inputText = input.value;
    numberSet(1);
    sorszam += 1;
    localStorage.setItem(`todo${sorszam}`, inputText);
    input.value = '';
    todoDiv = document.createElement('div');
    todoDiv.className = (`todoDiv todo${sorszam}`);
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
        percent = done / sorszam;
        numberSet(-1);        
        doneCounter.textContent = (percent * 100).toPrecision(3);
    }
}

const toDoStart = (i) => {
    todoDiv = document.createElement('div');
    todoDiv.className = (`todoDiv todo${i}`);
    todoElement = document.createElement('input');
    todoElement.setAttribute('type', 'checkbox');
    todoElement.setAttribute('id', `todo${i}`);
    todoElement.setAttribute('name', `todo${i}`);
    let todoElementLabel = document.createElement('label');
    todoElementLabel.setAttribute('for', `todo${i}`);
    todoList.appendChild(todoDiv);
    todoDiv.appendChild(todoElement);
    todoDiv.appendChild(todoElementLabel);
    redElement(todoDiv);
    todoDiv.addEventListener('mouseover', ev => ev.currentTarget.lastChild.className = ('appearRed'));
    todoDiv.addEventListener('mouseleave', ev => ev.currentTarget.lastChild.className = ('hide'));
    todoElement.addEventListener('click', checkBox);
    todoElementLabel.textContent = localStorage.getItem(localStorage.key(i));
}

const start = () => {
    for (let i = 0; i < localStorage.length; i++) {
        toDoStart(i);
    }
    number = localStorage.length;
    counter.textContent = number;
    sorszam = number;
}
start();
