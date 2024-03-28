// const taskValue = document.querySelector('.create-task__text');
// console.log(taskValue);
// const boxShowTasks = document.querySelector('.show-tasks');
const addTaskButton = document.querySelector('.create-task__add');
const textTask = document.querySelector('.create-task__text');
const listTasks = document.querySelector('.show-tasks__list');

const tasks = [];

let renderTask = () => {
  let listItem = '';
  tasks.forEach((task) => {
    listItem += `
      <li id=${task.id}>
        <input checked=${task.isChecked} type='checkbox'></input>
        <span>${task.text}</span>
        <button class='remove-task'>x</button>
      </li>`;
    console.log(listItem);
  });
  listTasks.innerHTML = listItem;
};

let addTask = () => {
  if (!textTask.value) {
    return;
  }
  console.log(1);
  let task = {
    id: Date.now(),
    isChecked: false,
    text: textTask.value,
  };

  tasks.push(task);
  console.log(tasks);
  renderTask();
};

let removeTask = () => {
  tasks.filter((task) => {
    console.log(task);
  });
};

addTaskButton.addEventListener('click', addTask);
document.querySelector('.remove-task').addEventListener('click', removeTask);
