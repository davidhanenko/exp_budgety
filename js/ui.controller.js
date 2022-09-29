const inputDescription = document.querySelector(
  '.add__description'
);
const inputType = document.querySelector('.add__type');
const inputValue = document.querySelector('.add__value');
const inputBtn = document.querySelector('.add__btn');
const incomeContainer =
  document.querySelector('.income__list');
const expensesContainer = document.querySelector(
  '.expenses__list'
);
const budgetLabel = document.querySelector(
  '.budget__value'
);
const incomeLabel = document.querySelector(
  '.budget__income--value'
);
const expensesLabel = document.querySelector(
  '.budget__expenses--value'
);
const percentageLabel = document.querySelector(
  '.budget__expenses--percentage'
);
const container = document.querySelector('.container');
const expensesPercLabel = document.querySelector(
  '.item__percentage'
);
const dateLabel = document.querySelector(
  '.budget__title--month'
);

const formatNumber = function (num, type) {
  let numSplit, int, dec;
  /*
           + or - before number
           exactly 2 decimal points
           comma separating thousands
           
           2310.4567 -> 2,310.46
           2000 -> 2,000.00
           */

  num = Math.abs(num);
  num = num.toFixed(2);

  numSplit = num.split('.');

  int = numSplit[0];
  if (int.length > 3) {
    int =
      int.substr(0, int.length - 3) +
      ',' +
      int.substr(int.length - 3, 3);
  }

  dec = numSplit[1];
  return (
    (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec
  );
};

const nodeListForEach = function (list, callback) {
  for (let i = 0; i < list.length; i++) {
    callback(list[i], i);
  }
};

export const getInput = function () {
  // object to get input from user
  return {
    type: inputType.value,
    description: inputDescription.value,
    value: parseFloat(inputValue.value),
  };
};

// CREATE new item(in UI)
export const addListItem = function (obj, type) {
  let html, element;

  // Create HTML string
  if (type === 'inc') {
    element = incomeContainer;

    html = `<div class="item clearfix" id="inc-${
      obj.id
    }"><div class="item__description">${
      obj.description
    }</div><div class="right clearfix"><div class="item__value">${formatNumber(
      obj.value,
      type
    )}</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`;
  } else if (type === 'exp') {
    element = expensesContainer;

    html = `<div class="item clearfix" id="exp-${
      obj.id
    }"><div class="item__description">${
      obj.description
    }</div><div class="right clearfix"><div class="item__value">${formatNumber(
      obj.value,
      type
    )}</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`;
  }

  // Insert the HTML into the DOM
  element.insertAdjacentHTML('beforeend', html);
};

// DELETE item from UI
export const deleteListItem = function (selectorID) {
  let el = document.getElementById(selectorID);
  el.parentNode.removeChild(el);
};

export const clearField = function () {
  inputDescription.value = '';
  inputValue.value = '';

  inputDescription.focus();
};

export const displayBudget = function (obj) {
  budgetLabel.textContent = obj.budget;
  incomeLabel.textContent = obj.totalInc;
  expensesLabel.textContent = obj.totalExp;

  obj.percentage > 0
    ? (percentageLabel.textContent = obj.percentage + '%')
    : (percentageLabel.textContent = '--');
};

// display percentages for each expense:

export const displayPercentages = function (percentages) {
  let fields = document.querySelectorAll(expensesPercLabel);

  fields.forEach((current, index) => {
    percentages[index] > 0
      ? (current.textContent = percentages[index] + '%')
      : (current.textContent = '--');
  });
};

export const displayMonth = function () {
  let now, month, year, months;

  now = new Date();

  months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Now',
    'Dec',
  ];

  year = now.getFullYear();

  month = now.getMonth();

  dateLabel.textContent = months[month] + ' / ' + year;
};

export const changedType = function () {
  let fields = [inputType, inputDescription, inputValue];

  fields.forEach(cur => {
    cur.classList.toggle('red-focus');
  });

  inputBtn.classList.toggle('red');
};

export const getDOMelements = function () {
  return {
    inputBtn,
    container,
    inputType,
  };
};