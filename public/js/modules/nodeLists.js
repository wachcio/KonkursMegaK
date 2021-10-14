import { variables } from './variables.js';
import { addListeners } from './listeners.js';

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

const renderTodoList = async () => {
  let HTML = '';
  tasksList.innerHTML = '';

  if (variables.tasks.length === 0) return;

  variables.tasks.map(({ name, done, id }, idx) => {
    HTML += `
    <tr class="taskItem bg-blue-300 lg:text-black hover:bg-blue-400" data-task-id="${id}">
              <td class="taskItemOrdinalNumber p-3 font-medium text-gray-700">${idx + 1}.</td>
              <td class="taskItemName p-3 font-medium text-gray-700">
               ${name}
              </td>

              <td class="taskItemDone text-center p-3">
                <span class="${
                  done === true ? 'bg-green-500' : 'bg-red-500'
                }  text-gray-50 rounded-md px-2 uppercase">${
      done === true ? 'ZROBIONE' : 'DO ZROBIENIA'
    }</span>
              </td>
              <td class="p-3">
                <span class="editTaskBtn hover:text-yellow-400 cursor-pointer text-gray-700 mx-2">
                  <i class="material-icons-outlined text-base">edit</i>
                </span>
                <span class="deleteTaskBtn hover:text-red-500 cursor-pointer text-gray-700 ml-2">
                  <i class="material-icons-round text-base">delete_outline</i>
                </span>
              </td>
            </tr>`;
  });

  tasksList.innerHTML += HTML;

  updateNodeLists(variables.selectedTask);

  addListeners(variables.tasks, variables.selectedTask);
};

const resetToDefaultForm = () => {
  addTaskDoneCheckbox.checked = false;
  addTaskNameInput.value = '';
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
  renderTodoList,
  resetToDefaultForm,
};
