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
import { addListenersToIDs } from './modules/liteners.js';

(async () => {
  variables.tasks = await getItemsFromAPI();
  //   console.log(variables.tasks);

  addListenersToIDs();
  await renderTodoList();
  //   addListeners(variables.tasks, selectedTask);
  resetToDefaultForm();
})();
