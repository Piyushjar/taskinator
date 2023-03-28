import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://taskinator-35f73-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const tasksDB = ref(database, "tasks");

const inputField = document.getElementById("input-field");
const btn = document.getElementById("btn");
const taskList = document.getElementById("task-list");

btn.addEventListener("click", function () {
  let inputValue = inputField.value.trim();
  if (inputValue != "") push(tasksDB, inputValue);
  inputField.value = "";
});

onValue(tasksDB, function (snapshot) {
  if (snapshot.exists()) {
    let tasksArray = Object.entries(snapshot.val());
    taskList.innerHTML = "";
    for (let i = 0; i < tasksArray.length; i++) {
      let currentTask = tasksArray[i];
      appendTasks(currentTask);
    }
  } else {
    taskList.textContent = "No tasks yet...";
  }
});

function appendTasks(task) {
  let currentTaskId = task[0];
  let currentTaskValue = task[1];
  let newTask = document.createElement("li");
  newTask.textContent = currentTaskValue;

  newTask.addEventListener("click", function () {
    let exactLocationInDb = ref(database, `tasks/${currentTaskId}`);
    remove(exactLocationInDb);
  });

  taskList.append(newTask);
}
