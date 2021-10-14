import {
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
} from './modules/nodeLists.js';

import { getItemsFromAPI, deleteTaskFromDb, updateTaskInDb, addTaskToDb } from './modules/db.js';
import { addListeners } from './modules/liteners.js';

(async () => {
  let tasks = [];
  let selectedTask = {};

  tasks = await getItemsFromAPI();
  //   console.log(tasks);

  addTaskBtn.addEventListener('click', async e => {
    e.preventDefault();
    if (addTaskNameInput.value === '') return;
    tasks = await addTaskToDb();
    await renderTodoList(tasks, selectedTask);
    resetToDefaultForm();
  });

  okTaskBtn.addEventListener('click', async e => {
    e.preventDefault();
    okTaskBtn.classList.add('hidden');
    cancelTaskBtn.classList.add('hidden');
    addTaskBtn.classList.remove('hidden');
    tasks = await updateTaskInDb(selectedTask);
    selectedTask = selectedTask;
    console.log('okBtn', { tasks, selectedTask });

    resetToDefaultForm();
    renderTodoList(tasks, selectedTask);
  });

  cancelTaskBtn.addEventListener('click', e => {
    e.preventDefault();
    okTaskBtn.classList.add('hidden');
    cancelTaskBtn.classList.add('hidden');
    addTaskBtn.classList.remove('hidden');
    resetToDefaultForm();
  });
  await renderTodoList(tasks, selectedTask);
  //   addListeners(tasks, selectedTask);
  resetToDefaultForm();
})();
