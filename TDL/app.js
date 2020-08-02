// Selectors
const input = document.querySelector('.todo-input');
const button = document.querySelector('.todo-button');
const list = document.querySelector('.tdl-list');
const filter = document.querySelector('.menu-select');

// Event listener
button.addEventListener("click", addTodo);
list.addEventListener('click', btnPress);
filter.addEventListener('click', filterTDL);

// Functions
function addTodo(Event) {
    // prevent from submitting
    event.preventDefault();
    
    // missions div that contains the mission
    const mission = document.createElement('div');
    mission.classList.add('mission');

    // create a mission
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


    // del button

    // In case the user press on the trash icon
    if (target.classList.value === 'fas fa-trash-alt'){
        const parent = target.parentElement.parentElement;
        parent.classList.add('off');
        setTimeout( () => {
            parent.remove();
        }, 600);
        
    } 
    // In case the user press around the trash icon but still on the del button
    else if (target.classList.value === 'delete-btn') {
        const parent = target.parentElement;
        parent.classList.add('off'); // i give it a class for the css off element 
        setTimeout( () => {
            parent.remove();
        }, 600);
    }


    // check button

    // In case the user press on the check icon
    else if (target.classList.value === 'check-btn') {
        const parent = target.parentElement;
        parent.classList.toggle('completed');
    }
    // In case the user press around the check icon
    else if (target.classList.value === "far fa-check-square") {
        const parent = target.parentElement.parentElement;
        parent.classList.toggle('completed');
    }
}

// A function that will filter us the todos to all/completed/uncompleted
function filterTDL(event) {
    const todos = list.childNodes; 

    // console.log(todos);   // a check for the structure of the nodes
    // console.log(`the target value is ${event.target.value}`);  // a check for the given target value

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

function saveTodoToLocal (todo) {
    // A check to see if i already have in the local storage previous tasks 
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
