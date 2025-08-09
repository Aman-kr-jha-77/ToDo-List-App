
// Save tasks and title to localStorage
function saveTasks() {
    const TITLE = [];
    TITLE.push({ titleText: document.querySelector('.input-title').value });
    localStorage.setItem('TITLE', JSON.stringify(TITLE));
    console.log(TITLE);

    const tasks = [];
    document.querySelectorAll('.task-list input').forEach(task => {
        tasks.push({ text: task.value, completed: task.classList.contains('completed') });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log(tasks);
}

// Load tasks and title from localStorage on page load
document.addEventListener('DOMContentLoaded', function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const savedTitle = JSON.parse(localStorage.getItem('TITLE')) || [];
    console.log(savedTasks);
    console.log(savedTitle);

    savedTitle.forEach(T => {
        document.querySelector('.input-title').value = T.titleText;
    });

    savedTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-list';

        const input = document.createElement('input');
        input.value = task.text;

        if (task.completed) {
            input.classList.add('completed');
        }

        li.addEventListener('click', () => {
            input.classList.toggle('completed');
            saveTasks();
        });

        const btn = document.createElement('button');
        btn.className = 'addtaskbutton';
        btn.textContent = 'Delete';
        li.appendChild(input);
        li.appendChild(btn);
        document.querySelector('.tasker').appendChild(li);

        btn.addEventListener('click', () => {
            li.remove();
            saveTasks();
        });

        // Deleting and completing Alltask
        document.querySelector('.addtaskBoxbutton').addEventListener('click', () => {
            const title = document.querySelector('.input-title').value = ''
           
          
            li.remove()
            saveTasks();
        })


        saveTasks();
    });
});

// Function to add a new task
function taskAdder() {
    const task = document.getElementById('input').value.trim();
    if (task) {
        const li = document.createElement('li');
        li.className = 'task-list';

        const input = document.createElement('input');
        input.value = task;

        li.addEventListener('click', () => {
            input.classList.toggle('completed');
            saveTasks();
            // console.log(task.split('\n'));
            
        });

        const btn = document.createElement('button');
        btn.className = 'addtaskbutton';
        btn.textContent = 'Delete';
        li.appendChild(input);
        li.appendChild(btn);
        document.querySelector('.tasker').appendChild(li);

        btn.addEventListener('click', () => {
            li.remove();
            saveTasks();
        });

        saveTasks();
        document.getElementById('input').value = "";



    }
}

// Event listeners for task addition
document.querySelector('.addtaskbutton').addEventListener('click', taskAdder);
document.getElementById('input').addEventListener('keydown', function EnterPressed(e) {
    if (e.key === 'Enter') {
        taskAdder();
    }
});

// Deleting all tasks
document.querySelector('.addtaskBoxbutton').addEventListener('click', () => {

    document.querySelector('.input-title').value = '';

    document.querySelectorAll('.task-list').forEach(li => li.remove());

    
    saveTasks();
});


// Enable navigation between input fields using Enter
const inputFields = document.querySelectorAll('input');
inputFields.forEach((field, index) => {
    field.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && index < inputFields.length - 1) {
            e.preventDefault();
            inputFields[index + 1].focus();
        }
    });
});

