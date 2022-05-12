// Define UI Variables
const form = document.querySelector("#task-form")
const taskList = document.querySelector(".collection")
const clearBtn = document.querySelector(".clear-task")
const filter = document.querySelector("#filter")
const taskInput = document.querySelector("#task")

// Load event listeners
loadEventListeners()

function loadEventListeners() {
  //DOM load event
  document.addEventListener("DOMContentLoaded", getTasks)
  //add task event
  form.addEventListener("submit", addtask)
  //remove task event
  taskList.addEventListener("click", removeTask)
  //clear all tasks event
  clearBtn.addEventListener("click", removeAllTask)
  //filter task
  filter.addEventListener("keyup", filterTasks)
}

//Get tasks from loca storage
function getTasks() {
  let tasks
  if (localStorage.getItem("tasks") === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"))
  }

  tasks.forEach(function (task) {
    //create li element
    const li = document.createElement("li")
    //add class
    li.className = "collection-item"
    // create textnode and append to li
    li.appendChild(document.createTextNode(task))
    // create link element
    const link = document.createElement("a")
    //add class
    link.className = "delete-item secondary-content"
    //add icon
    link.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    //append link to li
    li.appendChild(link)

    //append li to ul
    taskList.appendChild(li)
  })
}

//Add task to list
function addtask(e) {
  if (taskInput.value === "") {
    alert("Add a task")
  }

  //create li element
  const li = document.createElement("li")
  //add class
  li.className = "collection-item"
  // create textnode and append to li
  li.appendChild(document.createTextNode(taskInput.value))
  // create link element
  const link = document.createElement("a")
  //add class
  link.className = "delete-item secondary-content"
  //add icon
  link.innerHTML = '<i class="fa-solid fa-xmark"></i>'
  //append link to li
  li.appendChild(link)

  //append li to ul
  taskList.appendChild(li)

  // store to local storage
  storeTaskInLocalStorage(taskInput.value)

  //clear input
  taskInput.value = ""

  e.preventDefault()
}

//storing task

function storeTaskInLocalStorage(task) {
  let tasks
  if (localStorage.getItem("tasks") === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"))
  }

  tasks.push(task)

  localStorage.setItem("tasks", JSON.stringify(tasks))
}

// Remove task from list
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove()
      //remove from local storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement)
    }
    // console.log(e.target)
  }
}

//remove from local storage function
function removeTaskFromLocalStorage(taskItem) {
  let tasks
  if (localStorage.getItem("tasks") === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"))
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1)
    }
  })

  localStorage.setItem("tasks", JSON.stringify(tasks))
}

//remove all task with clear task button
function removeAllTask() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild)
  }

  clearTasksFromLocalStorage()
}

//clear all tasks from localStorage
function clearTasksFromLocalStorage() {
  localStorage.clear()
}

//Filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase()

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block"
    } else {
      task.style.display = "none"
    }
  })
}
