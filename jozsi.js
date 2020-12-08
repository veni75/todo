'use strict';
​
const date = document.querySelector('.date');
const day = document.querySelector('.day');
const now = new Date();
let options = { weekday: 'long' };
day.textContent = new Intl.DateTimeFormat('en-GB', options).format(now);
date.textContent = new Intl.DateTimeFormat('en-GB').format(now);
const todoList = document.querySelector('.todoList');
const clear = document.querySelector('.clear');
const input = document.querySelector('input');
const counter = document.querySelector('.counter');
let todoElement, todoRed, todoWhite;
let todoElementArray = [];
let todoRedArray = [];
let inputText;
let number = 0;
let sorszam = 0;
​
const todoData = {};
​
const clearTodo = () => {
    todoList.removeChild(todoElement);
    localStorage.clear();
    number = 0;
    counter.textContent = number;
}
​
const del = (ev) => {
    const elem = ev.currentTarget;
    const todoElement = elem.parentElement;
    const todoId = todoElement.className.split(' ').pop();
    todoElement.parentElement.removeChild(todoElement);
    localStorage.removeItem(`todo${todoId}`);    
    number -= 1;
    counter.textContent = number;
}
​
const appearDone = (element) => {
    element.className = ('whitedone');
}
​
const done = (elem) => {
    elem.addEventListener('click', () => appearDone());
}
​
const toDo = () => {
    inputText = input.value;
    number += 1;
    sorszam += 1;
    localStorage.setItem(`todo${sorszam}`, inputText);
    input.value = '';
    todoElement = document.createElement('div');
    todoList.appendChild(todoElement);
    todoElement.className = (`todoElement ${sorszam}`);
    todoWhite = document.createElement('div');
    todoElement.appendChild(todoWhite);
    todoWhite.className = (`white ${sorszam}`);
    todoElement.textContent = inputText;
    todoElementArray.push(todoElement);
​
    redElement(todoElement);
    todoElement.addEventListener(
        'mouseover', 
        ev => ev.currentTarget.classList.add('hovered') 
    );
    todoElement.addEventListener(
        'mouseleave', 
        ev => ev.currentTarget.classList.remove('hovered') 
    );
​
    counter.textContent = number;
​
    // done(todoWhite);
    todoData[sorszam] = [inputText, true];
}
​
const redElement = (elem) => {
    todoRed = document.createElement('div');
    elem.appendChild(todoRed);
    todoRed.className = (`block ${sorszam}`);
    todoRedArray.push(todoRed);
    todoRed.addEventListener('click', del);
}
​
const button = document.querySelector('button');
button.addEventListener('click', toDo);
clear.addEventListener('click', clearTodo);