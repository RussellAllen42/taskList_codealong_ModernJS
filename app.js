// Definr UI Vars

const form = document.querySelector("#task-form");
const tasklist = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// load all event listeners
loadEventListeners();

function loadEventListeners() {
  //DOM Load Event
  document.addEventListener("DOMContentLoaded", getTasks);
  //add task event
  form.addEventListener("submit", addTask);
  //remove task event
  tasklist.addEventListener("click", removeTask);
  //clear task events
  clearBtn.addEventListener("click", clearTasks);
  // Filter tasks events
  filter.addEventListener("keyup", filterTasks);
}
//Get Tasks from LS
function getTasks() {
  //define variable
  let tasks;
  //check local storage if there is any tasks in storage
  if (localStorage.getItem("tasks") === null) {
    //if there is 'null' in tasks then set 'tasks' to an empty array
    tasks = [];
  } else {
    //otherwise if there is something inside the local storage
    // set 'tasks' to what is in local storage and as local storage is stored in string we need to parse it using JSON.
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function(task) {
    //create li element
    const li = document.createElement("li");
    // add class
    li.className = "collection-item";
    //create text node and append to the li
    li.appendChild(document.createTextNode(task));
    //create new link element
    const link = document.createElement("a");
    //add class
    link.className = "delete-item secondary-content";
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></li>';
    //Append the link to the li
    li.appendChild(link);
    //appen li to the ul
    tasklist.appendChild(li);
  });
}

// add task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a Task");
  }
  //create li element
  const li = document.createElement("li");
  // add class
  li.className = "collection-item";
  //create text node and append to the li
  li.appendChild(document.createTextNode(taskInput.value));
  //create new link element
  const link = document.createElement("a");
  //add class
  link.className = "delete-item secondary-content";
  // add icon html
  link.innerHTML = '<i class="fa fa-remove"></li>';
  //Append the link to the li
  li.appendChild(link);
  //appen li to the ul
  tasklist.appendChild(li);
  //Store tasks in local storage
  storeTaskInLocalStorage(taskInput.value);

  //clear the input
  taskInput.value = "";

  e.preventDefault();
}

//store task
function storeTaskInLocalStorage(task) {
  //define variable
  let tasks;
  //check local storage if there is any tasks in storage
  if (localStorage.getItem("tasks") === null) {
    //if there is 'null' in tasks then set 'tasks' to an empty array
    tasks = [];
  } else {
    //otherwise if there is something inside the local storage
    // set 'tasks' to what is in local storage and as local storage is stored in string we need to parse it using JSON.
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  // push on the task variable to the tasks array
  tasks.push(task);
  //then set 'tasks' back to local storage and it has to be stored as a string so to do that we need to use JSON.stringify.
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Remove Task
function removeTask(e) {
  //if the parent element of the target that contains the class of "delete-item"...then
  if (e.target.parentElement.classList.contains("delete-item")) {
    //remove the parent of the parent of the target
    e.target.parentElement.parentElement.remove();
    //Remove from local Storage
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
}
// Clear tasks
function clearTasks() {
  //while there is a firstChild of the taskList do---
  while (tasklist.firstChild) {
    //remove the firstChild (until there is none left)
    tasklist.removeChild(tasklist.firstChild);
  }
  clearTasksFromLocalStorage();
}
//clear tasks from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

//Remove from Local Storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
