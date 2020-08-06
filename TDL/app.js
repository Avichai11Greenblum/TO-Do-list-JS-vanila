// Selectors
const input = document.querySelector('.todo-input');
const submitButton = document.querySelector('.todo-button');
const list = document.querySelector('.tdl-list');
const filter = document.querySelector('.menu-select');

// global elements
let check;

// Event listener
submitButton.addEventListener("click", addTodo);   // --> When submitting a new task 
list.addEventListener('click', btnPress);    // --> When pressing on a del/check button 
filter.addEventListener('click', filterTDL); // --> 
document.addEventListener('DOMContentLoaded', LocalToGUI);
// document.addEventListener("DOMContentLoaded", bringCompleted);

// Functions

// A function for adding a new task
function addTodo(Event) {
    // prevent from submitting(refreshing the web page)
    event.preventDefault();
    
    // missions div that contains the mission
    const mission = document.createElement('div');
    mission.classList.add('mission');

    // create a mission --> <li> element
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = input.value;
    
    mission.appendChild(newTodo); // adding to the div

    // Making a check button
    const checkButton = document.createElement('button');
    checkButton.classList.add('check-btn');
    checkButton.innerHTML = '<i class="far fa-check-square"></i>';
    mission.appendChild(checkButton); // adding to the div
    
    // Making a delete button
    const delButton = document.createElement('button');
    delButton.classList.add('delete-btn');
    delButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    mission.appendChild(delButton); // adding to the div

    // Append the mission div to tdl list
    list.appendChild(mission);

    // save the todo to local storage (the function at the end of the program)
    saveTodoToLocal(input.value);

    // After the user will add the new todo the input box will clear itself
    input.value = '';
}


// A function for button pressing
function btnPress(event) {
    const target = event.target;

    // del button --> i did it in two different if because if if the user press around the icon we need to parentElement twice and not once.

    // In case the user press on the trash icon
    if (target.classList.value === 'fas fa-trash-alt'){
        const parent = target.parentElement.parentElement;
        parent.classList.add('off');  // i give it a class for the css "off" element
        delFromLocal(parent);
        delFromCompleted(parent);
        setTimeout( () => {
            parent.remove();
        }, 600);
        
    } 
    // In case the user press around the trash icon but still on the del button
    else if (target.classList.value === 'delete-btn') {
        const parent = target.parentElement;
        parent.classList.add('off');  
        delFromLocal(parent);
        delFromCompleted(parent);
        setTimeout( () => {
            parent.remove();
        }, 600);
    }

    // check button --> Same as with the del button, there is no or in the if statement because of different ways of handling the icon and the area around it.

    // In case the user press on the check icon
    else if (target.classList.value === 'check-btn') {
        const parent = target.parentElement;

        saveCompleted(parent.innerText);

        if (parent.classList.contains('completed')){
            delFromCompleted(parent);
        }

        parent.classList.toggle('completed');
    }
    // In case the user press around the check icon
    else if (target.classList.value === "far fa-check-square") {
        const parent = target.parentElement.parentElement;
        
        saveCompleted(parent.innerText);

        if (parent.classList.contains('completed')){
            delFromCompleted(parent);
        }
        
        parent.classList.toggle('completed');
    }
}

