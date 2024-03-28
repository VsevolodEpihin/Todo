const addTaskButton = document.querySelector('.create-task__add');
const textTask = document.querySelector('.create-task__text');
const listTaskContainer = document.querySelector('.show-tasks__list');

let tasks = [];

const renderTask = () => {
  
  let listTask = '';
  tasks.forEach((task) => {
    listTask += `
      <li id=${task.id}>
        
        <input type='checkbox' ${task.isChecked ? 'checked':''}/> 
        <span>${task.text}</span>
        <button type='button' class='remove-task'>x</button>
      </li>`;
  });
  listTaskContainer.innerHTML = listTask;
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

let removeTask = (e) => {
    tasks = tasks.filter((task) => Number(e.parentNode.id) !== task.id);
    renderTask();
  console.log(33)
};

let markTask = (e) => {
    console.log(e)
}

let selectActionTask = (event) => {
  console.log(event)
  let e = event.target;
  if (e.type === 'button') removeTask(e)
  if (e.type === 'checkbox') markTask(e)
}



addTaskButton.addEventListener('click', addTask);
listTaskContainer.addEventListener('click', selectActionTask);
