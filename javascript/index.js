let myTask = document.getElementById("taskInput");
let mySelect = document.getElementById("mySelect");
let mysearchInput = document.getElementById("searchInput");
let myBtn = document.getElementById("mybtn");
let todosContainer = document.getElementById("todosContainer");

mysearchInput.addEventListener("input", function () {
  const searchQuery = mysearchInput.value.toLowerCase().trim();
  const filteredTasks = taskList.filter((task) =>
    task.taskDetails.toLowerCase().includes(searchQuery)
  );
  displayFilteredTasks(filteredTasks);
});

function displayFilteredTasks(tasks) {
  let cartona = "";
  for (let i = 0; i < tasks.length; i++) {
    cartona += `
        <div class="col-md-6 mx-auto">
          <div class="d-flex justify-content-between align-items-center bg-dark rounded p-3 mb-3 ${
            tasks[i].isCompleted ? "completed" : ""
          }">
            <span class="text-white">${tasks[i].taskDetails}</span>
            <div class="d-flex">
              <button class="btn btn-success btn-sm mx-1" onclick="beCompleted('${
                tasks[i].id
              }')">
                <i class="fa-solid fa-check"></i>
              </button>
              <button class="btn btn-danger btn-sm" onclick="deleteTask('${
                tasks[i].id
              }')">
                <i class="fa-solid fa-circle-xmark"></i>
              </button>
            </div>
          </div>
        </div>
      `;
  }
  todosContainer.innerHTML = cartona;
}

let taskList = [];
if (localStorage.getItem("alltodos")) {
  taskList = JSON.parse(localStorage.getItem("alltodos"));
  displayTask();
}

function validateInput(input) {
  var regex = /^[A-Z][A-Za-z0-9 ]*$/; // Updated regex
  return regex.test(input) && input.trim().length > 0; // Ensure input is not empty
}

myBtn.addEventListener("click", function () {
  if (!validateInput(myTask.value)) {
    myTask.classList.add("is-invalid");
    myTask.setAttribute(
      "placeholder",
      "Task must start with a capital letter and not be empty"
    );
    return;
  }
  myTask.classList.remove("is-invalid");
  myTask.setAttribute("placeholder", ""); // Reset placeholder
  let task = {
    taskDetails: myTask.value,
    isCompleted: mySelect.value == "completed" ? true : false,
    id: `${Math.random() * 1000}`,
  };
  taskList.push(task);
  localStorage.setItem("alltodos", JSON.stringify(taskList));
  displayTask();
  console.log(taskList);
  clear();
});

function clear() {
  myTask.value = "";
  mySelect.value = "All";
}

function displayTask() {
  let cartona = "";
  for (let i = 0; i < taskList.length; i++) {
    cartona += `
      <div class="col-md-6 mx-auto">
        <div class="d-flex justify-content-between align-items-center bg-dark rounded p-3 mb-3 ${
          taskList[i].isCompleted ? "completed" : ""
        }">
          <span class="text-white">${taskList[i].taskDetails}</span>
          <div class="d-flex">
            <button class="btn btn-success btn-sm mx-1" onclick="beCompleted('${
              taskList[i].id
            }')">
              <i class="fa-solid fa-check"></i>
            </button>
            <button class="btn btn-danger btn-sm" onclick="deleteTask('${
              taskList[i].id
            }')">
              <i class="fa-solid fa-circle-xmark"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }
  document.getElementById("todosContainer").innerHTML = cartona;
}

function deleteTask(id) {
  taskList = taskList.filter((task) => task.id !== id);
  localStorage.setItem("alltodos", JSON.stringify(taskList));
  displayTask();
}

function beCompleted(id) {
  let task = taskList.find((task) => task.id === id);
  if (task) {
    task.isCompleted = true;
    localStorage.setItem("alltodos", JSON.stringify(taskList));
    displayTask();
  }
}
