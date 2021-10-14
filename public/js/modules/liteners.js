import { variables } from './variables.js';
import {
  taskItem,
  editTaskBtn,
  okTaskBtn,
  cancelTaskBtn,
  addTaskBtn,
  addTaskNameInput,
  addTaskDoneCheckbox,
  deleteTaskBtn,
  renderTodoList,
  resetToDefaultForm,
} from './nodeLists.js';

import { addTaskToDb, deleteTaskFromDb, updateTaskInDb } from './db.js';

const addListenersToIDs = () => {
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
};

const addListeners = () => {
  taskItem.map((el, i) => {
    editTaskBtn[i].addEventListener('click', async e => {
      e.preventDefault();
      variables.selectedTask = variables.tasks[i];
      //   console.log('editBTN', { variables.selectedTask });

      okTaskBtn.classList.remove('hidden');
      cancelTaskBtn.classList.remove('hidden');
      addTaskBtn.classList.add('hidden');

      addTaskNameInput.value = variables.selectedTask.name;
      addTaskDoneCheckbox.checked = variables.selectedTask.done;
    });

    deleteTaskBtn[i].addEventListener('click', async e => {
      e.preventDefault();
      variables.selectedTask = variables.tasks[i];

      variables.tasks = await deleteTaskFromDb(variables.selectedTask);
      await renderTodoList();
    });
  });
};

export { addListeners, addListenersToIDs };
