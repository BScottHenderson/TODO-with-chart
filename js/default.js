
var workers = ["Bob", "Joan", "Maurice", "Janis", "Bonnie", "Carlos"];
var tasks = [];

window.onload = function() {
  var form = document.querySelector("#task-form");

  form.onsubmit = addTask;

  var assignee = document.querySelector("#assignee");

  workers.sort();
  for (var i = 0; i < workers.length; ++i) {
    // <label>
    //   <input type="radio" name="assignee" value="Bob">
    //   Bob
    // </label>
    var label     = document.createElement("label");
    var labelText = document.createTextNode(workers[i]);
    var radio     = document.createElement("input");

    radio.setAttribute("type", "radio");
    radio.setAttribute("name", "assignee");
    radio.setAttribute("value", workers[i]);
    label.appendChild(radio);
    label.appendChild(labelText);
    assignee.appendChild(label);
  }
}

function addTask() {
  event.preventDefault();

  // Add a new task to the list based on form contents.
  var form = document.querySelector("#task-form");
  var newTask = {};

  newTask.description = form.description.value;
  newTask.assignee    = form.assignee.value;
  newTask.difficulty  = form.difficulty.value;
  tasks.push(newTask);

  // Display the current task list.
  var taskList = document.querySelector("#task-list");

  // Remove the current task list.
  taskList.innerHTML = "";

  // Create a new task list.
  for (var i = 0; i < tasks.length; ++i) {
    var li = document.createElement("li");
    var liText = document.createTextNode(`Task assigned to ${tasks[i].assignee}, difficulty=${tasks[i].difficulty}, ${tasks[i].description}`);

    li.appendChild(liText);
    taskList.appendChild(li);
  }
}
