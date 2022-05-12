// Define UI Variables
const form = document.querySelector("#task-form")
const taskList = document.querySelector(".collection")
const clearBtn = document.querySelector(".clear-task")
const filter = document.querySelector("#filter")
const taskInput = document.querySelector("#task")

// Load event listeners
loadEventListeners()

function loadEventListeners() {
  //add task event
  form.addEventListener("submit", addtask)
}

//Add task to list
function addtask(e) {
  if (taskInput.value === "") {
    alert("Add a task")
  }

  e.preventDefault()
}
