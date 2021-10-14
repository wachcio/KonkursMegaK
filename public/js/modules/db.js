import { variables } from './variables.js';
import { addTaskDoneCheckbox, addTaskNameInput } from './nodeLists.js';

const getItemsFromAPI = async () => {
  return await axios
    .get('/todo')
    .then(function ({ data }) {
      return data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const deleteTaskFromDb = async () => {
  return await axios
    .delete('/todo', { data: { id: variables.selectedTask.id } })
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
      id: variables.selectedTask.id,
    })
    .then(({ data }) => {
      return data;
    })
    .catch(err => {
      console.log(err);
    });
};

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

export { getItemsFromAPI, deleteTaskFromDb, updateTaskInDb, addTaskToDb };
