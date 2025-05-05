let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let pendingTasks = JSON.parse(localStorage.getItem('pendingTasks')) || [];
let completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

document.getElementById('addTaskBtn').addEventListener('click', addTask);

window.onload = function() {
    renderTasks();
};

function addTask() {
    const taskName = document.getElementById('taskName').value;
    const taskDesc = document.getElementById('taskDesc').value;

    if (taskName && taskDesc) {
        const newTask = {
            name: taskName,
            description: taskDesc,
            status: 'Pending',
            creationTime: new Date().toLocaleString(),
            completionTime: ''
        };

        tasks.push(newTask);
        pendingTasks.push(newTask);

        document.getElementById('taskName').value = '';
        document.getElementById('taskDesc').value = '';

        saveToLocalStorage();
        renderTasks();
    }
}

function renderTasks() {
    renderAllTasks();
    renderPendingTasks();
    renderCompletedTasks();
}

function renderAllTasks() {
    const tableBody = document.querySelector("#allTasksTable tbody");
    tableBody.innerHTML = '';

    const allTasks = [...pendingTasks, ...completedTasks];
    allTasks.forEach((task, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.name}</td>
            <td>${task.description}</td>
            <td>${task.status}</td>
            <td>${task.creationTime}</td>
            <td>${task.completionTime || 'Not Completed'}</td>
            <td>
                ${task.status === 'Pending' ? `
                    <button onclick="completeTask(${index})">Complete</button>
                    <button onclick="editTask(${index})">Edit</button>
                ` : ''}
                <button onclick="deleteTask(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function renderPendingTasks() {
    const tableBody = document.querySelector("#pendingTasksTable tbody");
    tableBody.innerHTML = '';

    pendingTasks.forEach((task, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.name}</td>
            <td>${task.description}</td>
            <td>${task.status}</td>
            <td>${task.creationTime}</td>
            <td>${task.completionTime || 'Not Completed'}</td>
            <td>
                <button onclick="completeTask(${index})">Complete</button>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function renderCompletedTasks() {
    const tableBody = document.querySelector("#completedTasksTable tbody");
    tableBody.innerHTML = '';

    completedTasks.forEach((task, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.name}</td>
            <td>${task.description}</td>
            <td>${task.status}</td>
            <td>${task.creationTime}</td>
            <td>${task.completionTime || 'Not Completed'}</td>
            <td>
                <button onclick="deleteTask(${index}, 'completed')">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function completeTask(index) {
    const task = pendingTasks.splice(index, 1)[0];
    task.status = 'Completed';
    task.completionTime = new Date().toLocaleString();
    completedTasks.push(task);

    saveToLocalStorage();
    renderTasks();
}

function editTask(index) {
    const task = tasks[index];
    const newName = prompt("Edit Task Name:", task.name);
    const newDesc = prompt("Edit Task Description:", task.description);

    if (newName && newDesc) {
        task.name = newName;
        task.description = newDesc;

        saveToLocalStorage();
        renderTasks();
    }
}

function deleteTask(index, list = 'all') {
    if (list === 'all') {
        const task = tasks[index];
        tasks = tasks.filter((_, i) => i !== index);
        pendingTasks = pendingTasks.filter((_, i) => i !== index);
        completedTasks = completedTasks.filter((_, i) => i !== index);
    } else if (list === 'completed') {
        completedTasks.splice(index, 1);
    }

    saveToLocalStorage();
    renderTasks();
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('pendingTasks', JSON.stringify(pendingTasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
}
