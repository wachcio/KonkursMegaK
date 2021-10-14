(async () => {
  const addTaskBtn = document.querySelector('#addTaskBtn');
  const tasksList = document.querySelector('#tasksList');
  const addTaskDoneCheckbox = document.querySelector('#addTaskDoneCheckbox');
  const addTaskNameInput = document.querySelector('#addTaskNameInput');
  const okTaskBtn = document.querySelector('#okTaskBtn');
  const cancelTaskBtn = document.querySelector('#cancelTaskBtn');

  let taskItem = Array.from(document.querySelectorAll('.taskItem'));
  let taskItemDone = document.querySelectorAll('.taskItemDone');
  let taskItemName = document.querySelectorAll('.taskItemName');
  let editTaskBtn = document.querySelectorAll('.editTaskBtn');
  let deleteTaskBtn = document.querySelectorAll('.deleteTaskBtn');

  let tasks = [];
  let selectedTask = {};

  const updateNodeLists = () => {
    taskItem = Array.from(document.querySelectorAll('.taskItem'));
    taskItemDone = document.querySelectorAll('.taskItemDone');
    taskItemName = document.querySelectorAll('.taskItemName');
    editTaskBtn = document.querySelectorAll('.editTaskBtn');
    deleteTaskBtn = document.querySelectorAll('.deleteTaskBtn');
  };

  const getItemsFromAPI = async () => {
    return (tasks = await axios
      .get('/todo')
      .then(function ({ data }) {
        return data;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      }));
  };

  await getItemsFromAPI();

  const deleteTaskFromDb = async () => {
    return await axios
      .delete('/todo', { data: { id: selectedTask.id } })
      .then(({ data }) => {
        return data;
      })
      .catch(err => {
        console.log(err);
      });
  };

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

        tasks = await deleteTaskFromDb();
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

    updateNodeLists();

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
  const updateTaskInDb = async () => {
    return await axios
      .put('/todo', {
        name: addTaskNameInput.value,
        done: addTaskDoneCheckbox.checked,
        id: selectedTask.id,
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
    tasks = await updateTaskInDb();
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
