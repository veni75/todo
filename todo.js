'use strict';

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
let todoElement, todoWhite, todoRed;
let inputText;
let number = 0;
let sorszam = 0;

const todoData = {};

const clearTodo = () => {
    todoList.removeChild(todoElement);
    localStorage.clear();
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

const appearDone = (ev) => {
    ev.currentTarget.className = ('whitedone');
}

const done = (elem) => {
    elem.addEventListener('click', appearDone);
}

const whiteElement = (element) => {
    todoWhite = document.createElement('div');
    element.appendChild(todoWhite);
    todoWhite.className = ('white');    
}

const redElement = (element) => {
    todoRed = document.createElement('div');
    element.appendChild(todoRed);
    todoRed.className = ('red');
    todoRed.addEventListener('click', deleteTodo);
}

const toDo = () => {
    inputText = input.value;
    number += 1;
    sorszam += 1;
    localStorage.setItem(`todo${sorszam}`, inputText);
    input.value = '';

    const todoDiv = document.createElement('div');
    todoDiv.className = ('todoDiv');
    todoElement = document.createElement('input');
    todoElement.setAttribute('type','checkbox');
    todoElement.setAttribute('id',`todo${sorszam}`);
    todoElement.setAttribute('name',`todo${sorszam}`);
    let todoElementLabel = document.createElement('label');
    todoElementLabel.setAttribute('for',`todo${sorszam}`);
    todoElementLabel.innerHTML = inputText;
    todoList.appendChild(todoDiv);
    todoDiv.appendChild(todoElement);
    todoDiv.appendChild(todoElementLabel);
    
          
    redElement(todoDiv);  
    console.log(todoDiv);  
    todoDiv.addEventListener('mouseover', ev=>ev.currentTarget.lastChild.className =('block'));
    //todoDiv.addEventListener('mouseleave', ev=>ev.currentTarget.classList.remove('block'));
    counter.textContent = number;
    //done(todoWhite);
    todoData[sorszam] = [inputText, true];
}

const button = document.querySelector('button');
button.addEventListener('click', toDo);
clear.addEventListener('click', clearTodo);
