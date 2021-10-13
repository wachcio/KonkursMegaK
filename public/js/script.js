(async () => {
  const addTaskBtn = document.querySelector('#addTaskBtn');
  const tasksList = document.querySelector('#tasksList');
  const addTaskDoneCheckbox = document.querySelector('#addTaskDoneCheckbox');
  const addTaskNameInput = document.querySelector('#addTaskNameInput');
  const okTaskBtn = document.querySelector('#okTaskBtn');
  const cancelTaskBtn = document.querySelector('#cancelTaskBtn');

  let tasks = [];

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

  console.log({ tasks });

  const renderTodoList = async () => {
    console.log(typeof tasks);

    if (tasks.length === 0) return;

    let HTML = '';
    tasksList.innerHTML = '';

    tasks.map(({ name, done, id }, idx) => {
      HTML += `
      <tr class="tasksItem bg-blue-300 lg:text-black" data-task-id="${id}">
                <td class="taskItemOrdinalNumber p-3 font-medium text-gray-700">${idx + 1}.</td>
                <td class="taskItemName p-3 font-medium text-gray-700">
                 ${name}
                </td>

                <td class="taskItemDone p-3">
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
  };
  renderTodoList();

  const addItemToDb = async () => {
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

  const taskItemDone = document.querySelectorAll('.taskItemDone');
  const editTaskBtn = document.querySelectorAll('.editTaskBtn');
  const deleteTaskBtn = document.querySelectorAll('.deleteTaskBtn');

  addTaskBtn.addEventListener('click', async e => {
    e.preventDefault();
    if (addTaskNameInput.value === '') return;

    tasks = await addItemToDb();

    await renderTodoList();
    resetToDefaultForm();
  });

  okTaskBtn.addEventListener('click', e => {
    e.preventDefault();
    okTaskBtn.classList.add('hidden');
    cancelTaskBtn.classList.add('hidden');
    addTaskBtn.classList.remove('hidden');
  });
  cancelTaskBtn.addEventListener('click', e => {
    e.preventDefault();
    okTaskBtn.classList.add('hidden');
    cancelTaskBtn.classList.add('hidden');
    addTaskBtn.classList.remove('hidden');
  });
})();
