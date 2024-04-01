const DOUBLE_CLICK = 2;

const addTaskButton = document.querySelector('.add-task');
const textTask = document.querySelector('.text');
const listTaskContainer = document.querySelector('.task-container');
const todoContainer = document.querySelector('.todo')
const checkAllTasks = document.querySelector('.check-all-tasks')
const deleteCompletedTaskButton = document.querySelector('.delete-all-tasks')
const optionButtons = document.querySelector('.btn-options')

let tasks = [];

const renderTask = (copyTask) => {
  
  let listTask = '';
  (copyTask || tasks).forEach((task) => {
    listTask += `
      <li id=${task.id}>
        <input type='checkbox' ${task.isChecked ? 'checked':''}/> 
        <input class='i-1' width='50px' hidden/>
        <span>${task.text}</span>
        <button type='button' class='remove-task'>x</button>
      </li>`;
  });

  listTaskContainer.innerHTML = listTask;
  counterTasks()
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
    textTask.value = '';
  };
};

let addTaskWithEnter = (event) => {
  if (event.code ==='Enter' && textTask.value) {
    addTask()
  };
}

let removeTask = (event) => {
    tasks = tasks.filter((task) => Number(event.target.parentNode.id) !== task.id);
    renderTask();
};

const renderTaskCompleted = (copyTask,parentCurrentTarget) => {
  // copyTask = copyTask.filter((task)=> task.isChecked)
  // renderTask(copyTask)
}

let markTask = (event) => {//?
     tasks.forEach((task)=>{
      if(Number(event.target.parentNode.id) === task.id){
        task.isChecked = event.target.checked
      }
    })
    let copyTask = tasks.every((elem)=>elem.isChecked)
    checkAllTasks.checked = (copyTask) ? true:false 
    renderTask()
}

let editTaskText = (event) => {//
  if(event.detail === DOUBLE_CLICK){
    event.target.hidden = true;
    event.target.previousElementSibling.hidden = false;
    event.target.previousElementSibling.focus()
  }
}

let changeTextInTasks = (event) => {//
  if(event.target.value){
    tasks.forEach((task) => {
      if(Number(event.target.parentNode.id) === task.id){
        task.text = event.target.value;
      }
    })
  }
 
}

let writeChanges = (event) => {
  if(event.code === 'Enter'){
    changeTextInTasks(event)
    renderTask()
  }
  if(event.code === 'Escape'){
    renderTask()
  }
}

let writeChangesBlur = (event) => {
    if(event.target.value && event.target.type!=='checkbox'){
      changeTextInTasks(event)
    }
    renderTask()
}

let selectActionTask = (event) => {
  if (event.target.type === 'button') removeTask(event)
  if (event.target.type === 'checkbox') markTask(event)
  if (event.target.tagName === 'SPAN') editTaskText(event)
}

let counterTasks = () => {
  let allTasks = tasks.length;
  let activeTasks = tasks.filter((task)=>!task.isChecked,0).length;
  let completedTasks = tasks.filter((task)=>task.isChecked,0).length;
console.log(allTasks)
  optionButtons.firstElementChild.firstElementChild.textContent = allTasks;
  optionButtons.lastElementChild.firstElementChild.textContent = completedTasks;
  optionButtons.firstElementChild.firstElementChild.textContent = activeTasks;

}

let markAllTask = (event) => {
  console.log(event.target)
  tasks.forEach((elem)=>{
    elem.isChecked = event.target.checked;
  })
  renderTask()
}


const renderTaskActive = (copyTask,parentCurrentTarget) => {
  console.log(parentCurrentTarget.firstElementChild)
  copyTask = copyTask.filter((task)=> !task.isChecked)
  renderTask(copyTask)
} 

const typeFilter = (event)=> {
  let parentCurrentTarget = (event.target.tagName === 'SPAN') ? event.target.parentNode:event.target
  let copyTasks = [...tasks]
  if(parentCurrentTarget.name === 'check-all') renderTask(copyTasks,parentCurrentTarget)
  if(parentCurrentTarget.name === 'check-active') renderTaskActive(copyTasks,parentCurrentTarget)
  if(parentCurrentTarget.name === 'check-completed') renderTaskCompleted(copyTasks,parentCurrentTarget)
}

let deleteCompletedTasks = (event) => {
  tasks = tasks.filter((elem)=> !elem.isChecked)
  renderTask()
  deleteCompletedTaskButton.checked = false;
  checkAllTasks.checked = false;
}

addTaskButton.addEventListener('click', addTask);
listTaskContainer.addEventListener('click', selectActionTask);
listTaskContainer.addEventListener('keydown',writeChanges)
listTaskContainer.addEventListener('blur',writeChangesBlur,true)
textTask.addEventListener('keydown',addTaskWithEnter)
checkAllTasks.addEventListener('change',markAllTask)
deleteCompletedTaskButton.addEventListener('click',deleteCompletedTasks)
optionButtons.addEventListener('click',typeFilter)