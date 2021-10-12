(async () => {
  const addTaskBtn = document.querySelector('#addTaskBtn');
  const tasksList = document.querySelector('#tasksList');
  const taskItemDone = document.querySelector('.taskItemDone');
  const editTaskBtn = document.querySelector('.editTaskBtn');
  const deleteTaskBtn = document.querySelector('.deleteTaskBtn');
  const addTaskDoneCheckbox = document.querySelector('#addTaskDoneCheckbox');
  const addTaskNameInput = document.querySelector('#addTaskNameInput');

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
    if (tasks.length === 0) return;

    let HTML = '';

    tasks.map(({ name, done, id }, idx) => {
      HTML += `
      <tr class="tasksItem bg-blue-300 lg:text-black">
                <td class="taskItemOrdinalNumber p-3 font-medium text-gray-700">${idx + 1}.</td>
                <td class="taskItemName p-3 font-medium text-gray-700">
                 ${name}
                </td>

                <td class="taskItemDone p-3">
                  <span class="${
                    done === 'true' ? 'bg-green-500' : 'bg-red-500'
                  }  text-gray-50 rounded-md px-2 uppercase">${
        done === 'true' ? 'ZROBIONE' : 'DO ZROBIENIA'
      }</span>
                </td>
                <td class="p-3">
                  <a href="#" class="editTaskBtn hover:text-yellow-400 text-gray-700 mx-2">
                    <i class="material-icons-outlined text-base">edit</i>
                  </a>
                  <a href="#" class="deleteTaskBtn hover:text-red-500 text-gray-700 ml-2">
                    <i class="material-icons-round text-base">delete_outline</i>
                  </a>
                </td>
              </tr>`;
    });

    tasksList.innerHTML += HTML;
  };
  renderTodoList();
})();
