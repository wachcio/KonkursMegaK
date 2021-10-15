import { spinner } from './nodeLists.js';

const showSpinner = () => {
  spinner.classList.remove('hidden');
};

const hideSpinner = () => {
  spinner.classList.add('hidden');
};

export { hideSpinner, showSpinner };
