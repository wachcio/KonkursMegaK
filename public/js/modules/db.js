import { variables } from './variables.js';
import { addTaskDoneCheckbox, addTaskNameInput } from './nodeLists.js';
import { capitalizeFirstLetter } from './capitalizeFirstLetter.js';
import { hideSpinner, showSpinner } from './spinner.js';

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    showSpinner();
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    hideSpinner();
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    hideSpinner();
    return Promise.reject(error);
  },
);

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
      name: capitalizeFirstLetter(addTaskNameInput.value),
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
      name: capitalizeFirstLetter(addTaskNameInput.value),
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
