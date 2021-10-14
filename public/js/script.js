import { variables } from './modules/variables.js';
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
  variables.tasks = await getItemsFromAPI();
  //   console.log(variables.tasks);

  addTaskBtn.addEventListener('click', async e => {
    e.preventDefault();
    if (addTaskNameInput.value === '') return;
    variables.tasks = await addTaskToDb();
    await renderTodoList();
    resetToDefaultForm();
  });

  okTaskBtn.addEventListener('click', async e => {
    e.preventDefault();
    okTaskBtn.classList.add('hidden');
    cancelTaskBtn.classList.add('hidden');
    addTaskBtn.classList.remove('hidden');
    variables.tasks = await updateTaskInDb();
    // console.log('okBtn', { variables.tasks, selectedTask });

    resetToDefaultForm();
    renderTodoList();
  });

  cancelTaskBtn.addEventListener('click', e => {
    e.preventDefault();
    okTaskBtn.classList.add('hidden');
    cancelTaskBtn.classList.add('hidden');
    addTaskBtn.classList.remove('hidden');
    resetToDefaultForm();
  });
  await renderTodoList();
  //   addListeners(variables.tasks, selectedTask);
  resetToDefaultForm();
})();
