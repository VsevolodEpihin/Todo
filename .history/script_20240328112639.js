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
  let task = {
    id: Date.now(),
    isChecked: false,
    text: textTask.value,
  };

  tasks.push(task);
  console.log(tasks);
  renderTask();
};

let removeTask = (event) => {
  if (!tasks.length) return;
  let e = event.target;
  if (!e.classList.contains('remove-task')) return;

  tasks.filter((task) => {
    if (e.parentNode.id !== task.id) {
      console.log(task.id);
      console.log(e.parentNode.id);
      // return task;
      return { id: task.id, isChecked: task.isChecked, text: task.textTask };
    }
    console.log(1);
    return;
  });
  console.log(tasks);
  renderTask();
};

addTaskButton.addEventListener('click', addTask);
listTasks.addEventListener('click', removeTask);