// A function that will filter us the todos to all/completed/uncompleted
function filterTDL(event) {
    const todos = list.childNodes; 

    todos.forEach( (todo) => {

        switch (event.target.value) {

            case "all":
                todo.style.display = 'flex';
                break;

            case 'Completed-value':
                if (todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;

            case "Uncompleted-value":
                if (! todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}


// A check to see if i already have in the local storage previous tasks 
function saveTodoToLocal (todo) {
    let todos;
    
    if (localStorage.getItem('todos') === null) {
        // if we don't have any previous tasks we will create a new list that will contain the tasks
        todos = [];
    } else {
        // if we do have previous tasks we will use them as "todos"
        todos = JSON.parse(localStorage.getItem("todos"));    
    }
    
    // adding the new todo mission to the list
    todos.push(todo);

    // setting the new todos in th local storage
    localStorage.setItem("todos", JSON.stringify(todos));
}


// A function that will bring the tasks from local storage to GUI
function LocalToGUI () {
    // Again we will check if we have an existing list of tasks in the local storage or not
    let todos;
    
    if (localStorage.getItem('todos') === null) {
        // if we don't have any previous tasks we will create a new list that will contain the tasks
        todos = [];
    } else {
        // if we do have previous tasks we will use them as "todos"
        todos = JSON.parse(localStorage.getItem("todos"));    
    }

    // For each todo in the local storage we will create a GUI task almost the same way as 
    //we did in the addTodo function.
    todos.forEach(todo => {

        // missions div that contains the mission
        const mission = document.createElement('div');
        mission.classList.add('mission');

        // create a mission --> <li> element
        const newTodo = document.createElement('li');
        newTodo.classList.add('todo-item');
        newTodo.innerText = todo;
        
        mission.appendChild(newTodo); // adding to the div

        // Making a check button
        const checkButton = document.createElement('button');
        checkButton.classList.add('check-btn');
        checkButton.innerHTML = '<i class="far fa-check-square"></i>';
        mission.appendChild(checkButton); // adding to the div
        
        // Making a delete button
        const delButton = document.createElement('button');
        delButton.classList.add('delete-btn');
        delButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        mission.appendChild(delButton); // adding to the div

        checkForDone(todo);
        if (check) {
            mission.classList.toggle('completed');
        }
        check = null;

        // Append the mission div to tdl list
        list.appendChild(mission);
    });
}

// A function that will delete the the task from local storage when we delete it with the GUI system.
function delFromLocal(todo) {

    // Again we will check if we have an existing list of tasks in the local storage or not
    let todos;

    if (localStorage.getItem('todos') === null) {
        // if we don't have any previous tasks we will create a new list that will contain the tasks
        todos = [];
    } else {
        // if we do have previous tasks we will use them as "todos"
        todos = JSON.parse(localStorage.getItem("todos"));    
    }

    const todoText = todo.children[0].innerText; 
    todos.splice(todos.indexOf(todoText), 1);
    localStorage.setItem("todos",JSON.stringify(todos));
    
}

// A function that will add the tasks we complete to the tasksDone local list 
function saveCompleted(finishedTask) {
    let tasksDone;
    
    if (localStorage.getItem('tasksDone') === null) {
        // if we don't have any previous tasks that we completed we will create a new list that will contain the tasks we did
        tasksDone = [];
    } else {
        // if we do have previous tasks we did we will use them as "tasksDone"
        tasksDone = JSON.parse(localStorage.getItem("tasksDone"));    
    }
    
    // adding the new todo mission to the list (if we re-check it wont add it again)
    if (!tasksDone.includes(finishedTask)){
        tasksDone.push(finishedTask);
    }
    
    // setting the new todos in th local storage
    localStorage.setItem("tasksDone", JSON.stringify(tasksDone));
}

function delFromCompleted(todo) {
    let tasksDone;

    if (localStorage.getItem('tasksDone') === null) {
        // if we don't have any previous tasks that we completed we will create a new list that will contain the tasks we did
        tasksDone = [];
    } else {
        // if we do have previous tasks we did we will use them as "tasksDone"
        tasksDone = JSON.parse(localStorage.getItem("tasksDone"));    
    }

    const completedText = todo.children[0].innerText; 
    tasksDone.splice(tasksDone.indexOf(completedText), 1);
    localStorage.setItem("tasksDone",JSON.stringify(tasksDone));
}


                            //        needs to be fixed

// A function that when we refresh/get to the page will mark for us the checked tasks !-----> AT THE MOMENT IT WORKS ONLY FOR ONE TASK 
function checkForDone(todo) {
    let tasksDone;

    if (localStorage.getItem('tasksDone') === null) {
        // if we don't have any previous tasks that we completed we will create a new list that will contain the tasks we did
        tasksDone = [];  

    } else {
        // if we do have previous tasks we did we will use them as "tasksDone"
        tasksDone = JSON.parse(localStorage.getItem("tasksDone"));    
    }

    tasksDone.forEach(task => {
       if (todo === task){
            check = true;
       } else {
            check = false;
       }

        // console.log(task);
        // console.log(todo);
    });
}
