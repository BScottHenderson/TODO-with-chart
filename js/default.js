
const workers = ['Bob', 'Joan', 'Maurice', 'Janis', 'Bonnie', 'Carlos'];
var tasks = [];
var taskMap = new Map();

// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
//google.charts.setOnLoadCallback(drawTaskChart);

// HTML customization.
window.onload = function() {
  // Set the form onsubmit handler.
  let form = document.querySelector('#task-form');

  form.onsubmit = addTask;

  // Add a radio button for each worker.
  let assignee = document.querySelector('#assignee');

  workers.sort();
  for (let i = 0; i < workers.length; ++i) {
    // <label>
    //   <input type='radio' name='assignee' value='Bob'>
    //   Bob
    // </label>
    let label     = document.createElement('label');
    let labelText = document.createTextNode(workers[i]);
    let radio     = document.createElement('input');

    radio.setAttribute('type', 'radio');
    radio.setAttribute('name', 'assignee');
    radio.setAttribute('value', workers[i]);
    label.appendChild(radio);
    label.appendChild(labelText);
    assignee.appendChild(label);
  }
}

// Add a task to the task list and the task map.
function addTask() {
  event.preventDefault();

  // Add a new task to the list based on form contents.
  let form = document.querySelector('#task-form');
  let newTask = {};

  newTask.description = form.description.value;
  newTask.assignee    = form.assignee.value;
  newTask.difficulty  = form.difficulty.value;
  tasks.push(newTask);

  // Update the task map.
  let counter = null;
  if (taskMap.has(newTask.assignee)) {
    counter = taskMap.get(newTask.assignee);
  } else {
    counter = {
      easy: 0,
      medium: 0,
      hard: 0
    };
  }
  counter[newTask.difficulty] += 1;
  taskMap.set(newTask.assignee, counter);

  // Update the task list and task chart.
  displayTaskList();
  drawTaskChart();
}

// Display the current task list.
function displayTaskList() {
  let taskList = document.querySelector('#task-list');

  // Remove the current task list.
  taskList.innerHTML = '';

  // Create a new task list.
  for (let i = 0; i < tasks.length; ++i) {
    let li = document.createElement('li');
    let liText = document.createTextNode(`Task assigned to ${tasks[i].assignee}, difficulty=${tasks[i].difficulty}, ${tasks[i].description}`);

    li.appendChild(liText);
    taskList.appendChild(li);
  }
}

// Draw a chart based on task data.
function drawTaskChart() {
  // Clear the curent chart.
  let taskChart = document.querySelector('#task-chart');

  taskChart.innerHTML = '';

  // Chart data table.
  let data = new google.visualization.DataTable();
  data.addColumn('string', 'Difficulty');
  data.addColumn('number', 'Easy');
  data.addColumn('number', 'Medium');
  data.addColumn('number', 'Hard');

  for (var [key, value] of taskMap) {
    data.addRow([key, value.easy, value.medium, value.hard]);
  }

  // Chart options.
  let options = {
    width: document.querySelector('form').offsetWidth,
    height: 350,
    legend: { position: 'top', maxLines: 3 },
    bar: { groupWidth: '75%' },
    isStacked: 'percent',
    vAxis: {
      minValue: 0,
      ticks: [0, .2, .4, .6, .8, 1]
    }
  };

  // Instantiate and draw our chart, passing in some options.
  let chart = new google.visualization.ColumnChart(document.getElementById('task-chart'));
  chart.draw(data, options);
}
