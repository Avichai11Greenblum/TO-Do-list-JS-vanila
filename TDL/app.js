// Selectors
const input = document.querySelector('.todo-input');
const button = document.querySelector('.todo-button');
const list = document.querySelector('.tdl-list');

// Event listener
button.addEventListener("click", addTodo);
list.addEventListener('click', btnPress);

// Functions
function addTodo(Event) {
    // prevent from submitting
    event.preventDefault();
    
    // missions div that contains the mission
    const missions = document.createElement('div');
    missions.classList.add('missions');

    // create a mission
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = input.value;
    input.value = '';
    missions.appendChild(newTodo); // adding to the div

    // Making a check button
    const checkButton = document.createElement('button');
    checkButton.classList.add('check-btn');
    checkButton.innerHTML = '<i class="far fa-check-square"></i>';
    missions.appendChild(checkButton); // adding to the div
    
    // Making a delete button
    const delButton = document.createElement('button');
    delButton.classList.add('delete-btn');
    delButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    missions.appendChild(delButton); // adding to the div

    // Append the mission div to tdl list
    list.appendChild(missions);
}

function btnPress(event) {
    const target = event.target;

    // del button
    if (target.classList.value === 'fas fa-trash-alt'){
        const parent = target.parentElement.parentElement;
        parent.classList.add('off');
        setTimeout( () => {
            parent.remove();
        }, 600);
        })
    } 
    else if (target.classList.value === 'delete-btn') {
        const parent = target.parentElement;
        parent.classList.add('off');
        setTimeout( () => {
            parent.remove();
        }, 600);
    }


    // check button
    else if (target.classList.value === 'check-btn') {
        const parent = target.parentElement;
        parent.classList.toggle('completed');
    }
    else if (target.classList.value === "far fa-check-square") {
        const parent = target.parentElement.parentElement;
        parent.classList.toggle('completed');
    }
    
}
