import * as budgetCtrl from './js/budget.controller.js';
import * as UICtrl from './js/ui.controller.js';

const controller = (function () {
  const setupEventListeners = function () {
    const DOM = UICtrl.getDOMelements();

    // add item - button event
    DOM.inputBtn.addEventListener('click', ctrlAddItem);

    document.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.code === 13) {
        ctrlAddItem();
      }
    });

    //event handler for deleting items - will be added to each item:
    DOM.container.addEventListener('click', ctrlDeleteItem);

    // change type of input - income or expense
    DOM.selectType.addEventListener(
      'change',
      UICtrl.changedType
    );
  };

  const updateBudget = function () {
    // Calculate the budget
    budgetCtrl.calculateBudget();

    // Return the budget
    const budget = budgetCtrl.getBudget();

    // Display the budget on the UI
    UICtrl.displayBudget(budget);
  };

  // UPDATE percentage after adding or deleting an item
  const updatePercentages = function () {
    // calculate percentage
    budgetCtrl.calculatePercentages();

    // read percentage from the budget controller
    const percentages = budgetCtrl.getPercentages();

    // update the UI with the new percentage
    UICtrl.displayPercentages(percentages);
  };

  // Add items
  const ctrlAddItem = function () {
    // Get the field input data
    let input = UICtrl.getInput();

    // button works only if fields are filled
    if (
      input.description !== '' &&
      !isNaN(input.value) &&
      input.value > 0
    ) {
      //  Add the item to the budget controller
      let newItem = budgetCtrl.addItem(
        input.type,
        input.description,
        input.value
      );

      // Add an item to UI
      UICtrl.addListItem(newItem, input.type);

      // Clear fields
      UICtrl.clearField();

      // Calculate and update budget
      updateBudget();

      // Calculate and update percentages
      updatePercentages();
    }
  };

  // Delete items
  const ctrlDeleteItem = function (event) {
    let itemID, splitID, type, ID;

    itemID =
      event.target.parentNode.parentNode.parentNode
        .parentNode.id;

    if (itemID) {
      splitID = itemID.split('-');
      type = splitID[0];
      ID = parseInt(splitID[1]);

      // delete the item from data structure
      budgetCtrl.deleteItem(type, ID);

      // delete item from UI
      UICtrl.deleteListItem(itemID);

      // Update and show new budget
      updateBudget();

      // Calculate and update percentages
      updatePercentages();
    }
  };
  return {
    init: function () {
      UICtrl.displayMonth();
      setupEventListeners();
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1,
      });
    },
  };
})();

controller.init();
