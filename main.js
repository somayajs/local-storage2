const form = document.querySelector(".main");
const input = document.querySelector("#task");
const addBtn = document.querySelector(".btn-add");
const container = document.querySelector(".container");

  // localStorage.clear()
// a function that takes a taskname (an object) as an arrgument and create a dom div node and a a dom button node corresponding to that taskName
function displayTask (taskName) {
  let show = document.createElement("div");
  let deleteBtn = document.createElement("button");

  show.classList.add("task");
  deleteBtn.classList.add("btn-delete");

  show.textContent = taskName["title"];
  deleteBtn.textContent = "Delete";

  show.append(deleteBtn);
  container.append(show);

  show.style.cssText = "background-color: #fff; padding: 10px; margin: 0 0 25px 0; border-radius: 5Px; display: flex; justify-content: space-between; Align-items: center;"
}

// first check if there are any localStorage
  // if exist, display this storage data on the page
if(window.localStorage.getItem("tasks")) {
  let dataSerialization = JSON.parse(window.localStorage.getItem("tasks"));
  dataSerialization.forEach(task => {
    displayTask (task);
  });
}

// when the user write a task on the input field and press enter or click the add task button
  // 1. it will add this task to the loacalStorage
  //  2. display this task on the page and add a delete button to it as well
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if(input.value.trim()) {
    let  taskObject = {"title": input.value.trim()};
    if(window.localStorage["tasks"]) {
      let oldStorage = JSON.parse(window.localStorage["tasks"]);
      oldStorage.push(taskObject);
      window.localStorage.setItem("tasks", JSON.stringify(oldStorage));
    } else {
      window.localStorage.setItem("tasks", JSON.stringify([taskObject]) )
    }
    displayTask(taskObject);
    input.value = "";

  } else {
    input.setAttribute("placeholder", "You need to write a task before submit");
    input.value = "";
    input.style.border = "1px solid #f00";
  }
});

// to delete the task from local storage and delete it form the dom as well
document.addEventListener("click", (e) => {
  e.stopPropagation();
  if(e.target.classList.contains("btn-delete")) {
    // delete task from dom tree
    e.target.parentElement.remove();

    // delete task from localStorage
    let tasksBeforeTaskRemove = JSON.parse(window.localStorage["tasks"]);
    // get taskName from dom
    let toBeRemovedTask = e.target.parentElement.firstChild.textContent;
    let finalLocalStorage = tasksBeforeTaskRemove.filter(task => task["title"] !== toBeRemovedTask);
    window.localStorage.setItem("tasks", JSON.stringify(finalLocalStorage));
  }
})
