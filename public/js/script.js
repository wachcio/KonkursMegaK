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
} from './modules/nodeLists.js';

import { getItemsFromAPI, deleteTaskFromDb, updateTaskInDb } from './modules/db.js';

(async () => {
  let tasks = [];
  let selectedTask = {};

  tasks = await getItemsFromAPI();

  const addListeners = () => {
    taskItem.map((el, i) => {
      editTaskBtn[i].addEventListener('click', async e => {
        e.preventDefault();
        selectedTask = tasks[i];

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
        await renderTodoList();
      });
    });
  };

  const renderTodoList = async () => {
    if (tasks.length === 0) return;

    let HTML = '';
    tasksList.innerHTML = '';

    tasks.map(({ name, done, id }, idx) => {
      HTML += `
      <tr class="taskItem bg-blue-300 lg:text-black" data-task-id="${id}">
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

    updateNodeLists(selectedTask);

    addListeners();
  };
  await renderTodoList();

  const addTaskToDb = async () => {
    return await axios
      .post('/todo', {
        name: addTaskNameInput.value,
        done: addTaskDoneCheckbox.checked,
      })
      .then(({ data }) => {
        return data;
      })
      .catch(err => {
        console.log(err);
      });
  };

  const resetToDefaultForm = () => {
    addTaskDoneCheckbox.checked = false;
    addTaskNameInput.value = '';
  };

  addTaskBtn.addEventListener('click', async e => {
    e.preventDefault();
    if (addTaskNameInput.value === '') return;

    tasks = await addTaskToDb();

    await renderTodoList();
    resetToDefaultForm();
  });

  okTaskBtn.addEventListener('click', async e => {
    e.preventDefault();
    okTaskBtn.classList.add('hidden');
    cancelTaskBtn.classList.add('hidden');
    addTaskBtn.classList.remove('hidden');
    tasks = await updateTaskInDb(selectedTask);
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
})();
