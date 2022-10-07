// data
let data = {
  allItems: {
    inc: [],
    exp: [],
  },
  totals: {
    inc: 0,
    exp: 0,
  },
  budget: 0,
  percentage: -1,
};

class Income {
  constructor(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  }
}

class Expense {
  constructor(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  }

  calcPercentage(totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round(
        (this.value * 100) / totalIncome
      );
    } else {
      this.percentage = -1;
    }
  }

  getPercentages() {
    return this.percentage;
  }
}

//calc total
function calculateTotal(type) {
  let sum = 0;

  data.allItems[type].forEach(cur => {
    sum += cur.value;
  });

  data.totals[type] = sum;
}

// data structure
export const addItem = function (type, des, val) {
  let newItem, id;

  // Create new id
  id =
    data.allItems[type].length > 0
      ? data.allItems[type][data.allItems[type].length - 1]
          .id + 1
      : 0;

  // Create new item
  newItem =
    type === 'inc'
      ? new Income(id, des, val)
      : (newItem = new Expense(id, des, val));

  // Push new item in the data structure
  data.allItems[type].push(newItem);

  // Return new element
  return newItem;
};

//delete item:
export const deleteItem = function (type, id) {
  let ids, index;

  ids = data.allItems[type].map(current => {
    return current.id;
  });

  index = ids.indexOf(id);

  if (index !== -1) {
    data.allItems[type].splice(index, 1);
  }
};

export const calculateBudget = function () {
  // calculate total income and expenses
  calculateTotal('inc');
  calculateTotal('exp');

  // calculate budget: inc - exp
  data.budget = data.totals.inc - data.totals.exp;

  // calc percentage of the expenses

  if (data.totals.inc > 0) {
    data.percentage = Math.round(
      (data.totals.exp * 100) / data.totals.inc
    );
  } else {
    data.percentage = -1;
  }
};

// Calculate percentage for each of expenses:
export const calculatePercentages = function () {
  data.allItems.exp.forEach(cur => {
    cur.calcPercentage(data.totals.inc);
  });
};

// get it on a variable:
export const getPercentages = function () {
  let allPerc = data.allItems.exp.map(cur => {
    return cur.getPercentages();
  });
  return allPerc;
};

export const getBudget = function () {
  return {
    budget: data.budget,
    totalInc: data.totals.inc,
    totalExp: data.totals.exp,
    percentage: data.percentage,
  };
};
