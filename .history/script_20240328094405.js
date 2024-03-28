// const taskValue = document.querySelector('.create-task__text');
// console.log(taskValue);
// const boxShowTasks = document.querySelector('.show-tasks');
const addTaskButton = document.querySelector('.create-task__add');
const textTask = document.querySelector('.create-task__text');
const listTasks = document.querySelector('.show-tasks__list');

const tasks = [];

function showTask() {
  let task = {
    id: tasks.length,
    isChecked: false,
    text: textTask.value,
  };
  let listItem = '';

  if (textTask.value.length === 0) {
    return;
  } else {
    console.log(textTask.value);
  }

  tasks.push(task);
  console.log(tasks);

  tasks.forEach((task) => {
    listItem += `<ol id=${task.id}>
    ${task.text}
    </ol>`;
    console.log(listItem);
  });
  listTasks.innerHTML = listItem;
}

addTaskButton.addEventListener('click', showTask);