// const taskValue = document.querySelector('.create-task__text');
// console.log(taskValue);
// const boxShowTasks = document.querySelector('.show-tasks');
const addTaskButton = document.querySelector('.create-task__add');
const textTask = document.querySelector('.create-task__text');
const listTasks = document.querySelector('.show-tasks__list');

const tasks = [];

let addTask = () => {
  if (textTask.value) {
    return;
  }
  let task = {
    id: Date.now(),
    isChecked: false,
    text: textTask.value,
  };
  let listItem = '';

  tasks.push(task);
  console.log(tasks);

  tasks.forEach((task) => {
    listItem += `
      <li id=${task.id}>
        <input checked=${task.isChecked} type='checkbox'></input>
        <span>${task.text}</span>
        <button>x</button>
      </li>`;
    console.log(listItem);
  });
  listTasks.innerHTML = listItem;
};

let renderTask = () => {
  let listItem = '';
}

addTaskButton.addEventListener('click', addTask);
