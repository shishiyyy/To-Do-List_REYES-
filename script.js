let tasks = [
{ name: "Reply to emails", hours: 1, done: false },
{ name: "Fix login bug", hours: 4, done: false },
{ name: "Build reports page", hours: 6, done: false },
{ name: "Plan sprint", hours: 2, done: true }
];

let currentFilter = "all";

function addTask() {

let name = document.getElementById("taskInput").value;
let hours = Number(document.getElementById("hoursInput").value);

if (name.trim() === "") {
alert("Please enter a task!");
return;
}

if (hours < 0 || !Number.isFinite(hours)) {
alert("Please enter valid hours!");
return;
}

tasks.push({
name: name.trim(),
hours: hours,
done: false
});

document.getElementById("taskInput").value = "";
document.getElementById("hoursInput").value = "0";

displayTasks();
}

function displayTasks() {

let list = document.getElementById("taskList");

list.innerHTML = "";

let totalHours = 0;
let remaining = 0;

tasks.forEach(function(task, index) {

if (!task.done) {
remaining++;
totalHours += task.hours;
}

if (currentFilter === "active" && task.done) return;
if (currentFilter === "completed" && !task.done) return;

let difficulty = "Easy";
let className = "";

if (task.hours > 5) {
difficulty = "Hard";
className = "hard";
} else if (task.hours > 2) {
difficulty = "Medium";
className = "medium";
}

let row = document.createElement("div");

row.className = "task";

if (task.done) {
row.classList.add("completed");
}

let checkbox = document.createElement("input");

checkbox.type = "checkbox";
checkbox.checked = task.done;

checkbox.onchange = function() {
toggleTask(index);
};

let taskName = document.createElement("span");

taskName.className = "task-name";
taskName.textContent = task.name;

taskName.ondblclick = function() {
editTask(index);
};

let label = document.createElement("span");

label.className = "difficulty " + className;
label.textContent = difficulty + " · " + task.hours + "h";

label.ondblclick = function() {
editHours(index);
};

let deleteButton = document.createElement("button");

deleteButton.className = "delete-btn";
deleteButton.textContent = "×";

deleteButton.onclick = function() {
deleteTask(index);
};

row.appendChild(checkbox);
row.appendChild(taskName);
row.appendChild(label);
row.appendChild(deleteButton);

list.appendChild(row);

});

document.getElementById("taskCount").textContent =
remaining + " items left · " + totalHours + " hours total";
}

function toggleTask(index) {

tasks[index].done = !tasks[index].done;

displayTasks();
}

function deleteTask(index) {

tasks.splice(index, 1);

displayTasks();
}

function filterTasks(filter, button) {

currentFilter = filter;

document.querySelectorAll(".filter-btn").forEach(function(btn) {
btn.classList.remove("active");
});

button.classList.add("active");

displayTasks();
}

function markAllDone() {

tasks.forEach(function(task) {
task.done = true;
});

displayTasks();
}

function clearCompleted() {

tasks = tasks.filter(function(task) {
return !task.done;
});

displayTasks();
}

function editTask(index) {

let newName = prompt("Edit task:", tasks[index].name);

if (newName !== null && newName.trim() !== "") {
tasks[index].name = newName.trim();
displayTasks();
}
}

function editHours(index) {

let newHours = prompt("Edit estimated hours:", tasks[index].hours);

if (newHours !== null && newHours.trim() !== "") {

let hours = Number(newHours);

if (Number.isFinite(hours) && hours >= 0) {
tasks[index].hours = hours;
displayTasks();
} else {
alert("Please enter valid hours!");
}
}
}

document.getElementById("taskInput").addEventListener("keydown", function(event) {
if (event.key === "Enter") {
addTask();
}
});

displayTasks();