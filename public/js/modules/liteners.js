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

export { addListeners };
