const addTaskButton = document.querySelector('.create-task__add');
const textTask = document.querySelector('.create-task__text');
const listTasks = document.querySelector('.show-tasks__list');

let tasks = [];

const renderTask = () => {
  let listItem = '';
  tasks.forEach((task) => {
    listItem += `
      <li id=${task.id}>
        ${(task.isChecked)? 1 : 2} 
          
        <input type='checkbox'></input>
        <span>${task.text}</span>
        <button class='remove-task'>x</button>
      </li>`;
    console.log(listItem);
  });
  listTasks.innerHTML = listItem;
};

const addTask = () => {
  if (textTask.value) {
    let task = {
      id: Date.now(),
      isChecked: false,
      text: textTask.value,
    };
  
    tasks.push(task);
    console.log(tasks);
    renderTask();
  };
  
};

let removeTask = (event) => {
  let e = event.target;
  console.log(e);
  if (e.type === 'button') {
    tasks = tasks.filter((task) => Number(e.parentNode.id) !== task.id);
    renderTask();
  }
};

addTaskButton.addEventListener('click', addTask);
listTasks.addEventListener('click', removeTask);
