const todoForm = document.querySelector('#todoForm');
const todoInput = document.querySelector('.new-todo');
const todoList = document.querySelector('.todo-list');

function createTodoElement(todoText) {
    todoList.innerHTML += `<li>
        <div class="view">
        <input class="toggle" type="checkbox">
        <label class="todoLabel">${todoText}</label>
        <button class="destroy"></button>
        </div>
        <input class="edit" value="${todoText}">
    </li>`;

    bindClicks();
}

function addTodo(event) {
    event.preventDefault();

    if (todoInput.value === '') {
        alert('Boş bırakılamaz.');
        return;
    }

    createTodoElement(todoInput.value);

    saveTodoToLocalStorage(todoInput.value);

    todoInput.value = '';
}


todoForm.addEventListener('submit', addTodo);

for (const filter of document.querySelectorAll('.filters input')) {
    filter.addEventListener('click', function(){
        // todoList.dataset.filter = this.value;

        todoList.classList.value = 'todo-list ' + this.value;
    });
}

function markTodo() {
    this.parentElement.parentElement.classList.toggle('completed');
}

function removeTodo() {
    this.parentElement.parentElement.remove();
}

function showTodoEdit() {
    this.parentElement.classList.add('editing');

    const currValue = this.nextElementSibling.value;
    this.nextElementSibling.value = '';
    this.nextElementSibling.value = currValue;
    this.nextElementSibling.focus();
}

function showTodoEdit2(element) {
    element.parentElement.parentElement.classList.add('editing');

    
}

function editTodo(e) {
    if(e.key === 'Enter') {
        this.previousElementSibling.querySelector('label').innerText = this.value;
        this.parentElement.classList.remove('editing');
    }
}

// 1- yeni eleman eklendiginde eventleri baglamak -- en mantiksiz olan bu
// 2- delegate etmek -- her kosulda calisir
// 3- create element ile olusturmak -- bunun saglikli calismasi icin mutlaka bir data havuzuna baglanmasi lazim

// event delegation
// todoList.addEventListener('click', delegateClick);
// function delegateClick(e) {
//     const targetEl = e.target;

//     if(targetEl.classList.contains('destroy')) {
//         removeTodo(targetEl);
//     }

//     if(targetEl.classList.contains('toggle')) {
//         markTodo(targetEl);
//     }
// }

todoList.addEventListener('dblclick', delegateDblClick);
function delegateDblClick(e) {
    const targetEl = e.target;

    if(targetEl.classList.contains('todoLabel')) {
        showTodoEdit2(targetEl);
    }
}

// bind --> baglamak
function bindClicks() {
    for (const btn of document.querySelectorAll('.destroy')) {
        btn.addEventListener('click', removeTodo);
    }

    for (const btn of document.querySelectorAll('.toggle')) {
        btn.addEventListener('click', markTodo);
    }

    //document.querySelectorAll('.view').forEach(x => x.addEventListener('dblclick', showTodoEdit));

    document.querySelectorAll('.edit').forEach(x => x.addEventListener('keydown', editTodo));

}

// dblclick
// keydown


// Local Storage a kaydet
function saveTodoToLocalStorage(todo) {
    let todos = [];
    
    if (localStorage.getItem('todos')) {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);

    localStorage.setItem('todos', JSON.stringify(todos));
}


window.addEventListener('load', function () {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));

    if (savedTodos) {
        for (const savedTodo of savedTodos) {
            createTodoElement(savedTodo);
        }
    }
});



