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

const addListeners = (tasks, selectedTask) => {
  taskItem.map((el, i) => {
    editTaskBtn[i].addEventListener('click', async e => {
      e.preventDefault();
      selectedTask = tasks[i];
      console.log('editBTN', { selectedTask });

      okTaskBtn.classList.remove('hidden');
      cancelTaskBtn.classList.remove('hidden');
      addTaskBtn.classList.add('hidden');

      addTaskNameInput.value = selectedTask.name;
      addTaskDoneCheckbox.checked = selectedTask.done;
    });

    deleteTaskBtn[i].addEventListener('click', async e => {
      e.preventDefault();
      selectedTask = tasks[i];

      tasks = await deleteTaskFromDb(selectedTask);
      await renderTodoList(tasks, selectedTask);
    });
  });
};

export { addListeners };
