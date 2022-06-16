// selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// event listeners
document.addEventListener('DOMContentLoaded', loadTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);

// functions
function addTodo(event) {
  // prevent form from submit
  event.preventDefault();

  if (!todoInput.value) {
    return;
  }

  // create div.todo
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  // create li
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  // save to LocaleStorage
  saveLocalTodos(todoInput.value);

  // check mark button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);

  // check mark button
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add('trash-btn');
  todoDiv.appendChild(trashButton);

  // add to todo list
  todoList.appendChild(todoDiv);

  //clear input value
  todoInput.value = '';
  todoInput.focus();
}

function deleteCheck(event) {
  const item = event.target;
  //DELETE TOTO
  if (item.classList[0] === 'trash-btn') {
    const todo = item.parentElement;
    removeLocalTodos(todo.querySelector('.todo-item').innerText);
    //animation
    todo.classList.add('fall');
    todo.addEventListener('transitionend', function() {
      todo.remove();
    });

  }

  // CHECK MARK
  if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo) {
    switch(e.target.value) {
      case 'all': 
        todo.style.display = 'flex';
        break;
      case 'completed':
        todo.style.display = todo.classList.contains('completed') ? 'flex' : 'none';        
        break;
      case 'uncompleted':
        todo.style.display = !todo.classList.contains('completed') ? 'flex' : 'none';        
        break;
    }
  });
}

function getTodos() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  return todos;
}

function saveLocalTodos(todo) {
  let todos = getTodos();
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
  let todos = getTodos();
  todos.forEach(function(todo) {
    // create div.todo
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    // check mark button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    // add to todo list
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos = getTodos();
  let todoIndex = todos.indexOf(todo);
  if (todoIndex !== undefined) {
    todos.splice(todoIndex, 1);
  }
  localStorage.setItem('todos', JSON.stringify(todos));


  // let filteredTodos = todos.filter(function (value) {
  //   return value !== todo;
  // });
  // localStorage.setItem('todos', JSON.stringify(filteredTodos));
}