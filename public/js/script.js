import { variables } from './modules/variables.js';
import { renderTodoList, resetToDefaultForm } from './modules/nodeLists.js';

import { getItemsFromAPI } from './modules/db.js';
import { addListenersToIDs } from './modules/liteners.js';

(async () => {
  variables.tasks = await getItemsFromAPI();

  addListenersToIDs();
  await renderTodoList();
  resetToDefaultForm();
})();
