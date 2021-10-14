const addTaskBtn = document.querySelector('#addTaskBtn');
const tasksList = document.querySelector('#tasksList');
const addTaskDoneCheckbox = document.querySelector('#addTaskDoneCheckbox');
const addTaskNameInput = document.querySelector('#addTaskNameInput');
const okTaskBtn = document.querySelector('#okTaskBtn');
const cancelTaskBtn = document.querySelector('#cancelTaskBtn');

let taskItem = Array.from(document.querySelectorAll('.taskItem'));
let editTaskBtn = document.querySelectorAll('.editTaskBtn');
let deleteTaskBtn = document.querySelectorAll('.deleteTaskBtn');

const updateNodeLists = () => {
  taskItem = Array.from(document.querySelectorAll('.taskItem'));
  editTaskBtn = document.querySelectorAll('.editTaskBtn');
  deleteTaskBtn = document.querySelectorAll('.deleteTaskBtn');
};

export {
  addTaskBtn,
  tasksList,
  addTaskDoneCheckbox,
  addTaskNameInput,
  okTaskBtn,
  cancelTaskBtn,
  taskItem,
  editTaskBtn,
  deleteTaskBtn,
  updateNodeLists,
};
