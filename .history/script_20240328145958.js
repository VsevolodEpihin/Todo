const addTaskButton = document.querySelector('.create-task__add');
const textTask = document.querySelector('.create-task__text');
const listTaskContainer = document.querySelector('.show-tasks__list');

let tasks = [];
console.log(listTaskContainer)
const renderTask = () => {
  let listTask = '';
  tasks.forEach((task) => {
    listTask += `
      <li id=${task.id}>
        
        <input ${task.isChecked ? 'checked':''} 
        <span>${task.text}</span>
        <button type='button' class='remove-task'>x</button>
      </li>`;
  });
  listTaskContainer.innerHTML = listItem;
};

const addTask = () => {
  if (textTask.value) {
    let task = {
      id: Date.now(),
      isChecked: false,
      text: textTask.value,
    };
  
    tasks.push(task);
    renderTask();
  };
  
};

let removeTask = (event) => {
  let e = event.target;
  if (e.type === 'button') {
    tasks = tasks.filter((task) => Number(e.parentNode.id) !== task.id);
    renderTask();
  }
};

let selectActionTask = (event) => {
  let e = event.target;
  console.log(e)
}



addTaskButton.addEventListener('click', addTask);
listTaskContainer.addEventListener('click', selectActionTask);
