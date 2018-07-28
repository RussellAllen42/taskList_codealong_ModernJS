// Definr UI Vars

const form = document.querySelector("#task-form");
const tasklist = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// load all event listeners
loadEventListeners();

function loadEventListeners() {
  //add task event
  form.addEventListener("submit", addTask);
  //remove task event
  tasklist.addEventListener("click", removeTask);
  //clear task events
  clearBtn.addEventListener("click", clearTasks);
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

  //clear the input
  taskInput.value = "";

  e.preventDefault();
}

//Remove Task
function removeTask(e) {
  //if the parent element of the target that contains the class of "delete-item"...then
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure")) {
      //remove the parent of the parent of the target
      e.target.parentElement.parentElement.remove();
    }
  }
}
// Clear tasks
function clearTasks() {
  //while there is a firstChild of the taskList do---
  while (tasklist.firstChild) {
    //remove the firstChild (until there is none left)
    tasklist.removeChild(tasklist.firstChild);
  }
}
