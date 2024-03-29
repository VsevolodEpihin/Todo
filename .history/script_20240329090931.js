const EVENT_DETAIL = 1;
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
        <input hidden/>
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

let removeTask = (event) => {
    tasks = tasks.filter((task) => Number(event.target.parentNode.id) !== task.id);
    renderTask();
  
};
let markTask = (event) => {
     tasks.map((task)=>{
      if(Number(event.target.parentNode.id) === task.id){
        task.isChecked = event.target.checked
      }
    })
    console.log(tasks)
}

let editTaskText = (event) => {
  console.log(event.target)
  let parent = event.target.parentNode;
  if(event.detail === EVENT_DETAIL){
    event.target.setAttribute('hidden',true)
    
    console.log(parent.firstElementChild.previousSibling)
    // event.target.parentNode.firstElement.nextSublin
  }
}

let selectActionTask = (event) => {
  if (event.target.type === 'button') removeTask(event)
  if (event.target.type === 'checkbox') markTask(event)
  if (event.target.tagName === 'SPAN') editTaskText(event)
}



addTaskButton.addEventListener('click', addTask);
listTaskContainer.addEventListener('click', selectActionTask);
