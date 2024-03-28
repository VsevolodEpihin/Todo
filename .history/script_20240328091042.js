// const taskValue = document.querySelector('.create-task__text');
// console.log(taskValue);
// const boxShowTasks = document.querySelector('.show-tasks');
const addTaskButton = document.querySelector('.create-task__add');
const textTask = document.querySelector('.create-task__text');

const tasks = [];

function showTask() {
  let task = {
    id: tasks.length,
    isChecked: false,
    text: textTask.value,
  };

  if (textTask.value.length === 0) {
    return;
  } else {
    console.log(textTask.value);
  }

  tasks.push(task);
  console.log(tasks);
}

addTaskButton.addEventListener('click', showTask);
